// Initialize tools visibility and input heights
document.addEventListener('DOMContentLoaded', function() {
    const quickNavLinks = document.querySelectorAll('.quick-nav-links a');
    const toolCards = document.querySelectorAll('.tool-card');

    // Hide all tool cards except the first one
    toolCards.forEach((card, index) => {
        if (index !== 0) {
            card.style.display = 'none';
        }
    });

    // Handle quick navigation clicks
    quickNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            quickNavLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Get target tool card
            const targetId = this.getAttribute('href').substring(1);
            
            // Hide all tool cards
            toolCards.forEach(card => {
                card.style.display = 'none';
            });
            
            // Show target tool card
            document.getElementById(targetId).style.display = 'block';
        });
    });

    // Set consistent height for all textareas
    const textareas = document.querySelectorAll('textarea');
    textareas.forEach(textarea => {
        textarea.style.height = '150px';
        textarea.style.minHeight = '150px';
        textarea.style.maxHeight = '150px';
    });

    // Initialize all tools
    initializeJsonFormatter();
    initJsonDiff();
    initUuidGenerator();
    initHashGenerator();
    initTimestampConverter();
    initLoremIpsum();
    initRegexTester();
    initUrlEncoder();
    initBase64Converter();

    // Show JSON Formatter by default
    const jsonFormatter = document.getElementById('json-formatter');
    if (jsonFormatter) {
        jsonFormatter.style.display = 'block';
        // Set active state for JSON Formatter in Quick Navigation
        const jsonNavLink = document.querySelector('a[href="#json-formatter"]');
        if (jsonNavLink) {
            jsonNavLink.classList.add('active');
        }
    }

    // Initialize all tool functionalities
    initializeUUIDGenerator();
    initializeHashGenerator();
    initializeTimestampConverter();
    initializeLoremIpsum();
    initializeRegexTester();
    initializeURLEncoder();
    initializeBase64Converter();

    // Add copy functionality to result containers
    const resultContainers = document.querySelectorAll('.result-container');
    resultContainers.forEach(container => {
        // Create copy button if it doesn't exist
        if (!container.querySelector('.copy-btn')) {
            const copyBtn = document.createElement('button');
            copyBtn.className = 'copy-btn';
            copyBtn.innerHTML = '<i class="fas fa-copy"></i> Copy';
            container.appendChild(copyBtn);
            
            // Add click event
            copyBtn.addEventListener('click', async () => {
                const textToCopy = container.querySelector('textarea').value;
                
                try {
                    await navigator.clipboard.writeText(textToCopy);
                    
                    // Visual feedback
                    copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
                    copyBtn.classList.add('copy-success');
                    
                    // Reset button after 2 seconds
                    setTimeout(() => {
                        copyBtn.innerHTML = '<i class="fas fa-copy"></i> Copy';
                        copyBtn.classList.remove('copy-success');
                    }, 2000);
                } catch (err) {
                    console.error('Failed to copy text: ', err);
                    copyBtn.innerHTML = '<i class="fas fa-times"></i> Failed';
                    copyBtn.style.backgroundColor = 'var(--error-color)';
                    
                    setTimeout(() => {
                        copyBtn.innerHTML = '<i class="fas fa-copy"></i> Copy';
                        copyBtn.style.backgroundColor = '';
                    }, 2000);
                }
            });
        }
    });

    const fileInput = document.getElementById('fileInput');
    const fileName = document.getElementById('fileName');
    const fileInfo = document.getElementById('fileInfo');
    const converterOutput = document.getElementById('converterOutput');
    const resetFileBtn = document.getElementById('resetFile');
    const downloadBtn = document.getElementById('downloadBtn');

    function resetFileInput() {
        fileInput.value = '';
        fileName.textContent = 'No file chosen';
        fileInfo.innerHTML = '';
        converterOutput.value = '';
        downloadBtn.style.display = 'none';
        resetFileBtn.style.display = 'none';
        delete fileInput.dataset.content;
    }

    resetFileBtn.addEventListener('click', resetFileInput);

    fileInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (!file) {
            resetFileInput();
            return;
        }

        // Update file name display
        fileName.textContent = file.name;
        resetFileBtn.style.display = 'inline-flex';

        // Show file info
        const fileSize = (file.size / 1024).toFixed(2);
        fileInfo.innerHTML = `
            <div class="file-details">
                <span><i class="fas fa-file"></i> ${file.name}</span>
                <span><i class="fas fa-weight"></i> ${fileSize} KB</span>
                <span><i class="fas fa-clock"></i> ${new Date(file.lastModified).toLocaleString()}</span>
            </div>
        `;

        // Read file content
        const reader = new FileReader();
        reader.onload = function(e) {
            // Store the content in a data attribute for later use
            fileInput.dataset.content = e.target.result;
            fileInfo.innerHTML += '<div class="success">File loaded successfully!</div>';
        };
        reader.onerror = function() {
            fileInfo.innerHTML += '<div class="error">Error reading file</div>';
            resetFileInput();
        };

        // Read file based on type
        const fileType = file.name.split('.').pop().toLowerCase();
        if (fileType === 'csv' || fileType === 'txt' || fileType === 'json' || fileType === 'xml') {
            reader.readAsText(file);
        } else {
            fileInfo.innerHTML += '<div class="error">Unsupported file type. Please upload a CSV, JSON, TXT, or XML file.</div>';
            resetFileInput();
        }
    });
});

