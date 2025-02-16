const startbtn = document.querySelector(".start-btn button"),
startbtnbox = document.querySelector(".start-btn"),
content = document.querySelector(".content"),
typingtext = document.querySelector(".typing-text"),
inputfield = document.querySelector(".typing-text-box input"),
paradisplay = document.querySelector(".typing-text-box p"),
resultBox = document.querySelector(".result-box"),
exitbtn = document.querySelector(".btns .exit-btn"),
tryagain = document.querySelector(".btns .try-again"),
timeText = document.querySelector(".time p b"),
wpmtext = document.querySelector(".wpm"),
cpmtext = document.querySelector(".cpm"),
accuracytext = document.querySelector(".accuracy")

let wordIndex = 0,randomNum,correct=0,incorrect=0,wpm=0,cpm=0,wrongkey=0,accuracy=0;
let timestart = false,maxTime = 60, timeLeft = maxTime,timer;
timeText.innerText = `${maxTime}s`
wpmtext.innerText = `${wpm}`
cpmtext.innerText = `${cpm}`
accuracytext.innerText = `${accuracy}%`

const startTest = () =>{
    startbtnbox.style.display = "none";
    content.style.display = "block"
    
}
const StartTimer = () =>{
    // console.log("timerStart")
    if(timeLeft > 0){
        timeLeft--;
        timeText.innerText = `${timeLeft}s`;
    }
    else{

        resultBox.style.display = "flex";
        content.style.display = "none";
        inputfield.value = "";
        console.log(wordIndex-incorrect)
        wpm = Math.round((((wordIndex-incorrect) / 5) / (maxTime/60)))
        cpm = Math.round((wordIndex-incorrect)/((maxTime-timeLeft)/60))
        accuracy = Math.round((wpm-(wrongkey/5))/wpm*100)
        console.log(wpm,cpm,accuracy,wpm*100)
        clearInterval(timer);
        wpmtext.innerText = `${wpm}`
        cpmtext.innerText = `${cpm}`
        accuracytext.innerText = `${accuracy}%`
    }
}
const loadparagragh = () =>{
    randomNum = Math.floor(Math.random() * paragraphs.length)
    typingtext.innerHTML = ""
    let para = paragraphs[randomNum];
    
    para.split("").forEach(char =>{
        let ele = `<span>${char}</span>`
        typingtext.innerHTML += ele;
    });
    typingtext.querySelectorAll("span")[0].classList.add("active");
    document.addEventListener("click",() => inputfield.focus())
    typingtext.addEventListener("click", () => inputfield.focus())
    
}
const startedtyping = () =>{
    const inputvalue = inputfield.value.split("")[wordIndex];
    const paragraph = typingtext.querySelectorAll("span");
    if(!timestart){
        timer = setInterval(StartTimer,1000)
        timestart = true
    }
    
    if(wordIndex < paragraph.length-1 && timeLeft>0){
        if(inputvalue == null){
            if(wordIndex>0){
                wordIndex--;
                if(paragraph[wordIndex].classList.contains("incorrect")){
                    incorrect--;
                }
                paragraph[wordIndex].classList.remove("correct","incorrect")
            }
        }
        else{
            if(inputvalue ===  paragraph[wordIndex].innerText){
                paragraph[wordIndex].classList.add("correct");
            }
            else{
                incorrect++;
                paragraph[wordIndex].classList.add("incorrect");
                wrongchar = true;
                wrongkey++;
            }
            wordIndex++
            // console.log(wpm)
        }
        paragraph.forEach(span => span.classList.remove("active"))
        paragraph[wordIndex].classList.add("active");
    }
}

loadparagragh();
document.addEventListener("click",() => inputfield.focus())
typingtext.addEventListener("click", () => inputfield.focus())



inputfield.addEventListener("input",startedtyping)
startbtn.addEventListener("click",startTest);
exitbtn.addEventListener("click", () =>{
    loadparagragh();
    timeLeft = maxTime,
    timestart=false,
    wordIndex = 0,
    timeText.innerText = `${maxTime}s`
    correct=0,incorrect=0,wpm=0,cpm=0,wrongkey=0,accuracy=0;
    content.style.display = "none";
    resultBox.style.display = "none";
    startbtnbox.style.display = "flex"
});
tryagain.addEventListener("click", () =>{
    loadparagragh();
    timeLeft = maxTime,
    timestart=false,
    wordIndex = 0,
    timeText.innerText = `${maxTime}s`
    correct=0,incorrect=0,wpm=0,cpm=0,wrongkey=0,accuracy=0;
    content.style.display = "block";
    resultBox.style.display = "none";
    startbtnbox.style.display = "none"
});
