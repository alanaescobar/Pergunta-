document.addEventListener("DOMContentLoaded", function () {
  const quizData = [
    {
      question: "Qual é a fórmula de Bhaskara?",
      answers: ["x = (-b ± √(b² - 4ac)) / 2a", "x = b² - 4ac", "x = a² + b²", "x = a + b / c"],
      correct: 0
    },
    {
      question: "Quem proclamou a independência do Brasil?",
      answers: ["Dom Pedro I", "Tiradentes", "Getúlio Vargas", "Dom João VI"],
      correct: 0
    },
    {
      question: "O que é um advérbio?",
      answers: [
        "Palavra que modifica um verbo, adjetivo ou outro advérbio",
        "Palavra que nomeia objetos",
        "Palavra que substitui o nome",
        "Palavra que indica ação"
      ],
      correct: 0
    },
    {
      question: "Qual é a capital do Tocantins?",
      answers: ["Palmas", "Boa Vista", "Macapá", "Porto Velho"],
      correct: 0
    },
    {
      question: "Qual é a função principal dos ribossomos?",
      answers: ["Produção de proteínas", "Respiração celular", "Digestão", "Armazenar energia"],
      correct: 0
    },
    {
      question: "O que representa a tabela periódica?",
      answers: [
        "Classificação dos elementos químicos",
        "Organização de números inteiros",
        "Sistema métrico",
        "Gráfico de temperatura"
      ],
      correct: 0
    },
    {
      question: "Qual foi o estopim da Primeira Guerra Mundial?",
      answers: [
        "Assassinato do arquiduque Francisco Ferdinando",
        "Invasão da Polônia",
        "Queda da bolsa de Nova York",
        "Revolução Francesa"
      ],
      correct: 0
    },
    {
      question: "O que é um número primo?",
      answers: [
        "Número divisível apenas por 1 e por ele mesmo",
        "Número par",
        "Número ímpar",
        "Número múltiplo de 10"
      ],
      correct: 0
    },
    {
      question: "Quem escreveu 'Dom Casmurro'?",
      answers: ["Machado de Assis", "José de Alencar", "Clarice Lispector", "Manuel Bandeira"],
      correct: 0
    },
    {
      question: "O que é fotossíntese?",
      answers: [
        "Processo de produção de energia pelas plantas",
        "Formação de nuvens",
        "Respiração celular animal",
        "Reprodução das células"
      ],
      correct: 0
    },
    {
      question: "Qual é a diferença entre massa e peso?",
      answers: [
        "Massa é constante, peso depende da gravidade",
        "Peso é constante, massa depende da altura",
        "Ambos são iguais",
        "Peso é a medida em kg, massa em N"
      ],
      correct: 0
    },
    {
      question: "O que foi o Iluminismo?",
      answers: [
        "Movimento filosófico que valorizava a razão",
        "Período da escravidão africana",
        "Início da Idade Média",
        "Conquista do Brasil pelos portugueses"
      ],
      correct: 0
    }
  ];

  const quiz = document.getElementById("quiz");
  const nextBtn = document.getElementById("next-btn");
  const result = document.getElementById("result");
  const scoreEl = document.getElementById("score");
  const message = document.getElementById("message");

  let currentQuestion = 0;
  let score = 0;
  let answered = false;

  function showQuestion() {
    quiz.innerHTML = "";
    nextBtn.classList.add("hide");
    answered = false;

    const q = quizData[currentQuestion];
    const questionEl = document.createElement("h2");
    questionEl.textContent = q.question;
    quiz.appendChild(questionEl);

    q.answers.forEach((ans, idx) => {
      const btn = document.createElement("button");
      btn.classList.add("answer");
      btn.textContent = ans;
      btn.addEventListener("click", () => selectAnswer(btn, idx));
      quiz.appendChild(btn);
    });
  }

  function selectAnswer(button, idx) {
    if (answered) return;
    answered = true;

    const q = quizData[currentQuestion];
    const buttons = document.querySelectorAll(".answer");

    buttons.forEach((btn, i) => {
      btn.disabled = true;
      if (i === q.correct) {
        btn.style.backgroundColor = "#2ecc71";
      } else if (btn === button) {
        btn.style.backgroundColor = "#e74c3c";
      }
    });

    if (idx === q.correct) {
      score++;
    }

    nextBtn.classList.remove("hide");
  }

  nextBtn.addEventListener("click", () => {
    currentQuestion++;
    if (currentQuestion < quizData.length) {
      showQuestion();
    } else {
      showResult();
    }
  });

  function showResult() {
    quiz.classList.add("hide");
    nextBtn.classList.add("hide");
    result.classList.remove("hide");
    scoreEl.textContent = score;

    if (score === 12) {
      message.textContent = "Parabéns! Você acertou todas! 🎉";
    } else if (score >= 8) {
      message.textContent = "Muito bem! Você foi ótimo!";
    } else if (score >= 5) {
      message.textContent = "Bom esforço! Mas dá pra melhorar.";
    }
