import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView
} from 'react-native';
import * as Haptics from 'expo-haptics';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { questionsData } from '../data/questions';

export default function QuizScreen({ navigation, route }) {
    const { username = 'Estudiante' } = route.params || {};

    const [shuffledQuestions, setShuffledQuestions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    const [attemptsLeft, setAttemptsLeft] = useState(3);
    const [questionScore, setQuestionScore] = useState(1.0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isAnsweredCorrectly, setIsAnsweredCorrectly] = useState(false);

    const [totalScore, setTotalScore] = useState(0);
    const [topicMistakes, setTopicMistakes] = useState({});

    // Estado para manejar nuestras alertas visuales personalizadas en lugar del Alert nativo feo
    const [customAlert, setCustomAlert] = useState({ visible: false, title: '', message: '', type: 'info' });

    useEffect(() => {
        startNewQuiz();
    }, []);

    const startNewQuiz = () => {
        const randomized = [...questionsData].sort(() => Math.random() - 0.5);
        setShuffledQuestions(randomized);
        setCurrentIndex(0);
        setTotalScore(0);
        setTopicMistakes({});
        resetQuestionState();
    };

    const resetQuestionState = () => {
        setAttemptsLeft(3);
        setQuestionScore(1.0);
        setSelectedOption(null);
        setIsAnsweredCorrectly(false);
        setCustomAlert({ visible: false, title: '', message: '', type: 'info' });
    };

    if (shuffledQuestions.length === 0) {
        return (
            <View style={styles.loadingContainer}>
                <Text style={styles.loadingText}>Cargando preguntas...</Text>
            </View>
        );
    }

    const currentQuestion = shuffledQuestions[currentIndex];

    const handleSelectOption = async (index) => {
        if (isAnsweredCorrectly) return;

        setSelectedOption(index);
        const correctIndex = currentQuestion.correctAnswerIndex;
        const currentTopic = currentQuestion.topic;

        if (index === correctIndex) {
            // ¡Respuesta Correcta! - Vibración de éxito
            await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
            setIsAnsweredCorrectly(true);
            setTotalScore(prev => prev + questionScore);
            setCustomAlert({ visible: false, title: '', message: '', type: 'info' });
        } else {
            // Respuesta Incorrecta - Vibración de error
            await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
            const newAttempts = attemptsLeft - 1;
            const newScore = Math.max(0, questionScore - 0.33);

            setAttemptsLeft(newAttempts);
            setQuestionScore(newScore);

            setTopicMistakes(prev => ({
                ...prev,
                [currentTopic]: (prev[currentTopic] || 0) + 1
            }));

            if (newAttempts === 0) {
                setIsAnsweredCorrectly(true);
                const correctOptionLetter = ['A', 'B', 'C', 'D'][correctIndex];
                // Alerta visual moderna en vez de la ventana nativa
                setCustomAlert({
                    visible: true,
                    title: 'Agotaste tus intentos',
                    message: `La respuesta correcta era la (${correctOptionLetter}):\n${currentQuestion.options[correctIndex]}`,
                    type: 'error'
                });
            }
        }
    };

    const handleNextQuestion = () => {
        if (!isAnsweredCorrectly) {
            setCustomAlert({
                visible: true,
                title: 'Atención',
                message: 'Debes responder correctamente o agotar los intentos para continuar.',
                type: 'warning'
            });
            return;
        }

        if (currentIndex < shuffledQuestions.length - 1) {
            setCurrentIndex(prev => prev + 1);
            resetQuestionState();
        } else {
            navigation.navigate('Results', {
                finalScore: totalScore,
                maxScore: shuffledQuestions.length,
                topicMistakes: topicMistakes,
                username: username
            });
        }
    };

    const progressPercentage = ((currentIndex + 1) / shuffledQuestions.length) * 100;
    const optionLetters = ['A', 'B', 'C', 'D'];

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.card}>

                {/* Barra de Progreso Visual */}
                <View style={styles.progressContainer}>
                    <View style={styles.progressBarBackground}>
                        <View style={[styles.progressBarFill, { width: `${progressPercentage}%` }]} />
                    </View>
                    <Text style={styles.progressText}>Pregunta {currentIndex + 1} de {shuffledQuestions.length}</Text>
                </View>

                {/* Insignia de Tema */}
                <View style={styles.topicBadge}>
                    <MaterialCommunityIcons name="folder-outline" size={14} color="#38BDF8" style={{ marginRight: 4 }} />
                    <Text style={styles.topicText}>{currentQuestion.topic}</Text>
                </View>

                {/* Estado de Intentos y Valor */}
                <View style={styles.statusBar}>
                    <View style={styles.statusBadge}>
                        <MaterialCommunityIcons name="heart-pulse" size={16} color="#38BDF8" style={{ marginRight: 6 }} />
                        <Text style={styles.statusLabel}>Intentos:</Text>
                        <Text style={styles.statusValue}>{attemptsLeft} / 3</Text>
                    </View>
                    <View style={styles.statusBadge}>
                        <MaterialCommunityIcons name="star-outline" size={16} color="#38BDF8" style={{ marginRight: 6 }} />
                        <Text style={styles.statusLabel}>Valor:</Text>
                        <Text style={styles.statusValue}>{questionScore.toFixed(2)} pts</Text>
                    </View>
                </View>

                {/* Enunciado de la Pregunta */}
                <Text style={styles.questionText}>{currentQuestion.question}</Text>

                {/* Alerta Visual Estilizada (Diseño UI/UX Integrado) */}
                {customAlert.visible && (
                    <View style={[styles.customAlertBox, customAlert.type === 'error' ? styles.alertError : styles.alertWarning]}>
                        <MaterialCommunityIcons
                            name={customAlert.type === 'error' ? 'alert-octagon-outline' : 'alert-circle-outline'}
                            size={22}
                            color={customAlert.type === 'error' ? '#F87171' : '#FBBF24'}
                            style={{ marginRight: 8, alignSelf: 'flex-start', marginTop: 2 }}
                        />
                        <View style={{ flex: 1 }}>
                            <Text style={styles.alertTitle}>{customAlert.title}</Text>
                            <Text style={styles.alertMessage}>{customAlert.message}</Text>
                        </View>
                    </View>
                )}

                {/* Opciones de Respuesta */}
                {currentQuestion.options.map((option, index) => {
                    const isSelected = selectedOption === index;
                    const isCorrectOption = index === currentQuestion.correctAnswerIndex;

                    let optionStyle = styles.optionButton;
                    let textStyle = styles.optionText;
                    let letterStyle = styles.optionLetter;

                    if (isSelected) {
                        if (isCorrectOption) {
                            optionStyle = [styles.optionButton, styles.optionCorrect];
                            textStyle = [styles.optionText, styles.textCorrect];
                            letterStyle = [styles.optionLetter, styles.textCorrect];
                        } else {
                            optionStyle = [styles.optionButton, styles.optionIncorrect];
                            textStyle = [styles.optionText, styles.textIncorrect];
                            letterStyle = [styles.optionLetter, styles.textIncorrect];
                        }
                    } else if (isAnsweredCorrectly && isCorrectOption) {
                        optionStyle = [styles.optionButton, styles.optionCorrect];
                        textStyle = [styles.optionText, styles.textCorrect];
                        letterStyle = [styles.optionLetter, styles.textCorrect];
                    }

                    return (
                        <TouchableOpacity
                            key={index}
                            style={optionStyle}
                            activeOpacity={0.7}
                            onPress={() => handleSelectOption(index)}
                        >
                            <View style={styles.letterContainer}>
                                <Text style={letterStyle}>{optionLetters[index]}</Text>
                            </View>
                            <Text style={textStyle}>{option}</Text>
                        </TouchableOpacity>
                    );
                })}

                {/* Botón Siguiente */}
                {isAnsweredCorrectly && (
                    <TouchableOpacity style={styles.nextButton} activeOpacity={0.8} onPress={handleNextQuestion}>
                        <Text style={styles.nextButtonText}>
                            {currentIndex < shuffledQuestions.length - 1 ? 'Siguiente Pregunta' : 'Ver Resultados Finales'}
                        </Text>
                        <MaterialCommunityIcons
                            name={currentIndex < shuffledQuestions.length - 1 ? 'arrow-right' : 'trophy-outline'}
                            size={20}
                            color="#0F172A"
                            style={{ marginLeft: 6 }}
                        />
                    </TouchableOpacity>
                )}

            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#0F172A',
        padding: 16,
        justifyContent: 'center',
    },
    loadingContainer: {
        flex: 1,
        backgroundColor: '#0F172A',
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        color: '#FFF',
        fontSize: 16,
    },
    card: {
        backgroundColor: '#1E293B',
        padding: 20,
        borderRadius: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 6,
    },
    progressContainer: {
        marginBottom: 16,
    },
    progressBarBackground: {
        height: 8,
        backgroundColor: '#334155',
        borderRadius: 4,
        overflow: 'hidden',
        marginBottom: 6,
    },
    progressBarFill: {
        height: '100%',
        backgroundColor: '#38BDF8',
        borderRadius: 4,
    },
    progressText: {
        fontSize: 12,
        color: '#94A3B8',
        textAlign: 'right',
        fontWeight: '600',
    },
    topicBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start',
        backgroundColor: '#334155',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 6,
        marginBottom: 12,
    },
    topicText: {
        fontSize: 12,
        color: '#38BDF8',
        fontWeight: '700',
    },
    statusBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    statusBadge: {
        flexDirection: 'row',
        backgroundColor: '#0F172A',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8,
        alignItems: 'center',
    },
    statusLabel: {
        fontSize: 12,
        color: '#94A3B8',
        marginRight: 4,
    },
    statusValue: {
        fontSize: 13,
        color: '#F8FAFC',
        fontWeight: 'bold',
    },
    questionText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#F8FAFC',
        marginBottom: 16,
        lineHeight: 24,
    },
    customAlertBox: {
        flexDirection: 'row',
        padding: 12,
        borderRadius: 10,
        borderWidth: 1,
        marginBottom: 16,
        alignItems: 'center',
    },
    alertError: {
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        borderColor: '#EF4444',
    },
    alertWarning: {
        backgroundColor: 'rgba(251, 191, 36, 0.1)',
        borderColor: '#FBBF24',
    },
    alertTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#F8FAFC',
        marginBottom: 2,
    },
    alertMessage: {
        fontSize: 13,
        color: '#CBD5E1',
        lineHeight: 18,
    },
    optionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#0F172A',
        borderWidth: 1.5,
        borderColor: '#334155',
        padding: 12,
        borderRadius: 10,
        marginBottom: 12,
    },
    letterContainer: {
        width: 32,
        height: 32,
        borderRadius: 6,
        backgroundColor: '#1E293B',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    optionLetter: {
        fontWeight: 'bold',
        fontSize: 15,
        color: '#38BDF8',
    },
    optionText: {
        fontSize: 14,
        color: '#E2E8F0',
        flex: 1,
        lineHeight: 20,
    },
    optionCorrect: {
        borderColor: '#22C55E',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
    },
    optionIncorrect: {
        borderColor: '#EF4444',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
    },
    textCorrect: {
        color: '#4ADE80',
    },
    textIncorrect: {
        color: '#F87171',
    },
    nextButton: {
        backgroundColor: '#38BDF8',
        padding: 16,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        shadowColor: '#38BDF8',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 4,
        elevation: 4,
    },
    nextButtonText: {
        color: '#0F172A',
        fontSize: 16,
        fontWeight: 'bold',
    },
});