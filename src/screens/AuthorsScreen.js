import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function AuthorsScreen({ route, navigation }) {
    const { username = 'Estudiante' } = route.params || {};

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.card}>
                {/* Header de bienvenida con icono */}
                <View style={styles.headerRow}>
                    <MaterialCommunityIcons name="account-circle-outline" size={28} color="#38BDF8" />
                    <Text style={styles.welcomeText}>¡Hola, {username}!</Text>
                </View>

                <Text style={styles.title}>Evaluación de Sistemas Operativos</Text>

                <View style={styles.divider} />

                <View style={styles.sectionHeader}>
                    <MaterialCommunityIcons name="code-tags" size={22} color="#38BDF8" style={{ marginRight: 8 }} />
                    <Text style={styles.sectionTitle}>Autores de la Aplicación</Text>
                </View>

                <View style={styles.authorItem}>
                    <View style={styles.authorHeader}>
                        <MaterialCommunityIcons name="account-badge-outline" size={20} color="#38BDF8" style={{ marginRight: 6 }} />
                        <Text style={styles.authorName}>Estudiante 1</Text>
                    </View>
                    <Text style={styles.authorDetail}>Desarrollo Mobile & Lógica de Quiz</Text>
                </View>

                <View style={styles.authorItem}>
                    <View style={styles.authorHeader}>
                        <MaterialCommunityIcons name="account-badge-outline" size={20} color="#38BDF8" style={{ marginRight: 6 }} />
                        <Text style={styles.authorName}>Estudiante 2</Text>
                    </View>
                    <Text style={styles.authorDetail}>Desarrollo Mobile & Lógica de Quiz</Text>
                </View>

                <View style={styles.authorItem}>
                    <View style={styles.authorHeader}>
                        <MaterialCommunityIcons name="account-badge-outline" size={20} color="#38BDF8" style={{ marginRight: 6 }} />
                        <Text style={styles.authorName}>Estudiante 3</Text>
                    </View>
                    <Text style={styles.authorDetail}>Desarrollo Mobile & Lógica de Quiz</Text>
                </View>

                <View style={styles.authorItem}>
                    <View style={styles.authorHeader}>
                        <MaterialCommunityIcons name="account-badge-outline" size={20} color="#38BDF8" style={{ marginRight: 6 }} />
                        <Text style={styles.authorName}>Estudiante 4</Text>
                    </View>
                    <Text style={styles.authorDetail}>Desarrollo Mobile & Lógica de Quiz</Text>
                </View>

                <View style={styles.authorItem}>
                    <View style={styles.authorHeader}>
                        <MaterialCommunityIcons name="account-badge-outline" size={20} color="#38BDF8" style={{ marginRight: 6 }} />
                        <Text style={styles.authorName}>Estudiante 5</Text>
                    </View>
                    <Text style={styles.authorDetail}>Diseño UI/UX & Base de Datos</Text>
                </View>

                <View style={styles.descriptionBox}>
                    <MaterialCommunityIcons name="information-outline" size={20} color="#94A3B8" style={{ marginBottom: 6 }} />
                    <Text style={styles.descriptionText}>
                        Esta herramienta evaluará tus conocimientos sobre los pilares fundamentales de los Sistemas Operativos: Gestión de Procesos, Memoria, Sistemas de Archivos, Kernel y Seguridad. ¡Mucho éxito!
                    </Text>
                </View>

                <TouchableOpacity
                    style={styles.button}
                    activeOpacity={0.8}
                    onPress={() => navigation.navigate('Quiz', { username })}
                >
                    <Text style={styles.buttonText}>Comenzar Evaluación</Text>
                    <MaterialCommunityIcons name="play-circle-outline" size={22} color="#0F172A" style={{ marginLeft: 8 }} />
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
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
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    welcomeText: {
        fontSize: 16,
        color: '#38BDF8',
        fontWeight: '600',
        marginLeft: 8,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#F8FAFC',
        marginBottom: 10,
    },
    divider: {
        height: 1,
        backgroundColor: '#334155',
        marginVertical: 15,
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    sectionTitle: {
        fontSize: 17,
        fontWeight: 'bold',
        color: '#F8FAFC',
    },
    authorItem: {
        marginBottom: 12,
        backgroundColor: '#0F172A',
        padding: 12,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#334155',
    },
    authorHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 2,
    },
    authorName: {
        fontSize: 15,
        fontWeight: '600',
        color: '#38BDF8',
    },
    authorDetail: {
        fontSize: 13,
        color: '#94A3B8',
        marginLeft: 26,
    },
    descriptionBox: {
        backgroundColor: '#0F172A',
        padding: 14,
        borderRadius: 10,
        marginVertical: 15,
        borderWidth: 1,
        borderColor: '#334155',
    },
    descriptionText: {
        fontSize: 14,
        color: '#CBD5E1',
        lineHeight: 20,
    },
    button: {
        backgroundColor: '#22C55E',
        padding: 16,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 5,
        shadowColor: '#22C55E',
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
});