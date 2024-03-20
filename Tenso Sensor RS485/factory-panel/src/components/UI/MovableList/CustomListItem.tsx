import * as React from 'react'
import { List, arrayMove } from 'react-movable'

const InteractiveItems: React.FC = () => {
  const [inputValue, setInputValue] = React.useState('Input')
  const [taValue, setTaValue] = React.useState('Textarea')
  const [selectValue, setSelectValue] = React.useState('Parrot')
  const [checkboxValue, setCheckboxValue] = React.useState(false)
  const elements = []

  const [items, setItems] = React.useState([0, 1, 2, 3, 4, 5])

  return (
    <div
      style={{
        margin: '0px auto',
        backgroundColor: '#F7F7F7',
        padding: '3em',
      }}
    >
      <List
        values={items}
        onChange={({ oldIndex, newIndex }) =>
          setItems(arrayMove(items, oldIndex, newIndex))
        }
        renderList={({ children, props, isDragged }) => (
          <ul
            {...props}
            style={{ padding: 0, cursor: isDragged ? 'grabbing' : undefined }}
          >
            {children}
          </ul>
        )}
        renderItem={({ value, props, isDragged, isSelected }) => (
          <li
            {...props}
            style={{
              ...props.style,
              padding: '1.5em',
              margin: '0.5em 0em',
              listStyleType: 'none',
              cursor: isDragged ? 'grabbing' : 'grab',
              border: '2px solid #CCC',
              boxShadow: '3px 3px #AAA',
              color: '#333',
              borderRadius: '5px',
              fontFamily: 'Arial, "Helvetica Neue", Helvetica, sans-serif',
              backgroundColor: isDragged || isSelected ? '#EEE' : '#FFF',
            }}
          >
            {elements[value]}
          </li>
        )}
      />
    </div>
  )
}

export default InteractiveItems
