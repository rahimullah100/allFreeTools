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
            display.value = '';
            shouldResetDisplay = false;
        }
        // Allow any text input without validation
        display.value += text;
    }

    // Helper function to get the last number in the display
    function getLastNumber() {
        const parts = display.value.split(/[+\-×÷\/\*\^%]/);
        return parts[parts.length - 1];
    }

    // Handle backspace button
    function handleBackspace() {
        // Allow backspace to work normally
        display.value = display.value.slice(0, -1);
    }

    // Evaluate mathematical expression
    function evaluateExpression() {
        if (!display.value) return;
        
        try {
            // Allow any expression to be evaluated
            const result = Function('return ' + display.value)();
            display.value = result.toString();
            lastResult = result.toString();
            shouldResetDisplay = true;
        } catch (error) {
            console.error('Calculation error:', error);
            // Don't clear on error, just show the error
            display.value = 'Error: ' + error.message;
            shouldResetDisplay = true;
        }
    }


    // Handle percentage calculation
    function handlePercentage() {
        try {
            // Just append % to the current value
            display.value = display.value + '%';
        } catch (error) {
            console.error('Percentage error:', error);
            display.value = 'Error';
        }
    }

    // Handle square root
    function handleSquareRoot() {
        try {
            // Just append sqrt() to the current value
            display.value = 'Math.sqrt(' + display.value + ')';
        } catch (error) {
            console.error('Square root error:', error);
            display.value = 'Error';
        }
    }

    // Handle trigonometric functions
    function handleTrigFunction(func) {
        try {
            // Just append the function call
            display.value = 'Math.' + func + '(' + display.value + ' * Math.PI / 180)';
        } catch (error) {
            console.error('Trig function error:', error);
            display.value = 'Error';
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
                        
                    case 'operator':
                        if (value === 'C') {
                            display.value = '';
                            lastResult = null;
                        } else if (value === '⌫') {
                            handleBackspace();
                        } else if (value === '%') {
                            handlePercentage();
                        } else {
                            appendToDisplay(value);
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
                        } else if (['sin', 'cos', 'tan'].includes(value)) {
                            handleTrigFunction(value);
                        } else {
                            appendToDisplay(value + '(');
                        }
                        break;
                        
                    case 'constant':
                        appendToDisplay(value);
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

    // Keyboard support
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

    const calculateVectorBtn = document.getElementById('calculate-vector');
    if (calculateVectorBtn && typeof calculateVector === 'function') {
        calculateVectorBtn.addEventListener('click', calculateVector);
        console.log('Vector calculator initialized');
    }
    
    // Setup copy buttons
    setupCopyButtons();
    
    console.log('Math tools initialized successfully');
});

// Error handling for any initialization errors
window.addEventListener('error', function(error) {
    console.error('Error in math tools:', error);
});

// Navigation functionality
function setupNavigation() {
    console.log('Setting up navigation...');
    
    const quickNavLinks = document.querySelectorAll('.quick-nav-links a');
    const toolCards = document.querySelectorAll('.tool-card');
    
    console.log(`Found ${quickNavLinks.length} navigation links and ${toolCards.length} tool cards`);

    // Function to show a specific tool card
    function showToolCard(cardId) {
        console.log(`Attempting to show tool card: ${cardId}`);
        
        let found = false;
        toolCards.forEach(card => {
            if (card.id === cardId) {
                card.classList.add('active');
                card.style.display = 'block';
                // Scroll to the card with smooth behavior
                card.scrollIntoView({ behavior: 'smooth', block: 'start' });
                found = true;
                console.log(`Successfully showed tool card: ${cardId}`);
            } else {
                card.classList.remove('active');
                card.style.display = 'none';
            }
        });
        
        if (!found) {
            console.warn(`Tool card with ID "${cardId}" not found`);
        }
    }

    // Initialize all tool cards to be hidden
    toolCards.forEach(card => {
        card.style.display = 'none';
        card.classList.remove('active');
    });

    // Show Scientific Calculator by default if no hash is present
    if (!window.location.hash) {
        console.log('No hash found, showing default calculator');
        showToolCard('calculator');
    }

    // Handle quick navigation clicks
    quickNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Navigation link clicked:', this.getAttribute('href'));
            
            // Remove active class from all links
            quickNavLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Get target tool card ID
            const targetId = this.getAttribute('href').substring(1);
            
            // Show the target tool card
            showToolCard(targetId);
            
            // Update URL hash without triggering scroll
            history.pushState(null, null, this.getAttribute('href'));
        });
    });

    // Handle hash navigation on page load
    if (window.location.hash) {
        const targetId = window.location.hash.substring(1);
        console.log('Hash found in URL:', targetId);
        
        // Show the target tool card
        showToolCard(targetId);
        
        // Update active state in navigation
        const activeLink = document.querySelector(`.quick-nav-links a[href="#${targetId}"]`);
        if (activeLink) {
            quickNavLinks.forEach(l => l.classList.remove('active'));
            activeLink.classList.add('active');
            console.log('Updated active navigation link');
        } else {
            console.warn(`Navigation link for "${targetId}" not found`);
        }
    }
    
    // Handle browser back/forward buttons
    window.addEventListener('popstate', function() {
        const targetId = window.location.hash.substring(1) || 'calculator';
        console.log('Handling popstate, showing:', targetId);
        showToolCard(targetId);
        
        // Update active state in navigation
        const activeLink = document.querySelector(`.quick-nav-links a[href="#${targetId}"]`);
        if (activeLink) {
            quickNavLinks.forEach(l => l.classList.remove('active'));
            activeLink.classList.add('active');
        }
    });
    
    console.log('Navigation setup completed');
}

// Calculator Functions
function calculateScientific(expression) {
    try {
        // Replace multiplication and division symbols with their JavaScript equivalents
        expression = expression.replace(/×/g, '*').replace(/÷/g, '/');
        
        // Create a scope object with all mathematical functions and constants
        const scope = {
            // Trigonometric functions (in degrees)
            sin: (x) => Math.sin(x * (Math.PI / 180)),
            cos: (x) => Math.cos(x * (Math.PI / 180)),
            tan: (x) => Math.tan(x * (Math.PI / 180)),
            
            // Logarithms
            log: Math.log10,
            ln: Math.log,
            
            // Powers and roots
            sqrt: Math.sqrt,
            pow: Math.pow,
            
            // Constants
            PI: Math.PI,
            E: Math.E,
            
            // Other functions
            abs: Math.abs,
            round: Math.round,
            floor: Math.floor,
            ceil: Math.ceil
        };

        // Use math.js for more reliable expression evaluation
        const result = math.evaluate(expression, scope);
        
        // Handle very small numbers and round to 10 decimal places
        if (Math.abs(result) < 1e-10) {
            return '0';
        }
        
        // Round to 10 decimal places to avoid floating point issues
        return Number(result.toFixed(10)).toString();
    } catch (error) {
        console.error('Calculation error:', error);
        throw new Error('Invalid expression');
    }
}

function calculateMatrix(matrixA, matrixB, operation) {
    try {
        switch(operation) {
            case 'add':
                return matrixAdd(matrixA, matrixB);
            case 'subtract':
                return matrixSubtract(matrixA, matrixB);
            case 'multiply':
                return matrixMultiply(matrixA, matrixB);
            default:
                throw new Error('Invalid operation');
        }
    } catch (error) {
        throw new Error('Matrix calculation error: ' + error.message);
    }
}

function calculateGCDLCM(numbers) {
    try {
        const gcd = numbers.reduce((a, b) => {
            while (b) {
                let t = b;
                b = a % b;
                a = t;
            }
            return a;
        });
        
        const lcm = numbers.reduce((a, b) => {
            return Math.abs(a * b) / gcd;
        });
        
        return { gcd, lcm };
    } catch (error) {
        throw new Error('GCD/LCM calculation error');
    }
}

function calculateComplex(operation, num1, num2) {
    try {
        switch(operation) {
            case 'add':
    return {
                    real: num1.real + num2.real,
                    imag: num1.imag + num2.imag
                };
            case 'subtract':
                return {
                    real: num1.real - num2.real,
                    imag: num1.imag - num2.imag
                };
            case 'multiply':
                return {
                    real: num1.real * num2.real - num1.imag * num2.imag,
                    imag: num1.real * num2.imag + num1.imag * num2.real
                };
            case 'divide':
                const denominator = num2.real * num2.real + num2.imag * num2.imag;
                return {
                    real: (num1.real * num2.real + num1.imag * num2.imag) / denominator,
                    imag: (num1.imag * num2.real - num1.real * num2.imag) / denominator
                };
            default:
                throw new Error('Invalid operation');
        }
    } catch (error) {
        throw new Error('Complex number calculation error');
    }
}

// Helper function to parse complex number
function parseComplexNumber(str) {
    str = str.trim();
    // Match patterns like "a+bi", "a-bi", "bi", "-bi", "a", "-a"
    const match = str.match(/^(-?\d+(?:\.\d+)?)?([+-]?\d+(?:\.\d+)?)?i$|^(-?\d+(?:\.\d+)?)$/);
    if (!match) {
        throw new Error(`Invalid complex number format: ${str}`);
    }
    
    let real = 0;
    let imag = 0;
    
    if (match[3]) {
        // Real number only
        real = parseFloat(match[3]);
    } else {
        // Complex number
        if (match[1]) real = parseFloat(match[1]);
        if (match[2]) imag = parseFloat(match[2]);
    }
    
    return { real, imag };
}

// Helper function to format complex number with proper mathematical notation
function formatComplexNumber(complex) {
    const { real, imag } = complex;
    
    // Round to 6 decimal places to avoid floating point issues
    const roundedReal = Math.round(real * 1e6) / 1e6;
    const roundedImag = Math.round(imag * 1e6) / 1e6;
    
    if (roundedImag === 0) {
        return roundedReal.toString();
    }
    
    let result = '';
    if (roundedReal !== 0) {
        result += roundedReal.toString();
    }
    
    if (roundedImag !== 0) {
        const sign = roundedImag > 0 ? (roundedReal !== 0 ? '+' : '') : '-';
        const absImag = Math.abs(roundedImag);
        result += `${sign}${absImag === 1 ? '' : absImag}i`;
    }
    
    return result;
}

// Helper function to multiply two complex numbers
function multiplyComplex(a, b) {
    return {
        real: a.real * b.real - a.imag * b.imag,
        imag: a.real * b.imag + a.imag * b.real
    };
}

// Helper function to subtract two complex numbers
function subtractComplex(a, b) {
    return {
        real: a.real - b.real,
        imag: a.imag - b.imag
    };
}

// Vector Calculator
function calculateVector(operation, vector1, vector2) {
    try {
        switch(operation) {
            case 'add':
                return vector1.map((v1, i) => ({
                    real: v1.real + vector2[i].real,
                    imag: v1.imag + vector2[i].imag
                }));
            case 'subtract':
                return vector1.map((v1, i) => ({
                    real: v1.real - vector2[i].real,
                    imag: v1.imag - vector2[i].imag
                }));
            case 'dot':
                return vector1.reduce((sum, v1, i) => {
                    const v2 = vector2[i];
                    return {
                        real: sum.real + (v1.real * v2.real - v1.imag * v2.imag),
                        imag: sum.imag + (v1.real * v2.imag + v1.imag * v2.real)
                    };
                }, { real: 0, imag: 0 });
            default:
                throw new Error('Invalid operation');
        }
    } catch (error) {
        throw new Error('Vector calculation error');
    }
}

