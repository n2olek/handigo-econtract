import React, { Component } from 'react';
import { StepContractFormStyle } from './styled';
import { toast } from 'react-toastify';

export default class StepContractForm extends Component {
  state = {
    key: 0
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
    form.hotelName.value = contract.hotel_name;
    form.companyName.value = contract.company_name;
    form.companyAddress.value = contract.company_address;
    form.nameofauthorized.value = contract.hotel_authorized_person.name;
    form.positionofauthorized.value = contract.hotel_authorized_person.position;
    form.nameofwitness.value = contract.hotel_witness.name;
    form.positionofwitness.value = contract.hotel_witness.position;
  };
  getFormValue = () => {
    const { contract } = this.props;
    const form = this.contractForm;
    let data = {
      hotel_name: form.hotelName.value,
      company_name: form.companyName.value,
      company_address: form.companyAddress.value,
      hotel_authorized_person: {
        name: form.nameofauthorized.value,
        position: form.positionofauthorized.value,
        signature_path: contract.hotel_authorized_person.signature_path
      },
      hotel_witness: {
        name: form.nameofwitness.value,
        position: form.positionofwitness.value,
        signature_path: contract.hotel_witness.signature_path
      }
    };
    return data;
  };
  onBackClick = () => {
    const { onBackClick } = this.props;
    if (typeof onBackClick === 'function') onBackClick();
  };
  onSaveDraftClick = () => {
    const { onSubmit } = this.props;
    let data = this.getFormValue();
    let fileUpload = [];
    if (typeof onSubmit === 'function') onSubmit(data, fileUpload, true);
  };
  onSaveContinueClick = () => {
    console.log(this.form);
    const { onSubmit } = this.props;
    let data = this.getFormValue();
    this.validateField(data)
    let fileUpload = [];
    if (typeof onSubmit === 'function' && this.validateField(data)) {
      onSubmit(data, fileUpload, false);
    } else {
      toast.error('Invalid username or password');
    }

  };
  validateField = (e) => {
    const formValidate = <div>require<span className="needs-validation">&#8226;</span></div>
    const {
      hotel_name: { length: hotel_name_length },
      company_name: { length: company_name_length },
      company_address: { length: company_address_length },
      hotel_authorized_person: { name: { length: auth_name_length }, position: { length: auth_position_length } },
      hotel_witness: { name: { length: wit_name_length }, position: { length: wit_position_length } }
    } = e
    hotel_name_length === 0 ? this.setState({ hotel_name_require: formValidate }) : this.setState({ hotel_name_require: "" })
    company_name_length === 0 ? this.setState({ company_name_require: formValidate }) : this.setState({ company_name_require: "" })
    company_address_length === 0 ? this.setState({ company_address_require: formValidate }) : this.setState({ company_address_require: "" })
    auth_name_length === 0 ? this.setState({ auth_name_require: formValidate }) : this.setState({ auth_name_require: "" })
    auth_position_length === 0 ? this.setState({ auth_position_require: formValidate }) : this.setState({ auth_position_require: "" })
    wit_name_length === 0 ? this.setState({ wit_name_require: formValidate }) : this.setState({ wit_name_require: "" })
    wit_position_length === 0 ? this.setState({ wit_position_require: formValidate }) : this.setState({ wit_position_require: "" })
    if (
      hotel_name_length &&
      company_name_length &&
      company_address_length &&
      auth_name_length &&
      auth_position_length &&
      wit_name_length &&
      wit_position_length
    ) {
      return true
    } else {
      return false
    }
  }

  render() {
    const {
      hotel_name_require,
      company_name_require,
      company_address_require,
      auth_name_require,
      auth_position_require,
      wit_name_require,
      wit_position_require
    } = this.state
    return (
      <StepContractFormStyle>
        <div className="row">
          <div className="col">
            <div className="content bg-white rounded mt-5 mb-5 p-5">
              <div className="header-title text-left mt-3 mb-4 offset-md-2 mb-8">
                <h4 className="text-dark">
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
                      className="form-control form-control-xl"
                      name="hotelName"
                      id="hotelName"
                      placeholder="Insert hotel name"
                    />
                    {
                      hotel_name_require
                      // add className "is-invalid" to input above for displat highlight
                      // <div className="invalid-feedback">
                      // Require fields
                      // </div>
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
                      className="form-control form-control-xl"
                      id="companyName"
                      placeholder="Insert company name"
                    />
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
                      className="form-control"
                      id="companyAddress"
                      rows="3"
                      placeholder="Insert company address"
                    />
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
                      className="form-control form-control-xl"
                      id="nameofauthorized"
                      placeholder="Insert name of authorized person"
                    />
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
                      className="form-control form-control-xl"
                      id="positionofauthorized"
                      placeholder="Insert position of authorized person"
                    />
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
                      className="form-control form-control-xl"
                      id="nameofwitness"
                      placeholder="Insert name of witness"
                    />
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
                      className="form-control form-control-xl"
                      id="positionofwitness"
                      placeholder="Insert position of witness"
                    />
                    {
                      wit_position_require
                    }
                  </div>
                </div>
                <div className="form-group row mb-4" />
                <div className="form-group row">
                  <label
                    htmlFor="nameofauthorized"
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
                        <input
                          id="input-b5"
                          name="input-b5[]"
                          type="file"
                          multiple
                        />
                      </div>
                      <div className="file-upload-container">
                        <div className="file-upload-statusbar rounded mb-3">
                          <i className="handigo-icon handigo-icon-attached" />
                          <span>
                            Authorized_person_id.jpg
													</span>
                          <button
                            type="button"
                            className="close rounded-circle"
                            aria-label="Close"
                          >
                            <i className="handigo-icon handigo-icon-close" />
                          </button>
                        </div>
                        <div className="file-upload-statusbar rounded mb-3">
                          <i className="handigo-icon handigo-icon-attached" />
                          <span>
                            Authorized_person_id_new.jpg
													</span>
                          <button
                            type="button"
                            className="close rounded-circle"
                            aria-label="Close"
                          >
                            <i className="handigo-icon handigo-icon-close" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <hr className="mt-15 mb-4" />
                <div className="button-continue float-right mt-2">
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
          </div>
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
