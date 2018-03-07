import React, { Component } from 'react';
import { ContractProgressStyle } from './styled';
import ClassName from 'classnames';

export default class ContractProgress extends Component {
  state = {
    currentStep: 0,
    progressStatus: 0,
    buttonList: [
      {
        name: 'Language',
        headerText: 'Manage Your Contract'
      },
      {
        name: 'Contract form',
        headerText: 'Contract Form'
      },
      {
        name: 'Sign contract',
        headerText: 'Sign Contract'
      },
      {
        name: 'Complete',
        headerText: 'Completed'
      }
    ],
  };

  componentDidMount() {
    // const { currentStep, progressStatus } = this.props;
    // this.setState({
    // 	currentStep,
    // 	progressStatus
    // });
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.currentStep !== this.state.currentStep)
      this.setState({ currentStep: nextProps.currentStep });
    if (nextProps.progressStatus !== this.state.progressStatus)
      this.setState({ progressStatus: Math.min(nextProps.progressStatus, 4) });
  }

  onClickProgress = step => {
    const { onClickProgress } = this.props;
    const { progressStatus } = this.state;
    if (progressStatus === 4) return false;
    if (typeof onClickProgress === 'function') onClickProgress(step);
  };
  getHeaderText = () => {
    const { 
      currentStep, 
      buttonList 
    } = this.state;
    let button = buttonList[currentStep - 1];
    return button ? button.headerText : '';
  };

  render() {
    const { currentStep, progressStatus, buttonList } = this.state;
    // console.log(progressStatus)
    let isCompleteAll = progressStatus === 4;
    return (
      <ContractProgressStyle>
        <div className="row">
          <div className="col">
            <div className="header-title text-center mt-10 mb-5">
              <h2 className="text-center text-dark">
                {this.getHeaderText()}
              </h2>
            </div>
            <ul className="progressbar">
              {
                buttonList.map((button, index) => {
                  const key = index + 1;
                  return (
                    <li
                      key={key}
                      onClick={() => this.onClickProgress(key)}
                      className={ClassName({
                        'is-active': currentStep === key,
                        'is-checked': key < progressStatus || isCompleteAll
                      })}
                    >
                      <p>{button.name}</p>
                    </li>
                  )
                })
              }
            </ul>
            {/* <div className="stepwizard">
							<div className="stepwizard-row setup-panel">
								{buttonList.map((button, index) => {
									const key = index + 1;
									return (
										<div
											key={key}
											className={ClassName(
												'stepwizard-step',
												{
													'is-active':
														currentStep === key,
													'is-checked':
														key < progressStatus ||
														isCompleteAll
												}
											)}
										>
											<button
												className={ClassName(
													'btn rounded-circle',
													{
														'disabled btn-default':
															progressStatus <
															key,
														'btn-primary':
															progressStatus >=
															key
													}
												)}
												onClick={() => {
													this.onClickProgress(key);
												}}
												type="button"
											>
												{key < progressStatus ||
													isCompleteAll ? (
														<i className="handigo-icon handigo-icon-checked" />
													) : (
														key
													)}
											</button>
											<p>{button.name}</p>
										</div>
									);
								})}
							</div>
						</div> */}
          </div>
        </div>
      </ContractProgressStyle>
    );
  }
}
