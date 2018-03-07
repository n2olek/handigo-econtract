import styled from 'styled-components'
import { Icons } from 'themes'
import {
  SCREENS
} from 'themes/styles/bases/variables'
// import { mediaBreakpointDown } from '../../hemes/styles/helpers/utilities'

// Modifier (props)
// ============================================================

// Core
// ============================================================
export const IconsHandico = styled.i`
	/* Parent styles
    ------------------------------- */
  &:before {
      display: inline-block;
      margin-right: 10px;
      vertical-align: middle;
  }

  &.handigo-icon {
    &-logout {
      &:before {
        content: url(${Icons['icon-logout.svg']});
        width: 26px;
        display: block;
        margin-top: 10px;
        margin-right: 0;
      }
    }

    &-thai {
      &:before {
        content: url(${Icons['lang-thai.svg']});
        width: 25px;
        margin-right: 20px;
      }
    }

    &-eng {
      &:before {
        content: url(${Icons['lang-eng.svg']});
        width: 25px;
        margin-right: 20px;
      }
    }
  }

	/* Child element styles
    ------------------------------- */

	/* States
    ------------------------------- */

	/* Modifiers
    ------------------------------- */

	/* States with modifiers
    ------------------------------- */

	/* Media queries
    ------------------------------- */

  @media screen and (max-width: ${SCREENS.PHABLETXSMAX}) {
    &.handigo-icon {
      &-logout {
        &:before {
          margin-top: 2px;
          width: 18px;
          line-height: 1;
          display: inline-block;
        }
      }
    }
  }

`
