import { Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Toolbar, Typography, Box, TextField } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { useState } from 'react'
import { Link } from 'react-router-dom'

function SignUpPage () {
  const [showPassword, setShowPassword] = useState(false)
  const handleClickShowPassword = () => setShowPassword((show) => !show)
  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }
  return (
    <>
      <Toolbar />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
          py: '20px',
          mx: { sm: '10px', md: 0 }
        }}
      >
        <Box sx={{
          background: '#ffffff',
          display: 'flex',
          justifyContent: ' center',
          flexDirection: 'column',
          width: { sm: '340px', md: '450px' },
          gap: 3,
          p: '30px',
          borderRadius: '10px'
        }}>
          <Typography variant='h1' sx={{ fontSize: '1.4em', textAlign: 'center', mb: '10px' }}>Crear tu cuenta en AlingMind</Typography>
          <Box
            component="form"
            autoComplete="off"
            sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                required
                id="outlined-required"
                label="Usuario"
                placeholder="Usuario"
              />
              <TextField
                required
                id="outlined-required"
                label="Correo electronico"
                type="email"
                placeholder="Correo electronico"
              />
              <FormControl variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">Contraseña</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showPassword ? 'text' : 'password'}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Contraseña"
                />
              </FormControl>
              <FormControl variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">Repite la contraseña</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showPassword ? 'text' : 'password'}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Repite la contraseña"
                />
              </FormControl>
              <Button type='submit' variant='contained' size='large'>Crear cuenta</Button>
            </Box>
          </Box>
          <Box sx={{
            display: 'flex', flexDirection: 'column', gap: 2
          }}>
            <Typography variant='h2' sx={{ fontSize: '18px', textAlign: 'center' }}>¿Ya tienes cuenta?</Typography>
            <Button component={Link} variant='outlined' size='large' to='/login'>Iniciar sesión</Button>
          </Box>
        </Box>
      </Box >
    </>
  )
}

export { SignUpPage }
