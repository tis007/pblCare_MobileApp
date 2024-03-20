import React from "react";
import { View, Text, Image } from "react-native";

import styles from "./AccountPanelStyle";
import { icons, images } from "../../../constants";
import { checkImageURL } from "../../../utils";

import { useNavigation } from '@react-navigation/native';

import Encryption from "../../../modules/Encryption";
import { TouchableOpacity } from "react-native-gesture-handler";

const AccountPanel = ({ item }) => {
    const navigation = useNavigation();

    //Decrypt data
    const staffName = Encryption.decrypt(item.staff_full_name);
    const staff_profile_picture = Encryption.decrypt(item.staff_profile_picture);
    const staffAddressLine1 = Encryption.decrypt(item.staff_address_line_1);
    const staffAddressLine2 = Encryption.decrypt(item.staff_address_line_2);
    const staffAddressLine3 = Encryption.decrypt(item.staff_address_line_3);
    const staffAddressCity = Encryption.decrypt(item.staff_address_city);
    const staffAddressCounty = Encryption.decrypt(item.staff_address_county);
    const staffAddressPostcode = Encryption.decrypt(item.staff_address_postcode);
    const staffEmail = Encryption.decrypt(item.staff_email);
    const staffHomePhoneNumber = Encryption.decrypt(item.staff_landline_phone_number);
    const staffMobilePhoneNumber = Encryption.decrypt(item.staff_mobile_phone_number);
    const staffDateOfBirth = Encryption.decrypt(item.staff_date_of_birth);
    const staffStartDate = Encryption.decrypt(item.staff_start_date);

    return (
        <View style={styles.container}>
            <View style={styles.profilePictureMainContainer}>
                <TouchableOpacity style={styles.profilePictureContainer} onPress={()=> navigation.navigate('account/changeProfilePicture')}>
                    <Image
                        source={{ uri: `data:image/jpeg;base64,${staff_profile_picture}` }}
                        style={styles.profilePicture}
                    />
                </TouchableOpacity>
                <Text style={styles.textStaffName}>{staffName}</Text>
            </View>
            <View style={styles.verticalContainer}>
                <TouchableOpacity style={styles.horizontalContainer}>
                    <Text style={styles.textKey}>Full name</Text>
                    <Text style={styles.textValue}>{staffName}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.horizontalContainer}>
                    <Text style={styles.textKey}>Address</Text>
                    <View style={styles.verticalContainer}>
                        {staffAddressLine1 && (
                            <Text style={styles.textValue}>{staffAddressLine1}</Text>
                        )}
                        {staffAddressLine2 && (
                            <Text style={styles.textValue}>{staffAddressLine2}</Text>
                        )}
                        {staffAddressLine3 && (
                            <Text style={styles.textValue}>{staffAddressLine3}</Text>
                        )}
                        {staffAddressCity && (
                            <Text style={styles.textValue}>{staffAddressCity}</Text>
                        )}
                        {staffAddressCounty && (
                            <Text style={styles.textValue}>{staffAddressCounty}</Text>
                        )}
                        {staffAddressPostcode && (
                            <Text style={styles.textValue}>{staffAddressPostcode}</Text>
                        )}
                    </View>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.horizontalContainer}>
                <Text style={styles.textKey}>Email</Text>
                <Text style={styles.textValue}>{staffEmail}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.horizontalContainer}>
                <Text style={styles.textKey}>Password</Text>
                <Text style={styles.textValue}>********</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.horizontalContainer}>
                <Text style={styles.textKey}>Home phone</Text>
                <Text style={styles.textValue}>{staffHomePhoneNumber}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.horizontalContainer}>
                <Text style={styles.textKey}>Mobile phone</Text>
                <Text style={styles.textValue}>{staffMobilePhoneNumber}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.horizontalContainer}>
                <Text style={styles.textKey}>Date of birth</Text>
                <Text style={styles.textValue}>{staffDateOfBirth}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.horizontalContainer}>
                <Text style={styles.textKey}>Start date</Text>
                <Text style={styles.textValue}>{staffStartDate}</Text>
            </TouchableOpacity>
        </View>
    );
};

export default AccountPanel;
