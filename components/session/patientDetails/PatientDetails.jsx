import { View, Text } from "react-native";

import styles from "./PatientDetailsStyle";
import Encryption from "../../../modules/Encryption";
import MedicalConditions from "../medicalConditions/MedicalConditions";

const PatientDetails = ({ item }) => {
    const patientFullName = Encryption.decrypt(item.patient_full_name);
    const patientAge = Encryption.decrypt(item.patient_age);
    const patientGender = Encryption.decrypt(item.patient_gender);

  return (
    <View>
        <View style={styles.container}>
            <View style={styles.horizontalContainer}>
                <Text style={styles.textKey}>Full name:</Text>
                <Text style={styles.textValue}>{patientFullName}</Text>
            </View>
            <View style={styles.horizontalContainer}>
                <Text style={styles.textKey}>Age:</Text>
                <Text style={styles.textValue}>{patientAge}</Text>
            </View>
            <View style={styles.horizontalContainer}>
                <Text style={styles.textKey}>Gender:</Text>
                <Text style={styles.textValue}>{patientGender}</Text>
            </View>
        </View>
        <Text style={styles.textHead}>Medical condition</Text>
        <MedicalConditions
            item={item}
        />
        <Text style={styles.textHead}>Allergies</Text>
        <MedicalConditions
            item={item}
        />
        <Text style={styles.textHead}>Medicines</Text>
        <View style={styles.warningContainer}>
            <Text style={styles.textWarning}>Please administer only those medications explicitly specified in your tasks, as certain medications may be administered by other individuals or caregivers.</Text>
        </View>
        <MedicalConditions
            item={item}
        />
    </View>
    
  );
};

export default PatientDetails;
