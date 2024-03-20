import { useEffect, useState } from 'react'
import { List, arrayMove } from 'react-movable'

import CustomListItem from './CustomListItem'

const CustomMovableList = () => {
  const [items, setItems] = useState(['Item 1', 'Item 2', 'Item 3'])

  useEffect(() => {
    console.log(items)
  }, [items])

  const moveUp = () => {}

  const moveDown = () => {}

  return (
    <List
      values={items}
      onChange={({ oldIndex, newIndex }) =>
        setItems(arrayMove(items, oldIndex, newIndex))
      }
      renderList={({ children, props }) => <ul {...props}>{children}</ul>}
      renderItem={({ value, props, isDragged, isSelected }) => (
        <CustomListItem
          {...props}
          value={value}
          isDragged={isDragged}
          isSelected={isSelected}
        />
      )}
    />
  )
}

export default CustomMovableList
