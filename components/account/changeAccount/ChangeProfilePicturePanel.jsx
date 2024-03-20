import React from "react";
import { View, Text, Image } from "react-native";

import styles from "./ChangeAccountStyle";

import Encryption from "../../../modules/Encryption";
import { TouchableOpacity } from "react-native-gesture-handler";

const ChangeProfilePicturePanel = ({ item }) => {
    //Decrypt data
    const staff_profile_picture = Encryption.decrypt(item.staff_profile_picture);

    return (
        <View style={styles.container}>
            <View style={styles.profilePictureMainContainer}>
                <TouchableOpacity style={styles.profilePictureContainerFull}>
                    <Image
                        source={{ uri: `data:image/jpeg;base64,${staff_profile_picture}` }}
                        style={styles.profilePictureFull}
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.verticalContainer}>
                <TouchableOpacity style={styles.changePictureButton}>
                    <Text style={styles.changePictureButtonText}>Change picture</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.removePictureButton}>
                    <Text style={styles.removePictureButtonText}>Remove picture</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default ChangeProfilePicturePanel;
