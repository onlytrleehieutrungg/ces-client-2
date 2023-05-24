import { Box, IconButton, useTheme } from '@mui/material'
import React from 'react'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import { NextPage } from 'next'
import { useColorModeContext } from './loginForm'

interface DarkModeButtonProps {}

const DarkModeButton: NextPage<DarkModeButtonProps> = ({}) => {
  const theme = useTheme()
  const colorMode = useColorModeContext()
  return (
    <Box sx={{}}>
      {theme.palette.mode} mode
      <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
        {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
    </Box>
  )
}

export default DarkModeButton
