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
const character = document.getElementById('character');
const sadCharacter = document.getElementById('sad-character');

// Event Listeners
startBtn.addEventListener('click', startQuiz);
nextBtn.addEventListener('click', nextQuestion);
restartBtn.addEventListener('click', restartQuiz);

// Start Quiz
function startQuiz() {
    welcomeScreen.style.animation = 'fadeOut 0.4s ease-out';
    setTimeout(() => {
        welcomeScreen.classList.remove('active');
        quizScreen.classList.add('active');
        currentQuestion = 0;
        score = 0;
        loadQuestion();
    }, 400);
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
    
    // Reset next button
    nextBtn.disabled = true;
    nextBtn.style.opacity = '';

    // Reset container animation
    questionText.style.animation = '';
    optionsContainer.style.opacity = '1';
    
    // Create options with stagger animation
    question.options.forEach((option, index) => {
        const optionElement = document.createElement('div');
        optionElement.className = 'option';
        optionElement.textContent = option;
        optionElement.style.opacity = '0';
        optionElement.style.transform = 'translateY(15px)';
        optionElement.addEventListener('click', () => selectAnswer(index));
        optionsContainer.appendChild(optionElement);
        
        // Stagger animation with easing
        setTimeout(() => {
            optionElement.style.transition = 'opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1), transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
            optionElement.style.opacity = '1';
            optionElement.style.transform = 'translateY(0)';
        }, index * 60);
    });
}

// Select Answer
function selectAnswer(index) {
    if (selectedAnswer !== null) return; // Prevent re-selection

    selectedAnswer = index;
    const options = document.querySelectorAll('.option');
    
    // Add selected state immediately for feedback
    options.forEach((option, i) => {
        option.classList.remove('selected');
        if (i === index) {
            option.classList.add('selected');
        }
    });

    // Show feedback after a brief delay for better UX
    setTimeout(() => {
        // Check if correct
        if (index === questions[currentQuestion].correct) {
            score++;
            options[index].classList.remove('selected');
            options[index].classList.add('correct');
        } else {
            options[index].classList.remove('selected');
            options[index].classList.add('incorrect');
            options[questions[currentQuestion].correct].classList.add('correct');
        }
        
        // Enable next button after showing feedback
        nextBtn.disabled = false;
        nextBtn.style.opacity = '1';
    }, 300);
}

// Next Question
function nextQuestion() {
    // Add transition effect
    questionText.style.animation = 'fadeOut 0.3s ease-out';
    optionsContainer.style.opacity = '0';
    
    setTimeout(() => {
        currentQuestion++;
        
        if (currentQuestion < questions.length) {
            loadQuestion();
        } else {
            showResults();
        }
    }, 300);
}

// Get Character Based on Score
function getCharacter(score) {
    if (score === 10) {
        return { emoji: '🌟', message: 'Perfect Score! You\'re a UX Master!' };
    } else if (score === 9) {
        return { emoji: '🎉', message: 'Amazing! You\'re almost perfect!' };
    } else if (score === 8) {
        return { emoji: '🎊', message: 'Excellent work! You really know your stuff!' };
    } else if (score === 7) {
        return { emoji: '😊', message: 'Great job! You have strong UX knowledge!' };
    } else if (score === 6) {
        return { emoji: '👍', message: 'Good work! Keep up the learning!' };
    } else if (score === 5) {
        return { emoji: '🤔', message: 'Not bad! There\'s room to grow!' };
    } else if (score === 4) {
        return { emoji: '💪', message: 'Keep practicing! You\'re getting there!' };
    } else if (score === 3) {
        return { emoji: '📚', message: 'Learning is a journey! Keep studying!' };
    } else if (score === 2) {
        return { emoji: '🔍', message: 'Don\'t give up! Review and try again!' };
    } else if (score === 1) {
        return { emoji: '🌱', message: 'Every expert started as a beginner!' };
    } else {
        return { emoji: '💡', message: 'Time to dive into UX fundamentals!' };
    }
}

// Show Results
function showResults() {
    quizScreen.classList.remove('active');
    
    // Small delay for smooth transition
    setTimeout(() => {
        resultsScreen.classList.add('active');

        const characterData = getCharacter(score);

        if (score > 5) {
            certificate.classList.remove('hidden');
            sadResult.classList.add('hidden');
            finalScore.textContent = score;
            character.textContent = characterData.emoji;
            // Update message if needed
            const messageEl = document.querySelector('.certificate-message');
            if (messageEl) {
                messageEl.textContent = characterData.message;
            }
        } else {
            certificate.classList.add('hidden');
            sadResult.classList.remove('hidden');
            sadScore.textContent = score;
            sadCharacter.textContent = characterData.emoji;
            // Update message
            const messageEl = document.querySelector('.sad-message');
            if (messageEl) {
                messageEl.textContent = characterData.message;
            }
        }
    }, 300);
}

// Restart Quiz
function restartQuiz() {
    resultsScreen.style.animation = 'fadeOut 0.4s ease-out';
    setTimeout(() => {
        resultsScreen.classList.remove('active');
        welcomeScreen.classList.add('active');
        certificate.classList.add('hidden');
        sadResult.classList.add('hidden');
        currentQuestion = 0;
        score = 0;
        progressFill.style.width = '0%';
        welcomeScreen.style.animation = 'welcomeSlideIn 0.7s cubic-bezier(0.16, 1, 0.3, 1)';
    }, 400);
}

