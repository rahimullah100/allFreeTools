// Set dark theme by default
const body = document.body;
body.setAttribute('data-theme', 'dark');

// Initialize mobile navigation
document.addEventListener('DOMContentLoaded', function() {
    // Initialize mobile navigation
    if (window.innerWidth <= 768) {
        createMobileNav();
}

    // Add responsive behavior
    window.addEventListener('resize', () => {
        if (window.innerWidth <= 768 && !document.querySelector('.mobile-nav')) {
            createMobileNav();
        }
    });

    // Case Converter
    const caseButtons = document.querySelectorAll('.case-btn');
    const caseConverterInput = document.getElementById('caseConverterInput');
    const caseConverterOutput = document.getElementById('caseConverterOutput');

    if (caseButtons.length && caseConverterInput && caseConverterOutput) {
        caseButtons.forEach(button => {
            button.addEventListener('click', () => {
                const text = caseConverterInput.value;
    let result = '';
    
                switch(button.dataset.case) {
                    case 'upper':
                        result = text.toUpperCase();
            break;
                    case 'lower':
                        result = text.toLowerCase();
            break;
                    case 'title':
                        result = text.toLowerCase().split(' ').map(word => 
                            word.charAt(0).toUpperCase() + word.slice(1)
                        ).join(' ');
            break;
                    case 'sentence':
                        result = text.toLowerCase().replace(/(^\w|\.\s+\w)/g, letter => 
                            letter.toUpperCase()
                        );
            break;
    }
    
                caseConverterOutput.value = result;
            });
        });
}

    // Remove Duplicate Lines button
    const removeDuplicateBtn = document.getElementById('removeDuplicateBtn');
    if (removeDuplicateBtn) {
        removeDuplicateBtn.addEventListener('click', removeDuplicateLines);
            }
});

// Mobile Navigation
const createMobileNav = () => {
    const nav = document.querySelector('.nav-links');
    const mobileNav = document.createElement('div');
    mobileNav.className = 'mobile-nav';
    
    const links = Array.from(nav.children);
    links.forEach(link => {
        const mobileLink = link.cloneNode(true);
        mobileNav.appendChild(mobileLink);
    });
    
    document.querySelector('.navbar').appendChild(mobileNav);
    
    // Add mobile menu toggle
    const menuToggle = document.createElement('button');
    menuToggle.className = 'mobile-menu-toggle';
    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    document.querySelector('.navbar').insertBefore(menuToggle, nav);
    
    menuToggle.addEventListener('click', () => {
        mobileNav.classList.toggle('active');
        menuToggle.querySelector('i').className = 
            mobileNav.classList.contains('active') ? 'fas fa-times' : 'fas fa-bars';
    });
};

// Text Case Converter
function convertCase(type) {
    const input = document.getElementById('caseConverterInput');
    const output = document.getElementById('caseConverterOutput');
    
    if (!input || !output) return;
    
    const text = input.value;
    if (!text) {
        output.value = '';
        return;
    }
    
    switch(type) {
        case 'sentence':
            // Convert to sentence case
            output.value = text.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, function(c) {
                return c.toUpperCase();
        });
            break;
        case 'title':
            // Convert to title case
            output.value = text.replace(/\w\S*/g, function(txt) {
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            });
            break;
    }
}

// Reverse Text Tool
function reverseText(type) {
    const input = document.getElementById('reverseInput');
    const output = document.getElementById('reverseOutput');
    
    if (input && output) {
        const text = input.value;
        let result;
        
        switch(type) {
            case 'letters':
                result = text.split('').reverse().join('');
                break;
            case 'words':
                result = text.split(' ').reverse().join(' ');
                break;
        }
        
        output.value = result;
    }
}

// Text Sorter
function sortText(type) {
    const input = document.getElementById('sortInput');
    const output = document.getElementById('sortOutput');
    
    if (input && output) {
        const text = input.value;
        const lines = text.split('\n').filter(line => line.trim() !== '');
        let sortedLines;
        
        switch(type) {
            case 'alpha':
                sortedLines = lines.sort((a, b) => a.localeCompare(b));
                break;
            case 'length':
                sortedLines = lines.sort((a, b) => a.length - b.length);
                break;
        }
        
        output.value = sortedLines.join('\n');
    }
}

