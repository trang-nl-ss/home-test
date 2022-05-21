import './NumberCell.css'

export const NumberCell = ({ cell, draggable, onDragStart, onDragOver, onDrop}) => 
  <div
    className="cell"
    draggable={draggable}
    onDragStart={onDragStart(cell)}
    onDragOver={onDragOver(cell)}
    onDrop={onDrop(cell)}
  >
    <div>{cell?.value}</div>
  </div>
    
  