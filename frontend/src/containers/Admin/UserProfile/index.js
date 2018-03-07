import React from 'react';
import { connect } from 'react-redux';
import UserProfileStyle from './style';
// import { ROUTE_PATH, redirect } from 'helpers';
// import { userService } from 'apiService';

class AdminUserProfileContainer extends React.Component {
  state = {
  };

  componentWillMount() {
    this.getUser();
  }

  getUser = async () => {
    // let result = await contractService.GetContractList(pageRequest);
    // console.log(result);
    // if (result.status === 200) {
    //   this.setState({ pageRequest: result.pageRequest, contractList: result.contractList });
    // }
  };

  render() {
    return (
      <UserProfileStyle>
        user profile
      </UserProfileStyle>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(AdminUserProfileContainer);
