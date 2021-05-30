let start = document.getElementById("start");
let exit = document.getElementById("exit");
let continu = document.getElementById("continue");
let main = document.getElementById("main");
let question = document.getElementById("question");
let option1 = document.getElementById("option1");
let option2 = document.getElementById("option2");
let option3 = document.getElementById("option3");
let option4 = document.getElementById("option4");
let ruleBook = document.getElementById("ruleBook");
let noOfQuestion = document.getElementById("no-of-question");
let time = document.getElementById("time");
let time_line = document.getElementById("time_line");

let score = 0;

option1.classList.add("answer_a");
option2.classList.add("answer_b");
option3.classList.add("answer_c");
option4.classList.add("answer_d");

// when start is clicked
start.addEventListener("click", () => {
  ruleBook.classList.add("showModal");
});
exit.addEventListener("click", () => {
  ruleBook.classList.remove("showModal");
});

// when continue is clicked
continu.addEventListener("click", () => {
  ruleBook.classList.remove("showModal");
  main.style.display = "block";
  addQuestions();
});

// time counter
let myVar;
function timeStart() {
  let sec = 15;
  myVar = setInterval(myTimer, 1000);

  function myTimer() {
    sec--;
    if (sec == 0) {
      clearInterval(myVar);
      let next = document.getElementById("next");
      next.classList.add("next-show");
      next.classList.remove("next-hide");
    }
    document.getElementById("time").innerHTML = sec;
  }
}

// timerline
let counterLine;
function startTimerLine(time) {
  counterLine = setInterval(timer, 25);
  function timer() {
    time += 1;
    time_line.style.width = time + "px";
    if (time > 605) {
      clearInterval(counterLine);
    }
  }
}

//  fetching data from api
var myHeaders = new Headers();
myHeaders.append("X-Api-Key", "JVKec8niTOQjzTQdpGMwNktEjj6xSwBz84IrAe53");
var requestOptions = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow",
};

