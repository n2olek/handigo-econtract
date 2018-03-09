import styled from 'styled-components';
import {
	COLORS,
	BORDERRADIUSES,
	SCREENS
} from '../../themes/styles/bases/variables';

// Modifier (props)
// ============================================================

// Core
// ============================================================
export const SignaturePadComponentStyle = styled.div`
	/* Parent styles
    ------------------------------- */
	border: 1px solid ${COLORS.BLUE};
	border-radius: ${BORDERRADIUSES.XS};
	width: 100%;
	min-height: 377px;



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

	@media screen and (min-width: ${SCREENS.TABLETLG}) {
		canvas {
			/* width: 818px !important; */
		}
	}

	@media screen and (max-width: ${SCREENS.TABLETSSMMAX}) {
		min-height: 255px;
	}
`;