// Setup Event Listeners
function setupCalculatorEventListeners() {
    console.log('Setting up calculator event listeners...');
    
    // Scientific Calculator
    const calculatorDisplay = document.getElementById('calculator-display');
    const calculatorButtons = document.querySelectorAll('.calculator-buttons .calc-btn, .scientific-functions .calc-btn');
    
    if (!calculatorDisplay) {
        console.error('Calculator display element not found');
        return;
    }
    
    // Initialize calculator display
    calculatorDisplay.value = '';
    
    // Add event listeners to the buttons
    calculatorButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const action = this.dataset.action;
            const value = this.textContent.trim();
            
            if (!action) {
                console.warn('Button has no data-action:', this);
                return;
            }
            
            try {
                if (!calculatorDisplay) {
                    throw new Error('Calculator display not initialized');
                }
                
                console.log('Button clicked - Action:', action, 'Value:', value);
                switch(action) {
                    case 'number':
                    case 'operator':
                    case 'decimal':
                    case 'parenthesis':
                        calculatorDisplay.value += value;
            break;
                    case 'clear':
                        calculatorDisplay.value = '';
                break;
                    case 'backspace':
                        calculatorDisplay.value = calculatorDisplay.value.slice(0, -1);
                break;
                    case 'equals':
                        try {
                            const result = calculateScientific(calculatorDisplay.value);
                            calculatorDisplay.value = result;
                        } catch (error) {
                            calculatorDisplay.value = 'Error';
                            setTimeout(() => {
                                calculatorDisplay.value = '';
                            }, 1000);
                        }
                break;
                    case 'function':
                        // Handle scientific functions
                        switch(value) {
                            case 'sin':
                            case 'cos':
                            case 'tan':
                            case 'sqrt':
                            case 'log':
                            case 'ln':
                        calculatorDisplay.value += value + '(';
                                break;
                            default:
                                calculatorDisplay.value += value;
                        }
                        break;
                    case 'constant':
                        // Handle constants
                        switch(value) {
                            case 'π':
                                calculatorDisplay.value += 'PI';
                                break;
                            case 'e':
                                calculatorDisplay.value += 'E';
                                break;
                            default:
                                calculatorDisplay.value += value;
                        }
                break;
        }
    } catch (error) {
                calculatorDisplay.value = 'Error';
                setTimeout(() => {
                    calculatorDisplay.value = '';
                }, 1000);
            }
        });
    });
    
    // Matrix Calculator
    const matrixCalculateBtn = document.getElementById('calculate-matrix');
    if (matrixCalculateBtn) {
        matrixCalculateBtn.addEventListener('click', () => {
            try {
                const matrixA = getMatrixValues('matrix-a');
                const matrixB = getMatrixValues('matrix-b');
                const operation = document.getElementById('matrix-operation').value;
                const result = calculateMatrix(matrixA, matrixB, operation);
                document.getElementById('matrix-result').textContent = JSON.stringify(result);
    } catch (error) {
                showError('matrix-result', error.message);
            }
        });
    }
    
    // GCD & LCM Calculator
    const calculateGCDLCMBtn = document.getElementById('calculate-gcd-lcm');
    if (calculateGCDLCMBtn) {
        calculateGCDLCMBtn.addEventListener('click', () => {
            try {
                const numbersInput = document.getElementById('gcd-lcm-numbers');
                if (!numbersInput) {
                    throw new Error('Input element not found');
                }

                const numbers = numbersInput.value
                    .split(',')
                    .map(n => n.trim())
                    .filter(n => n !== '')
                    .map(n => parseInt(n));

                if (numbers.length === 0) {
                    throw new Error('Please enter at least one number');
                }

                if (numbers.some(isNaN)) {
                    throw new Error('Invalid number format');
                }

                // Calculate GCD
                const gcd = numbers.reduce((a, b) => {
                    while (b) {
                        let t = b;
                        b = a % b;
                        a = t;
                    }
                    return a;
                });

                // Calculate LCM
                const lcm = numbers.reduce((a, b) => {
                    return Math.abs(a * b) / gcd;
                });

                // Update results
                const gcdResult = document.getElementById('gcd-result');
                const lcmResult = document.getElementById('lcm-result');

                if (gcdResult) {
                    gcdResult.textContent = gcd.toString();
                    gcdResult.style.display = 'block';
                }

                if (lcmResult) {
                    lcmResult.textContent = lcm.toString();
                    lcmResult.style.display = 'block';
                }

                // Log results for debugging
                console.log('GCD & LCM Results:', {
                    numbers: numbers,
                    gcd: gcd,
                    lcm: lcm
                });

    } catch (error) {
                // Clear results on error
                const gcdResult = document.getElementById('gcd-result');
                const lcmResult = document.getElementById('lcm-result');

                if (gcdResult) {
                    gcdResult.textContent = '';
                    gcdResult.style.display = 'none';
                }

                if (lcmResult) {
                    lcmResult.textContent = '';
                    lcmResult.style.display = 'none';
                }

                showError('conversion-results', error.message);
            }
        });
    }
    
    // Complex Numbers Calculator
    const complexBtn = document.getElementById('calculate-complex');
    if (complexBtn) {
        complexBtn.addEventListener('click', () => {
            try {
                const operation = document.getElementById('complex-operation').value;
                const num1 = {
                    real: parseFloat(document.getElementById('complex1-real').value),
                    imag: parseFloat(document.getElementById('complex1-imag').value)
                };
                const num2 = {
                    real: parseFloat(document.getElementById('complex2-real').value),
                    imag: parseFloat(document.getElementById('complex2-imag').value)
                };
                const result = calculateComplex(operation, num1, num2);
                document.getElementById('complex-result').textContent = 
                    `${result.real} + ${result.imag}i`;
    } catch (error) {
                showError('complex-result', error.message);
            }
        });
    }
    
    // Vector Calculator
    const vectorBtn = document.getElementById('calculate-vector');
    if (vectorBtn) {
        vectorBtn.addEventListener('click', () => {
            try {
                const operation = document.getElementById('vector-operation').value;
                const vector1Str = document.getElementById('vector1').value.trim();
                const vector2Str = document.getElementById('vector2').value.trim();

                if (!vector1Str || !vector2Str) {
                    throw new Error('Please enter both vectors');
                }

                // Parse vectors from comma-separated complex numbers
                const vector1 = vector1Str.split(',').map(x => parseComplexNumber(x.trim()));
                const vector2 = vector2Str.split(',').map(x => parseComplexNumber(x.trim()));

                // Validate vector dimensions
                if (vector1.length !== vector2.length) {
                    throw new Error('Vectors must have the same dimensions');
                }

                let result;
                switch (operation) {
                    case 'add':
                        result = vector1.map((v1, i) => ({
                            real: v1.real + vector2[i].real,
                            imag: v1.imag + vector2[i].imag
                        }));
                        break;
                    case 'subtract':
                        result = vector1.map((v1, i) => ({
                            real: v1.real - vector2[i].real,
                            imag: v1.imag - vector2[i].imag
                        }));
                        break;
                    case 'dot':
                        result = vector1.reduce((sum, v1, i) => {
                            const v2 = vector2[i];
                            return {
                                real: sum.real + (v1.real * v2.real - v1.imag * v2.imag),
                                imag: sum.imag + (v1.real * v2.imag + v1.imag * v2.real)
                            };
                        }, { real: 0, imag: 0 });
                        break;
                    default:
                        throw new Error('Invalid operation');
                }

                // Format result based on operation type
                let resultText;
                if (operation === 'dot') {
                    resultText = formatComplexNumber(result);
                } else {
                    resultText = `[${result.map(formatComplexNumber).join(', ')}]`;
                }

                // Update result display with proper mathematical notation
                const resultElement = document.getElementById('vector-result');
                resultElement.textContent = resultText;
                
                // Add tooltip with operation details
                const operationSymbols = {
                    'add': '+',
                    'subtract': '-',
                    'dot': '·'
                };
                resultElement.title = `Result of ${operationSymbols[operation]} operation`;

                // Log detailed calculation for debugging
                console.log('Vector calculation:', {
                    operation,
                    vector1: vector1.map(formatComplexNumber),
                    vector2: vector2.map(formatComplexNumber),
                    result: resultText,
                    operationSymbol: operationSymbols[operation]
                });
    } catch (error) {
                console.error('Vector calculation error:', error);
                showError('conversion-results', error.message);
            }
        });
    }

    // Series Calculator
    const calculateSeriesBtn = document.getElementById('calculate-series');
    if (calculateSeriesBtn) {
        calculateSeriesBtn.addEventListener('click', function() {
            try {
                const seriesType = document.getElementById('series-type').value;
                let result;
                let terms = [];
                
                switch (seriesType) {
                    case 'arithmetic':
                        const firstTerm = parseFloat(document.getElementById('series-first-term').value);
                        const commonRatio = parseFloat(document.getElementById('series-common-diff').value);
                        const numTerms = parseInt(document.getElementById('series-terms').value);

                        if (isNaN(firstTerm) || isNaN(commonRatio) || isNaN(numTerms)) {
                            throw new Error('Please enter valid numbers');
                        }

                        // Calculate terms and sum of arithmetic series
                        for (let i = 0; i < numTerms; i++) {
                            const term = firstTerm + i * commonRatio;
                            terms.push(term);
                        }
                        result = (numTerms / 2) * (firstTerm + terms[terms.length - 1]);
                        break;
                        
                    case 'geometric':
                        const geoFirstTerm = parseFloat(document.getElementById('series-first-term').value);
                        const geoRatio = parseFloat(document.getElementById('series-common-diff').value);
                        const geoNumTerms = parseInt(document.getElementById('series-terms').value);

                        if (isNaN(geoFirstTerm) || isNaN(geoRatio) || isNaN(geoNumTerms)) {
                            throw new Error('Please enter valid numbers');
                        }

                        // Calculate terms and sum of geometric series
                        let currentTerm = geoFirstTerm;
                        for (let i = 0; i < geoNumTerms; i++) {
                            terms.push(currentTerm);
                            currentTerm *= geoRatio;
                        }
                        if (geoRatio === 1) {
                            result = geoFirstTerm * geoNumTerms;
                        } else {
                            result = geoFirstTerm * (1 - Math.pow(geoRatio, geoNumTerms)) / (1 - geoRatio);
                        }
                        break;
                        
                    default:
                        throw new Error('Invalid series type');
                }

                // Format the result display
                let resultText = '';
                
                // Show individual terms in comma-separated format
                if (terms.length > 0) {
                    resultText += terms.join(', ');
                    resultText += '\nResult: ';
                }
                
                // Show final result
                if (typeof result === 'number') {
                    resultText += result.toFixed(6);
                } else {
                    resultText += result;
                }

                document.getElementById('series-result').textContent = resultText;
                
                // Log the calculation
                console.log('Series calculation:', {
                    type: seriesType,
                    terms,
                    result
                });
            } catch (error) {
                console.error('Series calculation error:', error);
                showError('series-result', error.message);
            }
        });
    }

    // Probability Calculator
    const calculateProbabilityBtn = document.getElementById('calculate-probability');
    if (calculateProbabilityBtn) {
        calculateProbabilityBtn.addEventListener('click', function() {
            try {
                const probabilityType = document.getElementById('probability-type').value;
                let result;
                let steps = [];

                switch (probabilityType) {
                    case 'basic':
                        const favorable = parseFloat(document.getElementById('favorable-outcomes').value);
                        const total = parseFloat(document.getElementById('total-outcomes').value);
                        
                        if (isNaN(favorable) || isNaN(total)) {
                            throw new Error('Please enter valid numbers for outcomes');
                        }
                        if (favorable < 0 || total <= 0) {
                            throw new Error('Outcomes must be non-negative and total must be positive');
                        }
                        if (favorable > total) {
                            throw new Error('Favorable outcomes cannot exceed total outcomes');
                        }
                        
                        result = favorable / total;
                        steps.push(`P = ${favorable} / ${total} = ${result}`);
                        break;

                    case 'conditional':
                        const pA = parseFloat(document.getElementById('p-a').value);
                        const pBGivenA = parseFloat(document.getElementById('p-b-given-a').value);
                        
                        if (isNaN(pA) || isNaN(pBGivenA)) {
                            throw new Error('Please enter valid probabilities');
                        }
                        if (pA < 0 || pA > 1 || pBGivenA < 0 || pBGivenA > 1) {
                            throw new Error('Probabilities must be between 0 and 1');
                        }
                        
                        result = pA * pBGivenA;
                        steps.push(`P(A and B) = P(A) × P(B|A) = ${pA} × ${pBGivenA} = ${result}`);
                        break;

                    case 'binomial':
                        const nTrials = parseInt(document.getElementById('binomial-trials').value);
                        const nSuccesses = parseInt(document.getElementById('binomial-successes').value);
                        const pSuccess = parseFloat(document.getElementById('binomial-probability').value);
                        
                        if (isNaN(nTrials) || isNaN(nSuccesses) || isNaN(pSuccess)) {
                            throw new Error('Please enter valid numbers for all fields');
                        }
                        if (nTrials <= 0 || nSuccesses < 0 || nSuccesses > nTrials) {
                            throw new Error('Invalid number of trials or successes');
                        }
                        if (pSuccess < 0 || pSuccess > 1) {
                            throw new Error('Probability must be between 0 and 1');
                        }
                        
                        const combination = math.combinations(nTrials, nSuccesses);
                        result = combination * Math.pow(pSuccess, nSuccesses) * Math.pow(1 - pSuccess, nTrials - nSuccesses);
                        steps.push(`P(X = ${nSuccesses}) = C(${nTrials},${nSuccesses}) × ${pSuccess}^${nSuccesses} × (1-${pSuccess})^${nTrials-nSuccesses} = ${result}`);
                        break;

                    case 'poisson':
                        const lambda = parseFloat(document.getElementById('lambda').value);
                        const nEvents = parseInt(document.getElementById('k-events').value);
                        
                        if (isNaN(lambda) || isNaN(nEvents)) {
                            throw new Error('Please enter valid numbers for all fields');
                        }
                        if (lambda <= 0) {
                            throw new Error('Average rate must be positive');
                        }
                        if (nEvents < 0) {
                            throw new Error('Number of events must be non-negative');
                        }
                        
                        result = (Math.pow(lambda, nEvents) * Math.exp(-lambda)) / math.factorial(nEvents);
                        steps.push(`P(X = ${nEvents}) = (${lambda}^${nEvents} × e^-${lambda}) / ${nEvents}! = ${result}`);
                        break;

                    case 'normal':
                        const mean = parseFloat(document.getElementById('mean').value);
                        const stdDev = parseFloat(document.getElementById('std-dev').value);
                        const x = parseFloat(document.getElementById('x-value').value);
                        
                        if (isNaN(mean) || isNaN(stdDev) || isNaN(x)) {
                            throw new Error('Please enter valid numbers for all fields');
                        }
                        if (stdDev <= 0) {
                            throw new Error('Standard deviation must be positive');
                        }
                        
                        const z = (x - mean) / stdDev;
                        result = 0.5 * (1 + math.erf(z / Math.sqrt(2)));
                        steps.push(`P(X ≤ ${x}) = 0.5 × (1 + erf((${x} - ${mean}) / (${stdDev} × √2))) = ${result}`);
                        break;

                    default:
                        throw new Error('Invalid probability type');
                }

                // Display result
                const resultElement = document.getElementById('probability-result');
                if (resultElement) {
                    resultElement.innerHTML = `
                        <div class="result-value">${result.toFixed(6)}</div>
                        <div class="calculation-steps">
                            ${steps.map(step => `<div class="step">${step}</div>`).join('')}
                        </div>
                    `;
                }

                // Log calculation
                console.log('Probability calculation:', {
                    type: probabilityType,
                    result: result,
                    steps: steps
                });
            } catch (error) {
                console.error('Probability calculation error:', error);
                const resultElement = document.getElementById('probability-result');
                if (resultElement) {
                    resultElement.innerHTML = `<div class="error">Error: ${error.message}</div>`;
                }
            }
        });
    }

    // Add event listener for probability type change
    const probabilityTypeSelect = document.getElementById('probability-type');
    if (probabilityTypeSelect) {
        probabilityTypeSelect.addEventListener('change', function() {
            const probabilityType = this.value;
            const inputSections = document.querySelectorAll('.probability-inputs > div');
            
            // Hide all input sections first
            inputSections.forEach(section => {
                section.style.display = 'none';
            });
            
            // Show the relevant input section
            switch (probabilityType) {
                case 'basic':
                    document.querySelector('.basic-probability').style.display = 'block';
                    break;
                case 'conditional':
                    document.querySelector('.conditional-probability').style.display = 'block';
                    break;
                case 'binomial':
                    document.querySelector('.binomial-distribution').style.display = 'block';
                    break;
                case 'normal':
                    document.querySelector('.normal-distribution').style.display = 'block';
                    break;
                case 'poisson':
                    document.querySelector('.poisson-distribution').style.display = 'block';
                    break;
                default:
                    console.warn('Unknown probability type:', probabilityType);
            }
        });

        // Trigger the change event to set initial state
        probabilityTypeSelect.dispatchEvent(new Event('change'));
    }

    // Geometry Calculator
    const calculateGeometryBtn = document.getElementById('calculate-geometry');
    if (calculateGeometryBtn) {
        calculateGeometryBtn.addEventListener('click', function() {
            try {
                const shapeType = document.getElementById('geometry-shape').value;
                let result = {};

                switch (shapeType) {
                    case 'circle':
                        const radius = parseFloat(document.getElementById('radius').value);
                        if (isNaN(radius)) throw new Error('Please enter a valid radius');
                        
                        result.area = Math.PI * radius * radius;
                        result.perimeter = 2 * Math.PI * radius;
                        break;

                    case 'rectangle':
                        const length = parseFloat(document.getElementById('length').value);
                        const width = parseFloat(document.getElementById('width').value);
                        if (isNaN(length) || isNaN(width)) throw new Error('Please enter valid dimensions');
                        
                        result.area = length * width;
                        result.perimeter = 2 * (length + width);
                        break;

                    case 'triangle':
                        const base = parseFloat(document.getElementById('base').value);
                        const height = parseFloat(document.getElementById('height').value);
                        if (isNaN(base) || isNaN(height)) throw new Error('Please enter valid dimensions');
                        
                        result.area = 0.5 * base * height;
                        // For perimeter, we need all three sides
                        const sideA = parseFloat(document.getElementById('side-a').value);
                        const sideB = parseFloat(document.getElementById('side-b').value);
                        const sideC = parseFloat(document.getElementById('side-c').value);
                        if (isNaN(sideA) || isNaN(sideB) || isNaN(sideC)) throw new Error('Please enter all side lengths');
                        result.perimeter = sideA + sideB + sideC;
                        break;

                    case 'square':
                        const side = parseFloat(document.getElementById('side').value);
                        if (isNaN(side)) throw new Error('Please enter a valid side length');
                        
                        result.area = side * side;
                        result.perimeter = 4 * side;
                        break;

                    case 'parallelogram':
                        const basePar = parseFloat(document.getElementById('base-par').value);
                        const heightPar = parseFloat(document.getElementById('height-par').value);
                        if (isNaN(basePar) || isNaN(heightPar)) throw new Error('Please enter valid dimensions');
                        
                        result.area = basePar * heightPar;
                        result.perimeter = 2 * (basePar + heightPar);
                        break;

                    case 'trapezoid':
                        const base1 = parseFloat(document.getElementById('base1').value);
                        const base2 = parseFloat(document.getElementById('base2').value);
                        const heightTrap = parseFloat(document.getElementById('height-trap').value);
                        if (isNaN(base1) || isNaN(base2) || isNaN(heightTrap)) throw new Error('Please enter valid dimensions');
                        
                        result.area = 0.5 * (base1 + base2) * heightTrap;
                        result.perimeter = base1 + base2 + 2 * Math.sqrt(Math.pow((base2 - base1) / 2, 2) + Math.pow(heightTrap, 2));
                        break;

                    case 'sphere':
                        const radiusSphere = parseFloat(document.getElementById('radius-sphere').value);
                        if (isNaN(radiusSphere)) throw new Error('Please enter a valid radius');
                        
                        result.volume = (4/3) * Math.PI * Math.pow(radiusSphere, 3);
                        result.surfaceArea = 4 * Math.PI * Math.pow(radiusSphere, 2);
                        break;

                    case 'cube':
                        const edge = parseFloat(document.getElementById('edge').value);
                        if (isNaN(edge)) throw new Error('Please enter a valid edge length');
                        
                        result.volume = Math.pow(edge, 3);
                        result.surfaceArea = 6 * Math.pow(edge, 2);
                        break;

                    case 'cylinder':
                        const radiusCyl = parseFloat(document.getElementById('radius-cyl').value);
                        const heightCyl = parseFloat(document.getElementById('height-cyl').value);
                        if (isNaN(radiusCyl) || isNaN(heightCyl)) throw new Error('Please enter valid dimensions');
                        
                        result.volume = Math.PI * Math.pow(radiusCyl, 2) * heightCyl;
                        result.surfaceArea = 2 * Math.PI * radiusCyl * (radiusCyl + heightCyl);
                        break;

                    case 'cone':
                        const radiusCone = parseFloat(document.getElementById('radius-cone').value);
                        const heightCone = parseFloat(document.getElementById('height-cone').value);
                        if (isNaN(radiusCone) || isNaN(heightCone)) throw new Error('Please enter valid dimensions');
                        
                        result.volume = (1/3) * Math.PI * Math.pow(radiusCone, 2) * heightCone;
                        const slantHeight = Math.sqrt(Math.pow(radiusCone, 2) + Math.pow(heightCone, 2));
                        result.surfaceArea = Math.PI * radiusCone * (radiusCone + slantHeight);
                        break;

                    default:
                        throw new Error('Invalid shape type');
                }

                // Update results
                const resultElement = document.getElementById('geometry-result');
                if (resultElement) {
                    let resultHTML = '<div class="result-group">';
                    
                    if (result.area !== undefined) {
                        resultHTML += `<div class="result-item">
                            <span class="result-label">Area:</span>
                            <span class="result-value">${result.area.toFixed(6)}</span>
                        </div>`;
                    }
                    
                    if (result.perimeter !== undefined) {
                        resultHTML += `<div class="result-item">
                            <span class="result-label">Perimeter:</span>
                            <span class="result-value">${result.perimeter.toFixed(6)}</span>
                        </div>`;
                    }
                    
                    if (result.volume !== undefined) {
                        resultHTML += `<div class="result-item">
                            <span class="result-label">Volume:</span>
                            <span class="result-value">${result.volume.toFixed(6)}</span>
                        </div>`;
                    }
                    
                    if (result.surfaceArea !== undefined) {
                        resultHTML += `<div class="result-item">
                            <span class="result-label">Surface Area:</span>
                            <span class="result-value">${result.surfaceArea.toFixed(6)}</span>
                        </div>`;
                    }
                    
                    resultHTML += '</div>';
                    resultElement.innerHTML = resultHTML;
                }
                
                // Log the calculation
                console.log('Geometry calculation:', {
                    type: shapeType,
                    result
                });
            } catch (error) {
                console.error('Geometry calculation error:', error);
                const resultElement = document.getElementById('geometry-result');
                if (resultElement) {
                    resultElement.innerHTML = `<div class="error">Error: ${error.message}</div>`;
                }
            }
        });
    }

    // Add event listener for geometry shape type change
    const geometryShapeSelect = document.getElementById('geometry-shape');
    if (geometryShapeSelect) {
        geometryShapeSelect.addEventListener('change', function() {
            const shapeType = this.value;
            const inputSections = document.querySelectorAll('.geometry-inputs > div');
            
            // Hide all input sections first
            inputSections.forEach(section => {
                section.style.display = 'none';
            });
            
            // Show the relevant input section
            switch (shapeType) {
                case 'circle':
                    document.querySelector('.circle-inputs').style.display = 'block';
                    break;
                case 'rectangle':
                    document.querySelector('.rectangle-inputs').style.display = 'block';
                    break;
                case 'triangle':
                    document.querySelector('.triangle-inputs').style.display = 'block';
                    break;
                case 'square':
                    document.querySelector('.square-inputs').style.display = 'block';
                    break;
                case 'parallelogram':
                    document.querySelector('.parallelogram-inputs').style.display = 'block';
                    break;
                case 'trapezoid':
                    document.querySelector('.trapezoid-inputs').style.display = 'block';
                    break;
                case 'sphere':
                    document.querySelector('.sphere-inputs').style.display = 'block';
                    break;
                case 'cube':
                    document.querySelector('.cube-inputs').style.display = 'block';
                    break;
                case 'cylinder':
                    document.querySelector('.cylinder-inputs').style.display = 'block';
                    break;
                case 'cone':
                    document.querySelector('.cone-inputs').style.display = 'block';
                    break;
                default:
                    console.warn('Unknown shape type:', shapeType);
            }
        });

        // Trigger the change event to set initial state
        geometryShapeSelect.dispatchEvent(new Event('change'));
    }

    // Trigonometry Calculator
    const calculateTrigBtn = document.getElementById('calculate-trig');
    if (calculateTrigBtn) {
        calculateTrigBtn.addEventListener('click', function() {
            try {
                const functionType = document.getElementById('trig-function').value;
                const angle = parseFloat(document.getElementById('angle').value);
                const mode = document.getElementById('trig-mode').value;
                
                if (isNaN(angle)) {
                    throw new Error('Please enter a valid angle');
                }

                let result;
                let inputValue = angle;

                // For inverse functions, we need to handle the input differently
                if (functionType.startsWith('arc')) {
                    // For inverse functions, input must be between -1 and 1 (except arctan)
                    if (functionType !== 'arctan' && (angle < -1 || angle > 1)) {
                        throw new Error(`Input must be between -1 and 1 for ${functionType}`);
                    }

                    // Calculate inverse function
                    switch (functionType) {
                        case 'arcsin':
                            result = Math.asin(angle);
                            break;
                        case 'arccos':
                            result = Math.acos(angle);
                            break;
                        case 'arctan':
                            result = Math.atan(angle);
                            break;
                    }

                    // Convert result to degrees if needed
                    if (mode === 'degrees') {
                        result = result * (180 / Math.PI);
                    }
                } else {
                    // For regular trigonometric functions
                    // Convert angle to radians if in degrees
                    const angleInRadians = mode === 'degrees' ? angle * (Math.PI / 180) : angle;

                    // Calculate based on function type
                    switch (functionType) {
                        case 'sin':
                            result = Math.sin(angleInRadians);
                            break;
                        case 'cos':
                            result = Math.cos(angleInRadians);
                            break;
                        case 'tan':
                            result = Math.tan(angleInRadians);
                            break;
                        case 'csc':
                            result = 1 / Math.sin(angleInRadians);
                            break;
                        case 'sec':
                            result = 1 / Math.cos(angleInRadians);
                            break;
                        case 'cot':
                            result = 1 / Math.tan(angleInRadians);
                            break;
                        default:
                            throw new Error('Invalid function type');
                    }
                }

                // Display result
                const resultElement = document.getElementById('trig-result');
                if (resultElement) {
                    let displayFunction = functionType;
                    let displayInput = angle;
                    let displayUnit = mode === 'degrees' ? '°' : ' rad';

                    // For inverse functions, show the result in the correct format
                    if (functionType.startsWith('arc')) {
                        resultElement.innerHTML = `
                            <div class="result-value">${result.toFixed(6)}${displayUnit}</div>
                            <div class="calculation-steps">
                                <div class="step">${functionType}(${displayInput}) = ${result.toFixed(6)}${displayUnit}</div>
                            </div>
                        `;
                    } else {
                        resultElement.innerHTML = `
                            <div class="result-value">${result.toFixed(6)}</div>
                            <div class="calculation-steps">
                                <div class="step">${functionType}(${displayInput}${displayUnit}) = ${result.toFixed(6)}</div>
                            </div>
                        `;
                    }
                }

                // Log calculation
                console.log('Trigonometry calculation:', {
                    function: functionType,
                    input: angle,
                    mode: mode,
                    result: result
                });
            } catch (error) {
                console.error('Trigonometry calculation error:', error);
                const resultElement = document.getElementById('trig-result');
                if (resultElement) {
                    resultElement.innerHTML = `<div class="error">Error: ${error.message}</div>`;
                }
            }
        });
    }

    // Unit Converter
    const conversionType = document.getElementById('conversion-type');
    const fromUnit = document.getElementById('from-unit');
    const toUnit = document.getElementById('to-unit');
    const convertUnitBtn = document.getElementById('convert-unit');

    if (conversionType && fromUnit && toUnit && convertUnitBtn) {
        // Define units for each conversion type with their conversion factors
        const units = {
            length: {
                units: ['meter', 'kilometer', 'centimeter', 'millimeter', 'inch', 'foot', 'yard', 'mile'],
                factors: {
                    meter: 1,
                    kilometer: 0.001,
                    centimeter: 100,
                    millimeter: 1000,
                    inch: 39.3701,
                    foot: 3.28084,
                    yard: 1.09361,
                    mile: 0.000621371
                }
            },
            weight: {
                units: ['kilogram', 'gram', 'milligram', 'pound', 'ounce'],
                factors: {
                    kilogram: 1,
                    gram: 1000,
                    milligram: 1000000,
                    pound: 2.20462,
                    ounce: 35.274
                }
            },
            temperature: {
                units: ['celsius', 'fahrenheit', 'kelvin'],
                convert: {
                    celsius: {
                        fahrenheit: (c) => (c * 9/5) + 32,
                        kelvin: (c) => c + 273.15
                    },
                    fahrenheit: {
                        celsius: (f) => (f - 32) * 5/9,
                        kelvin: (f) => (f - 32) * 5/9 + 273.15
                    },
                    kelvin: {
                        celsius: (k) => k - 273.15,
                        fahrenheit: (k) => (k - 273.15) * 9/5 + 32
                    }
                }
            },
            area: {
                units: ['square meter', 'square kilometer', 'square centimeter', 'square inch', 'square foot', 'square yard', 'acre'],
                factors: {
                    'square meter': 1,
                    'square kilometer': 0.000001,
                    'square centimeter': 10000,
                    'square inch': 1550.0031,
                    'square foot': 10.7639,
                    'square yard': 1.19599,
                    'acre': 0.000247105
                }
            },
            volume: {
                units: ['cubic meter', 'liter', 'milliliter', 'cubic inch', 'cubic foot', 'gallon'],
                factors: {
                    'cubic meter': 1,
                    'liter': 1000,
                    'milliliter': 1000000,
                    'cubic inch': 61023.7,
                    'cubic foot': 35.3147,
                    'gallon': 264.172
                }
            },
            time: {
                units: ['second', 'minute', 'hour', 'day', 'week', 'month', 'year'],
                factors: {
                    'second': 1,
                    'minute': 1/60,
                    'hour': 1/3600,
                    'day': 1/86400,
                    'week': 1/604800,
                    'month': 1/2629746,
                    'year': 1/31556952
                }
            },
            speed: {
                units: ['meter per second', 'kilometer per hour', 'mile per hour', 'foot per second'],
                factors: {
                    'meter per second': 1,
                    'kilometer per hour': 3.6,
                    'mile per hour': 2.23694,
                    'foot per second': 3.28084
                }
            }
        };

        // Update unit options when conversion type changes
        conversionType.addEventListener('change', function() {
            const selectedType = this.value;
            const unitOptions = units[selectedType].units;
            
            // Clear and update from unit options
            fromUnit.innerHTML = '';
            unitOptions.forEach(unit => {
                const option = document.createElement('option');
                option.value = unit;
                option.textContent = unit;
                fromUnit.appendChild(option);
            });

            // Clear and update to unit options
            toUnit.innerHTML = '';
            unitOptions.forEach(unit => {
                const option = document.createElement('option');
                option.value = unit;
                option.textContent = unit;
                toUnit.appendChild(option);
            });

            // Set different default values for from and to units
            if (unitOptions.length > 1) {
                toUnit.selectedIndex = 1;
            }
        });

        // Trigger initial unit options setup
        conversionType.dispatchEvent(new Event('change'));

        // Handle unit conversion
        convertUnitBtn.addEventListener('click', function() {
            try {
                const value = parseFloat(document.getElementById('conversion-value').value);
                if (isNaN(value)) {
                    throw new Error('Please enter a valid number');
                }

                const type = conversionType.value;
                const from = fromUnit.value;
                const to = toUnit.value;

                let result;
                let calculation;

                if (type === 'temperature') {
                    // Special handling for temperature conversions
                    result = units.temperature.convert[from][to](value);
                    calculation = `${value}°${from.charAt(0).toUpperCase()} = ${result.toFixed(2)}°${to.charAt(0).toUpperCase()}`;
                } else {
                    // For other types, convert to base unit then to target unit
                    const baseValue = value / units[type].factors[from];
                    result = baseValue * units[type].factors[to];
                    calculation = `${value} ${from} = ${result.toFixed(6)} ${to}`;
                }

                // Display result
                const resultElement = document.getElementById('unit-result');
                if (resultElement) {
                    resultElement.innerHTML = `
                        <div class="result-value">${result.toFixed(6)} ${to}</div>
                        <div class="calculation-steps">
                            <div class="step">${calculation}</div>
                        </div>
                    `;
                }
            } catch (error) {
                console.error('Unit conversion error:', error);
                const resultElement = document.getElementById('unit-result');
                if (resultElement) {
                    resultElement.innerHTML = `<div class="error">Error: ${error.message}</div>`;
                }
            }
        });
    }

    // Initialize Percentage Calculator
    function initializePercentageCalculator() {
        console.log('Initializing Percentage Calculator...');
        
        // Get all required elements
        const calculateBtn = document.getElementById('calculate-percentage');
        const typeSelect = document.getElementById('percentage-type');
        const valueInput = document.getElementById('percentage-value');
        const totalInput = document.getElementById('percentage-total');
        const resultDiv = document.getElementById('percentage-result');
        
        // Debug: Log all elements
        console.log('Percentage Calculator elements:', {
            button: calculateBtn,
            typeSelect: typeSelect,
            valueInput: valueInput,
            totalInput: totalInput,
            resultDiv: resultDiv
        });
        
        // Add red border to missing elements for visual debugging
        if (!calculateBtn) console.error('Calculate button not found!');
        if (!typeSelect) console.error('Type select not found!');
        if (!valueInput) console.error('Value input not found!');
        if (!totalInput) console.error('Total input not found!');
        if (!resultDiv) console.error('Result div not found!');
        
        if (!calculateBtn || !typeSelect || !valueInput || !totalInput || !resultDiv) {
            console.error('Missing required elements for Percentage Calculator');
            return;
        }
        
        // Add visual feedback for successful initialization
        calculateBtn.style.border = '2px solid #4CAF50';
        
        // Remove any existing event listeners by cloning the button
        const newBtn = calculateBtn.cloneNode(true);
        if (calculateBtn.parentNode) {
            calculateBtn.parentNode.replaceChild(newBtn, calculateBtn);
        }
        
        // Add click event listener
        newBtn.addEventListener('click', function() {
            console.log('Calculate button clicked');
            
            // Clear previous results and errors
            resultDiv.innerHTML = '';
            resultDiv.style.display = 'block';
            
            try {
                console.log('Percentage calculation started');
                
                // Get current values
                const type = typeSelect.value;
                const valueStr = valueInput.value.trim();
                const totalStr = totalInput.value.trim();
                
                console.log('Input values:', { type, value: valueStr, total: totalStr });
                
                // Validate inputs
                if (!valueStr || !totalStr) {
                    throw new Error('Please fill in all fields');
                }
                
                const value = parseFloat(valueStr);
                const total = parseFloat(totalStr);
                
                if (isNaN(value) || isNaN(total)) {
                    throw new Error('Please enter valid numbers in both fields');
                }
                
                if (type !== 'of' && total === 0) {
                    throw new Error('Total/Original value cannot be zero for this calculation');
                }

                // Calculate result based on type
                let result, calculation, additionalInfo;

                switch (type) {
                    case 'basic':
                        result = (value / total) * 100;
                        calculation = `(${value} / ${total}) × 100 = ${result.toFixed(2)}%`;
                        additionalInfo = `${value} is ${result.toFixed(2)}% of ${total}`;
                        break;
                    case 'increase':
                        result = ((value - total) / total) * 100;
                        calculation = `((${value} - ${total}) / ${total}) × 100 = ${result.toFixed(2)}%`;
                        additionalInfo = `${value} is ${result.toFixed(2)}% more than ${total}`;
                        break;
                    case 'decrease':
                        result = ((total - value) / total) * 100;
                        calculation = `((${total} - ${value}) / ${total}) × 100 = ${result.toFixed(2)}%`;
                        additionalInfo = `${value} is ${result.toFixed(2)}% less than ${total}`;
                        break;
                    case 'of':
                        result = (value * total) / 100;
                        calculation = `(${value}% × ${total}) / 100 = ${result.toFixed(2)}`;
                        additionalInfo = `${value}% of ${total} is ${result.toFixed(2)}`;
                        break;
                    default:
                        throw new Error('Invalid calculation type');
                }

                console.log('Calculation complete:', { result, calculation, additionalInfo });

                // Display result with nice formatting
                resultDiv.innerHTML = `
                    <div class="result-item" style="margin-bottom: 15px; padding: 15px; background: #f8f9fa; border-radius: 5px; border-left: 4px solid #4CAF50;">
                        <div style="font-size: 1.2em; font-weight: bold; color: #2c3e50; margin-bottom: 10px;">
                            <i class="fas fa-calculator" style="margin-right: 8px;"></i>Result: ${result.toFixed(2)}${type === 'of' ? '' : '%'}
                        </div>
                        <div style="margin: 10px 0; padding: 10px; background: white; border-radius: 4px; font-family: monospace;">
                            <strong>Calculation:</strong> ${calculation}
                        </div>
                        <div style="color: #555; font-style: italic;">
                            <i class="fas fa-info-circle" style="margin-right: 5px;"></i>${additionalInfo}
                        </div>
                    </div>
                `;
            } catch (error) {
                console.error('Error in percentage calculation:', error);
                resultDiv.innerHTML = `
                    <div style="padding: 15px; margin: 10px 0; background: #ffebee; border-left: 4px solid #f44336; color: #c62828;">
                        <i class="fas fa-exclamation-triangle" style="margin-right: 8px;"></i>
                        <strong>Error:</strong> ${error.message}
                    </div>
                `;
            }
        });
    }
}

// Helper Functions
function getMatrixValues(matrixId) {
    const matrix = document.getElementById(matrixId);
    const rows = matrix.querySelectorAll('.matrix-row');
    return Array.from(rows).map(row => {
        return Array.from(row.querySelectorAll('input')).map(input => parseFloat(input.value));
    });
}

function showError(elementId, message) {
    console.error(`Showing error in ${elementId}:`, message);
    
    // Try to find the element by ID
    let element = document.getElementById(elementId);
    
    // If element not found by ID, try to find it by class
    if (!element) {
        console.warn(`Element with ID '${elementId}' not found, trying class selector...`);
        element = document.querySelector(`.${elementId}`);
    }
    
    if (!element) {
        console.error(`Could not find element with ID or class '${elementId}'`);
        return;
    }
    
    // Create error message element if it doesn't exist
    let errorElement = element.querySelector('.error-message');
    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.style.color = '#dc3545';
        errorElement.style.marginTop = '10px';
        errorElement.style.padding = '10px';
        errorElement.style.backgroundColor = '#f8d7da';
        errorElement.style.border = '1px solid #f5c6cb';
        errorElement.style.borderRadius = '4px';
        element.prepend(errorElement);
    }
    
    // Set error message
    errorElement.textContent = `Error: ${message}`;
    errorElement.style.display = 'block';
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        if (errorElement) {
            errorElement.style.display = 'none';
            errorElement.textContent = '';
        }
    }, 5000);
    
    // Also log to console
    console.error(`Error in ${elementId}:`, message);
}

// Matrix Operations
function matrixAdd(matrixA, matrixB) {
    if (matrixA.length !== matrixB.length || matrixA[0].length !== matrixB[0].length) {
        throw new Error('Matrices must have the same dimensions');
    }
    return matrixA.map((row, i) => row.map((val, j) => val + matrixB[i][j]));
}

function matrixSubtract(matrixA, matrixB) {
    if (matrixA.length !== matrixB.length || matrixA[0].length !== matrixB[0].length) {
        throw new Error('Matrices must have the same dimensions');
    }
    return matrixA.map((row, i) => row.map((val, j) => val - matrixB[i][j]));
}

function matrixMultiply(matrixA, matrixB) {
    if (matrixA[0].length !== matrixB.length) {
        throw new Error('Invalid matrix dimensions for multiplication');
    }
    return matrixA.map(row => {
        return matrixB[0].map((_, j) => {
            return row.reduce((sum, val, k) => sum + val * matrixB[k][j], 0);
        });
    });
}

// Equation Solving Functions
function solveLinearEquation(leftSide, rightSide) {
    try {
        // Move all terms to left side
        const equation = `${leftSide} - (${rightSide})`;
        
        // Parse coefficients
        const terms = equation.match(/([+-]?\d*\.?\d*x)|([+-]?\d*\.?\d+)/g) || [];
        let xCoeff = 0;
        let constant = 0;
        
        terms.forEach(term => {
            if (term.includes('x')) {
                // Handle x coefficient
                const coeff = term.replace('x', '');
                xCoeff += coeff === '+' ? 1 : coeff === '-' ? -1 : parseFloat(coeff || 1);
            } else {
                // Handle constant term
                constant += parseFloat(term);
            }
        });
        
        if (xCoeff === 0) {
            throw new Error('No x term found in equation');
        }
        
        const solution = -constant / xCoeff;
        return `x = ${solution}`;
    } catch (error) {
        throw new Error('Error solving linear equation: ' + error.message);
    }
}

