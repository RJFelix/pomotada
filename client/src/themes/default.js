import {
  indigo400, indigo700, grey300, grey400, redA200,
  darkBlack, white, fullBlack
} from "material-ui/styles/colors";

import { fade } from "material-ui/utils/colorManipulator";

import spacing from "material-ui/styles/spacing";

export default {
  spacing: spacing,
  fontFamily: "Roboto, sans-serif",
  palette: {
    primary1Color: indigo400,
    primary2Color: indigo700,
    primary3Color: grey400,
    accent1Color: redA200,
    textColor: darkBlack,
    alternateTextColor: white,
    canvasColor: white,
    borderColor: grey300,
    disabledColor: fade(darkBlack, 0.3),
    pickerHeaderColor: indigo400,
    clockCircleColor: fade(darkBlack, 0.07),
    shadowColor: fullBlack
  }
}