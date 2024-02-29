import { ReactNode } from 'react'
import Button, { ButtonProps } from '@mui/material/Button'
import IconButton, { IconButtonProps } from '@mui/material/IconButton'

type CusomButtonProps = {
  buttonText?: string
  buttonIcon?: ReactNode
  onClick?: () => void
  sx?: React.CSSProperties
} & ButtonProps &
  IconButtonProps

const CustomButton = (props: CusomButtonProps) => {
  const { buttonText, buttonIcon, onClick, sx, ...rest } = props
  if (props.buttonText) {
    return (
      <Button variant="contained" onClick={onClick} sx={{ ...sx }} {...rest}>
        {buttonText} {buttonIcon}
      </Button>
    )
  } else if (buttonIcon && !buttonText) {
    return (
      <IconButton onClick={onClick} sx={{ ...sx }} size="small" {...rest}>
        {buttonIcon}
      </IconButton>
    )
  }
}

export default CustomButton
