import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { memo, useCallback, useEffect } from 'react'
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { logoutRequest } from '../store/actions/authActions';

const ProfileHeader = () => {

    const navigation = useNavigation<any>();

    const dispatch = useDispatch();

    function handleLogout() {
        // console.log('red')
         dispatch(logoutRequest());
        // navigation.navigate('login')
    };

    return (
        <View className="h-[50px] bg-blue w-full px-[31px] flex flex-row items-center justify-between">
            <Text className='text-white text-lg font-medium'>Product</Text>

            <TouchableOpacity onPress={handleLogout}>
                <Image source={require('../../assets/log-out.png')} className='w-7 ml-4 h-7' resizeMethod='scale' resizeMode='cover' />
            </TouchableOpacity>


        </View>
    )
}

export default ProfileHeader