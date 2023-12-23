import React, { createContext, useState, ReactNode } from 'react'

type MenuContextType = {
  isMenuOpen: boolean
  toggleMenu: () => void
}

export const MenuContext = createContext<MenuContextType>({
  isMenuOpen: true,
  toggleMenu: () => {},
})

type NavStateProps = {
  children: ReactNode
}

const NavState: React.FC<NavStateProps> = ({ children }) => {
  const [isMenuOpen, toggleMenu] = useState(false)

  function toggleMenuMode() {
    toggleMenu(!isMenuOpen)
  }

  return (
    <MenuContext.Provider value={{ isMenuOpen, toggleMenu: toggleMenuMode }}>
      {children}
    </MenuContext.Provider>
  )
}

export default NavState
