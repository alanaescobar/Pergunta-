// Array de objetos para armazenar as perguntas, opções e respostas corretas
const questions = [
    {
        question: "Qual é a capital do Canadá?",
        options: ["Toronto", "Vancouver", "Ottawa", "Montreal"],
        answer: "Ottawa",
        subject: "Geografia"
    },
    {
        question: "Quem escreveu 'Dom Casmurro'?",
        options: ["Machado de Assis", "José de Alencar", "Clarice Lispector", "Carlos Drummond de Andrade"],
        answer: "Machado de Assis",
        subject: "Português"
    },
    {
        question: "Qual é o resultado de \\( \\sqrt{144} + 3^2 - 5 \\) ?",
        options: ["16", "12", "18", "14"],
        answer: "16", // 12 + 9 - 5 = 16
        subject: "Matemática"
    },
    {
        question: "Em que ano o Brasil proclamou a República?",
        options: ["1822", "1889", "1900", "1891"],
        answer: "1889",
        subject: "História"
    },
    {
        question: "Qual o principal gás responsável pelo efeito estufa?",
        options: ["Oxigênio", "Nitrogênio", "Gás Carbônico", "Metano"],
        answer: "Gás Carbônico",
        subject: "Ciências (Biologia/Química)"
    },
    {
        question: "Qual das seguintes palavras é um sinônimo de 'efêmero'?",
        options: ["Duradouro", "Transitório", "Eterno", "Constante"],
        answer: "Transitório",
        subject: "Português"
    },
    {
        question: "Se um carro viaja a uma velocidade constante de 60 km/h, quanto tempo levará para percorrer 180 km?",
        options: ["2 horas", "3 horas", "4 horas", "5 horas"],
        answer: "3 horas", // 180 / 60 = 3
        subject: "Matemática/Física"
    },
    {
        question: "Qual é o maior oceano do mundo?",
        options: ["Oceano Atlântico", "Oceano Índico", "Oceano Ártico", "Oceano Pacífico"],
        answer: "Oceano Pacífico",
        subject: "Geografia"
    },
    {
        question: "What is the past tense of 'go'?",
        options: ["goed", "gone", "went", "going"],
        answer: "went",
        subject: "Inglês"
    },
    {
        question: "Qual é o planeta mais próximo do Sol?",
        options: ["Vênus", "Marte", "Mercúrio", "Terra"],
        answer: "Mercúrio",
        subject: "Ciências (Astronomia)"
    },
    {
        question: "Quantos elementos químicos a tabela periódica possui atualmente?",
        options: ["108", "112", "118", "120"],
        answer: "118",
        subject: "Ciências (Química)"
    },
    {
        question: "Quem foi o primeiro presidente do Brasil?",
        options: ["Dom Pedro I", "Deodoro da Fonseca", "Floriano Peixoto", "Getúlio Vargas"],
        answer: "Deodoro da Fonseca",
        subject: "História"
    }
];

// Elementos do DOM
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const nextButton = document.getElementById('next-btn');
const restartButton = document.getElementById('restart-btn');
const scoreSpan = document.getElementById('score');
const totalQuestionsSpan = document.getElementById('total-questions');

let currentQuestionIndex = 0;
let score = 0;
let selectedOption = null; // Para armazenar a opção selecionada pelo usuário

// Função para embaralhar um array (Fisher-Yates shuffle)
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Inicia o quiz embaralhando as perguntas
shuffleArray(questions);

// Função para carregar a próxima pergunta
function loadQuestion() {
    // Garante que o botão "Próxima Pergunta" está desabilitado no início de cada questão
    nextButton.disabled = true;
    // Remove classes de feedback de respostas anteriores
    Array.from(optionsContainer.children).forEach(button => {
        button.classList.remove('correct', 'incorrect');
        button.disabled = false; // Habilita os botões de opção
    });

    if (currentQuestionIndex < questions.length) {
        const currentQuestion = questions[currentQuestionIndex];
        questionText.textContent = currentQuestion.question;
        optionsContainer.innerHTML = ''; // Limpa as opções anteriores

        // Embaralha as opções para que a resposta correta não esteja sempre na mesma posição
        const shuffledOptions = [...currentQuestion.options];
        shuffleArray(shuffledOptions);

        shuffledOptions.forEach(option => {
            const button = document.createElement('button');
            button.classList.add('option-btn');
            button.textContent = option;
            button.dataset.option = option; // Armazena a opção no dataset do botão
            button.addEventListener('click', selectOption);
            optionsContainer.appendChild(button);
        });
    } else {
        showResult();
    }
}

// Função para selecionar uma opção
function selectOption(event) {
    // Desabilita todos os botões de opção após a seleção
    Array.from(optionsContainer.children).forEach(button => {
        button.disabled = true;
    });

    selectedOption = event.target;
    const userAnswer = selectedOption.dataset.option;
    const correctAnswer = questions[currentQuestionIndex].answer;

    if (userAnswer === correctAnswer) {
        score++;
        selectedOption.classList.add('correct');
    } else {
        selectedOption.classList.add('incorrect');
        // Opcional: Mostrar a resposta correta
        Array.from(optionsContainer.children).forEach(button => {
            if (button.dataset.option === correctAnswer) {
                button.classList.add('correct');
            }
        });
    }
    nextButton.disabled = false; // Habilita o botão "Próxima Pergunta"
}

// Função para ir para a próxima pergunta
function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        showResult();
    }
}

// Função para mostrar o resultado final
function showResult() {
    quizScreen.style.display = 'none