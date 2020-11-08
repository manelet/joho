import * as React from 'react'
import { PortModelAlignment, PortWidget } from '@projectstorm/react-diagrams'
import { Port, Wrapper } from '../../shared/components'

const WIDTH = 300
const HEIGHT = 150

function Start ({ engine, node }) {
	return (
    <Wrapper width={WIDTH} height={HEIGHT}>
      <p>Starting point</p>
      <input type="text" placeholder='https://google.com/q?=manel' />
      <PortWidget
        style={{
          left: WIDTH - 8,
          top: HEIGHT / 2 - 8,
          position: 'absolute'
        }}
        port={node.getPort(PortModelAlignment.RIGHT)}
        engine={engine}>
        <Port />
      </PortWidget>
    </Wrapper>
  )
}

export default Start 