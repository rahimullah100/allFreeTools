/**
 * Statistics Calculator Module
 * Handles all statistical calculations and UI updates
 */

// Main function to initialize the statistics calculator
document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing Statistics Calculator...');
    
    // Get the calculate button and add event listener
    const calculateBtn = document.getElementById('calculate-statistics');
    const dataInput = document.getElementById('data-input');
    
    if (calculateBtn) {
        calculateBtn.addEventListener('click', handleStatisticsCalculation);
        console.log('Statistics calculator button initialized');
    } else {
        console.error('Calculate statistics button not found');
    }
    
    // Also handle Enter key in the input field
    if (dataInput) {
        dataInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                handleStatisticsCalculation();
            }
        });
    }
    
    // Initialize copy buttons
    setupCopyButtons();
    
    console.log('Statistics calculator initialized');
});

/**
 * Handles the statistics calculation when the button is clicked or Enter is pressed
 */
function handleStatisticsCalculation() {
    try {
        console.log('Handling statistics calculation...');
        const dataInput = document.getElementById('data-input');
        const resultsContainer = document.querySelector('.statistics-results');
        
        if (!dataInput) {
            throw new Error('Data input field not found');
        }
        
        // Get and validate input
        const input = dataInput.value.trim();
        if (!input) {
            throw new Error('Please enter some numbers separated by commas');
        }
        
        // Calculate and display statistics
        const success = calculateStatistics(input);
        
        if (success && resultsContainer) {
            // Scroll to results if they're not fully visible
            resultsContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    } catch (error) {
        console.error('Error in handleStatisticsCalculation:', error);
        showError(error.message);
    }
}

/**
 * Calculates statistics from a comma-separated string of numbers
 * @param {string} data - Comma-separated string of numbers
 * @returns {boolean} True if calculation and display were successful
 */
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

// Helper Functions

/**
 * Calculates the mean (average) of an array of numbers
 * @param {number[]} numbers - Array of numbers
 * @returns {number} The mean value
 */
function calculateMean(numbers) {
    if (!Array.isArray(numbers) || numbers.length === 0) {
        throw new Error('Invalid input: numbers must be a non-empty array');
    }
    return numbers.reduce((sum, num) => sum + num, 0) / numbers.length;
}

/**
 * Calculates the median of an array of numbers
 * @param {number[]} numbers - Array of numbers
 * @returns {number} The median value
 */
function calculateMedian(numbers) {
    if (!Array.isArray(numbers) || numbers.length === 0) {
        throw new Error('Invalid input: numbers must be a non-empty array');
    }
    
    const sorted = [...numbers].sort((a, b) => a - b);
    const middle = Math.floor(sorted.length / 2);
    
    if (sorted.length % 2 === 0) {
        return (sorted[middle - 1] + sorted[middle]) / 2;
    }
    return sorted[middle];
}

/**
 * Calculates the mode(s) of an array of numbers
 * @param {number[]} numbers - Array of numbers
 * @returns {number[]|null} Array of mode(s) or null if no mode exists
 */
function calculateMode(numbers) {
    if (!Array.isArray(numbers) || numbers.length === 0) {
        throw new Error('Invalid input: numbers must be a non-empty array');
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

/**
 * Calculates the variance of an array of numbers
 * @param {number[]} numbers - Array of numbers
 * @param {number} mean - Pre-calculated mean of the numbers
 * @returns {number} The variance
 */
function calculateVariance(numbers, mean) {
    try {
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
    } catch (error) {
        console.error('Variance calculation error:', error);
        throw new Error('Error calculating variance: ' + error.message);
    }
}

/**
 * Formats the mode for display
 * @param {number[]|null} mode - Array of mode values or null
 * @returns {string} Formatted mode string
 */
function formatMode(mode) {
    if (mode === null || mode.length === 0) {
        return 'No mode';
    } else if (mode.length === 1) {
        return mode[0].toString();
    } else {
        return mode.join(', ');
    }
}

/**
 * Sets up copy buttons for copying results to clipboard
 */
function setupCopyButtons() {
    console.log('Setting up copy buttons...');
    document.addEventListener('click', function(event) {
        if (event.target.closest('.copy-btn')) {
            const button = event.target.closest('.copy-btn');
            const targetId = button.getAttribute('data-target');
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const textToCopy = targetElement.textContent.trim();
                
                // Create a temporary textarea element to copy text
                const textarea = document.createElement('textarea');
                textarea.value = textToCopy;
                document.body.appendChild(textarea);
                textarea.select();
                
                try {
                    const successful = document.execCommand('copy');
                    if (successful) {
                        // Show tooltip or feedback
                        const originalTitle = button.getAttribute('title');
                        button.setAttribute('title', 'Copied!');
                        setTimeout(() => {
                            button.setAttribute('title', originalTitle);
                        }, 2000);
                    }
                } catch (err) {
                    console.error('Failed to copy text: ', err);
                }
                
                document.body.removeChild(textarea);
            }
        }
    });
}

/**
 * Displays an error message in the UI
 * @param {string} message - The error message to display
 */
function showError(message) {
    console.error('Showing error:', message);
    const resultsContainer = document.querySelector('.statistics-results');
    if (resultsContainer) {
        resultsContainer.innerHTML = `
            <div class="error">
                <i class="fas fa-exclamation-circle"></i>
                ${message}
            </div>
        `;
        resultsContainer.style.display = 'block';
        resultsContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    } else {
        alert('Error: ' + message);
    }
}

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        calculateMean,
        calculateMedian,
        calculateMode,
        calculateVariance,
        calculateStatistics,
        formatMode
    };
}
