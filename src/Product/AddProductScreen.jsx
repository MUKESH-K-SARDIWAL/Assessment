import React, { useEffect, useState } from 'react';
import { View, Button, TextInput, Text, TouchableOpacity, ScrollView, Image, } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { addProductRequest } from '../store/actions/productActions';
import InputLabel from '../Common/InputLabel';
import ImagePicker from 'react-native-image-crop-picker';
import { PermissionsAndroid } from 'react-native';

const AddProductScreen = ({ navigation }) => {

    const dispatch = useDispatch();
    const [image, setImage] = useState(null);
    
    const validationSchema = Yup.object().shape({
        productName: Yup.string().required('Product name is required'),
        image: Yup.string().required('Image is required'),
    });

    useEffect(()=>{
        requestCameraPermission();
    },[]);

    const handleSubmit = (values) => {
        const productData = {
            ...values,
            image: image?.path, 
        };
        dispatch(addProductRequest(values));
        navigation.goBack();
    };


    const pickImage = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            // cropping: true
        }).then((image) => {
            console.log(image);
            setImage(image)
        });
    }

    const requestCameraPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
                {
                    title: 'Cool Photo App Camera Permission',
                    message:
                        'Cool Photo App needs access to your camera ' +
                        'so you can take awesome pictures.',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                },
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log('You can use the camera');
            } else {
                requestCameraPermission()
                console.log('Camera permission denied');
            }
        } catch (err) {
            // requestCameraPermission()
            console.warn(err);
        }
    };

    return (
        <ScrollView className="flex-1">
            <View className="mx-6">
                <Formik
                    initialValues={{ productName: '', image: '' }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                        <View>
                            <View className='mt-5'>
                                <InputLabel text='Product Name' />
                                <TextInput
                                    placeholder="Product Name"
                                    onChangeText={handleChange('productName')}
                                    onBlur={handleBlur('productName')}
                                    value={values.productName}
                                    className="border-gray2 border rounded-md w-full h-10 pl-1 text-black mt-2"
                                />
                                {errors.productName && touched.productName ? (
                                    <Text style={{ fontSize: 10, color: '#FF0000', marginTop: 5 }}>{errors.productName}</Text>
                                ) : null}
                            </View>
                            <View className='mt-5'>
                                <InputLabel text='Image' />
                                
                                {image != null ? <Image source={{ uri: image?.path }} className='w-20 h-20' resizeMode='contain' /> : null}
                                <TouchableOpacity onPress={() => { pickImage() }} className='text-center w-full mt-5 bg-blue rounded h-10 flex items-center justify-center'>
                                    <Text className='text-white text-lg text-center  '>Add Image</Text>
                                </TouchableOpacity>
                                {errors.image && touched.image ? (
                                    <Text style={{ fontSize: 10, color: '#FF0000', marginTop: 5 }}>{errors.image}</Text>
                                ) : null}
                            </View>
                            <TouchableOpacity onPress={() => { handleSubmit() }} className='text-center w-full mt-5 bg-blue rounded h-10 flex items-center justify-center'>
                                <Text className='text-white text-lg text-center  '>Add Product</Text>
                            </TouchableOpacity>


                        </View>
                    )}
                </Formik>
            </View>
        </ScrollView>
    );
};

export default AddProductScreen;
