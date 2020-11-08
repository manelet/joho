import * as React from 'react'
import { PortModelAlignment, PortWidget } from '@projectstorm/react-diagrams'
import { Wrapper, Port } from '../../shared/components'

const WIDTH = 300
const HEIGHT = 150

function Transform ({ engine, node }) {
	return (
    <Wrapper width={WIDTH} height={HEIGHT}>
      <p>Transform</p>
      <PortWidget
					style={{
						top: HEIGHT / 2 - 8,
						left: -8,
						position: 'absolute'
					}}
					port={node.getPort(PortModelAlignment.LEFT)}
					engine={engine}>
        <Port />
      </PortWidget>
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

export default Transform 