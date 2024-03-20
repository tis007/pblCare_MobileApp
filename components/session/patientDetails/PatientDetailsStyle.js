import { StyleSheet } from "react-native";

import { COLORS, FONT, SIZES } from "../../../constants";

const styles = StyleSheet.create({
    container: {
        marginTop: SIZES.large,
        backgroundColor: "#FFF",
        borderRadius: SIZES.medium,
        padding: SIZES.medium,
      },
      horizontalContainer: {
        flexDirection: 'row',
        marginVertical: SIZES.small / 1.5,
      },
      verticalContainer: {
        flexDirection: 'column',
      },
      textKey: {
        minWidth: 140,
        color: COLORS.gray2,
      },
      textValue: {
        maxWidth: 200,
        color: COLORS.gray1
      },
      textValuePrimary: {
        maxWidth: 200,
        color: COLORS.primary,
      },
      textHead: {
        fontSize: SIZES.large,
        color: COLORS.primary,
        fontFamily: FONT.bold,
        marginTop: 15,
      },
      warningContainer:{
        padding: 10,
        backgroundColor: COLORS.orange2,
        marginTop: 5,
        marginBottom: 5,
      },
      textWarning:{

      }
});

export default styles;
