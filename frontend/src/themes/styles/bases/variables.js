// //////////////////////////////////////////////////////////////////////////////////////////////////
// ==================================================================================================
//
// Variables
// * Colors
// * Font families
// * Font sizes
// * Line heights
// * Letter spacing
// * Zindexs
// * Screens
// * Animation timings
// * Border radiuses
// * Component width
// * Component height
//
// ==================================================================================================
// //////////////////////////////////////////////////////////////////////////////////////////////////

// Colors
// ============================================================
const COLORS = {
  // Base
  BLACK: '#000000',
  WHITE: '#ffffff',
  GRAY: '#F6F9FA',

  //Primary
  BLUE: '#0AACCC',
  BLUE1: '#0B99B5',

  ORANGE1: '#FF8425',
  ORANGE2: '#F5881F',
  ORANGE3: '#AA4A00',
  ORANGE4: 'rgba(255, 132, 37, .3)',

  GREEN1: '#0ACC28',
  GREEN2: '#09842F',
  GREEN3: 'rgba(10, 204, 40, .3)',

  WHITE1: 'rgba(255, 255, 255, .4)',

  // Brand
  GRAY1: '#F8F8F8',
  GRAY2: '#F5F5F5',
  GRAY3: '#F1F1F1',
  GRAY4: '#E8E9EC',
  GRAY5: '#DDDDDD',
  GRAY6: '#CECFD0',
  GRAY7: '#B9B9B9',
  GRAY8: '#898989',
  GRAY9: '#4D4F5C',
  GRAY10: '#43425D',
  GRAY11: '#373A3C'
}

const colors = {
  // Base
  black: '#000000',
  white: '#ffffff',
  red:   '#ff0000',
  // Brand
  gray1: '#666666',
  gray2: '#999999',
  gray3: '#cccccc',
  gray4: '#f7f7f7',
  blue1: '#61dafb',
  green1: '#2ecc40'
}

// Font families
// ============================================================
const FONTFAMILIES = {
  PRIMARYGOTHAMROUNDED: 'GothamRounded Bold',
  SECONDARYOPENSANS: 'OpenSans Regular'
}

const fontFamilies = {
  primaryRegular: 'GothamRounded Bold',
  primaryBold: 'OpenSans Bold',
}

// Font sizes
// ============================================================
const FONTSIZES = {
  PRIMARYBODYXS: '12px',
  PRIMARYBODYSM: '14px',
  PRIMARYBODYMD: '16px',
  PRIMARYBODYLG: '18px',
  PRIMARYBODYXL: '22px',
  PRIMARYBODYXXL: '24px',
  PRIMARYBODYXSMOBILE: '10px',
  PRIMARYBODYSMMOBILE: '12px',
  PRIMARYBODYMDMOBILE: '14px',
  PRIMARYBODYLGMOBILE: '16px',
  PRIMARYHEADINGXS: '20px',
  PRIMARYHEADINGSM: '28px',
  PRIMARYHEADINGMD: '32px',
  PRIMARYHEADINGLG: '48px',
  PRIMARYHEADINGXSMOBILE: '18px',
  PRIMARYHEADINGSMMOBILE: '20px',
  PRIMARYHEADINGMDMOBILE: '24px',
  PRIMARYHEADINGLGMOBILE: '36px',
}

const fontSizes = {
  primaryBodyXs: '12px',
  primaryBodySm: '14px',
  primaryBodyMd: '16px',
  primaryBodyLg: '18px',
  primaryBodyXsMobile: '10px',
  primaryBodySmMobile: '12px',
  primaryBodyMdMobile: '14px',
  primaryBodyLgMobile: '16px',
  primaryHeadingXs: '20px',
  primaryHeadingSm: '28px',
  primaryHeadingMd: '32px',
  primaryHeadingLg: '48px',
  primaryHeadingXsMobile: '18px',
  primaryHeadingSmMobile: '20px',
  primaryHeadingMdMobile: '24px',
  primaryHeadingLgMobile: '36px',
}

// Line heights
// ============================================================
const lineHeights = {
  primaryBody: '1.3',
  primaryHeading: '1.3',
}