// JSON Formatter
function initializeJsonFormatter() {
    const jsonInput = document.getElementById('jsonInput');
    const jsonOutput = document.getElementById('jsonOutput');
    const jsonError = document.getElementById('jsonError');
    const formatJsonBtn = document.getElementById('formatJsonBtn');
    const minifyJsonBtn = document.getElementById('minifyJsonBtn');
    const validateJsonBtn = document.getElementById('validateJsonBtn');

    if (!jsonInput || !jsonOutput || !jsonError) {
        console.error('JSON Formatter elements not found');
        return;
    }

    // Format JSON
    formatJsonBtn?.addEventListener('click', () => {
        try {
            const json = JSON.parse(jsonInput.value);
            jsonOutput.textContent = JSON.stringify(json, null, 2);
            jsonOutput.className = 'json-output valid';
        } catch (error) {
            jsonOutput.textContent = 'Invalid JSON';
            jsonOutput.className = 'json-output invalid';
        }
    });

    // Minify JSON
    minifyJsonBtn?.addEventListener('click', () => {
        try {
            const json = JSON.parse(jsonInput.value);
            jsonOutput.textContent = JSON.stringify(json);
            jsonOutput.className = 'json-output valid';
        } catch (error) {
            jsonOutput.textContent = 'Invalid JSON';
            jsonOutput.className = 'json-output invalid';
        }
    });

    // Validate JSON
    validateJsonBtn?.addEventListener('click', () => {
        try {
            JSON.parse(jsonInput.value);
            jsonOutput.textContent = 'Valid JSON';
            jsonOutput.className = 'json-output valid';
        } catch (error) {
            jsonOutput.textContent = `Invalid JSON: ${error.message}`;
            jsonOutput.className = 'json-output invalid';
        }
    });

    // Add copy button functionality
    const copyJsonBtn = document.createElement('button');
    copyJsonBtn.className = 'copy-btn';
    copyJsonBtn.innerHTML = '<i class="fas fa-copy"></i> Copy';
    jsonOutput.parentElement.appendChild(copyJsonBtn);

    copyJsonBtn.addEventListener('click', async function() {
        const textToCopy = jsonOutput.textContent;
        if (textToCopy) {
            try {
                await navigator.clipboard.writeText(textToCopy);
                copyJsonBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
                setTimeout(() => {
                    copyJsonBtn.innerHTML = '<i class="fas fa-copy"></i> Copy';
                }, 2000);
            } catch (err) {
                console.error('Failed to copy text: ', err);
                copyJsonBtn.innerHTML = '<i class="fas fa-times"></i> Failed';
                setTimeout(() => {
                    copyJsonBtn.innerHTML = '<i class="fas fa-copy"></i> Copy';
                }, 2000);
            }
        }
    });
}

// JSON Diff
function initJsonDiff() {
    const json1 = document.getElementById('json1');
    const json2 = document.getElementById('json2');
    const compareBtn = document.getElementById('compareBtn');
    const diffOutput = document.getElementById('diffOutput');

    if (!json1 || !json2 || !compareBtn || !diffOutput) {
        console.error('JSON Diff elements not found');
        return;
    }

    compareBtn.addEventListener('click', function() {
        try {
            const input1 = json1.value.trim();
            const input2 = json2.value.trim();

            if (!input1 || !input2) {
                diffOutput.innerHTML = '<div class="error">Please enter both JSON objects to compare</div>';
                return;
            }

            const obj1 = JSON.parse(input1);
            const obj2 = JSON.parse(input2);
            const differences = findDifferences(obj1, obj2);
            displayDifferences(differences, diffOutput);
        } catch (error) {
            diffOutput.innerHTML = `<div class="error">Error: ${error.message}</div>`;
        }
    });
}

// JSON Diff Helper Functions
function findDifferences(obj1, obj2, path = '') {
    const differences = [];

    // Helper function to create a path string
    const getPath = (key) => path ? `${path}.${key}` : key;

    // Check if both are objects
    if (typeof obj1 === 'object' && obj1 !== null && typeof obj2 === 'object' && obj2 !== null) {
        // Check for added properties
        for (const key in obj2) {
            if (!(key in obj1)) {
                differences.push({
                    type: 'added',
                    path: getPath(key),
                    value: obj2[key]
                });
            }
        }

        // Check for removed properties
        for (const key in obj1) {
            if (!(key in obj2)) {
                differences.push({
                    type: 'removed',
                    path: getPath(key),
                    value: obj1[key]
                });
            }
        }

        // Check for modified properties
        for (const key in obj1) {
            if (key in obj2) {
                if (typeof obj1[key] === 'object' && obj1[key] !== null &&
                    typeof obj2[key] === 'object' && obj2[key] !== null) {
                    // Recursively check nested objects
                    differences.push(...findDifferences(obj1[key], obj2[key], getPath(key)));
                } else if (JSON.stringify(obj1[key]) !== JSON.stringify(obj2[key])) {
                    differences.push({
                        type: 'modified',
                        path: getPath(key),
                        oldValue: obj1[key],
                        newValue: obj2[key]
                    });
                }
            }
        }
    } else if (JSON.stringify(obj1) !== JSON.stringify(obj2)) {
        // Handle non-object values
        differences.push({
            type: 'modified',
            path: path || 'root',
            oldValue: obj1,
            newValue: obj2
        });
    }

    return differences;
}

function displayDifferences(differences, outputElement) {
    if (differences.length === 0) {
        outputElement.innerHTML = '<div class="success">No differences found</div>';
        return;
    }

    let html = '<div class="diff-results">';
    
    // Group differences by type
    const added = differences.filter(d => d.type === 'added');
    const removed = differences.filter(d => d.type === 'removed');
    const modified = differences.filter(d => d.type === 'modified');

    // Display added properties
    if (added.length > 0) {
        html += '<div class="diff-section added">';
        html += '<h4>Added Properties</h4>';
        added.forEach(diff => {
            html += `
                <div class="diff-item">
                    <div class="diff-path">${diff.path}</div>
                    <div class="diff-value">${JSON.stringify(diff.value, null, 2)}</div>
                </div>
            `;
        });
        html += '</div>';
    }

    // Display removed properties
    if (removed.length > 0) {
        html += '<div class="diff-section removed">';
        html += '<h4>Removed Properties</h4>';
        removed.forEach(diff => {
            html += `
                <div class="diff-item">
                    <div class="diff-path">${diff.path}</div>
                    <div class="diff-value">${JSON.stringify(diff.value, null, 2)}</div>
                </div>
            `;
        });
        html += '</div>';
    }

    // Display modified properties
    if (modified.length > 0) {
        html += '<div class="diff-section modified">';
        html += '<h4>Modified Properties</h4>';
        modified.forEach(diff => {
            html += `
                <div class="diff-item">
                    <div class="diff-path">${diff.path}</div>
                    <div class="diff-values">
                        <div class="old-value">
                            <span class="label">Old:</span>
                            ${JSON.stringify(diff.oldValue, null, 2)}
                        </div>
                        <div class="new-value">
                            <span class="label">New:</span>
                            ${JSON.stringify(diff.newValue, null, 2)}
                        </div>
                    </div>
                </div>
            `;
        });
        html += '</div>';
    }

    html += '</div>';
    outputElement.innerHTML = html;
}

