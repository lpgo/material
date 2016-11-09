import React, {Component} from 'react';
import Uploader from './Uploader';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const style = {
	margin:12,
};

export default class AddShop extends Component {
	constructor(props) {
		super(props);

		this.uploadSuccess = this.uploadSuccess.bind(this);
		this.add = this.add.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.typeChange = this.typeChange.bind(this);

		this.state = {
			pic : "",
			name: "",
			phone: "",
			address: "",
			desc: "",
			typeData:[],
			typeId:"",
			open:false,
		};

		fetch("/getAllTypes")
		.then(resp => resp.json())
		.then(result => {
			this.setState({typeData:result})
		});
	};

	handleChange(event){
	   switch(event.target.id) {
	   		case "name" : this.setState({name:event.target.value});break;
	   		case "phone" : this.setState({phone:event.target.value});break;
			case "address" : this.setState({address:event.target.value});break;
	   		case "desc" : this.setState({desc:event.target.value});break;
	   }
	};

	typeChange(event, index, value) {
		this.setState({typeId:value});
	}

	uploadSuccess(name) {

		this.setState({
			pic:name
		});
	};


	add() {
		const data = new FormData();
		data.append("name",this.state.name);
		data.append("phone",this.state.phone);
		data.append("address",this.state.address);
		data.append("desc",this.state.desc);
		data.append("pic",this.state.pic);
		data.append("typeId",this.state.typeId);
		console.log(data);
		fetch("/console/addShop",
			{
				method: "POST",
				body:data,
			}
		).then(resp => resp.json())
		.then(result => {
			this.setState({open:true})
			console.log(result);
		});		
	};

	componentDidMount() {

	};

	render() {

		const typeList = this.state.typeData.map((type) => 
			<MenuItem value={type.Id} primaryText={type.Name} />
		);

		return (
			<div>
				<TextField hintText="名称" floatingLabelText="名称" id="name" onChange={this.handleChange}/>
				<TextField hintText="电话" floatingLabelText="电话" id="phone" onChange={this.handleChange}/><br/>
				<TextField hintText="地址" floatingLabelText="地址" id="address" onChange={this.handleChange}/>
				<TextField hintText="描述" floatingLabelText="描述" id="desc" onChange={this.handleChange}/>
				<Uploader id={1} success={this.uploadSuccess} />

				<SelectField
		          floatingLabelText="类型"
		          value={this.state.typeId}
		          onChange={this.typeChange}
		        >
		          {typeList}
		        </SelectField>

				<RaisedButton label="添加" primary={true} style={style} onClick={this.add} />
				<Snackbar
		          open={this.state.open}
		          message="添加成功"
		          autoHideDuration={3000}
		        />
			</div>
		)
	};


}