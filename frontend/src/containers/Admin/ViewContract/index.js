import React from 'react';
import { connect } from 'react-redux';
import ViewContractStyle from './style';
// import { ROUTE_PATH, redirect } from 'helpers';
// import { contractService } from 'apiService';

class AdminViewContractContainer extends React.Component {
  state = {
  };

  componentWillMount() {
    this.getContract();
  }

  getContract = async () => {
    // let result = await contractService.GetContractList(pageRequest);
    // console.log(result);
    // if (result.status === 200) {
    //   this.setState({ pageRequest: result.pageRequest, contractList: result.contractList });
    // }
  };

  render() {
    return (
      <ViewContractStyle>
        view contract
      </ViewContractStyle>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(AdminViewContractContainer);
