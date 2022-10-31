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

    return entry;
}

// get all of the grades
const request = new XMLHttpRequest();

request.open("GET", "/api/get_grades", false);
request.send(null);

if (request.status != 200) {
    alert("Wystąpił problem ze zdobyciem ocen, proszę spróbować poźniej!");

    throw new Error(`request for retrieving grades returned error code ${request.status}`);
}

// parse the API request and set variables
let grades = JSON.parse(request.responseText);
let badGrades = {};

let badGradesAmount = 0;
let otherGradesAmount = 0;

// calculate the total & subject-specific amounts of grades
for (const subject of Object.keys(grades)) {
    badGrades[subject] = 0;

    for (const grade of grades[subject]) {
        if (grade != 1) {
            otherGradesAmount++; 
            continue;
        }

        badGrades[subject]++;
        badGradesAmount++;
    }
}

// sort the bad grades in a descending order
badGrades = Object.fromEntries(
    Object.entries(badGrades).sort((a, b) => {
        return b[1] - a[1];
    })
);

// append all of the subject-specific bad grade amounts to the subject list
for (const subject of Object.keys(badGrades)) {
    subjectList.appendChild(createSubjectEntry(subject, badGrades[subject]));
}

// show the grade amount on the page
gradeCounter.innerText = badGradesAmount;