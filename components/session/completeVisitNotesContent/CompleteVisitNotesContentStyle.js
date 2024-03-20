import { StyleSheet } from "react-native";

import { COLORS, FONT, SIZES } from "../../../constants";

const styles = StyleSheet.create({
    container: {
        marginVertical: SIZES.medium,
    },
    textArea: {
        height: 200,
        borderWidth: 1,
        borderColor: "gray",
        borderRadius: 8,
        padding: 10,
        marginBottom: 20,
        textAlignVertical: "top",
    },
    buttonComplete: {
        height: 55,
        flex: 1,
        backgroundColor: COLORS.primary,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: SIZES.medium,
    },
    textComplete: {
        fontSize: SIZES.medium,
        color: COLORS.white,
        fontFamily: FONT.bold,
    },
    buttonContainer: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        padding: SIZES.small,
        backgroundColor: "#FFF",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
    },
    textInstructions:{
        paddingBottom: SIZES.large * 2,
        fontSize: SIZES.medium,
    }
});

export default styles;
