import { useEffect, useMemo } from 'react'
import * as Yup from 'yup'
// next
// form
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
// @mui
import { LoadingButton } from '@mui/lab'
import { Box, Card, Grid, Stack } from '@mui/material'
// utils
// routes
// @types
// _mock
// components
import { BenefitData, BenefitPayload, PROJECT_STATUS_OPTIONS_FORM } from 'src/@types/@ces'
import { FormProvider, RHFSelect, RHFTextField } from '../../../components/hook-form'

// ----------------------------------------------------------------------

type Props = {
  isEdit?: boolean
  currentUser?: BenefitData
  onSubmit?: (payload: BenefitPayload) => void
}

export default function BenefitNewEditForm({ isEdit = false, currentUser, onSubmit }: Props) {
  const NewUserSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    // description: Yup.string().required('Description is required'),
    // type: Yup.number().required('Type is required'),
    unitPrice: Yup.number().required('Unit Price is required'),
  })

  const defaultValues = useMemo(
    () => ({
      name: currentUser?.name || '',
      status: currentUser?.status || 1,
      description: currentUser?.description || '',
      type: currentUser?.type,
      unitPrice: currentUser?.unitPrice,
    }),
    [currentUser]
  )

  const methods = useForm<BenefitPayload>({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  })

  const {
    reset,
    // watch,
    // control,
    // setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods

  useEffect(() => {
    if (isEdit && currentUser) {
      reset(defaultValues)
    }
    if (!isEdit) {
      reset(defaultValues)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentUser])

  const handleFormSubmit = async (payload: BenefitPayload) => {
    await onSubmit?.(payload)
  }

  // const handleDrop = useCallback(
  //   (acceptedFiles) => {
  //     const file = acceptedFiles[0]

  //     if (file) {
  //       setValue(
  //         'imageUrl',
  //         Object.assign(file, {
  //           preview: URL.createObjectURL(file),
  //         })
  //       )
  //     }
  //   },
  //   [setValue]
  // )

  const statusList = PROJECT_STATUS_OPTIONS_FORM

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(handleFormSubmit)}>
      <Grid container spacing={3}>
        {/* <Grid item xs={12} md={4}></Grid> */}

        <Grid item xs={12}>
          <Card sx={{ p: 3 }}>
            <Box
              sx={{
                display: 'grid',
                columnGap: 2,
                rowGap: 3,
                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
              }}
            >
              <RHFTextField name="name" label="Name" />
              <RHFTextField name="description" label="Description" />
              <RHFTextField name="unitPrice" label="Unit Price" type="number" />

              <RHFSelect name="status" label="Status" placeholder="Status">
                <option value={undefined} />
                {statusList.map((option) => (
                  <option key={option.code} value={option.code}>
                    {option.label}
                  </option>
                ))}
              </RHFSelect>
            </Box>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {!isEdit ? 'Create Benefit' : 'Save Changes'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  )
}
