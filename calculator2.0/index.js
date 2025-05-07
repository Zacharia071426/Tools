const resultStack=[];

const inputBox = document.getElementById('myInput');
const buttons = document.querySelectorAll('#calc-button');

buttons.forEach(button =>{
    button.addEventListener('click',() =>{
        inputBox.value += button.value;
        if(button.value=='delete'){
            inputBox.value = inputBox.value.slice(0,-7);
        }
    });
});

function AC(){
    document.getElementById('myInput').value='';
}

document.addEventListener('keydown',function(e){
    if(e.key=='Enter'){
        calculate();
    }
});

function calculate(){
    const expression = document.getElementById("myInput").value;

    const result = eval(myInput.value);
    myInput.value = result;

    const newItem1 = document.createElement('li');
    newItem1.textContent=expression+" = "+result;
    document.getElementById('history-expression').appendChild(newItem1);
}

function clearHist() {
    const historyList = document.getElementById('history-expression');
    while (historyList.firstChild) {
        historyList.removeChild(historyList.firstChild);
    }
    resultStack.length = 0;
}