import React, { Component } from 'react'
import { FormLoginStyle } from './styled'
import ClassNames from 'classnames'
import { Logos } from "themes"

export default class FormLogin extends Component {
  state = {
    statusUserRequire: true,
    statusPasswordRequire: true
  }
  requireForm = <div className='is-invalid-feedback'>require</div>
  onClickSubmitForm = ev => {
    const {
      statusUserRequire,
      statusPasswordRequire
    } = this.state
    const {
      target: { username: { value: username },
        password: { value: password } }
    } = ev
    ev.preventDefault()
    const userAuth = {
      username,
      password
    };
    if (statusUserRequire && statusPasswordRequire) {
      this.setState({
        userRequire: this.requireForm,
        passwordRequire: this.requireForm
      })
    } else {
      if (typeof this.props.onClickSubmitForm === 'function' && !statusUserRequire && !statusPasswordRequire) {
        this.props.onClickSubmitForm(userAuth);
      }
    }

  }
  handleInputFormChange = (ev) => {
    const {
      target: { value: { length: inputLength },
        name: keyInput }
    } = ev
    switch (keyInput) {
      case "username": this.setState({
        userRequire: inputLength !== 0 ? '' : this.requireForm,
        statusUserRequire: inputLength === 0 ? true : false
      })
        break;
      case "password": this.setState({
        passwordRequire: inputLength !== 0 ? '' : this.requireForm,
        statusPasswordRequire: inputLength === 0 ? true : false
      })
        break;
      default:
        break;
    }
  }
  render() {
    const {
      userRequire,
      passwordRequire
    } = this.state
    return (
      <FormLoginStyle
        className="form-signin"
        onSubmit={this.onClickSubmitForm}
      >
        <div className="text-center mb-5">
          <img src={Logos['logo-handigo.png']} className="mb-4" alt="Banner"/>
          <p>Welcome to HandiGo E-Contract, Please login.</p>
        </div>
        <div className="form-group mb-4">
          <input
            type="text"
            name="username"
            className={
              ClassNames(
                'form-control',
                'form-control-sm',
                { 'is-invalid': userRequire }
              )
            }
            placeholder="Username"
            autoFocus=""
            onChange={this.handleInputFormChange}
          />
          {
            userRequire
          }
        </div>

        <div className="form-group mt-4 mb-7">
          <input
            type="password"
            name="password"
            className={
              ClassNames(
                'form-control',
                'form-control-sm',
                { 'is-invalid': passwordRequire }
              )
            }

            placeholder="Password"
            onChange={this.handleInputFormChange}
          />
          {
            passwordRequire
          }
        </div>
        <button
          className="btn btn-lg btn-primary btn-block btn-signin"
          type="submit"
          value="Submit"
        >
          Sign in
				</button>
      </FormLoginStyle>
    );
  }
}
