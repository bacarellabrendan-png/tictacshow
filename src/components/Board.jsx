import Square from './Square'

export default function Board({ squares, onSquareClick }) {
  return (
    <div className="board">
      {squares.map((value, i) => (
        <Square key={i} value={value} onClick={() => onSquareClick(i)} />
      ))}
    </div>
  )
}
