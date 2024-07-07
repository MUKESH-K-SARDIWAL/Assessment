import { View, Text, ImageBackground, TextInput, Image, TouchableOpacity, ScrollView } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import BlueBtn from '../Common/BlueBtn'
import { Formik } from 'formik'
import * as Yup from 'yup';
import AsyncStorage from '@react-native-async-storage/async-storage'
import auth from '@react-native-firebase/auth';
import { useIsFocused } from '@react-navigation/native'
import InputLabel from '../Common/InputLabel';
import Toast from 'react-native-toast-message';
import { useDispatch } from 'react-redux';
import { registerRequest } from '../store/actions/authActions';
const intialVal = { email: '', password: '' };


const Registor = ({ navigation }: any) => {

    const dispatch = useDispatch();

    const handleRegistor = useCallback((val: any) => {
        dispatch(registerRequest(val));
        navigation.goBack();
    }, []);




    const loginSchema = Yup.object().shape({
        password: Yup.string().required('Password is required'),
        email: Yup.string().email('Invalid email').required('Email is required'),
    });

    const intialVal = { email: '', password: '' }



    return (
        <ScrollView className="flex-1">
            <View className="mx-6">
                {/* <Text className="text-2xl text-[#000] text-center my-8" >Sign Up</Text> */}
                <Formik
                    initialValues={intialVal}
                    onSubmit={values => handleRegistor(values)}
                    validationSchema={loginSchema}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, touched, errors }) => (
                        <View>
                            <InputLabel text='Email' />
                            <View className="mt-2.5">
                                <TextInput
                                    onChangeText={handleChange('email')}
                                    onBlur={handleBlur('email')}
                                    value={values.email}
                                    placeholder='Enter Email'
                                    className="border-gray2 border rounded-md w-full h-10 pl-1 text-black" />

                                {errors.email && touched.email ? (
                                    <Text style={{ fontSize: 10, color: '#FF0000', marginTop: 5 }}>{errors.email}</Text>
                                ) : null}
                            </View>
                            <View className="mt-5">
                                <InputLabel text='Password' />
                                <View className="mt-2.5">
                                    <TextInput
                                        onChangeText={handleChange('password')}
                                        onBlur={handleBlur('password')}
                                        value={values.password}
                                        placeholder='Enter Password'
                                        className="border-gray2 border rounded-md w-full h-10 pl-1 text-black"
                                    // secureTextEntry={eye}
                                    />
                                    {errors.password && touched.password ? (
                                        <Text style={{ fontSize: 10, color: '#FF0000', marginTop: 5 }}>{errors.password}</Text>
                                    ) : null}
                                </View>
                            </View>
                            <View className="mt-7">
                                <BlueBtn text={'Registor'} handlePress={handleSubmit} height={38} disable={true} />
                            </View>

                        </View>
                    )}
                </Formik>
            </View>
        </ScrollView>
    )
}

export default Registor