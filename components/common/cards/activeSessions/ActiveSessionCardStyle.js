import { StyleSheet } from "react-native";

import { COLORS, FONT, SHADOWS, SIZES } from "../../../../constants";

const styles = StyleSheet.create({
  container: (sessionState) => ({
    width: 250,
    padding: SIZES.xLarge,
    backgroundColor: sessionState === "in_progress" ? COLORS.primary : "#FFF",
    borderRadius: SIZES.medium,
    justifyContent: "space-between",
    ...SHADOWS.medium,
    shadowColor: COLORS.white,
  }),
  infoContainer: {
    marginTop: SIZES.large,
  },
  infoWrapper: {
    flexDirection: "row",
    marginTop: 5,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  profilePictureContainer:{
    width: 50,
    height: 50,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.large * 2,
    justifyContent: "center",
    alignItems: "center",
  },
  profilePicture: {
    width: "100%",
    height: "100%",
    borderRadius: SIZES.large * 2,
  },
  horizontalContainer: {
    flexDirection: 'row',
  },
  verticalContainer: {
    flexDirection: 'column',
    marginLeft: 10,
  },
  textPatientName: (sessionState) => ({
    fontSize: SIZES.medium,
    fontFamily: FONT.regular,
    color: sessionState === "in_progress" ?  COLORS.white : COLORS.gray1,
    marginTop: SIZES.small / 2,
  }),
  textServiceType: (sessionState) => ({
    fontSize: SIZES.medium / 1.2,
    fontFamily: FONT.regular,
    color: sessionState === "in_progress" ? COLORS.gray3 : COLORS.gray2,
  }),
  textSessionTimes: (sessionState) => ({
    fontSize: SIZES.large,
    fontFamily: FONT.medium,
    color: sessionState === "in_progress" ?  COLORS.white : COLORS.primary,
  }),
  textPatientAddress: (sessionState) => ({
    fontSize: SIZES.medium - 2,
    fontFamily: FONT.regular,
    color: sessionState === "in_progress" ?  COLORS.white : COLORS.gray1,
  }),
});

export default styles;
