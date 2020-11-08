import * as React from 'react';
import { LabelModel } from '@projectstorm/react-diagrams';
import { AbstractReactFactory } from '@projectstorm/react-canvas-core';
import styled from '@emotion/styled';

export const Label = styled.div`
  user-select: none;
  pointer-events: auto;
`;

export const LabelWidget = (props) => {
	// const [str, setStr] = React.useState(props.model.value);

	return (
		<Label>
      hola
			{/* <input
				value={str}
				onChange={(event) => {
					const newVal = event.target.value;

					// update value both in internal component state
					setStr(newVal);
					// and in model object
					props.model.value = newVal;
				}}
			/>

			<button onClick={() => console.log('You clicked the button')}>Click me!</button> */}
		</Label>
	);
};


export class CustomLabelFactory extends AbstractReactFactory {
	constructor() {
		super('custom-label');
	}

	generateModel() {
		return new EditableLabelModel();
	}

	generateReactWidget(event) {
		return <LabelWidget model={event.model} />;
	}
}

export class EditableLabelModel extends LabelModel {
	constructor(options = {}) {
		super({
			...options,
			type: 'custom-label'
		})
		this.value = options.value || ''
	}

	serialize() {
		return {
			...super.serialize(),
			value: this.value
		}
	}

	deserialize(event) {
		super.deserialize(event);
		this.value = event.data.value;
	}
}