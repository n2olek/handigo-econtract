import styled from 'styled-components';
import {
    COLORS,
    FONTFAMILIES,
    FONTSIZES
} from 'themes/styles/bases/variables'

// Modifier (props)
// ============================================================

// Core
// ============================================================
export const FormLoginStyle = styled.form`
	/* Parent styles
    ------------------------------- */
  width: 100%;
  max-width: 410px;
  padding: 15px;
  margin: 0 auto;
  display: table;

  img {
    max-width: 165px;
  }

  input {
    border: none;
    border-radius: 0;
    min-height: 38px;
    border-bottom: 2px solid ${COLORS.GRAY3};
    font-family: ${FONTFAMILIES.SECONDARYOPENSANS};
    color: ${COLORS.BLACK};

    &:focus {
        border-color: ${COLORS.ORANGE1};
        box-shadow: none;
    }
  }

  .is-invalid {
    padding: 7px 10px;
    margin-top: 5px;
    border-radius: 0;
    border-color: ${COLORS.ORANGE1};

    &:focus {
        box-shadow: none;
        border-color: ${COLORS.ORANGE1};
    }
  }

  .is-invalid-feedback {
    display: block;
    text-align: right;
    padding: 5px 0;
    margin-top: 5px;
    border-radius: 3px;
    font-size: ${FONTSIZES.PRIMARYBODYXS};
    color: ${COLORS.ORANGE1};
    font-family: ${FONTFAMILIES.SECONDARYOPENSANS};
  }

  .btn-signin {
    margin-top: 72px;
  }

  input[type="password"]:not(:placeholder-shown) {
    font: large Verdana,sans-serif;
    letter-spacing: 1px;
    font-size: ${FONTSIZES.PRIMARYBODYXL};
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
