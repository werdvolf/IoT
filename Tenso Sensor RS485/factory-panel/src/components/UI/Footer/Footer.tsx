import './Footer.css'
import Image from '../Image/Image'
import emptyCircle from '../../../assets/empty-circle.svg'
// import redCircle from '../../../assets/red-circle.svg'
import greenCircle from '../../../assets/green-circle.svg'
import attencionImage from '../../../assets/attencion.svg'

const Footer = () => {
  return (
    <>
      <div className="footer-row">
        <div className="footer-column">
          <p className="footer-text">Запит</p>
          <Image src={emptyCircle} height="15px" width="15px"></Image>
          <p className="footer-text">Відповідь</p>
          <Image src={greenCircle} height="15px" width="15px"></Image>
        </div>
        <div className="footer-column">
          <Image src={attencionImage} height="15px" width="15px"></Image>
          <p className="footer-text">Аварії (N)</p>
        </div>
        <div className="footer-column">
          <p className="footer-text">Інтервал Оновлення(1000ms)</p>
        </div>
        <div className="footer-column">
          <p className="footer-text">Вийти</p>
        </div>
      </div>
    </>
  )
}

export default Footer
