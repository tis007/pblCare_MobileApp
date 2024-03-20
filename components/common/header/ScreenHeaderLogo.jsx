import { Image, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';

import styles from "./screenheader.style";

const ScreenHeaderLogo = ({ iconUrl, dimension, handlePress }) => {
    const navigation = useNavigation();
    
    handlePress = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: 'index' }],
        });
    }

    return (
        <TouchableOpacity style={styles.logoContainer} onPress={handlePress}>
        <Image
            source={iconUrl}
            resizeMode='contain'
            style={styles.logoImg}
        />
        </TouchableOpacity>
    );
};

export default ScreenHeaderLogo;
