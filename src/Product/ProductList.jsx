import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProductRequest } from '../store/actions/productActions';
import ProfileHeader from '../Common/ProfileHeader';
import firestore from '@react-native-firebase/firestore';


const ProductListScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    // const { products } = useSelector((state: any) => state.products);
    const [products, setProduct] = useState([])
    // console.log(`products==>`, products);

    const handleDelete = (id) => {
        dispatch(deleteProductRequest(id));
    };

    useEffect(() => {
        async function getdata() {
            const users = await firestore().collection('products').get();
            console.log(`users.docs[0]==>`,users.docs);
            let newArr = [];
            users.docs.forEach((items)=>{
                console.log(`items==>`,items._data);
                newArr.push(...items._data)
            })
            console.log(`newArr==>`,newArr);
            setProduct(newArr);
        }
        getdata()
        // console.log(`products==>`, products);
        // setProduct(products);
    }, [])
    return (
        <View>
            <ProfileHeader />
            <Button title="Add Product" onPress={() => navigation.navigate('AddProduct')} />
            <FlatList
                data={products}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View>
                        <Text>{item.productName}</Text>
                        <Button title="Edit" onPress={() => navigation.navigate('EditProduct', { product: item })} />
                        <Button title="Delete" onPress={() => handleDelete(item.id)} />
                    </View>
                )}
            />
        </View>
    );
};

export default ProductListScreen;
