import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { initDatabase } from './src/database/database';

import LoginScreen from './src/screens/LoginScreen';
import AuthorsScreen from './src/screens/AuthorsScreen';
import QuizScreen from './src/screens/QuizScreen';
import ResultsScreen from './src/screens/ResultsScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  useEffect(() => {
    // Inicializamos la base de datos SQLite al arrancar la app
    initDatabase();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerStyle: { backgroundColor: '#1E293B' }, // Color de fondo del header acorde a nuestro diseño oscuro
          headerTintColor: '#F8FAFC', // Color de las letras / flecha de retroceso
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        {/* Ocultamos la barra superior específicamente en la pantalla de Login */}
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ title: "Login" }}
        />

        <Stack.Screen
          name="Authors"
          component={AuthorsScreen}
          options={{ title: 'Información de Autores' }}
        />

        <Stack.Screen
          name="Quiz"
          component={QuizScreen}
          options={{ title: 'Quiz de Sistemas Operativos', headerLeft: () => null }}
        />

        <Stack.Screen
          name="Results"
          component={ResultsScreen}
          options={{ title: 'Calificación Final', headerLeft: () => null }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}