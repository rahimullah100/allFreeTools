/**
 * Equation Solver Module
 * Handles solving different types of equations (linear, quadratic, cubic)
 */

// Main equation solver initialization
function initEquationSolver() {
    console.log('Initializing equation solver...');
    const solveBtn = document.getElementById('solve-equation');
    
    if (solveBtn) {
        console.log('Found solve button, adding event listener');
        solveBtn.addEventListener('click', solveCurrentEquation);
        
        // Also add event listener for Enter key in the equation input
        const equationInput = document.getElementById('equation-input');
        if (equationInput) {
            equationInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    solveCurrentEquation();
                }
            });
        }
    } else {
        console.warn('Solve button not found');
    }
}

// Solve the current equation based on selected type
function solveCurrentEquation() {
    try {
        console.log('Solving equation...');
        const equationType = document.getElementById('equation-type').value;
        const equationInput = document.getElementById('equation-input').value.trim();
        const resultDiv = document.getElementById('equation-result');
        
        if (!resultDiv) {
            console.error('Result div not found');
            return;
        }
        
        console.log('Equation type:', equationType);
        console.log('Equation input:', equationInput);
        
        if (!equationInput) {
            resultDiv.innerHTML = '<div class="error">Please enter an equation to solve</div>';
            return;
        }
        
        // Split into left and right sides of the equation
        const parts = equationInput.split('=');
        if (parts.length !== 2) {
            throw new Error('Invalid equation format. Use format like: 2x + 3 = 7');
        }
        
        const leftSide = parts[0].trim();
        const rightSide = parts[1].trim();
        let result;
        
        // Solve based on equation type
        switch(equationType) {
            case 'linear':
                result = solveLinearEquation(leftSide, rightSide);
                break;
            case 'quadratic':
                result = solveQuadraticEquation(leftSide, rightSide);
                break;
            case 'cubic':
                result = solveCubicEquation(leftSide, rightSide);
                break;
            default:
                throw new Error('Unsupported equation type');
        }
        
        // Display the result
        resultDiv.innerHTML = `
            <div class="result-item">
                <span class="result-label">Solution:</span>
                <span class="result-value">${result}</span>
            </div>
        `;
        
    } catch (error) {
        console.error('Equation solving error:', error);
        const resultDiv = document.getElementById('equation-result');
        if (resultDiv) {
            resultDiv.innerHTML = `<div class="error">Error: ${error.message}</div>`;
        }
    }
}

// Solve linear equation (ax + b = c)
function solveLinearEquation(leftSide, rightSide) {
    try {
        // If right side is not zero, move all terms to the left side
        if (rightSide !== '0') {
            leftSide = `(${leftSide}) - (${rightSide})`;
        }
        
        // Parse the left side expression
        const expr = math.parse(leftSide);
        
        // Extract coefficients of x and constants
        let xCoeff = 0;
        let constTerm = 0;
        
        // Helper function to process each node in the expression tree
        function processNode(node, sign = 1) {
            if (node.isSymbolNode && node.name === 'x') {
                xCoeff += sign * 1;
            } else if (node.isConstantNode) {
                constTerm += sign * parseFloat(node.value);
            } else if (node.isOperatorNode && node.op === '*') {
                // Handle terms like 2x or -3x
                if (node.args.length === 2) {
                    const [coeff, variable] = node.args;
                    if (variable.isSymbolNode && variable.name === 'x' && coeff.isConstantNode) {
                        xCoeff += sign * parseFloat(coeff.value);
                        return;
                    }
                }
            } else if (node.isOperatorNode && node.op === '+') {
                // Process addition
                node.args.forEach(arg => processNode(arg, sign));
                return;
            } else if (node.isOperatorNode && node.op === '-') {
                // Process subtraction
                if (node.args.length === 1) {
                    // Unary minus
                    processNode(node.args[0], -sign);
                } else {
                    // Binary minus
                    processNode(node.args[0], sign);
                    for (let i = 1; i < node.args.length; i++) {
                        processNode(node.args[i], -sign);
                    }
                }
                return;
            } else if (node.isParenthesisNode) {
                // Process content inside parentheses
                processNode(node.content, sign);
                return;
            }
        }
        
        // Process the entire expression
        processNode(expr);
        
        // Solve for x: ax + b = 0 => x = -b/a
        if (xCoeff === 0) {
            if (constTerm === 0) {
                return 'Infinite solutions (0 = 0)';
            } else {
                return 'No solution (contradiction)';
            }
        }
        
        const solution = -constTerm / xCoeff;
        
        // Format the solution nicely
        if (Number.isInteger(solution)) {
            return `x = ${solution}`;
        } else {
            // Try to represent as a fraction
            const tolerance = 1.0E-6;
            const maxDenominator = 1000;
            
            // Find numerator and denominator using continued fractions
            let x = solution;
            let h1 = 1, h2 = 0;
            let k1 = 0, k2 = 1;
            let b = x;
            
            for (let i = 0; i < 10; i++) {
                const a = Math.floor(b);
                const h = a * h1 + h2;
                const k = a * k1 + k2;
                
                if (Math.abs(x - h/k) < tolerance || k > maxDenominator) {
                    if (k1 === 1) {
                        return `x = ${solution.toFixed(4)}`;
                    } else {
                        return `x = ${-constTerm}/${xCoeff} = ${solution.toFixed(4)}`;
                    }
                }
                
                b = 1 / (b - a);
                h2 = h1; h1 = h;
                k2 = k1; k1 = k;
            }
            
            return `x = ${solution.toFixed(4)}`;
        }
        
    } catch (error) {
        console.error('Error solving linear equation:', error);
        throw new Error('Could not solve the equation. Make sure it is a valid linear equation.');
    }
}

