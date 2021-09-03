import GMath from './GMath/GMath'
import './index.css'

function App () {
  const data = {
    eqs: [
      { start: 'y=1+x', goal: 'y=2' },
      { start: 'x+2y=5', goal: 'x=1' }
      // { start: 'z=x+y+1', goal: 'z=4' }
    ],
    matchCommuted: true,
    matchAnyEq: false
  }

  return (
    <div className='App'>
      <GMath eqs={data.eqs} matchCommuted={data.matchCommuted} matchAnyEq={data.matchAnyEq} />
    </div>
  )
}

export default App
