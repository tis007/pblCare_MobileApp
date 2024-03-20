import React from "react";
import { View, Text, Image } from "react-native";

import styles from "./PatientPanelStyle";
import { icons, images } from "../../../constants";
import { checkImageURL } from "../../../utils";

import Encryption from "../../../modules/Encryption";

const PatientPanel = ({ item }) => {
    //Decrypt data
    const patientName = Encryption.decrypt(item.patient_full_name);
    const patient_profile_picture = Encryption.decrypt(item.patient_profile_picture);
    const patientAddressLine1 = Encryption.decrypt(item.patient_address_line_1);
    const patientAddressPostcode = Encryption.decrypt(item.patient_address_postcode);

  return (
    <View style={styles.container}>
      <View style={styles.horizontalContainer}>
        <View style={styles.profilePictureContainer}>
          <Image
            source={{
            uri: `data:image/jpeg;base64,${patient_profile_picture}`
          }}
            style={styles.profilePicture}
          />
        </View>
        <View style={styles.verticalContainer}>
          <Text style={styles.textSessionTimes}>{item.session_start} - {item.session_end}</Text>
          <Text style={styles.textPatientName}>{patientName}</Text>
          <Text style={styles.textPatientAddress}>{patientAddressLine1} | {patientAddressPostcode}</Text>
        </View>
      </View>
    </View>
  );
};

export default PatientPanel;
