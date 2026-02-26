import { useState } from 'react'
import Board from './components/Board'
import { supabase } from './lib/supabase'
import './App.css'

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6],
  ]
  for (const [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}

export default function App() {
  const [squares, setSquares] = useState(Array(9).fill(null))
  const [xIsNext, setXIsNext] = useState(true)

  const winner = calculateWinner(squares)
  const isDraw = !winner && squares.every(Boolean)

  function handleSquareClick(i) {
    if (squares[i] || winner) return
    const next = squares.slice()
    next[i] = xIsNext ? 'X' : 'O'
    setSquares(next)
    setXIsNext(!xIsNext)
  }

  function handleReset() {
    setSquares(Array(9).fill(null))
    setXIsNext(true)
  }

  let status
  if (winner) status = `Winner: ${winner}`
  else if (isDraw) status = 'Draw!'
  else status = `Next: ${xIsNext ? 'X' : 'O'}`

  return (
    <div className="app">
      <h1>Tic-Tac-Show</h1>
      <p className="status">{status}</p>
      <Board squares={squares} onSquareClick={handleSquareClick} />
      <button className="reset-btn" onClick={handleReset}>Reset</button>
    </div>
  )
}
