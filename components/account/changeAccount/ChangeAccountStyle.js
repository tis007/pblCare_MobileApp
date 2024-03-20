import { StyleSheet } from "react-native";

import { COLORS, FONT, SIZES } from "../../../constants";

const styles = StyleSheet.create({
  container: {
    marginVertical: SIZES.medium,
  },
  horizontalContainer: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: COLORS.gray3,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray3,
    paddingTop: SIZES.medium,
    paddingBottom: SIZES.medium,
  },
  verticalContainer: {
    flexDirection: 'column',
  },
  profilePictureMainContainer: {
    flexDirection: 'column',
    justifyContent: "center",
    alignItems: "center",
  },
  profilePictureContainer:{
    width: 80,
    height: 80,
    backgroundColor: COLORS.white,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: SIZES.large * 2,
  },
  profilePictureContainerFull:{
    width: 160,
    height: 200,
    backgroundColor: COLORS.white,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: SIZES.large * 2,
  },
  profilePicture: {
    width: "100%",
    height: "100%",
    borderRadius: SIZES.large * 2,
  },
  profilePictureFull: {
    width: "100%",
    height: "100%",
  },
  textStaffName: {
    fontSize: SIZES.large - 2,
    color: COLORS.gray1,
    marginTop: 10,
    marginBottom: 20,
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
  changePictureButton:{
    justifyContent: "center",
    alignItems: "center",
    marginTop: SIZES.large * 6,
    backgroundColor: COLORS.primary,
    padding: SIZES.medium
  },
  changePictureButtonText:{
    color: COLORS.white,
  },
  removePictureButton:{
    justifyContent: "center",
    alignItems: "center",
    marginTop: SIZES.large,
    backgroundColor: COLORS.red,
    padding: SIZES.medium
  },
  removePictureButtonText:{
    color: COLORS.white,
  },
});

export default styles;
