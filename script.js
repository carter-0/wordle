const wordList = ["crane"];
var colorArrHistory = [];
var currentGuess = 1;
var won = false;

const todays_word = wordList[0];

function onWordChange() {
    var input = document.getElementById("word-input");
    var boxes = document.getElementsByClassName("r"+String(currentGuess));
    console.log(input.value);
    console.log(boxes);

    for(let i=0; i<5; i++) {
        // boxes[i].style.border = 0;
        if (i > input.value.length-1) {
            boxes[i].innerHTML = "<span class='guess-container'><p class='guess-letter'></p></span>";
        } else {
            boxes[i].innerHTML = "<span class='guess-container'><p class='guess-letter'>"+input.value[i]+"</p></span>";
        }
    }
}

function checkWord(word) {
    word = word.toLowerCase();
    let foundLetters = [];
    let foundRealIndexes = [];
    let foundIndexes = [];

    let colorsArr = [];

    let wordArr = Array.from(word);
    let realWordArr = Array.from(todays_word);
    
    for (let i=0; i<wordArr.length; i++) {
        for (let k=0; k<todays_word.length; k++) {
            if (wordArr[i] == realWordArr[k] && !foundIndexes.includes(i) && !foundRealIndexes.includes(k)) {
                foundLetters.push(wordArr[i]);
                foundRealIndexes.push(k);
                foundIndexes.push(i);
            }
        }
    }

    console.log("Found Letters: "+foundLetters);
    console.log("Found Real Indexes: "+foundRealIndexes);
    console.log("Found Indexes: "+foundIndexes);
    console.log("Word Arr: "+wordArr);

    for (let i=0; i<wordArr.length; i++) {
        if (foundLetters.includes(wordArr[i])) {
            if (wordArr[i] == realWordArr[i]) {
                console.log("green");
                console.log(i);
                colorsArr.push("var(--green-box)");
            } else {
                colorsArr.push("var(--yellow-box)");
            }
        } else {
            colorsArr.push("var(--red-box)");
        }
    }

    colorArrHistory.push(colorsArr);

    console.log(colorsArr);
    return colorsArr;
}

function endGame(state) {
    if (state == 1) {
        console.log("game won");
        won = true;
        document.getElementById("word-input").disabled = true;

        document.getElementById("end-text").innerHTML = "You won!";
        document.getElementById("end").style.display = "flex";
    } else {
        won = false;
        console.log("game lost")
        document.getElementById("word-input").disabled = true;

        document.getElementById("end-text").innerHTML = "You lost! Word was "+todays_word;
        document.getElementById("end").style.display = "flex";
    }
}

function iterate() {
    var correct_letters = 0;

    if (document.getElementById("word-input").value.length < 5) {
        return
    }

    let colorsArr = checkWord(document.getElementById("word-input").value);
    var boxes = document.getElementsByClassName("r"+String(currentGuess));

    for (let i=0; i<boxes.length; i++) {
        boxes[i].style.background = colorsArr[i];
    }

    document.getElementById("word-input").value = "";

    colorsArr.forEach(element => {
        if (element == "var(--green-box)") {
            correct_letters++;
        }
    });

    currentGuess++;
    if (correct_letters == 5) {
        endGame(1)
        return;
    }
    if (currentGuess > 6) {
        endGame(0)
        return;
    }
}

function copyResult() {
    result = "";

    let map = {
        "var(--green-box)": "🟩",
        "var(--red-box)": "🟥",
        "var(--yellow-box)": "🟨"
    }

    if (won) {
        result = result + "Wordle "+String(colorArrHistory.length)+"/6"+"\n\n";
    } else {
        result = result + "Wordle X/6"+"\n\n";
    }

    colorArrHistory.forEach(element => {
        element.forEach(color => {
            console.log(color);
            result = result + map[color];
        });
        result = result + "\n";
    });

    navigator.clipboard.writeText(result);
    return;
}

window.onload = function(){
    var enter = 13;
  
    window.onkeydown= function(gfg){
        if(gfg.keyCode === enter){

            iterate();
        }
    }
}