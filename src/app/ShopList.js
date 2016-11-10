import React,{Component} from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import {Link} from 'react-router';

export default class ShopLIst extends React.Component {
	constructor(props) {
		super(props);

		this.state = {data:[{Id:123,Name:"aaa",Phone:"1234123",Address:"fugu",Desc:"hao"}]};
		
		fetch("/getAllShops")
		.then(resp => resp.json())
		.then(result => {
			this.setState({data:result})
		});
		
	}

	render() {
		const rows = this.state.data.map((shop) => {
			return (
				<TableRow key={shop.Id}>
					 <TableRowColumn>{shop.Name}</TableRowColumn>
					 <TableRowColumn>{shop.Phone}</TableRowColumn>
					 <TableRowColumn>{shop.Address}</TableRowColumn>
					 <TableRowColumn>{shop.Desc}</TableRowColumn>
					 <TableRowColumn><Link to={`/admin/Shop/${shop.Id}`}>详情</Link></TableRowColumn>
				</TableRow>
			);
		});
		return (
			<Table>
			    <TableHeader displaySelectAll={false}
            		adjustForCheckbox={false}>
			      <TableRow>
			        <TableHeaderColumn>名称</TableHeaderColumn>
			        <TableHeaderColumn>电话</TableHeaderColumn>
			        <TableHeaderColumn>地址</TableHeaderColumn>
			        <TableHeaderColumn>描述</TableHeaderColumn>
			        <TableHeaderColumn>操作</TableHeaderColumn>
			      </TableRow>
			    </TableHeader>
			    <TableBody displayRowCheckbox={false}>
			      {rows}
			    </TableBody>
			</Table>
		);
	}
}