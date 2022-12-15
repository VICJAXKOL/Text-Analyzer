// BUSINESS LOGIC
function wordCounter(text) {
  if (text.trim().length === 0) {
    return 0;
  }
  let wordCount = 0;
  const wordArray = text.split(" ");
  wordArray.forEach(function(element) {
    if (!Number(element)) {
      wordCount++;
    }
  });
  return wordCount;
}

function numberOfOccurrencesInText(word, text) {
  if ((text.trim().length === 0) || (word.trim().length === 0)) {
    return 0;
  }
  const wordArray = text.split(" ");
  let wordCount = 0;
  wordArray.forEach(function(element) {
    if (element.toLowerCase().includes(word.toLowerCase())) {
      wordCount++;
    }
  });
  return wordCount;
}

function offensiveWordFilter(offensiveWords, text){
  const array = text.split(" ");
  let emptyArray= [];
  array.forEach(function(element){
      if( offensiveWords.includes( punctuationRemover(element))){
          emptyArray.push("****")
      }else{
          emptyArray.push(element)
      }
  });
  return emptyArray.join(" ");
}

function punctuationRemover(word){
  let punctuations = [".", ",", "-","?","!"]
  punctuations.forEach(function(element){
      word = word.replace(element, "")
  })
  return word;
}

function top3(sentence){
  let top = []
  let topThree = ""
  let myTop = sentence.split(" ")
  let myNewTop = [...new Set(myTop)]
  myNewTop.forEach(function(element){
    let elementFreeOfPunctuation = punctuationRemover(element)
    let counter = numberOfOccurrencesInText(elementFreeOfPunctuation, sentence)
    let wordCountArray = [];
    wordCountArray.push(elementFreeOfPunctuation);
    wordCountArray.push(counter);
    top.push(wordCountArray)
  });
  top.sort(function(a,b){
    return b[1] - a[1]  
  });
  for( let i =0; i<top.length; i++){
    if (i <= 2){
      topThree = topThree.concat("<li>", top[i][0] + ":" + top[i][1], "</li>") 
    }
  }
  return topThree
}

function boldPassage(word, text) {
  text = offensiveWordFilter(offensiveWords, text);
  let htmlString = "<p>";
  let textArray = text.split(" ");
  textArray.forEach(function(element) {
    if (word === element) {
      htmlString = htmlString.concat("<b>" + element + "</b>");
    } else {
      htmlString = htmlString.concat(element);
    }
    htmlString = htmlString.concat(" ");
  });
  return htmlString + "</p>";
}

