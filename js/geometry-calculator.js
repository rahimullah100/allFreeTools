// Geometry Calculator Functions
document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing Geometry Calculator...');
    
    // Get DOM elements
    const shapeSelect = document.getElementById('geometry-shape');
    const calculateBtn = document.getElementById('calculate-geometry');
    const resultDisplay = document.getElementById('geometry-result');
    
    // Show/hide input fields based on selected shape
    function updateInputFields() {
        const shape = shapeSelect.value;
        
        // Hide all input groups first
        document.querySelectorAll('.geometry-inputs > div').forEach(div => {
            div.style.display = 'none';
        });
        
        // Show the selected shape's input group
        const selectedGroup = document.querySelector(`.${shape}-inputs`);
        if (selectedGroup) {
            selectedGroup.style.display = 'block';
        }
        
        // Clear previous results
        if (resultDisplay) {
            resultDisplay.innerHTML = '';
        }
    }
    
    // Calculate circle properties
    function calculateCircle() {
        const radius = parseFloat(document.getElementById('radius').value);
        
        if (isNaN(radius) || radius <= 0) {
            throw new Error('Please enter a valid radius');
        }
        
        const area = Math.PI * radius * radius;
        const circumference = 2 * Math.PI * radius;
        
        return {
            area: area.toFixed(4),
            perimeter: circumference.toFixed(4),
            details: `
                <p><strong>Area:</strong> π × r² = π × ${radius}² = ${area.toFixed(4)}</p>
                <p><strong>Circumference:</strong> 2 × π × r = 2 × π × ${radius} = ${circumference.toFixed(4)}</p>
            `
        };
    }
    
    // Calculate rectangle properties
    function calculateRectangle() {
        const length = parseFloat(document.getElementById('length').value);
        const width = parseFloat(document.getElementById('width').value);
        
        if (isNaN(length) || isNaN(width) || length <= 0 || width <= 0) {
            throw new Error('Please enter valid length and width');
        }
        
        const area = length * width;
        const perimeter = 2 * (length + width);
        
        return {
            area: area.toFixed(4),
            perimeter: perimeter.toFixed(4),
            details: `
                <p><strong>Area:</strong> length × width = ${length} × ${width} = ${area.toFixed(4)}</p>
                <p><strong>Perimeter:</strong> 2 × (length + width) = 2 × (${length} + ${width}) = ${perimeter.toFixed(4)}</p>
            `
        };
    }
    
    // Calculate triangle properties
    function calculateTriangle() {
        const base = parseFloat(document.getElementById('base').value);
        const height = parseFloat(document.getElementById('height').value);
        const sideA = parseFloat(document.getElementById('side-a').value);
        const sideB = parseFloat(document.getElementById('side-b').value);
        const sideC = parseFloat(document.getElementById('side-c').value);
        
        if (isNaN(base) || base <= 0 || isNaN(height) || height <= 0 || 
            isNaN(sideA) || sideA <= 0 || isNaN(sideB) || sideB <= 0 || isNaN(sideC) || sideC <= 0) {
            throw new Error('Please enter all valid side lengths and height');
        }
        
        const area = 0.5 * base * height;
        const perimeter = sideA + sideB + sideC;
        
        // Heron's formula for area (as an alternative)
        const s = perimeter / 2;
        const heronArea = Math.sqrt(s * (s - sideA) * (s - sideB) * (s - sideC));
        
        return {
            area: area.toFixed(4),
            perimeter: perimeter.toFixed(4),
            details: `
                <p><strong>Area (1/2 × base × height):</strong> 0.5 × ${base} × ${height} = ${area.toFixed(4)}</p>
                <p><strong>Area (Heron's formula):</strong> ${heronArea.toFixed(4)}</p>
                <p><strong>Perimeter:</strong> a + b + c = ${sideA} + ${sideB} + ${sideC} = ${perimeter.toFixed(4)}</p>
            `
        };
    }
    
    // Calculate square properties
    function calculateSquare() {
        const side = parseFloat(document.getElementById('side').value);
        
        if (isNaN(side) || side <= 0) {
            throw new Error('Please enter a valid side length');
        }
        
        const area = side * side;
        const perimeter = 4 * side;
        
        return {
            area: area.toFixed(4),
            perimeter: perimeter.toFixed(4),
            details: `
                <p><strong>Area:</strong> side² = ${side}² = ${area.toFixed(4)}</p>
                <p><strong>Perimeter:</strong> 4 × side = 4 × ${side} = ${perimeter.toFixed(4)}</p>
            `
        };
    }
    
    // Calculate parallelogram properties
    function calculateParallelogram() {
        const base = parseFloat(document.getElementById('base-par').value);
        const height = parseFloat(document.getElementById('height-par').value);
        
        if (isNaN(base) || base <= 0 || isNaN(height) || height <= 0) {
            throw new Error('Please enter valid base and height');
        }
        
        const area = base * height;
        const perimeter = 2 * (base + (height / Math.sin(Math.PI/4))); // Assuming 45° angle for sides
        
        return {
            area: area.toFixed(4),
            perimeter: perimeter.toFixed(4),
            details: `
                <p><strong>Area:</strong> base × height = ${base} × ${height} = ${area.toFixed(4)}</p>
                <p><strong>Perimeter (approximate):</strong> ${perimeter.toFixed(4)} (assuming 45° angles)</p>
            `
        };
    }
    
    // Calculate trapezoid properties
    function calculateTrapezoid() {
        const base1 = parseFloat(document.getElementById('base1').value);
        const base2 = parseFloat(document.getElementById('base2').value);
        const height = parseFloat(document.getElementById('height-trap').value);
        
        if (isNaN(base1) || base1 <= 0 || isNaN(base2) || base2 <= 0 || isNaN(height) || height <= 0) {
            throw new Error('Please enter valid base lengths and height');
        }
        
        const area = 0.5 * (base1 + base2) * height;
        const sideA = Math.sqrt(Math.pow((base1 - base2) / 2, 2) + Math.pow(height, 2));
        const perimeter = base1 + base2 + 2 * sideA;
        
        return {
            area: area.toFixed(4),
            perimeter: perimeter.toFixed(4),
            details: `
                <p><strong>Area:</strong> 1/2 × (base1 + base2) × height = 0.5 × (${base1} + ${base2}) × ${height} = ${area.toFixed(4)}</p>
                <p><strong>Perimeter (approximate):</strong> ${perimeter.toFixed(4)}</p>
            `
        };
    }
    
    // Calculate sphere properties
    function calculateSphere() {
        const radius = parseFloat(document.getElementById('radius-sphere').value);
        
        if (isNaN(radius) || radius <= 0) {
            throw new Error('Please enter a valid radius');
        }
        
        const surfaceArea = 4 * Math.PI * radius * radius;
        const volume = (4/3) * Math.PI * Math.pow(radius, 3);
        
        return {
            surfaceArea: surfaceArea.toFixed(4),
            volume: volume.toFixed(4),
            details: `
                <p><strong>Surface Area:</strong> 4πr² = 4 × π × ${radius}² = ${surfaceArea.toFixed(4)}</p>
                <p><strong>Volume:</strong> (4/3)πr³ = (4/3) × π × ${radius}³ = ${volume.toFixed(4)}</p>
            `
        };
    }
    
    // Calculate cube properties
    function calculateCube() {
        const edge = parseFloat(document.getElementById('edge').value);
        
        if (isNaN(edge) || edge <= 0) {
            throw new Error('Please enter a valid edge length');
        }
        
        const surfaceArea = 6 * edge * edge;
        const volume = Math.pow(edge, 3);
        
        return {
            surfaceArea: surfaceArea.toFixed(4),
            volume: volume.toFixed(4),
            details: `
                <p><strong>Surface Area:</strong> 6 × edge² = 6 × ${edge}² = ${surfaceArea.toFixed(4)}</p>
                <p><strong>Volume:</strong> edge³ = ${edge}³ = ${volume.toFixed(4)}</p>
            `
        };
    }
    
    // Calculate cylinder properties
    function calculateCylinder() {
        const radius = parseFloat(document.getElementById('radius-cyl').value);
        const height = parseFloat(document.getElementById('height-cyl').value);
        
        if (isNaN(radius) || radius <= 0 || isNaN(height) || height <= 0) {
            throw new Error('Please enter valid radius and height');
        }
        
        const baseArea = Math.PI * radius * radius;
        const lateralArea = 2 * Math.PI * radius * height;
        const totalArea = 2 * baseArea + lateralArea;
        const volume = baseArea * height;
        
        return {
            surfaceArea: totalArea.toFixed(4),
            volume: volume.toFixed(4),
            details: `
                <p><strong>Base Area:</strong> πr² = π × ${radius}² = ${baseArea.toFixed(4)}</p>
                <p><strong>Lateral Area:</strong> 2πrh = 2 × π × ${radius} × ${height} = ${lateralArea.toFixed(4)}</p>
                <p><strong>Total Surface Area:</strong> 2πr² + 2πrh = ${totalArea.toFixed(4)}</p>
                <p><strong>Volume:</strong> πr²h = π × ${radius}² × ${height} = ${volume.toFixed(4)}</p>
            `
        };
    }
    
    // Calculate cone properties
    function calculateCone() {
        const radius = parseFloat(document.getElementById('radius-cone').value);
        const height = parseFloat(document.getElementById('height-cone').value);
        
        if (isNaN(radius) || radius <= 0 || isNaN(height) || height <= 0) {
            throw new Error('Please enter valid radius and height');
        }
        
        const slantHeight = Math.sqrt(radius * radius + height * height);
        const baseArea = Math.PI * radius * radius;
        const lateralArea = Math.PI * radius * slantHeight;
        const totalArea = baseArea + lateralArea;
        const volume = (1/3) * baseArea * height;
        
        return {
            surfaceArea: totalArea.toFixed(4),
            volume: volume.toFixed(4),
            details: `
                <p><strong>Slant Height:</strong> √(r² + h²) = √(${radius}² + ${height}²) = ${slantHeight.toFixed(4)}</p>
                <p><strong>Base Area:</strong> πr² = π × ${radius}² = ${baseArea.toFixed(4)}</p>
                <p><strong>Lateral Area:</strong> πrl = π × ${radius} × ${slantHeight.toFixed(4)} = ${lateralArea.toFixed(4)}</p>
                <p><strong>Total Surface Area:</strong> πr² + πrl = ${totalArea.toFixed(4)}</p>
                <p><strong>Volume:</strong> (1/3)πr²h = (1/3) × π × ${radius}² × ${height} = ${volume.toFixed(4)}</p>
            `
        };
    }
    
    // Main calculation function
    function calculateGeometry() {
        try {
            const shape = shapeSelect.value;
            let result;
            
            switch (shape) {
                case 'circle':
                    result = calculateCircle();
                    break;
                case 'rectangle':
                    result = calculateRectangle();
                    break;
                case 'triangle':
                    result = calculateTriangle();
                    break;
                case 'square':
                    result = calculateSquare();
                    break;
                case 'parallelogram':
                    result = calculateParallelogram();
                    break;
                case 'trapezoid':
                    result = calculateTrapezoid();
                    break;
                case 'sphere':
                    result = calculateSphere();
                    break;
                case 'cube':
                    result = calculateCube();
                    break;
                case 'cylinder':
                    result = calculateCylinder();
                    break;
                case 'cone':
                    result = calculateCone();
                    break;
                default:
                    throw new Error('Selected shape not implemented yet');
            }
            
            // Display results
            if (resultDisplay) {
                resultDisplay.innerHTML = `
                    <div class="result-summary">
                        <h4>Results for ${shape.charAt(0).toUpperCase() + shape.slice(1)}</h4>
                        ${result.details}
                        ${result.area ? `<p><strong>Area:</strong> ${result.area}</p>` : ''}
                        ${result.perimeter ? `<p><strong>Perimeter:</strong> ${result.perimeter}</p>` : ''}
                        ${result.surfaceArea ? `<p><strong>Surface Area:</strong> ${result.surfaceArea}</p>` : ''}
                        ${result.volume ? `<p><strong>Volume:</strong> ${result.volume}</p>` : ''}
                    </div>
                `;
            }
            
        } catch (error) {
            console.error('Geometry Calculation Error:', error);
            if (resultDisplay) {
                resultDisplay.innerHTML = `<div class="error-message">Error: ${error.message}</div>`;
            }
        }
    }
    
    // Event Listeners
    if (shapeSelect) {
        shapeSelect.addEventListener('change', updateInputFields);
    }
    
    if (calculateBtn) {
        calculateBtn.addEventListener('click', calculateGeometry);
    }
    
    // Also handle Enter key in input fields
    document.querySelectorAll('#geometry-calculator input').forEach(input => {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                calculateGeometry();
            }
        });
    });
    
    // Initialize the calculator by showing the default input group
    updateInputFields();
});
