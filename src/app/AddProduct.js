import React, {Component} from 'react';
import Uploader from './Uploader';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';

export default class AddProduct extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			images:[],
			name:"",
			price:0.0,
			desc:""
		};

		this.handleChange = this.handleChange.bind(this);
		this.uploadSuccess = this.uploadSuccess.bind(this);
		this.add = this.add.bind(this);
	}

	handleChange(event){
	   switch(event.target.id) {
	   		case "name" : this.setState({name:event.target.value});break;
	   		case "price" : this.setState({price:event.target.value.parseFloat()});break;
	   		case "desc" : this.setState({desc:event.target.value});break;
	   }
	};

	uploadSuccess(name) {
		this.setState((prevState, props) => ({
			images:prevState.images.push(name)
		}));
	}

	add() {
		const data = new FormData();
		data.append("name",this.state.name);
		data.append("price",this.state.price);
		data.append("desc",this.state.desc);
		data.append("shopId",this.props.shopId);
		data.append("images",this.state.images);
		console.log(data);
		fetch("/console/addProduct",
			{
				method: "POST",
				body:data,
			}
		).then(resp => resp.json())
		.then(result => {
			this.setState({open:true})
			console.log(result);
		});		
	}

	render() {
		return (
			<div>
				<TextField hintText="名称" floatingLabelText="名称" id="name" onChange={this.handleChange}/>
				<TextField hintText="描述" floatingLabelText="描述" id="desc" onChange={this.handleChange}/>
				<TextField hintText="价格" floatingLabelText="价格" id="price" onChange={this.handleChange} type="number"/>
				{this.state.images.map(i => {
					return (
						<img src={i} />
					);
				})}
				<Uploader id={1} success={this.uploadSuccess} />
				<RaisedButton label="添加" primary={true} style={style} onClick={this.add} />
				<Snackbar
		          open={this.state.open}
		          message="添加成功"
		          autoHideDuration={3000}
		        />
			</div>
		);
	}
}