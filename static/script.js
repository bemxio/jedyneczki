// elements on the page
const jedynkiList = document.getElementById("jedynki-list");
const jedynkiShowcaseAmount = document.getElementById("jedynki-showcase-amount");
const jedynkiShowcasePercentage = document.getElementById("jedynki-showcase-percentage");

// helper functions
function createSubjectEntry(subject, amount) {
    const entry = document.createElement("div");

    entry.className = "jedynki-list-subject";

    // create the subject entry name
    const entryName = document.createElement("span");

    entryName.className = "jedynki-list-subject-name";
    entryName.innerHTML = `<b>${subject}</b> stanowi`;

    // create the subject entry amount
    const entryAmount = document.createElement("span");
    
    entryAmount.className = "jedynki-list-subject-amount";

    if (amount == 1) {
        entryAmount.innerHTML = `<b>${amount}</b> jedynkę`;
    } else if ([2, 3, 4].includes(amount % 10)) {
        entryAmount.innerHTML = `<b>${amount}</b> jedynki`;
    } else {
        entryAmount.innerHTML = `<b>${amount}</b> jedynek`;
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
    jedynkiList.appendChild(createSubjectEntry(subject, badGrades[subject]));
}

// calculate the percentage of bad grades
let gradeRatio = Math.round((badGradesAmount / (badGradesAmount + otherGradesAmount)) * 10000) / 100;

// show the values on the page
jedynkiShowcaseAmount.innerText = badGradesAmount;
jedynkiShowcasePercentage.innerHTML = `(co stanowi <b>${gradeRatio}%</b> moich ocen)`
