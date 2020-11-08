import React, { useEffect, useState } from 'react'
import { PortModelAlignment } from '@projectstorm/react-diagrams'
import { CanvasWidget } from '@projectstorm/react-canvas-core'
import { init, createNode } from './functions'

function Panel () {
  const [engine, setEngine] = useState(null)

  useEffect(() => {
    const startingNode = createNode({
      type: 'start',
      options: { name: 'Starting point' },
      position: { x: 100, y: 100 }
    })

    const transformNode = createNode({
      type: 'transform',
      options: { name: 'Transformm' },
      position: { x: 500, y: 200 }
    })  

    const link = startingNode.getPort(PortModelAlignment.RIGHT).createLinkModel()
    link.setSourcePort(startingNode.getPort(PortModelAlignment.RIGHT))
    link.setTargetPort(transformNode.getPort(PortModelAlignment.LEFT))

    const engine = init([startingNode, transformNode, link])

    // console.log(engine.getStateMachine().getCurrentState().dragCanvas.fireMouseMoved)
    engine.getStateMachine().getCurrentState().dragCanvas.fireMouseMoved = () => {}

    setEngine(engine)
  }, [])
  
  return (
    <div id='panel'>
      {engine && (
        <CanvasWidget engine={engine}  />
      )}
    </div>
  )
}

export default Panel