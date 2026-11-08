import * as SQLite from 'expo-sqlite';

// Abrir o conectar a la base de datos local
export const getDBConnection = async () => {
    return await SQLite.openDatabaseAsync('quiz_sistemas.db');
};

// Crear las tablas si no existen
export const initDatabase = async () => {
    try {
        const db = await getDBConnection();
        await db.execAsync(`
      PRAGMA journal_mode = WAL;
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL
      );
      CREATE TABLE IF NOT EXISTS scores (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL,
        score REAL NOT NULL,
        date TEXT NOT NULL
      );
    `);
        console.log('Base de datos inicializada correctamente');
    } catch (error) {
        console.error('Error al inicializar la base de datos:', error);
    }
};

// Registrar un nuevo usuario
export const registerUser = async (username, password) => {
    try {
        const db = await getDBConnection();
        await db.runAsync(
            'INSERT INTO users (username, password) VALUES (?, ?);',
            username,
            password
        );
        return { success: true };
    } catch (error) {
        return { success: false, message: 'El usuario ya existe o ocurrió un error.' };
    }
};

// Validar inicio de sesión
export const loginUser = async (username, password) => {
    try {
        const db = await getDBConnection();
        const user = await db.getFirstAsync(
            'SELECT * FROM users WHERE username = ? AND password = ?;',
            username,
            password
        );
        return user; // Retorna el objeto del usuario si existe, o null si no
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        return null;
    }
};

// Guardar calificación del quiz
export const saveScore = async (username, score) => {
    try {
        const db = await getDBConnection();
        const date = new Date().toLocaleString();
        await db.runAsync(
            'INSERT INTO scores (username, score, date) VALUES (?, ?, ?);',
            username,
            score,
            date
        );
    } catch (error) {
        console.error('Error al guardar puntaje:', error);
    }
};