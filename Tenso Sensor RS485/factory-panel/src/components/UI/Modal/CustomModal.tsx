import { ReactElement } from 'react'

import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Typography from '@mui/material/Typography'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: '15px',
  boxShadow: 24,
  p: 4,
}

interface CustomModalProps {
  isOpen: boolean
  handleClose(): void
  title: string
  children: ReactElement
}

const CustomModal = ({
  isOpen,
  handleClose,
  title,
  children,
}: CustomModalProps) => {
  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography
          id="modal-modal-title"
          sx={{ textAlign: 'center' }}
          variant="h6"
          component="h2"
        >
          {title}
        </Typography>
        {children}
      </Box>
    </Modal>
  )
}

export default CustomModal
