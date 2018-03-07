import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { AppHeader } from 'components';
import { HotelSignContractContainer } from 'containers';
import { ROUTE_PATH } from 'helpers';

class HotelLayoutContainer extends React.Component {
	render() {
		return (
			<div className="app-container">
				<AppHeader />

				<Route exact path={ROUTE_PATH.HOTEL_SIGN_CONTRACT} component={HotelSignContractContainer} />
			</div>
		);
	}
}

const mapStateToProps = state => ({
	user: state.user
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(
	HotelLayoutContainer
);