let questionCount = 0;
let another = 0;
let arrayOFCorrectAnswers = [];
async function addQuestions() {
  let response = await fetch(
    "https://quizapi.io/api/v1/questions?limit=10",
    requestOptions
  );
  let data = await response.json();
  console.log(data);
  document.getElementById("time").innerHTML = 15;
  timeStart();
  startTimerLine(0);
  question.innerHTML = `${data[questionCount].question}`;
  option1.innerHTML = `${data[questionCount].answers.answer_a}`;
  option2.innerHTML = `${data[questionCount].answers.answer_b}`;
  option3.innerHTML = `${data[questionCount].answers.answer_c}`;
  option4.innerHTML = `${data[questionCount].answers.answer_d}`;
  questionCount++;
  noOfQuestion.innerHTML = `${questionCount} of 10 questions`;
  // when next is clicked
  let next = document.getElementById("next");
  next.addEventListener("click", () => {
    document.getElementById("time").innerHTML = 15;
    clearInterval(myVar);
    clearInterval(counterLine);
    colorBlue();
    next.classList.remove("next-show");
    next.classList.add("next-hide");

    timeStart();
    startTimerLine(0);
    question.innerHTML = `${data[questionCount].question} ?`;
    option1.innerHTML = `${data[questionCount].answers.answer_a}`;
    option2.innerHTML = `${data[questionCount].answers.answer_b}`;
    option3.innerHTML = `${data[questionCount].answers.answer_c}`;
    option4.innerHTML = `${data[questionCount].answers.answer_d}`;
    questionCount++;
    another++;
    noOfQuestion.innerHTML = `${questionCount} of 10 questions`;
    if (questionCount == 10) {
      let nextQuestion = document.getElementById("next-question");
      nextQuestion.innerHTML = `<button class="next next-hide" id="finish">Finsih</button>`;
      showResult();  
    }
  });


  // making array of correct answers
  let i = 0;
  for (item of data) {
    for (key in item.correct_answers) {
      if (item.correct_answers[key] == "true") {
        arrayOFCorrectAnswers[i] = key;
        i++;
      }
    }
  }

  // comparing the answers
  let selectedTimes = 0;
  let chosen = document.getElementsByClassName("option");
  for (let choosed of chosen) {
    choosed.addEventListener("click", selected);
  }

  function removeListener(){
    for (let choosed of chosen) {
      choosed.removeEventListener("click", selected);
      console.log('10 times');
    }
  }
   function selected(e) {
    clearInterval(myVar);
    clearInterval(counterLine);
    selectedTimes++;
    console.log("you have choosen");
    next.classList.add("next-show");
    next.classList.remove("next-hide");
    if (questionCount == 10) {
      finish.classList.add("next-show");
      finish.classList.remove("next-hide");
    }
    let choosenOption = e.target.className;
    choosenOption = choosenOption.substr(7, 14);
    let correctOption = arrayOFCorrectAnswers[questionCount - 1];
    if (correctOption.includes(choosenOption)) {
      colorGreen(e.target);
      score++;
    } else {
      colorRed(e.target);
    }
    if(selectedTimes==10){
      let yourScore = document.getElementById('score')
      yourScore.innerHTML = `you got ${score} out of 10`
      removeListener()
    }
  }
  // for (let choosed of chosen) {
  //   choosed.addEventListener("click", (e) => {
  //     clearInterval(myVar);
  //     clearInterval(counterLine);
  //     console.log("you have choosen");
  //     next.classList.add("next-show");
  //     next.classList.remove("next-hide");
  //     if (questionCount == 10) {
  //       finish.classList.add("next-show");
  //       finish.classList.remove("next-hide");
  //     }
  //     let choosenOption = e.target.className;
  //     choosenOption = choosenOption.substr(7, 14);
  //     let correctOption = arrayOFCorrectAnswers[questionCount - 1];
  //     if (correctOption.includes(choosenOption)) {
  //       colorGreen(e.target);
  //       score++;
  //     } else {
  //       colorRed(e.target);
  //     }
  //   });
  // }
}

// coloring green for correct answers
function colorGreen(element) {
  element.style.border = "2px solid #0d821b";
  element.style.background = "#a9fdac";
    let el = document.createElement("i");
  el.classList.add("fas");
  el.classList.add("fa-check");
  el.style.color = "#0d821b";
  element.appendChild(el);
  console.log("called color green");
}
function colorRed(element) {
  element.style.border = "2px solid #d90429";
  element.style.background = "#ffa8a9";
 let el = document.createElement("i");
  el.classList.add("fas");
  el.classList.add("fa-times");
  el.style.color = "#d90429";
  element.appendChild(el);
  console.log("called color red");
}

function colorBlue() {
  let option = document.getElementsByClassName("option");
  for (let op of option) {
    op.style.border = "2px solid #3d0066";
    op.style.background = "#e0aaff";
  }
}
// for result
function showResult() {
  let finish = document.getElementById("finish");
  let resultBox = document.getElementById("resultBox");
  finish.addEventListener("click", () => {
    main.style.display = "none";
    resultBox.style.display = "flex";
  });
}

let replay = document.getElementById("replay");
replay.addEventListener("click", () => {
  questionCount = 0;
  score = 0
  resultBox.style.display = "none";
  colorBlue();
  let nextQuestion = document.getElementById("next-question");
  nextQuestion.innerHTML = `<button class="next next-show" id="next">Next Que.</button>`;
  main.style.display = "block";
  question.innerHTML = `questions incoming`;
  option1.innerHTML = `option1`;
  option2.innerHTML = `option2`;
  option3.innerHTML = `option3`;
  option4.innerHTML = `option4`;
  addQuestions();
});

let quit = document.getElementById('quit')
quit.addEventListener('click',()=>{
  window.location.reload(); 
})
