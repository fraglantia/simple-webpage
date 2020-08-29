function blinking(state) {
  var title = document.getElementById("typing");
  if (state == true) {
    title.innerHTML = title.innerHTML.slice(0, -1);
    title.innerHTML += "|";
  } else {
    title.innerHTML = title.innerHTML.slice(0, -1);
    title.innerHTML += " ";
  }
}

function removeChar() {
  var title = document.getElementById("typing");
  if (title.innerHTML.slice(-1) == "|") {
    title.innerHTML = title.innerHTML.slice(0, -2);
    title.innerHTML += "|";
  } else {
    title.innerHTML = title.innerHTML.slice(0, -2);
    title.innerHTML += " ";
  }
}

function addChar(letter) {
  var title = document.getElementById("typing");
  if (title.innerHTML.slice(-1) == "|") {
    title.innerHTML = title.innerHTML.slice(0, -1);
    title.innerHTML += letter;
    title.innerHTML += "|";
  } else {
    title.innerHTML = title.innerHTML.slice(0, -1);
    title.innerHTML += letter;
    title.innerHTML += " ";
  }
}

function makeWord(word) {
  var letterList = [];
  for (var i = 0; i < word.length; i++) {
    letterList.push(word[i]);
  }
  return letterList;
}

function addLetter(letterList, pointer) {
  if (pointer != letterList.length) {
    setTimeout(function() {
      addChar(letterList[pointer]);
      addLetter(letterList, pointer + 1);
    }, 75);
  }
}

function addWord(word) {
  addLetter(makeWord(word), 0);
}

function removeWord(count, pointer) {
  if (count != pointer) {
    setTimeout(function() {
      removeChar();
      removeWord(count, pointer + 1);
    }, 25);
  }
}


function changeWord(pointer) {
  var word = wordlist[pointer];
  var title = document.getElementById("typing").innerHTML.slice(0, -1);
  var count = 0;
  for (let i = 0; i < title.length; i++) {
    if (title[i] != word[i]) {
      count = title.length - i;
      break;
    }
  }
  startPoint = title.length - count;
  removeWord(count, 0);
  setTimeout(function() {
    addWord(word.slice(startPoint));
  }, 25 * count + 100);
  setTimeout(function() {
    console.log(wordlist.length);
    if (pointer == wordlist.length - 1) {
      pointer = -1;
    }
    changeWord(pointer + 1);
  }, 25 * count + 75 * (word.length - startPoint) + 500);
}

var state = false;
setInterval(function() {
  state = !state;
  blinking(state);
}, 350);


wordlist = [
  "$ I like learning new stuff!",
  "$ I aspire to be a good programmer!",
  "$ This is a Web-Based Development Project",
  "$ I'm learning something new!",
  "$ "
];

changeWord(0)

