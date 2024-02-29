import { ReactElement, useMemo, useState } from 'react'

import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'

import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import AddIcon from '@mui/icons-material/Add'

import { HeadCell } from '../../Data/HeadCell'
import { Row } from '../../Data/TableRows'

import CustomButton from '../CustomButton/CustomButton'
import CustomModal from '../Modal/CustomModal'

import styles from './Table.module.css'

interface TableProps {
  title: string
  headCells: readonly HeadCell[]
  rows: Row[]
  addRowModal?: ReactElement
  editRowModal?: ReactElement
  deleteRowAction?: (id: number) => void
}

const CustomTable = ({
  title,
  headCells,
  rows,
  addRowModal,
  editRowModal,
  deleteRowAction,
}: TableProps) => {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const isActionsPresent = useMemo(
    () => !!deleteRowAction || !!editRowModal,
    [editRowModal, deleteRowAction],
  )

  const renderRow = (row: Row, index: number) => {
    const absoluteIndex = page * rowsPerPage + index + 1

    return (
      <TableRow
        key={absoluteIndex}
        sx={{
          '&:last-child td, &:last-child th': { border: 0 },
        }}
      >
        <TableCell
          component="th"
          scope="row"
          key="ID"
          sx={{
            fontWeight: 'bold',
          }}
        >
          {absoluteIndex}
        </TableCell>

        {isActionsPresent && (
          <TableCell className={styles.actions}>
            {!!editRowModal && (
              <CustomModal
                openModalButton={
                  <CustomButton
                    buttonIcon={<EditIcon />}
                    type="submit"
                  />
                }
                title="Редагувати"
              >
                {editRowModal}
              </CustomModal>
            )}
            {!!deleteRowAction && (
              <CustomButton
                buttonIcon={<DeleteIcon />}
                onClick={() => deleteRowAction(row.id as number)}
              />
            )}
          </TableCell>
        )}

        {headCells.map(headCell => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'center'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sx={{ whiteSpace: 'nowrap' }}
          >
            {headCell.id in row ? row[headCell.id as keyof Row] : ''}
          </TableCell>
        ))}
      </TableRow>
    )
  }

  return (
    <TableContainer
      component={Paper}
      sx={{ maxHeight: '600px', overflow: 'auto' }}
    >
      <Box p={2}>
        <Typography variant="h5" mb={2}>
          {title}
        </Typography>
        {addRowModal && (
          <CustomModal
            openModalButton={
              <CustomButton
                buttonIcon={<AddIcon />}
                buttonText="Додати"
                type="submit"
              ></CustomButton>
            }
            title="Створити"
          >
            {addRowModal}
          </CustomModal>
        )}
        {rows.length === 0 ? (
          <Typography variant="body1" mt={2}>
            Немає даних
          </Typography>
        ) : (
          <Table sx={{ minWidth: 650 }} aria-label="table">
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{
                    fontWeight: 'bold',
                  }}
                >
                  ID
                </TableCell>

                {isActionsPresent && <TableCell>Дії</TableCell>}

                {headCells.map(headCell => (
                  <TableCell
                    key={headCell.id}
                    align={headCell.numeric ? 'right' : 'center'}
                    padding={headCell.disablePadding ? 'none' : 'normal'}
                    sx={{ fontWeight: 'bold' }}
                  >
                    {headCell.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? rows.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage,
                  )
                : rows
              ).map((row, index) => renderRow(row, index))}
            </TableBody>
          </Table>
        )}
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
    </TableContainer>
  )
}

export default CustomTable