// UUID Generator
function initUuidGenerator() {
    const generateUuidBtn = document.getElementById('generateUuidBtn');
    const copyUuidBtn = document.getElementById('copyUuidBtn');
    const uuidOutput = document.getElementById('uuidOutput');
    const uuidCount = document.getElementById('uuidCount');

    if (!generateUuidBtn || !copyUuidBtn || !uuidOutput || !uuidCount) {
        console.error('UUID Generator elements not found');
        return;
    }

    function generateUUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    generateUuidBtn.addEventListener('click', function() {
        const count = parseInt(uuidCount.value) || 1;
        const uuids = [];
        
        for (let i = 0; i < count; i++) {
            uuids.push(generateUUID());
        }
        
        uuidOutput.innerHTML = uuids.map(uuid => `<div class="uuid-item">${uuid}</div>`).join('');
    });

    copyUuidBtn.addEventListener('click', async function() {
        const uuids = Array.from(uuidOutput.getElementsByClassName('uuid-item'))
            .map(item => item.textContent)
            .join('\n');
            
        if (uuids) {
            try {
                await navigator.clipboard.writeText(uuids);
                copyUuidBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
                setTimeout(() => {
                    copyUuidBtn.innerHTML = '<i class="fas fa-copy"></i> Copy All';
                }, 2000);
            } catch (err) {
                console.error('Failed to copy UUIDs: ', err);
                copyUuidBtn.innerHTML = '<i class="fas fa-times"></i> Failed';
                setTimeout(() => {
                    copyUuidBtn.innerHTML = '<i class="fas fa-copy"></i> Copy All';
                }, 2000);
            }
        }
    });
}

// Hash Generator
function initHashGenerator() {
    const hashInput = document.getElementById('hashInput');
    const generateHashBtn = document.getElementById('generateHashBtn');
    const copyHashBtn = document.getElementById('copyHashBtn');
    const hashResults = document.getElementById('hashResults');

    if (!hashInput || !generateHashBtn || !copyHashBtn || !hashResults) {
        console.error('Hash Generator elements not found');
        return;
    }

    generateHashBtn.addEventListener('click', function() {
        const input = hashInput.value.trim();
        if (!input) {
            hashResults.innerHTML = '<div class="error">Please enter text to hash</div>';
            return;
        }

        const md5 = CryptoJS.MD5(input).toString();
        const sha1 = CryptoJS.SHA1(input).toString();
        const sha256 = CryptoJS.SHA256(input).toString();

        hashResults.innerHTML = `
            <div class="hash-result">
                <span class="hash-label">MD5:</span>
                <span class="hash-value">${md5}</span>
            </div>
            <div class="hash-result">
                <span class="hash-label">SHA-1:</span>
                <span class="hash-value">${sha1}</span>
            </div>
            <div class="hash-result">
                <span class="hash-label">SHA-256:</span>
                <span class="hash-value">${sha256}</span>
            </div>
        `;
    });

    copyHashBtn.addEventListener('click', async function() {
        const results = hashResults.innerText;
        if (results) {
            try {
                await navigator.clipboard.writeText(results);
                copyHashBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
                setTimeout(() => {
                    copyHashBtn.innerHTML = '<i class="fas fa-copy"></i> Copy All';
                }, 2000);
            } catch (err) {
                console.error('Failed to copy hashes: ', err);
                copyHashBtn.innerHTML = '<i class="fas fa-times"></i> Failed';
                setTimeout(() => {
                    copyHashBtn.innerHTML = '<i class="fas fa-copy"></i> Copy All';
                }, 2000);
            }
        }
    });
}

// Base64 Converter
function handleBase64(type) {
    const encodeInput = document.getElementById('base64Encode');
    const encodedOutput = document.getElementById('base64Encoded');
    
    try {
        if (type === 'encode') {
            if (!encodeInput || !encodedOutput) return;
            
            const text = encodeInput.value;
            if (!text) {
                encodedOutput.value = '';
                return;
            }
            
            // Encode text to Base64
            const encoded = btoa(unescape(encodeURIComponent(text)));
            encodedOutput.value = encoded;
        } else if (type === 'decode') {
            if (!encodeInput || !encodedOutput) return;
            
            const base64 = encodeInput.value;
            if (!base64) {
                encodedOutput.value = '';
                return;
            }
            
            // Validate Base64 input
            if (!/^[A-Za-z0-9+/=]+$/.test(base64)) {
                encodedOutput.value = 'Error: Invalid Base64 input';
                return;
            }
            
            try {
                // Decode Base64 to text
                const decoded = decodeURIComponent(escape(atob(base64)));
                encodedOutput.value = decoded;
            } catch (error) {
                encodedOutput.value = 'Error: Invalid Base64 format';
            }
        }
    } catch (error) {
        encodedOutput.value = 'Error: Could not process the input';
    }
}

// URL Encoder/Decoder
function handleURL(type) {
    const input = document.getElementById('urlInput');
    const output = document.getElementById('urlOutput');
    
    if (!input || !output) return;
    
    const text = input.value;
    if (!text) {
        output.value = '';
        return;
    }
    
    try {
        if (type === 'encode') {
            output.value = encodeURIComponent(text);
        } else {
            output.value = decodeURIComponent(text);
        }
    } catch (error) {
        output.value = 'Error: Invalid URL format';
    }
}

