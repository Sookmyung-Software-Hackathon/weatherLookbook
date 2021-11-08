import React from 'react'
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity, Alert } from 'react-native'
import BlueMenu from '../images/blueHamburger.png'
import WhiteMenu from '../images/whiteHamburger.png'
import { signOut } from '../_modules/user'
import { useDispatch } from 'react-redux';

function Header(props) {

    let { color } = props;
    const dispatch = useDispatch();
    const handleLogout = () => {
        Alert.alert(
          "Log out",
          "로그아웃 하시겠습니까?",
          [
            {
              text: "취소",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel"
            },
            {
              text: "로그아웃",
              onPress: () => dispatch(signOut())
            }
          ]
        )
    }

    return (
        <View style={styles.background}>
            <TouchableOpacity onPress={handleLogout}>
                <Image source={color ? BlueMenu : WhiteMenu} style={styles.menu} />
            </TouchableOpacity>
            <View style={styles.profile} />
        </View>
    )
}

const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
    background: {
        width: width,
        height: width * 0.23,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        paddingRight: width * 0.03,
        paddingLeft: width * 0.03,
    },
    menu: {
        width: width * 0.1,
        height: width * 0.1
    },
    profile: {
        width: width * 0.1,
        height: width * 0.1,
        borderTopLeftRadius: width * 0.05,
        borderTopRightRadius: width * 0.05,
        borderBottomLeftRadius: width * 0.05,
        borderBottomRightRadius: width * 0.05,
        backgroundColor: 'black'
    }
})

export default Header
