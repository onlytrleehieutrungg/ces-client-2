import {
  Stack,
} from '@mui/material'
import * as React from 'react'

import SignInSide from './components/loginForm'

const Login = () => {
  return (
    <Stack
      sx={
        {
          // display: 'flex',
          // width: '100vw',
          // justifyContent: 'center',
          // height: '100vh',
          // alignItems: 'center',
          // backgroundSize: 'cover',
          // bgcolor: 'background.default',
          // color: 'text.primary',
          // alignContent: 'center',
          // flexWrap: 'wrap',
        }
      }
    >
      <SignInSide />
    </Stack>
  )
}

export default Login
