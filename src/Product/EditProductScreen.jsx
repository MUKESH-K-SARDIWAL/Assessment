import React from 'react';
import { View, Button, TextInput, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { editProductRequest } from '../store/actions/productActions';
import InputLabel from '../Common/InputLabel';

const EditProductScreen = ({ route }) => {
    const dispatch = useDispatch();
    const { product } = route.params;

    const validationSchema = Yup.object().shape({
        productName: Yup.string().required('Product name is required'),
        image: Yup.string().required('Image is required'),
    });

    const handleSubmit = (values) => {
        dispatch(editProductRequest({ ...values, id: product.id }));
    };

    return (
       
        <ScrollView className="flex-1">
            <View className="mx-6">
                <Text className="text-2xl text-[#000] text-center my-8" >Login</Text>
                <Formik
                    initialValues={{ productName: product.productName}}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, touched, errors }) => (
                        <View>
                            <InputLabel text='Product Name' />
                            <View className="mt-2.5">
                                <TextInput
                                    onChangeText={handleChange('productName')}
                                    onBlur={handleBlur('productName')}
                                    value={values.productName}
                                    placeholder='Enter Product Name'
                                    className="border-gray2 border rounded-md w-full h-10 pl-1 text-black" />

                                {errors.productName && touched.productName ? (
                                    <Text style={{ fontSize: 10, color: '#FF0000', marginTop: 5 }}>{errors.productName}</Text>
                                ) : null}
                            </View>
                           <TouchableOpacity onPress={() => { handleSubmit() }} className='text-center w-full mt-5'>
                        <Text className='text-blue text-lg text-center font-medium '>Edit Product</Text>
                    </TouchableOpacity>
                        </View>
                    )}
                </Formik>
            </View>
        </ScrollView>
    );
};

export default EditProductScreen;
