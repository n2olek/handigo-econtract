import React, { Component } from 'react';
import { StepSignContractStyle } from './styled';
import ClassName from 'classnames';
import {
  SignaturePadComponent,
  Icon
} from 'components';
import ClassNames from 'classnames';
import { SAMPLE_PDF, getGoogleDriveImagePath, getPreviewGoogleDrivePdfPath, getDownloadGoogleDrivePdfPath } from 'helpers';
import 'bootstrap'

export default class StepSignContract extends Component {
  state = {
    showSignPadModal: false,
    signMode: 0, // 1 -> authorizedPerson, 2 -> witness
    authorizedPersonSignature: null,
    witnessSignature: null,
    previewPdf: "",
  }

  componentWillMount() {
    const { contract } = this.props;

    this.checkMobile() ?
      this.setState({
        padWidth: '818',
        padHeight: '377'
      }) :
      this.setState({
        // padWidth: '818',
        padHeight: '255'
      })

    let previewPdf;
    if (contract.doc && contract.doc.file_id) {
      previewPdf = contract.doc.file_id;
    } else {
      previewPdf = contract.language === 'Thai' ? SAMPLE_PDF.CONTRACT_TH : SAMPLE_PDF.CONTRACT_EN;
    }

    this.setState({
      previewPdf,
      witnessSignature: getGoogleDriveImagePath(contract.hotel_witness.signature),
      authorizedPersonSignature: getGoogleDriveImagePath(contract.hotel_authorized_person.signature),
    });
  }
  checkMobile = () => {
    if (window.innerWidth >= 991) {
      return true;
    }
    else {
      return false;
    }
  }
  setPadforMobile = () => {
    this.setState({
      padWidth: '400',
      padHeight: '125'
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
  onSubmit = (isDraft) => {
    const { onSubmit } = this.props;
    const {
      authorizedPersonSignature,
      witnessSignature
    } = this.state;
    let data = {
      authorizedPersonSignature: authorizedPersonSignature,
      witnessSignature: witnessSignature,
    };
    if (typeof onSubmit === 'function') onSubmit(data, isDraft);
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
        <div className="content bg-white">
          <div className="card card-contract">
            <div className="card-body">
              {/*
                insert pdf here
              */}
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
          <div className="row signature-contents">
            <div className="signature-content col-md-6">
              <div
                onClick={() => {
                  this.openSignPadModal(1);
                }}
                data-toggle="modal" data-target="#signatureClient"
              >
                <div className="signature-body text-center align-items-center row m-0">
                  {authorizedPersonSignature ? (
                    // <div className="my-auto mx-auto">
                    //   <div className="signature-view">
                    //     <img
                    //       src={
                    //         authorizedPersonSignature
                    //       }
                    //       alt=""
                    //       className="img-fluid"
                    //     />
                    //     <Icon name='edit-signature' />
                    //   </div>
                    // </div>
                    <div className="my-auto mx-auto">
                      <div className="signature-view">
                          <img
                            src={
                              authorizedPersonSignature
                            }
                            alt=""
                            className="img-fluid"
                          />
                          <Icon name='edit-signature' />
                      </div>


                    </div>


                  ) : (
                    <div className="my-auto mx-auto">
                      <div className="signature-default">
                        <Icon name='signature' />
                        <p className="mt-2">
                          Click here
                          to signed
                        </p>
                      </div>
                    </div>
                    )}
                </div>
              </div>
              <hr />
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
            <div className="signature-content col-md-6">
              <div
                onClick={() => {
                  this.openSignPadModal(2);
                }}
                data-toggle="modal" data-target="#signatureClient"
              >
                <div className="signature-body text-center align-items-center row m-0">
                  {witnessSignature ? (
                    // <div>
                    //   <div className="my-auto mx-auto">
                    //     <div className="signature-view">
                    //       <img
                    //         src={
                    //           witnessSignature
                    //         }
                    //         alt=""
                    //         className="img-fluid"
                    //       />
                    //     </div>
                    //     <Icon name='edit-signature' />
                    //   </div>
                    // </div>
                    <div className="signature-view">
                        <img
                          src={
                            witnessSignature
                          }
                          alt=""
                          className="img-fluid"
                        />
                        <Icon name='edit-signature' />
                    </div>
                  ) : (
                    <div className="my-auto mx-auto">
                      <div className="signature-default">
                        <Icon name='signature' />
                        <p className="mt-2">
                          Click here
                          to signed
                      </p>
                      </div>
                    </div>
                    )}
                </div>
              </div>
              <hr />
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

          <div className="buttons-group buttons-frontend clearfix row">
            <div className="col">
              <a
                href={getDownloadGoogleDrivePdfPath(previewPdf)}
                className={
                  ClassNames(
                    'btn btn-lg',
                    'btn-tertiary',
                    'btn-download',
                    {'disabled': !authorizedPersonSignature && !witnessSignature}
                  )
                }
              >
                <Icon name='download'/>{' '}
                Download as PDF
              </a>
              <button type="button" className="btn btn-lg btn-tertiary"
                onClick={()=>{this.onSubmit(true)}}
                disabled={!authorizedPersonSignature && !witnessSignature}
              >
                Generate Contract
              </button>
            </div>
            <div className="col text-right">
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
                onClick={() => {this.onSubmit(false)}}
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

        <div
          className={ClassNames('modal fade', { fade: !showSignPadModal })}
          id="signatureClient"
          tabIndex="-1"
          role="dialog"
          style={{ display: showSignPadModal ? 'block' : 'none' }}
        >
          <div
            className="modal-dialog modal-dialog-centered"
            role="document"
          >
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title text-white">
                  Signature of{' '}
                  {
                    signMode === 1
                      ? 'Authorized Person'
                      : 'Witness'
                  }
                </h4>
              </div>
              <div className="modal-body">
                <SignaturePadComponent
                  onRef={this.onSignRef}
                  onChangePad={this.onChangePad}
                  width1={padWidth}
                  height1={padHeight}
                />
              </div>
              <div className="modal-footer">
                <div className="buttons-group buttons-model row">
                  <div className="col-sm-5">
                    <button
                      type="button"
                      className="btn btn-lg btn-tertiary btn-reset"
                      onClick={this.onResetSignPad}
                    >
                      <Icon name='reset'/>{' '}
                      Reset
										</button>
                  </div>
                  <div className="col-sm-7 text-right">
                    <button
                      type="button"
                      className="btn btn-lg btn-secondary btn-close"
                      onClick={this.closeSignPadModal}
                      data-dismiss="modal"
                    >
                      Close
										</button>
                    <button
                      type="button"
                      className="btn btn-lg btn-primary btn-submit"
                      onClick={this.onSignOk}
                      disabled={buttonSignatureSubmit}
                      data-dismiss="modal"
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
