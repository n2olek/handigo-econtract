import React, { Component } from 'react';
import {StepSelectLanguageStyle} from './styled';
import ClassName from 'classnames';

export default class StepSelectLanguage extends Component {
  state = {
    selectedLanguage: '',
    languageList: [
      { name: 'Thai', iconClass: 'handigo-icon-thai' },
      { name: 'English', iconClass: 'handigo-icon-eng' }
    ]
  };

  componentWillMount() {
    const { selectedLanguage } = this.props;
    this.setState({ selectedLanguage });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedLanguage !== this.state.selectedLanguage)
      this.setState({ selectedLanguage: nextProps.selectedLanguage });
  }

  onClickContinue = () => {
    const { onSubmit } = this.props;
    const { selectedLanguage } = this.state;
    if (!selectedLanguage) return false;

    if (typeof onSubmit === 'function') onSubmit(selectedLanguage);
  };

  onSelect = language => {
    this.setState({ selectedLanguage: language });
  };

  render() {
    const { selectedLanguage, languageList } = this.state;
    return (
      <StepSelectLanguageStyle>
        <div className="row">
          <div className="col">
            <div className="content bg-white rounded mt-5 mb-5 p-5">
              <div className="header-title text-center mt-3 mb-4 mb-8">
                <h4 className="text-dark">
                  Choose Contract Language
								</h4>
              </div>
              <div className="button-choose text-center mb-8">
                {languageList.map((language, index) => {
                  return (
                    <button
                      key={index}
                      type="button"
                      className={ClassName(
                        'btn btn-outline-secondary btn-lg btn-lang btn-lang-thai text-left',
                        {
                          'is-active':
                            selectedLanguage ===
                            language.name
                        }
                      )}
                      onClick={() => {
                        this.onSelect(language.name);
                      }}
                    >
                      <i
                        className={ClassName(
                          'handigo-icon',
                          language.iconClass
                        )}
                      />
                      {language.name}
                    </button>
                  );
                })}
              </div>

              <hr className="mt-15" />

              <div className="button-continue float-right mt-2">
                <button
                  type="button"
                  className={ClassName(
                    'btn btn-primary btn-lg',
                    { disabled: !selectedLanguage }
                  )}
                  onClick={this.onClickContinue}
                >
                  Continue
								</button>
                {/*
									<button
									type="button"
									className="btn btn-outline-primary btn-lg"
									>
									<i className="handigo-icon handigo-icon-viewcontract" />View
									Contract
									</button>
								*/}
              </div>

              <div className="clearfix" />
            </div>
          </div>
        </div>
      </StepSelectLanguageStyle>
    );
  }
}
