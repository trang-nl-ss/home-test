import React, { useState, useEffect, useCallback } from 'react';
import { NumberCell } from './number-cell/NumberCell'
import './NumberTable.css'


export const NumberTable = () => {
  const [numberTableSize, setNumberTableSize] = useState(0)
  const [numberTable, setNumberTable] = useState([[]])

  const createCell = (value, x, y) => ({ value, x, y })

  const generateNumberTable = useCallback(() => {
    let arr = new Array(numberTableSize);
    for (let i = 0; i < numberTableSize; i++) {
      arr[i] = new Array(numberTableSize)
      let con = i * numberTableSize + 1
      if (i % 2 === 0) {
        for ( let j = 0; j < numberTableSize; j++) {
          arr[i][j] = createCell(con++, i, j)
        }
      } else {
        for (let j = numberTableSize - 1; j >= 0; j--) {
          arr[i][j] = createCell(con++, i, j)
        }
      }
    }
    setNumberTable(arr.map(item => [...item]))
  }, [numberTableSize])

  const swapBoxes = (fromCell, toCell) => {
    let table = numberTable.map(item => [...item])
    let temp = table[fromCell.x][fromCell.y].value
    table[fromCell.x][fromCell.y].value = table[toCell.x][toCell.y].value
    table[toCell.x][toCell.y].value = temp

    setNumberTable(table.map(item => [...item]))
  }

  const handleDragStart = data => event => {
    const fromCell = JSON.stringify(data)
    event.dataTransfer.setData("dragContent", fromCell)
  }

  const handleDragOver = data => event => {
    event.preventDefault()
    return false
  }
  
  const handleDrop = data => event => {
    event.preventDefault();
    
    const fromCell = JSON.parse(event.dataTransfer.getData("dragContent"));
    const toCell = data;

    swapBoxes(fromCell, toCell);
    return false;
  };

  useEffect(() => {
    if (numberTableSize > 0) {
      generateNumberTable()
    }
  }, [numberTableSize, generateNumberTable])

  return (
    <div className="table-wrapper">
      <div className="table-wrapper__header">
        <span>Please enter size of number table: </span>
        <input type='number' value={numberTableSize} onChange={(event) => setNumberTableSize(+event.target.value)} />
      </div>
      <div className="table-wrapper__content">
        { numberTable.map((item, index) => 
            <div key={index}>
              {item.map((cell) => 
                <NumberCell
                  cell={cell}
                  key={cell.value}
                  draggable="true"
                  onDragStart={handleDragStart}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                />)}
            </div>
        )}
      </div>
    </div>
  )
}