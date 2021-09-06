import React, { useEffect, useState } from 'react'
import { canvasSmallToolbarSettings, derivationSettings, flexibleComparisonOptions, strictComparisonOptions } from './configurations'
function GMath ({ eqs, matchCommuted, matchAnyEq }) {
  const [canvas, setCanvas] = useState(null)
  const [paths, setPaths] = useState([])
  const [isSolved, setIsSolved] = useState(false)
  // const [isLoading, setIsLoading] = useState(false)
  useEffect(() => {
    !window.gmath && loadGMScript()
    // eslint-disable-next-line
  }, [])
  const loadGMScript = () => {
    const script = document.createElement('script')
    script.id = 'gmScript'
    script.src = 'https://graspablemath.com/shared/libs/gmath/gm-inject.js'
    script.onload = () => onGMLoad()
    document.body.appendChild(script)
    // const scripted = document.getElementById('gmScript')
    // setLoaded(!scripted)
  }
  const onGMLoad = () => {
    const { loadGM } = window
    loadGM(() => initCanvas())
  }
  useEffect(() => {
    setupDerivations()
    // eslint-disable-next-line
  }, [canvas]) 
  const initCanvas = async () => {
    const { gmath } = window
    // setIsLoading(true)
    gmath.setDarkTheme(true)
    gmath.SettingsType.get('Derivation').defaults.setAll(
      derivationSettings
    )
    // setIsLoading(false)
    if (canvas) {
      canvas.controller.reset()
      document
        .querySelectorAll('.divider-line')
        .forEach((e) => e.parentNode.removeChild(e))
    } else {
      console.log({ gmath })
      const canvas = await new gmath.Canvas('#gm-div', canvasSmallToolbarSettings)
      setCanvas(canvas)
      setPaths([])
    }
  }
  const setupDerivations = () => {
    // if (isLoading) return
    if (!canvas) return
    console.log({canvas});
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
    canvas.controller.on('start_hwr', () => {
      // const isSolved = checkIfSolved(newDerivations)
      // setIsSolved(isSolved)
      // setTimeout(() => adjustColumns(), 0)
      console.log('lorem');
    })
    checkIfSolved(newDerivations)
  }
  const checkIfSolved = (derivations) => {
    return eqs.every(({ goal }, i) => {
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
    const { gmath } = window
    const opts = matchCommuted
      ? flexibleComparisonOptions
      : strictComparisonOptions
    return gmath.AlgebraModel.algExpressionsAreEqual(
      opts,
      der.getLastModel(),
      eq
    )
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
  const loadDesmosScript = () => {
    const script = document.createElement('script')
    script.id = 'desmosScript'
    script.src = 'https://www.desmos.com/api/v1.5/calculator.js?apiKey=dcb31709b452b1cf9dc26972add0fda6'
    document.body.appendChild(script)
  }
  // if (isLoading) return <h1>Loading</h1>
  return (
    <div>
      <div
        id='gm-div'
        className={isSolved && 'solved'}
        style={{ height: '450px' }}
      />
      <span>Desmos Script Loaded</span>  
    </div>
  )
}
export default GMath
