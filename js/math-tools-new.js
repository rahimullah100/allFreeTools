// // // Math Tools JavaScript Implementation

// // // Initialize everything when the DOM is loaded
// // document.addEventListener('DOMContentLoaded', function() {
// //     console.log('Initializing math tools...');
    
// //     try {
// //         // Setup calculator event listeners
// //         setupCalculatorEventListeners();
// //         console.log('Calculator event listeners set up');
        
// //         // Setup navigation
// //         setupNavigation();
// //         console.log('Navigation initialized');
        
// //         // Initialize matrix sizes
// //         if (typeof updateMatrixSize === 'function') {
// //             updateMatrixSize('matrix-a');
// //             updateMatrixSize('matrix-b');
// //             console.log('Matrix sizes initialized');
// //         } else {
// //             console.error('updateMatrixSize function not found');
// //         }
        
// //         // Add event listeners for dynamic input changes
// //         const probabilityType = document.getElementById('probability-type');
// //         if (probabilityType && typeof updateProbabilityInputs === 'function') {
// //             probabilityType.addEventListener('change', updateProbabilityInputs);
// //         }
        
// //         const shapeType = document.getElementById('shape-type');
// //         if (shapeType && typeof updateGeometryInputs === 'function') {
// //             shapeType.addEventListener('change', updateGeometryInputs);
// //         }
        
// //         const trigFunction = document.getElementById('trig-function');
// //         if (trigFunction && typeof updateTrigInputs === 'function') {
// //             trigFunction.addEventListener('change', updateTrigInputs);
// //         }
        
// //         const conversionType = document.getElementById('conversion-type');
// //         if (conversionType && typeof updateUnitOptions === 'function') {
// //             conversionType.addEventListener('change', updateUnitOptions);
// //         }
        
// //         // Add direct event listeners for critical calculators
// //         const calculateGCDLCMBtn = document.getElementById('calculate-gcd-lcm');
// //         if (calculateGCDLCMBtn && typeof calculateGCDLCM === 'function') {
// //             calculateGCDLCMBtn.addEventListener('click', calculateGCDLCM);
// //             console.log('GCD/LCM calculator initialized');
// //         }

// //         const calculateComplexBtn = document.getElementById('calculate-complex');
// //         if (calculateComplexBtn && typeof calculateComplex === 'function') {
// //             calculateComplexBtn.addEventListener('click', calculateComplex);
// //             console.log('Complex number calculator initialized');
// //         }

// //         const calculateVectorBtn = document.getElementById('calculate-vector');
// //         if (calculateVectorBtn && typeof calculateVector === 'function') {
// //             calculateVectorBtn.addEventListener('click', calculateVector);
// //             console.log('Vector calculator initialized');
// //         }
        
// //         // Setup copy buttons
// //         setupCopyButtons();
        
// //         console.log('Math tools initialized successfully');
// //     } catch (error) {
// //         console.error('Error initializing math tools:', error);
// //     }
// // });

// // // Navigation functionality
// // function setupNavigation() {
// //     console.log('Setting up navigation...');
    
// //     const quickNavLinks = document.querySelectorAll('.quick-nav-links a');
// //     const toolCards = document.querySelectorAll('.tool-card');
    
// //     console.log(`Found ${quickNavLinks.length} navigation links and ${toolCards.length} tool cards`);

// //     // Function to show a specific tool card
// //     function showToolCard(cardId) {
// //         console.log(`Attempting to show tool card: ${cardId}`);
        
// //         let found = false;
// //         toolCards.forEach(card => {
// //             if (card.id === cardId) {
// //                 card.classList.add('active');
// //                 card.style.display = 'block';
// //                 // Scroll to the card with smooth behavior
// //                 card.scrollIntoView({ behavior: 'smooth', block: 'start' });
// //                 found = true;
// //                 console.log(`Successfully showed tool card: ${cardId}`);
// //             } else {
// //                 card.classList.remove('active');
// //                 card.style.display = 'none';
// //             }
// //         });
        
// //         if (!found) {
// //             console.warn(`Tool card with ID "${cardId}" not found`);
// //         }
// //     }

