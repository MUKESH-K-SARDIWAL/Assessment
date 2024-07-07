import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, TextInput, Button, ActivityIndicator } from 'react-native';
import { loginRequest } from '../store/actions/authActions';

const LoginScreen = () => {
    const dispatch = useDispatch();
    const { loading, error } = useSelector((state) => state.auth);

    const [credentials, setCredentials] = useState({ username: '', password: '' });

    const handleLogin = () => {
        dispatch(loginRequest(credentials));
    };

    return (
        <View style={{ padding: 20 }}>
            <TextInput
                placeholder="Username"
                value={credentials.username}
                onChangeText={(text) => setCredentials({ ...credentials, username: text })}
                style={{ marginBottom: 10 }}
            />
            <TextInput
                placeholder="Password"
                value={credentials.password}
                onChangeText={(text) => setCredentials({ ...credentials, password: text })}
                secureTextEntry
                style={{ marginBottom: 10 }}
            />
            <Button title="Login" onPress={handleLogin} />
            {loading && <ActivityIndicator style={{ marginTop: 10 }} />}
            {error && <Text style={{ color: 'red', marginTop: 10 }}>{error}</Text>}
        </View>
    );
};

export default LoginScreen;
