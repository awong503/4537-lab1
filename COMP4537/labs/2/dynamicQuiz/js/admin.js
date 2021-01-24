function createButton(innerHTML, className) {
    this.btn = document.createElement("button");
    this.btn.innerHTML = innerHTML;
    this.btn.className = className;
}

function MultipleChoiceQuestion(question, answerInt) {
    this.question = question;
    this.answerKey = answerInt;
    this.answerArr = []

    this.setQuestionsArr = function (choiceArr) {
        choiceArr.forEach(element => {
            this.answerArr.push(element);
        });
    }
}

function pushData(questionObj) {
    updateArray(questionObj);
}

function createElementDocument(e, className) {
    let element = document.createElement(e);
    element.className = className;
    document.body.appendChild(element);
}

function displayQuestions() {
    let container = document.getElementsByClassName("container-fluid text-left")[0];
    container.innerHTML = "";

    let divSmall = document.createElement("div");
    divSmall.className = "col-sm-2 sidenav";

    let quizList = document.createElement("ul");
    quizList.className = "list-group";

    let storedQuestions = getArray();
    for (let i = 0; i < storedQuestions.length; i++) {
        let questionObj = storedQuestions[i];
        let qnum = i + 1;
        quizList.innerHTML += `
<li class="list-group-item">
    Question ` + qnum + `) ` + questionObj["question"] + ` <br/>
    <div class="radio">
    <label><input type="radio" name="optradio" disabled=true>` + questionObj["answerArr"][0] + `</label>
    </div>
    <div class="radio">
    <label><input type="radio" name="optradio" disabled=true>` + questionObj["answerArr"][1] + `</label>
    </div>
    <div class="radio">
    <label><input type="radio" name="optradio" disabled=true>` + questionObj["answerArr"][2] + `</label>
    </div>
    <div class="radio">
    <label><input type="radio" name="optradio" disabled=true>` + questionObj["answerArr"][3] + `</label>
    </div>
</li>
`;
    }
    container.appendChild(divSmall);
    divSmall.appendChild(quizList);
    document.body.appendChild(container);
}

function getArray() {
    return JSONobj = JSON.parse(localStorage.getItem("questions"))["questions"]
}

function updateArray(mcObj) {
    let arr = getArray();
    arr.push(mcObj);
    let updatedJSON = { "questions": arr };
    localStorage.setItem("questions", JSON.stringify(updatedJSON));
}

function deleteArray(mcObj) {
    let arr = getArray();
    arr.pop();
    let updatedJSON = { "questions": arr };
    localStorage.setItem("questions", JSON.stringify(updatedJSON));
}

function createMCform() {
    let parent = document.getElementsByClassName("form");
    let childForm = document.createElement("form");
    let addButton = new createButton("Add", "btn btn-success");
    let saveButton = new createButton("Save changes", "btn btn-primary");
    let delButton = new createButton("Delete", "btn btn-danger");

    let backBtn = new createButton("Back", "btn btn-info");
    childForm.innerHTML = `
<label for="Question">Create Question:</label>
<textarea id="question" name="question" class="form-control questionText" rows="5"></textarea> </br>


<div class="input-group">
    <div class="input-group-prepend">
        <div class="input-group-text">
        <input type="radio" class="radio-choice"  aria-label="Radio button for following text input" name="answer" value="ans_1">
        </div>
    </div>
    <input type="text" class="form-control answerText" aria-label="Text input with radio button">
    </div>

    <div class="input-group">
    <div class="input-group-prepend">
        <div class="input-group-text">
        <input type="radio" class="radio-choice"  aria-label="Radio button for following text input" name="answer" value="ans_2">
        </div>
    </div>
    <input type="text" class="form-control answerText" aria-label="Text input with radio button">
    </div>

    <div class="input-group">
    <div class="input-group-prepend">
        <div class="input-group-text">
        <input type="radio" class="radio-choice"  aria-label="Radio button for following text input" name="answer" value="ans_3">
        </div>
    </div>
    <input type="text" class="form-control answerText" aria-label="Text input with radio button">
    </div>

    <div class="input-group">
    <div class="input-group-prepend">
        <div class="input-group-text">
        <input type="radio" class="radio-choice" aria-label="Radio button for following text input" name="answer" value="ans_4">
        </div>
    </div>
    <input type="text" class="form-control answerText" aria-label="Text input with radio button">
    </div>
`;

    addButton.btn.addEventListener('click', () => {
        pushUserInputValues();
        displayQuestions();
    });

    delButton.btn.addEventListener('click', () => {
        deleteArray();
        displayQuestions();
    });

    saveButton.btn.addEventListener('click', () => {
        deleteArray();
        pushUserInputValues();
        displayQuestions();
    });

    backBtn.btn.addEventListener('click', () => {
        location.href="index.html";
    });

    parent[0].appendChild(childForm);
    parent[0].appendChild(addButton.btn);
    parent[0].appendChild(saveButton.btn);
    parent[0].appendChild(delButton.btn);
    parent[0].appendChild(backBtn.btn);
}

function pushUserInputValues() {
    let question = document.getElementById("question").value;
    if (question.length == 0) { window.alert("Please type in question"); return; }

    let answers = document.getElementsByClassName("answerText");
    let radio_btns = document.getElementsByClassName("radio-choice");
    let correctAns = -1;
    let ans = [];
    for (let i = 0; i < answers.length; i++) {
        //   console.log(answers[i].value);
        ans.push(answers[i].value);
        if (answers[i].value.length == 0) { window.alert("Please type in all 4 choices"); return; }
    }

    for (let i = 0; i < radio_btns.length; i++) {
        if (radio_btns[i].checked) {
            // console.log(radio_btns[i].value);
            correctAns = radio_btns[i].value;
            radio_btns[i].checked = false;
        }
    }
    // Pushing to local storage 
    if (correctAns == -1) { window.alert("Please identify correct answer"); return; }
    document.getElementById("question").value = "";
    for (let i = 0; i < answers.length; i++) {
        answers[i].value = "";
    }
    let mc = new MultipleChoiceQuestion(question, correctAns);
    mc.setQuestionsArr(ans);
    pushData(mc);
}



window.onload = () => {
    if (localStorage.getItem("questions") == null) {
        localStorage.setItem("questions", '{ "questions": []}');
    }
    createElementDocument("div", "container-fluid text-left")
    createElementDocument("div", "form");
    createMCform();
    displayQuestions();
}