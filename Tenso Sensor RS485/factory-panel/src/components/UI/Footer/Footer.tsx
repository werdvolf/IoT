import {  useTheme, Theme, CSSObject } from '@mui/material/styles'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import SvgIcon from '@mui/material/SvgIcon'
import emptyCircle from '../../../assets/empty-circle.svg'
import greenCircle from '../../../assets/green-circle.svg'
import attencionImage from '../../../assets/attencion.svg'

const useStyles = (theme: Theme): CSSObject => ({
  footerRow: {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  footerText: {
    marginRight: theme.spacing(1),
  },
  icon: {
    width: '15px',
    height: '15px',
    marginRight: theme.spacing(1),
  },
})

const Footer = () => {
  const theme = useTheme()

  return (
    <Paper elevation={3} className={theme.footerRow}>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Typography variant="body2" className={theme.footerText}>
            Запит
          </Typography>
          <SvgIcon
            component={emptyCircle}
            viewBox="0 0 24 24"
            className={theme.icon}
          />
          <Typography variant="body2" className={theme.footerText}>
            Відповідь
          </Typography>
          <SvgIcon
            component={greenCircle}
            viewBox="0 0 24 24"
            className={theme.icon}
          />
        </Grid>
        <Grid item xs={3}>
          <SvgIcon
            component={attencionImage}
            viewBox="0 0 24 24"
            className={theme.icon}
          />
          <Typography variant="body2" className={theme.footerText}>
            Аварії (N)
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography variant="body2" className={theme.footerText}>
            Інтервал Оновлення(1000ms)
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography variant="body2" className={theme.footerText}>
            Вийти
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default Footer