function solveQuadraticEquation(leftSide, rightSide) {
    try {
        // If right side is '0', we can simplify the equation
        if (rightSide === '0' || rightSide === '0.0' || rightSide === '0.00') {
            // Just use the left side as is
            var equation = leftSide;
        } else {
            // Move all terms to left side and clean up the equation
            equation = `${leftSide} - (${rightSide})`;
        }
        
        // Clean up the equation
        equation = equation
            .replace(/\s+/g, '')  // Remove all whitespace
            .replace(/\+\-/g, '-')  // Replace +- with -
            .replace(/-\+/g, '-')   // Replace -+ with -
            .replace(/\+\+/g, '+')   // Replace ++ with +
            .replace(/--/g, '+');    // Replace -- with +
        
        // Parse coefficients
        const terms = equation.match(/([+-]?\d*\.?\d*x\^2)|([+-]?\d*\.?\d*x)|([+-]?\d+\.?\d*)/g) || [];
        let a = 0, b = 0, c = 0;
        
        terms.forEach(term => {
            if (term.includes('x^2')) {
                // Handle x² coefficient
                const coeff = term.replace('x^2', '');
                a += coeff === '+' || coeff === '' ? 1 : coeff === '-' ? -1 : parseFloat(coeff);
            } else if (term.includes('x') && !term.includes('^')) {
                // Handle x coefficient (but not x^2)
                const coeff = term.replace('x', '');
                b += coeff === '+' || coeff === '' ? 1 : coeff === '-' ? -1 : parseFloat(coeff);
            } else if (!term.includes('x') && !isNaN(term)) {
                // Handle constant term
                c += parseFloat(term);
            }
        });
        
        if (a === 0 && b === 0) {
            // If both a and b are 0, it's not a quadratic equation
            if (c === 0) return 'Infinite solutions (0 = 0)';
            return 'No solution';
        }
        
        // Calculate discriminant
        const discriminant = b * b - 4 * a * c;
        
        if (discriminant < 0) {
            return 'No real solutions';
        } else if (discriminant === 0) {
            const x = -b / (2 * a);
            return `x = ${x}`;
        } else {
            const x1 = (-b + Math.sqrt(discriminant)) / (2 * a);
            const x2 = (-b - Math.sqrt(discriminant)) / (2 * a);
            return `x = ${x1} or x = ${x2}`;
        }
    } catch (error) {
        throw new Error('Error solving quadratic equation: ' + error.message);
    }
}

function solveCubicEquation(leftSide, rightSide) {
    try {
        // Move all terms to left side
        const equation = `${leftSide} - (${rightSide})`;
        
        // Parse coefficients
        const terms = equation.match(/([+-]?\d*\.?\d*x\^3)|([+-]?\d*\.?\d*x\^2)|([+-]?\d*\.?\d*x)|([+-]?\d*\.?\d+)/g) || [];
        let a = 0, b = 0, c = 0, d = 0;
        
        terms.forEach(term => {
            if (term.includes('x^3')) {
                // Handle x³ coefficient
                const coeff = term.replace('x^3', '');
                a += coeff === '+' ? 1 : coeff === '-' ? -1 : parseFloat(coeff || 1);
            } else if (term.includes('x^2')) {
                // Handle x² coefficient
                const coeff = term.replace('x^2', '');
                b += coeff === '+' ? 1 : coeff === '-' ? -1 : parseFloat(coeff || 1);
            } else if (term.includes('x')) {
                // Handle x coefficient
                const coeff = term.replace('x', '');
                c += coeff === '+' ? 1 : coeff === '-' ? -1 : parseFloat(coeff || 1);
            } else {
                // Handle constant term
                d += parseFloat(term);
            }
        });
        
        if (a === 0) {
            throw new Error('Not a cubic equation');
        }
        
        // Normalize coefficients
        b /= a;
        c /= a;
        d /= a;
        
        // Use Cardano's formula
        const p = c - (b * b) / 3;
        const q = (2 * b * b * b) / 27 - (b * c) / 3 + d;
        
        const discriminant = (q * q) / 4 + (p * p * p) / 27;
        
        if (Math.abs(discriminant) < 1e-10) {
            // Three real roots, at least two equal
            const u = Math.cbrt(-q / 2);
            const x1 = 2 * u - b / 3;
            const x2 = -u - b / 3;
            return `x = ${x1} or x = ${x2} (double root)`;
        } else if (discriminant > 0) {
            // One real root and two complex conjugate roots
            const u = Math.cbrt(-q / 2 + Math.sqrt(discriminant));
            const v = Math.cbrt(-q / 2 - Math.sqrt(discriminant));
            const x = u + v - b / 3;
            return `x = ${x}`;
        } else {
            // Three distinct real roots
            const phi = Math.acos(-q / (2 * Math.sqrt(-p * p * p / 27)));
            const r = 2 * Math.sqrt(-p / 3);
            const x1 = r * Math.cos(phi / 3) - b / 3;
            const x2 = r * Math.cos((phi + 2 * Math.PI) / 3) - b / 3;
            const x3 = r * Math.cos((phi + 4 * Math.PI) / 3) - b / 3;
            return `x = ${x1} or x = ${x2} or x = ${x3}`;
        }
    } catch (error) {
        throw new Error('Error solving cubic equation: ' + error.message);
    }
}

// Function Plotter functionality has been moved to function-plotter.js
// Statistics Calculator functionality has been moved to statistics-calculator.js

// Number Converter Functions
function validateNumber(number, type) {
    const patterns = {
        decimal: /^-?\d+$/,
        binary: /^[01]+$/,
        octal: /^[0-7]+$/,
        hexadecimal: /^[0-9A-Fa-f]+$/
    };

    if (!patterns[type].test(number)) {
        throw new Error(`Invalid ${type} number format`);
    }
    return true;
}

function convertNumber(number, fromType) {
    try {
        // Validate input
        if (!number) {
            throw new Error('Please enter a number');
        }

        // Remove any spaces and convert to uppercase for hex
        number = number.trim().toUpperCase();
        
        // Validate the number format
        validateNumber(number, fromType);

        // Convert input to decimal first
        let decimal;
        try {
            switch (fromType) {
                case 'decimal':
                    decimal = BigInt(number);
                    break;
                case 'binary':
                    decimal = BigInt('0b' + number);
                    break;
                case 'octal':
                    decimal = BigInt('0o' + number);
                    break;
                case 'hexadecimal':
                    decimal = BigInt('0x' + number);
                    break;
                default:
                    throw new Error('Invalid number type');
            }
        } catch (error) {
            throw new Error(`Invalid ${fromType} number: ${error.message}`);
        }

        // Get all result elements
        const decimalResult = document.getElementById('decimal-result');
        const binaryResult = document.getElementById('binary-result');
        const octalResult = document.getElementById('octal-result');
        const hexResult = document.getElementById('hex-result');

        // Clear all results first
        [decimalResult, binaryResult, octalResult, hexResult].forEach(el => {
            if (el) {
                el.textContent = '';
                el.style.display = 'none';
                el.title = '';
            }
        });

        // Update results based on input type
        if (fromType !== 'decimal' && decimalResult) {
            decimalResult.textContent = decimal.toString();
            decimalResult.style.display = 'block';
            decimalResult.title = 'Decimal representation';
        }

        if (fromType !== 'binary' && binaryResult) {
            binaryResult.textContent = decimal.toString(2);
            binaryResult.style.display = 'block';
            binaryResult.title = 'Binary representation';
        }

        if (fromType !== 'octal' && octalResult) {
            octalResult.textContent = decimal.toString(8);
            octalResult.style.display = 'block';
            octalResult.title = 'Octal representation';
        }

        if (fromType !== 'hexadecimal' && hexResult) {
            hexResult.textContent = decimal.toString(16).toUpperCase();
            hexResult.style.display = 'block';
            hexResult.title = 'Hexadecimal representation (uppercase)';
        }

        return true;
    } catch (error) {
        // Clear all results on error
        const resultIds = ['decimal-result', 'binary-result', 'octal-result', 'hex-result'];
        resultIds.forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.textContent = '';
                element.title = '';
                element.style.display = 'none';
            }
        });
        throw new Error('Number conversion error: ' + error.message);
    }
}

// Prime Factorization
function factorizeNumber(number) {
    try {
        // Convert to integer and handle negative numbers
        let n = Math.abs(parseInt(number));
        if (isNaN(n) || n < 2) {
            throw new Error('Please enter a valid number greater than 1');
        }
        
        const factors = [];
        // Handle 2 separately
        while (n % 2 === 0) {
            factors.push(2);
            n = n / 2;
        }
        
        // Check for odd divisors up to sqrt(n)
        for (let i = 3; i <= Math.sqrt(n); i += 2) {
            while (n % i === 0) {
                factors.push(i);
                n = n / i;
            }
        }
        
        // If remaining n is a prime greater than 2
        if (n > 2) {
            factors.push(n);
        }
        
        return factors;
    } catch (error) {
        console.error('Error in factorizeNumber:', error);
        throw new Error('Factorization error: ' + error.message);
    }
}

// Handler for prime factorization button click
function factorizeNumberHandler() {
    try {
        console.log('Factorize button clicked');
        
        // Get input elements
        const inputElement = document.getElementById('factorize-input');
        const resultElement = document.getElementById('factorization-result');
        
        if (!inputElement || !resultElement) {
            throw new Error('Required elements not found in the DOM');
        }
        
        // Get and validate input
        const inputValue = inputElement.value.trim();
        if (!inputValue) {
            throw new Error('Please enter a number to factorize');
        }
        
        // Show loading state
        resultElement.innerHTML = '<div class="loading">Calculating prime factors...</div>';
        
        // Use setTimeout to allow UI to update before heavy computation
        setTimeout(() => {
            try {
                // Perform factorization
                const number = parseInt(inputValue);
                if (isNaN(number) || number < 2) {
                    throw new Error('Please enter a valid number greater than 1');
                }
                
                const factors = factorizeNumber(number);
                
                // Format the result
                let resultHTML = `<div class="result">
                    <div class="number">${number} = </div>
                    <div class="factors">${factors.join(' × ')}</div>
                </div>`;
                
                // Add prime check
                if (factors.length === 1) {
                    resultHTML += `<div class="prime-check">${number} is a prime number</div>`;
                } else {
                    resultHTML += `<div class="prime-check">${number} is a composite number</div>`;
                }
                
                // Show the result
                resultElement.innerHTML = resultHTML;
                
            } catch (error) {
                console.error('Error in factorization:', error);
                resultElement.innerHTML = `<div class="error">Error: ${error.message}</div>`;
            }
        }, 50); // Small delay to allow UI to update
        
    } catch (error) {
        console.error('Error in factorizeNumberHandler:', error);
        const resultElement = document.getElementById('factorization-result');
        if (resultElement) {
            resultElement.innerHTML = `<div class="error">Error: ${error.message}</div>`;
        }
    }
}

// Initialize Prime Factorization
function initializePrimeFactorization() {
    console.log('Initializing Prime Factorization...');
    
    try {
        console.log('Looking for factorize button and input...');
        const factorizeBtn = document.getElementById('factorize');
        const inputElement = document.getElementById('factorize-input');
        
        console.log('Factorize button:', factorizeBtn);
        console.log('Input element:', inputElement);
        
        if (!factorizeBtn || !inputElement) {
            console.warn('Prime factorization elements not found in the DOM');
            // Log all buttons to help with debugging
            console.log('All buttons on page:', document.querySelectorAll('button'));
            console.log('All inputs on page:', document.querySelectorAll('input'));
            return;
        }
        
        // Remove any existing event listeners by cloning the button
        const newBtn = factorizeBtn.cloneNode(true);
        factorizeBtn.parentNode.replaceChild(newBtn, factorizeBtn);
        
        // Add new click event listener
        newBtn.addEventListener('click', factorizeNumberHandler);
        
        // Also handle Enter key in the input field
        inputElement.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                factorizeNumberHandler();
            }
        });
        
        console.log('Prime factorization initialized successfully');

        // Copy to clipboard functionality
        function copyToClipboard(text) {
            return navigator.clipboard.writeText(text).then(() => {
                return true;
            }).catch(err => {
                console.error('Failed to copy text: ', err);
                return false;
            });
        }

        // Setup copy buttons
        function setupCopyButtons() {
            document.querySelectorAll('.copy-btn').forEach(button => {
                button.addEventListener('click', async () => {
                    const targetId = button.dataset.target;
                    const resultElement = document.getElementById(targetId);
                    const textToCopy = resultElement.textContent;
                    
                    if (textToCopy) {
                        const success = await copyToClipboard(textToCopy);
                        if (success) {
                            // Visual feedback
                            button.classList.add('copied');
                            const originalTitle = button.title;
                            button.title = 'Copied!';
                            
                            // Reset after 2 seconds
                            setTimeout(() => {
                                button.classList.remove('copied');
                                button.title = originalTitle;
                            }, 2000);
                        }
                    }
                });
            });
        }

        // Initialize all calculators when DOM is fully loaded
        function initializeAllCalculators() {
            console.log('Initializing all calculators...');
            
            // Matrix Calculator
            const calculateMatrixBtn = document.getElementById('calculate-matrix');
            if (calculateMatrixBtn) {
                calculateMatrixBtn.addEventListener('click', calculateMatrices);
                console.log('Matrix calculator initialized');
            }
            
            // Function Plotter
            const plotFunctionBtn = document.getElementById('plot-function');
            if (plotFunctionBtn) {
                plotFunctionBtn.addEventListener('click', plotFunctionHandler);
                console.log('Function plotter initialized');
            }
            
            // Statistics Calculator initialization moved to statistics-calculator.js
            
            // Prime Factorization
            initializePrimeFactorization();
            
            // GCD & LCM Calculator
            const calculateGcdLcmBtn = document.getElementById('calculate-gcd-lcm');
            if (calculateGcdLcmBtn) {
                calculateGcdLcmBtn.addEventListener('click', calculateGcdLcm);
                console.log('GCD & LCM calculator initialized');
            }
            
            // Complex Numbers Calculator
            const calculateComplexBtn = document.getElementById('calculate-complex');
            if (calculateComplexBtn) {
                calculateComplexBtn.addEventListener('click', calculateComplexNumbers);
                console.log('Complex numbers calculator initialized');
            }
            
            // Vector Calculator
            const calculateVectorBtn = document.getElementById('calculate-vector');
            if (calculateVectorBtn) {
                calculateVectorBtn.addEventListener('click', calculateVector);
                console.log('Vector calculator initialized');
            }
            
            setupCopyButtons();
            console.log('All calculators initialized');
        }

        // Event Listeners
        document.addEventListener('DOMContentLoaded', function() {
            initializeAllCalculators();
            if (calculateMatrixBtn) {
                calculateMatrixBtn.addEventListener('click', () => {
                    try {
                        const matrixA = getMatrixValues('matrix-a');
                        const matrixB = getMatrixValues('matrix-b');
                        const operation = document.getElementById('matrix-operation').value;
                        const result = calculateMatrix(matrixA, matrixB, operation);
                        document.getElementById('matrix-result').textContent = JSON.stringify(result);
                    } catch (error) {
                        showError('matrix-result', error.message);
                    }
                });
            }
            
            // Add event listener for base converter
            document.getElementById('convert-base').addEventListener('click', convertBase);

            // Add event listeners for base selection changes
            document.getElementById('from-base').addEventListener('change', () => {
                const number = document.getElementById('number-to-convert');
                const fromBase = document.getElementById('from-base').value;
                number.value = '';
                number.placeholder = `Enter ${getBaseName(fromBase)} number`;
            });

            document.getElementById('to-base').addEventListener('change', () => {
                const number = document.getElementById('number-to-convert');
                if (number.value) {
                    convertBase();
                }
            });

            // Add event listener for input changes with debounce
            const numberInput = document.getElementById('number-to-convert');
            if (numberInput) {
                let debounceTimer;
                numberInput.addEventListener('input', () => {
                    clearTimeout(debounceTimer);
                    debounceTimer = setTimeout(convertBase, 300); // Wait for 300ms after user stops typing
                });
            }

            // ... rest of the code remains the same ...

document.getElementById('to-base').addEventListener('change', () => {
    const number = document.getElementById('number-to-convert');
    if (number.value) {
        convertBase();
    }
});

// Add event listener for input changes with debounce
const numberInput = document.getElementById('number-to-convert');
if (numberInput) {
    let debounceTimer;
    numberInput.addEventListener('input', () => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(convertBase, 300); // Wait for 300ms after user stops typing
    });
}

function generateRandomNumbers() {
    const minValue = parseFloat(document.getElementById('min-value').value);
    const maxValue = parseFloat(document.getElementById('max-value').value);
    const numCount = parseInt(document.getElementById('num-count').value);
    const decimalPlaces = parseInt(document.getElementById('decimal-places').value);
    const allowDuplicates = document.getElementById('allow-duplicates').checked;
    const resultElement = document.getElementById('random-result');
    
    try {
        // Validate inputs
        if (isNaN(minValue) || isNaN(maxValue)) {
            throw new Error('Please enter valid minimum and maximum values');
        }
        
        if (minValue >= maxValue) {
            throw new Error('Minimum value must be less than maximum value');
        }
        
        if (isNaN(numCount) || numCount < 1) {
            throw new Error('Please enter a valid number of values (minimum 1)');
        }
        
        if (isNaN(decimalPlaces) || decimalPlaces < 0 || decimalPlaces > 10) {
            throw new Error('Please enter a valid number of decimal places (0-10)');
        }
        
        // Calculate range and check if enough unique numbers are possible
        const range = maxValue - minValue;
        const possibleUniqueNumbers = Math.floor(range * Math.pow(10, decimalPlaces)) + 1;
        
        if (!allowDuplicates && numCount > possibleUniqueNumbers) {
            throw new Error(`Cannot generate ${numCount} unique numbers in the given range. Maximum possible unique numbers: ${possibleUniqueNumbers}`);
        }
        
        // Generate random numbers
        const numbers = new Set();
        while (numbers.size < numCount) {
            const randomNum = minValue + Math.random() * range;
            const roundedNum = Number(randomNum.toFixed(decimalPlaces));
            
            if (allowDuplicates || !numbers.has(roundedNum)) {
                numbers.add(roundedNum);
            }
        }
        
        // Format the result
        const numbersArray = Array.from(numbers);
        let resultText = `<strong>Generated ${numCount} random number${numCount > 1 ? 's' : ''}:</strong><br><br>`;
        resultText += numbersArray.join(', ');
        
        // Add statistics
        const sortedNumbers = [...numbersArray].sort((a, b) => a - b);
        const sum = numbersArray.reduce((a, b) => a + b, 0);
        const mean = sum / numCount;
        const median = numCount % 2 === 0 
            ? (sortedNumbers[numCount/2 - 1] + sortedNumbers[numCount/2]) / 2 
            : sortedNumbers[Math.floor(numCount/2)];
        
        resultText += `<br><br><strong>Statistics:</strong><br>`;
        resultText += `Minimum: ${sortedNumbers[0]}<br>`;
        resultText += `Maximum: ${sortedNumbers[numCount - 1]}<br>`;
        resultText += `Mean: ${mean.toFixed(decimalPlaces)}<br>`;
        resultText += `Median: ${median.toFixed(decimalPlaces)}`;
        
        // Display the result
        resultElement.innerHTML = resultText;
        resultElement.style.display = 'block';
        
        // Log the generation
        console.log(`Generated ${numCount} random numbers between ${minValue} and ${maxValue}`);
    } catch (error) {
        showError('random-result', error.message);
    }
}

// Add event listener for random number generator
document.getElementById('generate-random').addEventListener('click', generateRandomNumbers);

// Add event listeners for input changes with debounce
const randomInputs = ['min-value', 'max-value', 'num-count', 'decimal-places'];
randomInputs.forEach(id => {
    const input = document.getElementById(id);
    if (input) {
        let debounceTimer;
        input.addEventListener('input', () => {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(generateRandomNumbers, 300);
        });
    }
});

// Add event listener for checkbox changes
document.getElementById('allow-duplicates').addEventListener('change', generateRandomNumbers);

function formatNumber() {
    const number = document.getElementById('number-to-format').value.trim();
    const formatType = document.getElementById('format-type').value;
    const locale = document.getElementById('locale').value;
    const decimalPlaces = parseInt(document.getElementById('decimal-places').value);
    const useGrouping = document.getElementById('use-grouping').checked;
    const resultElement = document.getElementById('format-result');
    
    try {
        // Validate input
        if (!number) {
            throw new Error('Please enter a number');
        }
        
        // Parse the number
        const parsedNumber = parseFloat(number);
        if (isNaN(parsedNumber)) {
            throw new Error('Please enter a valid number');
        }
        
        // Create formatter options
        const options = {
            minimumFractionDigits: decimalPlaces,
            maximumFractionDigits: decimalPlaces,
            useGrouping: useGrouping
        };
        
        // Format based on type
        let formattedNumber;
        let formatInfo = '';
        
        switch (formatType) {
            case 'comma':
                formattedNumber = parsedNumber.toLocaleString(locale, options);
                formatInfo = 'Comma Separated';
                break;
                
            case 'currency':
                options.style = 'currency';
                options.currency = getCurrencyCode(locale);
                formattedNumber = parsedNumber.toLocaleString(locale, options);
                formatInfo = 'Currency';
                break;
                
            case 'percent':
                options.style = 'percent';
                formattedNumber = parsedNumber.toLocaleString(locale, options);
                formatInfo = 'Percentage';
                break;
                
            case 'scientific':
                formattedNumber = parsedNumber.toExponential(decimalPlaces);
                formatInfo = 'Scientific Notation';
                break;
                
            case 'compact':
                options.notation = 'compact';
                formattedNumber = parsedNumber.toLocaleString(locale, options);
                formatInfo = 'Compact';
                break;
                
            default:
                throw new Error('Invalid format type');
        }
        
        // Format the result
        let resultText = `<strong>Format Type:</strong> ${formatInfo}<br><br>`;
        resultText += `<strong>Locale:</strong> ${getLocaleName(locale)}<br><br>`;
        resultText += `<strong>Original Number:</strong> ${number}<br><br>`;
        resultText += `<strong>Formatted Result:</strong> ${formattedNumber}<br><br>`;
        resultText += `<strong>Format Details:</strong><br>`;
        resultText += `- Decimal Places: ${decimalPlaces}<br>`;
        resultText += `- Grouping: ${useGrouping ? 'Enabled' : 'Disabled'}`;
        
        // Display the result
        resultElement.innerHTML = resultText;
        resultElement.style.display = 'block';
        
        // Log the formatting
        console.log(`Number formatted: ${number} → ${formattedNumber} (${formatInfo})`);
    } catch (error) {
        showError('format-result', error.message);
    }
}

function getCurrencyCode(locale) {
    const currencyMap = {
        'en-US': 'USD',
        'en-GB': 'GBP',
        'de-DE': 'EUR',
        'fr-FR': 'EUR',
        'es-ES': 'EUR',
        'ja-JP': 'JPY',
        'zh-CN': 'CNY',
        'ar-SA': 'SAR',
        'hi-IN': 'INR'
    };
    return currencyMap[locale] || 'USD';
}

function getLocaleName(locale) {
    const localeMap = {
        'en-US': 'English (US)',
        'en-GB': 'English (UK)',
        'de-DE': 'German',
        'fr-FR': 'French',
        'es-ES': 'Spanish',
        'ja-JP': 'Japanese',
        'zh-CN': 'Chinese',
        'ar-SA': 'Arabic',
        'hi-IN': 'Hindi'
    };
    return localeMap[locale] || locale;
}

// Add event listener for number formatter
document.getElementById('format-number').addEventListener('click', formatNumber);

// Add event listeners for input changes with debounce
const formatInputs = ['number-to-format', 'format-type', 'locale', 'decimal-places'];
formatInputs.forEach(id => {
    const input = document.getElementById(id);
    if (input) {
        let debounceTimer;
        input.addEventListener('input', () => {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(formatNumber, 300);
        });
    }
});

// Add event listener for checkbox changes
document.getElementById('use-grouping').addEventListener('change', formatNumber);

// ... existing code ...
function calculateScientific() {
    const number = document.getElementById('sci-number').value.trim();
    const precision = parseInt(document.getElementById('sci-precision').value);
    const resultElement = document.getElementById('sci-result');
    
    try {
        // Validate input
        if (!number) {
            throw new Error('Please enter a number');
        }
        
        // Parse the number
        const parsedNumber = parseFloat(number);
        if (isNaN(parsedNumber)) {
            throw new Error('Please enter a valid number');
        }
        
        // Validate precision
        if (precision < 0 || precision > 20) {
            throw new Error('Precision must be between 0 and 20');
        }
        
        // Convert to scientific notation
        const scientific = parsedNumber.toExponential(precision);
        
        // Calculate additional information
        const magnitude = Math.floor(Math.log10(Math.abs(parsedNumber)));
        const coefficient = parsedNumber / Math.pow(10, magnitude);
        
        // Format the result
        let resultText = `<strong>Original Number:</strong> ${number}<br><br>`;
        resultText += `<strong>Scientific Notation:</strong> ${scientific}<br><br>`;
        resultText += `<strong>Details:</strong><br>`;
        resultText += `- Coefficient: ${coefficient.toFixed(precision)}<br>`;
        resultText += `- Magnitude: 10^${magnitude}<br>`;
        resultText += `- Precision: ${precision} decimal places`;
        
        // Display the result
        resultElement.innerHTML = resultText;
        resultElement.style.display = 'block';
        
        // Log the conversion
        console.log(`Scientific notation conversion: ${number} → ${scientific}`);
    } catch (error) {
        showError('sci-result', error.message);
    }
}

// Add event listener for scientific notation conversion
document.getElementById('convert-scientific').addEventListener('click', calculateScientific);

// Add event listeners for input changes with debounce
const sciInputs = ['sci-number', 'sci-precision'];
sciInputs.forEach(id => {
    const input = document.getElementById(id);
    if (input) {
        let debounceTimer;
        input.addEventListener('input', () => {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(calculateScientific, 300);
        });
    }
});
// ... existing code ...

// ... existing code ...
function calculateSignificantFigures() {
    const number = document.getElementById('sig-number').value.trim();
    const sigFigs = parseInt(document.getElementById('sig-figures').value);
    const operation = document.getElementById('sig-operation').value;
    const resultElement = document.getElementById('sig-result');
    
    try {
        // Validate input
        if (!number) {
            throw new Error('Please enter a number');
        }
        
        // Parse the number
        const parsedNumber = parseFloat(number);
        if (isNaN(parsedNumber)) {
            throw new Error('Please enter a valid number');
        }
        
        // Validate significant figures
        if (sigFigs < 1 || sigFigs > 20) {
            throw new Error('Number of significant figures must be between 1 and 20');
        }
        
        let resultText = '';
        let result;
        
        switch (operation) {
            case 'round':
                result = roundToSignificantFigures(parsedNumber, sigFigs);
                resultText = `<strong>Original Number:</strong> ${number}<br><br>`;
                resultText += `<strong>Rounded to ${sigFigs} Significant Figures:</strong> ${result}<br><br>`;
                resultText += `<strong>Details:</strong><br>`;
                resultText += `- Number of Significant Figures: ${sigFigs}<br>`;
                resultText += `- Original Value: ${parsedNumber}<br>`;
                resultText += `- Rounded Value: ${result}`;
                break;
                
            case 'count':
                const count = countSignificantFigures(number);
                resultText = `<strong>Number:</strong> ${number}<br><br>`;
                resultText += `<strong>Number of Significant Figures:</strong> ${count}<br><br>`;
                resultText += `<strong>Details:</strong><br>`;
                resultText += `- All non-zero digits are significant<br>`;
                resultText += `- Zeros between non-zero digits are significant<br>`;
                resultText += `- Leading zeros are not significant<br>`;
                resultText += `- Trailing zeros are significant if there's a decimal point`;
                break;
                
            case 'validate':
                const isValid = validateSignificantFigures(number, sigFigs);
                resultText = `<strong>Number:</strong> ${number}<br><br>`;
                resultText += `<strong>Validation:</strong> ${isValid ? 'Valid' : 'Invalid'}<br><br>`;
                resultText += `<strong>Details:</strong><br>`;
                resultText += `- Required Significant Figures: ${sigFigs}<br>`;
                resultText += `- Actual Significant Figures: ${countSignificantFigures(number)}<br>`;
                resultText += `- Status: ${isValid ? 'Meets requirement' : 'Does not meet requirement'}`;
                break;
                
            default:
                throw new Error('Invalid operation');
        }
        
        // Display the result
        resultElement.innerHTML = resultText;
        resultElement.style.display = 'block';
        
        // Log the calculation
        console.log(`Significant figures calculation: ${number} → ${result || 'counted/validated'}`);
    } catch (error) {
        showError('sig-result', error.message);
    }
}

function roundToSignificantFigures(num, sigFigs) {
    if (num === 0) return 0;
    
    const magnitude = Math.floor(Math.log10(Math.abs(num)));
    const scale = Math.pow(10, sigFigs - magnitude - 1);
    
    return Math.round(num * scale) / scale;
}

function countSignificantFigures(numStr) {
    // Remove any scientific notation
    numStr = numStr.toLowerCase().replace('e', '');
    
    // Remove leading and trailing zeros
    numStr = numStr.replace(/^0+/, '').replace(/0+$/, '');
    
    // Count all digits
    return numStr.replace(/[^0-9]/g, '').length;
}

function validateSignificantFigures(numStr, requiredSigFigs) {
    const actualSigFigs = countSignificantFigures(numStr);
    return actualSigFigs === requiredSigFigs;
}

// Add event listener for significant figures calculation
document.getElementById('calculate-significant').addEventListener('click', calculateSignificantFigures);

// Add event listeners for input changes with debounce
const sigInputs = ['sig-number', 'sig-figures', 'sig-operation'];
sigInputs.forEach(id => {
    const input = document.getElementById(id);
    if (input) {
        let debounceTimer;
        input.addEventListener('input', () => {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(calculateSignificantFigures, 300);
        });
    }
});
// ... existing code ...

// ... existing code ...
function calculateRounding() {
    const number = document.getElementById('round-number').value.trim();
    const mode = document.getElementById('round-mode').value;
    const resultElement = document.getElementById('round-result');
    
    try {
        // Validate input
        if (!number) {
            throw new Error('Please enter a number');
        }
        
        // Parse the number
        const parsedNumber = parseFloat(number);
        if (isNaN(parsedNumber)) {
            throw new Error('Please enter a valid number');
        }
        
        // Calculate the rounded number based on mode
        let roundedNumber;
        let modeDescription;
        
        switch (mode) {
            case 'nearest':
                roundedNumber = Math.round(parsedNumber);
                modeDescription = 'Round to Nearest';
                break;
                
            case 'up':
                roundedNumber = Math.ceil(parsedNumber);
                modeDescription = 'Round Up';
                break;
                
            case 'down':
                roundedNumber = Math.floor(parsedNumber);
                modeDescription = 'Round Down';
                break;
                
            case 'toward-zero':
                roundedNumber = Math.trunc(parsedNumber);
                modeDescription = 'Round Toward Zero';
                break;
                
            case 'away-zero':
                roundedNumber = Math.sign(parsedNumber) * Math.ceil(Math.abs(parsedNumber));
                modeDescription = 'Round Away from Zero';
                break;
                
            default:
                throw new Error('Invalid rounding mode');
        }
        
        // Format the result
        let resultText = `<strong>Original Number:</strong> ${number}<br><br>`;
        resultText += `<strong>Rounded Number:</strong> ${roundedNumber}<br><br>`;
        resultText += `<strong>Details:</strong><br>`;
        resultText += `- Rounding Mode: ${modeDescription}<br>`;
        resultText += `- Original Value: ${parsedNumber}<br>`;
        resultText += `- Rounded Value: ${roundedNumber}`;
        
        // Display the result
        resultElement.innerHTML = resultText;
        resultElement.style.display = 'block';
        
        // Log the calculation
        console.log(`Rounding calculation: ${number} → ${roundedNumber} (${modeDescription})`);
    } catch (error) {
        showError('round-result', error.message);
    }
}

// Add event listener for rounding calculation
document.getElementById('calculate-rounding').addEventListener('click', calculateRounding);

// Add event listeners for input changes with debounce
const roundInputs = ['round-number', 'round-mode'];
roundInputs.forEach(id => {
    const input = document.getElementById(id);
    if (input) {
        let debounceTimer;
        input.addEventListener('input', () => {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(calculateRounding, 300);
        });
    }
});
// ... existing code ...

// ... existing code ...
function calculatePercentageChange() {
    const initialValue = document.getElementById('initial-value').value.trim();
    const finalValue = document.getElementById('final-value').value.trim();
    const resultElement = document.getElementById('percent-result');
    
    try {
        // Validate inputs
        if (!initialValue || !finalValue) {
            throw new Error('Please enter both initial and final values');
        }
        
        // Parse the numbers
        const initial = parseFloat(initialValue);
        const final = parseFloat(finalValue);
        
        if (isNaN(initial) || isNaN(final)) {
            throw new Error('Please enter valid numbers');
        }
        
        // Calculate percentage change
        const difference = final - initial;
        const percentageChange = (difference / Math.abs(initial)) * 100;
        const isIncrease = difference > 0;
        
        // Calculate absolute change
        const absoluteChange = Math.abs(difference);
        
        // Format the result
        let resultText = `<strong>Initial Value:</strong> ${initialValue}<br><br>`;
        resultText += `<strong>Final Value:</strong> ${finalValue}<br><br>`;
        resultText += `<strong>Change:</strong> ${isIncrease ? 'Increase' : 'Decrease'} of ${Math.abs(percentageChange).toFixed(2)}%<br><br>`;
        resultText += `<strong>Details:</strong><br>`;
        resultText += `- Absolute Change: ${absoluteChange.toFixed(2)}<br>`;
        resultText += `- Percentage Change: ${Math.abs(percentageChange).toFixed(2)}%<br>`;
        resultText += `- Direction: ${isIncrease ? 'Increase' : 'Decrease'}`;
        
        // Display the result
        resultElement.innerHTML = resultText;
        resultElement.style.display = 'block';
        
        // Log the calculation
        console.log(`Percentage change calculation: ${initialValue} → ${finalValue} (${percentageChange.toFixed(2)}%)`);
    } catch (error) {
        showError('percent-result', error.message);
    }
}

// Calculate GCD of two numbers using Euclidean algorithm
function calculateGCD(a, b) {
    a = Math.abs(a);
    b = Math.abs(b);
    while (b) {
        const temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}

// Calculate GCD of an array of numbers
function calculateArrayGCD(numbers) {
    if (!numbers || numbers.length === 0) return 0;
    let result = numbers[0];
    for (let i = 1; i < numbers.length; i++) {
        result = calculateGCD(result, numbers[i]);
        if (result === 1) return 1; // GCD can't be smaller than 1
    }
    return result;
}

// Calculate LCM of two numbers
function calculateLCM(a, b) {
    if (a === 0 || b === 0) return 0;
    return Math.abs(a * b) / calculateGCD(a, b);
}

// Calculate LCM of an array of numbers
function calculateArrayLCM(numbers) {
    if (!numbers || numbers.length === 0) return 0;
    let result = numbers[0];
    for (let i = 1; i < numbers.length; i++) {
        if (numbers[i] === 0) return 0;
        result = calculateLCM(result, numbers[i]);
    }
    return result;
}

// Handle GCD & LCM calculation
function handleGcdLcmCalculation() {
    try {
        const input = document.getElementById('gcd-lcm-numbers').value.trim();
        if (!input) {
            throw new Error('Please enter numbers to calculate');
        }

        // Parse input numbers
        const numbers = input.split(',')
            .map(num => num.trim())
            .filter(num => num !== '')
            .map(num => {
                const parsed = parseFloat(num);
                if (isNaN(parsed) || !Number.isInteger(parsed) || parsed < 0) {
                    throw new Error('Please enter valid positive integers separated by commas');
                }
                return parsed;
            });

        if (numbers.length < 2) {
            throw new Error('Please enter at least two numbers');
        }

        // Calculate GCD and LCM
        const gcd = calculateArrayGCD(numbers);
        const lcm = calculateArrayLCM(numbers);

        // Display results
        document.getElementById('gcd-result').textContent = gcd;
        document.getElementById('lcm-result').textContent = lcm;

    } catch (error) {
        console.error('GCD/LCM Calculation Error:', error);
        document.getElementById('gcd-result').textContent = 'Error';
        document.getElementById('lcm-result').textContent = 'Error';
        
        // Show error message in the UI
        const resultsContainer = document.querySelector('#gcd-lcm .conversion-results');
        if (resultsContainer) {
            const errorElement = document.createElement('div');
            errorElement.className = 'error-message';
            errorElement.textContent = error.message;
            errorElement.style.color = '#ff4d4d';
            errorElement.style.marginTop = '10px';
            errorElement.style.fontSize = '0.9em';
            
            // Remove any existing error messages
            const existingError = resultsContainer.querySelector('.error-message');
            if (existingError) {
                resultsContainer.removeChild(existingError);
            }
            
            resultsContainer.appendChild(errorElement);
        }
    }
}

// Initialize GCD & LCM calculator
function initializeGcdLcmCalculator() {
    const calculateBtn = document.getElementById('calculate-gcd-lcm');
    if (calculateBtn) {
        calculateBtn.addEventListener('click', handleGcdLcmCalculation);
        
        // Also handle Enter key in the input field
        const inputField = document.getElementById('gcd-lcm-numbers');
        if (inputField) {
            inputField.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    handleGcdLcmCalculation();
                }
            });
        }
    }
}

