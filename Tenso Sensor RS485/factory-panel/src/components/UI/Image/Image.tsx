type Props = {
  height: string
  width: string
  src: string
}

const Image = (props: Props) => {
  return <img src={props.src} height={props.height} width={props.width}></img>
}

export default Image
