/**
 * In this file, we create a React component
 * which incorporates components provided by Material-UI.
 */
import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import {deepOrange500} from 'material-ui/styles/colors';
import FlatButton from 'material-ui/FlatButton';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';

import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import NavigationClose from 'material-ui/svg-icons/navigation/close';

import { Router,Route,browserHistory,Link } from 'react-router';

import AddShop from './AddShop';
import AddType from './AddType';
import ShopList from './ShopList';
import ShopDetail from './ShopDetail';

const style = {
  height: 100,
  width: 100,
  margin: 20,
  textAlign: 'center',
  display: 'inline-block',
};

const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500,
  },
});

class Main extends Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <Router history={browserHistory}>
          <Route path="/admin" component={App} >
            <Route path="addShop" component={AddShop} />
            <Route path="addType" component={AddType} />
            <Route path="shopList" component={ShopList} />
            <Route path="shop/:id" component={ShopDetail} />
          </Route>
        </Router>
      </MuiThemeProvider>
    );
  }
}

class App extends Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <div>
        <AppBar title="title" 
          iconElementRight={<Logged />} 
          iconElementLeft={<IconButton><NavigationClose /></IconButton>}
        />
        {this.props.children}
      </div>
    );
  }
}


const Logged = (props) => (
  <IconMenu
    {...props}
    iconButtonElement={
      <IconButton><MoreVertIcon /></IconButton>
    }
    targetOrigin={{horizontal: 'right', vertical: 'top'}}
    anchorOrigin={{horizontal: 'right', vertical: 'top'}}
  >
    <Link to="/admin/addType"><MenuItem primaryText="添加类型" /></Link>
    <Link to="/admin/addShop"><MenuItem primaryText="添加商铺" /></Link>
    <Link to="/admin/shopList"><MenuItem primaryText="商品列表" /></Link>
  </IconMenu>
);

export default Main;
