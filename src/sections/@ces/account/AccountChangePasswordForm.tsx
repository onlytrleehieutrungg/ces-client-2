import { useState } from 'react'
import * as Yup from 'yup'
// next
// form
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
// @mui
import { LoadingButton } from '@mui/lab'
import { Card, IconButton, InputAdornment, Stack } from '@mui/material'
// utils
// routes
// @types
// _mock
// components
import { AccountPayload } from 'src/@types/@ces/account'
import Iconify from 'src/components/Iconify'
import { FormProvider, RHFTextField } from '../../../components/hook-form'

// ----------------------------------------------------------------------

type Props = {
  onSubmit?: (payload: AccountPayload) => void
}

export default function AccountNewEditForm({ onSubmit }: Props) {
  const [showPassword, setShowPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  // const { user } = useAuth()

  const ChangePasswordSchema = Yup.object().shape({
    oldPassword: Yup.string().required('Old Password is required'),
    newPassword: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('New Password is required'),
    confirmPassword: Yup.string().oneOf([Yup.ref('newPassword'), null], 'Passwords must match'),
  })

  const defaultValues = {
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  }

  const methods = useForm<any>({
    resolver: yupResolver(ChangePasswordSchema),
    defaultValues,
  })

  const {
    // reset,
    // watch,
    // control,
    // setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods

  const handleFormSubmit = async (payload: any) => {
    console.log(payload)
    // await onSubmit?.(payload)
  }

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(handleFormSubmit)}>
      <Card sx={{ p: 3 }}>
        <Stack spacing={3} alignItems="flex-end">
          <RHFTextField
            name="oldPassword"
            label="Old Password"
            type={showPassword ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <RHFTextField
            name="newPassword"
            label="New Password"
            type={showNewPassword ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowNewPassword(!showNewPassword)} edge="end">
                    <Iconify icon={showNewPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <RHFTextField
            name="confirmPassword"
            label="Confirm Password"
            type={showConfirmPassword ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    edge="end"
                  >
                    <Iconify icon={showConfirmPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
            Save Changes
          </LoadingButton>
        </Stack>
      </Card>
    </FormProvider>
  )
}
