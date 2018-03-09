import React from 'react';
import { connect } from 'react-redux';
import ContractListStyle from './style';
import {
  SearchBoxComponent,
  AdminContractListComponent,
  PaginationComponent
} from 'components';
// import { ROUTE_PATH, redirect } from 'helpers';
import { contractService } from 'apiService';

class AdminContractListContainer extends React.Component {
  state = {
    pageRequest: {
      page: 1,
      item_per_page: 10,
      search_text: '',
      item_count: 0
    },
    contractList: []
  };

  componentWillMount() {
    const { pageRequest } = this.state;
    this.getContractList(pageRequest);
  }

  getContractList = async pageRequest => {
    let result = await contractService.GetContractList(pageRequest);
    console.log(result);
    if (result.status === 200) {
      this.setState({ pageRequest: result.pageRequest, contractList: result.contractList });
    }
  };

  onPageChange = page => {
    console.log(page);
  };

  render() {
    const { pageRequest, contractList } = this.state;
    return (
      <ContractListStyle>
        <div className="container-fluid">
          <div className="row">
            <div className="col">
              <div className="header-title mt-10 mb-5 clearfix">
                <h2 className="text-dark float-left">Contract List</h2>
                <div className="buttons-group buttons-admin float-right mt-2">
                  <button type="button" className="btn btn-sm btn-primary btn-create-contract">
                    <i className="handigo-icon handigo-icon-create" /> Create Contract
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="content bg-white rounded mb-5 p-5 clearfix">
                <SearchBoxComponent />
                <AdminContractListComponent contractList={contractList} />
                <PaginationComponent pageData={pageRequest} onPageChange={this.onPageChange} />
              </div>
            </div>
          </div>
        </div>
        <div className="modal fade" id="conntractListDelete" role="dialog">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header pl-17 pr-17">
                <h5 className="modal-title text-dark" id="exampleModalLongTitle">
                  <i className="handigo-icon handigo-icon-confirm-delete" /> Confirm delete
                </h5>
              </div>
              <div className="modal-body p-17">
                <p className="pb-5">Are you sure you want to delete this contract ?</p>
              </div>
              <div className="modal-footer pl-17 pr-17">
                <div className="buttons-group buttons-admin">
                  <div className="float-right">
                    <button type="button" className="btn btn-sm btn-secondary btn-cancle" data-dismiss="modal">
                      Cancel
                    </button>
                    <button type="button" className="btn btn-sm btn-tertiary btn-confirm-delete">
                      Confirm Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ContractListStyle>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});
const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(AdminContractListContainer);
