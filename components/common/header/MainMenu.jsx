// MainMenu.js
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "./screenheader.style";

const MainMenu = ({ handleMenuItemPress }) => {
  const menuItems = [
    { id: 1, label: 'Home' },
    { id: 2, label: 'My account' },
    { id: 3, label: 'Visits' },
    { id: 4, label: 'Settings' },
    { id: 5, label: 'Sign Out' },
  ];

  return (
    <View style={styles.menuContainer}>
      {menuItems.map((menuItem) => (
        <TouchableOpacity
          key={menuItem.id}
          onPress={() => handleMenuItemPress(menuItem)}
          style={styles.menuItem}
        >
          <Text style={styles.textMenuItem}>{menuItem.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default MainMenu;
