
const startButton = document.querySelector('button[data-start]')
const stopButton = document.querySelector('button[data-stop]')
const body = document.body;


function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function colorSwitcher(){
    body.style.backgroundColor=getRandomHexColor();
}

let id = null;

startButton.addEventListener("click",()=>{
    id = setInterval(colorSwitcher,1000);
    startButton.disabled = true;
    //startButton.disabled = !!stopButton.disabled;
});

stopButton.addEventListener('click',()=>{
    clearInterval(id);
    startButton.disabled = false;
})