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
let answeredCurrentQuestion = false; // Variável para controlar se a pergunta atual já foi respondida

// Função para carregar a pergunta atual
function loadQuestion() {
    const question = questions[currentQuestionIndex];
    document.getElementById('question').innerText = question.question;

    const answersContainer = document.getElementById('answers');
    answersContainer.innerHTML = ''; // Limpa as respostas anteriores

    // Reseta o estado de resposta para a nova pergunta
    answeredCurrentQuestion = false;
    document.getElementById('next-button').disabled = true; // Desabilita o botão "Próximo" até que uma resposta seja selecionada

    question.options.forEach((option, index) => {
        const answerElement = document.createElement('div');
        answerElement.classList.add('answer');
        answerElement.innerText = option;
        // Adiciona um listener para o clique que chama `checkAnswer`
        answerElement.onclick = () => checkAnswer(index, answerElement);
        answersContainer.appendChild(answerElement);
    });

    // Atualiza a pontuação exibida (caso o usuário volte ou reinicie o quiz)
    document.getElementById('score').innerText = `Pontuação: ${score}`;
}

// Função para verificar a resposta selecionada
function checkAnswer(selectedIndex, selectedElement) {
    // Se a pergunta atual já foi respondida, não faz nada (previne múltiplas seleções)
    if (answeredCurrentQuestion) {
        return;
    }

    answeredCurrentQuestion = true; // Marca a pergunta como respondida
    const correctAnswerIndex = questions[currentQuestionIndex].answer;
    const allAnswerElements = document.querySelectorAll('.answer');

    // Remove event listeners de todas as opções para evitar que o usuário clique novamente
    allAnswerElements.forEach(element => {
        element.onclick = null;
    });

    if (selectedIndex === correctAnswerIndex) {
        score++;
        selectedElement.classList.add('correct'); // Adiciona classe para estilizar a resposta correta
    } else {
        selectedElement.classList.add('incorrect'); // Adiciona classe para estilizar a resposta incorreta
        // Opcional: Mostra qual era a resposta correta
        allAnswerElements[correctAnswerIndex].classList.add('correct-feedback');
    }

    document.getElementById('score').innerText = `Pontuação: ${score}`;
    document.getElementById('next-button').disabled = false; // Habilita o botão "Próximo"
}

// Função para avançar para a próxima pergunta ou finalizar o quiz
function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion(); // Carrega a próxima pergunta
    } else {
        // Quiz finalizado
        document.getElementById('question').innerText = "Quiz finalizado! Você acertou " + score + " de " + questions.length + " perguntas.";
        document.getElementById('answers').innerHTML = ''; // Limpa as opções
        document.getElementById('next-button').style.display = 'none'; // Esconde o botão "Próximo"
        // Opcional: Adicionar um botão para reiniciar o quiz
        // const restartButton = document.createElement('button');
        // restartButton.innerText = 'Reiniciar Quiz';
        // restartButton.onclick = () => {
        //     currentQuestionIndex = 0;
        //     score = 0;
        //     document.getElementById('next-button').style.display = 'block';
        //     loadQuestion();
        // };
        // document.getElementById('quiz-container').appendChild(restartButton);
    }
}

// Garante que a primeira pergunta seja carregada quando a página terminar de carregar
window.onload = loadQuestion;