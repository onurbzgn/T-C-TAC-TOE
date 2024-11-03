

export default function GameBoard({onSelectSymbol,board}) {
    // const [gameBoard,setGameBoard]=useState(initialBoard)
    // function handleSelectSymbol(rowIndex,colIndex) {
    //     setGameBoard((prevGameBoard)=>{
    //         const updateGameBoard=[...prevGameBoard.map(innerArray=>[...innerArray])]
    //         updateGameBoard[rowIndex][colIndex]=activeSymbol
    //         return updateGameBoard
    //     })
    //     onSelectSymbol();
    // }
    return (
        <ol id="game-board">
            {board.map((row, rowIndex) =>
                <li key={rowIndex}>
                    <ol>
                        {row.map((playerSymbol, colIndex) =>
                            <li key={colIndex}>
                                <button onClick={()=>onSelectSymbol(rowIndex,colIndex)} disabled={playerSymbol!==null}>
                                    {playerSymbol}
                                </button>
                            </li>
                        )}
                    </ol>
                </li>
            )}
        </ol>
    )
}