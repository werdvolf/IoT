import { useRef, useContext } from 'react'
import useOnClickOutside from '../../../hooks/onClickOutside'
import { MenuContext } from '../../../context/navState'
import HamburgerButton from '../HamburgerButton/HamburgerButton'
import { SideMenu } from '../SideMenu/SideMenu'
import './MainMenu.css'

const MainMenu = () => {
  const node = useRef<HTMLElement | null>(null)
  const { isMenuOpen, toggleMenu } = useContext(MenuContext)

  useOnClickOutside(node, () => {
    if (isMenuOpen) {
      toggleMenu()
    }
  })

  return (
    <header ref={node}>
      <div className="navbar">
        <HamburgerButton />
        <h1 className="title">Завод</h1>
      </div>
      <SideMenu />
    </header>
  )
}

export default MainMenu
