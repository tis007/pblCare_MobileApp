import React from 'react';
import {Platform, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {useRouter} from 'expo-router';
import Encryption from "../../../modules/Encryption";
import { Image } from 'react-native';

const HeaderComponent = ({showBackButton, showProfileButton, profilePicture,}) => {
    const router = useRouter();
    console.log('Profile Picture URI:', profilePicture); // Debugging line

    const handleBackPress = () => {
        if (router.canGoBack()) {
            router.back();
        }
    };

    const handleProfilePress = () => {
        router.push('/account/account');
    };

    // Use a URI or a local image path for the profile picture
    const profilePictureUri = profilePicture ? `data:image/jpeg;base64,${Encryption.decrypt(profilePicture)}` : null;

    return (
        <View style={styles.container}>
            {/* Conditionally render the back button */}
            {showBackButton ? (
                <TouchableOpacity onPress={handleBackPress} style={styles.button}>
                    <Ionicons name="arrow-back" size={28} color="black"/>
                </TouchableOpacity>
            ) : (
                // Add a placeholder view to maintain layout if back button is not shown but profile button is
                showProfileButton && <View style={styles.placeholderButton}/>
            )}

            {/* Spacer to push profile button to the right */}
            {(showBackButton || showProfileButton) && <View style={styles.spacer}/>}


            {/* Conditionally render the profile button */}
            {showProfileButton ? (
                <TouchableOpacity onPress={handleProfilePress} style={styles.profileButtonContainer}>
                    {profilePictureUri ? (
                        <Image
                            source={{uri: profilePictureUri}}
                            style={styles.profileImage}
                            onError={(e) => console.log('Failed to load profile image:', e.nativeEvent.error)} // Basic error handling
                        />
                    ) : (
                        <View style={styles.profileIconFallback}>
                            <Ionicons name="person" size={24} color="black"/>
                        </View>
                    )}
                </TouchableOpacity>
            ) : (
                // Add a placeholder view to maintain layout if profile button is not shown but back button is
                showBackButton && <View style={styles.placeholderButton}/>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        // justifyContent is removed from here to allow more control with placeholders
        paddingHorizontal: 15,
        paddingTop: Platform.OS === 'android' ? 25 : 10, // Adjust top padding for Android status bar
        paddingBottom: 10,
        backgroundColor: '#f4f4f4', // A light grey background, adjust as needed
        height: Platform.OS === 'ios' ? 70 : 80, // Adjust height as needed
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0', // Light border for separation
    },
    button: {
        padding: 5,
        minWidth: 40, // Ensure it takes up some space for alignment
        alignItems: 'flex-start',
    },
    profileButton: {
        padding: 8,
        backgroundColor: '#e0e0e0', // Light grey circle background
        borderRadius: 20, // Half of width/height to make it a circle
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    placeholderButton: {
        // This view takes up the same space as a button if it's not rendered,
        // helping to keep the remaining button (if any) or title centered if needed.
        // If you add a title, you might need to adjust this.
        minWidth: 40, // Match the button's tappable area width
        padding: 5,
    },
    spacer: {
        flex: 1, // This will take up the available space between the buttons
    },
    profileButtonContainer: { // Renamed from profileButton for clarity
        width: 40,
        height: 40,
        borderRadius: 20, // Make it circular
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#e0e0e0', // Fallback background if image fails or for icon
        overflow: 'hidden', // Ensures the image is clipped to the borderRadius
    },
    profileImage: {
        width: '100%',
        height: '100%',
    },

    profileIconFallback: {
        // This view ensures the icon is centered if the image isn't provided
        // The parent TouchableOpacity already has background and borderRadius
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default HeaderComponent;