// Complex Number Operations
class ComplexNumber {
    constructor(real, imaginary) {
        this.real = real || 0;
        this.imaginary = imaginary || 0;
    }

    add(other) {
        return new ComplexNumber(
            this.real + other.real,
            this.imaginary + other.imaginary
        );
    }

    subtract(other) {
        return new ComplexNumber(
            this.real - other.real,
            this.imaginary - other.imaginary
        );
    }

    multiply(other) {
        const real = (this.real * other.real) - (this.imaginary * other.imaginary);
        const imaginary = (this.real * other.imaginary) + (this.imaginary * other.real);
        return new ComplexNumber(real, imaginary);
    }

    divide(other) {
        const denominator = (other.real * other.real) + (other.imaginary * other.imaginary);
        if (denominator === 0) {
            throw new Error('Cannot divide by zero');
        }
        const real = ((this.real * other.real) + (this.imaginary * other.imaginary)) / denominator;
        const imaginary = ((this.imaginary * other.real) - (this.real * other.imaginary)) / denominator;
        return new ComplexNumber(real, imaginary);
    }

    toString() {
        const realPart = this.real !== 0 ? this.real : '';
        let imaginaryPart = '';
        
        if (this.imaginary !== 0) {
            const absImaginary = Math.abs(this.imaginary);
            const sign = this.imaginary > 0 ? '+' : '-';
            const coefficient = absImaginary === 1 ? '' : absImaginary;
            
            if (this.real === 0) {
                // If real part is 0, don't show sign before the imaginary part
                imaginaryPart = `${sign === '-' ? '-' : ''}${coefficient}i`;
            } else {
                // Show sign between real and imaginary parts
                imaginaryPart = ` ${sign} ${coefficient}i`;
            }
        }
        
        // Handle cases where real part is 0
        if (this.real === 0 && this.imaginary === 0) {
            return '0';
        } else if (this.real === 0) {
            return imaginaryPart;
        } else if (this.imaginary === 0) {
            return realPart.toString();
        }
        
        return `${realPart}${imaginaryPart}`.replace(/\s\+/g, ' + ').replace(/\s-\s/g, ' - ');
    }
}

// Handle complex number calculation
function handleComplexNumberCalculation() {
    try {
        // Get operation type
        const operation = document.getElementById('complex-operation').value;
        
        // Get input values
        const real1 = parseFloat(document.getElementById('complex1-real').value) || 0;
        const imag1 = parseFloat(document.getElementById('complex1-imag').value) || 0;
        const real2 = parseFloat(document.getElementById('complex2-real').value) || 0;
        const imag2 = parseFloat(document.getElementById('complex2-imag').value) || 0;
        
        // Create complex numbers
        const num1 = new ComplexNumber(real1, imag1);
        const num2 = new ComplexNumber(real2, imag2);
        
        let result;
        
        // Perform the selected operation
        switch (operation) {
            case 'add':
                result = num1.add(num2);
                break;
            case 'subtract':
                result = num1.subtract(num2);
                break;
            case 'multiply':
                result = num1.multiply(num2);
                break;
            case 'divide':
                result = num1.divide(num2);
                break;
            default:
                throw new Error('Invalid operation selected');
        }
        
        // Display the result
        const resultElement = document.getElementById('complex-result');
        if (resultElement) {
            resultElement.textContent = `Result: ${result.toString()}`;
            resultElement.style.color = '#333';
            resultElement.style.fontWeight = 'bold';
        }
        
    } catch (error) {
        console.error('Complex Number Calculation Error:', error);
        const resultElement = document.getElementById('complex-result');
        if (resultElement) {
            resultElement.textContent = `Error: ${error.message}`;
            resultElement.style.color = '#ff4d4d';
        }
    }
}

// Toggle visibility of additional input fields based on operation
function updateComplexInputs() {
    const operation = document.getElementById('complex-operation').value;
    const powerInput = document.querySelector('.power-input');
    const rootInput = document.querySelector('.root-input');
    
    if (operation === 'power') {
        powerInput.style.display = 'block';
        rootInput.style.display = 'none';
    } else if (operation === 'root') {
        powerInput.style.display = 'none';
        rootInput.style.display = 'block';
    } else {
        powerInput.style.display = 'none';
        rootInput.style.display = 'none';
    }
}

// Initialize Complex Number Calculator
function initializeComplexNumberCalculator() {
    const calculateBtn = document.getElementById('calculate-complex');
    const operationSelect = document.getElementById('complex-operation');
    
    if (calculateBtn) {
        calculateBtn.addEventListener('click', handleComplexNumberCalculation);
    }
    
    if (operationSelect) {
        operationSelect.addEventListener('change', updateComplexInputs);
    }
    
    // Add input validation to ensure numeric input
    const numberInputs = document.querySelectorAll('#complex-numbers input[type="number"]');
    numberInputs.forEach(input => {
        input.addEventListener('input', function() {
            // Allow empty input or valid numbers with optional minus sign
            if (this.value !== '' && !/^-?\d*\.?\d*$/.test(this.value)) {
                this.value = this.value.slice(0, -1); // Remove the last character if invalid
            }
        });
    });
}

// Parse a complex number string into its real and imaginary parts
function parseComplexNumber(str) {
    // Remove all whitespace
    str = str.replace(/\s+/g, '');
    
    // Handle real numbers
    if (!str.includes('i')) {
        return { real: parseFloat(str) || 0, imag: 0 };
    }
    
    // Handle pure imaginary numbers
    if (!str.match(/[+-]/) && str !== 'i') {
        str = str.replace('i', '');
        return { real: 0, imag: parseFloat(str) || 1 };
    }
    
    // Handle complex numbers with real and imaginary parts
    const parts = str.split(/([+-])/);
    let real = 0;
    let imag = 0;
    
    let current = '';
    for (let i = 0; i < parts.length; i++) {
        const part = parts[i];
        if (part === '+' || part === '-') {
            if (current) {
                if (current.includes('i')) {
                    const num = current.replace('i', '') || '1';
                    imag += parseFloat(num);
                } else {
                    real += parseFloat(current);
                }
            }
            current = part;
        } else {
            current += part;
        }
    }
    
    // Process the last part
    if (current) {
        if (current.includes('i')) {
            const num = current.replace('i', '') || '1';
            imag += parseFloat(num);
        } else {
            real += parseFloat(current) || 0;
        }
    }
    
    return { real, imag };
}

// Format a complex number as a string
function formatComplexNumber(real, imag) {
    if (imag === 0) return real.toString();
    if (real === 0) return `${imag}i`;
    return `${real}${imag >= 0 ? '+' : ''}${imag}i`;
}

// Parse a vector string into an array of complex numbers
function parseVector(str) {
    if (!str) return [];
    return str.split(',').map(part => {
        part = part.trim();
        if (!part) return { real: 0, imag: 0 };
        return parseComplexNumber(part);
    });
}

// Format a vector of complex numbers as a string
function formatVector(vector) {
    return vector.map(({ real, imag }) => formatComplexNumber(real, imag)).join(', ');
}

// Vector operations
const vectorOperations = {
    add: (v1, v2) => {
        if (v1.length !== v2.length) {
            throw new Error('Vectors must have the same length for addition');
        }
        return v1.map((num, i) => ({
            real: num.real + (v2[i]?.real || 0),
            imag: num.imag + (v2[i]?.imag || 0)
        }));
    },
    
    subtract: (v1, v2) => {
        if (v1.length !== v2.length) {
            throw new Error('Vectors must have the same length for subtraction');
        }
        return v1.map((num, i) => ({
            real: num.real - (v2[i]?.real || 0),
            imag: num.imag - (v2[i]?.imag || 0)
        }));
    },
    
    dot: (v1, v2) => {
        if (v1.length !== v2.length) {
            throw new Error('Vectors must have the same length for dot product');
        }
        
        let result = { real: 0, imag: 0 };
        
        for (let i = 0; i < v1.length; i++) {
            const a = v1[i];
            const b = v2[i];
            // (a + bi) * (c + di) = (ac - bd) + (ad + bc)i
            const real = (a.real * b.real) - (a.imag * b.imag);
            const imag = (a.real * b.imag) + (a.imag * b.real);
            
            result.real += real;
            result.imag += imag;
        }
        
        return [result]; // Return as array for consistency
    }
};

// Handle vector calculation
function handleVectorCalculation() {
    try {
        // Get operation type
        const operation = document.getElementById('vector-operation').value;
        
        // Get input vectors
        const vector1Str = document.getElementById('vector1').value.trim();
        const vector2Str = document.getElementById('vector2').value.trim();
        
        if (!vector1Str || !vector2Str) {
            throw new Error('Please enter both vectors');
        }
        
        // Parse vectors
        const vector1 = parseVector(vector1Str);
        const vector2 = parseVector(vector2Str);
        
        if (vector1.length === 0 || vector2.length === 0) {
            throw new Error('Vectors cannot be empty');
        }
        
        // Perform the operation
        const result = vectorOperations[operation](vector1, vector2);
        
        // Display the result
        const resultElement = document.getElementById('vector-result');
        if (resultElement) {
            resultElement.textContent = formatVector(result);
            resultElement.style.color = '#333';
            resultElement.style.fontWeight = 'bold';
        }
        
    } catch (error) {
        console.error('Vector Calculation Error:', error);
        const resultElement = document.getElementById('vector-result');
        if (resultElement) {
            resultElement.textContent = `Error: ${error.message}`;
            resultElement.style.color = '#ff4d4d';
        }
    }
}

// Initialize Vector Calculator
function initializeVectorCalculator() {
    const calculateBtn = document.getElementById('calculate-vector');
    
    if (calculateBtn) {
        calculateBtn.addEventListener('click', handleVectorCalculation);
        
        // Also handle Enter key in input fields
        const inputFields = document.querySelectorAll('#vector-calculator input[type="text"]');
        inputFields.forEach(input => {
            input.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    handleVectorCalculation();
                }
            });
        });
    }
}

// Calculate arithmetic sequence
function calculateArithmeticSequence(firstTerm, commonDiff, numTerms) {
    const sequence = [];
    for (let i = 0; i < numTerms; i++) {
        sequence.push(firstTerm + (i * commonDiff));
    }
    return sequence;
}

// Calculate geometric sequence
function calculateGeometricSequence(firstTerm, commonRatio, numTerms) {
    const sequence = [];
    for (let i = 0; i < numTerms; i++) {
        sequence.push(firstTerm * Math.pow(commonRatio, i));
    }
    return sequence;
}

// Format sequence for display
function formatSequence(sequence) {
    return sequence.map((term, index) => {
        // Format to 4 decimal places if needed
        const formattedTerm = term % 1 === 0 ? term.toString() : term.toFixed(4);
        return `<span class="sequence-term">${formattedTerm}</span>`;
    }).join(', ');
}

// Handle sequence calculation
function calculateSequence() {
    console.log('Starting sequence calculation...');
    
    try {
        // Get input values
        const sequenceType = document.getElementById('sequence-type').value;
        const firstTerm = parseFloat(document.getElementById('first-term').value);
        const commonValue = parseFloat(document.getElementById('common-diff').value);
        const numTerms = parseInt(document.getElementById('num-terms').value);
        
        console.log('Input values:', { sequenceType, firstTerm, commonValue, numTerms });
        
        // Validate inputs
        if (isNaN(firstTerm) || isNaN(commonValue) || isNaN(numTerms)) {
            const errorMsg = 'Please enter valid numbers for all fields';
            console.error('Validation error:', errorMsg);
            throw new Error(errorMsg);
        }
        
        if (numTerms <= 0) {
            const errorMsg = 'Number of terms must be greater than 0';
            console.error('Validation error:', errorMsg);
            throw new Error(errorMsg);
        }
        
        // Calculate sequence based on type
        let sequence;
        console.log('Calculating sequence of type:', sequenceType);
        
        if (sequenceType === 'arithmetic') {
            console.log('Calculating arithmetic sequence...');
            sequence = calculateArithmeticSequence(firstTerm, commonValue, numTerms);
        } else {
            console.log('Calculating geometric sequence...');
            if (commonValue === 0) {
                const errorMsg = 'Common ratio cannot be 0 for geometric sequence';
                console.error('Validation error:', errorMsg);
                throw new Error(errorMsg);
            }
            sequence = calculateGeometricSequence(firstTerm, commonValue, numTerms);
        }
        
        console.log('Generated sequence:', sequence);
        
        // Calculate sum
        const sequenceSum = sequence.reduce((a, b) => a + b, 0);
        console.log('Sequence sum:', sequenceSum);
        
        // Display result
        const resultElement = document.getElementById('sequence-result');
        if (resultElement) {
            console.log('Updating result element...');
            resultElement.innerHTML = `
                <div class="result-summary">
                    <p><strong>Sequence Type:</strong> ${sequenceType === 'arithmetic' ? 'Arithmetic' : 'Geometric'}</p>
                    <p><strong>First Term:</strong> ${firstTerm}</p>
                    <p><strong>${sequenceType === 'arithmetic' ? 'Common Difference' : 'Common Ratio'}:</strong> ${commonValue}</p>
                    <p><strong>Number of Terms:</strong> ${numTerms}</p>
                </div>
                <div class="sequence-container">
                    <p><strong>Sequence:</strong></p>
                    <div class="sequence-numbers">${formatSequence(sequence)}</div>
                </div>
                <div class="sequence-stats">
                    <p><strong>Sum:</strong> ${sequenceSum.toFixed(4)}</p>
                </div>
            `;
            console.log('Result element updated');
        } else {
            console.error('Result element not found');
        }
        
    } catch (error) {
        console.error('Sequence Calculation Error:', error);
        const resultElement = document.getElementById('sequence-result');
        if (resultElement) {
            resultElement.innerHTML = `<div class="error-message">Error: ${error.message}</div>`;
        }
    }
}

// Track if sequence calculator is initialized
let isSequenceCalculatorInitialized = false;

// Initialize Sequence Calculator
function initializeSequenceCalculator() {
    if (isSequenceCalculatorInitialized) {
        console.log('Sequence Calculator already initialized');
        return;
    }
    
    console.log('Initializing Sequence Calculator...');
    
    try {
        // Get the calculate button by ID
        const calculateBtn = document.getElementById('calculate-sequence');
        
        if (!calculateBtn) {
            throw new Error('Calculate button not found');
        }
        
        console.log('Found calculate button:', calculateBtn);
        
        // Add click handler with error handling
        calculateBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Calculate button clicked');
            try {
                calculateSequence();
            } catch (error) {
                console.error('Error in sequence calculation:', error);
                const resultElement = document.getElementById('sequence-result');
                if (resultElement) {
                    resultElement.innerHTML = `<div class="error-message">Error: ${error.message}</div>`;
                }
            }
        });
        
        // Also handle Enter key in input fields
        const inputFields = document.querySelectorAll('#sequence-calculator input[type="number"]');
        console.log('Found input fields:', inputFields.length);
        
        inputFields.forEach(input => {
            input.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    console.log('Enter key pressed in input field');
                    try {
                        calculateSequence();
                    } catch (error) {
                        console.error('Error in sequence calculation:', error);
                        const resultElement = document.getElementById('sequence-result');
                        if (resultElement) {
                            resultElement.innerHTML = `<div class="error-message">Error: ${error.message}</div>`;
                        }
                    }
                }
            });
        });
        
        isSequenceCalculatorInitialized = true;
        console.log('Sequence Calculator initialized successfully');
        
    } catch (error) {
        console.error('Failed to initialize Sequence Calculator:', error);
    }
}

// Initialize all calculators when DOM is fully loaded
function initializeAllCalculators() {
    console.log('Initializing all calculators...');
    
    // Initialize Prime Factorization
    initializePrimeFactorization();
    
    // Equation Solver is now in a separate file
    
    // Initialize statistics calculator
    initializeStatisticsCalculator();
    
    // Initialize GCD & LCM calculator
    initializeGcdLcmCalculator();
    
    // Initialize Complex Number Calculator
    initializeComplexNumberCalculator();
    
    // Initialize Vector Calculator
    initializeVectorCalculator();
    
    // Initialize Sequence Calculator
    initializeSequenceCalculator();
    // Add other initializers here if needed
}

// Check if DOM is already loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeAllCalculators);
} else {
    // DOM already loaded, initialize immediately
    setTimeout(initializeAllCalculators, 100);
}

// Also initialize when the page becomes visible
document.addEventListener('visibilitychange', function() {
    if (document.visibilityState === 'visible') {
        initializeStatisticsCalculator();
    }
});

