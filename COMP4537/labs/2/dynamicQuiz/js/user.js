
window.onload = () => {
    createElementDocument("div", "container-fluid text-left")
    createElementDocument("div", "form");
    quizInit();
}


function quizInit() {
    displayQuiz();
    if (getArray().length == 0) {
        window.alert("There are no questions created for the quiz.");
        return;
    }
}


function displayQuiz() {
    let storedQuestions = getArray();
    let parent = document.getElementsByClassName("form");
    let submitBtn = new createButton("Submit", "btn btn-success");
    let backBtn = new createButton("Back", "btn btn-info");

    for (let i = 0; i < storedQuestions.length; i++) {
        let questionObj = storedQuestions[i];
        let qnum = i + 1;

        // questionObj["question"]
        // questionObj["answerArr"][0] 
        let childForm = document.createElement("form");
        let childFormString =  `
            <label for="Question">Question `+ qnum +`:</label>
            <textarea disabled id="question" name="question" class="form-control questionText" rows="5">`+ questionObj["question"] +`</textarea> </br>
        `;

        for (let i = 0; i < questionObj["answerArr"].length; i++) {
            let correctStatus = "";
            if ("ans_" + (i+1) == questionObj["answerKey"]) {
                correctStatus += "correct";
            }
            childFormString += `
            <div class="input-group">
            <div class="input-group-prepend">
                <div class="input-group-text">
                <input type="radio" class="radio-choice ` + correctStatus + `Choice"  aria-label="Radio button for following text input" name="answer" value="ans_1">
                </div>
            </div>
            <input type="text" disabled class="form-control answerText ` + correctStatus + `Text" aria-label="Text input with radio button" value="` + questionObj["answerArr"][i] + `">
            </div>
        `;
        }
        childForm.innerHTML = childFormString;
        parent[0].appendChild(childForm);
    }
        submitBtn.btn.addEventListener('click', () => {
            let correctChoices = document.getElementsByClassName("correctChoice");
            let choices = document.getElementsByClassName("Choice");
            let correctTexts = document.getElementsByClassName("correctText");
            let userScore = 0;
            for (let i = 0; i < correctTexts.length; i++) {
                correctTexts[i].style = "background-color: rgba(40,180,0,0.8); color: white";
            }

            for (let i = 0; i < correctChoices.length; i++) {
                if (correctChoices[i].checked) {
                    userScore++;
                }
                correctChoices[i].disabled = !(correctChoices[i].checked);

            }
            console.log("Correct: " + userScore + " Wrong: " + (storedQuestions.length-userScore));
            window.alert("Correct: " + userScore + " Wrong: " + (storedQuestions.length-userScore));

            for (let i = 0; i < choices.length; i++) {
                choices[i].disabled = !(choices[i].checked);
            }        
        });

        backBtn.btn.addEventListener('click', () => {
            location.href="index.html";
        });
        parent[0].appendChild(submitBtn.btn);
        parent[0].appendChild(backBtn.btn);

}




function createElementDocument(e, className) {
    let element = document.createElement(e);
    element.className = className;
    document.body.appendChild(element);
}


function getArray() {
    return JSONobj = JSON.parse(localStorage.getItem("questions"))["questions"]
}

function createButton(innerHTML, className) {
    this.btn = document.createElement("button");
    this.btn.innerHTML = innerHTML;
    this.btn.className = className;
}