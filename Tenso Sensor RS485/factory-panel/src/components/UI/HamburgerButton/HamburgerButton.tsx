import React, { useContext } from 'react'
import './HamburgerButton.css'
import { MenuContext } from '../../../context/navState'

const HamburgerButton: React.FC = () => {
  const { isMenuOpen, toggleMenu } = useContext(MenuContext)

  const clickHandler = () => {
    toggleMenu()
  }

  return (
    <button
      className={isMenuOpen ? 'active' : ''}
      aria-label="Відкрити головне меню"
      onClick={clickHandler}
    >
      <span className="bar"></span>
      <span className="bar"></span>
      <span className="bar"></span>
    </button>
  )
}

export default HamburgerButton
