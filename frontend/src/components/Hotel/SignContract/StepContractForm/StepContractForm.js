import React, { Component } from 'react';
import { StepContractFormStyle } from './styled';
import { toast } from 'react-toastify';
import { Icon } from 'components';
import { contractService } from 'apiService';
import { getAttachmentFilename, cloneObject } from 'helpers';
import ClassNames from 'classnames'

export default class StepContractForm extends Component {
  state = {
    oldUploadFile: [],
    newUploadFile: []
  };

  componentDidMount() {
    this.setFormValue();
  }

  onRef = ref => {
    this.contractForm = ref;
    console.log(this.contractForm);
  };

  setFormValue = () => {
    const { contract } = this.props;
    const form = this.contractForm;
    form.hotelName.value = contract.hotel_name ? contract.hotel_name : '';
    form.companyName.value = contract.company_name ? contract.company_name : '';
    form.companyAddress.value = contract.company_address ? contract.company_address : '';
    form.nameofauthorized.value = contract.hotel_authorized_person.name ? contract.hotel_authorized_person.name : '';
    form.positionofauthorized.value = contract.hotel_authorized_person.position ? contract.hotel_authorized_person.position : '';
    form.nameofwitness.value = contract.hotel_witness.name ? contract.hotel_witness.name : '';
    form.positionofwitness.value = contract.hotel_witness.position ? contract.hotel_witness.position : '';
    this.setState({ oldUploadFile: contract.attachment? cloneObject(contract.attachment) : [] });
  };

  getFormValue = () => {
    const { contract } = this.props;
    const { oldUploadFile } = this.state;
    const form = this.contractForm;
    let data = {
      hotel_name: form.hotelName.value,
      company_name: form.companyName.value,
      company_address: form.companyAddress.value,
      hotel_authorized_person: {
        name: form.nameofauthorized.value,
        position: form.positionofauthorized.value,
      },
      hotel_witness: {
        name: form.nameofwitness.value,
        position: form.positionofwitness.value,
      },
      attachment: oldUploadFile,
    };
    return data;
  };

  onBackClick = () => {
    const { onBackClick } = this.props;
    if (typeof onBackClick === 'function') onBackClick();
  };

  onSaveDraftClick = () => {
    const { onSubmit } = this.props;
    const { newUploadFile } = this.state;
    let data = this.getFormValue();
    let fileUpload = newUploadFile;
    toast.success(<Icon name='success'> Success ! Save draft complete.</Icon>, {
      position: toast.POSITION.TOP_RIGHT,
      toastClassName: 'fffffff'
    });
    if (typeof onSubmit === 'function') onSubmit(data, fileUpload, true);
  };

