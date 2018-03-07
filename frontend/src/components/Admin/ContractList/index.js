import React, { Component } from 'react';
import ContractListStyle from './style';
import dateformat from 'dateformat';

export class AdminContractListComponent extends Component {
  contractStatus = status => {
    switch (status) {
      case 0: //admin create contract but not sent to hotel user
        return <span>Draft</span>;

      case 1: //select language step
      case 2: //contract form step
      case 3: //sign contract step
        return <span className="status-sent text-primary">Sent</span>;

      case 4: //complete step
        return <span className="status-pendding text-tertiary">Pending for Approve</span>;

      case 5: //admin approved
        return <span className="status-approved text-success">Approved</span>;

      default:
        return null;
    }
  };

  viewContractButton = contract => {
    switch (contract.status) {
      case 0: //admin create contract but not sent to hotel user
      case 1: //select language step
      case 2: //contract form step
      case 3: //sign contract step
        return null;

      case 4: //complete step
        return (
          <button type="button" className="btn btn-xs btn-description-list btn-tertiary" onClick={this.onViewContract(contract)}>
            <i className="handigo-icon handigo-icon-description-list" /> View Contract
          </button>
        );

      case 5: //admin approved
        return (
          <button type="button" className="btn btn-xs btn-description-list btn-secondary" onClick={this.onViewContract(contract)}>
            <i className="handigo-icon handigo-icon-description-list" /> View Contract
          </button>
        );

      default:
        return null;
    }
  };

  onEdit = contract => {
    const { onEdit } = this.props;
    if (typeof onEdit === 'function') onEdit(contract);
  };

  onDelete = contract => {
    const { onDelete } = this.props;
    if (typeof onDelete === 'function') onDelete(contract);
  };

  onSendEmail = contract => {
    const { onSendEmail } = this.props;
    if (typeof onSendEmail === 'function') onSendEmail(contract);
  };

  onViewContract = contract => {
    const { onViewContract } = this.props;
    if (typeof onViewContract === 'function') onViewContract(contract);
  };

  render() {
    const { contractList } = this.props;
    return (
      <ContractListStyle>
        <div className="table-responsive-xl mb-6">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Hotel Name</th>
                <th scope="col">Email Contacts</th>
                <th scope="col">Modified Date</th>
                <th scope="col">Status</th>
                <th scope="col">Operations</th>
              </tr>
            </thead>
            <tbody>
              {contractList.map((contract, key) => (
                <tr key={key}>
                  <th scope="row">{key + 1}</th>
                  <td>{contract.hotel_name}</td>
                  <td>{contract.email_contact}</td>
                  <td>{dateformat(contract.update_date, 'mmm d, yyyy, hh:MM TT')}</td>
                  <td>{this.contractStatus(contract.status)}</td>
                  <td>
                    <button type="button" className="btn btn-icon btn-edit-list btn-link" onClick={this.onEdit(contract)}>
                      <i className="handigo-icon handigo-icon-edit-list" />
                    </button>
                    <button type="button" className="btn btn-icon btn-delete-list btn-link" onClick={this.onDelete(contract)}>
                      <i className="handigo-icon handigo-icon-delete-list" />
                    </button>
                    <button type="button" className="btn btn-icon btn-email-list btn-link" onClick={this.onSendEmail(contract)}>
                      <i className="handigo-icon handigo-icon-email-list" />
                    </button>
                    {this.viewContractButton(contract)}
                  </td>
                </tr>
              ))}

              {/*
              <tr>
                <th scope="row">1</th>
                <td>Maow Hotel</td>
                <td>56abc@mail.com</td>
                <td>Dec 22, 2017 01:27 PM</td>
                <td>Draft</td>
                <td>
                  <button type="button" className="btn btn-icon btn-edit-list btn-link">
                    <i className="handigo-icon handigo-icon-edit-list" />
                  </button>
                  <button type="button" className="btn btn-icon btn-delete-list btn-link" data-toggle="modal" data-target="#conntractListDelete">
                    <i className="handigo-icon handigo-icon-delete-list" />
                  </button>
                  <button type="button" className="btn btn-icon btn-email-list btn-link">
                    <i className="handigo-icon handigo-icon-email-list" />
                  </button>
                </td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td>Maow Hotel</td>
                <td>56abc@mail.com</td>
                <td>Dec 22, 2017 01:27 PM</td>
                <td>
                  <span className="status-sent text-primary">Sent</span>
                </td>
                <td>
                  <button type="button" className="btn btn-icon btn-edit-list btn-link">
                    <i className="handigo-icon handigo-icon-edit-list" />
                  </button>
                  <button type="button" className="btn btn-icon btn-delete-list btn-link" data-toggle="modal" data-target="#conntractListDelete">
                    <i className="handigo-icon handigo-icon-delete-list" />
                  </button>
                  <button type="button" className="btn btn-icon btn-email-list btn-link">
                    <i className="handigo-icon handigo-icon-email-list" />
                  </button>
                </td>
              </tr>
              <tr>
                <th scope="row">3</th>
                <td>Maow Hotel</td>
                <td>009abc@mail.com</td>
                <td>Dec 22, 2017 01:27 PM</td>
                <td>
                  <span className="status-pendding text-tertiary">Pending for Approve</span>
                </td>
                <td>
                  <button type="button" className="btn btn-icon btn-edit-list btn-link">
                    <i className="handigo-icon handigo-icon-edit-list" />
                  </button>
                  <button type="button" className="btn btn-icon btn-delete-list btn-link" data-toggle="modal" data-target="#conntractListDelete">
                    <i className="handigo-icon handigo-icon-delete-list" />
                  </button>
                  <button type="button" className="btn btn-icon btn-email-list btn-link">
                    <i className="handigo-icon handigo-icon-email-list" />
                  </button>
                  <button type="button" className="btn btn-xs btn-description-list btn-tertiary">
                    <i className="handigo-icon handigo-icon-description-list" /> View Contract
                  </button>
                </td>
              </tr>
              <tr>
                <th scope="row">4</th>
                <td>Orient Hotel</td>
                <td>432abc@mail.com</td>
                <td>Dec 22, 2017 01:27 PM</td>
                <td>
                  <span className="status-approved text-success">Approved</span>
                </td>
                <td>
                  <button type="button" className="btn btn-icon btn-edit-list btn-link">
                    <i className="handigo-icon handigo-icon-edit-list" />
                  </button>
                  <button type="button" className="btn btn-icon btn-delete-list btn-link" data-toggle="modal" data-target="#conntractListDelete">
                    <i className="handigo-icon handigo-icon-delete-list" />
                  </button>
                  <button type="button" className="btn btn-icon btn-email-list btn-link">
                    <i className="handigo-icon handigo-icon-email-list" />
                  </button>
                  <button type="button" className="btn btn-xs btn-description-list btn-secondary">
                    <i className="handigo-icon handigo-icon-description-list" /> View Contract
                  </button>
                </td>
              </tr>
              */}
            </tbody>
          </table>
        </div>
      </ContractListStyle>
    );
  }
}
