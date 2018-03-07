import styled from 'styled-components';
import {
  COLORS,
  FONTFAMILIES,
  FONTSIZES,
  SCREENS
} from 'themes/styles/bases/variables'

// Modifier (props)
// ============================================================

// Core
// ============================================================
export const AppHeaderStyle = styled.header`
	/* Parent styles
    ------------------------------- */
  .navbar-brand {
    max-width: 238px;
    width: 100%;
  }

  .navbar-text {
    font-family: ${FONTFAMILIES.SECONDARYOPENSANS};
    font-size: ${FONTSIZES.PRIMARYBODYSM};
    color: ${COLORS.BLACK};
  }

  .navbar-nav {
    li {
      &:after {
        content: '';
        background-color: ${COLORS.GRAY4};
        width: 1px;
        height: 56px;
        display: inline-block;
        vertical-align: middle;
        margin-right: 25px;
        margin-left: 30px;
      }

      &:last-child:after {
        content: none;
      }
    }
  }

  .nav-link {
    padding: 0;
    background: transparent;
    border: none;
    cursor: pointer;
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
  @media screen and (max-width: ${SCREENS.PHABLETLGMAX}) {
    .navbar-text {
      text-overflow: ellipsis;
      overflow: hidden;
      width: 200px;
      white-space: nowrap;
      vertical-align: middle;
    }
  }

  @media screen and (max-width: ${SCREENS.PHABLETXSMAX}) {
    .navbar-nav {
        display: block;

        .nav-item {
            display: inline-block;

            &:after {
                margin-right: 0;
                margin-left: 5px;
                height: 25px;
            }
        }
    }

    .navbar-text {
        font-size: ${FONTSIZES.PRIMARYBODYSMMOBILE};

        span {
            display: none;
        }
    }

    .navbar-brand {
        max-width: 120px;
        margin-right: 0;
    }
  }

  @media screen and (max-width: ${SCREENS.MOBILELGMAX}) {
    .navbar-text {
      width: 100px;
    }
  }
`