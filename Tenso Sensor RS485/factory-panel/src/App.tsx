import './App.css'
import NavState from './context/navState'
import MainMenu from './components/UI/MainMenu/MainMenu'
import Footer from './components/UI/Footer/Footer'
import Router from './components/Router/Router'

function App() {
  return (
    <>
      <NavState>
        <MainMenu />
      </NavState>
      <Router />
      <Footer></Footer>
    </>
  )
}

export default App
