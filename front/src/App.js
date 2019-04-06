import React, {Component, Fragment} from 'react';
import {BrowserRouter} from 'react-router-dom';
import {Switch, Route} from 'react-router';
import './App.css';
import ProductList from "./containers/ProductList";
import Layout from "./components/Layout/Layout";
import Login from "./containers/Login/Login";
import Logout from "./containers/Logout/Logout";
import AuthRoute from "./components/AuthRoute/AuthRoute"
import Register from "./containers/Register/Register";
import RegisterActivate from "./containers/Register/RegisterActivate/RegisterActivate";
import UserSettings from "./containers/UserSettings/UserSettings";
import {tokenLogin} from "./store/actions/token-login";
import {connect} from "react-redux";
import Product from './components/Product'
class App extends Component {
    componentDidMount() {
        this.props.tokenLogin();
    }

    render() {
        return (
            <BrowserRouter>
                <Layout>
                    <Switch>
                        <Route path="/product/:id" component={Product}/>
                        <Route path="/login" component={Login}/>
                        <Route path="/logout" component={Logout}/>
                        <Route path="/register" component={Register} exact/>
                        <Route path="/register/activate" component={RegisterActivate}/>
                        <AuthRoute path="/users/:id" component={UserSettings}/>
                        <Route path="/" component={ProductList} exact/>
                    </Switch>
                </Layout>
            </BrowserRouter>
        );
    }
}


const mapStateToProps = state => state.app;
const mapDispatchToProps = dispatch => ({
    tokenLogin: () => dispatch(tokenLogin())
});


export default connect(mapStateToProps, mapDispatchToProps)(App);