// Binary Converter
function convertBinary(type) {
    const textToBinaryInput = document.getElementById('textToBinary');
    const binaryToTextInput = document.getElementById('binaryToText');
    const binaryOutput = document.getElementById('binaryOutput');
    const textOutput = document.getElementById('textOutput');
    
    try {
        if (type === 'toBinary') {
            if (!textToBinaryInput || !binaryOutput) return;
            
            const text = textToBinaryInput.value;
            if (!text) {
                binaryOutput.value = '';
                return;
            }
            
            // Convert text to binary
            const binary = text.split('').map(char => {
                return char.charCodeAt(0).toString(2).padStart(8, '0');
            }).join(' ');
            
            binaryOutput.value = binary;
        } else if (type === 'toText') {
            if (!binaryToTextInput || !textOutput) return;
            
            const binary = binaryToTextInput.value;
            if (!binary) {
                textOutput.value = '';
                return;
            }
            
            // Validate binary input
            const binaryPattern = /^[01\s]+$/;
            if (!binaryPattern.test(binary)) {
                textOutput.value = 'Error: Invalid binary input. Please enter only 0s and 1s.';
                return;
            }
            
            // Convert binary to text
            const text = binary.split(/\s+/).map(bin => {
                if (bin.length !== 8) {
                    throw new Error('Invalid binary length');
                }
                return String.fromCharCode(parseInt(bin, 2));
            }).join('');
            
            textOutput.value = text;
        }
    } catch (error) {
        if (type === 'toBinary') {
            binaryOutput.value = 'Error: Could not convert text to binary';
        } else {
            textOutput.value = 'Error: Invalid binary format. Each character must be 8 bits.';
        }
    }
}

