import { View, Image, TouchableOpacity, Text } from "react-native";
import { useNavigation } from '@react-navigation/native';
import styles from "./deviceStyle";
import { COLORS, icons, images, SIZES } from "../../constants";

const DeviceBannedContent = () => {
  const navigation = useNavigation();

  const handleTryAgain = () => {
    // Navigate to index
    navigation.navigate('index');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.logoImageContainer}>
        <Image
          source={images.logo}
          style={styles.logoImage}
          resizeMode="contain"
        />
      </TouchableOpacity>

      <Text style={styles.textBanned}>Your device has been banned</Text>

      <Text style={styles.text}>If you believe this was a mistake, please contact us!</Text>

      <TouchableOpacity style={styles.buttonRefresh} onPress={handleTryAgain}>
        <Text style={styles.buttonRefreshText}>Try again</Text>
      </TouchableOpacity>
    </View>
  );
};

export default DeviceBannedContent;
