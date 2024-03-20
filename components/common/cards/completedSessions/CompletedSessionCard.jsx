import { View, Text, TouchableOpacity, Image } from "react-native";

import styles from "./CompletedSessionCardStyle";
import { checkImageURL } from "../../../../utils";
import Encryption from "../../../../modules/Encryption";

const CompletedSessionCard = ({ item, handleNavigate }) => {

  //Decrypt data
  const patientName = Encryption.decrypt(item.patient_full_name);
  const patient_profile_picture = Encryption.decrypt(item.patient_profile_picture);
  const patientAddressLine1 = Encryption.decrypt(item.patient_address_line_1);
  const patientPostcode = Encryption.decrypt(item.patient_postcode);

  return (
    <TouchableOpacity style={styles.container} onPress={handleNavigate}>
      <TouchableOpacity style={styles.profilePictureContainer}>
        <Image
          source={{
            uri: `data:image/jpeg;base64,${patient_profile_picture}`
          }}
          resizeMode='contain'
          style={styles.profilePicture}
        />
      </TouchableOpacity>

      <View style={styles.textContainer}>
        <Text style={styles.textSessionTimes} numberOfLines={1}>
          {item?.session_start} - {item?.session_end}
        </Text>

        <Text style={styles.textPatientAddress}>{patientAddressLine1} - {patientPostcode}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default CompletedSessionCard;
