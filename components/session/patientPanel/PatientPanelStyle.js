import { StyleSheet } from "react-native";

import { COLORS, FONT, SIZES } from "../../../constants";

const styles = StyleSheet.create({
  container: {
    marginVertical: SIZES.medium,
  },
  horizontalContainer: {
    flexDirection: 'row',
  },
  verticalContainer: {
    flexDirection: 'column',
    marginLeft: 15,
  },
  profilePictureContainer:{
    width: 80,
    height: 100,
    backgroundColor: COLORS.white,
    justifyContent: "center",
    alignItems: "center",
  },
  profilePicture: {
    width: "100%",
    height: "100%"
  },
  textSessionTimes: {
    fontSize: SIZES.large,
    color: COLORS.primary,
    fontFamily: FONT.bold,
    marginBottom: 10,
  },
  textPatientName: {
    fontSize: SIZES.large - 2,
    color: COLORS.gray1,
  },
  textPatientAddress: {
    fontSize: SIZES.medium - 2,
    color: COLORS.gray,
    fontFamily: FONT.regular
  },
});

export default styles;