// Statistics Calculation Functions
function calculateStatistics(data) {
    console.log('Starting calculateStatistics with data:', data);
    
    try {
        // Parse and validate input
        if (typeof data !== 'string') {
            throw new Error('Input must be a string');
        }
        
        console.log('Splitting input by commas...');
        const numberStrings = data.split(',');
        console.log('Split result:', numberStrings);
        
        const numbers = numberStrings
            .map(n => {
                const trimmed = n.trim();
                console.log(`Processing '${n}' -> trimmed to '${trimmed}'`);
                return trimmed;
            })
            .filter(n => n !== '')
            .map(n => {
                const num = parseFloat(n);
                console.log(`Parsing '${n}' ->`, num);
                if (isNaN(num)) {
                    console.warn(`Could not parse number: ${n}`);
                }
                return num;
            })
            .filter(n => !isNaN(n)); // Remove any NaN values
            
        console.log('Final parsed numbers array:', numbers);
        
        if (numbers.length === 0) {
            throw new Error('No valid numbers provided. Please enter numbers separated by commas.');
        }
        
        console.log('Proceeding with', numbers.length, 'valid numbers');
        
        // Calculate all statistics with error handling
        console.log('Calculating statistics...');
        let mean, median, mode, variance, stdDev, min, max, range;
        
        try {
            mean = calculateMean(numbers);
            console.log('Mean calculated:', mean);
            median = calculateMedian(numbers);
            console.log('Median calculated:', median);
            mode = calculateMode(numbers);
            console.log('Mode calculated:', mode);
            variance = calculateVariance(numbers, mean);
            console.log('Variance calculated:', variance);
            stdDev = Math.sqrt(variance);
            console.log('Standard deviation calculated:', stdDev);
            min = Math.min(...numbers);
            max = Math.max(...numbers);
            range = max - min;
            console.log('Min:', min, 'Max:', max, 'Range:', range);
        } catch (calcError) {
            console.error('Error during calculation:', calcError);
            throw new Error(`Error calculating statistics: ${calcError.message}`);
        }
        
        // Prepare results with proper formatting
        const results = {
            'mean-result': mean !== undefined ? mean.toFixed(4) : 'N/A',
            'median-result': median !== undefined ? median.toFixed(4) : 'N/A',
            'mode-result': mode !== undefined ? formatMode(mode) : 'N/A',
            'std-result': stdDev !== undefined ? stdDev.toFixed(4) : 'N/A',
            'variance-result': variance !== undefined ? variance.toFixed(4) : 'N/A',
            'range-result': range !== undefined ? range.toFixed(4) : 'N/A',
            'min-result': min !== undefined ? min.toString() : 'N/A',
            'max-result': max !== undefined ? max.toString() : 'N/A'
        };
        
        console.log('Results to display:', results);
        
        // Update each result element with error handling
        console.log('Updating result elements in the DOM...');
        let updateSuccess = true;
        
        try {
            Object.entries(results).forEach(([id, value]) => {
                try {
                    console.log(`Looking for element with id: ${id}`);
                    const element = document.getElementById(id);
                    
                    if (element) {
                        console.log(`Found element ${id}, setting text content to:`, value);
                        element.textContent = value;
                        // Ensure the element is visible
                        element.style.display = 'inline';
                        element.style.visibility = 'visible';
                        element.style.opacity = '1';
                        console.log(`Successfully updated ${id}`);
                    } else {
                        console.error(`Element with id '${id}' not found in the DOM`);
                        updateSuccess = false;
                    }
                } catch (updateError) {
                    console.error(`Error updating element ${id}:`, updateError);
                    updateSuccess = false;
                }
            });
            
            // Make sure the results container is visible
            const resultsContainer = document.querySelector('.statistics-results');
            if (resultsContainer) {
                console.log('Making results container visible');
                resultsContainer.style.display = 'block';
                resultsContainer.style.visibility = 'visible';
                resultsContainer.style.opacity = '1';
            } else {
                console.error('Results container not found');
                updateSuccess = false;
            }
        } catch (displayError) {
            console.error('Error displaying results:', displayError);
            throw new Error(`Failed to display results: ${displayError.message}`);
        }
        
        if (!updateSuccess) {
            console.warn('Some elements could not be updated');
        }
        
        console.log('Result update completed');
        return updateSuccess;
    } catch (error) {
        // Clear all results on error
        const resultIds = ['mean', 'median', 'mode', 'std', 'variance', 'range', 'min', 'max'];
        resultIds.forEach(id => {
            const element = document.getElementById(`${id}-result`);
            if (element) {
                element.textContent = '';
            }
        });
        throw new Error('Statistics calculation error: ' + error.message);
    }
}

// Helper function to calculate mean (average)
function calculateMean(numbers) {
    if (!Array.isArray(numbers) || numbers.length === 0) {
        throw new Error('Invalid input: numbers array is empty or not an array');
    }
    return numbers.reduce((sum, num) => sum + num, 0) / numbers.length;
}

// Helper function to calculate median
function calculateMedian(numbers) {
    if (!Array.isArray(numbers) || numbers.length === 0) {
        throw new Error('Invalid input: numbers array is empty or not an array');
    }
    
    const sorted = [...numbers].sort((a, b) => a - b);
    const middle = Math.floor(sorted.length / 2);
    
    if (sorted.length % 2 === 0) {
        return (sorted[middle - 1] + sorted[middle]) / 2;
    }
    return sorted[middle];
}

// Helper function to calculate mode
function calculateMode(numbers) {
    if (!Array.isArray(numbers) || numbers.length === 0) {
        throw new Error('Invalid input: numbers array is empty or not an array');
    }
    
    // Count frequency of each number
    const frequency = {};
    numbers.forEach(num => {
        frequency[num] = (frequency[num] || 0) + 1;
    });
    
    // Find the maximum frequency
    const maxFreq = Math.max(...Object.values(frequency));
    
    // If all numbers appear only once, there is no mode
    if (maxFreq === 1) {
        return null;
    }
    
    // Find all numbers that appear with maximum frequency
    const modes = Object.entries(frequency)
        .filter(([_, freq]) => freq === maxFreq)
        .map(([num]) => parseFloat(num))
        .sort((a, b) => a - b);
    
    return modes;
}

// Helper function to calculate variance
function calculateVariance(numbers, mean) {
    if (!Array.isArray(numbers) || numbers.length === 0) {
        throw new Error('Invalid input: numbers array is empty or not an array');
    }
    
    if (typeof mean !== 'number' || isNaN(mean)) {
        throw new Error('Invalid input: mean is not a valid number');
    }
    
    // Calculate squared differences from mean
    const squaredDifferences = numbers.map(num => {
        if (typeof num !== 'number' || isNaN(num)) {
            throw new Error('Invalid input: contains non-numeric values');
        }
        return Math.pow(num - mean, 2);
    });
    
    // Calculate mean of squared differences
    const variance = squaredDifferences.reduce((sum, num) => sum + num, 0) / numbers.length;
    
    if (isNaN(variance)) {
        throw new Error('Error: variance calculation resulted in NaN');
    }
    
    return variance;
}

// Helper function to format mode for display
function formatMode(mode) {
    if (mode === null || mode.length === 0) {
        return 'No mode';
    } else if (mode.length === 1) {
        return mode[0].toString();
    } else {
        return mode.join(', ');
    }
}

// Statistics Calculator Initialization
function initializeStatisticsCalculator() {
    console.log('Initializing Statistics Calculator...');
    
    try {
        const calculateBtn = document.getElementById('calculate-statistics');
        const dataInput = document.getElementById('data-input');
        const resultsContainer = document.querySelector('.statistics-results');
        
        if (!calculateBtn || !dataInput || !resultsContainer) {
            console.warn('One or more required elements not found for Statistics Calculator');
            return;
        }
        
        // Make sure results container is visible
        resultsContainer.style.display = 'block';
        resultsContainer.style.visibility = 'visible';
        resultsContainer.style.opacity = '1';
        
        // Remove any existing event listeners by cloning the button
        const newBtn = calculateBtn.cloneNode(true);
        calculateBtn.parentNode.replaceChild(newBtn, calculateBtn);
        
        // Add click event listener
        newBtn.addEventListener('click', function() {
            console.log('Calculate statistics button clicked');
            
            try {
                // Get and validate input
                const inputValue = dataInput.value.trim();
                if (!inputValue) {
                    throw new Error('Please enter some numbers to calculate');
                }
                
                // Show loading state
                const resultElements = document.querySelectorAll('.result-value');
                resultElements.forEach(el => {
                    el.textContent = 'Calculating...';
                    el.style.color = '';
                    el.style.display = 'inline';
                });
                
                // Make sure results are visible
                resultsContainer.style.display = 'block';
                resultsContainer.style.visibility = 'visible';
                resultsContainer.style.opacity = '1';
                
                // Perform calculation
                console.log('Calculating statistics for:', inputValue);
                const success = calculateStatistics(inputValue);
                
                if (!success) {
                    throw new Error('Failed to calculate statistics');
                }
                
            } catch (error) {
                console.error('Error in statistics calculation:', error);
                const firstResult = document.querySelector('.result-value');
                if (firstResult) {
                    firstResult.textContent = 'Error: ' + error.message;
                    firstResult.style.color = 'red';
                }
            }
        });
        
        console.log('Statistics calculator initialized successfully');
        
    } catch (error) {
        console.error('Failed to initialize statistics calculator:', error);
    }
}

// Add event listeners for input changes with debounce
const percentInputs = ['initial-value', 'final-value'];
percentInputs.forEach(id => {
    const input = document.getElementById(id);
    if (input) {
        let debounceTimer;
        input.addEventListener('input', () => {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(calculatePercentageChange, 300);
        });
    }
});
// ... existing code ...

// ... existing code ...
function calculateRatio() {
    const firstNumber = document.getElementById('first-number').value.trim();
    const secondNumber = document.getElementById('second-number').value.trim();
    const resultElement = document.getElementById('ratio-result');
    
    try {
        // Validate inputs
        if (!firstNumber || !secondNumber) {
            throw new Error('Please enter both numbers');
        }
        
        // Parse the numbers
        const num1 = parseFloat(firstNumber);
        const num2 = parseFloat(secondNumber);
        
        if (isNaN(num1) || isNaN(num2)) {
            throw new Error('Please enter valid numbers');
        }
        
        if (num2 === 0) {
            throw new Error('Second number cannot be zero');
        }
        
        // Calculate the ratio
        const ratio = num1 / num2;
        
        // Find the greatest common divisor
        const gcd = findGCD(Math.abs(num1), Math.abs(num2));
        
        // Calculate simplified ratio
        const simplifiedNum1 = Math.abs(num1) / gcd;
        const simplifiedNum2 = Math.abs(num2) / gcd;
        
        // Format the result
        let resultText = `<strong>First Number:</strong> ${firstNumber}<br><br>`;
        resultText += `<strong>Second Number:</strong> ${secondNumber}<br><br>`;
        resultText += `<strong>Ratio:</strong> ${ratio.toFixed(4)}<br><br>`;
        resultText += `<strong>Simplified Ratio:</strong> ${simplifiedNum1}:${simplifiedNum2}<br><br>`;
        resultText += `<strong>Details:</strong><br>`;
        resultText += `- Decimal Ratio: ${ratio.toFixed(4)}<br>`;
        resultText += `- Simplified Ratio: ${simplifiedNum1}:${simplifiedNum2}<br>`;
        resultText += `- Greatest Common Divisor: ${gcd}`;
        
        // Display the result
        resultElement.innerHTML = resultText;
        resultElement.style.display = 'block';
        
        // Log the calculation
        console.log(`Ratio calculation: ${firstNumber}:${secondNumber} = ${simplifiedNum1}:${simplifiedNum2}`);
    } catch (error) {
        showError('ratio-result', error.message);
    }
}

// Add event listener for ratio calculation
document.getElementById('calculate-ratio').addEventListener('click', calculateRatio);

// Add event listeners for input changes with debounce
const ratioInputs = ['first-number', 'second-number'];
ratioInputs.forEach(id => {
    const input = document.getElementById(id);
    if (input) {
        let debounceTimer;
        input.addEventListener('input', () => {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(calculateRatio, 300);
        });
    }
});
// ... existing code ...

// ... existing code ...
function calculateProportion() {
    const a = document.getElementById('proportion-a').value.trim();
    const b = document.getElementById('proportion-b').value.trim();
    const c = document.getElementById('proportion-c').value.trim();
    const resultElement = document.getElementById('proportion-result');
    
    try {
        // Validate inputs
        if (!a || !b || !c) {
            throw new Error('Please enter all three numbers');
        }
        
        // Parse the numbers
        const numA = parseFloat(a);
        const numB = parseFloat(b);
        const numC = parseFloat(c);
        
        if (isNaN(numA) || isNaN(numB) || isNaN(numC)) {
            throw new Error('Please enter valid numbers');
        }
        
        if (numA === 0 || numB === 0) {
            throw new Error('First and second numbers cannot be zero');
        }
        
        // Calculate the proportion
        // If a:b = c:x, then x = (b * c) / a
        const x = (numB * numC) / numA;
        
        // Format the result
        let resultText = `<strong>Proportion:</strong> ${numA}:${numB} = ${numC}:${x.toFixed(6)}<br><br>`;
        resultText += `<strong>Calculation:</strong><br>`;
        resultText += `1. Given proportion: ${numA}:${numB} = ${numC}:x<br>`;
        resultText += `2. Cross multiply: ${numA} × x = ${numB} × ${numC}<br>`;
        resultText += `3. Solve for x: x = (${numB} × ${numC}) / ${numA}<br>`;
        resultText += `4. x = ${x.toFixed(6)}`;
        
        // Display the result
        resultElement.innerHTML = resultText;
        resultElement.style.display = 'block';
        
        // Log the calculation
        console.log(`Proportion calculation: ${numA}:${numB} = ${numC}:${x.toFixed(6)}`);
    } catch (error) {
        console.error('Proportion calculation error:', error);
        resultElement.innerHTML = `<div class="error">Error: ${error.message}</div>`;
        resultElement.style.display = 'block';
    }
}

// Add event listener for proportion calculation
document.getElementById('calculate-proportion').addEventListener('click', calculateProportion);

// ... existing code ...

// ... existing code ...

function calculateMeanMedianMode() {
    const input = document.getElementById('numbers-input-mmm').value.trim();
    const resultElement = document.getElementById('mmm-result');
    
    try {
        // Parse and validate input
        const numbers = input.split(',')
            .map(n => n.trim())
            .filter(n => n !== '')
            .map(n => parseFloat(n));
        
        if (numbers.length === 0) {
            throw new Error('Please enter at least one number');
        }
        
        if (numbers.some(isNaN)) {
            throw new Error('Please enter valid numbers');
        }
        
        // Calculate statistics
        const mean = calculateMean(numbers);
        const median = calculateMedian(numbers);
        const mode = calculateMode(numbers);
        
        // Format the result
        let resultText = `<strong>Results:</strong><br><br>`;
        resultText += `<strong>Mean:</strong> ${mean.toFixed(4)}<br>`;
        resultText += `<strong>Median:</strong> ${median.toFixed(4)}<br>`;
        resultText += `<strong>Mode:</strong> ${formatMode(mode)}<br><br>`;
        resultText += `<strong>Calculation Steps:</strong><br>`;
        resultText += `1. Mean = Sum of numbers / Count = ${numbers.reduce((a, b) => a + b, 0)} / ${numbers.length} = ${mean.toFixed(4)}<br>`;
        resultText += `2. Median = Middle value of sorted numbers = ${median.toFixed(4)}<br>`;
        resultText += `3. Mode = Most frequent value(s) = ${formatMode(mode)}`;
        
        // Display the result
        resultElement.innerHTML = resultText;
        resultElement.style.display = 'block';
        
        // Log the calculation
        console.log('Mean, Median, Mode calculation:', { mean, median, mode });
    } catch (error) {
        console.error('Mean, Median, Mode calculation error:', error);
        resultElement.innerHTML = `<div class="error">Error: ${error.message}</div>`;
        resultElement.style.display = 'block';
    }
}

function calculateStandardDeviation() {
    const input = document.getElementById('numbers-input-std').value.trim();
    const resultElement = document.getElementById('std-result');
    
    try {
        // Parse and validate input
        if (!input) {
            throw new Error('Please enter numbers');
        }

        const numbers = input.split(',')
            .map(n => n.trim())
            .filter(n => n !== '')
            .map(n => parseFloat(n));
        
        if (numbers.length === 0) {
            throw new Error('Please enter at least one number');
        }
        
        if (numbers.some(isNaN)) {
            throw new Error('Please enter valid numbers');
        }

        if (numbers.length === 1) {
            throw new Error('Please enter at least two numbers to calculate standard deviation');
        }
        
        // Calculate statistics using the same method as Variance Calculator
        const mean = calculateMean(numbers);
        if (typeof mean !== 'number' || isNaN(mean)) {
            throw new Error('Error calculating mean');
        }

        // Calculate squared differences from mean
        const squaredDifferences = numbers.map(num => Math.pow(num - mean, 2));
        
        // Calculate variance
        const variance = squaredDifferences.reduce((sum, num) => sum + num, 0) / numbers.length;
        
        if (typeof variance !== 'number' || isNaN(variance)) {
            throw new Error('Error calculating variance');
        }

        // Calculate standard deviation (square root of variance)
        const stdDev = Math.sqrt(variance);
        if (typeof stdDev !== 'number' || isNaN(stdDev)) {
            throw new Error('Error calculating standard deviation');
        }
        
        // Format the result
        let resultText = `<strong>Results:</strong><br><br>`;
        resultText += `<strong>Standard Deviation:</strong> ${stdDev.toFixed(4)}<br>`;
        resultText += `<strong>Variance:</strong> ${variance.toFixed(4)}<br>`;
        resultText += `<strong>Mean:</strong> ${mean.toFixed(4)}<br><br>`;
        resultText += `<strong>Calculation Steps:</strong><br>`;
        resultText += `1. Calculate mean = ${mean.toFixed(4)}<br>`;
        resultText += `2. Calculate squared differences from mean:<br>`;
        numbers.forEach((num, index) => {
            resultText += `   - (${num} - ${mean.toFixed(4)})² = ${Math.pow(num - mean, 2).toFixed(4)}<br>`;
        });
        resultText += `3. Calculate variance = Mean of squared differences = ${variance.toFixed(4)}<br>`;
        resultText += `4. Calculate standard deviation = √variance = ${stdDev.toFixed(4)}`;
        
        // Display the result
        resultElement.innerHTML = resultText;
        resultElement.style.display = 'block';
        
        // Log the calculation
        console.log('Standard deviation calculation:', { mean, variance, stdDev });
    } catch (error) {
        console.error('Standard deviation calculation error:', error);
        resultElement.innerHTML = `<div class="error">Error: ${error.message}</div>`;
        resultElement.style.display = 'block';
    }
}

function calculateVariance() {
    const input = document.getElementById('numbers-input-var').value.trim();
    const resultElement = document.getElementById('var-result');
    
    try {
        // Parse and validate input
        if (!input) {
            throw new Error('Please enter numbers');
        }

        const numbers = input.split(',')
            .map(n => n.trim())
            .filter(n => n !== '')
            .map(n => parseFloat(n));
        
        if (numbers.length === 0) {
            throw new Error('Please enter at least one number');
        }
        
        if (numbers.some(isNaN)) {
            throw new Error('Please enter valid numbers');
        }

        if (numbers.length === 1) {
            throw new Error('Please enter at least two numbers to calculate variance');
        }
        
        // Calculate statistics
        const mean = calculateMean(numbers);
        if (typeof mean !== 'number' || isNaN(mean)) {
            throw new Error('Error calculating mean');
        }

        // Calculate squared differences from mean
        const squaredDifferences = numbers.map(num => Math.pow(num - mean, 2));
        
        // Calculate variance
        const variance = squaredDifferences.reduce((sum, num) => sum + num, 0) / numbers.length;
        
        if (typeof variance !== 'number' || isNaN(variance)) {
            throw new Error('Error calculating variance');
        }

        const stdDev = Math.sqrt(variance);
        if (typeof stdDev !== 'number' || isNaN(stdDev)) {
            throw new Error('Error calculating standard deviation');
        }
        
        // Format the result
        let resultText = `<strong>Results:</strong><br><br>`;
        resultText += `<strong>Variance:</strong> ${variance.toFixed(4)}<br>`;
        resultText += `<strong>Standard Deviation:</strong> ${stdDev.toFixed(4)}<br>`;
        resultText += `<strong>Mean:</strong> ${mean.toFixed(4)}<br><br>`;
        resultText += `<strong>Calculation Steps:</strong><br>`;
        resultText += `1. Calculate mean = ${mean.toFixed(4)}<br>`;
        resultText += `2. Calculate squared differences from mean:<br>`;
        numbers.forEach((num, index) => {
            resultText += `   - (${num} - ${mean.toFixed(4)})² = ${Math.pow(num - mean, 2).toFixed(4)}<br>`;
        });
        resultText += `3. Calculate variance = Mean of squared differences = ${variance.toFixed(4)}<br>`;
        resultText += `4. Standard deviation = √variance = ${stdDev.toFixed(4)}`;
        
        // Display the result
        resultElement.innerHTML = resultText;
        resultElement.style.display = 'block';
        
        // Log the calculation
        console.log('Variance calculation:', { mean, variance, stdDev });
    } catch (error) {
        console.error('Variance calculation error:', error);
        resultElement.innerHTML = `<div class="error">Error: ${error.message}</div>`;
        resultElement.style.display = 'block';
    }
}

// Add event listeners for the calculators
document.getElementById('calculate-mmm').addEventListener('click', calculateMeanMedianMode);
document.getElementById('calculate-std').addEventListener('click', calculateStandardDeviation);
document.getElementById('calculate-var').addEventListener('click', calculateVariance);

// ... existing code ...

function calculateCorrelation() {
    const xInput = document.getElementById('correlation-x').value.trim();
    const yInput = document.getElementById('correlation-y').value.trim();
    const resultElement = document.getElementById('correlation-result');
    
    try {
        // Parse and validate inputs
        if (!xInput || !yInput) {
            throw new Error('Please enter both X and Y values');
        }

        const xValues = xInput.split(',')
            .map(n => n.trim())
            .filter(n => n !== '')
            .map(n => parseFloat(n));
            
        const yValues = yInput.split(',')
            .map(n => n.trim())
            .filter(n => n !== '')
            .map(n => parseFloat(n));
        
        if (xValues.length !== yValues.length) {
            throw new Error('X and Y values must have the same number of data points');
        }
        
        if (xValues.length < 2) {
            throw new Error('Please enter at least two data points');
        }
        
        if (xValues.some(isNaN) || yValues.some(isNaN)) {
            throw new Error('Please enter valid numbers');
        }

        // Calculate means
        const xMean = calculateMean(xValues);
        const yMean = calculateMean(yValues);
        
        // Calculate correlation coefficient
        let numerator = 0;
        let xDenominator = 0;
        let yDenominator = 0;
        
        // Calculate differences and their products
        const differences = [];
        for (let i = 0; i < xValues.length; i++) {
            const xDiff = xValues[i] - xMean;
            const yDiff = yValues[i] - yMean;
            const product = xDiff * yDiff;
            differences.push({
                x: xValues[i],
                y: yValues[i],
                xDiff: xDiff,
                yDiff: yDiff,
                product: product
            });
            numerator += product;
            xDenominator += xDiff * xDiff;
            yDenominator += yDiff * yDiff;
        }
        
        // Check for zero variance
        if (xDenominator === 0 || yDenominator === 0) {
            throw new Error('Cannot calculate correlation: one or both variables have zero variance');
        }
        
        const correlation = numerator / Math.sqrt(xDenominator * yDenominator);
        
        // Format the result
        let resultText = `<strong>Results:</strong><br><br>`;
        resultText += `<strong>Correlation Coefficient (r):</strong> ${correlation.toFixed(4)}<br>`;
        resultText += `<strong>Interpretation:</strong><br>`;
        
        // Enhanced interpretation
        if (correlation === 1) {
            resultText += `Perfect positive correlation<br>`;
        } else if (correlation > 0.7) {
            resultText += `Strong positive correlation<br>`;
        } else if (correlation > 0.3) {
            resultText += `Moderate positive correlation<br>`;
        } else if (correlation > 0) {
            resultText += `Weak positive correlation<br>`;
        } else if (correlation === 0) {
            resultText += `No correlation<br>`;
        } else if (correlation === -1) {
            resultText += `Perfect negative correlation<br>`;
        } else if (correlation < -0.7) {
            resultText += `Strong negative correlation<br>`;
        } else if (correlation < -0.3) {
            resultText += `Moderate negative correlation<br>`;
        } else {
            resultText += `Weak negative correlation<br>`;
        }
        
        resultText += `<br><strong>Summary Statistics:</strong><br>`;
        resultText += `Number of data points: ${xValues.length}<br>`;
        resultText += `Mean of X values: ${xMean.toFixed(4)}<br>`;
        resultText += `Mean of Y values: ${yMean.toFixed(4)}<br><br>`;
        
        resultText += `<strong>Calculation Steps:</strong><br>`;
        resultText += `1. Calculate means:<br>`;
        resultText += `   - Mean of X = ${xMean.toFixed(4)}<br>`;
        resultText += `   - Mean of Y = ${yMean.toFixed(4)}<br><br>`;
        
        resultText += `2. Calculate differences from means and their products:<br>`;
        differences.forEach((diff, index) => {
            resultText += `   Point ${index + 1}:<br>`;
            resultText += `   - X = ${diff.x}, Y = ${diff.y}<br>`;
            resultText += `   - (X - X̄) = ${diff.xDiff.toFixed(4)}<br>`;
            resultText += `   - (Y - Ȳ) = ${diff.yDiff.toFixed(4)}<br>`;
            resultText += `   - Product = ${diff.product.toFixed(4)}<br>`;
        });
        
        resultText += `<br>3. Calculate correlation coefficient:<br>`;
        resultText += `   r = ${numerator.toFixed(4)} / √(${xDenominator.toFixed(4)} × ${yDenominator.toFixed(4)})<br>`;
        resultText += `   r = ${correlation.toFixed(4)}`;
        
        // Display the result
        resultElement.innerHTML = resultText;
        resultElement.style.display = 'block';
        
        // Log the calculation
        console.log('Correlation calculation:', {
            xValues,
            yValues,
            xMean,
            yMean,
            differences,
            numerator,
            xDenominator,
            yDenominator,
            correlation
        });
    } catch (error) {
        console.error('Correlation calculation error:', error);
        resultElement.innerHTML = `<div class="error">Error: ${error.message}</div>`;
        resultElement.style.display = 'block';
    }
}

