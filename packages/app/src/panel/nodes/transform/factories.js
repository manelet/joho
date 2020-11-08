import * as React from 'react'
import { AbstractModelFactory, AbstractReactFactory } from '@projectstorm/react-canvas-core'

import Transform from './component'
import { TransformNodeModel  }  from './models'

export class TransformNodeFactory extends AbstractReactFactory {
	constructor() {
		super('transform');
	}

	generateReactWidget(event) {
		return <Transform engine={this.engine} node={event.model} />
	}

	generateModel(event) {
		return new TransformNodeModel()
	}
}