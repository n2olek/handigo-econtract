import React from 'react';
import { connect } from 'react-redux';
import { FormLogin } from 'components';
import { setReduxUserAuth } from 'actions';
import {
  ROUTE_PATH,
  redirect,
  setLocalstorage,
  getLocalstorage,
  checkUserLoginSession
} from 'helpers';
import { userService } from 'apiService';
import { toast } from 'react-toastify';

class LoginContainer extends React.Component {
  login = {
    onClickSubmitForm: async data => {
      const res = await userService.Login(data);
      if (res.status === 200) {
        let user = res.user;
        this.setUser(user);
      } else {
        toast.error(
          'Invalid username or password',
          { position: toast.POSITION.TOP_RIGHT }
        );
      }
    }
  };

  componentWillMount() {
    this.checkUser();
  }

  checkUser = () => {
    let { user } = this.props;
    if (!user || !user.role_id) user = getLocalstorage('user') || {};

    if (user.role_id && checkUserLoginSession(user)) this.setUser(user);
  };
  setUser = user => {
    this.props.setReduxUserAuth(user);
    setLocalstorage('user', user);
    this.redirectByRole(user.role_id);
  };

  redirectByRole = roleId => {
    switch (roleId) {
      case 2: // admin(sale)
        return redirect(ROUTE_PATH.ADMIN_CONTRACT_LIST);
      case 3: // hotel
        return redirect(ROUTE_PATH.HOTEL_SIGN_CONTRACT);
      case 1: // superadmin
      default:
        break;
    }
  };

  render() {
    return (
      <div className="container-fluid bg-white">
        <div className="row">
          <div className="col-xl-6 bg-signin" />
          <div className="col-xl-6">
            <div className="form-signin-wrapper">
              <FormLogin onClickSubmitForm={this.login.onClickSubmitForm} />
            </div>
            <div className="footer-buttom text-center p-4">Term of use. Privacy policy</div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});
const mapDispatchToProps = dispatch => ({
  setReduxUserAuth: data => dispatch(setReduxUserAuth(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
