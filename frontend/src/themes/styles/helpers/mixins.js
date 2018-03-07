// //////////////////////////////////////////////////////////////////////////////////////////////////
// ==================================================================================================
//
// Mixins
// * Sample mixins
//   - Sample Mixins A
//   - Sample Mixins B
//   - Sample Mixins C
//
// ==================================================================================================
// //////////////////////////////////////////////////////////////////////////////////////////////////

// Sample mixins
// ==================================================================================================

// Sample Mixins A
// -------------------------------
function sampleMixinsA(boxShadow) {
  return `
    box-shadow: ${boxShadow};
  `
}

// Sample Mixins B
// -------------------------------
function sampleMixinsB(padding, bgColor) {
  return `
    padding: ${padding};
    background-color: ${bgColor};
  `
}

// Sample Mixins C
// -------------------------------
function sampleMixinsC(border) {
  return `
    border: ${border}
  `
}

export const inputAutoFill = ({color}) => {
  return `
    @-webkit-keyframes autofill {
      to {
        background: transparent;
        color: ${color};
      }
    }
  `
}

export const mediaBreakpointDown = (width) => {
  return `
    screen and (max-width: ${width})
  `
}

export {
  sampleMixinsA,
  sampleMixinsB,
  sampleMixinsC,
}
