import styled from 'styled-components';
import {
  SCREENS,
  FONTSIZES,
  BORDERRADIUSES,
  FONTFAMILIES,
  COLORS
} from 'themes/styles/bases/variables'

// Modifier (props)
// ============================================================

// Core
// ============================================================
export const StepContractFormStyle = styled.div`
	/* Parent styles
    ------------------------------- */
  .content {
    padding: 76px 100px 58px;
    border-radius: ${BORDERRADIUSES.XXL};
  }

  hr {
    margin-top: 200px;
    margin-bottom: 36px;
  }

  h4 {
    margin-bottom: 8px;
  }

  .header-title {
    margin-bottom: 66px;

    p {
      font-size: ${FONTSIZES.PRIMARYBODYSM};
      font-family: ${FONTFAMILIES.SECONDARYOPENSANS};
    }
  }

  .form-control {
    font-size: ${FONTSIZES.PRIMARYBODYXS};
    font-family: ${FONTFAMILIES.SECONDARYOPENSANS};
    padding: 10px;
  }

  .form-group.row > .col-form-label {
    font-size: ${FONTSIZES.PRIMARYBODYSM};
  }

  .form-group {
    small {
      position: absolute;
      left: 0;
    }
  }

  .needs-validation {
      position: absolute;
      top: 0;
      right: -5px;
      font-size: 1.3rem;
      color: ${COLORS.ORANGE1};
      line-height: 0.5;
  }

  .invalid-feedback {
      font-family: ${FONTFAMILIES.SECONDARYOPENSANS};
      width: auto;
      display: block;
      color: ${COLORS.ORANGE1};
  }

  .is-invalid {
    border-color: ${COLORS.ORANGE1};

    &:focus {
      border-color: ${COLORS.ORANGE1};
      box-shadow: none;

    }
  }

  .alert-wrapper {
      right: 0;
      top: 60%;

      .alert {
          padding-left: 65px;
          padding-right: 30px;
          font-family: ${FONTFAMILIES.SECONDARYOPENSANS};
          border-top-left-radius: 50px;
          border-bottom-left-radius: 50px;

          &-warning {
              background-color: rgba($orange, .3);
              color: $orange-100;
          }

          &-success {
              background-color: rgba($green, .3);
              color: $green-100;
          }
      }
  }


  .file-upload {
    &-statusbar {
      color: ${COLORS.GRAY9};
      font-size: ${FONTSIZES.PRIMARYBODYXS};
      font-family: ${FONTFAMILIES.SECONDARYOPENSANS};
      padding: 11px 15px;
      background-color: ${COLORS.GRAY2};

      .close {
        width: 20px;
        height: 20px;
        background-color: ${COLORS.GRAY7};
        line-height: 0.5;
        font-size: 14px;
        text-shadow: none;
        color: ${COLORS.WHITE};
      }

      a {
        color: ${COLORS.GRAY9};

        &:hover {
          color: ${COLORS.BLUE};
        }
      }
    }
  }

  .buttons-frontend {
    .btn {
      margin-bottom: 15px;
    }
  }

  .btn {
    &-draft {
      min-width: 185px;
    }

    &-back {
      min-width: 185px;
    }
  }

  @media screen and (min-width: ${SCREENS.TABLETMMD}) {
    .form-group.row > .col-form-label {
      text-align: right;
      padding-right: 40px;
    }
  }

  @media screen and (min-width: ${SCREENS.DESKTOPLG}) {
    .alert {
      padding: 20px 65px;
    }

    .invalid-feedback {
      position: absolute;
      top: 5px;
      left: 555px;
    }
  }

  @media screen and (max-width: ${SCREENS.DESKTOPMDMAX}) {
    .content {
      padding: 55px;
    }

    hr {
      margin-top: 150px;
      margin-bottom: 36px;
    }
  }

  @media screen and (max-width: ${SCREENS.TABLETLGMAX}) {
    /* .content {
      padding: 55px 60px 55px;
    } */

    /* hr {
      margin-top: 150px;
      margin-bottom: 36px;
    } */
  }

  @media screen and (max-width: ${SCREENS.TABLETMDMAX}) {
    hr {
      margin-top: 80px;
    }

    .buttons-frontend {
      .btn {
        min-width: auto;
        padding-left: 30px;
        padding-right: 30px;
      }
    }
  }

  @media screen and (max-width: ${SCREENS.TABLETXSMAX}) {
    hr {
      margin-top: 80px;
    }
  }

  @media screen and (max-width: ${SCREENS.PHABLETLGMAX}) {
    .buttons-frontend {
      .btn {
        min-width: 100%;
      }
    }
  }

  @media screen and (max-width: ${SCREENS.MOBILELGMAX}) {
    .content {
      padding: 55px 30px 55px;
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
`
