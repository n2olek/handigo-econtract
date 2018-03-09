import React, { Component } from 'react';
import { StepCompleteStyle } from './styled';

export default class StepComplete extends Component {
  state = {};

  render() {
    return (
      <StepCompleteStyle>
        <div className="content bg-white text-center">
          <div className="content-detail content-detail-completed">
            <p className="h2 mb-3">Congratulation !</p>
            <p className="h4">
              Your E-signature has completed, Thank you
              for Choosing our service.
            </p>
            <p className="text-danger">
              Please waiting for get approve document from
              HandiGo Admin email
            </p>
          </div>
        </div>
      </StepCompleteStyle>
    );
  }
}
