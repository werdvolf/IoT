import React from 'react'
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material'
import { Link } from 'react-router-dom'

interface MenuItem {
  name: string
  icon: JSX.Element
  link: string
}

interface SideMenuProps {
  menuItems: { [key: string]: MenuItem }
  open: boolean
}

const SideMenu: React.FC<SideMenuProps> = ({ menuItems, open }) => {
  const renderListItem = (name: string, icon: JSX.Element, link: string) => (
    <ListItem key={name} disablePadding sx={{ display: 'block' }}>
      <Link
        to={link}
        style={{ textDecoration: 'none', color: 'inherit', width: '100%' }}
      >
        <ListItemButton
          component="div"
          sx={{
            minHeight: 48,
            justifyContent: open ? 'initial' : 'center',
            px: 2.5,
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: open ? 3 : 'auto',
              justifyContent: 'center',
            }}
          >
            {icon}
          </ListItemIcon>
          <ListItemText primary={name} sx={{ opacity: open ? 1 : 0 }} />
        </ListItemButton>
      </Link>
    </ListItem>
  )

  return (
    <List>
      {Object.keys(menuItems).map(key => {
        const menuItem = menuItems[key]
        return renderListItem(menuItem.name, menuItem.icon, menuItem.link)
      })}
    </List>
  )
}

export default SideMenu
