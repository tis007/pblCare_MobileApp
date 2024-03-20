import { View, Text, TouchableOpacity, Image } from "react-native";
import { icons } from "../../../../constants";

import styles from "./MedicalConditionsCardStyle";
import Encryption from "../../../../modules/Encryption";

const MedicalConditionsCard = ({ item, handleNavigate }) => {
  const healthConfitionName = Encryption.decrypt(item.health_conditions_condition_name);
  const healthConfitionDiagnosedDate = Encryption.decrypt(item.health_conditions_condition_diagnosed_date);

  return (
    <TouchableOpacity style={styles.container} onPress={handleNavigate}>
      <TouchableOpacity style={
        item.task_state === "true"
          ? styles.taskIconContainerCompleted
          : styles.taskIconContainer
      }>
        <Image
          source={item.task_state === "true" ? icons.tasks : icons.tasks_gray}
          resizeMode='contain'
          style={styles.taskIcon}
        />
      </TouchableOpacity>

      <View style={styles.textContainer}>
        <Text style={styles.textTaskDescription} numberOfLines={1}>
          {healthConfitionName}
          {item.health_conditions_condition_status === "active" ? (
            <View style={styles.containerStateActive}>
              <Text style={styles.textStateActive}>Active</Text>
            </View>
          ) : (
            <View style={styles.containerStateRecovered}>
              <Text style={styles.textStateRecovered}>Recovered</Text>
            </View>
          )}
        </Text>

        <Text style={styles.textTaskInstructions}>
          Diagnosed: {healthConfitionDiagnosedDate ? healthConfitionDiagnosedDate : "not specified"}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default MedicalConditionsCard;
