import React, { useEffect } from 'react';
import { Text, 
         TouchableOpacity, 
         TextInput, 
         SafeAreaView, 
         View, 
         StyleSheet, 
         Dimensions, 
         ScrollView,
         Image, 
         Alert,
         StatusBar,
         Button} from 'react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { googleClientId } from '../../ipConfig'
import AuthenticationService from './AuthenticationService';
import { useDispatch } from 'react-redux'
import { signIn } from '../_modules/user'
import Google from '../images/google.png'
import axios from 'axios'

function SignIn() {

    const dispatch = useDispatch()

    const handleSnsSignIn = (type) => {
      if (type === 'google') {
        AuthenticationService.handleGoogleSignIn()
          .then(res => {
            if (res.error) {
              Alert.alert("정보를 가져오는 데 실패했습니다.")
              return
            }
            console.log("확인::: ", res.email, res.name)
            dispatch(signIn(res.email, res.name))
          })
      }
    }

    const testApi = () => {
      axios.post('http://192.168.232.235:8000/')
      .then(res => console.log(res))
      .catch(e => console.log(e))
    
    }


    useEffect(() => {
      GoogleSignin.configure({
        webClientId: googleClientId,
        forceCodeForRefreshToken: true,
        offlineAccess: true
      })
 
    }, [])

    return (
        <SafeAreaView style={styles.background}>
          <StatusBar barStyle="dark-content" backgroundColor={'transparent'} translucent={true} />
            <TouchableOpacity onPress={() => {handleSnsSignIn('google')}}>
              <View style={styles.signInButton}>
                <Image style={styles.icon} source={Google} alt="google" />
                <Text style={styles.signInText}>Sign in with Google</Text>
              </View>
            </TouchableOpacity>
        </SafeAreaView>
    )
}


const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
    background: {
      backgroundColor: '#ffe6d3',
      width: width,
      height: height * 1.1,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center'
    },
    icon: {
      width: width * 0.08,
      height: width * 0.08,
      marginRight: width * 0.04
    },
    signInButton: {
      display: 'flex',
      flexDirection: 'row',
      width: (width * 80) / 100,
      height: width * 0.2,
      borderColor: '#262444',
      backgroundColor: '#262444',
      borderWidth: 2,
      borderRadius: width > 500 ? 40 : 25,
      alignItems: 'center',
      justifyContent: 'center',
    },
    signInText: {
      fontSize: width > 500 ? 30 : 20,
      fontFamily: 'TmoneyRoundWindRegular',
      color: '#ffb687',
      marginTop: width * 0.03
    },
})


export default SignIn
