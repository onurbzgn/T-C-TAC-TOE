import { useState } from "react"

export default function Player({ initialName, symbol, isactive ,onChangeName }) {
    const [playerName, setPlayerName] = useState(initialName)
    const [isEdit, setIsEdit] = useState(false)


    function handlerIsEdit() {
        setIsEdit(editing => !editing)
        if(isEdit){
            onChangeName(symbol,playerName)
        }
    }

    function handlechangename(event) {
        setPlayerName(event.target.value)

    }

    let editplayerName = <span className="player-name">{playerName}</span>
    if (isEdit) {
        editplayerName = <input type="text" required value={playerName} onChange={handlechangename} />
    }
    return (
        <li className={isactive ? "active" : undefined}>
            <span className="player">
                {editplayerName}
                <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handlerIsEdit}>{isEdit ? "SAVE" : "EDİT"}</button>
        </li>
    )
}