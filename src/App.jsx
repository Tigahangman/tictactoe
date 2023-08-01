import './App.css';
import { useEffect, useReducer, useState } from 'react';
import { PLAYO, PLAYX, RESTART, reducer } from './reducer/reducer';

function App() {

  const defaultMap = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
  ]

  const winPositions = [
    /*horizontal*/
    [
      { i: 0, j: 0 },
      { i: 0, j: 1 },
      { i: 0, j: 2 }
    ],
    [
      { i: 1, j: 0 },
      { i: 1, j: 1 },
      { i: 1, j: 2 }
    ],
    [
      { i: 2, j: 0 },
      { i: 2, j: 1 },
      { i: 2, j: 2 }
    ],

    /*Vertical*/
    [
      { i: 0, j: 0 },
      { i: 1, j: 0 },
      { i: 2, j: 0 }
    ],
    [
      { i: 0, j: 1 },
      { i: 1, j: 1 },
      { i: 2, j: 1 }
    ],
    [
      { i: 0, j: 2 },
      { i: 1, j: 2 },
      { i: 2, j: 2 }
    ],

    /*Diagonal*/
    [
      { i: 0, j: 0 },
      { i: 1, j: 1 },
      { i: 2, j: 2 }
    ],
    [
      { i: 0, j: 2 },
      { i: 1, j: 1 },
      { i: 2, j: 0 }
    ],
  ]
  const [tictac, dispatch] = useReducer(reducer, defaultMap)

  const [player, setPlayer] = useState('x')
  const [counter, setCounter] = useState(0)
  const [xxx, setXxx] = useState(0)
  const [ooo, setOoo] = useState(0)
  const [draww, setDraww] = useState(0)
  function win() {
    for (let i = 0; i < winPositions.length; i++) {
      const [a, b, c] = winPositions[i]
      if (tictac[a.i][a.j] && tictac[a.i][a.j] == tictac[b.i][b.j] && tictac[a.i][a.j] == tictac[c.i][c.j]) {




        return tictac[a.i][a.j]
      }

    }
    if (counter == 9) {

      return 'draw'
    }

    return null
  }

  function comp() {
    for (let i = 0; i < winPositions.length; i++) {
      const [a, b, c] = winPositions[i]
      if (tictac[a.i][a.j] == 'o' && tictac[a.i][a.j] == tictac[b.i][b.j] && tictac[c.i][c.j] == '')
        return { k: c.i, l: c.j }
      if (tictac[b.i][b.j] == 'o' && tictac[c.i][c.j] == tictac[b.i][b.j] && tictac[a.i][a.j] == '')
        return { k: a.i, l: a.j }
      if (tictac[c.i][c.j] == 'o' && tictac[a.i][a.j] == tictac[c.i][c.j] && tictac[b.i][b.j] == '')
        return { k: b.i, l: b.j }
    }
    for (let i = 0; i < winPositions.length; i++) {
      const [a, b, c] = winPositions[i]
      if (tictac[a.i][a.j] == 'x' && tictac[a.i][a.j] == tictac[b.i][b.j] && tictac[c.i][c.j] == '')
        return { k: c.i, l: c.j }
      if (tictac[b.i][b.j] == 'x' && tictac[c.i][c.j] == tictac[b.i][b.j] && tictac[a.i][a.j] == '')
        return { k: a.i, l: a.j }
      if (tictac[c.i][c.j] == 'x' && tictac[a.i][a.j] == tictac[c.i][c.j] && tictac[b.i][b.j] == '')
        return { k: b.i, l: b.j }
    }
    let row
    let colums
    do {
      row = Math.floor(Math.random() * 3)
      colums = Math.floor(Math.random() * 3)
    } while (tictac[row][colums] != '')
    return { k: row, l: colums }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (player === 'o' && !win() && counter !== 9) {
        setPlayer('x')
        setCounter(counter + 1)
        dispatch({
          type: PLAYO,
          payload: comp()
        })
      }
    }, 500)

    return () => clearInterval(interval)

  }, [tictac])

  return (
    <div className='gameArea'>
      {
        !win() ? (<div className='game'>
          <div>
            <div>x: {xxx}</div>
            <div>o:{ooo}</div>
            <div>draw:{draww} </div>
          </div>
          {
            tictac.map((rows, i) => {
              return (
                <div key={Math.random()} className='section'>
                  {
                    rows.map((cols, j) => {
                      return (
                        <div key={Math.random()} className='box' onClick={() => {
                          if (counter !== 9 && player === 'x' && !win() && tictac[i][j] === '') {
                            setPlayer('o')
                            setCounter(counter + 1)
                            dispatch({
                              type: PLAYX,
                              payload: { i, j }
                            })
                          }
                        }}>
                          {cols}
                        </div>
                      )
                    })
                  }
                </div>
              )
            })
          }
        </div>) : (
          <div className={win()}>
            {win() != 'draw' ? 'Победитель ' + win() : "Draw"}
            <button onClick={() => {
              if (win() == 'x') {
                setXxx(xxx + 1)
              } else if (win() == 'o') {
                setOoo(ooo + 1)
              } else {
                setDraww(draww + 1)
              }
              setCounter(0)
              setPlayer('x')
              dispatch({
                type: RESTART,
                payload: defaultMap
              })
            }}>new game</button>
          </div>
        )
      }

    </div>
  );
}

export default App;
