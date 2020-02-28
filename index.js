let clickedValue = '',
    display = document.querySelector('.display'),
    str = '', op = '', x, result, inputArr = [];

function add(args) {
    return args.reduce((accum, arg) => accum + arg, 0);
}

function subtract(args) {
    return args.reduce((accum, arg) => accum - arg, args[0] + args[0]);
}

function multiply(args) {
    return args.reduce((accum, arg) => accum * arg, 1);
}

function divide(args) {
    if (args[1] === 0) return 'Error Dumbass!'
    return args.reduce((accum, arg) => accum / arg, args[0] * args[0]);
}

function operate(args, operator) {
    if (operator === '+') result = add(args);
    if (operator === '-') result = subtract(args);
    if (operator === '/') result = divide(args);
    if (operator === '*') result = multiply(args);

    return result;
}

function updateDisplay(e) {
    clickedValue = e.target.textContent;
    if (clickedValue === 'AC') allClear();
    if (clickedValue === 'C') backSpace();
    if (clickedValue === '=') {
        inputArr.push(op);
        while (inputArr.length >= 3) {
            x = operate([parseFloat(inputArr[0]), parseFloat(inputArr[2])], inputArr[1]);
            display.textContent = x;
            inputArr = inputArr.slice(3);
            inputArr.unshift(x);
            console.log(inputArr);
        }
    }
    if (clickedValue === '+/-') {

    }
};

function allClear() {
    display.textContent = '0';
    clickedValue = '';
    str = '';
    op = '';
    inputArr = [];
    x = 0;
}

function backSpace() {

}

// event listeners for 'AC', 'C', '+/-' & '=' buttons
const buttons = document.querySelectorAll('.other');
buttons.forEach(button => button.addEventListener('mousedown', e => updateDisplay(e)));

// event listeners for (0-9) buttons
const num = document.querySelectorAll('.num');
num.forEach(button => button.addEventListener('mousedown', e => {
    clickedValue = e.target.textContent;
    display.textContent = str + clickedValue;
    str = display.textContent;
    op += clickedValue;
    console.log(inputArr)
}));

// event listeners for '+', '-', '/', '*', '%'
const operator = document.querySelectorAll('.operator');
operator.forEach(button => button.addEventListener('mousedown', e => {
    clickedValue = e.target.textContent;
    inputArr.push(op);
    inputArr.push(clickedValue)
    op = '';
    display.textContent = str + clickedValue;
    str = display.textContent;
    console.log(inputArr)
}));