function calculateRegression() {
    const xInput = document.getElementById('regression-x').value.trim();
    const yInput = document.getElementById('regression-y').value.trim();
    const resultElement = document.getElementById('regression-result');
    
    try {
        // Parse and validate inputs
        if (!xInput || !yInput) {
            throw new Error('Please enter both X and Y values');
        }

        const xValues = xInput.split(',')
            .map(n => n.trim())
            .filter(n => n !== '')
            .map(n => parseFloat(n));
            
        const yValues = yInput.split(',')
            .map(n => n.trim())
            .filter(n => n !== '')
            .map(n => parseFloat(n));
        
        if (xValues.length !== yValues.length) {
            throw new Error('X and Y values must have the same number of data points');
        }
        
        if (xValues.length < 2) {
            throw new Error('Please enter at least two data points');
        }
        
        if (xValues.some(isNaN) || yValues.some(isNaN)) {
            throw new Error('Please enter valid numbers');
        }

        // Calculate means
        const xMean = calculateMean(xValues);
        const yMean = calculateMean(yValues);
        
        // Calculate slope (b) and y-intercept (a)
        let numerator = 0;
        let denominator = 0;
        
        // Calculate differences and their products
        const differences = [];
        for (let i = 0; i < xValues.length; i++) {
            const xDiff = xValues[i] - xMean;
            const yDiff = yValues[i] - yMean;
            const product = xDiff * yDiff;
            differences.push({
                x: xValues[i],
                y: yValues[i],
                xDiff: xDiff,
                yDiff: yDiff,
                product: product
            });
            numerator += product;
            denominator += xDiff * xDiff;
        }
        
        // Check for zero variance in X
        if (denominator === 0) {
            throw new Error('Cannot calculate regression: X values have zero variance');
        }
        
        const slope = numerator / denominator;
        const yIntercept = yMean - slope * xMean;
        
        // Calculate R-squared
        let ssTotal = 0;
        let ssResidual = 0;
        
        for (let i = 0; i < xValues.length; i++) {
            const yPredicted = slope * xValues[i] + yIntercept;
            ssTotal += Math.pow(yValues[i] - yMean, 2);
            ssResidual += Math.pow(yValues[i] - yPredicted, 2);
        }
        
        const rSquared = 1 - (ssResidual / ssTotal);
        
        // Format the result
        let resultText = `<strong>Results:</strong><br><br>`;
        resultText += `<strong>Regression Equation:</strong> y = ${slope.toFixed(4)}x + ${yIntercept.toFixed(4)}<br>`;
        resultText += `<strong>Slope (b):</strong> ${slope.toFixed(4)}<br>`;
        resultText += `<strong>Y-Intercept (a):</strong> ${yIntercept.toFixed(4)}<br>`;
        resultText += `<strong>R-squared:</strong> ${rSquared.toFixed(4)}<br><br>`;
        
        resultText += `<strong>Summary Statistics:</strong><br>`;
        resultText += `Number of data points: ${xValues.length}<br>`;
        resultText += `Mean of X values: ${xMean.toFixed(4)}<br>`;
        resultText += `Mean of Y values: ${yMean.toFixed(4)}<br><br>`;
        
        resultText += `<strong>Calculation Steps:</strong><br>`;
        resultText += `1. Calculate means:<br>`;
        resultText += `   - Mean of X = ${xMean.toFixed(4)}<br>`;
        resultText += `   - Mean of Y = ${yMean.toFixed(4)}<br><br>`;
        
        resultText += `2. Calculate differences from means and their products:<br>`;
        differences.forEach((diff, index) => {
            resultText += `   Point ${index + 1}:<br>`;
            resultText += `   - X = ${diff.x}, Y = ${diff.y}<br>`;
            resultText += `   - (X - X̄) = ${diff.xDiff.toFixed(4)}<br>`;
            resultText += `   - (Y - Ȳ) = ${diff.yDiff.toFixed(4)}<br>`;
            resultText += `   - Product = ${diff.product.toFixed(4)}<br>`;
        });
        
        resultText += `<br>3. Calculate slope and y-intercept:<br>`;
        resultText += `   Slope (b) = ${numerator.toFixed(4)} / ${denominator.toFixed(4)} = ${slope.toFixed(4)}<br>`;
        resultText += `   Y-intercept (a) = ${yMean.toFixed(4)} - (${slope.toFixed(4)} × ${xMean.toFixed(4)}) = ${yIntercept.toFixed(4)}<br><br>`;
        
        resultText += `<strong>Predicted Values:</strong><br>`;
        for (let i = 0; i < xValues.length; i++) {
            const yPredicted = slope * xValues[i] + yIntercept;
            resultText += `   - For x = ${xValues[i]}, y = ${yPredicted.toFixed(4)}<br>`;
        }
        
        // Display the result
        resultElement.innerHTML = resultText;
        resultElement.style.display = 'block';
        
        // Log the calculation
        console.log('Regression calculation:', {
            xValues,
            yValues,
            xMean,
            yMean,
            differences,
            slope,
            yIntercept,
            rSquared
        });
    } catch (error) {
        console.error('Regression calculation error:', error);
        resultElement.innerHTML = `<div class="error">Error: ${error.message}</div>`;
        resultElement.style.display = 'block';
    }
}

function calculateConfidenceInterval() {
    const mean = parseFloat(document.getElementById('ci-mean').value);
    const stdDev = parseFloat(document.getElementById('ci-std-dev').value);
    const sampleSize = parseInt(document.getElementById('ci-sample-size').value);
    const confidenceLevel = parseFloat(document.getElementById('ci-level').value);
    const resultElement = document.getElementById('ci-result');
    
    try {
        // Validate inputs
        if (isNaN(mean) || isNaN(stdDev) || isNaN(sampleSize) || isNaN(confidenceLevel)) {
            throw new Error('Please enter valid numbers for all fields');
        }
        
        if (stdDev <= 0) {
            throw new Error('Standard deviation must be greater than 0');
        }
        
        if (sampleSize < 2) {
            throw new Error('Sample size must be at least 2');
        }
        
        // Calculate standard error
        const standardError = stdDev / Math.sqrt(sampleSize);
        
        // Get z-score for confidence level
        const zScore = getZScore(confidenceLevel);
        
        // Calculate margin of error
        const marginOfError = zScore * standardError;
        
        // Calculate confidence interval
        const lowerBound = mean - marginOfError;
        const upperBound = mean + marginOfError;
        
        // Format the result
        let resultText = `<strong>Results:</strong><br><br>`;
        resultText += `<strong>Confidence Interval:</strong> (${lowerBound.toFixed(4)}, ${upperBound.toFixed(4)})<br>`;
        resultText += `<strong>Margin of Error:</strong> ±${marginOfError.toFixed(4)}<br>`;
        resultText += `<strong>Standard Error:</strong> ${standardError.toFixed(4)}<br><br>`;
        
        resultText += `<strong>Calculation Steps:</strong><br>`;
        resultText += `1. Calculate Standard Error:<br>`;
        resultText += `   Standard Error = σ/√n = ${stdDev.toFixed(4)}/√${sampleSize} = ${standardError.toFixed(4)}<br><br>`;
        
        resultText += `2. Get Z-Score for ${confidenceLevel}% confidence level:<br>`;
        resultText += `   Z-Score = ${zScore.toFixed(4)}<br><br>`;
        
        resultText += `3. Calculate Margin of Error:<br>`;
        resultText += `   Margin of Error = Z-Score × Standard Error = ${zScore.toFixed(4)} × ${standardError.toFixed(4)} = ${marginOfError.toFixed(4)}<br><br>`;
        
        resultText += `4. Calculate Confidence Interval:<br>`;
        resultText += `   Lower Bound = Mean - Margin of Error = ${mean.toFixed(4)} - ${marginOfError.toFixed(4)} = ${lowerBound.toFixed(4)}<br>`;
        resultText += `   Upper Bound = Mean + Margin of Error = ${mean.toFixed(4)} + ${marginOfError.toFixed(4)} = ${upperBound.toFixed(4)}<br>`;
        
        // Display the result
        resultElement.innerHTML = resultText;
        resultElement.style.display = 'block';
        
        // Log the calculation
        console.log('Confidence Interval calculation:', {
            mean,
            stdDev,
            sampleSize,
            confidenceLevel,
            standardError,
            zScore,
            marginOfError,
            lowerBound,
            upperBound
        });
    } catch (error) {
        console.error('Confidence Interval calculation error:', error);
    }
}

// Helper function to get Z-score for confidence level
function getZScore(confidenceLevel) {
    switch (confidenceLevel) {
        case 90:
            return 1.645;
        case 95:
            return 1.96;
        case 99:
            return 2.576;
        default:
            throw new Error('Invalid confidence level');
    }
}

// ... existing code ...

// Add event listeners for all calculators
document.addEventListener('DOMContentLoaded', function() {
    // ... existing event listeners ...
    
    // Correlation Calculator
    const calculateCorrelationBtn = document.getElementById('calculate-correlation');
    if (calculateCorrelationBtn) {
        calculateCorrelationBtn.addEventListener('click', calculateCorrelation);
    }

    // Add input event listeners for real-time calculation
    const xValuesInput = document.getElementById('correlation-x');
    const yValuesInput = document.getElementById('correlation-y');
    
    if (xValuesInput && yValuesInput) {
        let debounceTimer;
        const debounceDelay = 500; // 500ms delay

        const debouncedCalculation = () => {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(calculateCorrelation, debounceDelay);
        };

        xValuesInput.addEventListener('input', debouncedCalculation);
        yValuesInput.addEventListener('input', debouncedCalculation);
    }

    // Regression Calculator
    const calculateRegressionBtn = document.getElementById('calculate-regression');
    if (calculateRegressionBtn) {
        calculateRegressionBtn.addEventListener('click', calculateRegression);
    }

    // Add input event listeners for real-time calculation
    const regressionXInput = document.getElementById('regression-x');
    const regressionYInput = document.getElementById('regression-y');
    
    if (regressionXInput && regressionYInput) {
        let debounceTimer;
        const debounceDelay = 500; // 500ms delay

        const debouncedCalculation = () => {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(calculateRegression, debounceDelay);
        };

        regressionXInput.addEventListener('input', debouncedCalculation);
        regressionYInput.addEventListener('input', debouncedCalculation);
    }

    // Confidence Interval Calculator
    const calculateCIBtn = document.getElementById('calculate-ci');
    if (calculateCIBtn) {
        calculateCIBtn.addEventListener('click', calculateConfidenceInterval);
    }

    // Add input event listeners for real-time calculation
    const ciMeanInput = document.getElementById('ci-mean');
    const ciStdDevInput = document.getElementById('ci-std-dev');
    const ciSampleSizeInput = document.getElementById('ci-sample-size');
    const ciLevelInput = document.getElementById('ci-level');
    
    if (ciMeanInput && ciStdDevInput && ciSampleSizeInput && ciLevelInput) {
        let debounceTimer;
        const debounceDelay = 500; // 500ms delay

        const debouncedCalculation = () => {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(calculateConfidenceInterval, debounceDelay);
        };

        ciMeanInput.addEventListener('input', debouncedCalculation);
        ciStdDevInput.addEventListener('input', debouncedCalculation);
        ciSampleSizeInput.addEventListener('input', debouncedCalculation);
        ciLevelInput.addEventListener('change', debouncedCalculation);
    }

    // Hypothesis Testing Calculator
    const calculateHTBtn = document.getElementById('calculate-ht');
    if (calculateHTBtn) {
        calculateHTBtn.addEventListener('click', calculateHypothesisTest);
    }

    // Add input event listeners for real-time calculation
    const htSampleMeanInput = document.getElementById('ht-sample-mean');
    const htPopMeanInput = document.getElementById('ht-pop-mean');
    const htStdDevInput = document.getElementById('ht-std-dev');
    const htSampleSizeInput = document.getElementById('ht-sample-size');
    const htSignificanceInput = document.getElementById('ht-significance');
    
    if (htSampleMeanInput && htPopMeanInput && htStdDevInput && htSampleSizeInput && htSignificanceInput) {
        let debounceTimer;
        const debounceDelay = 500; // 500ms delay

        const debouncedCalculation = () => {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(calculateHypothesisTest, debounceDelay);
        };

        htSampleMeanInput.addEventListener('input', debouncedCalculation);
        htPopMeanInput.addEventListener('input', debouncedCalculation);
        htStdDevInput.addEventListener('input', debouncedCalculation);
        htSampleSizeInput.addEventListener('input', debouncedCalculation);
        htSignificanceInput.addEventListener('change', debouncedCalculation);
    }

    // Chi-Square Calculator
    const calculateChiBtn = document.getElementById('calculate-chi');
    if (calculateChiBtn) {
        calculateChiBtn.addEventListener('click', calculateChiSquare);
    }

    // Add input event listeners for real-time calculation
    const chiObservedInput = document.getElementById('chi-observed');
    const chiExpectedInput = document.getElementById('chi-expected');
    
    if (chiObservedInput && chiExpectedInput) {
        let debounceTimer;
        const debounceDelay = 500; // 500ms delay

        const debouncedCalculation = () => {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(calculateChiSquare, debounceDelay);
        };

        chiObservedInput.addEventListener('input', debouncedCalculation);
        chiExpectedInput.addEventListener('input', debouncedCalculation);
    }

    // T-Test Calculator
    const calculateTTestBtn = document.getElementById('calculate-t-test');
    if (calculateTTestBtn) {
        calculateTTestBtn.addEventListener('click', calculateTTest);
    }

    // Add input event listeners for real-time calculation
    const tSampleMeanInput = document.getElementById('t-sample-mean');
    const tPopMeanInput = document.getElementById('t-pop-mean');
    const tStdDevInput = document.getElementById('t-std-dev');
    const tSampleSizeInput = document.getElementById('t-sample-size');
    const tSignificanceInput = document.getElementById('t-significance');
    
    if (tSampleMeanInput && tPopMeanInput && tStdDevInput && tSampleSizeInput && tSignificanceInput) {
        let debounceTimer;
        const debounceDelay = 500; // 500ms delay

        const debouncedCalculation = () => {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(calculateTTest, debounceDelay);
        };

        tSampleMeanInput.addEventListener('input', debouncedCalculation);
        tPopMeanInput.addEventListener('input', debouncedCalculation);
        tStdDevInput.addEventListener('input', debouncedCalculation);
        tSampleSizeInput.addEventListener('input', debouncedCalculation);
        tSignificanceInput.addEventListener('change', debouncedCalculation);
    }

    // Z-Test Calculator
    const calculateZTestBtn = document.getElementById('calculate-z-test');
    if (calculateZTestBtn) {
        calculateZTestBtn.addEventListener('click', calculateZTest);
    }

    // Add input event listeners for real-time calculation
    const zSampleMeanInput = document.getElementById('z-sample-mean');
    const zPopMeanInput = document.getElementById('z-pop-mean');
    const zPopStdDevInput = document.getElementById('z-pop-std-dev');
    const zSampleSizeInput = document.getElementById('z-sample-size');
    const zSignificanceInput = document.getElementById('z-significance');
    
    if (zSampleMeanInput && zPopMeanInput && zPopStdDevInput && zSampleSizeInput && zSignificanceInput) {
        let debounceTimer;
        const debounceDelay = 500; // 500ms delay

        const debouncedCalculation = () => {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(calculateZTest, debounceDelay);
        };

        zSampleMeanInput.addEventListener('input', debouncedCalculation);
        zPopMeanInput.addEventListener('input', debouncedCalculation);
        zPopStdDevInput.addEventListener('input', debouncedCalculation);
        zSampleSizeInput.addEventListener('input', debouncedCalculation);
        zSignificanceInput.addEventListener('change', debouncedCalculation);
    }

    // ANOVA Calculator
    const calculateANOVABtn = document.getElementById('calculate-anova');
    if (calculateANOVABtn) {
        calculateANOVABtn.addEventListener('click', calculateANOVA);
    }

    // Add input event listener for real-time calculation
    const anovaGroupsInput = document.getElementById('anova-groups');
    if (anovaGroupsInput) {
        let debounceTimer;
        const debounceDelay = 500; // 500ms delay

        const debouncedCalculation = () => {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(calculateANOVA, debounceDelay);
        };

        anovaGroupsInput.addEventListener('input', debouncedCalculation);
    }
});

// ... existing code ...

function calculateHypothesisTest() {
    const sampleMean = parseFloat(document.getElementById('ht-sample-mean').value);
    const populationMean = parseFloat(document.getElementById('ht-pop-mean').value);
    const stdDev = parseFloat(document.getElementById('ht-std-dev').value);
    const sampleSize = parseInt(document.getElementById('ht-sample-size').value);
    const significanceLevel = parseFloat(document.getElementById('ht-significance').value);
    const resultElement = document.getElementById('ht-result');
    
    try {
        // Validate inputs
        if (isNaN(sampleMean) || isNaN(populationMean) || isNaN(stdDev) || isNaN(sampleSize) || isNaN(significanceLevel)) {
            throw new Error('Please enter valid numbers for all fields');
        }
        
        if (stdDev <= 0) {
            throw new Error('Standard deviation must be greater than 0');
        }
        
        if (sampleSize < 2) {
            throw new Error('Sample size must be at least 2');
        }
        
        // Calculate standard error
        const standardError = stdDev / Math.sqrt(sampleSize);
        
        // Calculate test statistic (z-score)
        const zScore = (sampleMean - populationMean) / standardError;
        
        // Calculate p-value (two-tailed test)
        const pValue = 2 * (1 - normalCDF(Math.abs(zScore)));
        
        // Convert significance level to decimal
        const alpha = significanceLevel / 100;
        
        // Make decision
        const rejectNull = pValue < alpha;
        
        // Format the result
        let resultText = `<strong>Results:</strong><br><br>`;
        resultText += `<strong>Test Statistic (z-score):</strong> ${zScore.toFixed(4)}<br>`;
        resultText += `<strong>P-value:</strong> ${pValue.toFixed(4)}<br>`;
        resultText += `<strong>Significance Level (α):</strong> ${alpha.toFixed(4)}<br><br>`;
        
        resultText += `<strong>Decision:</strong><br>`;
        if (rejectNull) {
            resultText += `Reject the null hypothesis (p-value < α)<br>`;
        } else {
            resultText += `Fail to reject the null hypothesis (p-value ≥ α)<br>`;
        }
        
        resultText += `<br><strong>Calculation Steps:</strong><br>`;
        resultText += `1. Calculate Standard Error:<br>`;
        resultText += `   Standard Error = σ/√n = ${stdDev.toFixed(4)}/√${sampleSize} = ${standardError.toFixed(4)}<br><br>`;
        
        resultText += `2. Calculate Z-Score:<br>`;
        resultText += `   Z-Score = (Sample Mean - Population Mean) / Standard Error<br>`;
        resultText += `   Z-Score = (${sampleMean.toFixed(4)} - ${populationMean.toFixed(4)}) / ${standardError.toFixed(4)} = ${zScore.toFixed(4)}<br><br>`;
        
        resultText += `3. Calculate P-value (two-tailed test):<br>`;
        resultText += `   P-value = 2 × (1 - P(Z > |${zScore.toFixed(4)}|)) = ${pValue.toFixed(4)}<br><br>`;
        
        resultText += `4. Compare P-value with α:<br>`;
        resultText += `   P-value (${pValue.toFixed(4)}) ${pValue < alpha ? '<' : '≥'} α (${alpha.toFixed(4)})<br>`;
        
        // Display the result
        resultElement.innerHTML = resultText;
        resultElement.style.display = 'block';
        
        // Log the calculation
        console.log('Hypothesis test calculation:', {
            sampleMean,
            populationMean,
            stdDev,
            sampleSize,
            significanceLevel,
            standardError,
            zScore,
            pValue,
            alpha,
            rejectNull
        });
    } catch (error) {
        console.error('Hypothesis test calculation error:', error);
        resultElement.innerHTML = `<div class="error">Error: ${error.message}</div>`;
        resultElement.style.display = 'block';
    }
}

// Helper function for normal distribution CDF
function normalCDF(x) {
    const a1 = 0.254829592;
    const a2 = -0.284496736;
    const a3 = 1.421413741;
    const a4 = -1.453152027;
    const a5 = 1.061405429;
    const p = 0.3275911;

    const sign = x < 0 ? -1 : 1;
    x = Math.abs(x) / Math.sqrt(2.0);

    const t = 1.0 / (1.0 + p * x);
    const erf = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);

    return 0.5 * (1.0 + sign * erf);
}

function calculateChiSquare() {
    const observedInput = document.getElementById('chi-observed').value.trim();
    const expectedInput = document.getElementById('chi-expected').value.trim();
    const resultElement = document.getElementById('chi-result');
    
    try {
        // Parse and validate inputs
        if (!observedInput || !expectedInput) {
            throw new Error('Please enter both observed and expected values');
        }

        const observed = observedInput.split(',')
            .map(n => n.trim())
            .filter(n => n !== '')
            .map(n => parseFloat(n));
            
        const expected = expectedInput.split(',')
            .map(n => n.trim())
            .filter(n => n !== '')
            .map(n => parseFloat(n));
        
        if (observed.length !== expected.length) {
            throw new Error('Observed and expected values must have the same number of categories');
        }
        
        if (observed.length < 2) {
            throw new Error('Please enter at least two categories');
        }
        
        if (observed.some(isNaN) || expected.some(isNaN)) {
            throw new Error('Please enter valid numbers');
        }
        
        if (expected.some(e => e <= 0)) {
            throw new Error('Expected values must be greater than 0');
        }

        // Calculate chi-square statistic and contributions
        let chiSquare = 0;
        const contributions = [];
        
        for (let i = 0; i < observed.length; i++) {
            const contribution = Math.pow(observed[i] - expected[i], 2) / expected[i];
            contributions.push({
                observed: observed[i],
                expected: expected[i],
                difference: observed[i] - expected[i],
                contribution: contribution
            });
            chiSquare += contribution;
        }
        
        // Calculate degrees of freedom
        const degreesOfFreedom = observed.length - 1;
        
        // Format the result
        let resultText = `<strong>Results:</strong><br><br>`;
        resultText += `<strong>Chi-Square Statistic:</strong> ${chiSquare.toFixed(4)}<br>`;
        resultText += `<strong>Degrees of Freedom:</strong> ${degreesOfFreedom}<br><br>`;
        
        resultText += `<strong>Category Contributions:</strong><br>`;
        contributions.forEach((cont, index) => {
            resultText += `Category ${index + 1}:<br>`;
            resultText += `- Observed: ${cont.observed}<br>`;
            resultText += `- Expected: ${cont.expected}<br>`;
            resultText += `- Difference: ${cont.difference.toFixed(4)}<br>`;
            resultText += `- Contribution: ${cont.contribution.toFixed(4)}<br><br>`;
        });
        
        resultText += `<strong>Calculation Steps:</strong><br>`;
        resultText += `1. For each category, calculate (Observed - Expected)² / Expected<br>`;
        contributions.forEach((cont, index) => {
            resultText += `   Category ${index + 1}: (${cont.observed} - ${cont.expected})² / ${cont.expected} = ${cont.contribution.toFixed(4)}<br>`;
        });
        resultText += `<br>2. Sum all contributions to get Chi-Square statistic: ${chiSquare.toFixed(4)}<br>`;
        resultText += `3. Degrees of Freedom = Number of categories - 1 = ${degreesOfFreedom}`;
        
        // Display the result
        resultElement.innerHTML = resultText;
        resultElement.style.display = 'block';
        
        // Log the calculation
        console.log('Chi-square calculation:', {
            observed,
            expected,
            contributions,
            chiSquare,
            degreesOfFreedom
        });
    } catch (error) {
        console.error('Chi-square calculation error:', error);
        resultElement.innerHTML = `<div class="error">Error: ${error.message}</div>`;
        resultElement.style.display = 'block';
    }
}

// ... existing code ...

function calculateTTest() {
    const sampleMean = parseFloat(document.getElementById('t-sample-mean').value);
    const populationMean = parseFloat(document.getElementById('t-pop-mean').value);
    const stdDev = parseFloat(document.getElementById('t-std-dev').value);
    const sampleSize = parseInt(document.getElementById('t-sample-size').value);
    const significanceLevel = parseFloat(document.getElementById('t-significance').value);
    const resultElement = document.getElementById('t-result');
    
    try {
        // Validate inputs
        if (isNaN(sampleMean) || isNaN(populationMean) || isNaN(stdDev) || isNaN(sampleSize) || isNaN(significanceLevel)) {
            throw new Error('Please enter valid numbers for all fields');
        }
        
        if (stdDev <= 0) {
            throw new Error('Standard deviation must be greater than 0');
        }
        
        if (sampleSize < 2) {
            throw new Error('Sample size must be at least 2');
        }
        
        // Calculate standard error
        const standardError = stdDev / Math.sqrt(sampleSize);
        
        // Calculate t-statistic
        const tStatistic = (sampleMean - populationMean) / standardError;
        
        // Calculate degrees of freedom
        const degreesOfFreedom = sampleSize - 1;
        
        // Calculate p-value (two-tailed test)
        const pValue = 2 * (1 - tDistributionCDF(Math.abs(tStatistic), degreesOfFreedom));
        
        // Convert significance level to decimal
        const alpha = significanceLevel / 100;
        
        // Make decision
        const rejectNull = pValue < alpha;
        
        // Format the result
        let resultText = `<strong>Results:</strong><br><br>`;
        resultText += `<strong>T-Statistic:</strong> ${tStatistic.toFixed(4)}<br>`;
        resultText += `<strong>Degrees of Freedom:</strong> ${degreesOfFreedom}<br>`;
        resultText += `<strong>P-value:</strong> ${pValue.toFixed(4)}<br>`;
        resultText += `<strong>Significance Level (α):</strong> ${alpha.toFixed(4)}<br><br>`;
        
        resultText += `<strong>Decision:</strong><br>`;
        if (rejectNull) {
            resultText += `Reject the null hypothesis (p-value < α)<br>`;
        } else {
            resultText += `Fail to reject the null hypothesis (p-value ≥ α)<br>`;
        }
        
        resultText += `<br><strong>Calculation Steps:</strong><br>`;
        resultText += `1. Calculate Standard Error:<br>`;
        resultText += `   Standard Error = s/√n = ${stdDev.toFixed(4)}/√${sampleSize} = ${standardError.toFixed(4)}<br><br>`;
        
        resultText += `2. Calculate T-Statistic:<br>`;
        resultText += `   T-Statistic = (Sample Mean - Population Mean) / Standard Error<br>`;
        resultText += `   T-Statistic = (${sampleMean.toFixed(4)} - ${populationMean.toFixed(4)}) / ${standardError.toFixed(4)} = ${tStatistic.toFixed(4)}<br><br>`;
        
        resultText += `3. Calculate Degrees of Freedom:<br>`;
        resultText += `   df = n - 1 = ${sampleSize} - 1 = ${degreesOfFreedom}<br><br>`;
        
        resultText += `4. Calculate P-value (two-tailed test):<br>`;
        resultText += `   P-value = 2 × (1 - P(T > |${tStatistic.toFixed(4)}|)) = ${pValue.toFixed(4)}<br><br>`;
        
        resultText += `5. Compare P-value with α:<br>`;
        resultText += `   P-value (${pValue.toFixed(4)}) ${pValue < alpha ? '<' : '≥'} α (${alpha.toFixed(4)})<br>`;
        
        // Display the result
        resultElement.innerHTML = resultText;
        resultElement.style.display = 'block';
        
        // Log the calculation
        console.log('T-Test calculation:', {
            sampleMean,
            populationMean,
            stdDev,
            sampleSize,
            significanceLevel,
            standardError,
            tStatistic,
            degreesOfFreedom,
            pValue,
            alpha,
            rejectNull
        });
    } catch (error) {
        console.error('T-Test calculation error:', error);
        resultElement.innerHTML = `<div class="error">Error: ${error.message}</div>`;
        resultElement.style.display = 'block';
    }
}

