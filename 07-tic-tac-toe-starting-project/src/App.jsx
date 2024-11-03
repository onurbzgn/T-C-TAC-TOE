import { useState } from "react"
import GameBoard from "./components/GameBoard"
import Player from "./components/player"
import Log from "./components/log"
import { WINNING_COMBINATIONS } from "./components/winning_combinations"
import GameOver from "./components/GameOver"




const initialBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
]

function deriveActivePlayer(gameTurns){
  let currentPlayer = "X"

  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O"
  }
  return currentPlayer
}


function App() {
  const [player ,setPlayer]=useState({
    "X":"Player 1",
    "O":"Player 2"
  })
  const [gameTurns, setGameTruns] = useState([])
  // const [activePlayer,setActivePlayer]=useState("X")
  
  const activePlayer = deriveActivePlayer(gameTurns)
   

  let gameBoard = [...initialBoard.map((array)=>[...array])]

  for (const turn of gameTurns){
   const {square,player}=turn
   const {row,col}=square

   gameBoard[row][col]=player
  }

  let winner=null

  for (const combination of WINNING_COMBINATIONS){
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column]
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column]
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column]
    

    if(
      firstSquareSymbol &&
      firstSquareSymbol===secondSquareSymbol &&
      firstSquareSymbol===thirdSquareSymbol   
     )
     {winner = player[firstSquareSymbol]}
  }

  const hasDraw=gameTurns.length===9 && !winner

  function handleChangeSymbol( rowIndex, colIndex ) {
    //setActivePlayer((curActivePlayer) => curActivePlayer === "X" ? "O" : "X")
    setGameTruns((prevTruns) => {
      const currentPlayer=deriveActivePlayer(prevTruns)

      const updateTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTruns
      ]

      return updateTurns
    })
  }


  function handleReset(){
    setGameTruns([])
  }

  function handlePlayerNameChange(symbol,newName) {
    setPlayer(prevPlayers=>{
      return{
        ...prevPlayers,
        [symbol]:newName
      }
    })
    
  }




  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player initialName="Player 1" symbol="X" isactive={activePlayer === "X"} onChangeName={handlePlayerNameChange} />
          <Player initialName="Player 2" symbol="O" isactive={activePlayer === "O"} onChangeName={handlePlayerNameChange}/>
        </ol>
        {(winner || hasDraw) && <GameOver winner={winner} onReset={handleReset}/>}
        <GameBoard onSelectSymbol={handleChangeSymbol} board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>


  )
}

export default App
