import React from 'react'
import { Buttons } from './styled'

export default class ButtonSample extends React.Component {
  render() {
    const {
      children,
      type,
      modifierClass,
      onClick
    } = this.props

    return(
      <Buttons
        type={type}
        className={modifierClass}
        onClick={onClick}
      >
        {children}
      </Buttons>
    )
  }
}