// Add event listeners for T-Test Calculator
document.addEventListener('DOMContentLoaded', function() {
    // ... existing code ...

    // T-Test Calculator
    const calculateTTestBtn = document.getElementById('calculate-t-test');
    if (calculateTTestBtn) {
        calculateTTestBtn.addEventListener('click', calculateTTest);
    }

    // Add input event listeners for real-time calculation
    const tSampleMeanInput = document.getElementById('t-sample-mean');
    const tPopMeanInput = document.getElementById('t-pop-mean');
    const tStdDevInput = document.getElementById('t-std-dev');
    const tSampleSizeInput = document.getElementById('t-sample-size');
    const tSignificanceInput = document.getElementById('t-significance');
    
    if (tSampleMeanInput && tPopMeanInput && tStdDevInput && tSampleSizeInput && tSignificanceInput) {
        let debounceTimer;
        const debounceDelay = 500; // 500ms delay

        const debouncedCalculation = () => {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(calculateTTest, debounceDelay);
        };

        tSampleMeanInput.addEventListener('input', debouncedCalculation);
        tPopMeanInput.addEventListener('input', debouncedCalculation);
        tStdDevInput.addEventListener('input', debouncedCalculation);
        tSampleSizeInput.addEventListener('input', debouncedCalculation);
        tSignificanceInput.addEventListener('change', debouncedCalculation);
    }

    // ... existing code ...
});

// ... existing code ...

function tDistributionCDF(t, df) {
    // Implementation of Student's t-distribution CDF
    // Using numerical integration of the t-distribution PDF
    
    if (df <= 0) {
        throw new Error('Degrees of freedom must be positive');
    }
    
    // For large degrees of freedom, approximate with normal distribution
    if (df > 30) {
        return normalCDF(t);
    }
    
    // For small degrees of freedom, use numerical integration
    const x = df / (df + t * t);
    const beta = betaFunction(0.5 * df, 0.5);
    const incompleteBeta = incompleteBetaFunction(x, 0.5 * df, 0.5);
    
    if (t < 0) {
        return 0.5 * (1 - incompleteBeta / beta);
    } else {
        return 0.5 * (1 + incompleteBeta / beta);
    }
}

function betaFunction(a, b) {
    // Implementation of the Beta function
    return Math.exp(logGamma(a) + logGamma(b) - logGamma(a + b));
}

function incompleteBetaFunction(x, a, b) {
    // Implementation of the incomplete Beta function
    // Using continued fraction approximation
    const maxIterations = 100;
    const epsilon = 1e-10;
    
    if (x === 0) return 0;
    if (x === 1) return betaFunction(a, b);
    
    let result = 0;
    let c = 1;
    let d = 1 - (a + b) * x / (a + 1);
    
    if (Math.abs(d) < epsilon) d = epsilon;
    d = 1 / d;
    result = d;
    
    for (let i = 1; i <= maxIterations; i++) {
        const m = i / 2;
        let numerator;
        
        if (i % 2 === 0) {
            numerator = m * (b - m) * x / ((a + 2 * m - 1) * (a + 2 * m));
        } else {
            numerator = -((a + m) * (a + b + m) * x) / ((a + 2 * m) * (a + 2 * m + 1));
        }
        
        d = 1 + numerator * d;
        if (Math.abs(d) < epsilon) d = epsilon;
        d = 1 / d;
        
        c = 1 + numerator / c;
        if (Math.abs(c) < epsilon) c = epsilon;
        
        const delta = d * c;
        result *= delta;
        
        if (Math.abs(delta - 1) < epsilon) break;
    }
    
    return result * Math.pow(x, a) * Math.pow(1 - x, b) / a;
}

function logGamma(x) {
    // Implementation of the natural logarithm of the Gamma function
    // Using Lanczos approximation
    const cof = [
        76.18009172947146, -86.50532032941677, 24.01409824083091,
        -1.231739572450155, 0.1208650973866179e-2, -0.5395239384953e-5
    ];
    
    let ser = 1.000000000190015;
    let tmp = x + 5.5;
    tmp -= (x + 0.5) * Math.log(tmp);
    
    for (let j = 0; j < 6; j++) {
        ser += cof[j] / (x + j + 1);
    }
    
    return -tmp + Math.log(2.5066282746310005 * ser / x);
}

// ... existing code ...

function calculateZTest() {
    const sampleMean = parseFloat(document.getElementById('z-sample-mean').value);
    const populationMean = parseFloat(document.getElementById('z-pop-mean').value);
    const popStdDev = parseFloat(document.getElementById('z-pop-std-dev').value);
    const sampleSize = parseInt(document.getElementById('z-sample-size').value);
    const significanceLevel = parseFloat(document.getElementById('z-significance').value);
    const resultElement = document.getElementById('z-result');
    
    try {
        // Validate inputs
        if (isNaN(sampleMean) || isNaN(populationMean) || isNaN(popStdDev) || isNaN(sampleSize) || isNaN(significanceLevel)) {
            throw new Error('Please enter valid numbers for all fields');
        }
        
        if (popStdDev <= 0) {
            throw new Error('Population standard deviation must be greater than 0');
        }
        
        if (sampleSize < 2) {
            throw new Error('Sample size must be at least 2');
        }
        
        // Calculate standard error
        const standardError = popStdDev / Math.sqrt(sampleSize);
        
        // Calculate z-statistic
        const zStatistic = (sampleMean - populationMean) / standardError;
        
        // Calculate p-value (two-tailed test)
        const pValue = 2 * (1 - normalCDF(Math.abs(zStatistic)));
        
        // Convert significance level to decimal
        const alpha = significanceLevel / 100;
        
        // Make decision
        const rejectNull = pValue < alpha;
        
        // Format the result
        let resultText = `<strong>Results:</strong><br><br>`;
        resultText += `<strong>Z-Statistic:</strong> ${zStatistic.toFixed(4)}<br>`;
        resultText += `<strong>P-value:</strong> ${pValue.toFixed(4)}<br>`;
        resultText += `<strong>Significance Level (α):</strong> ${alpha.toFixed(4)}<br><br>`;
        
        resultText += `<strong>Decision:</strong><br>`;
        if (rejectNull) {
            resultText += `Reject the null hypothesis (p-value < α)<br>`;
        } else {
            resultText += `Fail to reject the null hypothesis (p-value ≥ α)<br>`;
        }
        
        resultText += `<br><strong>Calculation Steps:</strong><br>`;
        resultText += `1. Calculate Standard Error:<br>`;
        resultText += `   Standard Error = σ/√n = ${popStdDev.toFixed(4)}/√${sampleSize} = ${standardError.toFixed(4)}<br><br>`;
        
        resultText += `2. Calculate Z-Statistic:<br>`;
        resultText += `   Z-Statistic = (Sample Mean - Population Mean) / Standard Error<br>`;
        resultText += `   Z-Statistic = (${sampleMean.toFixed(4)} - ${populationMean.toFixed(4)}) / ${standardError.toFixed(4)} = ${zStatistic.toFixed(4)}<br><br>`;
        
        resultText += `3. Calculate P-value (two-tailed test):<br>`;
        resultText += `   P-value = 2 × (1 - P(Z > |${zStatistic.toFixed(4)}|)) = ${pValue.toFixed(4)}<br><br>`;
        
        resultText += `4. Compare P-value with α:<br>`;
        resultText += `   P-value (${pValue.toFixed(4)}) ${pValue < alpha ? '<' : '≥'} α (${alpha.toFixed(4)})<br>`;
        
        // Display the result
        resultElement.innerHTML = resultText;
        resultElement.style.display = 'block';
        
        // Log the calculation
        console.log('Z-Test calculation:', {
            sampleMean,
            populationMean,
            popStdDev,
            sampleSize,
            significanceLevel,
            standardError,
            zStatistic,
            pValue,
            alpha,
            rejectNull
        });
    } catch (error) {
        console.error('Z-Test calculation error:', error);
        resultElement.innerHTML = `<div class="error">Error: ${error.message}</div>`;
        resultElement.style.display = 'block';
    }
}

// Add event listeners for Z-Test Calculator
document.addEventListener('DOMContentLoaded', function() {
    // ... existing code ...

    // Z-Test Calculator
    const calculateZTestBtn = document.getElementById('calculate-z-test');
    if (calculateZTestBtn) {
        calculateZTestBtn.addEventListener('click', calculateZTest);
    }

    // Add input event listeners for real-time calculation
    const zSampleMeanInput = document.getElementById('z-sample-mean');
    const zPopMeanInput = document.getElementById('z-pop-mean');
    const zPopStdDevInput = document.getElementById('z-pop-std-dev');
    const zSampleSizeInput = document.getElementById('z-sample-size');
    const zSignificanceInput = document.getElementById('z-significance');
    
    if (zSampleMeanInput && zPopMeanInput && zPopStdDevInput && zSampleSizeInput && zSignificanceInput) {
        let debounceTimer;
        const debounceDelay = 500; // 500ms delay

        const debouncedCalculation = () => {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(calculateZTest, debounceDelay);
        };

        zSampleMeanInput.addEventListener('input', debouncedCalculation);
        zPopMeanInput.addEventListener('input', debouncedCalculation);
        zPopStdDevInput.addEventListener('input', debouncedCalculation);
        zSampleSizeInput.addEventListener('input', debouncedCalculation);
        zSignificanceInput.addEventListener('change', debouncedCalculation);
    }

    // ... existing code ...
});

// ... existing code ...

function calculateANOVA() {
    const groupsInput = document.getElementById('anova-groups').value.trim();
    const resultElement = document.getElementById('anova-result');
    
    try {
        // Parse and validate input
        if (!groupsInput) {
            throw new Error('Please enter group data');
        }

        // Parse groups from input
        const groups = groupsInput.split('\n')
            .map(line => line.trim())
            .filter(line => line !== '')
            .map(line => line.split(',')
                .map(n => n.trim())
                .filter(n => n !== '')
                .map(n => parseFloat(n))
            );

        if (groups.length < 2) {
            throw new Error('Please enter at least two groups');
        }

        // Validate each group
        groups.forEach((group, index) => {
            if (group.length === 0) {
                throw new Error(`Group ${index + 1} is empty`);
            }
            if (group.some(isNaN)) {
                throw new Error(`Group ${index + 1} contains invalid numbers`);
            }
        });

        // Calculate group statistics
        const groupStats = groups.map(group => {
            const mean = calculateMean(group);
            const sumSquares = group.reduce((sum, x) => sum + Math.pow(x - mean, 2), 0);
            return {
                mean,
                sumSquares,
                size: group.length
            };
        });

        // Calculate grand mean
        const grandMean = calculateMean(groups.flat());

        // Calculate sums of squares
        let ssBetween = 0;  // Sum of squares between groups
        let ssWithin = 0;   // Sum of squares within groups
        let totalSize = 0;  // Total number of observations

        groupStats.forEach(stat => {
            ssBetween += stat.size * Math.pow(stat.mean - grandMean, 2);
            ssWithin += stat.sumSquares;
            totalSize += stat.size;
        });

        // Calculate degrees of freedom
        const dfBetween = groups.length - 1;
        const dfWithin = totalSize - groups.length;
        const dfTotal = totalSize - 1;

        // Calculate mean squares
        const msBetween = ssBetween / dfBetween;
        const msWithin = ssWithin / dfWithin;

        // Calculate F-statistic
        const fStatistic = msBetween / msWithin;

        // Calculate p-value using F-distribution
        const pValue = 1 - fDistributionCDF(fStatistic, dfBetween, dfWithin);

        // Format the result
        let resultText = `<strong>Results:</strong><br><br>`;
        
        // Group Statistics
        resultText += `<strong>Group Statistics:</strong><br>`;
        groups.forEach((group, index) => {
            resultText += `Group ${index + 1}:<br>`;
            resultText += `- Mean: ${groupStats[index].mean.toFixed(4)}<br>`;
            resultText += `- Size: ${group.length}<br>`;
            resultText += `- Values: ${group.join(', ')}<br><br>`;
        });

        // ANOVA Table
        resultText += `<strong>ANOVA Table:</strong><br>`;
        resultText += `<table class="anova-table">`;
        resultText += `<tr><th>Source</th><th>SS</th><th>df</th><th>MS</th><th>F</th><th>p-value</th></tr>`;
        resultText += `<tr><td>Between Groups</td><td>${ssBetween.toFixed(4)}</td><td>${dfBetween}</td><td>${msBetween.toFixed(4)}</td><td>${fStatistic.toFixed(4)}</td><td>${pValue.toFixed(4)}</td></tr>`;
        resultText += `<tr><td>Within Groups</td><td>${ssWithin.toFixed(4)}</td><td>${dfWithin}</td><td>${msWithin.toFixed(4)}</td><td>-</td><td>-</td></tr>`;
        resultText += `<tr><td>Total</td><td>${(ssBetween + ssWithin).toFixed(4)}</td><td>${dfTotal}</td><td>-</td><td>-</td><td>-</td></tr>`;
        resultText += `</table><br>`;

        // Decision
        resultText += `<strong>Decision:</strong><br>`;
        if (pValue < 0.05) {
            resultText += `Reject the null hypothesis (p-value < 0.05)<br>`;
            resultText += `There is a significant difference between the group means.`;
        } else {
            resultText += `Fail to reject the null hypothesis (p-value ≥ 0.05)<br>`;
            resultText += `There is no significant difference between the group means.`;
        }

        // Display the result
        resultElement.innerHTML = resultText;
        resultElement.style.display = 'block';

        // Log the calculation
        console.log('ANOVA calculation:', {
            groups,
            groupStats,
            grandMean,
            ssBetween,
            ssWithin,
            dfBetween,
            dfWithin,
            msBetween,
            msWithin,
            fStatistic,
            pValue
        });
    } catch (error) {
        console.error('ANOVA calculation error:', error);
        resultElement.innerHTML = `<div class="error">Error: ${error.message}</div>`;
        resultElement.style.display = 'block';
    }
}

function fDistributionCDF(x, df1, df2) {
    // Implementation of F-distribution CDF
    // Using the relationship with Beta distribution
    
    if (x <= 0) return 0;
    if (x === Infinity) return 1;
    
    const y = df1 * x / (df1 * x + df2);
    return incompleteBetaFunction(y, df1/2, df2/2) / betaFunction(df1/2, df2/2);
}

// Add event listeners for ANOVA Calculator
document.addEventListener('DOMContentLoaded', function() {
    // ... existing code ...

    // ANOVA Calculator
    const calculateANOVABtn = document.getElementById('calculate-anova');
    if (calculateANOVABtn) {
        calculateANOVABtn.addEventListener('click', calculateANOVA);
    }

    // Add input event listener for real-time calculation
    const anovaGroupsInput = document.getElementById('anova-groups');
    if (anovaGroupsInput) {
        let debounceTimer;
        const debounceDelay = 500; // 500ms delay

        const debouncedCalculation = () => {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(calculateANOVA, debounceDelay);
        };

        anovaGroupsInput.addEventListener('input', debouncedCalculation);
    }

    // ... existing code ...
});

// ... existing code ...

function calculateFTest() {
    const var1 = parseFloat(document.getElementById('f-var1').value);
    const var2 = parseFloat(document.getElementById('f-var2').value);
    const size1 = parseInt(document.getElementById('f-size1').value);
    const size2 = parseInt(document.getElementById('f-size2').value);
    const significanceLevel = parseFloat(document.getElementById('f-significance').value);
    const resultElement = document.getElementById('f-result');
    
    try {
        // Validate inputs
        if (isNaN(var1) || isNaN(var2) || isNaN(size1) || isNaN(size2) || isNaN(significanceLevel)) {
            throw new Error('Please enter valid numbers for all fields');
        }
        
        if (var1 <= 0 || var2 <= 0) {
            throw new Error('Variances must be greater than 0');
        }
        
        if (size1 < 2 || size2 < 2) {
            throw new Error('Sample sizes must be at least 2');
        }
        
        // Calculate F-statistic (larger variance / smaller variance)
        const fStatistic = var1 > var2 ? var1 / var2 : var2 / var1;
        
        // Calculate degrees of freedom
        const df1 = size1 - 1;
        const df2 = size2 - 1;
        
        // Calculate p-value using F-distribution
        const pValue = 2 * (1 - fDistributionCDF(fStatistic, df1, df2));
        
        // Convert significance level to decimal
        const alpha = significanceLevel / 100;
        
        // Make decision
        const rejectNull = pValue < alpha;
        
        // Format the result
        let resultText = `<strong>Results:</strong><br><br>`;
        
        // Sample Statistics
        resultText += `<strong>Sample Statistics:</strong><br>`;
        resultText += `Sample 1:<br>`;
        resultText += `- Variance: ${var1.toFixed(4)}<br>`;
        resultText += `- Size: ${size1}<br>`;
        resultText += `- Degrees of Freedom: ${df1}<br><br>`;
        
        resultText += `Sample 2:<br>`;
        resultText += `- Variance: ${var2.toFixed(4)}<br>`;
        resultText += `- Size: ${size2}<br>`;
        resultText += `- Degrees of Freedom: ${df2}<br><br>`;
        
        // F-Test Results
        resultText += `<strong>F-Test Results:</strong><br>`;
        resultText += `F-Statistic: ${fStatistic.toFixed(4)}<br>`;
        resultText += `P-value: ${pValue.toFixed(4)}<br>`;
        resultText += `Significance Level (α): ${alpha.toFixed(4)}<br><br>`;
        
        // Decision
        resultText += `<strong>Decision:</strong><br>`;
        if (rejectNull) {
            resultText += `Reject the null hypothesis (p-value < α)<br>`;
            resultText += `The variances are significantly different.`;
        } else {
            resultText += `Fail to reject the null hypothesis (p-value ≥ α)<br>`;
            resultText += `The variances are not significantly different.`;
        }
        
        // Calculation Steps
        resultText += `<br><strong>Calculation Steps:</strong><br>`;
        resultText += `1. Calculate F-Statistic:<br>`;
        resultText += `   F = Larger Variance / Smaller Variance<br>`;
        resultText += `   F = ${Math.max(var1, var2).toFixed(4)} / ${Math.min(var1, var2).toFixed(4)} = ${fStatistic.toFixed(4)}<br><br>`;
        
        resultText += `2. Calculate Degrees of Freedom:<br>`;
        resultText += `   df1 = n1 - 1 = ${size1} - 1 = ${df1}<br>`;
        resultText += `   df2 = n2 - 1 = ${size2} - 1 = ${df2}<br><br>`;
        
        resultText += `3. Calculate P-value (two-tailed test):<br>`;
        resultText += `   P-value = 2 × (1 - P(F > ${fStatistic.toFixed(4)})) = ${pValue.toFixed(4)}<br><br>`;
        
        resultText += `4. Compare P-value with α:<br>`;
        resultText += `   P-value (${pValue.toFixed(4)}) ${pValue < alpha ? '<' : '≥'} α (${alpha.toFixed(4)})<br>`;
        
        // Display the result
        resultElement.innerHTML = resultText;
        resultElement.style.display = 'block';
        
        // Log the calculation
        console.log('F-Test calculation:', {
            var1,
            var2,
            size1,
            size2,
            significanceLevel,
            fStatistic,
            df1,
            df2,
            pValue,
            alpha,
            rejectNull
        });
    } catch (error) {
        console.error('F-Test calculation error:', error);
        resultElement.innerHTML = `<div class="error">Error: ${error.message}</div>`;
        resultElement.style.display = 'block';
    }
}

// Add event listeners for F-Test Calculator
document.addEventListener('DOMContentLoaded', function() {
    // ... existing code ...

    // F-Test Calculator
    const calculateFTestBtn = document.getElementById('calculate-f-test');
    if (calculateFTestBtn) {
        calculateFTestBtn.addEventListener('click', calculateFTest);
    }

    // Add input event listeners for real-time calculation
    const fVar1Input = document.getElementById('f-var1');
    const fVar2Input = document.getElementById('f-var2');
    const fSize1Input = document.getElementById('f-size1');
    const fSize2Input = document.getElementById('f-size2');
    const fSignificanceInput = document.getElementById('f-significance');
    
    if (fVar1Input && fVar2Input && fSize1Input && fSize2Input && fSignificanceInput) {
        let debounceTimer;
        const debounceDelay = 500; // 500ms delay

        const debouncedCalculation = () => {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(calculateFTest, debounceDelay);
        };

        fVar1Input.addEventListener('input', debouncedCalculation);
        fVar2Input.addEventListener('input', debouncedCalculation);
        fSize1Input.addEventListener('input', debouncedCalculation);
        fSize2Input.addEventListener('input', debouncedCalculation);
        fSignificanceInput.addEventListener('change', debouncedCalculation);
    }

    // ... existing code ...
});

// ... existing code ...

function calculatePValue() {
    const distribution = document.getElementById('p-distribution').value;
    const testType = document.getElementById('p-test-type').value;
    const statistic = parseFloat(document.getElementById('p-statistic').value);
    const df1 = parseFloat(document.getElementById('p-df1').value);
    const df2 = parseFloat(document.getElementById('p-df2').value);
    const resultElement = document.getElementById('p-value-result');
    
    try {
        // Validate inputs
        if (isNaN(statistic)) {
            throw new Error('Please enter a valid test statistic');
        }
        
        if (isNaN(df1) || df1 <= 0) {
            throw new Error('Please enter a valid degrees of freedom 1');
        }
        
        if (distribution === 'f' && (isNaN(df2) || df2 <= 0)) {
            throw new Error('Please enter a valid degrees of freedom 2 for F-distribution');
        }
        
        let pValue;
        let interpretation;
        
        // Calculate p-value based on distribution and test type
        switch (distribution) {
            case 'normal':
                pValue = calculateNormalPValue(statistic, testType);
                break;
            case 't':
                pValue = calculateTPValue(statistic, df1, testType);
                break;
            case 'chi-square':
                pValue = calculateChiSquarePValue(statistic, df1, testType);
                break;
            case 'f':
                pValue = calculateFPValue(statistic, df1, df2, testType);
                break;
        }
        
        // Format the result
        let resultText = `<strong>Results:</strong><br><br>`;
        
        // Test Information
        resultText += `<strong>Test Information:</strong><br>`;
        resultText += `Distribution: ${getDistributionName(distribution)}<br>`;
        resultText += `Test Type: ${getTestTypeName(testType)}<br>`;
        resultText += `Test Statistic: ${statistic.toFixed(4)}<br>`;
        resultText += `Degrees of Freedom 1: ${df1}<br>`;
        if (distribution === 'f') {
            resultText += `Degrees of Freedom 2: ${df2}<br>`;
        }
        resultText += `<br>`;
        
        // P-Value Results
        resultText += `<strong>P-Value Results:</strong><br>`;
        resultText += `P-Value: ${pValue.toFixed(4)}<br><br>`;
        
        // Interpretation
        resultText += `<strong>Interpretation:</strong><br>`;
        if (pValue < 0.001) {
            interpretation = 'Very strong evidence against the null hypothesis';
        } else if (pValue < 0.01) {
            interpretation = 'Strong evidence against the null hypothesis';
        } else if (pValue < 0.05) {
            interpretation = 'Moderate evidence against the null hypothesis';
        } else if (pValue < 0.1) {
            interpretation = 'Weak evidence against the null hypothesis';
        } else {
            interpretation = 'Little to no evidence against the null hypothesis';
        }
        resultText += interpretation;
        
        // Display the result
        resultElement.innerHTML = resultText;
        resultElement.style.display = 'block';
        
        // Log the calculation
        console.log('P-Value calculation:', {
            distribution,
            testType,
            statistic,
            df1,
            df2,
            pValue,
            interpretation
        });
    } catch (error) {
        console.error('P-Value calculation error:', error);
        resultElement.innerHTML = `<div class="error">Error: ${error.message}</div>`;
        resultElement.style.display = 'block';
    }
}

function calculateNormalPValue(statistic, testType) {
    const p = 1 - normalCDF(Math.abs(statistic));
    switch (testType) {
        case 'two-tailed':
            return 2 * p;
        case 'left-tailed':
            return normalCDF(statistic);
        case 'right-tailed':
            return 1 - normalCDF(statistic);
    }
}

function calculateTPValue(statistic, df, testType) {
    const p = 1 - tDistributionCDF(Math.abs(statistic), df);
    switch (testType) {
        case 'two-tailed':
            return 2 * p;
        case 'left-tailed':
            return tDistributionCDF(statistic, df);
        case 'right-tailed':
            return 1 - tDistributionCDF(statistic, df);
    }
}

function calculateChiSquarePValue(statistic, df, testType) {
    const p = 1 - chiSquareCDF(statistic, df);
    switch (testType) {
        case 'two-tailed':
            return 2 * Math.min(p, 1 - p);
        case 'left-tailed':
            return 1 - p;
        case 'right-tailed':
            return p;
    }
}

function calculateFPValue(statistic, df1, df2, testType) {
    const p = 1 - fDistributionCDF(statistic, df1, df2);
    switch (testType) {
        case 'two-tailed':
            return 2 * Math.min(p, 1 - p);
        case 'left-tailed':
            return 1 - p;
        case 'right-tailed':
            return p;
    }
}

function getDistributionName(distribution) {
    const names = {
        'normal': 'Normal Distribution',
        't': 't-Distribution',
        'chi-square': 'Chi-Square Distribution',
        'f': 'F-Distribution'
    };
    return names[distribution] || distribution;
}

function getTestTypeName(testType) {
    const names = {
        'two-tailed': 'Two-Tailed Test',
        'left-tailed': 'Left-Tailed Test',
        'right-tailed': 'Right-Tailed Test'
    };
    return names[testType] || testType;
}

// Add event listeners for P-Value Calculator
document.addEventListener('DOMContentLoaded', function() {
    // ... existing code ...

    // P-Value Calculator
    const calculatePValueBtn = document.getElementById('calculate-p-value');
    if (calculatePValueBtn) {
        calculatePValueBtn.addEventListener('click', calculatePValue);
    }

    // Add input event listeners for real-time calculation
    const pStatisticInput = document.getElementById('p-statistic');
    const pDf1Input = document.getElementById('p-df1');
    const pDf2Input = document.getElementById('p-df2');
    const pDistributionSelect = document.getElementById('p-distribution');
    const pTestTypeSelect = document.getElementById('p-test-type');
    
    if (pStatisticInput && pDf1Input && pDf2Input && pDistributionSelect && pTestTypeSelect) {
        let debounceTimer;
        const debounceDelay = 500; // 500ms delay

        const debouncedCalculation = () => {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(calculatePValue, debounceDelay);
        };

        pStatisticInput.addEventListener('input', debouncedCalculation);
        pDf1Input.addEventListener('input', debouncedCalculation);
        pDf2Input.addEventListener('input', debouncedCalculation);
        pDistributionSelect.addEventListener('change', debouncedCalculation);
        pTestTypeSelect.addEventListener('change', debouncedCalculation);
    }

    // ... existing code ...
});

// ... existing code ...

function chiSquareCDF(x, df) {
    if (x <= 0) return 0;
    if (x === Infinity) return 1;
    
    // Use the incomplete gamma function
    return incompleteGammaFunction(x/2, df/2) / gammaFunction(df/2);
}