// //     // Initialize all tool cards to be hidden
// //     toolCards.forEach(card => {
// //         card.style.display = 'none';
// //         card.classList.remove('active');
// //     });

// //     // Show Scientific Calculator by default if no hash is present
// //     if (!window.location.hash) {
// //         console.log('No hash found, showing default calculator');
// //         showToolCard('calculator');
// //     }

// //     // Handle quick navigation clicks
// //     quickNavLinks.forEach(link => {
// //         link.addEventListener('click', function(e) {
// //             e.preventDefault();
// //             console.log('Navigation link clicked:', this.getAttribute('href'));
            
// //             // Remove active class from all links
// //             quickNavLinks.forEach(l => l.classList.remove('active'));
            
// //             // Add active class to clicked link
// //             this.classList.add('active');
            
// //             // Get target tool card ID
// //             const targetId = this.getAttribute('href').substring(1);
            
// //             // Show the target tool card
// //             showToolCard(targetId);
            
// //             // Update URL hash without triggering scroll
// //             history.pushState(null, null, this.getAttribute('href'));
// //         });
// //     });

// //     // Handle hash navigation on page load
// //     if (window.location.hash) {
// //         const targetId = window.location.hash.substring(1);
// //         console.log('Hash found in URL:', targetId);
        
// //         // Show the target tool card
// //         showToolCard(targetId);
        
// //         // Update active state in navigation
// //         const activeLink = document.querySelector(`.quick-nav-links a[href="#${targetId}"]`);
// //         if (activeLink) {
// //             quickNavLinks.forEach(l => l.classList.remove('active'));
// //             activeLink.classList.add('active');
// //             console.log('Updated active navigation link');
// //         } else {
// //             console.warn(`Navigation link for "${targetId}" not found`);
// //         }
// //     }
    
// //     // Handle browser back/forward buttons
// //     window.addEventListener('popstate', function() {
// //         const targetId = window.location.hash.substring(1) || 'calculator';
// //         console.log('Handling popstate, showing:', targetId);
// //         showToolCard(targetId);
        
// //         // Update active state in navigation
// //         const activeLink = document.querySelector(`.quick-nav-links a[href="#${targetId}"]`);
// //         if (activeLink) {
// //             quickNavLinks.forEach(l => l.classList.remove('active'));
// //             activeLink.classList.add('active');
// //         }
// //     });
    
// //     console.log('Navigation setup completed');
// // }

// // // Calculator Functions
// // function calculateScientific(expression) {
// //     try {
// //         // Replace multiplication and division symbols with their JavaScript equivalents
// //         expression = expression.replace(/×/g, '*').replace(/÷/g, '/');
        
// //         // Replace constants
// //         expression = expression.replace(/π/g, 'PI').replace(/e/g, 'E');
        
// //         // Create a scope object with all mathematical functions and constants
// //         const scope = {
// //             // Trigonometric functions (in degrees)
// //             sin: (x) => Math.sin(x * (Math.PI / 180)),
// //             cos: (x) => Math.cos(x * (Math.PI / 180)),
// //             tan: (x) => Math.tan(x * (Math.PI / 180)),
// //             asin: (x) => Math.asin(x) * (180 / Math.PI),
// //             acos: (x) => Math.acos(x) * (180 / Math.PI),
// //             atan: (x) => Math.atan(x) * (180 / Math.PI),
            
// //             // Hyperbolic functions
// //             sinh: (x) => Math.sinh(x),
// //             cosh: (x) => Math.cosh(x),
// //             tanh: (x) => Math.tanh(x),
            
// //             // Logarithms
// //             log: Math.log10,
// //             ln: Math.log,
            
// //             // Powers and roots
// //             sqrt: Math.sqrt,
// //             cbrt: (x) => Math.pow(x, 1/3),
// //             pow: Math.pow,
// //             root: (x, n) => Math.pow(x, 1/n),
            
// //             // Constants
// //             PI: Math.PI,
// //             E: Math.E,
            