// HTML Encoder/Decoder
function handleHTML(type) {
    const input = document.getElementById('htmlInput');
    const output = document.getElementById('htmlOutput');
    
    if (!input || !output) return;
    
    const text = input.value;
    if (!text) {
        output.value = '';
        return;
    }
    
    try {
        if (type === 'encode') {
            output.value = text
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&#039;');
        } else {
            output.value = text
                .replace(/&amp;/g, '&')
                .replace(/&lt;/g, '<')
                .replace(/&gt;/g, '>')
                .replace(/&quot;/g, '"')
                .replace(/&#039;/g, "'");
        }
    } catch (error) {
        output.value = 'Error: Could not process the input';
    }
}

// Color Converter
function convertColor() {
    const input = document.getElementById('colorInput').value.trim();
    const preview = document.getElementById('colorPreview');
    const hexOutput = document.getElementById('hexOutput');
    const rgbOutput = document.getElementById('rgbOutput');
    const hslOutput = document.getElementById('hslOutput');

    let r, g, b;

    // Parse input color
    if (input.startsWith('#')) {
        // HEX to RGB
        const hex = input.replace('#', '');
        r = parseInt(hex.substring(0, 2), 16);
        g = parseInt(hex.substring(2, 4), 16);
        b = parseInt(hex.substring(4, 6), 16);
    } else if (input.startsWith('rgb')) {
        // RGB to RGB
        const rgb = input.match(/\d+/g);
        r = parseInt(rgb[0]);
        g = parseInt(rgb[1]);
        b = parseInt(rgb[2]);
    } else if (input.startsWith('hsl')) {
        // HSL to RGB
        const hsl = input.match(/\d+/g);
        const h = parseInt(hsl[0]) / 360;
        const s = parseInt(hsl[1]) / 100;
        const l = parseInt(hsl[2]) / 100;

        let r1, g1, b1;

        if (s === 0) {
            r1 = g1 = b1 = l;
        } else {
            const hue2rgb = (p, q, t) => {
                if (t < 0) t += 1;
                if (t > 1) t -= 1;
                if (t < 1/6) return p + (q - p) * 6 * t;
                if (t < 1/2) return q;
                if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
                return p;
            };

            const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            const p = 2 * l - q;

            r1 = hue2rgb(p, q, h + 1/3);
            g1 = hue2rgb(p, q, h);
            b1 = hue2rgb(p, q, h - 1/3);
        }

        r = Math.round(r1 * 255);
        g = Math.round(g1 * 255);
        b = Math.round(b1 * 255);
    } else {
        alert('Invalid color format. Please use HEX (#RRGGBB), RGB (rgb(r,g,b)), or HSL (hsl(h,s%,l%))');
        return;
    }

    // Convert RGB to HEX
    const toHex = (n) => {
        const hex = n.toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    };
    const hex = `#${toHex(r)}${toHex(g)}${toHex(b)}`;

    // Convert RGB to HSL
    const toHSL = (r, g, b) => {
        r /= 255;
        g /= 255;
        b /= 255;

        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        let h, s, l = (max + min) / 2;

        if (max === min) {
            h = s = 0;
        } else {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

            switch (max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }

            h /= 6;
        }

        return {
            h: Math.round(h * 360),
            s: Math.round(s * 100),
            l: Math.round(l * 100)
        };
    };

    const hsl = toHSL(r, g, b);

    // Update outputs
    hexOutput.value = hex;
    rgbOutput.value = `rgb(${r}, ${g}, ${b})`;
    hslOutput.value = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;

    // Update preview
    preview.style.backgroundColor = hex;
}

// Regex Tester
function testRegex() {
    const pattern = document.getElementById('regexPattern').value;
    const text = document.getElementById('regexTestText').value;
    const matchesDiv = document.getElementById('regexMatches');
    const infoDiv = document.getElementById('regexInfo');

    try {
        const regex = new RegExp(pattern, 'g');
        const matches = text.match(regex);
        const allMatches = text.matchAll(regex);

        // Clear previous results
        matchesDiv.innerHTML = '';
        infoDiv.innerHTML = '';

        if (matches) {
            // Display matches
            matches.forEach((match, index) => {
                const matchDiv = document.createElement('div');
                matchDiv.className = 'match-item';
                matchDiv.innerHTML = `
                    <span class="match-number">Match ${index + 1}:</span>
                    <span class="match-text">${match}</span>
                    <span class="match-position">at position ${text.indexOf(match)}</span>
                `;
                matchesDiv.appendChild(matchDiv);
            });

            // Display info
            infoDiv.innerHTML = `
                <div class="info-item">Total matches: ${matches.length}</div>
                <div class="info-item">Pattern: ${pattern}</div>
            `;
        } else {
            matchesDiv.innerHTML = '<div class="no-matches">No matches found</div>';
        }
    } catch (error) {
        matchesDiv.innerHTML = `<div class="error">Invalid regex pattern: ${error.message}</div>`;
    }
}

// Code Minifier
function minifyCode() {
    const type = document.getElementById('minifyType').value;
    const action = document.getElementById('minifyAction').value;
    const input = document.getElementById('minifyInput').value;
    const output = document.getElementById('minifyOutput');

    try {
        let processed = input;

        if (action === 'minify') {
            switch (type) {
                case 'html':
                    processed = minifyHTML(input);
                    break;
                case 'css':
                    processed = minifyCSS(input);
                    break;
                case 'js':
                    processed = minifyJS(input);
                    break;
            }
        } else {
            switch (type) {
                case 'html':
                    processed = unminifyHTML(input);
                    break;
                case 'css':
                    processed = unminifyCSS(input);
                    break;
                case 'js':
                    processed = unminifyJS(input);
                    break;
            }
        }

        output.value = processed;
    } catch (error) {
        output.value = `Error: ${error.message}`;
    }
}

function minifyHTML(html) {
    return html
        .replace(/\s+/g, ' ')
        .replace(/>\s+</g, '><')
        .replace(/<!--[\s\S]*?-->/g, '')
        .trim();
}

function minifyCSS(css) {
    return css
        .replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, '')
        .replace(/\s+/g, ' ')
        .replace(/\s*({|}|\(|\)|:|;|,)\s*/g, '$1')
        .replace(/;}/g, '}')
        .trim();
}

function minifyJS(js) {
    return js
        .replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, '')
        .replace(/\s+/g, ' ')
        .replace(/\s*({|}|\(|\)|:|;|,)\s*/g, '$1')
        .replace(/;}/g, '}')
        .trim();
}

function unminifyHTML(html) {
    let formatted = html
        .replace(/></g, '>\n<')  // Add newline between tags
        .replace(/(<[^>]*>)/g, (match) => {
            // Add indentation for closing tags
            if (match.startsWith('</')) {
                return '\n' + match;
            }
            return match;
        });

    // Add proper indentation
    let indent = 0;
    formatted = formatted.split('\n').map(line => {
        if (line.match(/<\/[^>]*>/)) {
            indent--;
        }
        const indentedLine = '  '.repeat(Math.max(0, indent)) + line;
        if (line.match(/<[^/][^>]*>/)) {
            indent++;
        }
        return indentedLine;
    }).join('\n');

    return formatted;
}

