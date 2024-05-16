const questions = [
    {
        question: "Which is the largest animal in the world",
        answers: [
            {text: "Shark", correct: false},
            {text: "Blue whale", correct: true},
            {text: "Elephant", correct: false},
            {text: "Giraffe", correct: false}
        ]
    },
    {
        question: "What is the capital of France?",
        answers: [
            {text: "Berlin", correct: false},
            {text: "Madrid", correct: false},
            {text: "Paris", correct: true},
            {text: "Rome", correct: false}
        ]
    },
    {
        question: "Which planet is known as the Red Planet?",
        answers: [
            {text: "Earth", correct: false},
            {text: "Mars", correct: true},
            {text: "Jupiter", correct: false},
            {text: "Saturn", correct: false}
        ]
    },
    {
        question: "Who wrote 'Hamlet'?",
        answers: [
            {text: "Charles Dickens", correct: false},
            {text: "William Shakespeare", correct: true},
            {text: "Jane Austen", correct: false},
            {text: "Mark Twain", correct: false}
        ]
    },
    {
        question: "What is the chemical symbol for water?",
        answers: [
            {text: "H2O", correct: true},
            {text: "O2", correct: false},
            {text: "CO2", correct: false},
            {text: "NaCl", correct: false}
        ]
    },
    {
        question: "In which year did the Titanic sink?",
        answers: [
            {text: "1905", correct: false},
            {text: "1912", correct: true},
            {text: "1918", correct: false},
            {text: "1923", correct: false}
        ]
    },
    {
        question: "Which element has the atomic number 1?",
        answers: [
            {text: "Helium", correct: false},
            {text: "Hydrogen", correct: true},
            {text: "Oxygen", correct: false},
            {text: "Carbon", correct: false}
        ]
    },
    {
        question: "What is the square root of 144?",
        answers: [
            {text: "10", correct: false},
            {text: "11", correct: false},
            {text: "12", correct: true},
            {text: "13", correct: false}
        ]
    },
    {
        question: "Who painted the Mona Lisa?",
        answers: [
            {text: "Vincent van Gogh", correct: false},
            {text: "Pablo Picasso", correct: false},
            {text: "Leonardo da Vinci", correct: true},
            {text: "Claude Monet", correct: false}
        ]
    },
    {
        question: "What is the powerhouse of the cell?",
        answers: [
            {text: "Nucleus", correct: false},
            {text: "Ribosome", correct: false},
            {text: "Mitochondria", correct: true},
            {text: "Endoplasmic Reticulum", correct: false}
        ]
    },
    {
        question: "Who discovered penicillin?",
        answers: [
            {text: "Marie Curie", correct: false},
            {text: "Alexander Fleming", correct: true},
            {text: "Louis Pasteur", correct: false},
            {text: "Gregor Mendel", correct: false}
        ]
    },
    {
        question: "What is the capital city of Australia?",
        answers: [
            {text: "Sydney", correct: false},
            {text: "Melbourne", correct: false},
            {text: "Canberra", correct: true},
            {text: "Brisbane", correct: false}
        ]
    },
    {
        question: "What is the value of Pi up to two decimal places?",
        answers: [
            {text: "3.12", correct: false},
            {text: "3.14", correct: true},
            {text: "3.16", correct: false},
            {text: "3.18", correct: false}
        ]
    },
    {
        question: "In what year did World War II end?",
        answers: [
            {text: "1943", correct: false},
            {text: "1944", correct: false},
            {text: "1945", correct: true},
            {text: "1946", correct: false}
        ]
    },
    {
        question: "Who developed the theory of relativity?",
        answers: [
            {text: "Isaac Newton", correct: false},
            {text: "Albert Einstein", correct: true},
            {text: "Galileo Galilei", correct: false},
            {text: "Nikola Tesla", correct: false}
        ]
    },
    {
        question: "Which gas is most abundant in the Earth's atmosphere?",
        answers: [
            {text: "Oxygen", correct: false},
            {text: "Nitrogen", correct: true},
            {text: "Carbon Dioxide", correct: false},
            {text: "Hydrogen", correct: false}
        ]
    }
]


const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion()
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNO = currentQuestionIndex+1;
    questionElement.innerHTML = questionNO+". "+currentQuestion.question;

    currentQuestion.answers.forEach(answer=>{
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer)
    })
}

function resetState(){
    nextButton.style.display="none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild)
    }
}

function selectAnswer(e){
    const  selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct")
        score++
    }else{
        selectedBtn.classList.add("incorrect")
    }
    Array.from(answerButtons.children).forEach(button =>{
        if(button.dataset.correct==="true"){
            button.classList.add("correct")
        }
        button.disabled = true;
    });
    nextButton.style.display = "block"
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block"
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex<questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex<questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})

startQuiz()