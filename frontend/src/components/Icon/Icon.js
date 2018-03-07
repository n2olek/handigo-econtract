import React from 'react'
import { IconsHandico } from './styled'
import ClassName from 'classnames'

export default class Icon extends React.Component {
  render() {
    const {
      children,
      type,
      name
    } = this.props

    return(
      <IconsHandico
        type={type}
        className={
          ClassName('handigo-icon-' + name)}
      >
        {children}
      </IconsHandico>
    )
  }
}