function unminifyCSS(css) {
    let formatted = css
        .replace(/;/g, ';\n')  // Add newline after each declaration
        .replace(/}/g, '\n}\n')  // Add newline before and after closing braces
        .replace(/{/g, ' {\n')  // Add newline after opening braces
        .replace(/^\s*[\r\n]/gm, '');  // Remove empty lines

    // Add proper indentation
    let indent = 0;
    formatted = formatted.split('\n').map(line => {
        if (line.includes('}')) {
            indent--;
        }
        const indentedLine = '  '.repeat(Math.max(0, indent)) + line;
        if (line.includes('{')) {
            indent++;
        }
        return indentedLine;
    }).join('\n');

    return formatted;
}

function unminifyJS(js) {
    let formatted = js
        .replace(/;/g, ';\n')  // Add newline after each statement
        .replace(/}/g, '\n}\n')  // Add newline before and after closing braces
        .replace(/{/g, ' {\n')  // Add newline after opening braces
        .replace(/^\s*[\r\n]/gm, '');  // Remove empty lines

    // Add proper indentation
    let indent = 0;
    formatted = formatted.split('\n').map(line => {
        if (line.includes('}')) {
            indent--;
        }
        const indentedLine = '  '.repeat(Math.max(0, indent)) + line;
        if (line.includes('{')) {
            indent++;
        }
        return indentedLine;
    }).join('\n');

    return formatted;
}

// Diff Checker
function compareTexts() {
    const original = document.getElementById('originalText').value;
    const modified = document.getElementById('modifiedText').value;
    const diffOutput = document.getElementById('diffOutput');
    const diffStats = document.getElementById('diffStats');

    if (!original && !modified) {
        diffOutput.innerHTML = '<div class="diff-message">Please enter text to compare</div>';
        diffStats.innerHTML = '';
        return;
    }

    const analysis = analyzeCode(original, modified);
    displayAnalysis(analysis, diffOutput, diffStats);
}

function analyzeCode(original, modified) {
    const originalLines = original.split('\n');
    const modifiedLines = modified.split('\n');
    const analysis = {
        correct: [],
        missing: [],
        added: [],
        changed: [],
        suggestions: []
    };

    // Compare line by line
    let i = 0, j = 0;
    while (i < originalLines.length || j < modifiedLines.length) {
        const originalLine = originalLines[i]?.trim() || '';
        const modifiedLine = modifiedLines[j]?.trim() || '';

        if (i >= originalLines.length) {
            // Extra lines in modified code
            analysis.added.push({
                line: j + 1,
                content: modifiedLine,
                suggestion: analyzeExtraLine(modifiedLine)
            });
            j++;
        } else if (j >= modifiedLines.length) {
            // Missing lines from original code
            analysis.missing.push({
                line: i + 1,
                content: originalLine,
                suggestion: analyzeMissingLine(originalLine)
            });
            i++;
        } else if (originalLine === modifiedLine) {
            // Correct lines
            analysis.correct.push({
                line: i + 1,
                content: originalLine
            });
            i++;
            j++;
        } else {
            // Changed lines
            const changes = analyzeLineChanges(originalLine, modifiedLine);
            analysis.changed.push({
                originalLine: i + 1,
                modifiedLine: j + 1,
                originalContent: originalLine,
                modifiedContent: modifiedLine,
                changes: changes,
                suggestions: generateSuggestions(changes, originalLine, modifiedLine)
            });
            i++;
            j++;
        }
    }

    return analysis;
}

function analyzeExtraLine(line) {
    // Analyze if the extra line might be unnecessary
    if (line.trim() === '') return 'Empty line detected';
    if (line.includes('console.log')) return 'Debug statement detected';
    if (line.includes('//')) return 'Comment detected';
    return 'Extra line detected';
}

function analyzeMissingLine(line) {
    // Analyze what might be missing
    if (line.includes('function')) return 'Function definition missing';
    if (line.includes('return')) return 'Return statement missing';
    if (line.includes('if') || line.includes('else')) return 'Conditional statement missing';
    if (line.includes('{') || line.includes('}')) return 'Code block delimiter missing';
    return 'Required line missing';
}

function analyzeLineChanges(original, modified) {
    const changes = [];
    
    // Split into words for comparison
    const originalWords = original.split(/\s+/);
    const modifiedWords = modified.split(/\s+/);
    
    // Compare words
    let i = 0, j = 0;
    while (i < originalWords.length || j < modifiedWords.length) {
        if (i >= originalWords.length) {
            changes.push({ type: 'added', word: modifiedWords[j] });
            j++;
        } else if (j >= modifiedWords.length) {
            changes.push({ type: 'removed', word: originalWords[i] });
            i++;
        } else if (originalWords[i] === modifiedWords[j]) {
            changes.push({ type: 'same', word: originalWords[i] });
            i++;
            j++;
        } else {
            changes.push({ type: 'removed', word: originalWords[i] });
            changes.push({ type: 'added', word: modifiedWords[j] });
            i++;
            j++;
        }
    }
    
    return changes;
}

function generateSuggestions(changes, original, modified) {
    const suggestions = [];
    
    // Check for common mistakes
    if (original.includes('===') && modified.includes('==')) {
        suggestions.push('Consider using strict equality (===) instead of loose equality (==)');
    }
    if (original.includes('let') && modified.includes('var')) {
        suggestions.push('Consider using let instead of var for better scoping');
    }
    if (original.includes('const') && modified.includes('let')) {
        suggestions.push('Consider using const if the variable won\'t be reassigned');
    }
    
    // Check for syntax errors
    if (modified.includes('{') && !modified.includes('}')) {
        suggestions.push('Missing closing brace');
    }
    if (modified.includes('(') && !modified.includes(')')) {
        suggestions.push('Missing closing parenthesis');
    }
    
    return suggestions;
}

