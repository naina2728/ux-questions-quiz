// Quiz Questions
const questions = [
    {
        question: "What is the primary goal of user-centered design?",
        options: [
            "To make products look beautiful",
            "To prioritize user needs and create intuitive experiences",
            "To use the latest design trends",
            "To minimize development costs"
        ],
        correct: 1
    },
    {
        question: "What does 'affordance' mean in UX design?",
        options: [
            "The cost of a design feature",
            "A visual cue that suggests how an object should be used",
            "The time it takes to complete a task",
            "The number of clicks needed to reach a page"
        ],
        correct: 1
    },
    {
        question: "What is the recommended maximum number of items in a navigation menu?",
        options: [
            "5-7 items",
            "10-12 items",
            "15-20 items",
            "As many as needed"
        ],
        correct: 0
    },
    {
        question: "What is the purpose of a user persona?",
        options: [
            "To show design skills to clients",
            "To represent a fictional user based on research to guide design decisions",
            "To track user analytics",
            "To create marketing materials"
        ],
        correct: 1
    },
    {
        question: "What does 'progressive disclosure' mean?",
        options: [
            "Showing all information at once",
            "Revealing information gradually to reduce cognitive load",
            "Hiding important features",
            "Using progressive web apps"
        ],
        correct: 1
    },
    {
        question: "What is the 'F-pattern' in UX design?",
        options: [
            "A design layout pattern",
            "A common eye-tracking pattern showing how users scan content",
            "A color scheme",
            "A typography style"
        ],
        correct: 1
    },
    {
        question: "What is the main purpose of usability testing?",
        options: [
            "To make the product look better",
            "To observe real users interacting with a product and identify issues",
            "To increase website traffic",
            "To reduce server costs"
        ],
        correct: 1
    },
    {
        question: "What does 'cognitive load' refer to?",
        options: [
            "Server processing power",
            "The amount of mental effort required to use a product",
            "The file size of images",
            "The number of pages in a website"
        ],
        correct: 1
    },
    {
        question: "What is the '3-click rule' in UX?",
        options: [
            "Users should be able to find any information within 3 clicks",
            "Users should click 3 times before purchasing",
            "Users need 3 clicks to log in",
            "There should be 3 navigation levels"
        ],
        correct: 0
    },
    {
        question: "What is the difference between UX and UI?",
        options: [
            "They are the same thing",
            "UX focuses on the overall experience, while UI focuses on visual design",
            "UX is for web, UI is for mobile",
            "UX is free, UI costs money"
        ],
        correct: 1
    }
];

// Quiz State
let currentQuestion = 0;
let score = 0;
let selectedAnswer = null;

// DOM Elements
const welcomeScreen = document.getElementById('welcome-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultsScreen = document.getElementById('results-screen');
const startBtn = document.getElementById('start-btn');
const nextBtn = document.getElementById('next-btn');
const restartBtn = document.getElementById('restart-btn');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const currentQuestionSpan = document.getElementById('current-question');
const progressFill = document.getElementById('progress');
const certificate = document.getElementById('certificate');
const sadResult = document.getElementById('sad-result');
const finalScore = document.getElementById('final-score');
const sadScore = document.getElementById('sad-score');

// Event Listeners
startBtn.addEventListener('click', startQuiz);
nextBtn.addEventListener('click', nextQuestion);
restartBtn.addEventListener('click', restartQuiz);

// Start Quiz
function startQuiz() {
    welcomeScreen.classList.remove('active');
    quizScreen.classList.add('active');
    currentQuestion = 0;
    score = 0;
    loadQuestion();
}

// Load Question
function loadQuestion() {
    const question = questions[currentQuestion];
    questionText.textContent = question.question;
    optionsContainer.innerHTML = '';
    selectedAnswer = null;
    nextBtn.disabled = true;

    // Update progress
    const progress = ((currentQuestion + 1) / questions.length) * 100;
    progressFill.style.width = progress + '%';
    currentQuestionSpan.textContent = currentQuestion + 1;

    // Create options
    question.options.forEach((option, index) => {
        const optionElement = document.createElement('div');
        optionElement.className = 'option';
        optionElement.textContent = option;
        optionElement.addEventListener('click', () => selectAnswer(index));
        optionsContainer.appendChild(optionElement);
    });
}

// Select Answer
function selectAnswer(index) {
    if (selectedAnswer !== null) return; // Prevent re-selection

    selectedAnswer = index;
    const options = document.querySelectorAll('.option');
    
    options.forEach((option, i) => {
        option.classList.remove('selected');
        if (i === index) {
            option.classList.add('selected');
        }
    });

    nextBtn.disabled = false;

    // Check if correct
    if (index === questions[currentQuestion].correct) {
        score++;
        options[index].classList.add('correct');
    } else {
        options[index].classList.add('incorrect');
        options[questions[currentQuestion].correct].classList.add('correct');
    }
}

// Next Question
function nextQuestion() {
    currentQuestion++;
    
    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
        showResults();
    }
}

// Show Results
function showResults() {
    quizScreen.classList.remove('active');
    resultsScreen.classList.add('active');

    if (score > 5) {
        certificate.classList.remove('hidden');
        sadResult.classList.add('hidden');
        finalScore.textContent = score;
    } else {
        certificate.classList.add('hidden');
        sadResult.classList.remove('hidden');
        sadScore.textContent = score;
    }
}

// Restart Quiz
function restartQuiz() {
    resultsScreen.classList.remove('active');
    welcomeScreen.classList.add('active');
    certificate.classList.add('hidden');
    sadResult.classList.add('hidden');
    currentQuestion = 0;
    score = 0;
    progressFill.style.width = '0%';
}

