# Quiz de Sistemas Operativos 📱💻

Aplicación móvil desarrollada con **React Native** y **Expo** para poner a prueba conocimientos sobre conceptos de Sistemas Operativos. Incluye gestión de sesiones/registro local, base de datos integrada con **SQLite** (`expo-sqlite`), preguntas interactivas, pantalla de resultados y vista de autores.

---

## 📋 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado en tu computadora:

- [Node.js](https://nodejs.org/) (versión 18 o superior recomendada).
- Gestor de paquetes `npm` (incluido con Node.js).
- En tu teléfono móvil (recomendado): la aplicación **Expo Go** disponible en [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent) (Android) o [App Store](https://apps.apple.com/app/expo-go/id982107779) (iOS).
- *(Opcional)*: Android Studio (con emulador configurado) o Xcode (en macOS para simulador iOS).

---

## 🚀 Instalación y Puesta en Marcha

Sigue estos pasos para ejecutar el proyecto localmente:

### 1. Clonar o abrir el proyecto
Abre una terminal en la carpeta raíz del proyecto:
```bash
cd QuizSistemasOperativos
```

### 2. Instalar dependencias
Instala los paquetes necesarios definidos en el proyecto:
```bash
npm install
```

### 3. Iniciar el servidor de desarrollo
Ejecuta el siguiente comando para arrancar Expo CLI:
```bash
npx expo start
```
*(También puedes usar `npm start`)*

---

## 📲 ¿Cómo visualizar y probar la aplicación?

Una vez iniciado el servidor, verás un código QR y una serie de opciones en la terminal:

### Opción A: En tu celular con Expo Go (Recomendado)
1. Conecta tu teléfono a la **misma red Wi-Fi** que tu computadora.
2. Abre la app **Expo Go**:
   - **En Android**: Pulsa en *"Scan QR Code"* y escanea el código mostrado en la terminal.
   - **En iOS**: Abre la app de *Cámara*, enfoca el código QR y toca la notificación emergente para abrir Expo Go.

### Opción B: En Emulador / Simulador
- **Android**: Presiona la tecla `a` en la terminal (requiere tener el emulador de Android abierto o configurado).
- **iOS** (macOS): Presiona la tecla `i` en la terminal.

### Opción C: En el navegador Web
- Presiona la tecla `w` en la terminal.
  > **Nota**: Dado que la aplicación utiliza persistencia nativa con `expo-sqlite`, se recomienda probarla prioritariamente en **Expo Go** o en un emulador Android/iOS para una experiencia completa.

---

## ⌨️ Atajos útiles en la terminal de Expo

Durante la ejecución del servidor puedes presionar:
- `r` — Recargar la aplicación (*Reload*).
- `m` — Alternar el menú de desarrollador en el dispositivo.
- `c` — Limpiar la salida de la consola.
- `Ctrl + C` — Detener el servidor de desarrollo.

---

## 📂 Estructura Principal del Proyecto

```text
QuizSistemasOperativos/
├── assets/                  # Imágenes, iconos y recursos multimedia
├── src/
│   ├── data/                # Banco de preguntas del quiz (questions.js)
│   ├── database/            # Inicialización y queries de SQLite (database.js)
│   └── screens/             # Pantallas de la app
│       ├── LoginScreen.js       # Registro e inicio de sesión
│       ├── QuizScreen.js        # Desarrollo del cuestionario
│       ├── ResultsScreen.js     # Puntaje y estadísticas finales
│       └── AuthorsScreen.js     # Créditos e información de los autores
├── App.js                   # Configuración del navegador (React Navigation) y tema
├── app.json                 # Configuración de Expo y plugins
└── package.json             # Dependencias y scripts de ejecución
```

