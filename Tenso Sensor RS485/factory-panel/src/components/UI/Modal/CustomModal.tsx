import React, { ReactElement, useState } from 'react'

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
  title: string
  children: ReactElement
  openModalButton: ReactElement
}

const CustomModal = ({
  title,
  children,
  openModalButton,
}: CustomModalProps) => {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <div>
      {React.cloneElement(openModalButton, { onClick: handleOpen })}
      <Modal
        open={open}
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
          {React.cloneElement(children, { onClose: handleClose })}
        </Box>
      </Modal>
    </div>
  )
}

export default CustomModal
