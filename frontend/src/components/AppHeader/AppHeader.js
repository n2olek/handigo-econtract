import React from 'react';
import { AppHeaderStyle } from './style';
import { logout } from 'helpers';
import {
  Logos
} from "themes"
import { Icon } from 'components'

export default class AppHeader extends React.Component {
  render() {
    return(
      <AppHeaderStyle className="navbar sticky-top navbar-expand-sm navbar-light bg-white pt-lg-3 pb-lg-3">
        <a className="navbar-brand pt-lg-2 pb-lg-2" href="/">
          <img src={Logos['logo-handigo-inline.svg']} alt="Logo"/>
        </a>

        <div className="navbar-nav ml-auto">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <span className="navbar-text">
                Welcome to HandiGo E- Contract Signature
              </span>
            </li>
            <li className="nav-item">
              <button className="nav-link p-2" onClick={logout}>
                <Icon name='logout'/>
              </button>
            </li>
          </ul>
        </div>
      </AppHeaderStyle>
    )
  }
}