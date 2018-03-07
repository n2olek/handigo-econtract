import styled from 'styled-components';
import {
    SCREENS
} from 'themes/styles/bases/variables'

// Modifier (props)
// ============================================================

// Core
// ============================================================
export const SignContractStyle = styled.div`
	/* Parent styles
    ------------------------------- */
    padding-top: 85px;
    padding-bottom: 30px;

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

    @media screen and (min-width: ${SCREENS.DESKTOPLG}) {
        .container {
            max-width: 1599px;
        }
    }

`;

export default SignContractStyle;