// //             // Other functions
// //             abs: Math.abs,
// //             round: Math.round,
// //             floor: Math.floor,
// //             ceil: Math.ceil,
// //             fact: function(x) {
// //                 if (x < 0) throw new Error('Factorial of negative number');
// //                 let result = 1;
// //                 for (let i = 2; i <= x; i++) {
// //                     result *= i;
// //                 }
// //                 return result;
// //             },
// //             mod: (x, y) => x % y
// //         };

// //         // Use math.js for more reliable expression evaluation
// //         const result = math.evaluate(expression, scope);
        
// //         // Handle very small numbers and round to 10 decimal places
// //         if (Math.abs(result) < 1e-10) {
// //             return '0';
// //         }
        
// //         // If the result is an integer, return it as integer, otherwise round to 10 decimal places
// //         return Number.isInteger(result) ? result.toString() : Number(result.toFixed(10)).toString();
// //     } catch (error) {
// //         console.error('Calculation error:', error);
// //         throw new Error('Invalid expression');
// //     }
// // }

// // // Setup Event Listeners
// // function setupCalculatorEventListeners() {
// //     const calculatorDisplay = document.getElementById('calculator-display');
// //     const calculatorButtons = document.querySelectorAll('.calculator-buttons .calc-btn, .scientific-functions .calc-btn');
    
// //     // Remove any existing event listeners
// //     calculatorButtons.forEach(button => {
// //         const newButton = button.cloneNode(true);
// //         button.parentNode.replaceChild(newButton, button);
// //     });
    
// //     // Add event listeners to the new buttons
// //     document.querySelectorAll('.calculator-buttons .calc-btn, .scientific-functions .calc-btn').forEach(button => {
// //         button.addEventListener('click', () => {
// //             const action = button.dataset.action;
// //             const value = button.textContent;
            
// //             try {
// //                 switch(action) {
// //                     case 'number':
// //                     case 'decimal':
// //                         // Prevent multiple decimal points in a number
// //                         if (action === 'decimal' && calculatorDisplay.value.split(/[\+\-\*\/]/).pop().includes('.')) {
// //                             break;
// //                         }
// //                         calculatorDisplay.value += value;
// //                         break;
                        
// //                     case 'operator':
// //                         // Handle negative numbers
// //                         if (value === '-' && (calculatorDisplay.value === '' || 
// //                             '+−×÷('.includes(calculatorDisplay.value.slice(-1)))) {
// //                             calculatorDisplay.value += value;
// //                             break;
// //                         }
// //                         // Don't allow multiple operators in a row
// //                         if ('+−×÷'.includes(calculatorDisplay.value.slice(-1))) {
// //                             calculatorDisplay.value = calculatorDisplay.value.slice(0, -1) + value;
// //                         } else {
// //                             calculatorDisplay.value += value;
// //                         }
// //                         break;
                        
// //                     case 'parenthesis':
// //                         // Handle parentheses
// //                         if (value === '(') {
// //                             // If the last character is a number or ), add a multiplication
// //                             const lastChar = calculatorDisplay.value.slice(-1);
// //                             if (lastChar && /[\d\)]/.test(lastChar)) {
// //                                 calculatorDisplay.value += '×' + value;
// //                             } else {
// //                                 calculatorDisplay.value += value;
// //                             }
// //                         } else {
// //                             calculatorDisplay.value += value;
// //                         }
// //                         break;
                        
// //                     case 'clear':
// //                         calculatorDisplay.value = '';
// //                         break;
                        
// //                     case 'backspace':
// //                         calculatorDisplay.value = calculatorDisplay.value.slice(0, -1);
// //                         break;
                        
// //                     case 'equals':
// //                         try {
// //                             if (calculatorDisplay.value === '') break;
// //                             const result = calculateScientific(calculatorDisplay.value);
// //                             calculatorDisplay.value = result;
// //                         } catch (error) {
// //                             calculatorDisplay.value = 'Error';
// //                             setTimeout(() => {
// //                                 calculatorDisplay.value = '';
// //                             }, 1000);
// //                         }
// //                         break;
                        
