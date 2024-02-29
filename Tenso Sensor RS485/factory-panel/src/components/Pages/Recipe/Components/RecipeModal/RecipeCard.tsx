import { useState, useEffect } from 'react'
import { TextField, Typography } from '@mui/material'
import { Grid } from '@mui/material'
import { Controller, useFormContext } from 'react-hook-form'
import { HeadCell } from '../../../../Data/HeadCell'

interface RecipeCardProps {
  rows: readonly HeadCell[]
}

const RecipeCard = ({ rows }: RecipeCardProps) => {
  const { control, watch } = useFormContext()
  const [validComponentCount, setValidComponentCount] = useState<number>(0)

  const watchValues = watch()

  useEffect(() => {
    // Count the number of components with values greater than 0
    const count = rows.reduce((acc, row) => {
      const value = parseFloat(watchValues[row.id])
      if (!isNaN(value) && row.numeric && value > 0) {
        return acc + 1
      }
      return acc
    }, 0)

    setValidComponentCount(count)
  }, [rows, watchValues])

  return (
    <Grid container spacing={2}>
      {rows.map((row, index) => (
        // {row.numeric &&}
        <Grid item xs={row.numeric ? 6 : 12} key={index}>
          <Controller
            name={row.id}
            control={control}
            defaultValue={row.numeric ? 0 : ''}
            rules={{
              required: !row.numeric ? 'Це поле обовязкове' : false,
              validate: value => {
                if (row.numeric) {
                  return validComponentCount >= 2
                }
                return true
              },
            }}
            render={({ field: { value, onChange }, fieldState }) => (
              <TextField
                label={row.label}
                value={value}
                onChange={onChange}
                inputProps={{ min: '0' }}
                type={row.numeric ? 'number' : undefined}
                error={Boolean(fieldState?.error)}
                helperText={fieldState?.error?.message}
                fullWidth
              />
            )}
          />
        </Grid>
      ))}
      {validComponentCount < 2 && (
        <Grid item xs={12}>
          <Typography color="error">
            Хоча б 2 компонента мають бути визначені
          </Typography>
        </Grid>
      )}
    </Grid>
  )
}

export default RecipeCard
