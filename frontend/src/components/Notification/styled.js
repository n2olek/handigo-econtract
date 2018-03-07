import styled from 'styled-components'
import {
  COLORS,
  FONTFAMILIES,
  BORDERRADIUSES,
  FONTSIZES,
  SCREENS
} from 'themes/styles/bases/variables'

// Modifier (props)
// ============================================================

// Core
// ============================================================
export const ToastContainerStyled = styled.div`
	/* Parent styles
    ------------------------------- */
  .toast-wrapper {
    min-width: 383px;
    top: 10em;
    right: 0;
    padding-right: 0;
  }

  .toast-container {
    background-color: ${COLORS.ORANGE4};
    border-radius: ${BORDERRADIUSES.XS};
    border-top-left-radius: 50px;
    border-bottom-left-radius: 50px;
    color: ${COLORS.ORANGE3};
    font-family: ${FONTFAMILIES.SECONDARYOPENSANS};
    box-shadow: none;
    min-height: 50px;
    padding-left: 70px;
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
  @media screen and (min-width: ${SCREENS.DESKTOPMD}) {
    .toast-container {
      min-height: 68px;
    }
  }

  @media only screen and (max-width: ${SCREENS.PHABLETLGMAX}) {
    .toast-wrapper {
      top: 0;
      min-width: auto;
      width: 100%;
      position: absolute;
      padding: 0;
    }

    .toast-container {
      font-size: ${FONTSIZES.PRIMARYBODYMDMOBILE};
      border-radius: 0;
      padding-left: 0;
      text-align: center;
      min-height: 40px;
    }
  }

`;
