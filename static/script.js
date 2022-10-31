// elements on the page
const subjectList = document.getElementById("subject-list");
const gradeCounter = document.getElementById("grade-counter");

// helper functions
function createSubjectEntry(subject, amount) {
    const entry = document.createElement("div");

    entry.className = "subject-entry";

    // create the subject entry name
    const entryName = document.createElement("span");

    entryName.className = "subject-entry-name";
    entryName.innerHTML = `<b>${subject}</b> stanowi`;

    // create the subject entry amount
    const entryAmount = document.createElement("span");
    
    entryAmount.className = "subject-entry-amount";

    if (amount == 1) {
        entryAmount.innerHTML = `<b>${amount}</b> jedynkę`;
    } else if (amount % 10 == 5 || amount % 10 == 0) {
        entryAmount.innerHTML = `<b>${amount}</b> jedynek`;
    } else {
        entryAmount.innerHTML = `<b>${amount}</b> jedynki`;
    }

    entry.appendChild(entryName);
    entry.appendChild(entryAmount);

    subjectList.appendChild(entry);
}

// get all of the grades
const request = new XMLHttpRequest();

request.open("GET", "/api/get_grades", false);
request.send(null);

if (request.status != 200) {
    alert("Wystąpił problem ze zdobyciem ocen, proszę spróbować poźniej!");

    throw new Error(`request for retrieving grades returned error code ${request.status}`);
}

let subjectGrades = JSON.parse(request.responseText);
let gradeAmount = 0;

// save only the bad grade amount from the object
for (const [subject, grades] of Object.entries(subjectGrades)) {
    subjectGrades[subject] = grades.filter(grade => grade == 1).length;
}

// sort the object's stuff
subjectGrades = Object.fromEntries(
    Object.entries(subjectGrades).sort((a, b) => {
        return b[1] - a[1];
    })
);

// make the subject list entries and calculate the amount of bad grades
for (const [subject, amount] of Object.entries(subjectGrades)) {
    gradeAmount += amount;

    createSubjectEntry(subject, amount);
}

// show the grade amount on the page
gradeCounter.innerText = gradeAmount;