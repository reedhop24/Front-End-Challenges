window.addEventListener('load', () => {
    let table = document.getElementById('calculator');
    let answer = document.getElementById('answer');
    let firstNumber = 0;
    let operation = '';
    let secondNumber = '';
    let currSymbol;

    table.addEventListener('click', (ev) => {
        if(ev.target.innerHTML === '-' && firstNumber === 0) {
            firstNumber = '-';
        } else if(!isNaN(ev.target.innerHTML) && operation === '' || ev.target.innerHTML == '.' && operation === '') {
            if(firstNumber === 0) firstNumber = '';
            firstNumber += ev.target.innerHTML;
            answer.innerHTML = firstNumber;
        } else if(isNaN(ev.target.innerHTML) && ev.target.innerHTML !== '=' && ev.target.innerHTML !== '.') {
            operation = ev.target.innerHTML;
            currSymbol = document.getElementById(ev.target.id);
            currSymbol.style = 'background-color: black; color: white';
        } else if(!isNaN(ev.target.innerHTML) && operation !== '' || ev.target.innerHTML == '.' && operation !== ''){
            secondNumber += ev.target.innerHTML;
            answer.innerHTML = secondNumber;
        } else if(ev.target.innerHTML === '=') {
            answer.innerHTML= evaluate(firstNumber, secondNumber, operation);
            currSymbol.style = 'background-color: white; color: black';
        }
    });

    const evaluate = (first, second, oper) => {
        console.log(Number(second), first, oper);
        switch(oper) {
            case '+':
                return Number(first) + Number(second)
            case '-':
                return Number(first) - Number(second)
            case 'X':
                return Number(first) * Number(second)
            case '%':
                return Number(first) / Number(second)
        }
    }
});