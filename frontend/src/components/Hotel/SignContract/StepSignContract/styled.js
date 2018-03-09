import styled from "styled-components";
import {
  COLORS,
  BORDERRADIUSES,
  FONTSIZES,
  FONTFAMILIES,
  SCREENS
} from 'themes/styles/bases/variables'

// Modifier (props)
// ============================================================

// Core
// ============================================================
export const StepSignContractStyle = styled.div`
    /* Parent styles
    ------------------------------- */
    .content {
      padding: 76px 170px 58px;
    }

    hr {
      margin-top: 30px;
      margin-bottom: 15px;
    }

    .card {
      border-radius: 0;
    }

    .card-contract {
      margin-bottom: 70px;
    }

    .card-body {
      padding: 5px;
      padding-bottom: 0;
    }

    iframe {
      border: none;
    }

    .signature-contents {
      padding-left: 130px;
      padding-right: 130px;
      margin-bottom: 40px;
    }

    .signature-content {
      padding-left: 50px;
      padding-right: 50px;
      margin-bottom: 30px;
    }

    .signature-body {
      min-height: 167px;
      border: 1px solid ${COLORS.BLUE};
      border-radius: ${BORDERRADIUSES.XS};
      font-size: ${FONTSIZES.PRIMARYBODYMD};
      height: 167px;
      cursor: pointer;
      overflow: hidden;

      p {
        color: ${COLORS.BLUE};
      }
    }

    .signature-view {
      height: 100%;
      margin: auto;
    }

    .signature-default {
      p {
        font-size: ${FONTSIZES.PRIMARYBODYXS};
        font-family: ${FONTFAMILIES.SECONDARYOPENSANS};
      }
    }

    .btn-download {
      &:hover {
        color: ${COLORS.WHITE};
      }
    }

    .handigo-icon-edit-signature {
      width: 42px;
      height: 42px;
      display: table;
      text-align: center;
      position: absolute;
      right: 25px;
      top: -15px;
      border-radius: 50%;
      background-color: ${COLORS.BLUE};
    }

    /* Child element styles
    ------------------------------- */

    /* States
    ------------------------------- */

    /* Modifiers
    ------------------------------- */

    .modal-header {
      background-color: ${COLORS.BLUE};
      border-top-left-radius: ${BORDERRADIUSES.XXL};
      border-top-right-radius: ${BORDERRADIUSES.XXL};
      padding: 22px 35px;

    }

    .modal-content {
      border-color: transparent;
      border-radius: ${BORDERRADIUSES.XXL};
    }

    .modal-footer {
      display: block;
      border-top: none;
    }

    /* States with modifiers
    ------------------------------- */

    /* Media queries
    ------------------------------- */
    @media screen and (min-width: ${SCREENS.TABLETMMD}) {
      .modal-dialog {
        max-width: 900px;
      }

      .modal-body {
          padding: 40px;
      }

      .modal-footer {
        padding: 0 40px 33px;
      }
    }

    @media screen and (max-width: ${SCREENS.DESKTOPMDMAX}) {
      .content {
        padding: 100px 55px;
        padding-bottom: 150px;
      }

      .signature-contents {
        padding-left: 0;
        padding-right: 0;
      }

      .modal-header {
        padding: 15px;

        h4 {
          font-size: ${FONTSIZES.PRIMARYHEADINGXS}
        }
      }
    }

    @media screen and (max-width: ${SCREENS.DESKTOPMDMAX}) {
      .signature-content {
        padding-left: 15px;
        padding-right: 15px;
      }

      .handigo-icon-edit-signature {
        right: 0;
      }
    }

    @media screen and (max-width: ${SCREENS.TABLETLGMAX}) {
      .buttons-frontend {
        .btn {
          min-width: 100%;
          margin-bottom: 15px;
        }
      }
    }

    @media screen and (max-width: ${SCREENS.MOBILELGMAX}) {
      .content {
        padding: 55px 30px 80px;
      }
    }

    @media screen and (max-width: ${SCREENS.MOBILELLGMAX}) {
      .buttons-model {
        .btn {
          min-width: 100%;
          margin-bottom: 15px;
        }
      }
    }
`;


