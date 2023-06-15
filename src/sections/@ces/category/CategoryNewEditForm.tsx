import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton } from '@mui/lab';
import { Box, Card, Grid, Stack } from '@mui/material';
// next
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import { useEffect, useMemo } from 'react';
// form
import { useForm } from 'react-hook-form';
import { Category } from 'src/@types/@ces';
import * as Yup from 'yup';
import {
    FormProvider, RHFTextField
} from '../../../components/hook-form';
// routes
import { PATH_CES } from '../../../routes/paths';
;

// ----------------------------------------------------------------------

type FormValuesProps = Category;

type Props = {
    isEdit?: boolean;
    currentUser?: Category;
    onSubmit?: (payload: Category) => void
};

export default function UserNewEditForm({ isEdit = false, currentUser, onSubmit }: Props) {
    const { push } = useRouter();

    const { enqueueSnackbar } = useSnackbar();

    const NewUserSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        description: Yup.string().required('Description is required'),
    });

    const defaultValues = useMemo(
        () => ({
            name: currentUser?.name || '',
            description: currentUser?.description || '',
        }),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [currentUser]
    );

    const methods = useForm<Category>({
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

    const handleOnSubmit = async (data: Category) => {
        try {
            // await new Promise((resolve) => setTimeout(resolve, 500));
            // reset();
            await onSubmit?.(data)
            enqueueSnackbar(!isEdit ? 'Create success!' : 'Update success!');
            push(PATH_CES.category.root);
        } catch (error) {
            console.error(error);
        }
    };

    // const handleDrop = useCallback(
    //     (acceptedFiles) => {
    //         const file = acceptedFiles[0];

    //         if (file) {
    //             setValue(
    //                 'avatarUrl',
    //                 Object.assign(file, {
    //                     preview: URL.createObjectURL(file),
    //                 })
    //             );
    //         }
    //     },
    //     [setValue]
    // );

    return (
        <FormProvider methods={methods} onSubmit={handleSubmit(handleOnSubmit)}>
            <Grid container spacing={3}>
                {/* <Grid item xs={12} md={4}>
                    <Card sx={{ py: 10, px: 3 }}>
                        {isEdit && (
                            <Label
                                color={values.status !== 'active' ? 'error' : 'success'}
                                sx={{ textTransform: 'uppercase', position: 'absolute', top: 24, right: 24 }}
                            >
                                {values.status}
                            </Label>
                        )}
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
                </Grid> */}

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
                            <RHFTextField name="name" label="Tên danh mục" />
                            {/* <RHFTextField name="Price" label="Giá sản phẩm" />
                            <RHFTextField name="Quantity" label="Số lượng" /> */}
                            {/* <RHFSelect name="status" label="status" placeholder="status">
                                <option value="" />
                                {countries.map((option) => (
                                    <option key={option.code} value={option.label}>
                                        {option.label}
                                    </option>
                                ))}
                            </RHFSelect> */}

                            <RHFTextField name="description" label="Desciption" />
                            {/* <RHFTextField name="ServiceDuration" label="City" />
                            <RHFTextField name="Type" label="Address" /> */}
                            {/* <RHFTextField name="zipCode" label="Zip/Code" />
                            <RHFTextField name="company" label="Company" />
                            <RHFTextField name="role" label="Role" /> */}
                        </Box>

                        <Stack alignItems="flex-end" sx={{ mt: 3 }}>
                            <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                                {!isEdit ? 'Create Category' : 'Save Changes'}
                            </LoadingButton>
                        </Stack>
                    </Card>
                </Grid>
            </Grid>
        </FormProvider>
    );
}
