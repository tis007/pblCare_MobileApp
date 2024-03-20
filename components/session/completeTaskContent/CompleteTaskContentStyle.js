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
    textKey:{
        fontSize: SIZES.medium,
        color: COLORS.gray2,
    },
    textStateDefault:{
        paddingBottom: SIZES.large,
        fontSize: SIZES.medium,
        color: COLORS.gray,
    },
    textStateIncomplete:{
        paddingBottom: SIZES.large,
        fontSize: SIZES.medium,
        color: COLORS.gray,
    },
    textStateCompleted:{
        paddingBottom: SIZES.large,
        fontSize: SIZES.medium,
        color: COLORS.primary,
    },
    textStateUnable:{
        paddingBottom: SIZES.large,
        fontSize: SIZES.medium,
        color: COLORS.red,
    },
    textDescription:{
        paddingBottom: SIZES.large,
        fontSize: SIZES.large,
        fontWeight: 'medium',
        color: COLORS.primary,
    },
    textInstructions:{
        paddingBottom: SIZES.large,
        fontSize: SIZES.medium,
    },
    slider:{
        width: "100%",
    }
});

export default styles;
