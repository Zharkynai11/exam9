import React, {Component, Fragment} from 'react'
import MenuItem from "./MenuItem/MenuItem";
import {NavLink} from "react-router-dom";

// меню тоже зависит от состояния аутентификации,
// которое нужно достать из state.
import {connect} from "react-redux";

class Menu extends Component {
    state = {
        collapse: true
    };

    toggle = () => {
        this.setState({collapse: !this.state.collapse});
    };

    render() {
        const {username, is_admin, user_id} = this.props.auth;
        return <Fragment>
            <button onClick={this.toggle}
                    className="navbar-toggler"
                    type="button"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"/>
            </button>
            <div className={(this.state.collapse ? "collapse" : "") + " navbar-collapse"}
                 id="navbarNav">
                <ul className="navbar-nav mr-auto">
                    <MenuItem to="/">Товары</MenuItem>
                    {is_admin ? <MenuItem to="/products/add">Добавить товар</MenuItem> : null}
                </ul>

                <ul className="navbar-nav ml-auto">
                    {user_id ? [
                        <li className="nav-item" key="username"><span className="navbar-text">
                            Привет, <NavLink to={"/users/" + user_id}>{username}</NavLink>!
                        </span></li>,
                        <MenuItem to="/logout" key="logout">Выйти</MenuItem>
                    ] : [
                        <MenuItem to="/login" key="login">Войти</MenuItem>,
                        <MenuItem to="/register" key="register">Зарегистрироваться</MenuItem>
                    ]}
                </ul>
            </div>
        </Fragment>
    }
}


// вытаскиваем данные об аутентификации из state
const mapStateToProps = state => ({auth: state.auth});
// никаких дополнительных действий здесь не нужно
const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
