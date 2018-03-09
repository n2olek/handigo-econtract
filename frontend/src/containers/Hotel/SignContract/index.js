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

    if (selectedLanguage === contract.language) {
      this.setState({ currentStep: 2 });
      return;
    }

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

    if (result.status === 200) {
      this.setState({
        contract: result.contract
      }, () => {
        let activeStep = 2;
        if (!result.contract.doc.file_id) {
          // doc is still not generated -> go to normal flow
          this.setState({ currentStep: 0 }, () => {
            this.setState({ currentStep: activeStep });
          });
        } else {
          // doc is already generated but data has been change -> need to generate new doc
          let contractStatus = result.contract.status;
          this.generatePDF({}, contractStatus, activeStep);
        }
      });
    }
  };

  onSubmitContractForm = async (formValue, fileUpload, isDraft) => {
    const { currentStep, contract } = this.state;
    let nextStatus = contract.status;
    if (!isDraft && contract.status < 3) nextStatus = 3;

    let data = {
      ...formValue,
      _id: contract._id,
      status: nextStatus
    };

    let params = {
      data: JSON.stringify(data),
      "upload[]" : fileUpload,
    };

    let result = await contractService.UpdateContract(params);

    if (result.status === 200) {
      this.setState({
        contract: result.contract
      }, () => {
        let activeStep = isDraft ? currentStep : currentStep + 1;
        if (!result.contract.doc.file_id) {
          // doc is still not generated -> go to normal flow
          this.setState({ currentStep: 0 }, () => {
            this.setState({ currentStep: activeStep });
          });
        } else {
          // doc is already generated but data has been change -> need to generate new doc
          let contractStatus = result.contract.status;
          this.generatePDF({}, contractStatus, activeStep);
        }
      });
    }
  };

  onSubmitSignContract = (formValue, isDraft) => {
    const { contract } = this.state;

    let contractStatus = contract.status;
    if ((contractStatus < 4) && !isDraft) contractStatus = 4;

    let activeStep = isDraft? 3 : 4;

    this.generatePDF(formValue, contractStatus, activeStep);
  };

  generatePDF = (formValue, contractStatus, activeStep) => {
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

    this.attachNewSignatureData(data, 'hotel_authorized_person', formValue.authorizedPersonSignature);
    this.attachNewSignatureData(data, 'hotel_witness', formValue.witnessSignature);

    contractService.GeneratePDF(data).then(response => {
      if (response.status === 200) this.updateContractFromPdf(response.data, contractStatus, activeStep);
    });
  }

  attachNewSignatureData = (params, fieldname, signatureData) => {
    const { contract } = this.state;

    if (!signatureData) {
      if (contract[fieldname] && contract[fieldname].signature) {
        params['fileid_' + fieldname + '_signature'] = contract[fieldname].signature;
      }

      return;
    }

    let imageString = 'data:image/png;base64';
    if (signatureData.indexOf(imageString) === 0) {
      params[fieldname + '_signature'] = signatureData.replace(/^.*,/, '');
      params['filename_' + fieldname + '_signature'] = fieldname;
      params['imageformat_' + fieldname + '_signature'] = 'PNG';
    } else {
      params['fileid_' + fieldname + '_signature'] = signatureData;
    }
  }

  updateContractFromPdf = async (pdfData, contractStatus, activeStep) => {
    const { contract } = this.state;

    let data = {
      _id: contract._id,
      contract_date: pdfData.date,
      hotel_authorized_person: {
        signature: pdfData.hotel_authorized_person_signature_id
      },
      hotel_witness: {
        signature: pdfData.hotel_witness_signature_id
      },
      doc: {
        file_id: pdfData.pdf
      },
      attachment: contract.attachment,
      status: contractStatus
    };

    let params = {
      data: JSON.stringify(data)
    };

    let result = await contractService.UpdateContract(params);

    if (result.status === 200) {
      this.setState({
        currentStep: 0,
        contract: result.contract
      }, () => {
        this.setState({ currentStep: activeStep || contractStatus });
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
