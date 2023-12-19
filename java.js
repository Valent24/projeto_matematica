
const quizData = [
  {
    question: 'Carla tem 2 euros a mais que Paula, Paula tem dois euros a mais que Leia e Leia tem dois euros a mais que Vivian. As 4 juntas possuem 48 euros. Quanto cada uma tem individualmente?',
    options: [' Carla tem 14, Paula tem 12, Leila tem 10 e Vivian tem 8.', ' Vivian tem 8, Leila tem 10, Paula tem 12 e Carla tem 14.', 'Carla tem 9, Paula tem 11, Leila tem 13 e Vivian tem 15.', ' Vivian tem 9, Leila tem 11, Paula tem 13 e Carla tem 15.'],
    answer: ' Vivian tem 9, Leila tem 11, Paula tem 13 e Carla tem 15.',
  },
  {
    question: 'Um maquinista de comboio ganha 100,00 € por viagem e só pode viajar a cada 4 dias. Ele ganha somente se fizer a viagem e sabe que estará de férias de 1º a 10 de junho, quando não poderá viajar. A primeira viagem ocorreu no primeiro dia de janeiro. Considere que o ano tem 365 dias. <br>Se o maquinista quiser ganhar o máximo possível, quantas viagens precisará fazer? ',
    options: ['37.', '51.', '88.', '91.'],
    answer: '88.',
  },
  {
    question: 'Em um congresso há 50 homens e 30 mulheres. Quantas comissões de 6 pessoas podemos formar, obedecendo a condição de que cada uma tenha 4 mulheres e 2 homens?',
    options: ['300 500 199 possibilidades de comissões.', '33 571 125 possibilidades de comissões.', ' 27 405 possibilidades de comissões.', '1225 possibilidades de comissões.'],
    answer: '33 571 125 possibilidades de comissões.',
  },
  {
    question: '3/5 de um número somados a ½ é igual a 2/3 desse mesmo número. Indique a opção que apresenta esse número.',
    options: [' 0.', '15/2.', ' 33/20.', '20/33.'],
    answer: '15/2.',
  },
  {
    question: 'Na minha família, que tem sete filhos, sou o mais novo, com 14 anos a menos que o filho mais velho da minha mãe. Entre nós, o quarto filho tem um terço da idade do irmão mais velho, somando-se a isso 7 anos. Se a soma das nossas três idades é 42, então a minha idade é um número.',
    options: [
      'primo.',
      'divisível por 3.',
      'par.',
      'divisível por 5.',
    ],
    answer: 'primo.',
  },
  {
    question: 'José ganhou um prémio no valor de 5.000,00 € e dividiu-o entre os seus três filhos da seguinte forma: Pedro recebeu 300,00 euros a menos do que João, que, por sua vez, recebeu 100,00 euros a mais do que António. Qual foi a quantia recebida por Pedro?',
    options: ['2.500,00 €.', '1.500,00 €.', '1.000,00 €.', '500,00 €. '],
    answer: '1.500,00 €.',
  },
  {
    question: 'Num projeto para a construção de um cinema, os arquitetos estão a avaliar a relação entre o número de fileiras e a quantidade de cadeiras em cada fileira. O plano inicial contempla uma sala para 304 pessoas. Se optarem por utilizar 19 fileiras, o número de cadeiras por fileira será...',
    options: [
      '14.',
      '15.',
      '16.',
      '12.',
    ],
    answer: '16.',
  },
  {
  question: 'A proprietária de uma lanchonete observou que, ao vender um menu por 10,00 reais, vende 200 deles por dia, e que, para cada redução de 1,00 real nesse preço, ela vende mais 100 menus. Nessas condições, qual é a receita máxima diária que ela espera obter com a venda desse menu?',
  options: [
    '4.000,00 €.',
    '3.600,00 €.',
    '4.800,00 €.',
    '2.000,00 €.',
  ],
  answer: '3.600,00 €.',
},

];

const quizContainer = document.getElementById('quiz');
const resultContainer = document.getElementById('result');
const submitButton = document.getElementById('submit');
const retryButton = document.getElementById('retry');
const showAnswerButton = document.getElementById('showAnswer');

let currentQuestion = 0;
let score = 0;
let incorrectAnswers = [];

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function displayQuestion() {
  const questionData = quizData[currentQuestion];

  const questionElement = document.createElement('div');
  questionElement.className = 'question';
  questionElement.innerHTML = questionData.question;

  const optionsElement = document.createElement('div');
  optionsElement.className = 'options';

  const shuffledOptions = [...questionData.options];
  shuffleArray(shuffledOptions);

  for (let i = 0; i < shuffledOptions.length; i++) {
    const option = document.createElement('label');
    option.className = 'option';

    const radio = document.createElement('input');
    radio.type = 'radio';
    radio.name = 'quiz';
    radio.value = shuffledOptions[i];

    const optionText = document.createTextNode(shuffledOptions[i]);

    option.appendChild(radio);
    option.appendChild(optionText);
    optionsElement.appendChild(option);
  }

  quizContainer.innerHTML = 'Pergunta' + ' '+ (currentQuestion +1);
  quizContainer.appendChild(questionElement);
  quizContainer.appendChild(optionsElement);
}

function checkAnswer() {
  const selectedOption = document.querySelector('input[name="quiz"]:checked');
  if (selectedOption) {
    const answer = selectedOption.value;
    if (answer === quizData[currentQuestion].answer) {
      score++;
    } else {
      incorrectAnswers.push({
        question: quizData[currentQuestion].question,
        incorrectAnswer: answer,
        correctAnswer: quizData[currentQuestion].answer,
      });
    }
    currentQuestion++;
    selectedOption.checked = false;
    if (currentQuestion < quizData.length) {
      displayQuestion();
    } else {
      displayResult();
    }
  }
}

function displayResult() {
  quizContainer.style.display = 'none';
  submitButton.style.display = 'none';
  retryButton.style.display = 'inline-block';
  showAnswerButton.style.display = 'inline-block';
  resultContainer.innerHTML = `Parabéns.<br> Pontuação <br> <h1>${score} / ${quizData.length}</h1>`;
}

function retryQuiz() {
  currentQuestion = 0;
  score = 0;
  incorrectAnswers = [];
  quizContainer.style.display = 'block';
  submitButton.style.display = 'inline-block';
  retryButton.style.display = 'none';
  showAnswerButton.style.display = 'none';
  resultContainer.innerHTML = '';
  displayQuestion();
}

function showAnswer() {
  quizContainer.style.display = 'none';
  submitButton.style.display = 'none';
  retryButton.style.display = 'inline-block';
  showAnswerButton.style.display = 'none';

  let incorrectAnswersHtml = '';
  for (let i = 0; i < incorrectAnswers.length; i++) {
    incorrectAnswersHtml += `
      <p>
        <strong class="question"> Pergunta :</strong> ${incorrectAnswers[i].question}<br><br>
        <strong class="question"> A tua resposta:</strong> ${incorrectAnswers[i].incorrectAnswer}<br><br>
        <b class= "question" >Resposta correta :</b> ${incorrectAnswers[i].correctAnswer}
        <hr style=" height: 2px;background-color: black;border: none;">
      </p>
    `;
  }

  resultContainer.innerHTML = `
    <p>Parabéns. <br> Pontuaste ${score} de ${quizData.length} perguntas!</p><br>
    <p>Respostas Incorretas:</p>
    ${incorrectAnswersHtml}
  `;
}

submitButton.addEventListener('click', checkAnswer);
retryButton.addEventListener('click', retryQuiz);
showAnswerButton.addEventListener('click', showAnswer);

displayQuestion();
