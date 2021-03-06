let clickedValue = '',
    display = document.querySelector('.display'),
    str = '', op = '', x, result, inputArr = [],
    plusMinus = true, d = false, y = '', bsCount = 0;

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
    if (!e.key)
        clickedValue = e.target.textContent;
    else clickedValue = e.key;
    if (clickedValue === 'AC' || clickedValue === 'r') allClear();
    if (clickedValue === 'C' || clickedValue === 'Backspace') backSpace();
    if (clickedValue === '=' || clickedValue === 'Enter') {
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
        if (parseFloat(str) < 0)
            str = str.substring(1);
        else str = '-' + str;
        display.textContent = str;
        op = str;
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
    if (bsCount === 0) {
        inputArr.push(op);
        bsCount++;
    }
    display.textContent = display.textContent.slice(0, -1);
    str = display.textContent;
    op = display.textContent;
    y = inputArr.slice(-1)[0];
    y = y.slice(0, -1);
    inputArr[inputArr.length - 1] = y;
    inputArr = inputArr.filter(v => v != '');
}

function operatorCalc(e) {
    if (!e.key)
        clickedValue = e.target.textContent;
    else clickedValue = e.key;
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
}

function numCalc(e) {
    if (!e.key)
        clickedValue = e.target.textContent;
    else clickedValue = e.key;
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
}

// event listeners for 'AC', 'C', '+/-' & '=' buttons
const buttons = document.querySelectorAll('.other');
buttons.forEach(button => button.addEventListener('mousedown', updateDisplay));

// event listeners for (0-9) buttons
const num = document.querySelectorAll('.num');
num.forEach(button => button.addEventListener('mousedown', e => numCalc(e)));

// event listeners for '+', '-', '/', '*', '%'
const operator = document.querySelectorAll('.operator');
operator.forEach(button => button.addEventListener('mousedown', e => operatorCalc(e)));

const keyboard = window.addEventListener('keydown', e => {
    if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') operatorCalc(e);
    if (e.key === '0' || e.key === '1' || e.key === '2' || e.key === '3' || e.key === '4' || e.key === '5' || e.key === '6' || e.key === '7' || e.key === '8' || e.key === '9')
        numCalc(e);
    if (e.key === 'Enter') updateDisplay(e);
    if (e.key === 'Backspace') updateDisplay(e);
    if (e.key === 'r') updateDisplay(e);
})

const plusMinusButton = document.querySelector('.plusminus');
plusMinusButton.addEventListener('mousedown', updateDisplay);

