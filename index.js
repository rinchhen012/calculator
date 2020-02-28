let clickedValue = '',
    display = document.querySelector('.display'),
    str = '', op = '', x, result, inputArr = [],
    plusMinus = true, d = false, y = '';

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
    if (args[1] === 0) return 'issa dumbo!'
    else
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
            if (typeof x === 'number')
                x = Math.round((x + Number.EPSILON) * 100) / 100;
            display.textContent = x;
            inputArr = inputArr.slice(3);
            inputArr.unshift(x);
        }
        str = x;
        op = x;
        inputArr = [];
    }
    if (clickedValue === '+/-') {
        if (parseFloat(str) < 0) {
            str = str.substring(1);
            display.textContent = str;
            op = str;
        }
        if (parseFloat(str) > 0) {
            str = '-' + str;
            display.textContent = str;
            op = str;
        }
        plusMinusButton.removeEventListener('mousedown', updateDisplay);
        plusMinus = false;
    }
};

function allClear() {
    display.textContent = '0';
    clickedValue = '';
    str = '';
    op = '';
    inputArr = [];
    x = 0;
    result = 0;
}

function backSpace() {
    display.textContent = display.textContent.slice(0, -1);
    str = display.textContent;
    op = display.textContent;
    y = inputArr.slice(-1)[0];
    y = y.slice(0, -1);
    inputArr[inputArr.length - 1] = y;
    inputArr = inputArr.filter(v => v != '');
}

// event listeners for 'AC', 'C', '+/-' & '=' buttons
const buttons = document.querySelectorAll('.other');
buttons.forEach(button => button.addEventListener('mousedown', e => updateDisplay(e)));

// event listeners for (0-9) buttons
const num = document.querySelectorAll('.num');
num.forEach(button => button.addEventListener('mousedown', e => {
    clickedValue = e.target.textContent;
    if (d) {
        display.textContent = '';
        display.textContent = '-' + clickedValue;
        str = display.textContent;
        op += str;
        d = false;
    } else {
        display.textContent = str + clickedValue;
        str = display.textContent;
        op += clickedValue;
    }
}));

// event listeners for '+', '-', '/', '*', '%'
const operator = document.querySelectorAll('.operator');
operator.forEach(button => button.addEventListener('mousedown', e => {
    clickedValue = e.target.textContent;
    if (clickedValue === '-' && op === '') {
        d = true;
        display.textContent = '-';
    } else {
        inputArr.push(op);
        inputArr.push(clickedValue)
        op = '';
        display.textContent = str + clickedValue;
        str = display.textContent;
        plusMinusButton.addEventListener('mousedown', updateDisplay);
    }
}));

const plusMinusButton = document.querySelector('.plusminus');
plusMinusButton.addEventListener('mousedown', updateDisplay);

