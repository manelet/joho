import * as React from 'react'
import { AbstractReactFactory } from '@projectstorm/react-canvas-core'

import Start from './component'
import { StartNodeModel  }  from './models'

export class StartNodeFactory extends AbstractReactFactory {
	constructor() {
		super('start');
	}

	generateReactWidget(event) {
		return <Start engine={this.engine} node={event.model} />
	}

	generateModel(event) {
		return new StartNodeModel()
	}
}