  onSaveContinueClick = () => {
    console.log(this.form);
    const { newUploadFile } = this.state;
    let data = this.getFormValue();
    const { onSubmit } = this.props;
    this.validateField(data);
    let fileUpload = newUploadFile;
    if (typeof onSubmit === 'function' && this.validateField(data)) {
      onSubmit(data, fileUpload, false);
    } else {
      toast.error('Invalid username or password', {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  validateField = (e) => {
    const formValidate = <div className="invalid-feedback">Require</div>
    const {
      hotel_name: { length: hotel_name_length },
      company_name: { length: company_name_length },
      company_address: { length: company_address_length },
      hotel_authorized_person: { name: { length: auth_name_length }, position: { length: auth_position_length } },
      hotel_witness: { name: { length: wit_name_length }, position: { length: wit_position_length } }
    } = e;
    hotel_name_length === 0
      ? this.setState({ hotel_name_require: formValidate })
      : this.setState({ hotel_name_require: '' });
    company_name_length === 0
      ? this.setState({ company_name_require: formValidate })
      : this.setState({ company_name_require: '' });
    company_address_length === 0
      ? this.setState({ company_address_require: formValidate })
      : this.setState({ company_address_require: '' });
    auth_name_length === 0
      ? this.setState({ auth_name_require: formValidate })
      : this.setState({ auth_name_require: '' });
    auth_position_length === 0
      ? this.setState({ auth_position_require: formValidate })
      : this.setState({ auth_position_require: '' });
    wit_name_length === 0 ? this.setState({ wit_name_require: formValidate }) : this.setState({ wit_name_require: '' });
    wit_position_length === 0
      ? this.setState({ wit_position_require: formValidate })
      : this.setState({ wit_position_require: '' });
    if (
      hotel_name_length &&
      company_name_length &&
      company_address_length &&
      auth_name_length &&
      auth_position_length &&
      wit_name_length &&
      wit_position_length
    ) {
      return true;
    } else {
      return false;
    }
  };

  onFileUpload = () => {
    const { newUploadFile } = this.state;
    const form = this.contractForm;
    console.log(form.attachment.files)
    let files = form.attachment.files;

    if (files.length > 0) {
      let newList = [ ...newUploadFile, ...files ];
      this.setState({ newUploadFile: newList });
    }

    // clear input field
    form.attachment.value = null;
  }

  onDeleteOldUploadFile = index => {
    // todo: show confirm dialog

    const { oldUploadFile } = this.state;

    // mark file as inactive and wait for save
    oldUploadFile[index].is_active = false;
    this.setState({ oldUploadFile });
  };

  onDeleteNewUploadFile = index => {
    // todo: show confirm dialog

    const { newUploadFile } = this.state;

    // file still not upload to server
    // just remove from list
    newUploadFile.splice(index, 1);
    let newList = newUploadFile
    this.setState({ newUploadFile: newList });
  };

  render() {
    const {
      hotel_name_require,
      company_name_require,
      company_address_require,
      auth_name_require,
      auth_position_require,
      wit_name_require,
      wit_position_require,
      oldUploadFile,
      newUploadFile
    } = this.state;
    return (
      <StepContractFormStyle>
        <div className="content bg-white">
          <div className="header-title text-left offset-lg-2">
            <h4>
              Fill In Your Information
            </h4>
            <p>Please fill in every require fields.</p>
          </div>
          <form id="contactForm" ref={this.onRef}>
            <div className="form-group row">
              <label
                htmlFor="hotelName"
                className="col-lg-4 offset-lg-1 col-form-label"
              >
                Hotel Name
              </label>
              <div className="col-lg-5">
                <input
                  type="text"
                  className={
                    ClassNames(
                      "form-control",
                      {
                        'is-invalid': hotel_name_require
                      }
                    )
                  }
                  name="hotelName"
                  id="hotelName"
                  placeholder="Insert hotel name"
                />
                <span className="needs-validation">&#8226;</span>
                {
                  hotel_name_require
                }
              </div>
            </div>
            <div className="form-group row">
              <label
                htmlFor="companyName"
                className="col-lg-4 offset-lg-1 col-form-label"
              >
                Company Name
              </label>
              <div className="col-lg-5">
                <input
                  type="text"
                   className={
                    ClassNames(
                      "form-control",
                      {
                        'is-invalid': company_name_require
                      }
                    )
                  }
                  id="companyName"
                  placeholder="Insert company name"
                />
                <span className="needs-validation">&#8226;</span>
                {
                  company_name_require
                }
              </div>
            </div>
            <div className="form-group row">
              <label
                htmlFor="companyAddress"
                className="col-lg-4 offset-lg-1 col-form-label"
              >
                Company Address
              </label>
              <div className="col-lg-5">
                <textarea
                  className={
                    ClassNames(
                      "form-control",
                      {
                        'is-invalid': company_address_require
                      }
                    )
                  }
                  id="companyAddress"
                  rows="3"
                  placeholder="Insert company address"
                />
                <span className="needs-validation">&#8226;</span>
                {
                  company_address_require
                }
              </div>
            </div>

            <div className="form-group row mb-4" />

            <div className="form-group row">
              <label
                htmlFor="nameofauthorized"
                className="col-lg-4 offset-lg-1 col-form-label"
              >
                Name of Authorized Person
              </label>
              <div className="col-lg-5">
                <input
                  type="text"
                  className={
                    ClassNames(
                      "form-control",
                      {
                        'is-invalid': auth_name_require
                      }
                    )
                  }
                  id="nameofauthorized"
                  placeholder="Insert name of authorized person"
                />
                <span className="needs-validation">&#8226;</span>
                {
                  auth_name_require
                }
              </div>
            </div>
            <div className="form-group row">
              <label
                htmlFor="positionofauthorized"
                className="col-lg-4 offset-lg-1 col-form-label"
              >
                Position of Authorized Person
              </label>
              <div className="col-lg-5">
                <input
                  type="text"
                  className={
                    ClassNames(
                      "form-control",
                      {
                        'is-invalid': auth_position_require
                      }
                    )
                  }
                  id="positionofauthorized"
                  placeholder="Insert position of authorized person"
                />
                <span className="needs-validation">&#8226;</span>
                {
                  auth_position_require
                }
              </div>
            </div>
            <div className="form-group row">
              <label
                htmlFor="nameofwitness"
                className="col-lg-4 offset-lg-1 col-form-label"
              >
                Name of Witness
              </label>
              <div className="col-lg-5">
                <input
                  type="text"
                  className={
                    ClassNames(
                      "form-control",
                      {
                        'is-invalid': wit_name_require
                      }
                    )
                  }
                  id="nameofwitness"
                  placeholder="Insert name of witness"
                />
                <span className="needs-validation">&#8226;</span>
                {
                  wit_name_require
                }
              </div>
            </div>
            <div className="form-group row">
              <label
                htmlFor="positionofwitness"
                className="col-lg-4 offset-lg-1 col-form-label"
              >
                Position of Witness
              </label>
              <div className="col-lg-5">
                <input
                  type="text"
                  className={
                    ClassNames(
                      "form-control",
                      {
                        'is-invalid': wit_position_require
                      }
                    )
                  }
                  id="positionofwitness"
                  placeholder="Insert position of witness"
                />
                <span className="needs-validation">&#8226;</span>
                {
                  wit_position_require
                }
              </div>
            </div>
            <div className="form-group row mb-4" />
            <div className="form-group row">
              <label
                htmlFor="attachment"
                className="col-lg-4 offset-lg-1 col-form-label"
              >
                Upload File
              </label>
              <div className="col-lg-5">
                <div
                  id="mulitplefileuploader"
                  className="mulitplefileuploader"
                >
                  <div className="btn btn-tertiary btn-xs btn-file mb-3">
                    <span>Browse file</span>
                    <input id="attachment" name="attachment" type="file" multiple onChange={this.onFileUpload}/>
                  </div>
                  <div className="file-upload-container">
                    {oldUploadFile.map((file, index) => {
                      if (!file.is_active) return null;
                      return (
                        <AttachmentList
                          key={index}
                          filename={file.filename}
                          onDelete={() => {
                            this.onDeleteOldUploadFile(index);
                          }}
                          isPreview={true}
                        />
                      );
                    })}

                    {newUploadFile.map((file, index) => {
                      return (
                        <AttachmentList
                          key={index}
                          filename={file.name}
                          onDelete={() => {
                            this.onDeleteNewUploadFile(index);
                          }}
                          isPreview={false}
                        />
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
            <hr />
            <div className="buttons-frontend float-right">
              <button
                type="button"
                className="btn btn-secondary btn-back"
                onClick={this.onBackClick}
              >
                Back
              </button>
              <button
                type="button"
                className="btn btn-tertiary btn-draft"
                onClick={this.onSaveDraftClick}
              >
                Save Draft
              </button>
              <button
                className="btn btn-primary btn-continue"
                type="button"
                onClick={this.onSaveContinueClick}
              >
                Save &#38; Continue
              </button>
            </div>
            <div className="clearfix" />
          </form>
        </div>
        {
          // <div class="alert-wrapper position-absolute">
          //     <div class="alert alert-warning" role="alert">
          //         Please fill in every require fields.
          //     </div>
          //     <div class="alert alert-success" role="alert">
          //         <i class="handigo-icon handigo-icon-success"></i>
          //         Success ! Save draft complete.
          //     </div>
          // </div>
        }
      </StepContractFormStyle>
    );
  }
}

const AttachmentList = ({ filename, onDelete, isPreview }) => (
  <div className="file-upload-statusbar rounded mb-3">
    <Icon name='attached' />
    {isPreview ? (
      <a href={contractService.GetAttachmentPath(filename)} target="_blank">
        {getAttachmentFilename(filename)}
      </a>
    ) : (
      <span>{filename}</span>
    )}
    <button type="button" className="close rounded-circle" aria-label="Close" onClick={onDelete}>
      <Icon name="close" />
    </button>
  </div>
);
