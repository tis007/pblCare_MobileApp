import { StyleSheet } from "react-native";

import { COLORS, SIZES } from "../../constants";

const styles = StyleSheet.create({
    container:{
        alignItems: "center",
    },
    logoImageContainer: {
        width: 200,
        borderRadius: SIZES.small / 1.25,
        justifyContent: "center",
        alignItems: "center",
    },
    logoImage: {
        width: "90%",
    },
    textBanned: {
        fontSize: SIZES.large,
        color: COLORS.red,
        marginTop: SIZES.medium,
    },
    text:{
        marginTop: SIZES.large * 2,
        alignItems: "center",
    },
    buttonRefresh:{
        marginTop: SIZES.large * 6,
        backgroundColor: COLORS.primary,
        padding: 10,
        width: "100%",
        alignItems: "center",
    },
    buttonRefreshText:{
        color: COLORS.white,
    },
    textActivate: {
        fontSize: SIZES.large,
        color: COLORS.primary,
        marginTop: SIZES.medium,
    },
    activationCodeContainer: {
        backgroundColor: COLORS.gray2,
        marginTop: SIZES.medium,
        width: "60%",
        alignItems: "center",
        padding: SIZES.small,
    },
    activationCodeText: {
        fontSize: SIZES.large,
        color: COLORS.black,
    },
});

export default styles;