// //                     case 'function':
// //                         // Handle scientific functions
// //                         switch(value) {
// //                             case 'sin':
// //                             case 'cos':
// //                             case 'tan':
// //                             case 'asin':
// //                             case 'acos':
// //                             case 'atan':
// //                             case 'sinh':
// //                             case 'cosh':
// //                             case 'tanh':
// //                             case 'sqrt':
// //                             case 'cbrt':
// //                             case 'log':
// //                             case 'ln':
// //                             case 'abs':
// //                             case 'floor':
// //                             case 'ceil':
// //                             case 'round':
// //                                 calculatorDisplay.value += value + '(';
// //                                 break;
// //                             case 'x²':
// //                                 calculatorDisplay.value += '^2';
// //                                 break;
// //                             case 'x³':
// //                                 calculatorDisplay.value += '^3';
// //                                 break;
// //                             case 'xʸ':
// //                                 calculatorDisplay.value += '^';
// //                                 break;
// //                             case '10ˣ':
// //                                 calculatorDisplay.value = '10^(' + calculatorDisplay.value + ')';
// //                                 break;
// //                             case 'eˣ':
// //                                 calculatorDisplay.value = 'E^(' + calculatorDisplay.value + ')';
// //                                 break;
// //                             case 'x!':
// //                                 calculatorDisplay.value = 'fact(' + calculatorDisplay.value + ')';
// //                                 break;
// //                             default:
// //                                 calculatorDisplay.value += value;
// //                         }
// //                         break;
                        
// //                     case 'constant':
// //                         // Handle constants
// //                         switch(value) {
// //                             case 'π':
// //                                 calculatorDisplay.value += 'π';
// //                                 break;
// //                             case 'e':
// //                                 calculatorDisplay.value += 'e';
// //                                 break;
// //                             default:
// //                                 calculatorDisplay.value += value;
// //                         }
// //                         break;
// //                 }
// //             } catch (error) {
// //                 calculatorDisplay.value = 'Error';
// //                 setTimeout(() => {
// //                     calculatorDisplay.value = '';
// //                 }, 1000);
// //             }
// //         });
// //     });
    
// //     // Add keyboard support
// //     document.addEventListener('keydown', (e) => {
// //         const key = e.key;
        
// //         // Allow: numbers, operators, decimal point, backspace, enter
// //         if (/[\d+\-*/.=]/.test(key) || 
// //             key === 'Enter' || 
// //             key === 'Backspace' || 
// //             key === 'Delete' ||
// //             key === 'Escape' ||
// //             key === '(' || key === ')' ||
// //             key === '^' || key === '!') {
            
// //             if (key === 'Enter' || key === '=') {
// //                 const equalsBtn = document.querySelector('.calc-btn[data-action="equals"]');
// //                 if (equalsBtn) equalsBtn.click();
// //                 e.preventDefault();
// //             } else if (key === 'Escape') {
// //                 const clearBtn = document.querySelector('.calc-btn[data-action="clear"]');
// //                 if (clearBtn) clearBtn.click();
// //                 e.preventDefault();
// //             } else if (key === 'Backspace') {
// //                 const backspaceBtn = document.querySelector('.calc-btn[data-action="backspace"]');
// //                 if (backspaceBtn) backspaceBtn.click();
// //                 e.preventDefault();
// //             } else if (key === 'Delete') {
// //                 calculatorDisplay.value = '';
// //                 e.preventDefault();
// //             } else {
// //                 // Find and click the corresponding button
// //                 const buttons = document.querySelectorAll('.calc-btn');
// //                 for (const btn of buttons) {
// //                     if (btn.textContent === key || 
// //                         (key === '*' && btn.textContent === '×') ||
// //                         (key === '/' && btn.textContent === '÷')) {
// //                         btn.click();
// //                         break;
// //                     }
// //                 }
// //             }
// //         }
// //     });
// // }

// // // ... rest of the existing code ...
// // Enhanced JavaScript for Scientific Calculator

// document.addEventListener('DOMContentLoaded', function () {
//     const display = document.getElementById('calculator-display');
//     const buttons = document.querySelectorAll('.calc-btn');
//     let shouldResetDisplay = false;

//     // Helper function to append text to the display
//     function appendToDisplay(text) {
//         if (shouldResetDisplay) {
//             display.value = '';
//             shouldResetDisplay = false;
//         }
//         display.value += text;
//     }

