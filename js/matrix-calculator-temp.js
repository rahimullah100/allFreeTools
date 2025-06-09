// // Matrix Calculator
// (function() {
//     // DOM elements
//     let matrixOperation, matrixA, matrixB, matrixResult, calculateBtn, clearBtn, matrixOperator;
    
//     // Matrices data
//     let matrixAData = [];
//     let matrixBData = [];
    
//     // Initialize the calculator
//     function initMatrixCalculator() {
//         console.log('Initializing Matrix Calculator...');
        
//         // Get DOM elements
//         matrixOperation = document.getElementById('matrix-operation');
//         matrixA = document.getElementById('matrix-a');
//         matrixB = document.getElementById('matrix-b');
//         matrixResult = document.getElementById('matrix-result');
//         calculateBtn = document.getElementById('calculate-matrix');
//         clearBtn = document.getElementById('clear-matrix');
//         matrixOperator = document.getElementById('matrix-operator');
        
//         if (!matrixOperation || !matrixA || !matrixB || !matrixResult || !calculateBtn || !clearBtn || !matrixOperator) {
//             console.error('Required DOM elements not found');
//             return;
//         }
        
//         // Initialize the matrix UI
//         initMatrix('a', 2, 2);
//         initMatrix('b', 2, 2);
        
//         // Set up event listeners
//         setupEventListeners();
        
//         // Initialize the operator symbol
//         updateOperatorSymbol();
        
//         console.log('Matrix Calculator initialized successfully');
//     }
    
//     // Set up all event listeners
//     function setupEventListeners() {
//         // Update operator symbol when operation changes
//         matrixOperation.addEventListener('change', updateOperatorSymbol);
        
//         // Handle dimension changes for Matrix A
//         document.querySelectorAll('.matrix-rows[data-matrix="a"], .matrix-cols[data-matrix="a"]').forEach(select => {
//             select.addEventListener('change', () => updateMatrixDimensions('a'));
//         });
        
//         // Handle dimension changes for Matrix B
//         document.querySelectorAll('.matrix-rows[data-matrix="b"], .matrix-cols[data-matrix="b"]').forEach(select => {
//             select.addEventListener('change', () => updateMatrixDimensions('b'));
//         });
        
//         // Handle calculate button click
//         calculateBtn.addEventListener('click', calculateMatrices);
        
//         // Handle clear button click
//         clearBtn.addEventListener('click', clearMatrices);
//     }
    
//     // Update matrix dimensions when selectors change
//     function updateMatrixDimensions(matrixId) {
//         const rows = parseInt(document.querySelector(`.matrix-rows[data-matrix="${matrixId}"]`).value);
//         const cols = parseInt(document.querySelector(`.matrix-cols[data-matrix="${matrixId}"]`).value);
//         initMatrix(matrixId, rows, cols);
//     }
    
//     // Update the operator symbol based on selected operation
//     function updateOperatorSymbol() {
//         const operation = matrixOperation.value;
//         const operatorMap = {
//             'add': '+',
//             'subtract': '−',
//             'multiply': '×'
//         };
//         matrixOperator.textContent = operatorMap[operation] || '+';
//     }
    
//     // Initialize a matrix with the given dimensions
//     function initMatrix(matrixId, rows, cols) {
//         const matrix = [];
//         for (let i = 0; i < rows; i++) {
//             matrix[i] = [];
//             for (let j = 0; j < cols; j++) {
//                 matrix[i][j] = 0;
//             }
//         }
        
//         if (matrixId === 'a') {
//             matrixAData = matrix;
//         } else {
//             matrixBData = matrix;
//         }
        
//         updateMatrixUI(matrixId, rows, cols);
//     }
    
//     // Update the matrix UI based on the data model
//     function updateMatrixUI(matrixId, rows, cols) {
//         const matrixElement = document.getElementById(`matrix-${matrixId}`);
//         if (!matrixElement) return;
        
//         matrixElement.innerHTML = '';
//         const matrixData = matrixId === 'a' ? matrixAData : matrixBData;
        
//         for (let i = 0; i < rows; i++) {
//             const row = document.createElement('div');
//             row.className = 'matrix-row';
            
//             for (let j = 0; j < cols; j++) {
//                 const cell = document.createElement('input');
//                 cell.type = 'number';
//                 cell.className = 'matrix-cell';
//                 cell.style.color = 'black';
//                 cell.value = matrixData[i]?.[j] || '0';
//                 cell.dataset.row = i;
//                 cell.dataset.col = j;
                
//                 cell.addEventListener('input', (e) => {
//                     const row = parseInt(e.target.dataset.row);
//                     const col = parseInt(e.target.dataset.col);
//                     const value = e.target.value;
                    
