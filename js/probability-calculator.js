// Probability Calculator Functions
document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing Probability Calculator...');
    
    // Get DOM elements
    const probabilityType = document.getElementById('probability-type');
    const calculateBtn = document.getElementById('calculate-probability');
    const resultDisplay = document.getElementById('probability-result');
    
    // Show/hide input fields based on probability type
    function updateInputFields() {
        const type = probabilityType.value;
        
        // Hide all input groups first
        document.querySelectorAll('.probability-inputs > div').forEach(div => {
            div.style.display = 'none';
        });
        
        // Show the selected input group
        const selectedGroup = document.querySelector(`.${type}-probability`);
        if (selectedGroup) {
            selectedGroup.style.display = 'block';
        }
        
        // Clear previous results
        if (resultDisplay) {
            resultDisplay.innerHTML = '';
        }
    }
    
    // Calculate basic probability
    function calculateBasicProbability() {
        const favorable = parseFloat(document.getElementById('favorable-outcomes').value);
        const total = parseFloat(document.getElementById('total-outcomes').value);
        
        if (isNaN(favorable) || isNaN(total) || total <= 0) {
            throw new Error('Please enter valid numbers for outcomes');
        }
        
        if (favorable < 0 || favorable > total) {
            throw new Error('Favorable outcomes must be between 0 and total outcomes');
        }
        
        const probability = favorable / total;
        return {
            result: probability,
            details: `P = Favorable / Total = ${favorable} / ${total} = ${probability.toFixed(4)}`
        };
    }
    
    // Calculate conditional probability
    function calculateConditionalProbability() {
        const pA = parseFloat(document.getElementById('p-a').value);
        const pBGivenA = parseFloat(document.getElementById('p-b-given-a').value);
        
        if (isNaN(pA) || isNaN(pBGivenA)) {
            throw new Error('Please enter valid probabilities');
        }
        
        if (pA < 0 || pA > 1 || pBGivenA < 0 || pBGivenA > 1) {
            throw new Error('Probabilities must be between 0 and 1');
        }
        
        const pAandB = pA * pBGivenA;
        return {
            result: pAandB,
            details: `P(A and B) = P(A) * P(B|A) = ${pA} * ${pBGivenA} = ${pAandB.toFixed(4)}`
        };
    }
    
    // Calculate binomial probability
    function calculateBinomialProbability() {
        const n = parseInt(document.getElementById('n-trials').value);
        const k = parseInt(document.getElementById('k-successes').value);
        const p = parseFloat(document.getElementById('p-success').value);
        
        if (isNaN(n) || isNaN(k) || isNaN(p)) {
            throw new Error('Please enter valid numbers');
        }
        
        if (n < 1 || k < 0 || k > n || p < 0 || p > 1) {
            throw new Error('Invalid input values');
        }
        
        // Calculate combination: C(n, k) = n! / (k! * (n-k)!)
        const combination = combinationCoefficient(n, k);
        const probability = combination * Math.pow(p, k) * Math.pow(1 - p, n - k);
        
        return {
            result: probability,
            details: `P(X = ${k}) = C(${n}, ${k}) * ${p}^${k} * (1-${p})^${n-k} = ${probability.toFixed(6)}`
        };
    }
    
    // Calculate normal distribution probability
    function calculateNormalProbability() {
        const mean = parseFloat(document.getElementById('mean').value);
        const stdDev = parseFloat(document.getElementById('std-dev').value);
        const x = parseFloat(document.getElementById('x-value').value);
        
        if (isNaN(mean) || isNaN(stdDev) || isNaN(x)) {
            throw new Error('Please enter valid numbers');
        }
        
        if (stdDev <= 0) {
            throw new Error('Standard deviation must be greater than 0');
        }
        
        // Calculate Z-score
        const zScore = (x - mean) / stdDev;
        // Calculate cumulative probability using the error function approximation
        const probability = 0.5 * (1 + erf(zScore / Math.sqrt(2)));
        
        return {
            result: probability,
            details: `P(X ≤ ${x}) = Φ((${x} - ${mean}) / ${stdDev}) = Φ(${zScore.toFixed(4)}) = ${probability.toFixed(6)}`
        };
    }
    
    // Calculate Poisson probability
    function calculatePoissonProbability() {
        const lambda = parseFloat(document.getElementById('lambda').value);
        const k = parseInt(document.getElementById('k-events').value);
        
        if (isNaN(lambda) || isNaN(k)) {
            throw new Error('Please enter valid numbers');
        }
        
        if (lambda <= 0 || k < 0) {
            throw new Error('Invalid input values');
        }
        
        // P(X = k) = (e^-λ * λ^k) / k!
        const probability = (Math.exp(-lambda) * Math.pow(lambda, k)) / factorial(k);
        
        return {
            result: probability,
            details: `P(X = ${k}) = (e^-${lambda} * ${lambda}^${k}) / ${k}! = ${probability.toFixed(6)}`
        };
    }
    
    // Helper function: Factorial
    function factorial(n) {
        if (n <= 1) return 1;
        let result = 1;
        for (let i = 2; i <= n; i++) {
            result *= i;
        }
        return result;
    }
    
    // Helper function: Combination coefficient (n choose k)
    function combinationCoefficient(n, k) {
        if (k < 0 || k > n) return 0;
        if (k === 0 || k === n) return 1;
        k = Math.min(k, n - k);
        let result = 1;
        for (let i = 1; i <= k; i++) {
            result = result * (n - k + i) / i;
        }
        return Math.round(result);
    }
    
    // Error function approximation
    function erf(x) {
        // Constants
        const a1 =  0.254829592;
        const a2 = -0.284496736;
        const a3 =  1.421413741;
        const a4 = -1.453152027;
        const a5 =  1.061405429;
        const p  =  0.3275911;

        // Save the sign of x
        const sign = x < 0 ? -1 : 1;
        x = Math.abs(x);

        // A&S formula 7.1.26
        const t = 1.0 / (1.0 + p * x);
        const y = 1.0 - ((((a5 * t + a4) * t + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);

        return sign * y;
    }
    
    // Main calculation function
    function calculateProbability() {
        try {
            const type = probabilityType.value;
            let result;
            
            switch (type) {
                case 'basic':
                    result = calculateBasicProbability();
                    break;
                case 'conditional':
                    result = calculateConditionalProbability();
                    break;
                case 'binomial':
                    result = calculateBinomialProbability();
                    break;
                case 'normal':
                    result = calculateNormalProbability();
                    break;
                case 'poisson':
                    result = calculatePoissonProbability();
                    break;
                default:
                    throw new Error('Invalid probability type');
            }
            
            // Display the result
            resultDisplay.innerHTML = `
                <div class="result-summary">
                    <h4>${type.charAt(0).toUpperCase() + type.slice(1)} Probability</h4>
                    <p><strong>Result:</strong> ${result.result.toFixed(6)}</p>
                    <p><strong>Calculation:</strong> ${result.details}</p>
                </div>
            `;
            resultDisplay.style.display = 'block';
            
        } catch (error) {
            console.error('Probability Calculation Error:', error);
            resultDisplay.innerHTML = `<div class="error-message">Error: ${error.message}</div>`;
            resultDisplay.style.display = 'block';
        }
    }
    
    // Event Listeners
    if (probabilityType) {
        probabilityType.addEventListener('change', updateInputFields);
    }
    
    if (calculateBtn) {
        calculateBtn.addEventListener('click', calculateProbability);
    }
    
    // Initialize the calculator by showing the default input group
    updateInputFields();
    
    // Also handle Enter key in input fields
    document.querySelectorAll('#probability-calculator input').forEach(input => {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                calculateProbability();
            }
        });
    });
    
    // Initialize the input fields
    updateInputFields();
    console.log('Probability Calculator initialized');
});
