import React, { Component } from 'react';
import { StepSignContractStyle } from './styled';
import ClassName from 'classnames';
import { SignaturePadComponent } from 'components';
import { SAMPLE_PDF, getPreviewGoogleDrivePdfPath } from 'helpers';

export default class StepSignContract extends Component {
  state = {
    showSignPadModal: false,
    signMode: 0, // 1 -> authorizedPerson, 2 -> witness
    authorizedPersonSignature: null,
    witnessSignature: null,
    previewPdf: SAMPLE_PDF.CONTRACT_EN,
  }

  componentWillMount() {
    this.checkMobile() ?
      this.setState({
        padWidth: '400px',
        padHeight: '600px'
      }) :
      this.setState({
        padWidth: '500',
        padHeight: '200'
      })
  }
  checkMobile = () => {
    if (window.innerWidth <= 500) {
      return true;
    }
    else {
      return false;
    }
  }
  setPadforMobile = () => {
    this.setState({
      padWidth: '400px',
      padHeight: '600px'
    })
  }
  openSignPadModal = mode => {
    this.setState({
      showSignPadModal: true,
      signMode: mode,
      buttonSignatureSubmit: true
    })
    this.onResetSignPad()
  };
  closeSignPadModal = () => {
    this.setState({
      showSignPadModal: false,
      signMode: 0
    });
  }
  onBackClick = () => {
    const { onBackClick } = this.props;
    if (typeof onBackClick === 'function') onBackClick();
  }
  onSignRef = ref => {
    this.signPad = ref;
  }
  onChangePad = () => {
    this.setState({
      buttonSignatureSubmit: false
    })
  }
  //
  // loadSignImage = mode => {
  // 	const { authorizedPersonSignature, witnessSignature } = this.state;
  // 	this.signPad.clear();
  // 	let signImage = null;
  // 	switch (mode) {
  // 		case 1: //authorizedPerson
  // 			signImage = authorizedPersonSignature;
  // 			break;
  //
  // 		case 2: //witness
  // 			signImage = witnessSignature;
  // 			break;
  //
  // 		default:
  // 			break;
  // 	}
  // 	if (signImage) this.signPad.fromDataURL(signImage);
  // };
  onSignOk = () => {
    const { signMode } = this.state;
    let signImage = this.signPad.isEmpty()
      ? null
      : this.signPad.toDataURL();
    let newState = {};
    switch (signMode) {
      case 1: //authorizedPerson
        newState.authorizedPersonSignature = signImage;
        break;

      case 2: //witness
        newState.witnessSignature = signImage;
        break;

      default:
        break;
    }
    this.setState(newState);

    this.closeSignPadModal();
  };
  onResetSignPad = () => {
    this.signPad.clear();
  };
  onSubmit = () => {
    const { onSubmit } = this.props;
    const {
      authorizedPersonSignature,
      witnessSignature
    } = this.state;
    let data = {
      authorizedPersonSignature: authorizedPersonSignature,
      witnessSignature: witnessSignature,
    };
    if (typeof onSubmit === 'function') onSubmit(data);
  };

