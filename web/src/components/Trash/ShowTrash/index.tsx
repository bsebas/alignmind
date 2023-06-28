import { Box, Checkbox, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Menu, MenuItem, Skeleton, Toolbar, Typography } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import RestoreIcon from '@mui/icons-material/Restore'
import DeleteIcon from '@mui/icons-material/Delete'

import { useNavigate } from 'react-router-dom'
import { type MouseEvent, useEffect, useState } from 'react'
import { FormattedMessage } from 'react-intl'

import { useAuth } from 'hooks/useAuth'
import { EmptyTrash } from './EmptyTrash'
import { type ResponseTrashes, deleteThinkFromTrash, getAllTrashes, restoreFromTrash } from 'services/trash'

export function ShowTrashUI (): JSX.Element {
  const navigate = useNavigate()
  const { accessToken } = useAuth()

  const [anchorElTrash, setAnchorElTrash] = useState<HTMLButtonElement | null>(null)
  const [checked, setChecked] = useState<number[]>([])

  const [allTrash, setAllTrash] = useState<ResponseTrashes>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [idSelect, setIdSelect] = useState<string>('')

  const getTrash = async (): Promise<void> => {
    if (accessToken == null) return

    try {
      const response = await getAllTrashes(accessToken)

      setAllTrash(response)
    } catch (e) {
      console.log(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    void getTrash()
  }, [])

  const handleToggle = (value: number): void => {
    const currentIndex = checked.indexOf(value)
    const newChecked = [...checked]

    if (currentIndex === -1) {
      newChecked.push(value)
    } else {
      newChecked.splice(currentIndex, 1)
    }

    setChecked(newChecked)
  }

  const handleTrashMenu = (event: MouseEvent<HTMLButtonElement>, id: string): void => {
    if (anchorElTrash != null) {
      setIdSelect('')
      setAnchorElTrash(null)
    } else {
      setIdSelect(id)
      setAnchorElTrash(event.currentTarget)
    }
  }

  const onDeleteId = async (): Promise<void> => {
    if (accessToken == null) return

    try {
      setAnchorElTrash(null)
      await deleteThinkFromTrash(idSelect, accessToken)

      handleToggle(allTrash.findIndex(val => val.id === idSelect))
      await getTrash()
    } catch (err) {
      console.log(err)
    }
  }

  const onRestoreId = async (): Promise<void> => {
    if (accessToken == null) return

    try {
      setAnchorElTrash(null)
      await restoreFromTrash(idSelect, accessToken)

      handleToggle(allTrash.findIndex(val => val.id === idSelect))
      await getTrash()
    } catch (err) {
      console.log(err)
    }
  }

  const onDeleteSelect = async (): Promise<void> => {
    if (accessToken == null) return

    if (checked.length > 0) {
      try {
        for await (const value of checked) {
          const trash = allTrash[value]

          await deleteThinkFromTrash(trash.id, accessToken)
        }
        setChecked([])
        await getTrash()
      } catch (err) {
        console.log(err)
      }
    }
  }

  const onRestoreSelect = async (): Promise<void> => {
    if (accessToken == null) return

    if (checked.length > 0) {
      try {
        for await (const value of checked) {
          const trash = allTrash[value]
          await restoreFromTrash(trash.id, accessToken)
        }
        setChecked([])
        await getTrash()
      } catch (err) {
        console.log(err)
      }
    }
  }

  return (
    <Box sx={{ width: '100%', p: '30px' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', backgroundColor: '#ffffff' }}>
        <Typography
          variant="h6"
          noWrap
          component="div"
        >
          <FormattedMessage id="trash.title" defaultMessage="Trash" />
        </Typography>
        <Box>
          <IconButton onClick={onRestoreSelect} disabled={checked.length === 0}>
            <RestoreIcon />
          </IconButton>
          <IconButton onClick={onDeleteSelect} disabled={checked.length === 0}>
            <DeleteIcon />
          </IconButton>
        </Box>
      </Toolbar>
      <Box>
        <List sx={{ width: '100%', bgcolor: 'background.paper', p: 0, pb: '10px' }}>
          {loading && <Skeleton variant="rectangular" height={50} />}
          {(!loading && allTrash.length === 0) && <EmptyTrash />}
          {(!loading && allTrash.length > 0) && allTrash.map((value, index) => {
            const labelId = `checkbox-list-label-${index}`
            return (
              <ListItem
                key={index}
                secondaryAction={
                  <IconButton edge="end" aria-label="comments" onClick={(e) => { handleTrashMenu(e, value.id) }}>
                    <MoreVertIcon />
                  </IconButton>
                }
                disablePadding
              >
                <ListItemButton role={undefined} onClick={() => { handleToggle(index) }} dense>
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={checked.includes(index)}
                      tabIndex={-1}
                      disableRipple
                      inputProps={{ 'aria-labelledby': labelId }}
                    />
                  </ListItemIcon>
                  <ListItemText id={labelId} primary={`${value.text}`} />
                </ListItemButton>
              </ListItem>
            )
          })}
        </List>
      </Box>
      <Menu
        sx={{ mt: '40px', zIndex: 1202 }}
        id="menu-appbar"
        anchorEl={anchorElTrash}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        open={Boolean(anchorElTrash)}
        onClose={handleTrashMenu}
      >
        <MenuItem
          key="1"
          onClick={() => { navigate(`/trash/${idSelect}`) }}>
          <FormattedMessage id="options.think.see" defaultMessage="See thought" />
        </MenuItem>
        <MenuItem
          key="2"
          onClick={onDeleteId}>
          <FormattedMessage id="options.think.delete" defaultMessage="Delete thought" />
        </MenuItem>
        <MenuItem key="3" onClick={onRestoreId}>
          <FormattedMessage id="options.think.restore" defaultMessage="Restore thought" />
        </MenuItem>
      </Menu>
    </Box >
  )
}
