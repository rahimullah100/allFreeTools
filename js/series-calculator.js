// Series Calculator Functions
function calculateArithmeticSeriesSum(firstTerm, commonDiff, numTerms) {
    if (numTerms <= 0) return 0;
    return (numTerms / 2) * (2 * firstTerm + (numTerms - 1) * commonDiff);
}

function calculateGeometricSeriesSum(firstTerm, commonRatio, numTerms) {
    if (numTerms <= 0) return 0;
    if (commonRatio === 1) return firstTerm * numTerms;
    return firstTerm * (1 - Math.pow(commonRatio, numTerms)) / (1 - commonRatio);
}

// Track if series calculator is initialized
let isSeriesCalculatorInitialized = false;

// Initialize Series Calculator
function initializeSeriesCalculator() {
    if (isSeriesCalculatorInitialized) {
        console.log('Series Calculator already initialized');
        return;
    }
    
    console.log('Initializing Series Calculator...');
    
    try {
        const calculateBtn = document.getElementById('calculate-series');
        if (!calculateBtn) {
            console.error('Series Calculator button not found');
            return;
        }

        // Remove any existing event listeners
        const newBtn = calculateBtn.cloneNode(true);
        calculateBtn.parentNode.replaceChild(newBtn, calculateBtn);

        // Add click event listener
        newBtn.addEventListener('click', calculateSeries);
        
        // Also handle Enter key in input fields
        const inputFields = document.querySelectorAll('#series-calculator input[type="number"]');
        inputFields.forEach(input => {
            input.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    calculateSeries();
                }
            });
        });
        
        isSeriesCalculatorInitialized = true;
        console.log('Series Calculator initialized successfully');
        
        // Initial calculation if there are values
        if (document.getElementById('series-first-term').value && 
            document.getElementById('series-common-diff').value && 
            document.getElementById('series-terms').value) {
            calculateSeries();
        }
    } catch (error) {
        console.error('Error initializing Series Calculator:', error);
    }
}

function calculateSeries() {
    console.log('Calculating series...');
    
    try {
        // Get input values
        const seriesType = document.getElementById('series-type').value;
        const firstTerm = parseFloat(document.getElementById('series-first-term').value);
        const commonValue = parseFloat(document.getElementById('series-common-diff').value);
        const numTerms = parseInt(document.getElementById('series-terms').value);
        
        console.log('Input values:', { seriesType, firstTerm, commonValue, numTerms });
        
        // Validate inputs
        if (isNaN(firstTerm) || isNaN(commonValue) || isNaN(numTerms)) {
            throw new Error('Please enter valid numbers for all fields');
        }
        
        if (numTerms <= 0) {
            throw new Error('Number of terms must be greater than 0');
        }
        
        // Calculate series based on type
        let sum, formula, typeName;
        
        if (seriesType === 'arithmetic') {
            typeName = 'Arithmetic Series';
            sum = calculateArithmeticSeriesSum(firstTerm, commonValue, numTerms);
            formula = `Sum = n/2 * [2a + (n-1)d]`;
        } else {
            typeName = 'Geometric Series';
            if (commonValue === 1) {
                sum = firstTerm * numTerms; // Special case when common ratio is 1
            } else {
                sum = calculateGeometricSeriesSum(firstTerm, commonValue, numTerms);
            }
            formula = `Sum = a(1 - rⁿ)/(1 - r)`;
        }
        
        // Generate terms for display (up to 10 terms for brevity)
        const terms = [];
        let currentTerm = firstTerm;
        const displayTerms = Math.min(numTerms, 10);
        
        for (let i = 0; i < displayTerms; i++) {
            terms.push(currentTerm);
            currentTerm = seriesType === 'arithmetic' 
                ? currentTerm + commonValue 
                : currentTerm * commonValue;
        }
        
        // Add ellipsis if there are more terms
        const termsDisplay = terms.join(', ') + (numTerms > 10 ? ', ...' : '');
        
        // Display result
        const resultElement = document.getElementById('series-result');
        if (resultElement) {
            resultElement.innerHTML = `
                <div class="result-summary">
                    <h4>${typeName} Results</h4>
                    <p><strong>First Term (a):</strong> ${firstTerm}</p>
                    <p><strong>${seriesType === 'arithmetic' ? 'Common Difference (d)' : 'Common Ratio (r)'}:</strong> ${commonValue}</p>
                    <p><strong>Number of Terms (n):</strong> ${numTerms}</p>
                    <p><strong>Formula:</strong> ${formula}</p>
                    <p><strong>Sum (Sₙ):</strong> ${sum.toFixed(4)}</p>
                </div>
                <div class="series-terms">
                    <p><strong>First ${displayTerms} ${numTerms > 10 ? 'of ' + numTerms : ''} terms:</strong></p>
                    <div class="terms-display">${termsDisplay}</div>
                </div>
            `;
            resultElement.style.display = 'block';
        }
        
    } catch (error) {
        console.error('Series Calculation Error:', error);
        const resultElement = document.getElementById('series-result');
        if (resultElement) {
            resultElement.innerHTML = `<div class="error-message">Error: ${error.message}</div>`;
            resultElement.style.display = 'block';
        }
    }
}

// Initialize when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeSeriesCalculator);
} else {
    // DOM already loaded, initialize immediately
    setTimeout(initializeSeriesCalculator, 100);
}

// Also initialize when the page becomes visible
document.addEventListener('visibilitychange', function() {
    if (document.visibilityState === 'visible') {
        initializeSeriesCalculator();
    }
});