// Text Diff Checker
function compareTexts() {
    const text1 = document.getElementById('diffText1');
    const text2 = document.getElementById('diffText2');
    const diffOutput = document.getElementById('diffOutput');
    const diffStats = document.getElementById('diffStats');
    
    // Create result containers if they don't exist
    if (!diffOutput) {
        const outputContainer = document.createElement('div');
        outputContainer.id = 'diffOutput';
        outputContainer.className = 'diff-output';
        text1.parentElement.parentElement.appendChild(outputContainer);
    }
    
    if (!diffStats) {
        const statsContainer = document.createElement('div');
        statsContainer.id = 'diffStats';
        statsContainer.className = 'diff-stats';
        text1.parentElement.parentElement.appendChild(statsContainer);
    }
    
    if (!text1 || !text2) return;
    
    const str1 = text1.value.trim();
    const str2 = text2.value.trim();
    
    if (!str1 || !str2) {
        diffOutput.innerHTML = '<div class="diff-message">Please enter text in both fields to compare.</div>';
        diffStats.innerHTML = '';
        return;
    }
    
    // Split texts into lines and filter out empty lines
    const lines1 = str1.split('\n').filter(line => line.trim() !== '');
    const lines2 = str2.split('\n').filter(line => line.trim() !== '');
    
    // Statistics
    let totalLines = Math.max(lines1.length, lines2.length);
    let addedLines = 0;
    let removedLines = 0;
    let modifiedLines = 0;
    let unchangedLines = 0;
    
    // Create diff output
    let diffHtml = '<div class="diff-container">';
    
    // Compare line by line
    const maxLines = Math.max(lines1.length, lines2.length);
    for (let i = 0; i < maxLines; i++) {
        const line1 = lines1[i] || '';
        const line2 = lines2[i] || '';
        
        if (line1 === line2) {
            // Lines are identical
            diffHtml += `<div class="diff-line same">
                <div class="diff-line-number">${i + 1}</div>
                <div class="diff-content">${line1}</div>
            </div>`;
            unchangedLines++;
        } else if (!line1) {
            // Line was added
            diffHtml += `<div class="diff-line added">
                <div class="diff-line-number">${i + 1}</div>
                <div class="diff-content">
                    <div class="diff-added">${line2}</div>
                </div>
            </div>`;
            addedLines++;
        } else if (!line2) {
            // Line was removed
            diffHtml += `<div class="diff-line removed">
                <div class="diff-line-number">${i + 1}</div>
                <div class="diff-content">
                    <div class="diff-removed">${line1}</div>
                </div>
            </div>`;
            removedLines++;
        } else {
            // Lines are different - compare words
            const words1 = line1.split(/\s+/).filter(word => word !== '');
            const words2 = line2.split(/\s+/).filter(word => word !== '');
            let wordDiff = '';
            
            // Compare words
            const maxWords = Math.max(words1.length, words2.length);
            for (let j = 0; j < maxWords; j++) {
                const word1 = words1[j] || '';
                const word2 = words2[j] || '';
                
                if (word1 === word2) {
                    wordDiff += `<span class="word-same">${word1}</span> `;
                } else {
                    if (word1) wordDiff += `<span class="word-removed">${word1}</span> `;
                    if (word2) wordDiff += `<span class="word-added">${word2}</span> `;
                }
            }
            
            diffHtml += `<div class="diff-line modified">
                <div class="diff-line-number">${i + 1}</div>
                <div class="diff-content">
                    <div class="diff-modified">${wordDiff}</div>
                </div>
            </div>`;
            modifiedLines++;
        }
    }
    
    diffHtml += '</div>';
    
    // Update the output containers
    const outputContainer = document.getElementById('diffOutput');
    const statsContainer = document.getElementById('diffStats');
    
    if (outputContainer) {
        outputContainer.innerHTML = diffHtml;
    }
    
    if (statsContainer) {
        const statsHtml = `
            <div class="diff-statistics">
                <div class="stat-item">
                    <span class="stat-label">Total Lines:</span>
                    <span class="stat-value">${totalLines}</span>
                </div>
                <div class="stat-item">
                    <span class="stat-label">Unchanged:</span>
                    <span class="stat-value unchanged">${unchangedLines}</span>
                </div>
                <div class="stat-item">
                    <span class="stat-label">Added:</span>
                    <span class="stat-value added">${addedLines}</span>
                </div>
                <div class="stat-item">
                    <span class="stat-label">Removed:</span>
                    <span class="stat-value removed">${removedLines}</span>
                </div>
                <div class="stat-item">
                    <span class="stat-label">Modified:</span>
                    <span class="stat-value modified">${modifiedLines}</span>
                </div>
            </div>
        `;
        statsContainer.innerHTML = statsHtml;
    }
}

// Add loading animation to card
function setCardLoading(cardId, isLoading) {
    const card = document.getElementById(cardId);
    if (card) {
        if (isLoading) {
            card.classList.add('loading');
        } else {
            card.classList.remove('loading');
        }
    }
}

// Add copy functionality to result containers
function addCopyButtons() {
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
                const textToCopy = container.querySelector('textarea, pre').value;
                
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
}

// Wrap result outputs in containers
function wrapResults() {
    const resultOutputs = document.querySelectorAll('textarea[readonly], pre');
    
    resultOutputs.forEach(output => {
        if (!output.parentElement.classList.contains('result-container')) {
            const container = document.createElement('div');
            container.className = 'result-container';
            output.parentNode.insertBefore(container, output);
            container.appendChild(output);
        }
    });
}

// Remove Duplicate Lines
function removeDuplicateLines() {
    const duplicateInput = document.getElementById('duplicateInput');
    const duplicateOutput = document.getElementById('duplicateOutput');
    
    if (duplicateInput && duplicateOutput) {
        const text = duplicateInput.value;
        const lines = text.split('\n');
        const uniqueLines = [...new Set(lines)];
        duplicateOutput.value = uniqueLines.join('\n');
    }
}

