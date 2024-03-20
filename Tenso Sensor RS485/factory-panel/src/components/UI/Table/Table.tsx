import { useMemo, useState } from 'react'

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

import styles from './Table.module.css'

interface IProps {
  title: string
  headCells: readonly HeadCell[]
  rows: Row[]
  addRowAction?: () => void
  editRowAction?: (row: Row) => void
  deleteRowAction?: (row: Row) => void
}

const CustomTable = ({
  title,
  headCells,
  rows,
  addRowAction,
  editRowAction,
  deleteRowAction,
}: IProps) => {
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
    () => !!deleteRowAction || !!editRowAction,
    [editRowAction, deleteRowAction],
  )

  const renderRow = (row: Row, index: number) => {
    console.log(row)

    const absoluteIndex = page * rowsPerPage + index + 1

    return (
      <TableRow key={absoluteIndex} className={styles.lastChild}>
        <TableCell
          className={styles.headCells}
          component="th"
          scope="row"
          key="ID"
        >
          {absoluteIndex}
        </TableCell>

        {isActionsPresent && (
          <TableCell align={'center'} className={styles.actions}>
            {!!editRowAction && (
              <CustomButton
                buttonIcon={<EditIcon />}
                type="submit"
                onClick={() => editRowAction(row)}
              />
            )}
            {!!deleteRowAction && (
              <CustomButton
                buttonIcon={<DeleteIcon />}
                onClick={() => deleteRowAction(row)}
              />
            )}
          </TableCell>
        )}

        {headCells.map(headCell => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'center'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
          >
            {headCell.id in row ? row[headCell.id as keyof Row] : ''}
          </TableCell>
        ))}
      </TableRow>
    )
  }

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer
        sx={{ maxHeight: '60vh', border: 'none' }}
        component={Paper}
        className={styles.TableContainer}
      >
        <Box p={2}>
          <Typography variant="h5" mb={2}>
            {title}
          </Typography>
          {addRowAction && (
            <CustomButton
              buttonIcon={<AddIcon />}
              buttonText="Додати"
              type="submit"
              onClick={addRowAction}
            />
          )}
          {rows.length === 0 ? (
            <Typography variant="h5" className={styles.noData} mt={2}>
              Немає даних
            </Typography>
          ) : (
            <Table stickyHeader className={styles.table} aria-label="table">
              <TableHead>
                <TableRow>
                  <TableCell className={styles.headCells}>ID</TableCell>
                  {isActionsPresent && (
                    <TableCell align={'center'} className={styles.headCells}>
                      Дії
                    </TableCell>
                  )}
                  {headCells.map(headCell => (
                    <TableCell
                      className={styles.headCells}
                      key={headCell.id}
                      align={headCell.numeric ? 'right' : 'center'}
                      padding={headCell.disablePadding ? 'none' : 'normal'}
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
        </Box>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  )
}

export default CustomTable
