import { DefaultLinkModel, NodeModel, PortModelAlignment, DefaultPortModel } from '@projectstorm/react-diagrams'

export class TransformPortModel extends DefaultPortModel {
	constructor(alignment) {
		super({
			type: 'transform',
			name: alignment,
			alignment,
			in: alignment === PortModelAlignment.LEFT
		})
	}

	createLinkModel() {
		return new DefaultLinkModel()
	}
}

export class TransformNodeModel extends NodeModel {
	constructor() {
    super({ type: 'transform'	})
    this.addPort(new TransformPortModel(PortModelAlignment.RIGHT))
    this.addPort(new TransformPortModel(PortModelAlignment.LEFT))
	}
}