// Morse Code Converter
const morseCode = {
    'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',
    'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
    'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
    'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
    'Y': '-.--', 'Z': '--..', ' ': ' ', '1': '.----', '2': '..---', '3': '...--',
    '4': '....-', '5': '.....', '6': '-....', '7': '--...', '8': '---..',
    '9': '----.', '0': '-----', '.': '.-.-.-', ',': '--..--', '?': '..--..',
    '!': '-.-.--', '@': '.--.-.'
};

const reverseMorseCode = Object.fromEntries(
    Object.entries(morseCode).map(([key, value]) => [value, key])
);

function convertMorse(type) {
    const encodeInput = document.getElementById('morseEncode');
    const decodeInput = document.getElementById('morseDecode');
    const encodedOutput = document.getElementById('morseEncoded');
    const decodedOutput = document.getElementById('morseDecoded');
    
    try {
        if (type === 'encode') {
            if (!encodeInput || !encodedOutput) return;
            
            const text = encodeInput.value.toUpperCase();
            if (!text) {
                encodedOutput.value = '';
                return;
            }
            
            const morse = text.split('').map(char => {
                return morseCode[char] || char;
            }).join(' ');
            
            encodedOutput.value = morse;
        } else if (type === 'decode') {
            if (!decodeInput || !decodedOutput) return;
            
            const morse = decodeInput.value;
            if (!morse) {
                decodedOutput.value = '';
                return;
            }
            
            const text = morse.split(' ').map(code => {
                return reverseMorseCode[code] || code;
            }).join('');
            
            decodedOutput.value = text;
        }
    } catch (error) {
        if (type === 'encode') {
            encodedOutput.value = 'Error: Could not encode to Morse code';
        } else {
            decodedOutput.value = 'Error: Invalid Morse code';
        }
    }
}

// Lorem Ipsum Generator
function generateLoremIpsum() {
    const output = document.getElementById('loremOutput');
    const paragraphCount = parseInt(document.getElementById('paragraphCount').value) || 3;
    
    if (!output) return;
    
    const loremWords = [
        'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit',
        'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore',
        'magna', 'aliqua', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud', 'exercitation',
        'ullamco', 'laboris', 'nisi', 'aliquip', 'ex', 'ea', 'commodo', 'consequat',
        'duis', 'aute', 'irure', 'dolor', 'in', 'reprehenderit', 'voluptate', 'velit',
        'esse', 'cillum', 'dolore', 'eu', 'fugiat', 'nulla', 'pariatur', 'excepteur',
        'sint', 'occaecat', 'cupidatat', 'non', 'proident', 'sunt', 'in', 'culpa',
        'qui', 'officia', 'deserunt', 'mollit', 'anim', 'id', 'est', 'laborum'
    ];
    
    let result = '';
    for (let i = 0; i < paragraphCount; i++) {
        let paragraph = '';
        const sentenceCount = Math.floor(Math.random() * 3) + 3; // 3-5 sentences per paragraph
        
        for (let j = 0; j < sentenceCount; j++) {
            const wordCount = Math.floor(Math.random() * 8) + 8; // 8-15 words per sentence
            let sentence = '';
            
            for (let k = 0; k < wordCount; k++) {
                const word = loremWords[Math.floor(Math.random() * loremWords.length)];
                sentence += (k === 0 ? word.charAt(0).toUpperCase() + word.slice(1) : word) + ' ';
            }
            
            paragraph += sentence.trim() + '. ';
        }
        
        result += paragraph.trim() + '\n\n';
    }
    
    output.value = result.trim();
}