// Letter spacing
// ============================================================
const letterSpacings = {
  primaryBody: 'initial',
  primaryHeading: 'initial',
}

// Zindexs
// ============================================================
const zindexs = {
  lv1: '1',
  lv2: '9',
  lv3: '99',
  lv4: '999',
  lv5: '9999',
}

// Screens
// ============================================================
const SCREENS = {
  MOBILEXS: '320px',
  MOBILESM: '360px',
  MOBILEMD: '375px',
  MOBILELG: '414px',
  MOBILEXSMAX: '359px',
  MOBILESMMAX: '374px',
  MOBILEMDMAX: '413px',
  MOBILELGMAX: '479px',
  MOBILELLGMAX: '576px',

  PHABLETXS: '480px',
  PHABLETSM: '640px',
  PHABLETMD: '667px',
  PHABLETLG: '736px',
  PHABLETXSMAX: '639px',
  PHABLETSMMAX: '665px',
  PHABLETMDMAX: '735px',
  PHABLETLGMAX: '767px',

  TABLETXS: '768px',
  TABLETSM: '800px',
  TABLETMD: '812px',
  TABLETMMD: '992px',
  TABLETLG: '1024px',
  TABLETXSMAX: '799px',
  TABLETSMMAX: '811px',
  TABLETSSMMAX: '991px',
  TABLETMDMAX: '1023px',
  TABLETLGMAX: '1279px',

  DESKTOPXS: '1280px',
  DESKTOPSM: '1366px',
  DESKTOPMD: '1440px',
  DESKTOPLG: '1600px',
  DESKTOPXL: '1920px',
  DESKTOPXXL: '2560px',
  DESKTOPXSMAX: '1365px',
  DESKTOPSMMAX: '1439px',
  DESKTOPMDMAX: '1599px',
  DESKTOPLGMAX: '1919px',
  DESKTOPXLMAX: '2559px',
}

const screens = {
  mobileXs: '320px',
  mobileSm: '360px',
  mobileMd: '375px',
  mobileLg: '414px',
  mobileXsMax: '359px',
  mobileSmMax: '374px',
  mobileMdMax: '413px',
  mobileLgMax: '479px',

  phabletXs: '480px',
  phabletSm: '640px',
  phabletMd: '667px',
  phabletLg: '736px',
  phabletXsMax: '639px',
  phabletSmMax: '665px',
  phabletMdMax: '735px',
  phabletLgMax: '767px',

  tabletXs: '768px',
  tabletSm: '800px',
  tabletMd: '812px',
  tabletLg: '1024px',
  tabletXsMax: '799px',
  tabletSmMax: '811px',
  tabletMdMax: '1023px',
  tabletLgMax: '1279px',

  desktopXs: '1280px',
  desktopSm: '1366px',
  desktopMd: '1440px',
  desktopLg: '1600px',
  desktopXl: '1920px',
  desktopXxl: '2560px',
  desktopXsMax: '1365px',
  desktopSmMax: '1439px',
  desktopMdMax: '1599px',
  desktopLgMax: '1919px',
  desktopXlMax: '2559px',
}

// Animation timings
// ============================================================
const animationTimings = {
  elastic: 'cubic-bezier(.835, -.005, .06, 1)',
}

// Border radiuses
// ============================================================
const borderRadiuses = {
  xs: '3px',
  sm: '5px',
}

const BORDERRADIUSES = {
  XS: '3px',
  SM: '5px',
  XL: '8px',
  XXL: '10px'
}


// Box shadows
// ============================================================
const boxShadows = {
  shadow1: '0 5px 5px rgba(0, 0, 0, .5)',
}

// Component widths
// ============================================================
const componentWidths = {
  field: '250px',
  button: '150px',
}

// Component height
// ============================================================
const componentHeights = {
  field: '36px',
  button: '36px',
}

export {
    colors,
    fontFamilies,
    fontSizes,
    lineHeights,
    letterSpacings,
    zindexs,
    screens,
    animationTimings,
    borderRadiuses,
    boxShadows,
    componentWidths,
    componentHeights,

    COLORS,
    FONTFAMILIES,
    FONTSIZES,
    BORDERRADIUSES,
    SCREENS
}
