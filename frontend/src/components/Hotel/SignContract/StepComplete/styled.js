import styled from 'styled-components';
import {
  SCREENS,
  FONTSIZES,
  BORDERRADIUSES,
  COLORS
} from 'themes/styles/bases/variables'

// Modifier (props)
// ============================================================

// Core
// ============================================================
export const StepCompleteStyle = styled.div`
	/* Parent styles
    ------------------------------- */
  .content {
    padding: 125px 170px 200px;
    border-radius: ${BORDERRADIUSES.XXL};
  }

  .content-detail {
    color: ${COLORS.GRAY9};
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
  @media screen and (max-width: ${SCREENS.DESKTOPMDMAX}) {
    .content {
      padding: 100px 55px;
      padding-bottom: 150px;
    }

    .h4 {
      margin-bottom: 30px;
    }
  }

  @media screen and (max-width: ${SCREENS.MOBILELGMAX}) {
    .content {
      padding: 55px 30px 80px;
    }

    .h2 {
      font-size: ${FONTSIZES.PRIMARYHEADINGMDMOBILE};
    }

    .h4 {
      font-size: ${FONTSIZES.PRIMARYBODYLGMOBILE};
    }

    .text-danger {
      font-size: ${FONTSIZES.PRIMARYBODYMDMOBILE};
    }
  }

`;

