import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { AppHeader } from 'components';
import { 
  AdminContractListContainer, 
  AdminEditContractContainer, 
  AdminViewContractContainer, 
  AdminUserProfileContainer 
} from 'containers';
import { ROUTE_PATH } from 'helpers';

class AdminLayoutContainer extends React.Component {
  render() {
    return (
      <div className="app-container">
        <AppHeader />
        <Route exact path={ROUTE_PATH.ADMIN_CONTRACT_LIST} component={AdminContractListContainer} />
        <Route exact path={ROUTE_PATH.ADMIN_ADD_CONTRACT} component={AdminEditContractContainer} />
        <Route exact path={ROUTE_PATH.ADMIN_EDIT_CONTRACT} component={AdminEditContractContainer} />
        <Route exact path={ROUTE_PATH.ADMIN_VIEW_CONTRACT} component={AdminViewContractContainer} />
        <Route exact path={ROUTE_PATH.ADMIN_USER_PROFILE} component={AdminUserProfileContainer} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});
const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(AdminLayoutContainer);
