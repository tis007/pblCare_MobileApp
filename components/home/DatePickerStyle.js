import { StyleSheet } from "react-native";

import { FONT, SIZES, COLORS } from "../../constants";

const styles = StyleSheet.create({
    container: {
        marginTop: SIZES.medium,
      },
      scrollContainer: {
        alignItems: 'center',
        paddingHorizontal: SIZES.medium,
      },
      dateItem: {
        paddingVertical: SIZES.small,
        paddingHorizontal: SIZES.medium,
        marginRight: SIZES.medium,
        backgroundColor: COLORS.gray3,
        borderRadius: SIZES.small,

      },
      selectedDateItem: {
        backgroundColor: COLORS.primary,
      },
      dateText: {
        color: COLORS.gray,
        fontSize: SIZES.body3,
        fontWeight: 'bold',
      },
      selectedDateText: {
        color: COLORS.white,
      },
    
});

export default styles;
