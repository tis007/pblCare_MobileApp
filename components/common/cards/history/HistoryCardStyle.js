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
  historyStaffProfilePictureContainer:{
    width: 50,
    height: 50,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.large * 2,
    justifyContent: "center",
    alignItems: "center",
  },
  historyStaffProfile: {
    width: "100%",
    height: "100%",
    borderRadius: SIZES.large * 2,
  },
  textHistoryDate: {
    fontSize: SIZES.medium,
    fontFamily: FONT.bold,
    color: COLORS.primary,
  },
  textHistoryStaff: {
    fontSize: SIZES.medium,
    fontFamily: FONT.medium,
    color: COLORS.gray1,
  },
  textHistoryVisitType: {
    fontSize: SIZES.medium - 1,
    fontFamily: FONT.medium,
    color: COLORS.gray2,
  },
});

export default styles;
