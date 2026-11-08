import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function ResultsScreen({ route, navigation }) {
    const { finalScore = 0, maxScore = 20, topicMistakes = {}, username = 'Estudiante' } = route.params || {};

    const percentage = (finalScore / maxScore) * 100;
    const sortedMistakes = Object.entries(topicMistakes).sort((a, b) => b[1] - a[1]);

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.card}>
                <View style={styles.trophyContainer}>
                    <MaterialCommunityIcons name="trophy-outline" size={48} color="#FFD700" />
                </View>

                <Text style={styles.title}>Resultados Finales</Text>
                <Text style={styles.subtitle}>Candidato: {username}</Text>

                <View style={styles.scoreContainer}>
                    <Text style={styles.scoreNumber}>{finalScore.toFixed(2)} / {maxScore}.0</Text>
                    <Text style={styles.scorePercentage}>{percentage.toFixed(1)}% de efectividad</Text>
                </View>

                <View style={styles.divider} />

                <View style={styles.sectionHeader}>
                    <MaterialCommunityIcons name="chart-bar" size={22} color="#38BDF8" style={{ marginRight: 8 }} />
                    <Text style={styles.sectionTitle}>Análisis de Desempeño</Text>
                </View>

                {sortedMistakes.length > 0 ? (
                    <View>
                        <Text style={styles.recommendationIntro}>
                            Basado en tus errores, te sugerimos repasar los siguientes temas:
                        </Text>
                        {sortedMistakes.map(([topic, count], index) => (
                            <View key={index} style={styles.mistakeItem}>
                                <View style={styles.mistakeTopicRow}>
                                    <MaterialCommunityIcons name="alert-circle-outline" size={18} color="#F87171" style={{ marginRight: 6 }} />
                                    <Text style={styles.mistakeTopic}>{topic}</Text>
                                </View>
                                <Text style={styles.mistakeCount}>{count} {count === 1 ? 'error' : 'errores'}</Text>
                            </View>
                        ))}
                    </View>
                ) : (
                    <View style={styles.perfectScoreBox}>
                        <MaterialCommunityIcons name="check-circle-outline" size={24} color="#4ADE80" style={{ alignSelf: 'center', marginBottom: 6 }} />
                        <Text style={styles.perfectScoreText}>
                            ¡Excelente trabajo! No registraste errores. ¡Dominio total de Sistemas Operativos!
                        </Text>
                    </View>
                )}

                <TouchableOpacity
                    style={styles.button}
                    activeOpacity={0.8}
                    onPress={() => navigation.navigate('Login')}
                >
                    <MaterialCommunityIcons name="home-outline" size={20} color="#0F172A" style={{ marginRight: 8 }} />
                    <Text style={styles.buttonText}>Finalizar e Ir al Inicio</Text>
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
    trophyContainer: {
        alignSelf: 'center',
        backgroundColor: '#334155',
        width: 72,
        height: 72,
        borderRadius: 36,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#F8FAFC',
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 14,
        color: '#38BDF8',
        textAlign: 'center',
        marginBottom: 20,
        fontWeight: '600',
    },
    scoreContainer: {
        backgroundColor: '#0F172A',
        padding: 20,
        borderRadius: 12,
        alignItems: 'center',
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#334155',
    },
    scoreNumber: {
        fontSize: 38,
        fontWeight: 'bold',
        color: '#38BDF8',
    },
    scorePercentage: {
        fontSize: 15,
        color: '#94A3B8',
        marginTop: 5,
    },
    divider: {
        height: 1,
        backgroundColor: '#334155',
        marginVertical: 15,
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    sectionTitle: {
        fontSize: 17,
        fontWeight: 'bold',
        color: '#F8FAFC',
    },
    recommendationIntro: {
        fontSize: 13,
        color: '#94A3B8',
        marginBottom: 10,
    },
    mistakeItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        borderWidth: 1,
        borderColor: '#EF4444',
        padding: 12,
        borderRadius: 8,
        marginBottom: 8,
        alignItems: 'center',
    },
    mistakeTopicRow: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    mistakeTopic: {
        fontSize: 14,
        fontWeight: '600',
        color: '#F87171',
    },
    mistakeCount: {
        fontSize: 13,
        fontWeight: 'bold',
        color: '#FCA5A5',
    },
    perfectScoreBox: {
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        borderWidth: 1,
        borderColor: '#22C55E',
        padding: 15,
        borderRadius: 10,
        marginVertical: 10,
    },
    perfectScoreText: {
        color: '#4ADE80',
        fontSize: 14,
        textAlign: 'center',
        fontWeight: '600',
        lineHeight: 20,
    },
    button: {
        backgroundColor: '#38BDF8',
        padding: 16,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
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
});