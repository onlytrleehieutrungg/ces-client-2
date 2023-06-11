import * as Yup from 'yup';
import { useCallback, useEffect, useMemo } from 'react';
import { useSnackbar } from 'notistack';
// next
import { useRouter } from 'next/router';
// form
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton } from '@mui/lab';
import { Box, Card, Grid, Stack, Switch, Typography, FormControlLabel } from '@mui/material';
// utils
import { fData } from '../../../utils/formatNumber';
// routes
import { PATH_CES } from '../../../routes/paths';

import Label from '../../../components/Label';
import {
    FormProvider,
    RHFSelect,
    RHFSwitch,
    RHFTextField,
    RHFUploadAvatar,
} from '../../../components/hook-form';
import { Category, Product } from 'src/@types/@ces';
import { useCategoryList } from 'src/hooks/@ces/useCategory';

// ----------------------------------------------------------------------

type FormValuesProps = Product;

type Props = {
    isEdit?: boolean;
    currentUser?: Product;
    onSubmit?: (payload: Product) => void

};

export default function ProductNewEditForm({ isEdit = false, currentUser, onSubmit }: Props) {
    const { push } = useRouter();
    const { data, mutate } = useCategoryList({})

    const categories: Category[] = data?.data ?? []
    const { enqueueSnackbar } = useSnackbar();

    const NewUserSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        price: Yup.number().required('Price is required'),
        quantity: Yup.number().required('Quantity is required'),
        categoryId: Yup.string().required('CategoryId is required'),
        description: Yup.string().required('Description is required'),
        serviceDuration: Yup.string().required('ServiceDuration is required'),
        type: Yup.string().required('Type is required'),
        avatarUrl: Yup.mixed().test('required', 'Avatar is required', (value) => value !== ''),
    });

    const defaultValues = useMemo(
        () => ({
            name: currentUser?.name || '',
            price: currentUser?.price || 0,
            quantity: currentUser?.quantity || 0,
            categoryId: currentUser?.categoryId || '',
            description: currentUser?.description || '',
            serviceDuration: currentUser?.serviceDuration || '',
            type: currentUser?.type || '',
            avatarUrl: currentUser?.avatarUrl || '',

        }),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [currentUser]
    );

    const methods = useForm<Product>({
        resolver: yupResolver(NewUserSchema),
        defaultValues,
    });

    const {
        reset,
        watch,
        control,
        setValue,
        handleSubmit,
        formState: { isSubmitting },
    } = methods;

    const values = watch();

    useEffect(() => {
        if (isEdit && currentUser) {
            reset(defaultValues);
        }
        if (!isEdit) {
            reset(defaultValues);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isEdit, currentUser]);

    const handleFormSubmit = async (data: Product) => {
        try {
            // await new Promise((resolve) => setTimeout(resolve, 500));
            // reset();
            await onSubmit?.(data)
            enqueueSnackbar(!isEdit ? 'Create success!' : 'Update success!');
            push(PATH_CES.product.root);
        } catch (error) {
            console.error(error);
        }
    };

    const handleDrop = useCallback(
        (acceptedFiles) => {
            const file = acceptedFiles[0];

            if (file) {
                setValue(
                    'avatarUrl',
                    Object.assign(file, {
                        preview: URL.createObjectURL(file),
                    })
                );
            }
        },
        [setValue]
    );

    return (
        <FormProvider methods={methods} onSubmit={handleSubmit(handleFormSubmit)}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                    <Card sx={{ py: 10, px: 3 }}>
                        {isEdit && (
                            <Label
                                color={values.status !== 'active' ? 'error' : 'success'}
                                sx={{ textTransform: 'uppercase', position: 'absolute', top: 24, right: 24 }}
                            >
                                {values.status}
                            </Label>
                        )}
                        <Box sx={{ mb: 5 }}>
                            <RHFUploadAvatar
                                name="avatarUrl"
                                accept="image/*"
                                maxSize={3145728}
                                onDrop={handleDrop}
                                helperText={
                                    <Typography
                                        variant="caption"
                                        sx={{
                                            mt: 2,
                                            mx: 'auto',
                                            display: 'block',
                                            textAlign: 'center',
                                            color: 'text.secondary',
                                        }}
                                    >
                                        Allowed *.jpeg, *.jpg, *.png, *.gif
                                        <br /> max size of {fData(3145728)}
                                    </Typography>
                                }
                            />
                        </Box>

                        {isEdit && (
                            <FormControlLabel
                                labelPlacement="start"
                                control={
                                    <Controller
                                        name="status"
                                        control={control}
                                        render={({ field }) => (
                                            <Switch
                                                {...field}
                                                checked={field.value !== 'active'}
                                                onChange={(event) =>
                                                    field.onChange(event.target.checked ? 'banned' : 'active')
                                                }
                                            />
                                        )}
                                    />
                                }
                                label={
                                    <>
                                        <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                                            Banned
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                            Apply disable account
                                        </Typography>
                                    </>
                                }
                                sx={{ mx: 0, mb: 3, width: 1, justifyContent: 'space-between' }}
                            />
                        )}

                        <RHFSwitch
                            name="isVerified"
                            labelPlacement="start"
                            label={
                                <>
                                    <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                                        Email Verified
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                        Disabling this will automatically send the user a verification email
                                    </Typography>
                                </>
                            }
                            sx={{ mx: 0, width: 1, justifyContent: 'space-between' }}
                        />
                    </Card>
                </Grid>

                <Grid item xs={12} md={8}>
                    <Card sx={{ p: 3 }}>
                        <Box
                            sx={{
                                display: 'grid',
                                columnGap: 2,
                                rowGap: 3,
                                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
                            }}
                        >
                            <RHFTextField name="name" label="Tên sản phẩm" />
                            <RHFTextField name="price" label="Giá sản phẩm" />
                            <RHFTextField name="quantity" label="Số lượng" />
                            <RHFSelect name="categoryId" label="category" placeholder="category">
                                <option value="" />
                                {categories.map((option) => (
                                    <option key={option.id} value={option.id}>
                                        {option.name}
                                    </option>
                                ))}
                            </RHFSelect>
                            <RHFTextField name="description" label="Description" />
                            <RHFTextField name="type" label="Type" />
                            {/* <RHFTextField name="zipCode" label="Zip/Code" /> */}
                            <RHFTextField name="serviceDuration" label="ServiceDuration" />
                            {/* <RHFTextField name="role" label="Role" />  */}
                        </Box>

                        <Stack alignItems="flex-end" sx={{ mt: 3 }}>
                            <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                                {!isEdit ? 'Create Product' : 'Save Changes'}
                            </LoadingButton>
                        </Stack>
                    </Card>
                </Grid>
            </Grid>
        </FormProvider>
    );
}
