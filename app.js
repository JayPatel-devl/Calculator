
        class Calculator {
            constructor(previousOperandTextElement, currentOperandTextElement) {
                this.previousOperandTextElement = previousOperandTextElement;
                this.currentOperandTextElement = currentOperandTextElement;
                this.clear();
            }
            
            clear() {
                this.currentOperand = '0';
                this.previousOperand = '';
                this.operation = undefined;
                this.updateDisplay();
            }
            
            delete() {
                if (this.currentOperand === '0') return;
                this.currentOperand = this.currentOperand.toString().slice(0, -1);
                if (this.currentOperand === '') {
                    this.currentOperand = '0';
                }
                this.updateDisplay();
            }
            
            appendNumber(number) {
                if (number === '.' && this.currentOperand.includes('.')) return;
                if (this.currentOperand === '0' && number !== '.') {
                    this.currentOperand = number.toString();
                } else {
                    this.currentOperand = this.currentOperand.toString() + number.toString();
                }
                this.updateDisplay();
            }
            
            chooseOperation(operation) {
                if (this.currentOperand === '') return;
                if (this.previousOperand !== '') {
                    this.compute();
                }
                this.operation = operation;
                this.previousOperand = this.currentOperand;
                this.currentOperand = '0';
                this.updateDisplay();
            }
            
            compute() {
                let computation;
                const prev = parseFloat(this.previousOperand);
                const current = parseFloat(this.currentOperand);
                if (isNaN(prev) || isNaN(current)) return;
                
                switch (this.operation) {
                    case '+':
                        computation = prev + current;
                        break;
                    case '-':
                        computation = prev - current;
                        break;
                    case '×':
                        computation = prev * current;
                        break;
                    case '÷':
                        computation = prev / current;
                        break;
                    default:
                        return;
                }
                
                this.currentOperand = computation.toString();
                this.operation = undefined;
                this.previousOperand = '';
                this.updateDisplay();
            }
            
            getDisplayNumber(number) {
                const stringNumber = number.toString();
                const integerDigits = parseFloat(stringNumber.split('.')[0]);
                const decimalDigits = stringNumber.split('.')[1];
                let integerDisplay;
                
                if (isNaN(integerDigits)) {
                    integerDisplay = '';
                } else {
                    integerDisplay = integerDigits.toLocaleString('en', {
                        maximumFractionDigits: 0
                    });
                }
                
                if (decimalDigits != null) {
                    return `${integerDisplay}.${decimalDigits}`;
                } else {
                    return integerDisplay;
                }
            }
            
            updateDisplay() {
                this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand);
                if (this.operation != null) {
                    this.previousOperandTextElement.innerText = 
                        `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
                } else {
                    this.previousOperandTextElement.innerText = '';
                }
            }
        }
        
        // Get all the elements
        const numberButtons = document.querySelectorAll('[id^="one"],[id^="two"],[id^="three"],[id^="four"],[id^="five"],[id^="six"],[id^="seven"],[id^="eight"],[id^="nine"],[id^="zero"],[id^="decimal"]');
        const operationButtons = document.querySelectorAll('[id^="add"],[id^="subtract"],[id^="multiply"],[id^="divide"]');
        const equalsButton = document.getElementById('equals');
        const deleteButton = document.getElementById('delete');
        const clearButton = document.getElementById('clear');
        const previousOperandTextElement = document.getElementById('previous-operand');
        const currentOperandTextElement = document.getElementById('current-operand');
        
        // Create calculator instance
        const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);
        
        // Add event listeners
        numberButtons.forEach(button => {
            button.addEventListener('click', () => {
                calculator.appendNumber(button.innerText);
            });
        });
        
        operationButtons.forEach(button => {
            button.addEventListener('click', () => {
                calculator.chooseOperation(button.innerText);
            });
        });
        
        equalsButton.addEventListener('click', () => {
            calculator.compute();
        });
        
        clearButton.addEventListener('click', () => {
            calculator.clear();
        });
        
        deleteButton.addEventListener('click', () => {
            calculator.delete();
        });
        
        // Keyboard support
        document.addEventListener('keydown', (e) => {
            if ((e.key >= 0 && e.key <= 9) || e.key === '.') {
                calculator.appendNumber(e.key);
            } else if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
                let operation;
                switch (e.key) {
                    case '*': operation = '×'; break;
                    case '/': operation = '÷'; break;
                    default: operation = e.key;
                }
                calculator.chooseOperation(operation);
            } else if (e.key === 'Enter' || e.key === '=') {
                calculator.compute();
            } else if (e.key === 'Backspace') {
                calculator.delete();
            } else if (e.key === 'Escape') {
                calculator.clear();
            }
        });
        
        // Add button press animation
        const buttons = document.querySelectorAll('.btn-calc');
        buttons.forEach(button => {
            button.addEventListener('mousedown', () => {
                button.style.transform = 'scale(0.95)';
            });
            
            button.addEventListener('mouseup', () => {
                button.style.transform = 'scale(1)';
            });
            
            button.addEventListener('mouseleave', () => {
                button.style.transform = 'scale(1)';
            });
        });
    