import React, { useEffect } from 'react'
import { View, Text, ScrollView, SafeAreaView, StyleSheet, Dimensions, TouchableOpacityBase, TouchableOpacity, Image } from 'react-native'
import Header from './Header';
import BlueMenu from '../images/whiteHamburger.png'
import Heart from 'react-native-vector-icons/Ionicons'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';
import first from '../images/1.jpg';
import second from '../images/2.jpg'
import third from '../images/3.jpg'
import fourth from '../images/4.jpg'
import fifth from '../images/5.jpg'

function SocialPage({ navigation }) {

    const getContents = async () => {
        const token = await AsyncStorage.getItem('token');
        axios.get('http://192.168.232.235:8000/boardapp/board/', {} ,
            {
                headers: {'Authorization': 'Token ' + token},
        }).then(res => {
            console.log(res.data)
        }).catch(e => {
            console.log(e)
        })
    }

    const getTemperature = async () => {
        const token = await AsyncStorage.getItem('token');
        console.log(token)
        axios.get('http://192.168.232.235:8000/boardapp/board/7/', {} ,
            {
                headers: {'Authorization': 'Token 2a76d3e4cf2333c92a61f44af097588bf5a6954b'},
            
        }).then(res => {
            console.log(res)
        }).catch(e => {
            console.log(e)
        })
    }

    const getCard = () => {
        let cards = [
                <View key={1} style={styles.cardContainer}>
                    <Image style={styles.cardImage} source={first} alt="image" />
                    <View style={styles.textIconWrapper}>
                        <View style={styles.iconWrapper}>
                            <Heart name="heart" size={38} color="#ffb687" />
                            <Text style={styles.likeText}>10</Text>
                            <Text style={styles.likeText}>LIKES</Text>
                        </View>
                        <Text style={styles.cardText}>추위타서 두꺼운 가디건 강추</Text>
                    </View>
                </View>,
                <View key={1} style={styles.cardContainer}>
                <Image style={styles.cardImage} source={second} alt="image" />
                <View style={styles.textIconWrapper}>
                    <View style={styles.iconWrapper}>
                        <Heart name="heart" size={38} color="#ffb687" />
                        <Text style={styles.likeText}>8</Text>
                        <Text style={styles.likeText}>LIKES</Text>
                    </View>
                    <Text style={styles.cardText}>도톰한 원피스 행복한 하루^^</Text>
                </View>
            </View>,
            <View key={1} style={styles.cardContainer}>
            <Image style={styles.cardImage} source={third} alt="image" />
            <View style={styles.textIconWrapper}>
                <View style={styles.iconWrapper}>
                    <Heart name="heart" size={38} color="#ffb687" />
                    <Text style={styles.likeText}>13</Text>
                    <Text style={styles.likeText}>LIKES</Text>
                </View>
                <Text style={styles.cardText}>과잠 입고 거울샷 찰칵</Text>
            </View>
        </View>,
            <View key={1} style={styles.cardContainer}>
            <Image style={styles.cardImage} source={fourth} alt="image" />
            <View style={styles.textIconWrapper}>
                <View style={styles.iconWrapper}>
                    <Heart name="heart" size={38} color="#ffb687" />
                    <Text style={styles.likeText}>10</Text>
                    <Text style={styles.likeText}>LIKES</Text>
                </View>
                <Text style={styles.cardText}>보들보들 맨투맨 아주 좋아요</Text>
            </View>
        </View>,
        <View key={1} style={styles.cardContainer}>
        <Image style={styles.cardImage} source={fifth} alt="image" />
        <View style={styles.textIconWrapper}>
            <View style={styles.iconWrapper}>
                <Heart name="heart" size={38} color="#ffb687" />
                <Text style={styles.likeText}>16</Text>
                <Text style={styles.likeText}>LIKES</Text>
            </View>
            <Text style={styles.cardText}>가을엔 역시 트렌치코트</Text>
        </View>
    </View>,
        ]
        return cards;
    }

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getTemperature()
        })

        return unsubscribe;
        
    }, [navigation])

    return (
        <SafeAreaView style={styles.background}>
            <Header color={true} />
            <View style={styles.titleBox}>
                <Text style={styles.titleText}>What are people{`\n`}wearing today?</Text>
            </View>
            <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center' }}>
                {getCard()}
                {/* <View style={styles.cardContainer}>
                    <Image style={styles.cardImage} source={BlueMenu} alt="image" />
                    <View style={styles.textIconWrapper}>
                        <View style={styles.iconWrapper}>
                            <Heart name="heart" size={38} color="#ffb687" />
                            <Text style={styles.likeText}>10</Text>
                            <Text style={styles.likeText}>LIKES</Text>
                        </View>
                        <Text style={styles.cardText}>아무글이나 막 쓴다 그냥 아무 글</Text>
                    </View>
                </View> */}
            </ScrollView>
        </SafeAreaView>
    )
}

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const styles = StyleSheet.create({
    background: {
        backgroundColor: '#ffe6d3',
        width: width,
        height: height
    },
    titleBox: {
        display: 'flex',
        justifyContent: 'center',
        width: width, 
        height: width * 0.3,
        paddingLeft: width * 0.03
    },
    titleText: {
        color: '#262444',
        fontFamily: 'sans-serif-medium',
        fontSize: width * 0.08,
        fontWeight: '800',
    },
    cardContainer: {
        width: width * 0.9,
        height: width,
        display: 'flex',
        flexDirection: 'column',
        alignContent: 'center',    
        alignItems: 'center',
        backgroundColor: '#262444',
        marginBottom: width * 0.05,
        borderTopLeftRadius: width * 0.03,
        borderTopRightRadius: width * 0.03,
        borderBottomLeftRadius: width * 0.03,
        borderBottomRightRadius: width * 0.03
    },
    cardImage: {
        marginTop: width * 0.07,
        width: width * 0.76,
        height: width * 0.65,
        borderColor: 'white',
        borderWidth: 3
    },
    textIconWrapper: {
        width: width * 0.76,
        display: 'flex',
        marginTop: width * 0.03,
        flexDirection: 'column',
    },
    iconWrapper: {
        display: 'flex',
        flexDirection: 'row'
    },
    cardText: {
        fontFamily: 'TmoneyRoundWindRegular',
        color: '#ffffff',
        fontSize: width * 0.04,
        marginTop: width * 0.03
    },
    likeText: {
        fontFamily: 'TmoneyRoundWindRegular',
        color: '#ffb687',
        fontSize: width * 0.038,
        marginTop: width * 0.03,
        marginLeft: width * 0.02
    }
})

export default SocialPage
