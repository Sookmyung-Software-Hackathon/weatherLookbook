import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { restoreToken } from './_modules/user';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Image, StyleSheet, Dimensions } from 'react-native'
import GuideIcon from './images/temperatures.png';
import CustomIcon from './images/tshirt.png';
import SocialIcon from './images/post.png';
import SettingIcon from './images/settings.png'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import GuidePage from './pages/GuidePage';
import CustomPage from './pages/CustomPage';
import SocialPage from './pages/SocialPage';
import SettingPage from './pages/SettingPage';
import TabBar from './pages/TabBar';
import SignIn from './auth/SignIn';


const Root = () => {

  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  console.log("user: ", user);

  useEffect(() => {
    // setTimeout(() => {
    //   SplashScreen.hide();
    // }, 2000);
    const bootstrapAsync = async () => {
      let token;
      try {
        token = await AsyncStorage.getItem('token');
        console.log("boot token: ", token)
        console.log("userToken: ", user.userToken)
      } catch (e) {
        console.log(e);
      }
      dispatch(restoreToken(token));
    }
    bootstrapAsync();
  }, [])

//   if (user.isLoading) {
//     return <Splash />
//   }
    
    const Tab = createBottomTabNavigator();

    return (
        <>
        {
          user.userToken === null 
          ? <SignIn />
          : (
              <NavigationContainer>
                <Tab.Navigator 
                    screenOptions={({ route }) => ({
                        tabBarShowIcon: true,
                    })}
                    screenOptions={{ headerShown: false }}>
                    <Tab.Screen 
                        name="Guide" 
                        component={GuidePage} 
                        options= {{
                          tabBarStyle: { backgroundColor: '#ffb687', height: '8%', width: '100%', borderTopRightRadius: 21, borderTopLeftRadius: 21 },
                          tabBarInactiveTintColor: '#ffecd0',
                          tabBarActiveTintColor: '#262444',
                          tabBarLabelStyle: {marginBottom: 10},
                          headerShown: false,
                          tabBarIcon: () => {
                            return (
                              <Image
                                tintColor="#262444"
                                source={GuideIcon}
                                style={styles.icon}
                              />
                            )
                          }
                        }} 
                    />
                    <Tab.Screen 
                        name="Custom" 
                        component={CustomPage} 
                        options= {{
                          tabBarStyle: { backgroundColor: '#ffb687', height: '8%', position: 'absolute', borderTopRightRadius: 21, borderTopLeftRadius: 21 },
                          tabBarInactiveTintColor: '#ffecd0',
                          tabBarActiveTintColor: '#262444',
                          tabBarLabelStyle: {marginBottom: 10},
                          headerShown: false,
                          tabBarIcon: () => {
                            return (
                              <Image
                                tintColor="#262444"
                                source={CustomIcon}
                                style={styles.icon}
                              />
                            )
                          }
                        }}
                    />
                    <Tab.Screen 
                        name="Social" 
                        component={SocialPage} 
                        options= {{
                          tabBarStyle: { backgroundColor: '#ffb687', height: '8%', position: 'absolute', borderTopRightRadius: 21, borderTopLeftRadius: 21 },
                          tabBarInactiveTintColor: '#ffecd0',
                          tabBarActiveTintColor: '#262444',
                          tabBarLabelStyle: {marginBottom: 10},
                          headerShown: false,
                          tabBarIcon: () => {
                            return (
                              <Image
                                tintColor="#262444"
                                source={SocialIcon}
                                style={styles.icon}
                              />
                            )
                          }
                        }}
                    />
                    <Tab.Screen 
                        name="Setting" 
                        component={SettingPage} 
                        options= {{
                          tabBarStyle: { backgroundColor: '#ffb687', height: '8%', position: 'absolute', borderTopRightRadius: 21, borderTopLeftRadius: 21 },
                          tabBarInactiveTintColor: '#ffecd0',
                          tabBarActiveTintColor: '#262444',
                          tabBarLabelStyle: {marginBottom: 10},
                          headerShown: false,
                          tabBarIcon: () => {
                            return (
                              <Image
                                tintColor="#262444"
                                source={SettingIcon}
                                style={styles.icon}
                              />
                            )
                          }
                        }}
                    />
                </Tab.Navigator>
              </NavigationContainer>
          )
        }
        
        </>
    )
};

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const styles = StyleSheet.create({
  tabBar: {
    width: width,
    height: width * 0.3,
    backgroundColor: '#ffb687',
  },
  icon: {
    width: width * 0.06,
    height: width * 0.06,
    marginTop: 10
  }
})


export default Root;
