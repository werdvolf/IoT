import Button from '@mui/material/Button'

type Props = {
  buttonText: string
}

const CustomButton = (props: Props) => {
  return <Button variant="contained">{props.buttonText}</Button>
}

export default CustomButton
