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

    &-close {
      &:before {
        content: url(${Icons['icon-close.svg']});
        width: 10px;
        margin: auto;
      }
    }

    &-attached {
      &:before {
        content: url(${Icons['icon-attached.svg']});
        width: 14px;
        height: 14px;
      }
    }

    &-signature {
      &:before {
        content: url(${Icons['icon-signature.svg']});
        width: 38px;
        margin-right: 0;
        margin-top: 10px;
      }
    }

    &-download {
      &:before {
        content: url(${Icons['icon-download.svg']});
        width: 14px;
      }
    }

    &-reset {
      &:before {
        content: url(${Icons['icon-reset.svg']});
        width: 10px;
      }
    }

    &-edit-signature {
        &:before {
          content: url(${Icons['icon-edit-signature.svg']});
          width: 18px;
          margin-right: 0;
          margin-top: 10px;
        }
    }

    &-success {
        &:before {
          content: url(${Icons['icon-success.svg']});
          width: 22px;
          margin-right: 0;
          /* margin-top: 10px; */
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
