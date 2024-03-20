import { View, Text, TouchableOpacity, Image } from "react-native";
import { icons } from "../../../../constants";

import styles from "./HistoryCardStyle";
import { checkImageURL } from "../../../../utils";
import Encryption from "../../../../modules/Encryption";

const HistoryCard = ({ item, handleNavigate }) => {
  const careHistoryStaffFullName = Encryption.decrypt(item.care_history_staff_full_name);
  const careHistoryStaffProfilePicture = Encryption.decrypt(item.care_history_staff_profile_picture);
  const careHistoryServiceType = Encryption.decrypt(item.care_history_service_type);
  const careHistoryVisitType = Encryption.decrypt(item.care_history_visit_type);

  return (
    <TouchableOpacity style={styles.container} onPress={handleNavigate}>
      <TouchableOpacity style={styles.historyStaffProfilePictureContainer}>
      <Image
          source={{
            uri: `data:image/jpeg;base64,${careHistoryStaffProfilePicture}`
          }}
          resizeMode='contain'
          style={styles.historyStaffProfile}
        />
      </TouchableOpacity>

      <View style={styles.textContainer}>
        <Text style={styles.textHistoryDate} numberOfLines={1}>
          {item.care_history_session_date} | {item.care_history_session_start} - {item.care_history_session_end}
        </Text>

        <Text style={styles.textHistoryStaff} numberOfLines={1}>
          {careHistoryStaffFullName}
        </Text>

        <Text style={styles.textHistoryVisitType} numberOfLines={1}>
          {careHistoryServiceType} {careHistoryVisitType}
        </Text>

        <Text style={styles.textTaskInstructions}>{item?.task_instructions}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default HistoryCard;
