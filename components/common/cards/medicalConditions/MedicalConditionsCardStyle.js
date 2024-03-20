import { StyleSheet } from "react-native";

import { COLORS, SHADOWS, SIZES, FONT } from "../../../../constants";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    padding: SIZES.medium,
    borderRadius: SIZES.small,
    backgroundColor: "#FFF",
    ...SHADOWS.medium,
    shadowColor: COLORS.white,
  },
  textContainer: {
    flex: 1,
    marginHorizontal: SIZES.medium,
  },
  taskIconContainer:{
    width: 50,
    height: 50,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.large * 2,
    justifyContent: "center",
    alignItems: "center",
  },
  taskIconContainerCompleted:{
    width: 50,
    height: 50,
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.large * 2,
    justifyContent: "center",
    alignItems: "center",
  },
  taskIcon: {
    width: "60%",
    height: "60%",
    borderRadius: SIZES.large * 2,
  },
  textTaskDescription: {
    fontSize: SIZES.medium,
    fontFamily: FONT.medium,
    color: COLORS.primary,
  },
  textTaskInstructions: {
    fontSize: SIZES.small + 2,
    fontFamily: FONT.regular,
    color: COLORS.gray,
    marginTop: 3,
    textTransform: "capitalize",
  },
  containerStateRecovered:{
    backgroundColor: COLORS.gray3,
    color: COLORS.gray1,
    padding: 2,
    fontSize: SIZES.small - 2,
    borderRadius: SIZES.small / 2,
  },
  containerStateActive:{
    backgroundColor: COLORS.primary,
    color: COLORS.white,
    padding: 2,
    fontSize: SIZES.small - 2,
    borderRadius: SIZES.small / 2,
  },
  textStateRecovered:{
    color: COLORS.gray1,
    fontSize: SIZES.small - 2,
  },
  textStateActive:{
    color: COLORS.white,
    fontSize: SIZES.small - 2,
  }
});

export default styles;
