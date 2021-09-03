import { useEffect, useRef, useState } from 'react'
import { canvasSmallToolbarSettings, derivationSettings, flexibleComparisonOptions, strictComparisonOptions } from './configurations'

function GMath ({ eqs, matchCommuted, matchAnyEq }) {
  const [canvas, setCanvas] = useState(null)
  const [paths, setPaths] = useState([])
  const [isSolved, setIsSolved] = useState(false)
  const container = useRef()
  useEffect(() => {
    window.loadGM(() => initCanvas(), { version: 'latest' })
  }, [])

  useEffect(() => {
    setupDerivations()
  }, [canvas])

  const initCanvas = () => {
    window.gmath.setDarkTheme(true)
    window.gmath.SettingsType.get('Derivation').defaults.setAll(
      derivationSettings
    )

    if (canvas) {
      canvas.controller.reset()
      document
        .querySelectorAll('.divider-line')
        .forEach((e) => e.parentNode.removeChild(e))
    } else { setCanvas(new window.gmath.Canvas('#gm-div', canvasSmallToolbarSettings)) }
    setPaths([])
  }

  const setupDerivations = () => {
    if (!canvas) return
    const width = canvas.model.viewport().width
    const col = width / eqs.length

    const newDerivations = eqs.map(({ start }, i) => {
      if (i) addLine(col * i)
      return canvas.model.createElement(
        'derivation',
        { eq: start, pos: { x: col * i + col / 2, y: 20 } },
        null,
        (der) => der.moveElement({ x: -der.size.width / 2, y: 0 })
      )
    })

    canvas.controller.on('timelineChange', () => {
      const isSolved = checkIfSolved(newDerivations)
      setIsSolved(isSolved)
      setTimeout(() => adjustColumns(), 0)
    })
    checkIfSolved(newDerivations)
  }

  const checkIfSolved = (derivations) => {
    return eqs.every(({ goal }, i) => {
      console.log(goal)
      if (!derivations) return null
      if (goal === '') return true // ignore empty goals
      if (matchAnyEq) {
        return derivations.some((der) => isEqual(der, goal))
      } else {
        return isEqual(derivations[i], goal)
      }
    })
  }

  const isEqual = (der, eq) => {
    const opts = matchCommuted
      ? flexibleComparisonOptions
      : strictComparisonOptions
    return window.gmath.AlgebraModel.algExpressionsAreEqual(
      opts,
      der.getLastModel(),
      eq
    )
  }

  const adjustScale = (factor) => {
    canvas.model.scaling(canvas.model.scaling() * factor)
  }

  const adjustColumns = () => {
    const h = canvas.model.size().height
    paths.forEach((path) => {
      path.points = path.points.map((p) => [p[0], p[1] ? h : 0])
      path.update()
    })
  }

  const addLine = (x) => {
    const h = canvas.model.viewport().height
    const newPath = canvas.model.createPath({
      points: [
        [x, 0],
        [x, h]
      ]
    })
    newPath.color = 'gray'
    newPath.element.style('stroke', 'gray')
    newPath.element.style('stroke-dasharray', 4)
    const tempPath = [...paths]
    tempPath.push(newPath)
    setPaths(tempPath)
  }

  return (
    <div className='App'>
      <div id='gm-div' ref={container} className={isSolved && 'solved'} style={{ height: '450px' }} />
    </div>
  )
}

export default GMath
