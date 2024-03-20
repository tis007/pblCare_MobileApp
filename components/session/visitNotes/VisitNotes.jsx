import { View, Text } from "react-native";

import styles from "./VisitNotesStyle";
import Encryption from "../../../modules/Encryption";

const VisitNotes = ({ item }) => {
    const sessionNotes = Encryption.decrypt(item.session_notes);

    return (
        <View>
            <View style={styles.container}>
                <View style={styles.horizontalContainer}>
                    <Text style={styles.textValue}>
                        {sessionNotes === "" ? "No visit notes have been added" : sessionNotes}
                    </Text>
                </View>
            </View>
            
        </View>
    );
};

export default VisitNotes;
