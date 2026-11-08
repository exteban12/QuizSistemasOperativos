import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Alert,
    KeyboardAvoidingView,
    Platform
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { registerUser, loginUser } from '../database/database';

export default function LoginScreen({ navigation }) {
    const [isRegistering, setIsRegistering] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleAuthAction = async () => {
        if (!username.trim() || !password.trim()) {
            Alert.alert('Error', 'Por favor, completa todos los campos.');
            return;
        }

        if (isRegistering) {
            const result = await registerUser(username.trim(), password);
            if (result.success) {
                Alert.alert('¡Éxito!', 'Usuario registrado correctamente. Ahora puedes iniciar sesión.');
                setIsRegistering(false);
                setPassword('');
            } else {
                Alert.alert('Error', 'Ese nombre de usuario ya está registrado. Prueba con otro.');
            }
        } else {
            const user = await loginUser(username.trim(), password);
            if (user) {
                const currentUsername = user.username;
                setUsername('');
                setPassword('');
                navigation.navigate('Authors', { username: currentUsername });
            } else {
                Alert.alert('Error', 'Usuario o contraseña incorrectos, o usuario no registrado.');
            }
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <View style={styles.card}>
                <View style={styles.iconContainer}>
                    <MaterialCommunityIcons name="laptop" size={36} color="#38BDF8" />
                </View>

                <Text style={styles.title}>
                    {isRegistering ? 'Crear Cuenta' : 'Bienvenido'}
                </Text>
                <Text style={styles.subtitle}>Quiz de Sistemas Operativos</Text>

                <View style={styles.inputContainer}>
                    <MaterialCommunityIcons name="account-outline" size={20} color="#64748B" style={styles.inputIcon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Usuario"
                        placeholderTextColor="#64748B"
                        value={username}
                        onChangeText={setUsername}
                        autoCapitalize="none"
                    />
                </View>

                <View style={styles.inputContainer}>
                    <MaterialCommunityIcons name="lock-outline" size={20} color="#64748B" style={styles.inputIcon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Contraseña"
                        placeholderTextColor="#64748B"
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                    />
                </View>

                <TouchableOpacity style={styles.button} activeOpacity={0.8} onPress={handleAuthAction}>
                    <Text style={styles.buttonText}>
                        {isRegistering ? 'Registrarse' : 'Ingresar'}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => {
                        setIsRegistering(!isRegistering);
                        setUsername('');
                        setPassword('');
                    }}
                    style={styles.switchButton}
                >
                    <Text style={styles.switchText}>
                        {isRegistering
                            ? '¿Ya tienes cuenta? Inicia sesión'
                            : '¿No tienes cuenta? Regístrate aquí'}
                    </Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0F172A',
        justifyContent: 'center',
        padding: 20,
    },
    card: {
        backgroundColor: '#1E293B',
        padding: 25,
        borderRadius: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.4,
        shadowRadius: 8,
        elevation: 8,
    },
    iconContainer: {
        alignSelf: 'center',
        backgroundColor: '#334155',
        width: 68,
        height: 68,
        borderRadius: 34,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15,
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#F8FAFC',
        marginBottom: 5,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 14,
        color: '#94A3B8',
        marginBottom: 25,
        textAlign: 'center',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1.5,
        borderColor: '#334155',
        backgroundColor: '#0F172A',
        borderRadius: 10,
        marginBottom: 16,
        paddingHorizontal: 12,
    },
    inputIcon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        color: '#F8FAFC',
        paddingVertical: 14,
        fontSize: 15,
    },
    button: {
        backgroundColor: '#38BDF8',
        padding: 16,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 5,
        shadowColor: '#38BDF8',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 4,
    },
    buttonText: {
        color: '#0F172A',
        fontSize: 16,
        fontWeight: 'bold',
    },
    switchButton: {
        marginTop: 20,
        alignItems: 'center',
    },
    switchText: {
        color: '#38BDF8',
        fontSize: 14,
        fontWeight: '600',
    },
});