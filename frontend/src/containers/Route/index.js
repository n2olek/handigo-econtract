import React from "react";
import { connect } from "react-redux";
import { Route } from "react-router-dom";
import { setReduxThisRoute } from "actions";
import {
  LoginContainer,
  AdminLayoutContainer,
  HotelLayoutContainer
} from "containers";
import { setReduxUserAuth } from "actions";
import {
  // ROUTE_PATH,
  // redirect,
  setLocalstorage,
  getLocalstorage,
  logout,
  checkUserLoginSession
} from "helpers";

class RouteContainer extends React.Component {
  state = {
    role: 0
  };

  componentWillMount() {
    const { 
      history, 
      setReduxThisRoute 
    } = this.props;
    setReduxThisRoute(history);
    this.checkUser();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.user.role_id !== this.props.user.role_id)
      this.checkUser(nextProps.user);
  }

  checkUser = user => {
    if (!user) {
      user = this.props.user;
      if (!user || !user.role_id) user = getLocalstorage("user") || {};
    }
    if (user.role_id && checkUserLoginSession(user)) {
      this.props.setReduxUserAuth(user);
      setLocalstorage("user", user);
      this.setState({ role: user.role_id });
    } else {
      this.setState({ role: 0 });
      logout();
    }
  };
  renderByRole = role => {
    switch (role) {
      case 1:
        return null;
      case 2:
        return AdminLayoutContainer;
      case 3:
        return HotelLayoutContainer;
      default:
        return null;
    }
  };

  render() {
    return (
      <div className="route-container">
        <Route exact path="/" component={LoginContainer} />
        <Route path="/" component={this.renderByRole(this.state.role)} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});
const mapDispatchToProps = dispatch => ({
  setReduxThisRoute: data => dispatch(setReduxThisRoute(data)),
  setReduxUserAuth: data => dispatch(setReduxUserAuth(data))
});
export default connect(mapStateToProps, mapDispatchToProps)(RouteContainer);
