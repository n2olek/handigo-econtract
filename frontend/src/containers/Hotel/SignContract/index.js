import React from 'react';
import { connect } from 'react-redux';
import {
  ContractProgress,
  StepSelectLanguage,
  StepContractForm,
  StepSignContract,
  StepComplete,
  SignContractLayout
} from 'components';
// import { ROUTE_PATH, redirect } from 'helpers';
import { contractService } from 'apiService';
// import SignContractStyle from './style';

class HotelSignContractContainer extends React.Component {
  state = {
    contract: {},
    currentStep: 1
  };
  componentWillMount() {
    this.getContract();
  }

  getContract = async () => {
    const { user } = this.props;
    let contract = await contractService.GetContract({ user_id: user._id });
    console.log(contract);
    if (contract.status === 200) {
      this.setState({
        contract: contract.contract,
        currentStep: contract.contract.status === 4 ? contract.contract.status : 1
        // currentStep: contract.contract.status
      });
    }
  };

  onClickProgress = step => {
    const { contract } = this.state;
    if (step > contract.status) {
      //alert something
      return false;
    }

    this.setState({ currentStep: step });
  };

  onBackClick = () => {
    const { currentStep } = this.state;
    this.onClickProgress(currentStep - 1);
  };

  onSubmitSelectLanguage = async selectedLanguage => {
    const { contract } = this.state;

    let nextStatus = contract.status;
    if (contract.status < 2) nextStatus = 2;

    let data = {
      _id: contract._id,
      language: selectedLanguage,
      status: nextStatus
    };

    let params = {
      data: JSON.stringify(data)
    };

    let result = await contractService.UpdateContract(params);

    console.log(result);
    if (result.status === 200) {
      this.setState({
        currentStep: 2,
        contract: result.contract
      });
    }
  };

  onSubmitContractForm = async (formValue, fileUpload, isDraft) => {
    console.log(formValue, fileUpload, isDraft);
    const { currentStep, contract } = this.state;
    let nextStatus = contract.status;
    if (!isDraft && contract.status < 3) nextStatus = 3;

    let data = {
      ...formValue,
      _id: contract._id,
      status: nextStatus
    };

    let params = {
      data: JSON.stringify(data)
    };

    let result = await contractService.UpdateContract(params);

    console.log(result);
    if (result.status === 200) {
      this.setState({
        currentStep: isDraft ? currentStep : nextStatus,
        contract: result.contract
      });
    }
  };

  onSubmitSignContract = formValue => {
    const { user } = this.props;
    const { contract } = this.state;

    let data = {
      user_id: user._id,
      language: contract.language === 'Thai' ? 'TH' : 'EN',
      company_name: contract.company_name,
      company_address: contract.company_address,

      // handigo_authorized_person_name: contract.handigo_authorized_person.name,
      // handigo_authorized_person_position: contract.handigo_authorized_person.position,
      // fileid_handigo_authorized_person_signature: null,

      // handigo_witness_name: contract.handigo_witness.name,
      // handigo_witness_position: contract.handigo_witness.position,
      // fileid_handigo_witness_signature: null,

      hotel_authorized_person_name: contract.hotel_authorized_person.name,
      hotel_authorized_person_position: contract.hotel_authorized_person.position,
      // fileid_hotel_authorized_person_signature: null,

      hotel_witness_name: contract.hotel_witness.name,
      hotel_witness_position: contract.hotel_witness.position
      // fileid_hotel_witness_signature: null,
    };

    let imageString = 'data:image/png;base64';
    if (formValue.authorizedPersonSignature) {
      if (formValue.authorizedPersonSignature.indexOf(imageString) === 0) {
        data.hotel_authorized_person_signature = formValue.authorizedPersonSignature.replace(/^.*,/, '');
        data.filename_hotel_authorized_person_signature = 'hotel_authorized_person_signature';
        data.imageformat_hotel_authorized_person_signature = 'PNG';
      } else {
        data.fileid_hotel_authorized_person_signature = formValue.authorizedPersonSignature;
      }
    }

    if (formValue.witnessSignature) {
      if (formValue.witnessSignature.indexOf(imageString) === 0) {
        data.hotel_witness_signature = formValue.witnessSignature.replace(/^.*,/, '');
        data.filename_hotel_witness_signature = 'hotel_witness_signature';
        data.imageformat_hotel_witness_signature = 'PNG';
      } else {
        data.fileid_hotel_witness_signature = formValue.witnessSignature;
      }
    }

    contractService.GeneratePDF(data).then(response => {
      if (response.status === 200) this.updateContractFromPdf(response.data);
    });
  };

  updateContractFromPdf = async pdfData => {
    const { contract } = this.state;

    let data = {
      _id: contract._id,
      contract_date: pdfData.date,
      hotel_authorized_person: {
        name: contract.hotel_authorized_person.name,
        position: contract.hotel_authorized_person.position,
        signature: pdfData.hotel_authorized_person_signature_id
      },
      hotel_witness: {
        name: contract.hotel_witness.name,
        position: contract.hotel_witness.position,
        signature: pdfData.hotel_witness_signature_id
      },
      doc: {
        file_id: pdfData.pdf
      },
      status: 4
    };

    let params = {
      data: JSON.stringify(data)
    };

    let result = await contractService.UpdateContract(params);

    if (result.status === 200) {
      this.setState({
        currentStep: 4,
        contract: result.contract
      });
    }
  };

  onSubmitComplete = data => {
    console.log(data);
  };

  renderStepContent = () => {
    const {
      currentStep,
      contract
    } = this.state;
    switch (currentStep) {
      case 1: //Language
        return <StepSelectLanguage onSubmit={this.onSubmitSelectLanguage} selectedLanguage={contract.language} />;

      case 2: //Contract form
        return <StepContractForm contract={contract} onSubmit={this.onSubmitContractForm} onBackClick={this.onBackClick} />;

      case 3: //Sign contract
        return <StepSignContract contract={contract} onSubmit={this.onSubmitSignContract} onBackClick={this.onBackClick} />;

      case 4: //Complete
        return <StepComplete onSubmit={this.onSubmitComplete} />;

      default:
        return null;
    }
  };

  render() {
    const {
      currentStep,
      contract
    } = this.state;
    return (
      <SignContractLayout>
        <ContractProgress
          currentStep={currentStep}
          progressStatus={contract.status}
          onClickProgress={this.onClickProgress}
        />
        {this.renderStepContent()}
      </SignContractLayout>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(HotelSignContractContainer);
