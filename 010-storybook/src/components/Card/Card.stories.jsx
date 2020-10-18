import React from 'react';
import Card from './Card';

export default {
	title: 'Card',
	component: Card,
};

const Template = (args) => <Card {...args} />;

export const DefaultCard = Template.bind({});

DefaultCard.args = {
	title: `It's awesome`,
};
