import { Avatar, Box, Button, ButtonGroup, Menu, TextField } from '@mui/material'

import { Link, useNavigate } from 'react-router-dom'
import { SketchPicker } from 'react-color'
import { type PresetColor } from 'react-color/lib/components/sketch/Sketch'

import { type MouseEvent, useEffect, useState, type FormEvent } from 'react'
import { FormattedMessage } from 'react-intl'
import { Helmet } from 'react-helmet-async'

import { HEXADECIMAL_REGEX } from 'utils/regex'
import { useAuth } from 'hooks/useAuth'
import { Forms } from 'components/Form'
import { type NewPlace, postPlace } from 'services/place'
import { type ResponseColor, getAllColor } from 'services/color'
import { isAxiosError } from 'axios'

export function NewPlaceUI (): JSX.Element {
  const navigate = useNavigate()
  const { accessToken } = useAuth()

  const [allColors, setAllColors] = useState<PresetColor[]>([])
  const [color, setColor] = useState<string>('#00575C')

  const [textPlace, setTextPlace] = useState<string>('')
  const [anchorElColor, setAnchorElColor] = useState<HTMLButtonElement | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    async function getColor (): Promise<void> {
      try {
        if (accessToken == null) return

        const response: ResponseColor[] = await getAllColor(accessToken)
        const colors: PresetColor[] = response.map((value) => {
          return { color: '#' + value.code, title: value.code }
        }) as PresetColor[]

        setAllColors(colors)
      } catch (e) {
        console.log(e)
      }
    }

    void getColor()
  }, [])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    setLoading(true)

    if (accessToken == null) return

    const testColor = HEXADECIMAL_REGEX.test(color)

    if (!testColor || textPlace.trimEnd().length < 2) {
      setLoading(false)
      return
    }
    const request: NewPlace = {
      name: textPlace.trimEnd(),
      code: color.slice(1)
    }

    try {
      const response = await postPlace(request, accessToken)

      navigate('/place/' + response.id)
    } catch (err) {
      if (isAxiosError(err)) {
        console.log(err)
      }
    } finally {
      setLoading(false)
    }
  }

  const handleColorMenu = (event: MouseEvent<HTMLButtonElement>): void => {
    if (anchorElColor != null) {
      setAnchorElColor(null)
    } else {
      setAnchorElColor(event.currentTarget)
    }
  }

  return (<>
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'normal',
        flexDirection: 'column',
        alignItems: 'center',
        py: '40px',
        width: '100%',
        mx: { sm: '10px', md: 0 }
      }}
    >
      <Helmet>
        <title>New place | Mindfulyze</title>
      </Helmet>
      <Box sx={{
        display: 'flex',
        justifyContent: ' center',
        flexDirection: 'column',
        width: { xs: '100%', sm: '70%' },
        gap: 3,
        p: '40px',
        borderRadius: '10px',
        background: '#ffffff'
      }}>
        <Forms
          title={<FormattedMessage id='place.new.title' defaultMessage="Create a new place" />}
          disableSubmit={loading || textPlace.length < 2}
          isCancel={true}
          submitText={<FormattedMessage id='place.new.submit' defaultMessage="Create a place" />}
          handleSubmit={handleSubmit}>
          <TextField
            type="text"
            variant='outlined'
            value={textPlace}
            onChange={(e) => { setTextPlace(e.target.value) }}
            required
          />
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: {
                xs: 'start',
                md: 'center'
              },
              flexDirection: { xs: 'column', md: 'row' },
              gap: 2
            }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}
            >
              <ButtonGroup variant="text" aria-label="outlined button group">
                <Button variant='contained'>
                  <FormattedMessage id="select.new.place" defaultMessage="Place" />
                </Button>
                <Button component={Link} to="/think/new">
                  <FormattedMessage id="select.new.think" defaultMessage="Think" />
                </Button>
              </ButtonGroup>
            </Box>
            <Box sx={{ position: 'relative' }}>
              <Button
                variant='text'
                onClick={handleColorMenu}
                startIcon={
                  <Avatar sx={{
                    background: `${color}`,
                    width: '22px',
                    height: '22px',
                    p: '0'
                  }}>
                    <></>
                  </Avatar>
                }>
                <FormattedMessage id="button.color" defaultMessage="Color" />
              </Button>
              <Menu
                style={{ padding: '0' }}
                sx={{ mt: '36px', zIndex: 1202 }}
                anchorEl={anchorElColor}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                open={Boolean(anchorElColor)}
                onClose={handleColorMenu} >
                <SketchPicker color={color} onChange={(col) => {
                  setColor(col.hex)
                }} presetColors={allColors} />
              </Menu>
            </Box>
          </Box>
        </Forms>
      </Box>
    </Box>
  </>)
}
