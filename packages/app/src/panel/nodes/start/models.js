import { DefaultLinkModel, NodeModel, PortModelAlignment, PortModel } from '@projectstorm/react-diagrams'

export class StartPortModel extends PortModel {
	constructor(alignment) {
		super({
			type: 'start',
			name: alignment,
			alignment,
			in: false
		})
	}

	createLinkModel() {
		return new DefaultLinkModel()
	}
}

export class StartNodeModel extends NodeModel {
	constructor() {
    super({ type: 'start'	})
    this.addPort(new StartPortModel(PortModelAlignment.RIGHT))
	}
}