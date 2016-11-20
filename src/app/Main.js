/**
 * In this file, we create a React component
 * which incorporates components provided by Material-UI.
 */
import React, {Component} from 'react';
import {deepOrange500} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';

import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import NavigationClose from 'material-ui/svg-icons/navigation/close';

import { Router,Route,browserHistory,Link } from 'react-router';

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
            <Route path="addShop" getComponent={(nextState, cb) => {
              require.ensure([], (require) => {
                cb(null, require('./AddShop').default)
              },'AddShop')
            }}  />
            <Route path="addType" getComponent={(nextState, cb) => {
              require.ensure([], (require) => {
                cb(null, require('./AddType').default)
              },'AddType')
            }}   />
            <Route path="shopList" getComponent={(nextState, cb) => {
              require.ensure([], (require) => {
                cb(null, require('./ShopList').default)
              },'ShopList')
            }} />
            <Route path="shop/:id" getComponent={(nextState, cb) => {
              require.ensure([], (require) => {
                cb(null, require('./ShopDetail').default)
              },'ShopDetail')
            }}   />
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
