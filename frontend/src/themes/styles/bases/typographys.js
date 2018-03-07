import { css } from 'styled-components'
import {
  fontFamilies,
  fontSizes,
  lineHeights,
  letterSpacings,
} from './variables'

// //////////////////////////////////////////////////////////////////////////////////////////////////
// ==================================================================================================
//
// Typographys
// * Text global style
// * Text body
//   - Extra small
// * Text Heading
//   - Extra small
//
// Notice: Color, Hover/Focus can set at Global or Scaffolding
//
// ==================================================================================================
// //////////////////////////////////////////////////////////////////////////////////////////////////

// Text global style
// ============================================================
const textStyle = css`
    font-weight: normal;
    vertical-align: middle;
    text-transform: none;
`

// Text body
// ============================================================

// Extra small
// -------------------------------
const textBodyPrimaryXs = css`
    ${textStyle}
    font-family: ${fontFamilies.primaryRegular};
    font-size: ${fontSizes.primaryBodyXs};
    line-height: ${lineHeights.primaryBody};
    letter-spacing: ${letterSpacings.primaryBody};
`

// Text Heading
// ============================================================

// Extra small
// -------------------------------
const textHeadingPrimaryXs = css`
    ${textStyle}
    font-family: ${fontFamilies.primaryBold};
    font-size: ${fontSizes.primaryHeadingXs};
    line-height: ${lineHeights.primaryHeading};
    letter-spacing: ${letterSpacings.primaryHeading};
`

export {
  textBodyPrimaryXs,
  textHeadingPrimaryXs,
}
