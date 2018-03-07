import styled from 'styled-components';
import {
  COLORS,
  FONTSIZES,
  SCREENS
} from 'themes/styles/bases/variables'
import { Icons } from 'themes'

// Modifier (props)
// ============================================================

// Core
// ============================================================
export const ContractProgressStyle = styled.div`
	/* Parent styles
    ------------------------------- */
  margin-bottom: 50px;

  .progressbar {
    margin: 0;
    padding: 0;
    counter-reset: step;

    li {
      font-size: ${FONTSIZES.PRIMARYBODYXS};
      color: ${COLORS.GRAY8};
      list-style-type: none;
      width: 25%;
      float: left;
      position: relative;
      text-align: center;
      text-transform: uppercase;

      &:before {
        width: 38px;
        height: 38px;
        content: counter(step);
        counter-increment: step;
        line-height: 32px;
        border: 3px solid ${COLORS.BLUE};
        display: block;
        text-align: center;
        margin: 0 auto 10px auto;
        border-radius: 50%;
        background-color: white;
        color: ${COLORS.BLUE};
        font-size: ${FONTSIZES.PRIMARYBODYXS};
      }

      &:after {
        width: 100%;
        height: 3px;
        content: '';
        position: absolute;
        background-color: ${COLORS.BLUE};
        top: 15px;
        left: -50%;
        z-index: -1;
      }

      &.is-active {
        color: ${COLORS.BLUE};
      }

      &.is-checked {
        color: ${COLORS.BLUE};

        &:before {
            background-color: ${COLORS.BLUE};
            color: transparent;
            background: url(${Icons['icon-checked.svg']}) center no-repeat ${COLORS.BLUE};
            background-size: 16px;
        }
      }

      &:first-child:after {
          content: none;
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

  @media screen and (min-width: ${SCREENS.TABLETLGMAX}) {
    .progressbar {
        width: 65%;
        margin: auto;
    }
  }


  @media screen and (max-width: ${SCREENS.TABLETXSMAX}) {
    .progressbar {
      p {
        display: none;
      }

      li.is-active {
        p {
          display: block;
        }
      }
    }
  }

`;

