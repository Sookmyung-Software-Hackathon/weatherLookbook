import React, { useState, useEffect } from 'react'
import { View, Text, StatusBar, SafeAreaView, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/EvilIcons'
import Header from './Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'
import Spring from '../images/spring.jpg'
import Summber from '../images/summer.jpg'
import Fall from '../images/fall.jpg'
import Winter from '../images/winter.jpg'

function GuidePage() {
    const [temperature, setTemperature] = useState({avg: 0, min: 0, max: 0})    
    const [date, setDate] = useState({ date: '', month: '', day: '' })
    const [checkedDate, setCheckedDate] = useState(0)

    const getTime = () => {
        let getDay = new Date()
        let day; 
        switch (getDay.getDay()) {
            case 0:
                day = 'Sun'
                break;
            case 1:
                day = 'Mon'
                break;
            case 2:
                day = 'Tue'
                break;
            case 3:
                day = 'Wed'
                break;
            case 4:
                day = 'Thur'
                break;
            case 5:
                day = 'Fri'
                break;
            case 6:
                day = 'Sat'
                break;
        }
        let newDate = { date: getDay.getDate(), month: getDay.getMonth()+1, day: day }
        setDate(newDate)
    }

    const selectChImage = () => {
        if (temperature.avg <= 6) {
            return Winter
        } else if (temperature.avg <= 15) {
            return Fall
        } else if (temperature.avg <= 22) {
            return Spring
        } else {
            return Summber
        }
    }

    const showDate = () => {
        let contents = []
        for (let i = 0; i < 7; i++) {
            contents.push(
                <TouchableOpacity key={i} onPress={() => setCheckedDate(i)}>
                    <View style={checkedDate===i && styles.checkedDateCard}>
                        <Text style={checkedDate===i ? styles.dateText : styles.unCheckedDateText}>{date.date+i}</Text>
                    </View>
                </TouchableOpacity>
            )
        }
        return contents
    }

    const getTemperature = async () => {
        const token = await AsyncStorage.getItem('token');
        axios.get('http://192.168.232.235:8000/crawlingapp/', {} ,
            {
                headers: {'Authorization': 'Token ' + token},
            
        }).then(res => {
            console.log(res.data)
            setTemperature(res.data)
        }).catch(e => {
            console.log(e)
        })
    }

    useEffect(() => {
        getTemperature()
        getTime()
    }, [])

    return (
        <SafeAreaView style={styles.background}>
            <StatusBar barStyle="dark-content" backgroundColor={'transparent'} translucent={true} />
            <Header color={true} />
            <View style={styles.titleBox}>
                <Text style={styles.date}>{date.month}. {date.date}. {date.day}</Text>
                <Text style={styles.titleText}>Recommended outfits{`\n`}By temperature</Text>
            </View>
            <View style={styles.bottomCard}>
                <View style={styles.calendar}>
                    {showDate()}
                </View>
                <View style={styles.tempContainer}>
                    <View style={styles.tempBox}>
                        <Text style={styles.tempText}>{temperature.min}°</Text>
                        <View style={styles.bar} />
                        <Text style={styles.tempHighText}>LOWEST</Text>
                    </View>
                    <View style={styles.tempBox}>
                        <Text style={styles.tempText}>{temperature.avg}°</Text>
                        <View style={styles.bar} />
                        <Text style={styles.tempHighText}>NOW</Text>
                    </View>
                    <View style={styles.tempBox}>
                        <Text style={styles.tempText}>{temperature.max}°</Text>
                        <View style={styles.bar} />
                        <Text style={styles.tempHighText}>HIGHST</Text>
                    </View>
                </View>
                <View style={styles.charaterContainer}>
                    <Image style={styles.chImage} source={selectChImage()} />
                </View>
            </View>
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
        height: width * 0.4,
        paddingLeft: width * 0.03
    },
    date: {
        fontSize: width * 0.06,
        color: '#262444',
        fontWeight: '600'
    },
    titleText: {
        color: '#262444',
        fontFamily: 'sans-serif-medium',
        fontSize: width * 0.08,
        fontWeight: '800',
    },
    bottomCard: {
        width: width,
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        borderTopRightRadius: width * 0.15,
        borderTopLeftRadius: width * 0.15,
        elevation: 10
    },
    calendar: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: width * 0.9,
        marginTop: width * 0.1,
    },
    checkedDateCard: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: width * 0.12,
        height: width * 0.12,
        borderTopLeftRadius: width * 0.05,
        borderTopRightRadius: width * 0.05,
        backgroundColor: '#262444',
        position: 'relative',
        bottom: -1,
    },
    dateText: {
        color: '#ffb687',
        fontFamily: 'TmoneyRoundWindExtraBold',
        fontSize: width * 0.06,
    },
    unCheckedDateText: {
        color: '#C0C0C0',
        fontFamily: 'TmoneyRoundWindExtraBold',
        fontSize: width * 0.06,
    },
    tempContainer: {
        width: width * 0.9,
        height: width * 0.4,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        backgroundColor: '#262444',
        borderTopLeftRadius: width * 0.02,
        borderTopRightRadius: width * 0.02,
        borderBottomRightRadius: width * 0.02,
        borderBottomLeftRadius: width * 0.02,
    },
    tempBox: {
        width: width * 0.2,
        display: 'flex',
        alignItems: 'center',
    },
    tempText: {
        color: '#ffb687',
        fontFamily: 'TmoneyRoundWindExtraBold',
        fontSize: width * 0.1,
    },
    bar: {
        width: '100%',
        height: width * 0.005,
        backgroundColor: '#ffb687',
        marginTop: width * 0.03,
        marginBottom: width * 0.03
    },
    tempHighText: {
        color: '#ffb687',
        fontFamily: 'TmoneyRoundWindExtraBold',
        fontSize: width * 0.03
    },
    charaterContainer: {
        width: width * 0.9,
        height: width * 0.6,
        marginTop: width * 0.05,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        // backgroundColor: '#f5f5f5',
        borderTopLeftRadius: width * 0.02,
        borderTopRightRadius: width * 0.02,
        borderBottomRightRadius: width * 0.02,
        borderBottomLeftRadius: width * 0.02,
    },
    chImage: {
        width: width * 0.9,
        height: width * 0.6,
    }
})

export default GuidePage
