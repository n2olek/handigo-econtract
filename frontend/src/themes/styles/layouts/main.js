import { injectGlobal } from 'styled-components'
import {
  colors,
  boxShadows,
  screens,

  COLORS,
  FONTSIZES,
  SCREENS
} from '../bases/variables'
import { textBodyPrimaryXs } from '../bases/typographys'
import {
  sampleMixinsA,
  sampleMixinsB,
  sampleMixinsC,
} from '../helpers/mixins'
import { sampleUtility } from '../helpers/utilities'

// import bgSignin from 'themes/images/contents/bg-signup.jpg';

import { Contents } from "themes"


// //////////////////////////////////////////////////////////////////////////////////////////////////
// ==================================================================================================
//
// Global style
// * Test html tag selector
// * Test css selector class
// * Sample structure class
//
// ==================================================================================================
// //////////////////////////////////////////////////////////////////////////////////////////////////

injectGlobal`
  /* Test html tag selector

  ============================================================ */

  body {
    font-family: 'GothamRounded Bold';
    color: ${COLORS.GRAY7};
    background-color: ${COLORS.GRAY};

    .segment {
      /* margin-bottom: 60px; */
    }
  }

  @media screen and (min-width: 992px) {
    .form-signin-wrapper {
      display: flex;
      align-items: center;
      justify-content: center;
      flex: 1;
      height:100vh;
      flex-direction: column;
      margin-top: 0;
    }

    .footer-buttom {
      position: absolute;
      left: 0;
      bottom: 0;
      right: 0;
    }
  }

  @media screen and (max-width: ${SCREENS.TABLETMDMAX}) {
    .bg-signin {
        display: none;
    }

    .form-signin-wrapper {
      margin-top: 10em;
    }
  }

  @media screen and (max-width: ${SCREENS.PHABLETXSMAX}) {
    .form-signin-wrapper {
      margin-top: 2em;
    }
  }

  .bg-signin {
    /* background: url('themes/images/contents/bg-signup.jpg') no-repeat center; */
    background: url(${Contents['bg-signup.jpg']}) no-repeat center;
    background-size: cover;
  }

  .footer-buttom {
    font-size: ${FONTSIZES.PRIMARYBODYXS};
  }

.btn {
    &.disabled,
    &:disabled {
      background-color: ${COLORS.GRAY8};
      border-color: ${COLORS.GRAY8};
      color: ${COLORS.WHITE1};
    }

    &-primary {
      background: ${COLORS.BLUE};
      border-color: ${COLORS.BLUE};

      &:hover {
        opacity: .8;
        background: ${COLORS.BLUE};
        border-color: ${COLORS.BLUE};
      }
    }

    &-tertiary {
      color: ${COLORS.WHITE};
    }

    &-lang {
      min-width: 265px;
      margin-left: 15px;
      margin-right: 15px;
      min-height: 58px;
      color: ${COLORS.GRAY8};
      border-color: ${COLORS.GRAY4};

      &.is-active, &:hover {
          background-color: ${COLORS.BLUE};
          border-color: ${COLORS.BLUE};
          color: ${COLORS.WHITE};
      }
    }

    &-file {
        position: relative;
        font-size: $font-size-sm;

        input[type=file] {
            top: 0;
            right: 0;
            min-width: 100%;
            min-height: 100%;
            opacity: 0;
            cursor: inherit;
            display: block;
            position: absolute;
        }
    }

    &-save {
        min-width: 160px;
    }

    &-back {
        min-width: 148px;
    }

    &-reset {
        min-width: 125px;
    }

    &-close {
        min-width: 125px;
    }

    &-submit {
        min-width: 110px;
    }

    &-save-draft {
        min-width: 148px;
    }

    &-save-and-send {
        min-width: 205px;
    }

    &-create-contract {
        min-width: 205px;
    }

    &-icon {
        padding: 0 5px;
        line-height: 1;
    }
}

.buttons-frontend {
    .btn {
        min-height: 50px;

        &-reset {
            min-width: 156px;
        }

        &-close {
            min-width: 156px;
        }

        &-submit {
            min-width: 136px;
        }
    }
}

.buttons-admin {
    .btn {
        min-height: 40px;

        &-search {
            min-width: 132px;
        }

        &-create-contract {
            min-width: 200px;
        }

        &-confirm-delete {
            min-width: 140px;
        }

        &-cancle {
            min-width: 98px;
        }
    }
}

.file-upload {
    &-statusbar {
        color: $gray-700;
        font-size: $font-size-xs;
        font-family: $font-family-monospace;
        padding: 11px 15px;
        background-color: $gray-111;

        .close {
            width: 20px;
            height: 20px;
            background-color: $gray-600;
            line-height: 0.5;
            font-size: 14px;
            text-shadow: none;
            color: $white;
        }
    }
}

.button-continue, .buttons-group {
    .btn {
        margin-right: 15px;

        &:last-child {
            margin-right: 0;
        }
    }
}

.buttons-admin {
    .btn {
        line-height: 2;
    }
}

  /* Test no effect global to local style
  ============================================================ */
  .segment {
    margin-bottom: 60px;
  }


  /* Test css selector class
  ============================================================ */
  .test-globalstyle-variables-mixins-utilities-typographys {
    /* Sample mixins */
    ${sampleMixinsA(boxShadows.shadow1)};
    ${sampleMixinsB('15px', colors.gray4)};
    ${sampleMixinsC('5px solid ' + colors.gray1)};

    /* Sample utility */
    ${sampleUtility}

    /* Sample typography */
    ${textBodyPrimaryXs}

    /* Sample variable */
    color: ${colors.red};

    /* Sample css property */
    margin-bottom: 30px;
  }

  /* Sample structure class
  ============================================================ */
  .sample-structure-class {
    /* Parent styles
    ------------------------------- */
    ${sampleMixinsA(boxShadows.shadow1)};
    padding: 50px;
    margin-bottom: 30px;
    border: 5px solid ${colors.black};

    /* Child element styles
    ------------------------------- */
    .child-element {
      background-color: ${colors.gray4};
    }

    /* States
    ------------------------------- */
    &.is-success {
      .child-element {
        background-color: ${colors.green1};
      }
    }

    &.is-error {
      .child-element {
        background-color: ${colors.red};
      }
    }

    /* Modifiers
    ------------------------------- */
    &.is-modifier-first {
      height: 50vh;
    }

    /* States with modifiers
    ------------------------------- */
    &.is-success {
      &.is-modifier-first {
        .child-element {
          background-color: ${colors.black};
        }
      }
    }

    /* Media queries
    ------------------------------- */
    @media (max-width: ${screens.tabletLg}) {
      background-color: ${colors.black};
    }
  }
`;