function displayAnalysis(analysis, outputElement, statsElement) {
    let html = '<div class="diff-analysis">';
    
    // Display summary
    html += '<div class="analysis-summary">';
    html += '<h3>Code Analysis Summary</h3>';
    html += `<p>Found ${analysis.correct.length} correct lines, ${analysis.missing.length} missing lines, `;
    html += `${analysis.added.length} extra lines, and ${analysis.changed.length} changed lines.</p>`;
    html += '</div>';

    // Display missing lines
    if (analysis.missing.length > 0) {
        html += '<div class="analysis-section missing">';
        html += '<h4>❌ Missing Lines</h4>';
        analysis.missing.forEach(item => {
            html += `
                <div class="analysis-item">
                    <div class="line-number">Line ${item.line}</div>
                    <div class="line-content">${item.content}</div>
                    <div class="suggestion">${item.suggestion}</div>
                </div>
            `;
        });
        html += '</div>';
    }

    // Display added lines
    if (analysis.added.length > 0) {
        html += '<div class="analysis-section added">';
        html += '<h4>➕ Extra Lines</h4>';
        analysis.added.forEach(item => {
            html += `
                <div class="analysis-item">
                    <div class="line-number">Line ${item.line}</div>
                    <div class="line-content">${item.content}</div>
                    <div class="suggestion">${item.suggestion}</div>
                </div>
            `;
        });
        html += '</div>';
    }

    // Display changed lines
    if (analysis.changed.length > 0) {
        html += '<div class="analysis-section changed">';
        html += '<h4>🔄 Changed Lines</h4>';
        analysis.changed.forEach(item => {
            html += `
                <div class="analysis-item">
                    <div class="line-numbers">
                        <span>Original (Line ${item.originalLine})</span>
                        <span>Modified (Line ${item.modifiedLine})</span>
                    </div>
                    <div class="line-comparison">
                        <div class="original">${item.originalContent}</div>
                        <div class="modified">${item.modifiedContent}</div>
                    </div>
                    <div class="suggestions">
                        ${item.suggestions.map(s => `<div class="suggestion">💡 ${s}</div>`).join('')}
                    </div>
                </div>
            `;
        });
        html += '</div>';
    }

    // Display correct lines
    if (analysis.correct.length > 0) {
        html += '<div class="analysis-section correct">';
        html += '<h4>✅ Correct Lines</h4>';
        analysis.correct.forEach(item => {
            html += `
                <div class="analysis-item">
                    <div class="line-number">Line ${item.line}</div>
                    <div class="line-content">${item.content}</div>
                </div>
            `;
        });
        html += '</div>';
    }

    html += '</div>';
    outputElement.innerHTML = html;

    // Update statistics
    statsElement.innerHTML = `
        <div class="diff-statistics">
            <div class="stat-item">
                <span class="stat-label">Correct:</span>
                <span class="stat-value correct">${analysis.correct.length}</span>
            </div>
            <div class="stat-item">
                <span class="stat-label">Missing:</span>
                <span class="stat-value missing">${analysis.missing.length}</span>
            </div>
            <div class="stat-item">
                <span class="stat-label">Extra:</span>
                <span class="stat-value added">${analysis.added.length}</span>
            </div>
            <div class="stat-item">
                <span class="stat-label">Changed:</span>
                <span class="stat-value changed">${analysis.changed.length}</span>
            </div>
        </div>
    `;
}

// File Converter
function convertFile() {
    const type = document.getElementById('conversionType').value;
    const fileInput = document.getElementById('fileInput');
    const output = document.getElementById('converterOutput');
    const downloadBtn = document.getElementById('downloadBtn');
    const fileInfo = document.getElementById('fileInfo');

    if (!fileInput.files[0]) {
        fileInfo.innerHTML = '<div class="error">Please select a file first</div>';
        return;
    }

    const input = fileInput.dataset.content;
    if (!input) {
        fileInfo.innerHTML = '<div class="error">No file content to convert. Please try uploading the file again.</div>';
        return;
    }

    try {
        let result;
        switch (type) {
            case 'csv-json':
                result = csvToJson(input);
                break;
            case 'json-csv':
                result = jsonToCsv(input);
                break;
            case 'txt-json':
                result = txtToJson(input);
                break;
            case 'json-txt':
                result = jsonToTxt(input);
                break;
            case 'json-xml':
                result = jsonToXml(input);
                break;
            case 'xml-json':
                result = xmlToJson(input);
                break;
        }

        output.value = result;
        downloadBtn.style.display = 'inline-flex';
        fileInfo.innerHTML += '<div class="success">Conversion successful!</div>';
    } catch (error) {
        output.value = `Error: ${error.message}`;
        downloadBtn.style.display = 'none';
        fileInfo.innerHTML += `<div class="error">Conversion failed: ${error.message}</div>`;
    }
}

function csvToJson(csv) {
    const lines = csv.split('\n');
    const headers = lines[0].split(',').map(header => header.trim());
    const result = [];

    for (let i = 1; i < lines.length; i++) {
        if (!lines[i].trim()) continue;
        const obj = {};
        const currentLine = lines[i].split(',').map(item => item.trim());
        
        headers.forEach((header, index) => {
            obj[header] = currentLine[index] || '';
        });
        
        result.push(obj);
    }

    return JSON.stringify(result, null, 2);
}

function jsonToCsv(json) {
    const data = JSON.parse(json);
    if (!Array.isArray(data)) {
        throw new Error('JSON must be an array of objects');
    }

    const headers = Object.keys(data[0]);
    const csvRows = [headers.join(',')];

    data.forEach(item => {
        const row = headers.map(header => {
            const value = item[header] || '';
            return `"${value.toString().replace(/"/g, '""')}"`;
        });
        csvRows.push(row.join(','));
    });

    return csvRows.join('\n');
}

function txtToJson(txt) {
    const lines = txt.split('\n').filter(line => line.trim());
    const result = lines.map((line, index) => ({
        line: index + 1,
        content: line.trim()
    }));

    return JSON.stringify(result, null, 2);
}

function jsonToTxt(json) {
    const data = JSON.parse(json);
    if (!Array.isArray(data)) {
        throw new Error('JSON must be an array of objects');
    }

    return data.map(item => item.content || '').join('\n');
}

function jsonToXml(json) {
    const data = JSON.parse(json);
    
    function objectToXml(obj, rootName = 'root') {
        let xml = '';
        
        if (Array.isArray(obj)) {
            xml = obj.map(item => objectToXml(item, 'item')).join('');
            return `<${rootName}>${xml}</${rootName}>`;
        }
        
        if (typeof obj === 'object' && obj !== null) {
            xml = Object.entries(obj).map(([key, value]) => {
                if (typeof value === 'object' && value !== null) {
                    return objectToXml(value, key);
                }
                return `<${key}>${value}</${key}>`;
            }).join('');
            return `<${rootName}>${xml}</${rootName}>`;
        }
        
        return `<${rootName}>${obj}</${rootName}>`;
    }

    return '<?xml version="1.0" encoding="UTF-8"?>\n' + objectToXml(data);
}

