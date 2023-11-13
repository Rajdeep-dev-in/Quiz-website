let sendQuestion = document.querySelector(".question");
let subject = document.querySelector(".subject");
let option_body = document.querySelector(".option-body")
let option_list = document.querySelectorAll(".option-list")
let checkBtn = document.querySelector("#check_btn")
let  resetBtn = document.getElementById("again-btn")
let resultArea = document.querySelector(".result-area");
let currentquestion = document.querySelector("#current_question");
let totalquestion = document.querySelector("#total_question");

let correct_answer = "" , correct_score = askQuestion = 0 , totalQuestion = 10;


 const generateQuestion = async () =>{
    let urldata = await fetch("https://opentdb.com/api.php?amount=10&category=21&difficulty=easy&type=multiple");
    let passData = await urldata.json();
    console.log(passData);
    loadData(passData.results[0])
}
const loadData = (passData) =>{
    checkBtn.disabled = false;
    correct_answer = passData.correct_answer;
    console.log(correct_answer);
    let incorrect_answers = passData.incorrect_answers;
    // console.log(incorrect_answers);
    let optionList = incorrect_answers;
    console.log(optionList);
    optionList.splice(Math.floor(Math.random() * (incorrect_answers.length + 1 )) , 0 , correct_answer);
    console.log(optionList);
    option_body.innerHTML = `${optionList.map((option) =>  `<li class="option-list ">${option}</li>`).join('')}`
    let question = passData.question;
    sendQuestion.innerHTML = `${question}`;
    let catagory = passData.category;
    subject.innerHTML = `${catagory}`;
    selectOption()
    //checkAnswer()
}



function selectOption(){
    option_body.querySelectorAll("li").forEach((option) => {
        option.addEventListener('click' , () =>{
            if(option_body.querySelector('.select')){
                let removeclass = option_body.querySelector(".select");
                removeclass.classList.remove("select")
            }
            option.classList.add('select');
        })
    })
    
}

function checkAnswer(){
    checkBtn.disabled = true;
    if(option_body.querySelector('.select')){
        let storeAns = option_body.querySelector('.select').textContent;
        // console.log(storeAns);
        if(storeAns.trim() == correct_answer){
            resultArea.innerHTML = `<p class="result"><i class="fa-solid fa-check"></i>Correct Answer</p>`
            correct_score++;
        }else{
            resultArea.innerHTML = `<p class="result"><i class="fa-solid fa-xmark"></i>Incorrect Answer ! Correct Answer is ${correct_answer}</p>`
        }
        checkCounter();
    }else{
        resultArea.innerHTML = `<p class="result"><i class="fa-solid fa-exclamation"></i>please Seleact an option first</p>`
        checkBtn.disabled = false ;
    }
}



function eventsLister(){
    checkBtn.addEventListener('click' , checkAnswer);
    resetBtn.addEventListener('click' , resetQuiz);
}

document.addEventListener('DOMContentLoaded' , () =>{
    generateQuestion()
    eventsLister()
    currentquestion.innerHTML = correct_score;
    totalquestion.innerHTML = totalQuestion;
} )

function checkCounter(){
    askQuestion++;
    setCounter();
    if(askQuestion == totalQuestion){
        
        resultArea.innerHTML = `<p class="result"> Your Total Score is : ${correct_score}</p>`
        checkBtn.style.display = "none";
        resetBtn.style.display = "block";
    }else{
        setTimeout(() =>{
            generateQuestion()
        } , 300);
    }
}

function setCounter(){
    currentquestion.textContent = correct_score;
    totalquestion.innerHTML = totalQuestion;
}
function resetQuiz(){
    correct_score = askQuestion = 0 ;
    checkBtn.disabled = false;
    resetBtn.style.display = "none";
    generateQuestion()
    setCounter()
    checkBtn.style.display = "block";
}