//     // Helper function to replace calculator symbols with JS-friendly ones
//     function sanitizeExpression(expr) {
//         return expr
//             // Replace unicode operators
//             .replace(/×/g, '*')
//             .replace(/÷/g, '/')
//             // Replace '^' with JS exponentiation
//             .replace(/\^/g, '**')
//             // Replace function names with Math equivalents
//             .replace(/\bsin\(/g, 'Math.sin(')
//             .replace(/\bcos\(/g, 'Math.cos(')
//             .replace(/\btan\(/g, 'Math.tan(')
//             .replace(/\bsqrt\(/g, 'Math.sqrt(')
//             .replace(/\blog\(/g, 'Math.log10(')   // log ≡ base-10
//             .replace(/\bln\(/g, 'Math.log(')     // ln ≡ natural log
//             // Replace constants
//             .replace(/π/g, `Math.PI`)
//             .replace(/\be\b/g, `Math.E`);
//     }

//     // Evaluate the current expression in the display
//     function evaluateExpression() {
//         const rawExpr = display.value;
//         if (rawExpr.trim() === '') return;
//         try {
//             const sanitized = sanitizeExpression(rawExpr);
//             // Use eval to compute
//             const result = eval(sanitized);
//             display.value = result;
//             shouldResetDisplay = true;
//         } catch (e) {
//             display.value = 'Error';
//             shouldResetDisplay = true;
//         }
//     }

//     // Handle the '%' button as percentage: take current display value, divide by 100
//     function handlePercentage() {
//         try {
//             const current = parseFloat(display.value);
//             if (isNaN(current)) {
//                 display.value = 'Error';
//             } else {
//                 const percentValue = current / 100;
//                 display.value = percentValue;
//             }
//             shouldResetDisplay = true;
//         } catch {
//             display.value = 'Error';
//             shouldResetDisplay = true;
//         }
//     }


//     // Button click dispatcher
//     buttons.forEach(button => {
//         button.addEventListener('click', () => {
//             const action = button.getAttribute('data-action');
//             const btnText = button.innerText;

//             switch (action) {
//                 case 'number':
//                     appendToDisplay(btnText);
//                     break;

//                 case 'decimal':
//                     // Prevent multiple decimals in the same number segment
//                     const parts = display.value.split(/[\+\-\×\÷\*\^\/\%]/);
//                     const last = parts[parts.length - 1];
//                     if (!last.includes('.')) {
//                         appendToDisplay('.');
//                     }
//                     break;

//                 case 'operator':
//                     if (btnText === 'C') {
//                         // Clear
//                         display.value = '';
//                     } else if (btnText === '⌫') {
//                         // Backspace
//                         handleBackspace();
//                     } else if (btnText === '%') {
//                         // Percentage
//                         handlePercentage();
//                     } else {
//                         // '+', '-', '×', '÷', '^'
//                         // Avoid consecutive operators (except minus for negative numbers)
//                         if (display.value === '' && btnText === '-') {
//                             appendToDisplay('-');
//                         } else if (display.value !== '' && /[0-9\)\πe]$/.test(display.value)) {
//                             appendToDisplay(btnText);
//                         }
//                     }
//                     break;

//                 case 'function':
//                     // sin, cos, tan, sqrt, log, ln
//                     appendToDisplay(btnText + '(');
//                     break;

//                 case 'constant':
//                     // π, e
//                     appendToDisplay(btnText);
//                     break;

//                 case 'parenthesis':
//                     appendToDisplay(btnText);
//                     break;

//                 case 'clear':
//                     display.value = '';
//                     break;

//                 case 'backspace':
//                     handleBackspace();
//                     break;

//                 case 'equals':
//                     evaluateExpression();
//                     break;

//                 default:
//                     break;
//             }
//         });
//     });

//     // Allow pressing Enter key to evaluate
//     document.addEventListener('keydown', (e) => {
//         if (e.key === 'Enter') {
//             e.preventDefault();
//             evaluateExpression();
//         } else if (e.key === 'Backspace') {
//             // Let browser handle backspace normally when focus is on input
//             if (document.activeElement !== display) {
//                 handleBackspace();
//                 e.preventDefault();
//             }
//         }
//     });
// });
