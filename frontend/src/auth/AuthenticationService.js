import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

import { LOCAL } from '../../ipConfig';
import { Alert } from 'react-native';

class AuthenticationService {

    executeJwtSignUpService(email, password, oauth) {
        return axios.post(`${LOCAL}/auth/signUp`, {
            email, password, oauth
        });
    }

    executeJwtAuthenticationService(email, username) {

        return axios.post('http://192.168.232.235:8000/accountapp/join/', {
            email: email,
            username: username,
            password: 'password'
        });
       

    }

    async registerSuccessfullLoginForJwt(token) {
        console.log("===registerSuccessfulLoginForJwt===")

        console.log("token ", token);
        await AsyncStorage.setItem('token', token);
    }


    async checkJwtToken() {
        let validTime = await AsyncStorage.getItem('jwtValidTime');
        console.log('유효시간: ', validTime)
        validTime = new Date(parseInt(validTime))
        console.log('valid time: ', validTime)
        if (validTime < new Date()) {
            console.log('유효한 시간이 지났습니다.')
            let memberId = await AsyncStorage.getItem('memberId')
            let newToken = await axios.get(`${LOCAL}/auth/token/refresh`, { params:{ memberId: memberId } })
            console.log(`새 토큰: `, newToken.data.message, `\n\n성공 여부: `, newToken.data.success)
            if (newToken.data.success) {
                let newValidTime= new Date();
                newValidTime.setDate(newValidTime.getDate() + 7);
                await AsyncStorage.setItem('token', newToken.data.message)
                await AsyncStorage.setItem('jwtValidTime', JSON.stringify(newValidTime.getTime()))
                return true;
            } else {
                Alert.alert("로그인 암호가 만료되었습니다. 다시 로그인해주세요.");
                return false;
            }
            
        } else return true;
    }

    handleGoogleSignIn = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            console.log('google email: ', userInfo);
            return { email: userInfo.user.email, name: userInfo.user.name, photo: userInfo.user.photo,  error: false };
        } catch (e) {
            return { email: '', name: '', photo: '', error: true };
        }
    }

    googleLogout = async () => {
        try {
            await GoogleSignin.signOut();
            return { error : false }
        } catch (e) {
            return { error: true }
        }
    }

    async logout() {
        try {
            let logout = await AsyncStorage.getItem('token')
            await this.googleLogout();
            console.log('snsType: ', snsType);
            console.log("logout ", logout)
            await AsyncStorage.removeItem('token');
            logout = await AsyncStorage.getItem('token')
            console.log("logout ", logout)
        } catch (e) {
            console.log(e)
        }
    }
}

export default new AuthenticationService();