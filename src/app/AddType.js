import React, {Component} from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import Uploader from './Uploader';

const style = {
	margin:12,
};

export default class AddType extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			name:"",
			url:"",
			open:false
		};

		this.handleChange = this.handleChange.bind(this);
		this.uploadSuccess = this.uploadSuccess.bind(this);
		this.add = this.add.bind(this);

	}

	handleChange(event) {
		this.setState({name:event.target.value});
	}

	uploadSuccess(name) {

		this.setState({
			url:name
		});
	}

	add() {
		const data = new FormData();
		data.append("name",this.state.name);
		data.append("url",this.state.url);
		fetch("/console/addType",
			{
				method: "POST",
				body:data,
			}
		).then(resp => resp.json())
		.then(result => {
			if(result.Ok)
				this.setState({open:true})
			console.log(result);
		});		
	}


	render() {
		return (
			<div>
				<TextField hintText="名称" floatingLabelText="名称" id="name" onChange={this.handleChange}/>
				<Uploader id={1} success={this.uploadSuccess} />
				<RaisedButton label="添加" primary={true} style={style} onClick={this.add} />
				<Snackbar open={this.state.open} message="添加成功" autoHideDuration={3000} />
			</div>
		);
	}
}