import { View, Text, TouchableOpacity, Image } from "react-native";

import styles from "./ActiveSessionCardStyle";
import { checkImageURL } from "../../../../utils";
import { images } from '../../../../constants';

import Encryption from "../../../../modules/Encryption";

const ActiveSessionCard = ({ item, handleCardPress }) => {

  //Decrypt data
  const patientName = Encryption.decrypt(item.patient_full_name);
  const patient_profile_picture = Encryption.decrypt(item.patient_profile_picture);
  const patientAddressLine1 = Encryption.decrypt(item.patient_address_line_1);
  const patientPostcode = Encryption.decrypt(item.patient_postcode);

  return (
    <TouchableOpacity
      style={styles.container(item.session_state)}
      onPress={() => handleCardPress(item)}
    >

    <View style={styles.horizontalContainer}>
      <TouchableOpacity style={styles.profilePictureContainer}>
        <Image
          source={{
            uri: `data:image/jpeg;base64,${patient_profile_picture}`
          }}
          resizeMode='contain'
          style={styles.profilePicture}
        />
      </TouchableOpacity>
      <View style={styles.verticalContainer}>
        <Text style={styles.textPatientName(item.session_state)} numberOfLines={1}>
          {patientName}
        </Text>
        <Text style={styles.textServiceType(item.session_state)} numberOfLines={1}>
          {item.service_type}
        </Text>
      </View>
    </View>
      
      <View style={styles.infoContainer}>
        <Text style={styles.textSessionTimes(item.session_state)} numberOfLines={1}>
          {item.session_start} - {item.session_end}
        </Text>
        <View style={styles.infoWrapper}>
          <Text style={styles.textPatientAddress(item.session_state)}>
            {patientAddressLine1} - {patientPostcode}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ActiveSessionCard;