// Solve quadratic equation (ax² + bx + c = 0)
function solveQuadraticEquation(leftSide, rightSide) {
    try {
        // Parse both sides of the equation
        const leftExpr = math.parse(leftSide);
        const rightExpr = math.parse(rightSide);
        
        // Function to collect terms from an expression
        function collectTerms(expr, sign = 1) {
            const terms = { a: 0, b: 0, c: 0 };
            
            function processNode(node, currentSign = 1) {
                // Handle x² terms
                if (node.isOperatorNode && node.op === '^' && 
                    node.args[0].isSymbolNode && node.args[0].name === 'x' &&
                    node.args[1].isConstantNode && node.args[1].value === '2') {
                    terms.a += currentSign * 1;
                    return;
                }
                // Handle terms like 2x²
                else if (node.isOperatorNode && node.op === '*' && node.args.length === 2) {
                    const [coeff, variable] = node.args;
                    if (variable.isOperatorNode && variable.op === '^' && 
                        variable.args[0].isSymbolNode && variable.args[0].name === 'x' &&
                        variable.args[1].isConstantNode && variable.args[1].value === '2') {
                        terms.a += currentSign * parseFloat(coeff.value || '1');
                        return;
                    }
                }
                // Handle x terms
                else if (node.isSymbolNode && node.name === 'x') {
                    terms.b += currentSign * 1;
                    return;
                }
                // Handle terms like 2x
                else if (node.isOperatorNode && node.op === '*' && node.args.length === 2) {
                    const [coeff, variable] = node.args;
                    if (variable.isSymbolNode && variable.name === 'x' && coeff.isConstantNode) {
                        terms.b += currentSign * parseFloat(coeff.value || '1');
                        return;
                    }
                }
                // Handle constants
                else if (node.isConstantNode) {
                    terms.c += currentSign * parseFloat(node.value);
                    return;
                }
                
                // Process operators
                if (node.isOperatorNode) {
                    if (node.op === '+') {
                        node.args.forEach(arg => processNode(arg, currentSign));
                    } else if (node.op === '-') {
                        if (node.args.length === 1) {
                            processNode(node.args[0], -currentSign);
                        } else {
                            processNode(node.args[0], currentSign);
                            for (let i = 1; i < node.args.length; i++) {
                                processNode(node.args[i], -currentSign);
                            }
                        }
                    } else if (node.op === '*') {
                        // For multiplication, we need to handle coefficients
                        let coeff = 1;
                        let hasX = false;
                        let hasX2 = false;
                        
                        for (const arg of node.args) {
                            if (arg.isConstantNode) {
                                coeff *= parseFloat(arg.value);
                            } else if (arg.isSymbolNode && arg.name === 'x') {
                                hasX = true;
                            } else if (arg.isOperatorNode && arg.op === '^' && 
                                     arg.args[0].isSymbolNode && arg.args[0].name === 'x' &&
                                     arg.args[1].isConstantNode && arg.args[1].value === '2') {
                                hasX2 = true;
                            }
                        }
                        
                        if (hasX2) {
                            terms.a += currentSign * coeff;
                        } else if (hasX) {
                            terms.b += currentSign * coeff;
                        } else {
                            terms.c += currentSign * coeff;
                        }
                        return;
                    }
                } else if (node.isParenthesisNode) {
                    processNode(node.content, currentSign);
                    return;
                } else {
                    console.warn('Unhandled node type:', node);
                }
            }
            
            processNode(expr, sign);
            return terms;
        }
        
        // Collect terms from both sides
        const leftTerms = collectTerms(leftExpr, 1);
        const rightTerms = collectTerms(rightExpr, -1);
        
        // Combine terms
        const a = leftTerms.a + rightTerms.a;
        const b = leftTerms.b + rightTerms.b;
        const c = leftTerms.c + rightTerms.c;
        
        // Check if it's actually a quadratic equation
        if (a === 0) {
            if (b === 0) {
                if (c === 0) return 'Infinite solutions (0 = 0)';
                return 'No real solutions (contradiction)';
            }
            // It's a linear equation: bx + c = 0
            const solution = -c / b;
            return `x = ${solution.toFixed(4)} (linear equation)`;
        }
        
        // Calculate discriminant
        const discriminant = b * b - 4 * a * c;
        
        // Format coefficients for display (remove if zero)
        let equationStr = '';
        if (a !== 0) equationStr += `${a === 1 ? '' : a}x²`;
        if (b !== 0) equationStr += `${b > 0 ? ' + ' : ' - '}${Math.abs(b) === 1 ? '' : Math.abs(b)}x`;
        if (c !== 0) equationStr += `${c > 0 ? ' + ' : ' - '}${Math.abs(c)}`;
        equationStr += ' = 0';
        
        // Calculate roots based on discriminant
        if (discriminant > 0) {
            // Two real roots
            const sqrtDiscriminant = Math.sqrt(discriminant);
            const x1 = (-b + sqrtDiscriminant) / (2 * a);
            const x2 = (-b - sqrtDiscriminant) / (2 * a);
            
            return `Equation: ${equationStr}\n` +
                   `Discriminant: ${discriminant} (positive, two real roots)\n` +
                   `x₁ = ${x1.toFixed(4)}\n` +
                   `x₂ = ${x2.toFixed(4)}`;
                    
        } else if (discriminant === 0) {
            // One real root (double root)
            const x = -b / (2 * a);
            return `Equation: ${equationStr}\n` +
                   `Discriminant: 0 (one real double root)\n` +
                   `x = ${x.toFixed(4)}`;
                    
        } else {
            // Complex roots
            const realPart = -b / (2 * a);
            const imaginaryPart = Math.sqrt(-discriminant) / (2 * a);
            
            return `Equation: ${equationStr}\n` +
                   `Discriminant: ${discriminant} (negative, complex roots)\n` +
                   `x₁ = ${realPart.toFixed(4)} + ${Math.abs(imaginaryPart).toFixed(4)}i\n` +
                   `x₂ = ${realPart.toFixed(4)} - ${Math.abs(imaginaryPart).toFixed(4)}i`;
        }
        
    } catch (error) {
        console.error('Error solving quadratic equation:', error);
        throw new Error('Could not solve the quadratic equation. Make sure it is in the form ax² + bx + c = 0');
    }
}

// Solve cubic equation (ax³ + bx² + cx + d = 0)
function solveCubicEquation(leftSide, rightSide) {
    // Move all terms to the left side: ax³ + bx² + cx + d = 0
    const equation = `${leftSide} - (${rightSide})`;
    
    try {
        // Use math.js to find the roots
        const node = math.parse(equation);
        const x = math.polynomialRoot(...node.coefficients);
        
        // Format the roots
        const roots = x.map((root, index) => {
            // Format complex numbers
            if (math.isComplex(root)) {
                return `x${index + 1} = ${root.re.toFixed(4)} + ${root.im.toFixed(4)}i`;
            }
            return `x${index + 1} = ${root.toFixed(4)}`;
        }).join(', ');
        
        return roots;
        
    } catch (error) {
        console.error('Error solving cubic equation:', error);
        throw new Error('Could not solve the cubic equation. Make sure it is a valid cubic equation.');
    }
}

// Initialize when the DOM is fully loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initEquationSolver);
} else {
    initEquationSolver();
}

// Export functions for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initEquationSolver,
        solveCurrentEquation,
        solveLinearEquation,
        solveQuadraticEquation,
        solveCubicEquation
    };
}
