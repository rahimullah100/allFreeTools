// document.addEventListener('DOMContentLoaded', function() {
//     // Get DOM elements
//     const matrixOperation = document.getElementById('matrix-operation');
//     const matrixA = document.getElementById('matrix-a');
//     const matrixB = document.getElementById('matrix-b');
//     const matrixResult = document.getElementById('matrix-result');
//     const calculateBtn = document.getElementById('calculate-matrix');
//     const clearBtn = document.getElementById('clear-matrix');
//     const matrixOperator = document.getElementById('matrix-operator');
    
//     // Initialize matrices
//     let matrixAData = createMatrix(2, 2);
//     let matrixBData = createMatrix(2, 2);
    
//     // Initialize the matrix UI
//     updateMatrixUI('a', 2, 2);
//     updateMatrixUI('b', 2, 2);
    
//     // Update operator symbol when operation changes
//     matrixOperation.addEventListener('change', function() {
//         const operation = matrixOperation.value;
//         const operatorMap = {
//             'add': '+',
//             'subtract': '−',
//             'multiply': '×'
//         };
//         matrixOperator.textContent = operatorMap[operation] || '+';
//     });
    
//     // Handle dimension changes for Matrix A
//     document.querySelectorAll('.matrix-rows[data-matrix="a"], .matrix-cols[data-matrix="a"]').forEach(select => {
//         select.addEventListener('change', () => {
//             const rows = parseInt(document.querySelector('.matrix-rows[data-matrix="a"]').value);
//             const cols = parseInt(document.querySelector('.matrix-cols[data-matrix="a"]').value);
//             updateMatrixUI('a', rows, cols);
//             matrixAData = createMatrix(rows, cols);
//         });
//     });
    
//     // Handle dimension changes for Matrix B
//     document.querySelectorAll('.matrix-rows[data-matrix="b"], .matrix-cols[data-matrix="b"]').forEach(select => {
//         select.addEventListener('change', () => {
//             const rows = parseInt(document.querySelector('.matrix-rows[data-matrix="b"]').value);
//             const cols = parseInt(document.querySelector('.matrix-cols[data-matrix="b"]').value);
//             updateMatrixUI('b', rows, cols);
//             matrixBData = createMatrix(rows, cols);
//         });
//     });
    
//     // Handle calculate button click
//     calculateBtn.addEventListener('click', calculateMatrices);
    
//     // Handle clear button click
//     clearBtn.addEventListener('click', clearMatrices);
    
//     // Initialize the operator symbol
//     matrixOperation.dispatchEvent(new Event('change'));
    
//     // Function to create a matrix with given dimensions
//     function createMatrix(rows, cols) {
//         return Array(rows).fill().map(() => Array(cols).fill(0));
//     }
    
//     // Function to update the matrix UI
//     function updateMatrixUI(matrixId, rows, cols) {
//         const matrixElement = document.getElementById(`matrix-${matrixId}`);
//         const oldRows = matrixElement.children.length;
//         const oldCols = oldRows > 0 ? matrixElement.children[0].children.length : 0;
        
//         // Get current values before clearing
//         const oldValues = [];
//         for (let i = 0; i < oldRows; i++) {
//             oldValues[i] = [];
//             for (let j = 0; j < oldCols; j++) {
//                 const cell = matrixElement.children[i]?.children[j];
//                 oldValues[i][j] = cell ? parseFloat(cell.value) || 0 : 0;
//             }
//         }
        
//         // Clear the matrix
//         matrixElement.innerHTML = '';
        
//         // Create new rows and cells
//         for (let i = 0; i < rows; i++) {
//             const row = document.createElement('div');
//             row.className = 'matrix-row';
            
//             for (let j = 0; j < cols; j++) {
//                 const cell = document.createElement('input');
//                 cell.type = 'number';
//                 cell.className = 'matrix-cell';
//                 cell.style.color = 'black';
                
//                 // Try to preserve old value if it exists
//                 const value = (i < oldRows && j < oldCols) ? oldValues[i][j] : 0;
//                 cell.value = value === 0 ? '' : value;
                
//                 cell.dataset.row = i;
//                 cell.dataset.col = j;
                
//                 // Handle input
//                 cell.addEventListener('input', (e) => {
//                     const row = parseInt(e.target.dataset.row);
//                     const col = parseInt(e.target.dataset.col);
//                     const value = e.target.value === '' ? 0 : parseFloat(e.target.value) || 0;
                    
//                     if (matrixId === 'a') {
//                         matrixAData[row] = matrixAData[row] || [];
//                         matrixAData[row][col] = value;
//                     } else {
//                         matrixBData[row] = matrixBData[row] || [];
//                         matrixBData[row][col] = value;
//                     }
//                 });
                
//                 row.appendChild(cell);
//             }
            
//             matrixElement.appendChild(row);
//         }
//     }
    
//     // Function to perform matrix calculations
//     function calculateMatrices() {
//         try {
//             const operation = matrixOperation.value;
//             let result;
            
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
//             matrixResult.innerHTML = `<div class="error">Error: ${error.message}</div>`;
//         }
//     }
    
//     // Function to add two matrices
//     function addMatrices(a, b) {
//         if (a.length !== b.length || a[0].length !== b[0].length) {
//             throw new Error('Matrices must have the same dimensions for addition');
//         }
        
//         return a.map((row, i) => 
//             row.map((val, j) => val + b[i][j])
//         );
//     }
    
//     // Function to subtract two matrices
//     function subtractMatrices(a, b) {
//         if (a.length !== b.length || a[0].length !== b[0].length) {
//             throw new Error('Matrices must have the same dimensions for subtraction');
//         }
        
//         return a.map((row, i) => 
//             row.map((val, j) => val - b[i][j])
//         );
//     }
    
//     // Function to multiply two matrices
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
    
//     // Function to display the result
//     function displayResult(result) {
//         const resultContainer = document.createElement('div');
//         resultContainer.className = 'matrix-result-container';
        
//         const resultTitle = document.createElement('h4');
//         resultTitle.textContent = 'Result';
//         resultContainer.appendChild(resultTitle);
        
//         const resultMatrix = document.createElement('div');
//         resultMatrix.className = 'matrix-grid';
        
//         result.forEach(row => {
//             const rowElement = document.createElement('div');
//             rowElement.className = 'matrix-row';
            
//             row.forEach(cell => {
//                 const cellElement = document.createElement('div');
//                 cellElement.className = 'matrix-cell';
//                 cellElement.textContent = Number.isInteger(cell) ? cell : cell.toFixed(2);
//                 rowElement.appendChild(cellElement);
//             });
            
//             resultMatrix.appendChild(rowElement);
//         });
        
//         resultContainer.appendChild(resultMatrix);
        
//         // Clear previous result and add new one
//         matrixResult.innerHTML = '';
//         matrixResult.appendChild(resultContainer);
//     }
    
//     // Function to clear all matrices
//     function clearMatrices() {
//         // Reset matrix data
//         const rowsA = matrixAData.length;
//         const colsA = matrixAData[0].length;
//         const rowsB = matrixBData.length;
//         const colsB = matrixBData[0].length;
        
//         matrixAData = createMatrix(rowsA, colsA);
//         matrixBData = createMatrix(rowsB, colsB);
        
//         // Reset UI
//         updateMatrixUI('a', rowsA, colsA);
//         updateMatrixUI('b', rowsB, colsB);
        
//         // Clear result
//         matrixResult.innerHTML = '';
//     }
// });