function incompleteGammaFunction(x, a) {
    const MAX_ITERATIONS = 100;
    const EPSILON = 1e-10;
    
    if (x <= 0) return 0;
    if (x === Infinity) return gammaFunction(a);
    
    let sum = 0;
    let term = 1;
    let n = 0;
    
    while (n < MAX_ITERATIONS) {
        sum += term;
        term *= x / (a + n + 1);
        n++;
        
        if (Math.abs(term) < EPSILON) break;
    }
    
    return Math.exp(-x) * Math.pow(x, a) * sum / gammaFunction(a);
}

function gammaFunction(x) {
    // Lanczos approximation for gamma function
    const p = [
        0.99999999999980993,
        676.5203681218851,
        -1259.1392167224028,
        771.32342877765313,
        -176.61502916214059,
        12.507343278686905,
        -0.13857109526572012,
        9.9843695780195716e-6,
        1.5056327351493116e-7
    ];
    
    if (x < 0.5) {
        return Math.PI / (Math.sin(Math.PI * x) * gammaFunction(1 - x));
    }
    
    x -= 1;
    let a = p[0];
    const t = x + 7.5;
    
    for (let i = 1; i < p.length; i++) {
        a += p[i] / (x + i);
    }
    
    return Math.sqrt(2 * Math.PI) * Math.pow(t, x + 0.5) * Math.exp(-t) * a;
}

// ... existing code ...

function calculateCriticalValue() {
    const distribution = document.getElementById('cv-distribution').value;
    const significanceLevel = parseFloat(document.getElementById('cv-significance').value);
    const testType = document.getElementById('cv-test-type').value;
    const df1 = parseFloat(document.getElementById('cv-df1').value);
    const df2 = parseFloat(document.getElementById('cv-df2').value);
    const resultElement = document.getElementById('critical-value-result');
    
    try {
        // Validate inputs
        if (isNaN(significanceLevel) || significanceLevel <= 0 || significanceLevel >= 100) {
            throw new Error('Please enter a valid significance level between 0 and 100');
        }
        
        if (isNaN(df1) || df1 <= 0) {
            throw new Error('Please enter a valid degrees of freedom 1');
        }
        
        if (distribution === 'f' && (isNaN(df2) || df2 <= 0)) {
            throw new Error('Please enter a valid degrees of freedom 2 for F-distribution');
        }
        
        // Convert significance level to decimal
        const alpha = significanceLevel / 100;
        
        // Calculate critical value based on distribution and test type
        let criticalValue;
        let criticalValues = [];
        
        switch (distribution) {
            case 'normal':
                criticalValue = calculateNormalCriticalValue(alpha, testType);
                break;
            case 't':
                criticalValue = calculateTCriticalValue(alpha, df1, testType);
                break;
            case 'chi-square':
                criticalValue = calculateChiSquareCriticalValue(alpha, df1, testType);
                break;
            case 'f':
                criticalValue = calculateFCriticalValue(alpha, df1, df2, testType);
                break;
        }
        
        // Format the result
        let resultText = `<strong>Results:</strong><br><br>`;
        
        // Test Information
        resultText += `<strong>Test Information:</strong><br>`;
        resultText += `Distribution: ${getDistributionName(distribution)}<br>`;
        resultText += `Significance Level (α): ${alpha.toFixed(4)}<br>`;
        resultText += `Test Type: ${getTestTypeName(testType)}<br>`;
        resultText += `Degrees of Freedom 1: ${df1}<br>`;
        if (distribution === 'f') {
            resultText += `Degrees of Freedom 2: ${df2}<br>`;
        }
        resultText += `<br>`;
        
        // Critical Value Results
        resultText += `<strong>Critical Value(s):</strong><br>`;
        if (Array.isArray(criticalValue)) {
            resultText += `Lower Critical Value: ${criticalValue[0].toFixed(4)}<br>`;
            resultText += `Upper Critical Value: ${criticalValue[1].toFixed(4)}<br>`;
        } else {
            resultText += `Critical Value: ${criticalValue.toFixed(4)}<br>`;
        }
        
        // Decision Rule
        resultText += `<br><strong>Decision Rule:</strong><br>`;
        switch (testType) {
            case 'two-tailed':
                resultText += `Reject H₀ if |test statistic| > ${Math.abs(criticalValue).toFixed(4)}<br>`;
                break;
            case 'left-tailed':
                resultText += `Reject H₀ if test statistic < ${criticalValue.toFixed(4)}<br>`;
                break;
            case 'right-tailed':
                resultText += `Reject H₀ if test statistic > ${criticalValue.toFixed(4)}<br>`;
                break;
        }
        
        // Display the result
        resultElement.innerHTML = resultText;
        resultElement.style.display = 'block';
        
        // Log the calculation
        console.log('Critical Value calculation:', {
            distribution,
            significanceLevel,
            testType,
            df1,
            df2,
            alpha,
            criticalValue
        });
    } catch (error) {
        console.error('Critical Value calculation error:', error);
        resultElement.innerHTML = `<div class="error">Error: ${error.message}</div>`;
        resultElement.style.display = 'block';
    }
}

function calculateNormalCriticalValue(alpha, testType) {
    switch (testType) {
        case 'two-tailed':
            return [-normalQuantile(alpha/2), normalQuantile(alpha/2)];
        case 'left-tailed':
            return normalQuantile(alpha);
        case 'right-tailed':
            return normalQuantile(1 - alpha);
    }
}

function calculateTCriticalValue(alpha, df, testType) {
    switch (testType) {
        case 'two-tailed':
            return [-tQuantile(alpha/2, df), tQuantile(alpha/2, df)];
        case 'left-tailed':
            return tQuantile(alpha, df);
        case 'right-tailed':
            return tQuantile(1 - alpha, df);
    }
}

function calculateChiSquareCriticalValue(alpha, df, testType) {
    switch (testType) {
        case 'two-tailed':
            return [chiSquareQuantile(alpha/2, df), chiSquareQuantile(1 - alpha/2, df)];
        case 'left-tailed':
            return chiSquareQuantile(alpha, df);
        case 'right-tailed':
            return chiSquareQuantile(1 - alpha, df);
    }
}

function calculateFCriticalValue(alpha, df1, df2, testType) {
    switch (testType) {
        case 'two-tailed':
            return [fQuantile(alpha/2, df1, df2), fQuantile(1 - alpha/2, df1, df2)];
        case 'left-tailed':
            return fQuantile(alpha, df1, df2);
        case 'right-tailed':
            return fQuantile(1 - alpha, df1, df2);
    }
}

function normalQuantile(p) {
    // Abramowitz and Stegun approximation
    const a1 = -3.969683028665376e+01;
    const a2 = 2.209460984245205e+02;
    const a3 = -2.759285104469687e+02;
    const a4 = 1.383577518672690e+02;
    const a5 = -3.066479806614716e+01;
    const a6 = 2.506628277459239e+00;
    
    const b1 = -5.447609879822406e+01;
    const b2 = 1.615858368580409e+02;
    const b3 = -1.556989798598866e+02;
    const b4 = 6.680131188771972e+01;
    const b5 = -1.328068155288572e+01;
    
    const c1 = -7.784894002430293e-03;
    const c2 = -3.223964580411365e-01;
    const c3 = -2.400758277161838e+00;
    const c4 = -2.549732539343734e+00;
    const c5 = 4.374664141464968e+00;
    const c6 = 2.938163982698783e+00;
    
    const d1 = 7.784695709041462e-03;
    const d2 = 3.224671290700398e-01;
    const d3 = 2.445134137142996e+00;
    const d4 = 3.754408661907416e+00;
    
    if (p < 0.02425) {
        const q = Math.sqrt(-2 * Math.log(p));
        return (((((c1 * q + c2) * q + c3) * q + c4) * q + c5) * q + c6) /
               ((((d1 * q + d2) * q + d3) * q + d4) * q + 1);
    } else if (p < 0.97575) {
        const q = p - 0.5;
        const r = q * q;
        return (((((a1 * r + a2) * r + a3) * r + a4) * r + a5) * r + a6) * q /
               (((((b1 * r + b2) * r + b3) * r + b4) * r + b5) * r + 1);
    } else {
        const q = Math.sqrt(-2 * Math.log(1 - p));
        return -(((((c1 * q + c2) * q + c3) * q + c4) * q + c5) * q + c6) /
               ((((d1 * q + d2) * q + d3) * q + d4) * q + 1);
    }
}

function tQuantile(p, df) {
    // Use normal approximation for large degrees of freedom
    if (df > 100) {
        return normalQuantile(p);
    }
    
    // Use numerical approximation for smaller degrees of freedom
    const x = normalQuantile(p);
    const g1 = x;
    const g2 = (Math.pow(x, 3) + x) / (4 * df);
    const g3 = (5 * Math.pow(x, 5) + 16 * Math.pow(x, 3) + 3 * x) / (96 * Math.pow(df, 2));
    const g4 = (3 * Math.pow(x, 7) + 19 * Math.pow(x, 5) + 17 * Math.pow(x, 3) - 15 * x) / (384 * Math.pow(df, 3));
    const g5 = (79 * Math.pow(x, 9) + 776 * Math.pow(x, 7) + 1482 * Math.pow(x, 5) - 1920 * Math.pow(x, 3) - 945 * x) / (92160 * Math.pow(df, 4));
    
    return g1 + g2 + g3 + g4 + g5;
}

function chiSquareQuantile(p, df) {
    // Use normal approximation for large degrees of freedom
    if (df > 100) {
        const x = normalQuantile(p);
        return df + Math.sqrt(2 * df) * x + (Math.pow(x, 2) - 1) / 3;
    }
    
    // Use numerical approximation for smaller degrees of freedom
    const a = df / 2;
    const x = gammaQuantile(p, a);
    return 2 * x;
}

function fQuantile(p, df1, df2) {
    // Use normal approximation for large degrees of freedom
    if (df1 > 100 && df2 > 100) {
        const x = normalQuantile(p);
        const z = Math.sqrt(2 * (df1 + df2 - 2) / (df1 * df2)) * x;
        return Math.exp(z);
    }
    
    // Use numerical approximation for smaller degrees of freedom
    const x = betaQuantile(p, df1/2, df2/2);
    return (df2 * x) / (df1 * (1 - x));
}

function gammaQuantile(p, a) {
    // Use numerical approximation
    const EPSILON = 1e-10;
    const MAX_ITERATIONS = 100;
    
    let x = a;
    let h = 1;
    let i = 0;
    
    while (Math.abs(h) > EPSILON && i < MAX_ITERATIONS) {
        const f = incompleteGammaFunction(x, a) - p;
        const fPrime = Math.pow(x, a-1) * Math.exp(-x) / gammaFunction(a);
        h = f / fPrime;
        x -= h;
        i++;
    }
    
    return x;
}

function betaQuantile(p, a, b) {
    // Use numerical approximation
    const EPSILON = 1e-10;
    const MAX_ITERATIONS = 100;
    
    let x = 0.5;
    let h = 1;
    let i = 0;
    
    while (Math.abs(h) > EPSILON && i < MAX_ITERATIONS) {
        const f = incompleteBetaFunction(x, a, b) - p;
        const fPrime = Math.pow(x, a-1) * Math.pow(1-x, b-1) / betaFunction(a, b);
        h = f / fPrime;
        x -= h;
        i++;
    }
    
    return x;
}

// Add event listeners for Critical Value Calculator
document.addEventListener('DOMContentLoaded', function() {
    // ... existing code ...

    // Critical Value Calculator
    const calculateCriticalValueBtn = document.getElementById('calculate-critical-value');
    if (calculateCriticalValueBtn) {
        calculateCriticalValueBtn.addEventListener('click', calculateCriticalValue);
    }

    // Add input event listeners for real-time calculation
    const cvDistributionSelect = document.getElementById('cv-distribution');
    const cvSignificanceInput = document.getElementById('cv-significance');
    const cvTestTypeSelect = document.getElementById('cv-test-type');
    const cvDf1Input = document.getElementById('cv-df1');
    const cvDf2Input = document.getElementById('cv-df2');
    
    if (cvDistributionSelect && cvSignificanceInput && cvTestTypeSelect && cvDf1Input && cvDf2Input) {
        let debounceTimer;
        const debounceDelay = 500; // 500ms delay

        const debouncedCalculation = () => {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(calculateCriticalValue, debounceDelay);
        };

        cvDistributionSelect.addEventListener('change', debouncedCalculation);
        cvSignificanceInput.addEventListener('input', debouncedCalculation);
        cvTestTypeSelect.addEventListener('change', debouncedCalculation);
        cvDf1Input.addEventListener('input', debouncedCalculation);
        cvDf2Input.addEventListener('input', debouncedCalculation);
    }

    // ... existing code ...
});

// ... existing code ...

function calculateSampleSize() {
    const margin = parseFloat(document.getElementById('ss-margin').value);
    const population = parseFloat(document.getElementById('ss-population').value);
    const proportion = parseFloat(document.getElementById('ss-proportion').value);
    const confidence = parseFloat(document.getElementById('ss-confidence').value);
    const resultElement = document.getElementById('sample-size-result');
    
    try {
        // Validate inputs
        if (isNaN(margin) || margin <= 0 || margin >= 100) {
            throw new Error('Please enter a valid margin of error between 0 and 100');
        }
        
        if (isNaN(population) || population <= 0) {
            throw new Error('Please enter a valid population size');
        }
        
        if (isNaN(proportion) || proportion <= 0 || proportion >= 100) {
            throw new Error('Please enter a valid expected proportion between 0 and 100');
        }
        
        // Convert percentages to decimals
        const marginDecimal = margin / 100;
        const proportionDecimal = proportion / 100;
        const confidenceDecimal = confidence / 100;
        
        // Calculate z-score for confidence level
        const zScore = getZScore(confidence);
        
        // Calculate sample size using the formula:
        // n = (z² * p * (1-p)) / (e²)
        // where:
        // z = z-score
        // p = expected proportion
        // e = margin of error
        let sampleSize = (Math.pow(zScore, 2) * proportionDecimal * (1 - proportionDecimal)) / Math.pow(marginDecimal, 2);
        
        // Apply finite population correction if population is provided
        if (population < Infinity) {
            sampleSize = sampleSize / (1 + (sampleSize - 1) / population);
        }
        
        // Round up to the nearest integer
        sampleSize = Math.ceil(sampleSize);
        
        // Format the result
        let resultText = `<strong>Results:</strong><br><br>`;
        
        // Input Parameters
        resultText += `<strong>Input Parameters:</strong><br>`;
        resultText += `Margin of Error: ${margin}%<br>`;
        resultText += `Population Size: ${population.toLocaleString()}<br>`;
        resultText += `Expected Proportion: ${proportion}%<br>`;
        resultText += `Confidence Level: ${confidence}%<br><br>`;
        
        // Sample Size Results
        resultText += `<strong>Required Sample Size:</strong><br>`;
        resultText += `Minimum Sample Size: ${sampleSize.toLocaleString()}<br><br>`;
        
        // Interpretation
        resultText += `<strong>Interpretation:</strong><br>`;
        resultText += `To achieve a margin of error of ${margin}% with ${confidence}% confidence level, `;
        resultText += `you need a minimum sample size of ${sampleSize.toLocaleString()} from a population of ${population.toLocaleString()}.<br><br>`;
        
        // Calculation Details
        resultText += `<strong>Calculation Details:</strong><br>`;
        resultText += `1. Z-Score for ${confidence}% confidence level: ${zScore.toFixed(4)}<br>`;
        resultText += `2. Expected proportion (p): ${proportionDecimal.toFixed(4)}<br>`;
        resultText += `3. Margin of error (e): ${marginDecimal.toFixed(4)}<br>`;
        resultText += `4. Initial sample size: ${Math.ceil((Math.pow(zScore, 2) * proportionDecimal * (1 - proportionDecimal)) / Math.pow(marginDecimal, 2)).toLocaleString()}<br>`;
        resultText += `5. Finite population correction applied: ${population < Infinity ? 'Yes' : 'No'}<br>`;
        
        // Display the result
        resultElement.innerHTML = resultText;
        resultElement.style.display = 'block';
        
        // Log the calculation
        console.log('Sample Size calculation:', {
            margin,
            population,
            proportion,
            confidence,
            zScore,
            sampleSize
        });
    } catch (error) {
        console.error('Sample Size calculation error:', error);
        resultElement.innerHTML = `<div class="error">Error: ${error.message}</div>`;
        resultElement.style.display = 'block';
    }
}

// Add event listeners for Sample Size Calculator
document.addEventListener('DOMContentLoaded', function() {
    // ... existing code ...

    // Sample Size Calculator
    const calculateSampleSizeBtn = document.getElementById('calculate-sample-size');
    if (calculateSampleSizeBtn) {
        calculateSampleSizeBtn.addEventListener('click', calculateSampleSize);
    }

    // Add input event listeners for real-time calculation
    const ssMarginInput = document.getElementById('ss-margin');
    const ssPopulationInput = document.getElementById('ss-population');
    const ssProportionInput = document.getElementById('ss-proportion');
    const ssConfidenceSelect = document.getElementById('ss-confidence');
    
    if (ssMarginInput && ssPopulationInput && ssProportionInput && ssConfidenceSelect) {
        let debounceTimer;
        const debounceDelay = 500; // 500ms delay

        const debouncedCalculation = () => {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(calculateSampleSize, debounceDelay);
        };

        ssMarginInput.addEventListener('input', debouncedCalculation);
        ssPopulationInput.addEventListener('input', debouncedCalculation);
        ssProportionInput.addEventListener('input', debouncedCalculation);
        ssConfidenceSelect.addEventListener('change', debouncedCalculation);
    }

    // ... existing code ...
});

// ... existing code ...

function calculateMarginOfError() {
    const sampleSize = parseInt(document.getElementById('me-sample-size').value);
    const population = parseInt(document.getElementById('me-population').value);
    const proportion = parseFloat(document.getElementById('me-proportion').value);
    const confidence = parseFloat(document.getElementById('me-confidence').value);
    const resultElement = document.getElementById('me-result');
    
    try {
        // Validate inputs
        if (isNaN(sampleSize) || sampleSize < 2) {
            throw new Error('Please enter a valid sample size (minimum 2)');
        }
        
        if (isNaN(population) || population <= 0) {
            throw new Error('Please enter a valid population size');
        }
        
        if (isNaN(proportion) || proportion < 0 || proportion > 100) {
            throw new Error('Please enter a valid proportion between 0 and 100');
        }
        
        // Convert percentages to decimals
        const proportionDecimal = proportion / 100;
        const confidenceDecimal = confidence / 100;
        
        // Calculate z-score for confidence level
        const zScore = getZScore(confidence);
        
        // Calculate standard error
        const standardError = Math.sqrt((proportionDecimal * (1 - proportionDecimal)) / sampleSize);
        
        // Apply finite population correction
        const fpc = Math.sqrt((population - sampleSize) / (population - 1));
        
        // Calculate margin of error
        const marginOfError = zScore * standardError * fpc;
        
        // Format the result
        let resultText = `<strong>Results:</strong><br><br>`;
        
        // Input Parameters
        resultText += `<strong>Input Parameters:</strong><br>`;
        resultText += `Sample Size: ${sampleSize.toLocaleString()}<br>`;
        resultText += `Population Size: ${population.toLocaleString()}<br>`;
        resultText += `Proportion: ${proportion}%<br>`;
        resultText += `Confidence Level: ${confidence}%<br><br>`;
        
        // Margin of Error Results
        resultText += `<strong>Margin of Error:</strong><br>`;
        resultText += `±${(marginOfError * 100).toFixed(2)}%<br><br>`;
        
        // Interpretation
        resultText += `<strong>Interpretation:</strong><br>`;
        resultText += `With ${confidence}% confidence, the true proportion in the population is within `;
        resultText += `±${(marginOfError * 100).toFixed(2)}% of the sample proportion (${proportion}%).<br><br>`;
        
        // Calculation Details
        resultText += `<strong>Calculation Details:</strong><br>`;
        resultText += `1. Z-Score for ${confidence}% confidence level: ${zScore.toFixed(4)}<br>`;
        resultText += `2. Standard Error: ${standardError.toFixed(4)}<br>`;
        resultText += `3. Finite Population Correction: ${fpc.toFixed(4)}<br>`;
        resultText += `4. Margin of Error = Z-Score × Standard Error × FPC<br>`;
        resultText += `   = ${zScore.toFixed(4)} × ${standardError.toFixed(4)} × ${fpc.toFixed(4)}<br>`;
        resultText += `   = ${(marginOfError * 100).toFixed(2)}%`;
        
        // Display the result
        resultElement.innerHTML = resultText;
        resultElement.style.display = 'block';
        
        // Log the calculation
        console.log('Margin of Error calculation:', {
            sampleSize,
            population,
            proportion,
            confidence,
            zScore,
            standardError,
            fpc,
            marginOfError
        });
    } catch (error) {
        console.error('Margin of Error calculation error:', error);
        resultElement.innerHTML = `<div class="error">Error: ${error.message}</div>`;
        resultElement.style.display = 'block';
    }
}

// Add event listeners for Margin of Error Calculator
document.addEventListener('DOMContentLoaded', function() {
    // ... existing code ...

    // Margin of Error Calculator
    const calculateMEBtn = document.getElementById('calculate-me');
    if (calculateMEBtn) {
        calculateMEBtn.addEventListener('click', calculateMarginOfError);
    }

    // Add input event listeners for real-time calculation
    const meSampleSizeInput = document.getElementById('me-sample-size');
    const mePopulationInput = document.getElementById('me-population');
    const meProportionInput = document.getElementById('me-proportion');
    const meConfidenceSelect = document.getElementById('me-confidence');
    
    if (meSampleSizeInput && mePopulationInput && meProportionInput && meConfidenceSelect) {
        let debounceTimer;
        const debounceDelay = 500; // 500ms delay

        const debouncedCalculation = () => {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(calculateMarginOfError, debounceDelay);
        };

        meSampleSizeInput.addEventListener('input', debouncedCalculation);
        mePopulationInput.addEventListener('input', debouncedCalculation);
        meProportionInput.addEventListener('input', debouncedCalculation);
        meConfidenceSelect.addEventListener('change', debouncedCalculation);
    }

    // ... existing code ...
});

// ... existing code ...

function calculatePowerAnalysis() {
    const effectSize = parseFloat(document.getElementById('pa-effect-size').value);
    const sampleSize = parseInt(document.getElementById('pa-sample-size').value);
    const significance = parseFloat(document.getElementById('pa-significance').value);
    const testType = document.getElementById('pa-test-type').value;
    const resultElement = document.getElementById('pa-result');
    
    try {
        // Validate inputs
        if (isNaN(effectSize) || effectSize <= 0) {
            throw new Error('Please enter a valid effect size (greater than 0)');
        }
        
        if (isNaN(sampleSize) || sampleSize < 2) {
            throw new Error('Please enter a valid sample size (minimum 2)');
        }
        
        // Convert significance level to decimal
        const alpha = significance / 100;
        
        // Calculate non-centrality parameter
        const nonCentralityParam = effectSize * Math.sqrt(sampleSize);
        
        // Calculate critical value based on test type
        let criticalValue;
        if (testType === 'two-tailed') {
            criticalValue = normalQuantile(1 - alpha/2);
        } else {
            criticalValue = normalQuantile(1 - alpha);
        }
        
        // Calculate power using normal distribution
        const power = 1 - normalCDF(criticalValue - nonCentralityParam);
        
        // Format the result
        let resultText = `<strong>Results:</strong><br><br>`;
        
        // Input Parameters
        resultText += `<strong>Input Parameters:</strong><br>`;
        resultText += `Effect Size: ${effectSize.toFixed(2)}<br>`;
        resultText += `Sample Size: ${sampleSize.toLocaleString()}<br>`;
        resultText += `Significance Level: ${significance}%<br>`;
        resultText += `Test Type: ${testType === 'two-tailed' ? 'Two-Tailed' : 'One-Tailed'}<br><br>`;
        
        // Power Analysis Results
        resultText += `<strong>Power Analysis Results:</strong><br>`;
        resultText += `Statistical Power: ${(power * 100).toFixed(2)}%<br><br>`;
        
        // Interpretation
        resultText += `<strong>Interpretation:</strong><br>`;
        if (power >= 0.8) {
            resultText += `The study has adequate power (≥80%) to detect the specified effect size.<br>`;
        } else {
            resultText += `The study has insufficient power (<80%) to detect the specified effect size.<br>`;
            resultText += `Consider increasing the sample size or effect size to improve power.<br>`;
        }
        
        // Calculation Details
        resultText += `<br><strong>Calculation Details:</strong><br>`;
        resultText += `1. Non-centrality parameter = Effect Size × √Sample Size<br>`;
        resultText += `   = ${effectSize.toFixed(2)} × √${sampleSize}<br>`;
        resultText += `   = ${nonCentralityParam.toFixed(4)}<br><br>`;
        
        resultText += `2. Critical value for ${significance}% significance level (${testType}):<br>`;
        resultText += `   = ${criticalValue.toFixed(4)}<br><br>`;
        
        resultText += `3. Power = 1 - P(Z < Critical Value - Non-centrality Parameter)<br>`;
        resultText += `   = 1 - P(Z < ${criticalValue.toFixed(4)} - ${nonCentralityParam.toFixed(4)})<br>`;
        resultText += `   = ${(power * 100).toFixed(2)}%`;
        
        // Display the result
        resultElement.innerHTML = resultText;
        resultElement.style.display = 'block';
        
        // Log the calculation
        console.log('Power Analysis calculation:', {
            effectSize,
            sampleSize,
            significance,
            testType,
            alpha,
            nonCentralityParam,
            criticalValue,
            power
        });
    } catch (error) {
        console.error('Power Analysis calculation error:', error);
        resultElement.innerHTML = `<div class="error">Error: ${error.message}</div>`;
        resultElement.style.display = 'block';
    }
}

// Add event listeners for Power Analysis Calculator
document.addEventListener('DOMContentLoaded', function() {
    // ... existing code ...

    // Power Analysis Calculator
    const calculatePABtn = document.getElementById('calculate-pa');
    if (calculatePABtn) {
        calculatePABtn.addEventListener('click', calculatePowerAnalysis);
    }

    // Add input event listeners for real-time calculation
    const paEffectSizeInput = document.getElementById('pa-effect-size');
    const paSampleSizeInput = document.getElementById('pa-sample-size');
    const paSignificanceSelect = document.getElementById('pa-significance');
    const paTestTypeSelect = document.getElementById('pa-test-type');
    
    if (paEffectSizeInput && paSampleSizeInput && paSignificanceSelect && paTestTypeSelect) {
        let debounceTimer;
        const debounceDelay = 500; // 500ms delay

        const debouncedCalculation = () => {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(calculatePowerAnalysis, debounceDelay);
        };

        paEffectSizeInput.addEventListener('input', debouncedCalculation);
        paSampleSizeInput.addEventListener('input', debouncedCalculation);
        paSignificanceSelect.addEventListener('change', debouncedCalculation);
        paTestTypeSelect.addEventListener('change', debouncedCalculation);
    }

    // ... existing code ...
});