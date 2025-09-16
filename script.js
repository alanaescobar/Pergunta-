const questions = [
    {
        question: "Quem foi o primeiro presidente do Brasil?",
        options: ["Getúlio Vargas", "Juscelino Kubitschek", "Marechal Deodoro", "Luiz Inácio Lula da Silva"],
        answer: 2
    },
    {
        question: "Qual é a fórmula química da água?",
        options: ["CO2", "H2O", "NaCl", "O2"],
        answer: 1
    },
    {
        question: "Quem escreveu 'Dom Casmurro'?",
        options: ["Machado de Assis", "José de Alencar", "Monteiro Lobato", "Clarice Lispector"],
        answer: 0
    },
    {
        question: "Qual a capital da França?",
        options: ["Londres", "Roma", "Paris", "Berlim"],
        answer: 2
    },
    {
        question: "O que é a fotossíntese?",
        options: [
            "Transformação de luz em energia",
            "Respiração das plantas",
            "Processo de digestão das plantas",
            "Processo de reprodução das plantas"
        ],
        answer: 0
    },
    {
        question: "Quem descobriu a teoria da evolução das espécies?",
        options: ["Galileu Galilei", "Charles Darwin", "Isaac Newton", "Albert Einstein"],
        answer: 1
    },
    {
        question: "Em que ano o Brasil se tornou independente?",
        options: ["1822", "1889", "1900", "1500"],
        answer: 0
    },
    {
        question: "Qual é a capital do Japão?",
        options: ["Pequim", "Seul", "Tóquio", "Bangkok"],
        answer: 2
    },
    {
        question: "Qual é o maior continente do mundo?",
        options: ["África", "Ásia", "América", "Antártica"],
        answer: 1
    },
    {
        question: "Qual é o elemento químico representado pelo símbolo O?",
        options: ["Oxigênio", "Ouro", "Ósmio", "Osmose"],
        answer: 0
    }
];

let currentQuestionIndex = 0;
let score = 0;

function loadQuestion() {
    const question = questions[currentQuestionIndex];
    document.getElementById('question').innerText = question.question;

    const answersContainer = document.getElementById('answers');
    answersContainer.innerHTML = '';

    question.options.forEach((option, index) => {
        const answerElement = document.createElement('div');
        answerElement.classList.add('answer');
        answerElement.innerText = option;
        answerElement.onclick = () => checkAnswer(index);
        answersContainer.appendChild(answerElement);
    });
}

function checkAnswer(selectedIndex) {
    const correctAnswerIndex = questions[currentQuestionIndex].answer;
    if (selectedIndex === correctAnswerIndex) {
        score++;
        document.getElementById('score').innerText = `Pontuação: ${score}`;
    }
    document.getElementById('next-button').disabled = false;
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
        document.getElementById('next-button').disabled = true;
    } else {
        document.getElementById('question').innerText = "Quiz finalizado! Você acertou " + score + " de " + questions.length + " perguntas.";
        document.getElementById('answers').innerHTML = '';
        document.getElementById('next-button').style.display = 'none';
    }
}

window.onload = loadQuestion;
