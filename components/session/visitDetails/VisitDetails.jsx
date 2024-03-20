import { View, Text } from "react-native";

import styles from "./VisitDetailsStyle";
import Encryption from "../../../modules/Encryption";

const VisitDetails = ({ item }) => {
    const patientAddressLine1 = Encryption.decrypt(item.patient_address_line_1);
    const patientAddressLine2 = Encryption.decrypt(item.patient_address_line_2);
    const patientAddressLine3 = Encryption.decrypt(item.patient_address_line_3);
    const patientAddressCity = Encryption.decrypt(item.patient_address_city);
    const patientAddressCounty = Encryption.decrypt(item.patient_address_county);
    const patientAddressPostcode = Encryption.decrypt(item.patient_address_postcode);
    const patientAccessType = Encryption.decrypt(item.patient_access_type);
    const patientSecurityCode = Encryption.decrypt(item.patient_security_code);
    const patientKeySafeNumber = Encryption.decrypt(item.patient_key_safe_number);
    const patientAccessDetails = Encryption.decrypt(item.patient_access_details);

    return (
        <View>
            <View style={styles.container}>
                <View style={styles.horizontalContainer}>
                    <Text style={styles.textKey}>Check in:</Text>
                    <Text style={item.progress_check_in === "true" ? styles.textValuePrimary : styles.textValue}>
                        {item.progress_check_in === "true" ? "Completed at " + item.progress_check_in_date : "Incomplete"}
                    </Text>
                </View>
                <View style={styles.horizontalContainer}>
                    <Text style={styles.textKey}>Tasks:</Text>
                    <Text style={item.progress_tasks === "true" ? styles.textValuePrimary : styles.textValue}>
                        {item.progress_tasks === "true" ? "Completed at " + item.progress_tasks_date : "Incomplete"}
                    </Text>
                </View>
                <View style={styles.horizontalContainer}>
                    <Text style={styles.textKey}>Visit notes:</Text>
                    <Text style={item.progress_notes === "true" ? styles.textValuePrimary : styles.textValue}>
                        {item.progress_notes === "true" ? "Completed at " + item.progress_notes_date : "Incomplete"}
                    </Text>
                </View>
                <View style={styles.horizontalContainer}>
                    <Text style={styles.textKey}>Check out:</Text>
                    <Text style={item.progress_check_out === "true" ? styles.textValuePrimary : styles.textValue}>
                        {item.progress_check_out === "true" ? "Completed at " + item.progress_check_out_date : "Incomplete"}
                    </Text>
                </View>
            </View>
            <View style={styles.container}>
                <View style={styles.horizontalContainer}>
                    <Text style={styles.textKey}>Date:</Text>
                    <Text style={styles.textValue}>{item.session_date}</Text>
                </View>
                <View style={styles.horizontalContainer}>
                    <Text style={styles.textKey}>Visit starts:</Text>
                    <Text style={styles.textValuePrimary}>{item.session_start}</Text>
                </View>
                <View style={styles.horizontalContainer}>
                    <Text style={styles.textKey}>Visit ends:</Text>
                    <Text style={styles.textValuePrimary}>{item.session_end}</Text>
                </View>
                <View style={styles.horizontalContainer}>
                    <Text style={styles.textKey}>Visit type:</Text>
                    <Text style={styles.textValue}>{item.service_type} {item.visit_type}</Text>
                </View>
            </View>
            <View style={styles.container}>
                <View style={styles.horizontalContainer}>
                    <Text style={styles.textKey}>Address:</Text>
                    <View style={styles.verticalContainer}>
                        {patientAddressLine1 && (
                            <Text style={styles.textValue}>{patientAddressLine1}</Text>
                        )}
                        {patientAddressLine2 && (
                            <Text style={styles.textValue}>{patientAddressLine2}</Text>
                        )}
                        {patientAddressLine3 && (
                            <Text style={styles.textValue}>{patientAddressLine3}</Text>
                        )}
                        {patientAddressCity && (
                            <Text style={styles.textValue}>{patientAddressCity}</Text>
                        )}
                        {patientAddressCounty && (
                            <Text style={styles.textValue}>{patientAddressCounty}</Text>
                        )}
                        {patientAddressPostcode && (
                            <Text style={styles.textValue}>{patientAddressPostcode}</Text>
                        )}
                    </View>
                </View>
                <View style={styles.horizontalContainer}>
                    <Text style={styles.textKey}>Access:</Text>
                    <Text style={styles.textValue}>{patientAccessType}</Text>
                </View>
                {patientAccessType === "Enter using key safe" && (
                    <View style={styles.horizontalContainer}>
                        <Text style={styles.textKey}>Key safe number:</Text>
                        <Text style={styles.textValuePrimary}>{patientKeySafeNumber}</Text>
                    </View>
                )}
                {patientAccessType === "Enter using code lock" && (
                    <View style={styles.horizontalContainer}>
                        <Text style={styles.textKey}>Security code:</Text>
                        <Text style={styles.textValuePrimary}>{patientSecurityCode}</Text>
                    </View>
                )}
                <View style={styles.horizontalContainer}>
                    <Text style={styles.textKey}>Access details:</Text>
                    <Text style={styles.textValue}>
                        {patientAccessDetails ? patientAccessDetails : 'Not specified'}
                    </Text>
                </View>
            </View>
        </View>
    );
};

export default VisitDetails;
