window.onload = () => {
    createElementDocument("div", "container-fluid text-left")
    createElementDocument("div", "form");
    let quiz_data;
    let request = new XMLHttpRequest();
    request.open("GET", `https://isa-dbquiz.herokuapp.com/questions`, true);
    request.responseType = "json";
    request.setRequestHeader("Access-Control-Allow-Origin", "*");
    request.onload = () => {
        console.log(request.response);
        quiz_data = request.response;
        quizInit(quiz_data)
    }
    request.send();

}

function quizInit(data) {
    if (data.length == 0 ?? null) {
        window.alert("There are no questions created for the quiz.");
        return;
    }
    displayQuiz(data);
    showCorrectAnswer();
}


function displayQuiz(data) {
    let storedQuestions = new Set();
    let parent = document.getElementsByClassName("form");

    data.forEach(element => {
        let questionData = {
            "question"    : element.question,
            "question_id" : element.question_id,
        };
        
        storedQuestions.add(JSON.stringify(questionData));
    });

    let storedQuestionsArr = [...storedQuestions];
    for (let i = 0; i < storedQuestionsArr.length; i++) {
        let obj = JSON.parse(storedQuestionsArr[i]);
        let qnum = obj.question_id;
        let childForm = document.createElement("form");
        childForm.id = `form-${qnum}`
        let childFormString =  `
            <button type="submit" id=`+qnum+`>Update Question `+ qnum +`</button>
            <input required text="text" id="question`+qnum+`" name="question" class="form-control questionText" value="`+obj.question+`"> </br>
        `;
        for (let i = 0; i < data.length; i++) {
            let correctStatus = "";
            let checked = "";
            if (qnum === data[i].question_id) {
                if (data[i].iscorrect == true) {
                correctStatus += "correct";
                checked = "checked";

                }
                childFormString += `
                <div class="input-group">
                <div class="input-group-prepend">
                    <div class="input-group-text">
                    <input required `+checked+` type="radio" class="radio-choice ` + correctStatus + `Choice"  aria-label="Radio button for following text input" name="correct_op" value=`+i+`>
                    </div>
                </div>
                <input required name="option" type="text" class="form-control answerText ` + correctStatus + `Text" aria-label="Text input with radio button" value="` + data[i].option_desc + `">
                </div>
            `;
            
            childForm.innerHTML = childFormString;
            childForm.addEventListener('submit', handleSubmitPut);
            parent[0].appendChild(childForm);
            }
            
        }
    }


}

const showCorrectAnswer = () => {
    let correctChoices = document.getElementsByClassName("correctChoice");
    let choices = document.getElementsByClassName("Choice");
    let correctTexts = document.getElementsByClassName("correctText");
    let userScore = 0;
    for (let i = 0; i < correctTexts.length; i++) {
        correctTexts[i].style = "background-color: rgba(40,180,0,0.8); color: white";
    }
};


function createElementDocument(e, className) {
    let element = document.createElement(e);
    element.className = className;
    document.body.appendChild(element);
}


function createButton(innerHTML, className, id) {
    this.btn = document.createElement("button");
    this.btn.innerHTML = innerHTML;
    this.btn.className = className;
    this.btn.id = id;
}

const updateQuestion = (data, SERVER_URL) => {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = () => {
        if (this.readyState === 4 && this.status === 200) {
            console.log("SENT");
        }
    };
    xhttp.open("PUT", SERVER_URL, true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.setRequestHeader("Access-Control-Allow-Origin", "*");
    xhttp.send(data);
}

const handleSubmitPut = (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    const formJSON = Object.fromEntries(data.entries());

    formJSON.options = data.getAll("option");
    formJSON.correct_op = parseInt(data.getAll("correct_op")[0]) % 4;
    const question = data.get('question');

    let jsonStr = JSON.stringify(formJSON);
    const formId = (event.target.id).toString();
    const question_id = formId.match(/\d/g);
    const SERVER_URL = `https://isa-dbquiz.herokuapp.com/questions/${question_id}`
    console.log(jsonStr)
    updateQuestion(jsonStr, SERVER_URL);
}

document.getElementById("back-btn").addEventListener('click', () => {
    location.href="index.html";
});