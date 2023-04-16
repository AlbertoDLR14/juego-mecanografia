const typingText = document.querySelector(".typing-text p"),
inputField = document.querySelector(".wrapper .input-field"),
timeTag = document. querySelector(".time span b"),
mistakeTag = document.querySelector(".mistake span"),
wpmTag = document.querySelector(".wpm span"),
cpmTag = document.querySelector(".cpm span"),
boton = document.querySelector("button");

let timer,
maxTime = 60,
timeLeft = maxTime,
charIndex = mistakes = isTyping = 0;

function randomTexto(){
    let randIndex = Math.floor(Math.random()*textos.length);
    typingText.innerHTML = "";
    textos[randIndex].split("").forEach(span => {
        let spanTag = `<span>${span}</span>`;
        typingText.innerHTML += spanTag;
    });
    typingText.querySelectorAll("span")[0].classList.add("active");
    document.addEventListener('keydown', () => inputField.focus());
    document.addEventListener('click', () => inputField.focus());
}

function initTyping() {
    const characters = typingText.querySelectorAll("span");
    let typedChar = inputField.value.split("")[charIndex];

    if(charIndex < characters.length - 1 && timeLeft > 0){
        if(!isTyping){
            timer = setInterval(initTimer, 1000);
            isTyping = true;
        }
    
        if(typedChar == null){
            charIndex--;
            if(characters[charIndex].classList.contains('incorrect')){
                mistakes--;
            }
            characters[charIndex].classList.remove('correct','incorrect');
    
        }else{
            if(characters[charIndex].innerText == typedChar){
                characters[charIndex].classList.add('correct');
            }else{
                mistakes++;
                characters[charIndex].classList.add('incorrect');
            }
            charIndex++;
        }
    
        characters.forEach(span => span.classList.remove("active"));
        characters[charIndex].classList.add("active");
    
        let wpm = Math.round((((charIndex - mistakes) / 5) / (maxTime - timeLeft)) * 60);
        wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;
        mistakeTag.innerText = mistakes;
        wpmTag.innerText = wpm;
        cpmTag.innerText = charIndex - mistakes;
    }else{
        inputField.value = "";
        clearInterval(timer);
    }
}

function initTimer() {
    if(timeLeft > 0){
        timeLeft--;
        timeTag.innerText = timeLeft;
    }else{
        clearInterval(timer);
    }
}

function resetGame(){
    randomTexto();
    inputField.value = "";
    clearInterval(timer);
    timeLeft = maxTime,
    charIndex = mistakes = isTyping = 0;
    timeTag.innerText = timeLeft;
    mistakeTag.innerText = mistakes;
    wpmTag.innerText = 0;
    cpmTag.innerText = 0;
}

randomTexto();

inputField.addEventListener('input', initTyping);

boton.addEventListener('click', resetGame);