//                     // Update the data model
//                     if (matrixId === 'a') {
//                         if (!matrixAData[row]) matrixAData[row] = [];
//                         matrixAData[row][col] = value === '' ? 0 : parseFloat(value) || 0;
//                     } else {
//                         if (!matrixBData[row]) matrixBData[row] = [];
//                         matrixBData[row][col] = value === '' ? 0 : parseFloat(value) || 0;
//                     }
//                 });
                
//                 row.appendChild(cell);
//             }
            
//             matrixElement.appendChild(row);
//         }
//     }
    
//     // Calculate matrices based on selected operation
//     function calculateMatrices() {
//         try {
//             if (!matrixOperation || !matrixResult) return;
            
//             const operation = matrixOperation.value;
//             let result;
            
//             // Ensure data is up to date
//             updateMatrixDataFromInputs('a');
//             updateMatrixDataFromInputs('b');
            
//             switch (operation) {
//                 case 'add':
//                     result = addMatrices(matrixAData, matrixBData);
//                     break;
//                 case 'subtract':
//                     result = subtractMatrices(matrixAData, matrixBData);
//                     break;
//                 case 'multiply':
//                     result = multiplyMatrices(matrixAData, matrixBData);
//                     break;
//                 default:
//                     throw new Error('Invalid operation');
//             }
            
//             displayResult(result);
//         } catch (error) {
//             console.error('Matrix calculation error:', error);
//             if (matrixResult) {
//                 matrixResult.innerHTML = `<div class="error">Error: ${error.message}</div>`;
//             }
//         }
//     }
    
//     // Update matrix data from input values
//     function updateMatrixDataFromInputs(matrixId) {
//         const matrixElement = document.getElementById(`matrix-${matrixId}`);
//         if (!matrixElement) return;
        
//         const rows = matrixElement.children.length;
//         const cols = rows > 0 ? matrixElement.children[0].children.length : 0;
//         const matrixData = [];
        
//         for (let i = 0; i < rows; i++) {
//             matrixData[i] = [];
//             const row = matrixElement.children[i];
//             for (let j = 0; j < cols; j++) {
//                 const cell = row.children[j];
//                 matrixData[i][j] = parseFloat(cell.value) || 0;
//             }
//         }
        
//         if (matrixId === 'a') {
//             matrixAData = matrixData;
//         } else {
//             matrixBData = matrixData;
//         }
//     }
    
//     // Add two matrices
//     function addMatrices(a, b) {
//         if (a.length !== b.length || a[0].length !== b[0].length) {
//             throw new Error('Matrices must have the same dimensions for addition');
//         }
        
//         return a.map((row, i) => 
//             row.map((val, j) => val + b[i][j])
//         );
//     }
    
//     // Subtract matrix b from matrix a
//     function subtractMatrices(a, b) {
//         if (a.length !== b.length || a[0].length !== b[0].length) {
//             throw new Error('Matrices must have the same dimensions for subtraction');
//         }
        
//         return a.map((row, i) => 
//             row.map((val, j) => val - b[i][j])
//         );
//     }
    
//     // Multiply two matrices
//     function multiplyMatrices(a, b) {
//         if (a[0].length !== b.length) {
//             throw new Error('Number of columns in Matrix A must match number of rows in Matrix B for multiplication');
//         }
        
//         const result = [];
//         for (let i = 0; i < a.length; i++) {
//             result[i] = [];
//             for (let j = 0; j < b[0].length; j++) {
//                 let sum = 0;
//                 for (let k = 0; k < a[0].length; k++) {
//                     sum += a[i][k] * b[k][j];
//                 }
//                 result[i][j] = sum;
//             }
//         }
//         return result;
//     }
    
//     // Display the result
//     function displayResult(result) {
//         if (!matrixResult) return;
        
//         let html = '<div class="matrix-result">';
//         html += '<h4>Result:</h4>';
//         html += '<div class="matrix-grid">';
        
//         result.forEach(row => {
//             html += '<div class="matrix-row">';
//             row.forEach(cell => {
//                 html += `<div class="matrix-cell">${cell.toFixed(2)}</div>`;
//             });
//             html += '</div>';
//         });
        
//         html += '</div></div>';
//         matrixResult.innerHTML = html;
//     }
    
//     // Clear all matrices
//     function clearMatrices() {
//         // Reset matrices to 2x2
//         initMatrix('a', 2, 2);
//         initMatrix('b', 2, 2);
        
//         // Reset operation to addition
//         if (matrixOperation) {
//             matrixOperation.value = 'add';
//             updateOperatorSymbol();
//         }
        
//         // Clear result
//         if (matrixResult) {
//             matrixResult.innerHTML = '';
//         }
//     }
    
//     // Initialize when DOM is loaded
//     document.addEventListener('DOMContentLoaded', initMatrixCalculator);
// })();
