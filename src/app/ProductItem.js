import React, {Component} from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

export default class ProductItem extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Card>
			    <CardHeader
			      title={this.props.product.Name}
			    />
			    {this.props.product.Images.map(pic => {
			    	return (
			    		<CardMedia>
			      			<img src={pic} />
			    		</CardMedia>
			    	);
			    })}
			    
			    <CardText>
			      {this.props.product.Desc}
			    </CardText>
			  </Card>
		);
	}
}