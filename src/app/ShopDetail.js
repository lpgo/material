import React, {Component} from 'react';

import ProductItem from './ProductItem';
import RaisedButton from 'material-ui/RaisedButton';

export default class ShopDetail extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			shop:{Products:[]},
			addState:false;
		};
	}

	componentDidMount() {
		fetch(`/getShopById?id=${this.props.params.id}`)
		.then(resp => resp.json())
		.then(result => {
			this.setState({shop:result});
		});
		//
		this.setState({shop:{
			Name:"123",
			Phone:"55555",
			Address:"fugu",
			Desc:"good",
			Pid:"",
			Products:[],
		}});
	}

	render() {
		return (
			<div>
				<h1>{this.state.shop.Name}</h1>
				<h2>{this.state.shop.Phone}</h2>
				<h3>{this.state.shop.Address}</h3>
				<h4>{this.state.shop.Desc}</h4>
				<img src={this.state.shop.Pic} />
				{this.state.shop.Products.map(p => {
					return (
						<ProductItem key={p.Id} product={p}/>
					);
				})}
				{this.state.addState ? (
					<AddProduct shopId={this.state.shop.Id} done={this.addDone}/>
				) : (
					<RaisedButton label="添加商品" primary={true} onClick={this.add} />
				)} 
			</div>
		);
	}
}