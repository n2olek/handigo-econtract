import React, { Component } from 'react';
import SignaturePad from 'react-signature-pad-wrapper';
import { SignaturePadComponentStyle } from './styled';

export default class SignaturePadComponent extends Component {
  handleClearClick = e => {
    this.signaturePad.clear();
  };
  handleOkClick = () => {
    typeof this.props.onOk === 'function' &&
      this.props.onOk();
  };
  onRef = ref => {
    this.signaturePad = ref;
    typeof this.props.onRef === 'function' &&
      this.props.onRef(ref);
  };

  render() {
    const {
      showOkButton,
      showClearButton,
      onChangePad,
      width1,
      height1
    } = this.props;
    return (
      <SignaturePadComponentStyle
        onClick={onChangePad}
      >
        <SignaturePad
          ref={this.onRef}
          width={width1}
          height={height1}
          options={{
            minWidth: 1,
            maxWidth: 3,
            penColor: 'rgb(0, 0, 0)'
          }}
        />
        {showClearButton && (
          <button type="button"
            onClick={this.handleClearClick}
          >
            Clear
					</button>
        )}
        {showOkButton && (
          <button type="button" disabled='disabled'
            onClick={this.handleOkClick}
          >
            Ok
					</button>
        )
        }
      </SignaturePadComponentStyle>
    );
  }
}
