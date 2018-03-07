import React, { Component } from 'react';
import {StepSelectLanguageStyle} from './styled';
import ClassName from 'classnames';
import { Icon } from 'components';

export default class StepSelectLanguage extends Component {
  state = {
    selectedLanguage: '',
    languageList: [
      { name: 'Thai', iconClass: 'thai' },
      { name: 'English', iconClass: 'eng' }
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
        <div className="content bg-white">
          <div className="header-title text-center">
            <h4>
              Choose Contract Language
            </h4>
          </div>
          <div className="button-choose text-center">
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
                  <Icon name={language.iconClass}/>
                  {language.name}
                </button>
              );
            })}
          </div>

          <hr/>

          <div className="buttons-frontend float-right">
            <button
              type="button"
              className={ClassName(
                'btn btn-primary btn-lg btn-continue',
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
      </StepSelectLanguageStyle>
    );
  }
}
