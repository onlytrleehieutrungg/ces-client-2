import { DatePicker, LocalizationProvider } from '@mui/lab'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import { TextField } from '@mui/material'
import { useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
type IProps = {
  name: string
  label: string
}

type Props = IProps

export default function RHFDatePicker({ name, label }: Props) {
  const [originalReleaseDate, setOriginalReleaseDate] = useState(null)
  const { control } = useFormContext()
  return (
    <Controller
      name={name}
      defaultValue={originalReleaseDate}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label={label}
            value={originalReleaseDate}
            onChange={(newValue) => {
              setOriginalReleaseDate(newValue)
            }}
            renderInput={(params) => (
              <TextField
                {...field}
                fullWidth
                error={!!error}
                helperText={error?.message}
                {...params}
              />
            )}
          />
        </LocalizationProvider>
      )}
    />
  )
}