function xmlToJson(xml) {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xml, 'text/xml');
    
    function xmlToObject(node) {
        if (node.nodeType === Node.TEXT_NODE) {
            return node.textContent.trim();
        }
        
        if (node.nodeType === Node.ELEMENT_NODE) {
            const obj = {};
            
            if (node.attributes.length > 0) {
                obj['@attributes'] = {};
                for (let i = 0; i < node.attributes.length; i++) {
                    const attr = node.attributes[i];
                    obj['@attributes'][attr.name] = attr.value;
                }
            }
            
            const children = Array.from(node.childNodes);
            if (children.length === 1 && children[0].nodeType === Node.TEXT_NODE) {
                return children[0].textContent.trim();
            }
            
            children.forEach(child => {
                if (child.nodeType === Node.ELEMENT_NODE) {
                    const childObj = xmlToObject(child);
                    const childName = child.nodeName;
                    
                    if (obj[childName]) {
                        if (!Array.isArray(obj[childName])) {
                            obj[childName] = [obj[childName]];
                        }
                        obj[childName].push(childObj);
                    } else {
                        obj[childName] = childObj;
                    }
                }
            });
            
            return obj;
        }
        
        return null;
    }

    return JSON.stringify(xmlToObject(xmlDoc.documentElement), null, 2);
}

