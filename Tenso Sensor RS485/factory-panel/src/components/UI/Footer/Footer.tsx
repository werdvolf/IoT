import { Grid, Typography } from '@mui/material'
import { RadioButtonUnchecked, CheckCircle, Warning } from '@mui/icons-material'
import './Footer.css'

const Footer = () => {
  return (
    <Grid container className="footer-row">
      {/* First Column */}
      <Grid item className="footer-column">
        <Typography variant="body2" className="footer-text">
          Запит
        </Typography>
        <RadioButtonUnchecked fontSize="small" />
        <Typography variant="body2" className="footer-text">
          Відповідь
        </Typography>
        <CheckCircle fontSize="small" style={{ color: 'green' }} />
      </Grid>

      {/* Second Column */}
      <Grid item className="footer-column">
        <Warning fontSize="small" />
        <Typography variant="body2" className="footer-text">
          Аварії (N)
        </Typography>
      </Grid>

      {/* Third Column */}
      <Grid item className="footer-column">
        <Typography variant="body2" className="footer-text">
          Інтервал Оновлення(1000ms)
        </Typography>
      </Grid>

      {/* Fourth Column */}
      <Grid item className="footer-column">
        <Typography variant="body2" className="footer-text">
          Вийти
        </Typography>
      </Grid>
    </Grid>
  )
}

export default Footer
