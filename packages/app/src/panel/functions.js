import createEngine, { DiagramModel, DefaultNodeModel, PortModelAlignment } from '@projectstorm/react-diagrams'
import { StartNodeFactory, StartPortModel, StartNodeModel } from './nodes/start'
import { TransformNodeFactory, TransformPortModel, TransformNodeModel } from './nodes/transform'
import { CustomLabelFactory } from './label'
import { CustomPortFactory } from './port'

export const init = (elements) => {
  const engine = createEngine()
  const portFactories = engine.getPortFactories()
  const nodeFactories = engine.getNodeFactories()
  const labelFactories = engine.getLabelFactories()

	portFactories.registerFactory(new CustomPortFactory('start', config => new StartPortModel(PortModelAlignment.RIGHT)))
	portFactories.registerFactory(new CustomPortFactory('transform', config => new TransformPortModel(PortModelAlignment.LEFT)))
  nodeFactories.registerFactory(new StartNodeFactory())
  nodeFactories.registerFactory(new TransformNodeFactory())
  labelFactories.registerFactory(new CustomLabelFactory())

  const model = new DiagramModel()
  model.addAll(...elements)
  engine.setModel(model)
  return engine
}

export const createNode = params => {
  if (!params.options.name) {
    throw new Error('Node name is mandatory')
  }

  let node
  if (params.type === 'start') {
    node = new StartNodeModel()
  } else if (params.type === 'transform') {
    node = new TransformNodeModel()
  } else {
    node = new DefaultNodeModel(params.options)
  }

  // console.log('node', node);

  if (params.position) {
    node.setPosition(params.position.x, params.position.y)
  }

  return node
}