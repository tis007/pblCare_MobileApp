import { StyleSheet } from "react-native";

import { COLORS, SIZES } from "../../constants";

const styles = StyleSheet.create({
    container:{
        alignItems: "center",
        width: 300,
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
    textSignIn: {
        fontSize: SIZES.large,
        color: COLORS.secondary,
        marginTop: SIZES.medium,
        marginBottom: SIZES.large,
    },
    buttonSignIn:{
        backgroundColor: COLORS.primary,
        padding: 10,
        width: "100%",
        alignItems: "center",
    },
    buttonSignInText:{
        color: COLORS.white,
    },
    input:{
        height: 40,
        width: '100%',
        borderColor: COLORS.gray2,
        borderWidth: 1,
        marginBottom: 15,
        padding: 10,
        borderRadius: 5,
    }
});

export default styles;
