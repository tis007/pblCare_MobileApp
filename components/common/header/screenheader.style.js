import { StyleSheet } from "react-native";

import { COLORS, SIZES } from "../../../constants";

const styles = StyleSheet.create({
  btnContainer: {
    width: 40,
    height: 40,
    borderRadius: SIZES.small / 1.25,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.gray3,
    marginRight: 5,
  },
  btnImg: (dimension) => ({
    width: dimension,
    height: dimension,
    borderRadius: SIZES.small / 1.25,
  }),
  logoContainer:{
    height: 40,
  },
  logoImg: {
    width: 150,
    height: 40,
    marginLeft: 10,
  },
  menuContainer: {
    position: 'absolute',
    top: 0, 
    right: 10,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 10,
    elevation: 5,
    width: "100%",
    height: "100%",
  },
  menuItem: {
    paddingVertical: 15,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray3,
    color: COLORS.gray2,
  },
  textMenuItem: {
    color: COLORS.gray1,
  },
});

export default styles;