  render() {
    const { contract } = this.props;
    const {
      showSignPadModal,
      signMode,
      authorizedPersonSignature,
      witnessSignature,
      previewPdf,
      buttonSignatureSubmit,
      padWidth,
      padHeight
    } = this.state;
    return (
      <StepSignContractStyle>
        <div className="row">
          <div className="col">
            <div className="content bg-white rounded mt-5 mb-5 pl-xxl-14 pr-xxl-14 p-3 pt-xxl-5 pb-xxl-5">
              <div className="card card-contract m-5">
                <div className="card-body p-10 p-xxl-15 text-dark">
                  {/*
										insert pdf here
									*/}
                  <div className="row">
                    <iframe
                      title="pdf"
                      src={getPreviewGoogleDrivePdfPath(
                        previewPdf
                      )}
                      width="100%"
                      height="600px"
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="signature-content col-xl-6">
                  <div className="col pl-8 pl-xxl-9">
                    <div
                      onClick={() => {
                        this.openSignPadModal(1);
                      }}
                    >
                      <div className="signature-body border border-primary rounded text-center text-primary align-items-center row m-0">
                        {authorizedPersonSignature ? (
                          <div>
                            <div className="my-auto mx-auto">
                              <div className="signature-view">
                                <img
                                  src={
                                    authorizedPersonSignature
                                  }
                                  alt=""
                                  className="img-fluid"
                                />
                              </div>
                            </div>
                            <i className="handigo-icon handigo-icon-edit-signature bg-primary rounded-circle" />
                          </div>
                        ) : (
                            <div>
                              <div className="my-auto mx-auto">
                                <div className="signature-default">
                                  <i className="handigo-icon handigo-icon-signature" />
                                  <p className="mt-2">
                                    Click here
																		to signed
																</p>
                                </div>
                              </div>
                            </div>
                          )}
                      </div>
                    </div>
                    <hr />
                  </div>
                  <div className="pl-9 mt-2">
                    <div className="signature-by">
                      By:{' '}
                      {
                        contract.hotel_authorized_person
                          .name
                      }
                    </div>
                    <div className="signature-title">
                      Title:{' '}
                      {
                        contract.hotel_authorized_person
                          .position
                      }
                    </div>
                  </div>
                </div>
                <div className="signature-content col-xl-6">
                  <div className="col pl-8 pl-xxl-9">
                    <div
                      onClick={() => {
                        this.openSignPadModal(2);
                      }}
                    >
                      <div className="signature-body border border-primary rounded text-center text-primary align-items-center row m-0">
                        {witnessSignature ? (
                          <div>
                            <div className="my-auto mx-auto">
                              <div className="signature-view">
                                <img
                                  src={
                                    witnessSignature
                                  }
                                  alt=""
                                  className="img-fluid"
                                />
                              </div>
                            </div>
                            <i className="handigo-icon handigo-icon-edit-signature bg-primary rounded-circle" />
                          </div>
                        ) : (
                            <div>
                              <div className="my-auto mx-auto">
                                <div className="signature-default">
                                  <i className="handigo-icon handigo-icon-signature" />
                                  <p className="mt-2">
                                    Click here
																		to signed
																</p>
                                </div>
                              </div>
                            </div>
                          )}
                      </div>
                    </div>
                    <hr />
                  </div>
                  <div className="pl-9 mt-2">
                    <div className="signature-witness">
                      Witness:{' '}
                      {contract.hotel_witness.name}
                    </div>
                    <div className="signature-title">
                      Title:{' '}
                      {contract.hotel_witness.position}
                    </div>
                  </div>
                </div>
              </div>

              <div className="buttons-group buttons-frontend mt-2 m-5 clearfix">
                <div className="float-left">
                  <button type="button" className="btn btn-lg btn-tertiary btn-download"
                    onClick
                    disabled={!authorizedPersonSignature && !witnessSignature}
                  >
                    <i className="handigo-icon handigo-icon-download" />{' '}
                    Download as PDF
									</button>
                  <button type="button" className="btn btn-lg btn-tertiary btn-download"
                    onClick
                    disabled={!authorizedPersonSignature && !witnessSignature}
                  >
                    Gerenate Contract
									</button>
                </div>
                <div className="float-right">
                  <button
                    type="button"
                    className="btn btn-lg btn-secondary btn-back"
                    onClick={this.onBackClick}
                  >
                    Back
									</button>
                  <button
                    type="button"
                    className={ClassName(
                      'btn btn-lg btn-primary btn-continue',
                      {
                        disabled:
                          !authorizedPersonSignature ||
                          !witnessSignature
                      }
                    )}
                    onClick={this.onSubmit}
                    disabled={!authorizedPersonSignature || !witnessSignature}
                  >
                    Save &#38; Send Contract
									</button>
                  {/*
										<button
										type="button"
										className="btn btn-lg btn-primary btn-continue"
										disabled
										>
										Save &#38; Send Contract
										</button>
									*/}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className={ClassName('modal', { fade: !showSignPadModal })}
          id="signatureClient"
          style={{ display: showSignPadModal ? 'block' : 'none' }}
        >
          <div
            className="modal-dialog modal-dialog-centered"
            role="document"
          >
            <div className="modal-content">
              <div className="modal-header pl-17 pr-17 bg-primary">
                <h4
                  className="modal-title text-white"
                  id="exampleModalLongTitle"
                >
                  Signature of{' '}
                  {
                    signMode === 1
                      ? 'Authorized Person'
                      : 'Witness'
                  }
                </h4>
              </div>
              <div className="modal-body p-17">
                <div className="signature-content col">
                  <div className="signature-body border border-primary rounded text-center text-primary align-items-center row">
                    <div className="my-auto mx-auto">
                      <div className="signature-default d-none">
                        <i className="handigo-icon handigo-icon-signature" />
                        <p className="mt-2" />
                      </div>
                      <div className="signature-view">
                        <SignaturePadComponent
                          onRef={this.onSignRef}
                          onChangePad={this.onChangePad}
                          width1={padWidth}
                          height1={padHeight}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer pl-17 pr-17">
                <div className="buttons-group buttons-frontend">
                  <div className="float-left">
                    <button
                      type="button"
                      className="btn btn-lg btn-tertiary btn-reset"
                      onClick={this.onResetSignPad}
                    >
                      <i className="handigo-icon handigo-icon-reset" />{' '}
                      Reset
										</button>
                  </div>
                  <div className="float-right">
                    <button
                      type="button"
                      className="btn btn-lg btn-secondary btn-close"
                      onClick={this.closeSignPadModal}
                    >
                      Close
										</button>
                    <button
                      type="button"
                      className="btn btn-lg btn-primary btn-submit"
                      onClick={this.onSignOk}
                      disabled={buttonSignatureSubmit}
                    >
                      OK
										</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </StepSignContractStyle>
    );
  }
}
