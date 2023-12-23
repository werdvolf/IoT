import React, { useContext, ReactNode } from 'react'
import PropTypes from 'prop-types'
import './SideMenu.css'
import { MenuContext } from '../../../context/navState'

type SideMenuProps = {
  children?: ReactNode
}

export const SideMenu: React.FC<SideMenuProps> = ({ children }) => {
  const { isMenuOpen } = useContext(MenuContext)

  return (
    <nav className={isMenuOpen ? 'menu-open' : 'menu-closed'}>{children}</nav>
  )
}

SideMenu.propTypes = {
  children: PropTypes.node,
}

SideMenu.defaultProps = {
  children: (
    <>
      <a href="/" className="menu-link">
        Головна
      </a>
      <a href="/screen" className="menu-link">
        Екран
      </a>
      <a href="/reports" className="menu-link">
        Звіти
      </a>
      <a href="/accidents" className="menu-link">
        Аварії
      </a>
    </>
  ),
}

export default SideMenu
