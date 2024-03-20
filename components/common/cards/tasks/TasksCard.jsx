import { View, Text, TouchableOpacity, Image } from "react-native";
import { icons } from "../../../../constants";

import styles from "./TaskCardStyle";
import Encryption from "../../../../modules/Encryption";

const TaskCard = ({ item, handleNavigate }) => {
  const taskDescription = Encryption.decrypt(item.task_description);
  const taskInstructions = Encryption.decrypt(item.task_instructions);

  return (
    <TouchableOpacity style={styles.container} onPress={handleNavigate}>
      <TouchableOpacity style={
        item.task_state === "true"
          ? styles.taskIconContainerCompleted
          : item.task_state === "false"
            ? styles.taskIconContainer
            : styles.taskIconContainerUnable
      }>
        <Image
          source={
            item.task_state === "false"
              ? icons.tasks_gray
              : icons.tasks
          }
          resizeMode='contain'
          style={styles.taskIcon}
        />
      </TouchableOpacity>


      <View style={styles.textContainer}>
        <Text style={styles.textTaskDescription}>
          {taskDescription} {item.task_state === "true" ? (
            <View style={styles.containerStateCompleted}>
              <Text style={styles.textStateCompleted}>Completed</Text>
            </View>
          ) : item.task_state === "unable" ? (
            <View style={styles.containerStateUnable}>
              <Text style={styles.textStateUnable}>Unable to complete</Text>
            </View>
          ) : (
            <View style={styles.containerStateIncomplete}>
            <Text style={styles.textStateIncomplete}>Incomplete</Text>
            </View>
          )}
        </Text>

        <Text style={styles.textTaskInstructions}>{taskInstructions}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default TaskCard;
