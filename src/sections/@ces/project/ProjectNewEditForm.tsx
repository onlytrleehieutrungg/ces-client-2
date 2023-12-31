import { useCallback, useEffect, useMemo } from 'react'
import * as Yup from 'yup'
// next
// form
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useForm } from 'react-hook-form'
// @mui
import { LoadingButton } from '@mui/lab'
import { Box, Card, FormControlLabel, Grid, Stack, Switch, Typography } from '@mui/material'
// utils
import { fData } from '../../../utils/formatNumber'
// routes
// @types
// _mock
// components
import { PROJECT_STATUS_OPTIONS_FORM, ProjectData, ProjectPayload } from 'src/@types/@ces'
import Label from '../../../components/Label'
import {
  FormProvider,
  RHFSelect,
  RHFTextField,
  RHFUploadAvatar,
} from '../../../components/hook-form'

// ----------------------------------------------------------------------

type Props = {
  isEdit?: boolean
  currentUser?: ProjectData
  onSubmit?: (payload: ProjectPayload) => void
}

export default function ProjectNewEditForm({ isEdit = false, currentUser, onSubmit }: Props) {
  const NewUserSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),

    // imageUrl: Yup.string().required('Image is required'),
    status: Yup.number().required('Status is required'),
  })

  const defaultValues = useMemo(
    () => ({
      name: currentUser?.name || '',

      imageUrl: currentUser?.imageUrl !== 'string' ? currentUser?.imageUrl : '',
      status: currentUser?.status,
    }),
    [currentUser]
  )

  const methods = useForm<ProjectPayload>({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  })

  const {
    reset,
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods

  const values = watch()

  useEffect(() => {
    if (isEdit && currentUser) {
      reset(defaultValues)
    }
    if (!isEdit) {
      reset(defaultValues)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentUser])

  const handleFormSubmit = async (payload: ProjectPayload) => {
    await onSubmit?.(payload)
  }

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0]

      if (file) {
        setValue(
          'imageUrl',
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      }
    },
    [setValue]
  )

  const statusList = PROJECT_STATUS_OPTIONS_FORM

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(handleFormSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card sx={{ py: 10, px: 3 }}>
            {isEdit && (
              <Label
                color={values.status !== 1 ? 'error' : 'success'}
                sx={{ textTransform: 'uppercase', position: 'absolute', top: 24, right: 24 }}
              >
                {values.status === 1 ? 'Active' : 'Inactive'}
              </Label>
            )}

            <Box sx={{ mb: 5 }}>
              <RHFUploadAvatar
                name="imageUrl"
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
                        checked={field.value !== 1}
                        onChange={(event) => field.onChange(event.target.checked ? 2 : 1)}
                      />
                    )}
                  />
                }
                label={
                  <>
                    <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                      Disable
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      Apply disable project
                    </Typography>
                  </>
                }
                sx={{ mx: 0, mb: 3, width: 1, justifyContent: 'space-between' }}
              />
            )}
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
              <RHFTextField name="name" label="Name" />

              {/* <RHFTextField name="address" label="Address" /> */}

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
                {!isEdit ? 'Create Project' : 'Save Changes'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  )
}
