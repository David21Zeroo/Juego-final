// Estado del juego
let gameState = {
    player1: '',
    player2: '',
    currentPlayer: 1,
    currentQuestion: '',
    currentType: '',
    messages: []
};

// Base de preguntas y retos
const questions = {
    truth: [
        "¿Cuál es tu mayor miedo?",
        "¿Qué es lo que más te gusta de tu pareja?",
        "¿Cuál ha sido tu mayor fallo?",
        "¿Qué harías si tuvieras un día libre absoluto?",
        "¿Cuál es tu secreto más guardado?",
        "¿Qué momento con tu pareja fue el más especial?",
        "¿Qué cambiarías de ti mismo?",
        "¿Cuál es tu fantasía más loca?",
        "¿Alguna vez mentiste a tu pareja?",
        "¿Qué es lo que más te atrae de tu pareja?",
        "¿Cuál es tu mayor inseguridad?",
        "¿Qué te gustaría hacer juntos que nunca han hecho?",
        "¿Cuál es tu comida favorita?",
        "¿Qué película te hace llorar?",
        "¿Cuál es tu canción favorita?",
        "¿Qué harías si fueras invisible por un día?",
        "¿Cuál es tu lugar favorito en el mundo?",
        "¿Qué admiras más en tu pareja?"
    ],
    challenge: [
        "Baila sin música durante 30 segundos",
        "Canta una canción de amor a tu pareja",
        "Haz 10 flexiones",
        "Imita el acento de tu pareja",
        "Cuéntale un chiste a tu pareja",
        "Haz el mejor beso que puedas dar",
        "Salta en un pie durante 20 segundos",
        "Masajea los pies de tu pareja",
        "Recita un poema de amor",
        "Hace una carita ridícula y mantén 10 segundos",
        "Di 5 cosas que ames de tu pareja",
        "Canta la canción favorita de tu pareja",
        "Haz un juego de rol corto con tu pareja",
        "Dibuja a tu pareja con los ojos cerrados",
        "Prueba a hacer un truco acrobático",
        "Susurra algo romántico al oído de tu pareja",
        "Haz un baile atractivo para tu pareja",
        "Cuéntale tu momento favorito juntos"
    ]
};

// Iniciar el juego
function startGame() {
    const player1 = document.getElementById('player1Name').value.trim();
    const player2 = document.getElementById('player2Name').value.trim();

    if (!player1 || !player2) {
        alert('Por favor ingresa los nombres de ambos jugadores');
        return;
    }

    gameState.player1 = player1;
    gameState.player2 = player2;
    gameState.currentPlayer = 1;

    // Cambiar pantalla
    document.getElementById('startScreen').classList.remove('active');
    document.getElementById('gameScreen').classList.add('active');

    // Añadir mensaje inicial
    addSystemMessage(`¡Bienvenidos ${player1} y ${player2}!`);
    updatePlayerDisplay();
}

// Seleccionar Verdad
function selectTruth() {
    const randomIndex = Math.floor(Math.random() * questions.truth.length);
    gameState.currentQuestion = questions.truth[randomIndex];
    gameState.currentType = 'VERDAD';
    updateQuestionDisplay();
    addSystemMessage(`${getCurrentPlayerName()} seleccionó VERDAD`);
}

// Seleccionar Reto
function selectChallenge() {
    const randomIndex = Math.floor(Math.random() * questions.challenge.length);
    gameState.currentQuestion = questions.challenge[randomIndex];
    gameState.currentType = 'RETO';
    updateQuestionDisplay();
    addSystemMessage(`${getCurrentPlayerName()} seleccionó RETO`);
}

// Actualizar pantalla de pregunta
function updateQuestionDisplay() {
    document.getElementById('questionType').textContent = gameState.currentType;
    document.getElementById('questionText').textContent = gameState.currentQuestion;
}

// Siguiente turno
function nextTurn() {
    gameState.currentPlayer = gameState.currentPlayer === 1 ? 2 : 1;
    gameState.currentQuestion = '';
    gameState.currentType = '';
    document.getElementById('questionType').textContent = 'VERDAD';
    document.getElementById('questionText').textContent = 'Selecciona Verdad o Reto para comenzar';
    updatePlayerDisplay();
    addSystemMessage(`Turno de ${getCurrentPlayerName()}`);
}

// Actualizar nombre del jugador actual
function updatePlayerDisplay() {
    const currentName = gameState.currentPlayer === 1 ? gameState.player1 : gameState.player2;
    document.getElementById('currentPlayer').textContent = currentName;
}

// Obtener nombre del jugador actual
function getCurrentPlayerName() {
    return gameState.currentPlayer === 1 ? gameState.player1 : gameState.player2;
}

// Enviar mensaje
function sendMessage() {
    const messageInput = document.getElementById('messageInput');
    const message = messageInput.value.trim();

    if (!message) return;

    const playerClass = gameState.currentPlayer === 1 ? 'player1' : 'player2';
    addMessage(getCurrentPlayerName(), message, playerClass);
    messageInput.value = '';
    messageInput.focus();
}

// Añadir mensaje al chat
function addMessage(playerName, message, playerClass) {
    const chatMessages = document.getElementById('chatMessages');
    const messageElement = document.createElement('div');
    messageElement.className = `chat-message ${playerClass}`;
    messageElement.innerHTML = `<strong>${playerName}:</strong> ${message}`;
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Añadir mensaje del sistema
function addSystemMessage(message) {
    const chatMessages = document.getElementById('chatMessages');
    const messageElement = document.createElement('div');
    messageElement.className = 'chat-message system';
    messageElement.textContent = message;
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Manejar Enter en el input de mensaje
function handleMessageKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

// Reiniciar juego
function resetGame() {
    if (confirm('¿Estás seguro de que quieres iniciar un nuevo juego?')) {
        gameState = {
            player1: '',
            player2: '',
            currentPlayer: 1,
            currentQuestion: '',
            currentType: '',
            messages: []
        };
        document.getElementById('gameScreen').classList.remove('active');
        document.getElementById('startScreen').classList.add('active');
        document.getElementById('player1Name').value = '';
        document.getElementById('player2Name').value = '';
        document.getElementById('chatMessages').innerHTML = '';
        document.getElementById('messageInput').value = '';
    }
}
