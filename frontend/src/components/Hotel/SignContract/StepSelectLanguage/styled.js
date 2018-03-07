import styled from 'styled-components';
import {
  SCREENS,
  BORDERRADIUSES
} from 'themes/styles/bases/variables'

// Modifier (props)
// ============================================================

// Core
// ============================================================
export const StepSelectLanguageStyle = styled.div`
	/* Parent styles
    ------------------------------- */

  .content {
    padding: 80px 170px 58px;
    border-radius: ${BORDERRADIUSES.XXL}
  }

  hr {
    margin-top: 200px;
    margin-bottom: 36px;
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
  @media screen and (max-width: ${SCREENS.TABLETLGMAX}) {
    .content {
      padding: 55px 60px 55px;
    }

    hr {
      margin-top: 150px;
      margin-bottom: 36px;
    }
  }

  @media screen and (max-width: ${SCREENS.TABLETXSMAX}) {
    hr {
      margin-top: 80px;
    }

    .buttons-frontend {
      display: table;
      margin: auto;
      width: 100%;
      text-align: center;
    }
  }

  @media screen and (max-width: ${SCREENS.MOBILELGMAX}) {
    .content {
      padding: 55px 30px 55px;
    }

    .btn-lang {
      min-width: 100%;
      margin-left: 0;
      margin-right: 0;
    }
  }
`;