// Text Encryptor/Decryptor
function handleCipher(type) {
    const input = document.getElementById('encryptInput');
    const output = document.getElementById('encryptOutput');
    const shift = document.getElementById('caesarShift')?.value || 3;
    
    if (!input || !output) return;
    
    const text = input.value;
    let result = '';
    
    switch(type) {
        case 'caesar':
            result = text.split('').map(char => {
                const code = char.charCodeAt(0);
                if (code >= 65 && code <= 90) { // Uppercase
                    return String.fromCharCode(((code - 65 + parseInt(shift)) % 26) + 65);
                } else if (code >= 97 && code <= 122) { // Lowercase
                    return String.fromCharCode(((code - 97 + parseInt(shift)) % 26) + 97);
                }
                return char;
            }).join('');
            break;
        case 'rot13':
            result = text.split('').map(char => {
                const code = char.charCodeAt(0);
                if (code >= 65 && code <= 90) { // Uppercase
                    return String.fromCharCode(((code - 65 + 13) % 26) + 65);
                } else if (code >= 97 && code <= 122) { // Lowercase
                    return String.fromCharCode(((code - 97 + 13) % 26) + 97);
                }
                return char;
            }).join('');
            break;
    }
    
    output.value = result;
}

// Find and Replace
function findAndReplace() {
    const input = document.getElementById('findReplaceInput');
    const output = document.getElementById('findReplaceOutput');
    const findText = document.getElementById('findText').value;
    const replaceText = document.getElementById('replaceText').value;
    const caseSensitive = document.getElementById('caseSensitive').checked;
    
    if (!input || !output) return;
    
    let text = input.value;
    if (!text) {
        output.value = '';
        return;
    }
    
    if (!findText) {
        output.value = text;
        return;
    }
    
    try {
        if (!caseSensitive) {
            const regex = new RegExp(findText, 'gi');
            text = text.replace(regex, replaceText);
        } else {
            text = text.replaceAll(findText, replaceText);
        }
        
        output.value = text;
    } catch (error) {
        output.value = 'Error: Invalid search pattern';
    }
}

// Text Cleaner
function cleanText(type) {
    const input = document.getElementById('cleanerInput');
    const output = document.getElementById('cleanerOutput');
    
    if (!input || !output) return;
    
    let text = input.value;
    if (!text) {
        output.value = '';
        return;
    }
    
    switch(type) {
        case 'spaces':
            // Remove extra spaces and trim
            text = text.replace(/\s+/g, ' ').trim();
            break;
        case 'lines':
            // Remove empty lines and normalize line endings
            text = text.split('\n')
                      .filter(line => line.trim() !== '')
                      .join('\n');
            break;
        case 'special':
            // Remove special characters but keep letters, numbers, and basic punctuation
            text = text.replace(/[^a-zA-Z0-9\s.,!?-]/g, '');
            break;
    }
    
    output.value = text;
}

// Base64 Encoder/Decoder
function handleBase64(type) {
    const encodeInput = document.getElementById('base64Encode');
    const decodeInput = document.getElementById('base64Decode');
    const encodedOutput = document.getElementById('base64Encoded');
    const decodedOutput = document.getElementById('base64Decoded');
    
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
            if (!decodeInput || !decodedOutput) return;
            
            const base64 = decodeInput.value;
            if (!base64) {
                decodedOutput.value = '';
                return;
            }
            
            // Validate Base64 input
            if (!/^[A-Za-z0-9+/=]+$/.test(base64)) {
                decodedOutput.value = 'Error: Invalid Base64 input';
                return;
            }
            
            try {
                // Decode Base64 to text
                const decoded = decodeURIComponent(escape(atob(base64)));
                decodedOutput.value = decoded;
            } catch (error) {
                decodedOutput.value = 'Error: Invalid Base64 format';
            }
        }
    } catch (error) {
        if (type === 'encode') {
            encodedOutput.value = 'Error: Could not encode text';
        } else {
            decodedOutput.value = 'Error: Could not decode Base64';
        }
    }
}

// Slug Generator
function generateSlug() {
    const input = document.getElementById('slugInput');
    const output = document.getElementById('slugOutput');
    
    if (!input || !output) return;
    
    const text = input.value;
    if (!text) {
        output.value = '';
        return;
    }
    
    // Convert to lowercase, replace spaces and special chars with hyphens
    const slug = text
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
        .replace(/\s+/g, '-')         // Replace spaces with hyphens
        .replace(/-+/g, '-')          // Replace multiple hyphens with single hyphen
        .replace(/^-+|-+$/g, '');     // Remove hyphens from start and end
    
    output.value = slug;
} 