function downloadConvertedFile() {
    const type = document.getElementById('conversionType').value;
    const content = document.getElementById('converterOutput').value;
    const fileInfo = document.getElementById('fileInfo');
    
    if (!content) {
        fileInfo.innerHTML = '<div class="error">No content to download</div>';
        return;
    }

    const [fromFormat, toFormat] = type.split('-');
    const filename = `converted.${toFormat}`;
    
    try {
        const blob = new Blob([content], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
        
        fileInfo.innerHTML = '<div class="success">File downloaded successfully!</div>';
    } catch (error) {
        fileInfo.innerHTML = `<div class="error">Download failed: ${error.message}</div>`;
    }
}

// Timestamp Converter
function initTimestampConverter() {
    const timestampInput = document.getElementById('timestampInput');
    const convertTimestampBtn = document.getElementById('convertTimestampBtn');
    const timestampOutput = document.getElementById('timestampOutput');

    if (!timestampInput || !convertTimestampBtn || !timestampOutput) {
        console.error('Timestamp Converter elements not found');
        return;
    }

    convertTimestampBtn.addEventListener('click', function() {
        const input = timestampInput.value.trim();
        if (!input) {
            timestampOutput.innerHTML = '<div class="error">Please enter a timestamp or date</div>';
            return;
        }

        try {
            let date;
            if (/^\d+$/.test(input)) {
                // Unix timestamp
                date = new Date(parseInt(input) * 1000);
            } else {
                // Date string
                date = new Date(input);
            }

            if (isNaN(date.getTime())) {
                throw new Error('Invalid date format');
            }

            const unix = Math.floor(date.getTime() / 1000);
            const utc = date.toUTCString();
            const iso = date.toISOString();
            const local = date.toString();

            timestampOutput.innerHTML = `
                <div class="timestamp-result">
                    <span class="timestamp-label">Unix Timestamp:</span>
                    <span class="timestamp-value">${unix}</span>
                </div>
                <div class="timestamp-result">
                    <span class="timestamp-label">UTC:</span>
                    <span class="timestamp-value">${utc}</span>
                </div>
                <div class="timestamp-result">
                    <span class="timestamp-label">ISO:</span>
                    <span class="timestamp-value">${iso}</span>
                </div>
                <div class="timestamp-result">
                    <span class="timestamp-label">Local:</span>
                    <span class="timestamp-value">${local}</span>
                </div>
            `;
        } catch (error) {
            timestampOutput.innerHTML = `<div class="error">Error: ${error.message}</div>`;
        }
    });
}

// Lorem Ipsum Generator
function initLoremIpsum() {
    const generateLoremBtn = document.getElementById('generateLoremBtn');
    const copyLoremBtn = document.getElementById('copyLoremBtn');
    const loremOutput = document.getElementById('loremOutput');
    const loremType = document.getElementById('loremType');
    const loremCount = document.getElementById('loremCount');

    if (!generateLoremBtn || !copyLoremBtn || !loremOutput || !loremType || !loremCount) {
        console.error('Lorem Ipsum Generator elements not found');
        return;
    }

    generateLoremBtn.addEventListener('click', function() {
        const type = loremType.value;
        const count = parseInt(loremCount.value) || 1;
        let text = '';

        switch (type) {
            case 'paragraphs':
                text = generateParagraphs(count);
                break;
            case 'words':
                text = generateWords(count);
                break;
            case 'characters':
                text = generateCharacters(count);
                break;
        }

        loremOutput.textContent = text;
    });

    copyLoremBtn.addEventListener('click', async function() {
        const text = loremOutput.textContent;
        if (text) {
            try {
                await navigator.clipboard.writeText(text);
                copyLoremBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
                setTimeout(() => {
                    copyLoremBtn.innerHTML = '<i class="fas fa-copy"></i> Copy';
                }, 2000);
            } catch (err) {
                console.error('Failed to copy text: ', err);
                copyLoremBtn.innerHTML = '<i class="fas fa-times"></i> Failed';
                setTimeout(() => {
                    copyLoremBtn.innerHTML = '<i class="fas fa-copy"></i> Copy';
                }, 2000);
            }
        }
    });
}

// Regex Tester
function initRegexTester() {
    const regexPattern = document.getElementById('regexPattern');
    const regexText = document.getElementById('regexText');
    const testRegexBtn = document.getElementById('testRegexBtn');
    const regexOutput = document.getElementById('regexOutput');
    const regexFlags = document.getElementById('regexFlags');

    if (!regexPattern || !regexText || !testRegexBtn || !regexOutput || !regexFlags) {
        console.error('Regex Tester elements not found');
        return;
    }

    testRegexBtn.addEventListener('click', function() {
        const pattern = regexPattern.value.trim();
        const text = regexText.value;
        const flags = regexFlags.value;

        if (!pattern) {
            regexOutput.innerHTML = '<div class="error">Please enter a regex pattern</div>';
            return;
        }

        try {
            const regex = new RegExp(pattern, flags);
            const matches = text.match(regex);
            const allMatches = text.matchAll(regex);

            if (!matches) {
                regexOutput.innerHTML = '<div class="no-matches">No matches found</div>';
                return;
            }

            let html = '<div class="regex-results">';
            html += `<div class="match-count">Found ${matches.length} matches</div>`;

            for (const match of allMatches) {
                html += `
                    <div class="match-item">
                        <div class="match-text">${match[0]}</div>
                        <div class="match-index">Index: ${match.index}</div>
                        ${match.groups ? `<div class="match-groups">Groups: ${JSON.stringify(match.groups)}</div>` : ''}
                    </div>
                `;
            }

            html += '</div>';
            regexOutput.innerHTML = html;
        } catch (error) {
            regexOutput.innerHTML = `<div class="error">Invalid regex pattern: ${error.message}</div>`;
        }
    });
}

// URL Encoder/Decoder
function initUrlEncoder() {
    const urlInput = document.getElementById('urlInput');
    const encodeUrlBtn = document.getElementById('encodeUrlBtn');
    const decodeUrlBtn = document.getElementById('decodeUrlBtn');
    const urlOutput = document.getElementById('urlOutput');
    const copyUrlBtn = document.getElementById('copyUrlBtn');

    if (!urlInput || !encodeUrlBtn || !decodeUrlBtn || !urlOutput || !copyUrlBtn) {
        console.error('URL Encoder elements not found');
        return;
    }

    encodeUrlBtn.addEventListener('click', function() {
        const input = urlInput.value.trim();
        if (!input) {
            urlOutput.textContent = '';
            return;
        }
        urlOutput.textContent = encodeURIComponent(input);
    });

    decodeUrlBtn.addEventListener('click', function() {
        const input = urlInput.value.trim();
        if (!input) {
            urlOutput.textContent = '';
            return;
        }
        try {
            urlOutput.textContent = decodeURIComponent(input);
        } catch (error) {
            urlOutput.textContent = `Error: ${error.message}`;
        }
    });

    copyUrlBtn.addEventListener('click', async function() {
        const text = urlOutput.textContent;
        if (text) {
            try {
                await navigator.clipboard.writeText(text);
                copyUrlBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
                setTimeout(() => {
                    copyUrlBtn.innerHTML = '<i class="fas fa-copy"></i> Copy';
                }, 2000);
            } catch (err) {
                console.error('Failed to copy text: ', err);
                copyUrlBtn.innerHTML = '<i class="fas fa-times"></i> Failed';
                setTimeout(() => {
                    copyUrlBtn.innerHTML = '<i class="fas fa-copy"></i> Copy';
                }, 2000);
            }
        }
    });
}

// Base64 Converter
function initBase64Converter() {
    const base64Input = document.getElementById('base64Input');
    const encodeBase64Btn = document.getElementById('encodeBase64Btn');
    const decodeBase64Btn = document.getElementById('decodeBase64Btn');
    const base64Output = document.getElementById('base64Output');
    const copyBase64Btn = document.getElementById('copyBase64Btn');

    if (!base64Input || !encodeBase64Btn || !decodeBase64Btn || !base64Output || !copyBase64Btn) {
        console.error('Base64 Converter elements not found');
        return;
    }

    encodeBase64Btn.addEventListener('click', function() {
        const input = base64Input.value.trim();
        if (!input) {
            base64Output.textContent = '';
            return;
        }
        try {
            base64Output.textContent = btoa(unescape(encodeURIComponent(input)));
        } catch (error) {
            base64Output.textContent = `Error: ${error.message}`;
        }
    });

    decodeBase64Btn.addEventListener('click', function() {
        const input = base64Input.value.trim();
        if (!input) {
            base64Output.textContent = '';
            return;
        }
        try {
            base64Output.textContent = decodeURIComponent(escape(atob(input)));
        } catch (error) {
            base64Output.textContent = `Error: ${error.message}`;
        }
    });

    copyBase64Btn.addEventListener('click', async function() {
        const text = base64Output.textContent;
        if (text) {
            try {
                await navigator.clipboard.writeText(text);
                copyBase64Btn.innerHTML = '<i class="fas fa-check"></i> Copied!';
                setTimeout(() => {
                    copyBase64Btn.innerHTML = '<i class="fas fa-copy"></i> Copy';
                }, 2000);
            } catch (err) {
                console.error('Failed to copy text: ', err);
                copyBase64Btn.innerHTML = '<i class="fas fa-times"></i> Failed';
                setTimeout(() => {
                    copyBase64Btn.innerHTML = '<i class="fas fa-copy"></i> Copy';
                }, 2000);
            }
        }
    });
}

// Helper functions for Lorem Ipsum
function generateParagraphs(count) {
    const paragraphs = [];
    for (let i = 0; i < count; i++) {
        paragraphs.push(generateParagraph());
    }
    return paragraphs.join('\n\n');
}

function generateParagraph() {
    const sentences = [];
    const sentenceCount = Math.floor(Math.random() * 3) + 3;
    for (let i = 0; i < sentenceCount; i++) {
        sentences.push(generateSentence());
    }
    return sentences.join(' ');
}

function generateSentence() {
    const words = [];
    const wordCount = Math.floor(Math.random() * 10) + 5;
    for (let i = 0; i < wordCount; i++) {
        words.push(getRandomWord());
    }
    return words.join(' ') + '.';
}

function generateWords(count) {
    const words = [];
    for (let i = 0; i < count; i++) {
        words.push(getRandomWord());
    }
    return words.join(' ');
}

function generateCharacters(count) {
    let text = '';
    while (text.length < count) {
        text += getRandomWord() + ' ';
    }
    return text.slice(0, count);
}

function getRandomWord() {
    const words = [
        'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit',
        'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore',
        'magna', 'aliqua', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud', 'exercitation',
        'ullamco', 'laboris', 'nisi', 'aliquip', 'ex', 'ea', 'commodo', 'consequat'
    ];
    return words[Math.floor(Math.random() * words.length)];
}

// Utility function for showing toast messages
function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(toast);
            }, 300);
        }, 2000);
    }, 100);
} 