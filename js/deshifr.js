// DOM ELEMENTS
const elTextareaForm = document.querySelector(".js-shifr-form");
const elInputRotate = elTextareaForm.querySelector(".js-shifr-type");
const elInputTextarea = elTextareaForm.querySelector(".js-input-textarea");
const elOutputTextarea = elTextareaForm.querySelector(".js-output-textarea");
const elBtnClear = elTextareaForm.querySelector(".js-btn-clear");
const elBtnCopy = elTextareaForm.querySelector(".js-btn-copy");

// GLOBAL VARS
let rotate = Number(elInputRotate.value);

// FUNCTIONS
// CONVERT INPIT TO SHIFR
function doInputShifr(words) {
  let newWords = "";

  words = words.trim().split(" ");

  for (let word of words) {
    let newWord = "";
    let newLetter = "";

    for(let i = 0; i < word.length; i++){

      newLetter = "";

      let ascii = word.charCodeAt(i);

      if ( ascii >= 65 && 90 >= ascii ) {
        newLetter = doBigShifr(word[i], rotate);
      }

      if ( ascii >= 97 && 122 >= ascii ) {
        newLetter = doSmallShifr(word[i], rotate);
      }
      newWord += newLetter;
    }

    if(words.length > 1){

      newWords = newWords + newWord + " ";
    }else{
      newWords = newWords + newWord;
    }


  }
  return newWords;

}

// REVERT INPUT TO SHIFR
function revertInputShifr(words) {
  let newWords = "";
  words = words.trim().split(" ");

  for (let word of words) {
    let newWord = "";
    let newLetter = "";

    for(let i = 0; i < word.length; i++){

      newLetter = "";

      let ascii = word.charCodeAt(i);

      if ( ascii >= 65 && 90 >= ascii ) {
        newLetter = revertBigShifr(word[i]);
      }

      if ( ascii >= 97 && 122 >= ascii ) {
        newLetter = revertSmallShifr(word[i]);
      }
      newWord += newLetter;
    }

    if(words.length > 1){

      newWords = newWords + newWord + " ";
    }else{
      newWords = newWords + newWord;
    }

  }
  return newWords;

}

// MINI FUNCTION ONLYLETTER SHIFR FOR BIG LETTERS
function doBigShifr(letter) {
  if(letter.charCodeAt(letter) >=  65  &&  90 >= letter.charCodeAt(letter) ){
    letter = String.fromCharCode(letter.charCodeAt(letter) + rotate);


    if(letter.charCodeAt(letter) > 90 ){
      let difference = letter.charCodeAt(letter) - 91;
      letter = 65 + difference;
      letter = String.fromCharCode(letter);
    }
  }

  return letter;

}

// MINI FUNCTION ONLYLETTER SHIFR FOR SMALL LETTERS
function doSmallShifr(letter) {

  if(letter.charCodeAt(letter) >=  97  &&  122 >= letter.charCodeAt(letter) ){
    letter = String.fromCharCode(letter.charCodeAt(letter) + rotate);


    if(letter.charCodeAt(letter) > 122 ){
      let difference = letter.charCodeAt(letter) - 123;
      letter = 97 + difference;
      letter = String.fromCharCode(letter);
    }
  }

  return letter;
}

// MINI FUNCTION ONLY LETTER UNSHIFR BIG LETTERS
function revertBigShifr(letter) {
    if(letter.charCodeAt(letter) >=  65  &&  90 >= letter.charCodeAt(letter) ){
    letter = String.fromCharCode(letter.charCodeAt(letter) - rotate);

    if(letter.charCodeAt(letter) < 65 ){
      let difference = 65 -  letter.charCodeAt(letter);
      letter = 90 - difference;
      letter = String.fromCharCode(letter);
    }
  }
  return letter;
}

// MINI FUNCTION ONLY LETTER UNSHIFR SMALL LETTERS
function revertSmallShifr(letter) {
    if(letter.charCodeAt(letter) >=  97  &&  122 >= letter.charCodeAt(letter) ){
    letter = String.fromCharCode(letter.charCodeAt(letter) - rotate);

    if(letter.charCodeAt(letter) < 97 ){
      let difference = 97 -  letter.charCodeAt(letter);
      letter = 122 - difference;
      letter = String.fromCharCode(letter);
    }
  }
  return letter;
}

function clearInputText() {
  elInputTextarea.value = "";
  elOutputTextarea.value = "";
}

function copyOutputText(){
  elOutputTextarea.select();
  document.execCommand('copy')
}

// EVENT LISTENERS

if(elTextareaForm){
  elTextareaForm.addEventListener("submit", function boom(evt) {
  evt.preventDefault();
  });
}

if(elInputTextarea){
  elInputTextarea.addEventListener("keyup", function (evt) {
    evt.preventDefault();
    rotate = Number(elInputRotate.value);
    let text = revertInputShifr(elInputTextarea.value);
    elOutputTextarea.value = text;
  })
}

if(elBtnClear){
  elBtnClear.addEventListener("click", clearInputText);
}

if(elBtnCopy){
  elBtnCopy.addEventListener("click", copyOutputText);
}
