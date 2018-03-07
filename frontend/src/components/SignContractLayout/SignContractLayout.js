import React from 'react'
import { SignContractStyle } from './styled'

export default class SignContractLayout extends React.Component {
  render() {
    const {
      children
    } = this.props

    return(
      <SignContractStyle>
        <div className='container'>
          {children}
        </div>
      </SignContractStyle>
    )
  }
}