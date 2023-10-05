import { useState } from 'react'
import { watchValue } from '../../lib/src/main'
import { logErrorOnScreen, logInfoOnScreen } from '../../lib/src/main'
import { watchCount } from '../../lib/src/persistentLogger'
import './App.css'

logErrorOnScreen('Error on app start')

const lorenIpsum =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'

function App() {
  const [count, setCount] = useState(0)

  watchValue('count', count, {
    lastNDiffValues: 5,
  })
  watchValue('fraction', count / 123)
  watchValue('fixed lenght fraction', count / 4, {
    minFractionDigits: 5,
  })
  watchValue('long number', count * 12345)
  watchValue('text', 'text')
  watchValue('long text', lorenIpsum)
  watchValue('obj', { a: 1, b: 2, c: 3 })

  return (
    <div
      className="App"
      onMouseMove={(e) => {
        watchValue('mouse x', e.clientX, {
          lastNDiffValues: 5,
        })
        watchValue('mouse y', e.clientY, {
          lastNDiffValues: 5,
        })
      }}
    >
      <h1>S Logget test</h1>

    </div>
  )
}

export default App
