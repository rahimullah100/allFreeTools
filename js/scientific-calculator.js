// Scientific Calculator Implementation
document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing scientific calculator...');
    
    const display = document.getElementById('calculator-display');
    const buttons = document.querySelectorAll('.calc-btn');
    let shouldResetDisplay = false;
    let lastResult = null;

    // Helper function to append text to the display
    function appendToDisplay(text) {
        if (shouldResetDisplay) {
            // If we have a last result and user is entering an operator, keep the result
            if (lastResult !== null && ['+', '-', '×', '÷', '*', '/', '^', '%'].includes(text)) {
                display.value = lastResult.toString();
                shouldResetDisplay = false;
            } else {
                display.value = '';
                lastResult = null;
                shouldResetDisplay = false;
            }
        }
        display.value += text;
    }

    // Helper function to get the last number in the display
    function getLastNumber() {
        const parts = display.value.split(/[+\-×÷\/\*\^%]/);
        return parts[parts.length - 1];
    }

    // Handle backspace button
    function handleBackspace() {
        display.value = display.value.slice(0, -1);
    }

    // Evaluate mathematical expression
    function evaluateExpression() {
        if (!display.value) return;
        
        try {
            // If we're in reset mode but have a last result and the input starts with an operator,
            // prepend the last result to the expression
            let currentExpr = display.value;
            if (shouldResetDisplay && lastResult !== null && /^[+\-×÷*\/^%]/.test(currentExpr)) {
                currentExpr = lastResult + currentExpr;
            }
            
            // Replace display symbols with JavaScript operators
            let expr = currentExpr
                .replace(/×/g, '*')
                .replace(/÷/g, '/')
                .replace(/%/g, '/100')
                .replace(/π/g, 'Math.PI')
                .replace(/e/g, 'Math.E');

            // Handle scientific functions
            expr = expr.replace(/(sin|cos|tan|sqrt|log|ln)\(/g, 'Math.$1(');
            
            // Handle power (^)
            expr = expr.replace(/\^/g, '**');
            
            // Evaluate the expression
            const result = Function('return ' + expr)();
            
            // Format the result
            const formattedResult = Number.isInteger(result) ? 
                result.toString() : 
                parseFloat(result.toFixed(10)).toString();
                
            display.value = formattedResult;
            lastResult = parseFloat(formattedResult); // Store the numeric result
            shouldResetDisplay = true;
        } catch (error) {
            console.error('Calculation error:', error);
            displayError();
        }
    }

    // Helper function to display errors
    function displayError() {
        display.value = 'Error';
        setTimeout(() => {
            display.value = '';
            shouldResetDisplay = false;
        }, 1000);
    }

    // Handle percentage calculation
    function handlePercentage() {
        try {
            if (display.value === '') {
                display.value = '0';
                shouldResetDisplay = true;
                return;
            }
            const current = parseFloat(display.value);
            if (!isNaN(current)) {
                const result = current / 100;
                display.value = Number.isInteger(result) ? 
                    result.toString() : 
                    result.toFixed(8).replace(/\.?0+$/, '');
                shouldResetDisplay = true;
            }
        } catch (error) {
            displayError();
        }
    }

    // Handle square root
    function handleSquareRoot() {
        try {
            if (display.value === '' && lastResult !== null) {
                display.value = lastResult;
            }
            const current = parseFloat(display.value || '0');
            if (current < 0) {
                throw new Error('Invalid input for square root');
            }
            const result = Math.sqrt(current);
            display.value = Number.isInteger(result) ? result.toString() : result.toFixed(8).replace(/\.?0+$/, '');
            shouldResetDisplay = true;
        } catch (error) {
            displayError();
        }
    }

    // Handle scientific functions button press
    function handleFunctionButton(func) {
        // If there's already a value, use it as the argument
        if (display.value !== '' && !isNaN(display.value)) {
            try {
                const current = parseFloat(display.value);
                let result;
                
                switch(func) {
                    case 'sin':
                    case 'cos':
                    case 'tan':
                        // Convert degrees to radians for trig functions
                        result = Math[func](current * (Math.PI / 180));
                        break;
                    case 'sqrt':
                        if (current < 0) throw new Error('Invalid input');
                        result = Math.sqrt(current);
                        break;
                    case 'log':
                        if (current <= 0) throw new Error('Invalid input');
                        result = Math.log10(current);
                        break;
                    case 'ln':
                        if (current <= 0) throw new Error('Invalid input');
                        result = Math.log(current);
                        break;
                    default:
                        throw new Error('Unknown function');
                }
                
                // Format the result
                const formattedResult = Number.isInteger(result) ? 
                    result.toString() : 
                    result.toFixed(8).replace(/\.?0+$/, '');
                    
                display.value = formattedResult;
                shouldResetDisplay = true;
            } catch (error) {
                displayError();
            }
        } else {
            // If no number is entered yet, just append the function and opening parenthesis
            appendToDisplay(func + '(');
            shouldResetDisplay = false;
        }
    }

    // Add click event listeners to all calculator buttons
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const action = button.getAttribute('data-action');
            const value = button.textContent.trim();
            
            try {
                switch(action) {
                    case 'number':
                        appendToDisplay(value);
                        break;
                        
                    case 'clear':
                        display.value = '';
                        lastResult = null;
                        shouldResetDisplay = false;
                        break;
                        
                    case 'backspace':
                        handleBackspace();
                        break;
                        
                    case 'operator':
                        const trimmedValue = value.trim();
                        if (trimmedValue === '%') {
                            handlePercentage();
                        } else {
                            appendToDisplay(trimmedValue);
                        }
                        break;
                        
                    case 'decimal':
                        const lastNumber = getLastNumber();
                        if (!lastNumber.includes('.')) {
                            appendToDisplay('.');
                        }
                        break;
                        
                    case 'function':
                        if (value === '√') {
                            handleSquareRoot();
                        } else if (['sin', 'cos', 'tan', 'log', 'ln', 'sqrt'].includes(value)) {
                            handleFunctionButton(value);
                        } else {
                            appendToDisplay(value + '(');
                        }
                        break;
                        
                    case 'constant':
                        if (value === 'π') {
                            appendToDisplay('3.14159265359');
                        } else if (value === 'e') {
                            appendToDisplay('2.71828182846');
                        } else {
                            appendToDisplay(value);
                        }
                        break;
                        
                    case 'parenthesis':
                        appendToDisplay(value);
                        break;
                        
                    case 'equals':
                        evaluateExpression();
                        break;
                }
            } catch (error) {
                console.error('Button click error:', error);
                display.value = 'Error';
                setTimeout(() => {
                    display.value = '';
                    shouldResetDisplay = false;
                }, 1000);
            }
        });
    });

    // // Keyboard support
    // document.addEventListener('keydown', (e) => {
    //     const key = e.key;
        
    //     // Allow numbers, operators, and navigation keys
    //     if (/[0-9+\-*/.=]/.test(key) || 
    //         key === 'Enter' || 
    //         key === 'Backspace' || 
    //         key === 'Delete' ||
    //         key === 'Escape' ||
    //         key === '(' || key === ')' ||
    //         key === '^' || key === '%') {
            
    //         if (key === 'Enter' || key === '=') {
    //             e.preventDefault();
    //             const equalsBtn = document.querySelector('.calc-btn[data-action="equals"]');
    //             if (equalsBtn) equalsBtn.click();
    //         } else if (key === 'Escape') {
    //             e.preventDefault();
    //             const clearBtn = document.querySelector('.calc-btn[data-action="clear"]');
    //             if (clearBtn) clearBtn.click();
    //         } else if (key === 'Backspace') {
    //             // Let the default backspace behavior work
    //         } else {
    //             // Find and click the corresponding button
    //             const buttons = document.querySelectorAll('.calc-btn');
    //             for (const btn of buttons) {
    //                 if (btn.textContent.trim() === key || 
    //                     (key === '*' && btn.textContent.trim() === '×') ||
    //                     (key === '/' && btn.textContent.trim() === '÷')) {
    //                     btn.click();
    //                     e.preventDefault();
    //                     break;
    //                 }
    //             }
    //         }
    //     }
    // });
    
    console.log('Scientific calculator initialized');
});
