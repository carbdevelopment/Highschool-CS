const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainer = document.getElementById('quiz');
const startScreen = document.getElementById('start-screen');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const scoreContainer = document.getElementById('score-container');
const scoreElement = document.getElementById('score');
const restartButton = document.getElementById('restart-btn');

let shuffledQuestions, currentQuestionIndex, score;

const questions = [
    {
        question: 'Când și-a declarat independența Republica Moldova față de URSS?',
        answers: [
            { text: '1991', correct: true },
            { text: '1989', correct: false },
            { text: '1996', correct: false },
            { text: '1978', correct: false }
        ]
    },
    {
        question: 'Care este capitala Republicii Moldova?',
        image: 'images/chisinau.jpg',
        answers: [
            { text: 'Tiraspol', correct: false },
            { text: 'Chișinău', correct: true },
            { text: 'Cahul', correct: false },
            { text: 'Bălți', correct: false }
        ]
    },
    {
        question: 'Ce eveniment istoric important a avut loc în 1918 în Basarabia?',
        answers: [
            { text: 'S-a unit cu România', correct: true },
            { text: 'A devenit independentă', correct: false },
            { text: 'A fost anexată de URSS', correct: false },
            { text: 'A devenit regat', correct: false }
        ]
    },
    {
        question: 'În ce an a fost adoptată Constituția Republicii Moldova?',
        answers: [
            { text: '1991', correct: false },
            { text: '1993', correct: false },
            { text: '1995', correct: false },
            { text: '1994', correct: true }
        ]
    },
    {
        question: 'Care este semnificația datei de 2 martie 1992 în istoria Republicii Moldova?',
        answers: [
            { text: 'Aderarea la ONU', correct: false },
            { text: 'Adoptarea drapelului național', correct: false },
            { text: 'Începerea conflictului din Transnistria', correct: true },
            { text: 'Semnarea tratatului cu România', correct: false }
        ]
    },
    {
        question: 'Ce alfabet a fost reintrodus în Republica Moldova în 1989?',
        answers: [
            { text: 'Alfabetul latin', correct: true },
            { text: 'Alfabetul grecesc', correct: false },
            { text: 'Alfabetul chirilic', correct: false },
        ]
    },
    {
        question: 'Ce funcție a avut Ion Inculeț în perioada unirii Basarabiei cu România?',
        image: 'images/ion-inculet.jpg',
        answers: [
            { text: 'Ministru al Apărării', correct: false },
            { text: 'Reprezentant al URSS', correct: false },
            { text: 'Președinte al Sfatului Țării', correct: true },
            { text: 'Prim-ministru al Moldovei', correct: false },
        ]
    }, 
    {
        question: 'În ce an a fost semnat acordul de asociere între Republica Moldova și Uniunea Europeană?',
        answers: [
            { text: '2009', correct: false },
            { text: '2011', correct: false },
            { text: '2014', correct: true },
            { text: '1964', correct: false },
            { text: '2002', correct: false },
        ]
    }, 
    {
        question: 'În ce an a avut loc Pactul Ribbentrop-Molotov?',
        answers: [
            { text: '1933', correct: false },
            { text: '1940', correct: false },
            { text: '1939', correct: true },
            { text: '1952', correct: false },
            { text: '1928', correct: false },
        ]
    }, 
    {
        question: 'Cine a fost primul președinte al Republicii Moldova?',
        image: 'images/mircea-snegur.jpg',
        answers: [
            { text: 'Vladimir Voronin', correct: false },
            { text: 'Mircea Snegur', correct: true },
            { text: 'Petru Lucinschi', correct: false },
            { text: 'Andrei Sangheli', correct: false },
        ]
    }, 

];

startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    setNextQuestion();
});
restartButton.addEventListener('click', startGame);

function startGame() {
    startScreen.classList.add('hide');
    shuffledQuestions = questions.sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0;
    score = 0;
    questionContainer.classList.remove('hide');
    scoreContainer.classList.add('hide');
    setNextQuestion();
}

function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    if (question.image) {
        const img = document.createElement('img');
        img.src = question.image;
        questionElement.appendChild(img);
    }
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

function resetState() {
    nextButton.classList.add('hide');
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
    while (questionElement.firstChild) {
        questionElement.removeChild(questionElement.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;
    
    if (correct) score += 20; 

    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct);
    });

    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide');
    } else {
        showScore();
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }
    element.disabled = true;
}

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

function showScore() {
    questionContainer.classList.add('hide');
    scoreContainer.classList.remove('hide');
    scoreElement.innerText = score;
}