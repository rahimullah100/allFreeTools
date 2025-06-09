// Add notification styles
const style = document.createElement('style');
style.textContent = `
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        border-radius: 4px;
        color: white;
        font-weight: 500;
        transform: translateX(120%);
        transition: transform 0.3s ease-in-out;
        z-index: 1000;
    }

    .notification.show {
        transform: translateX(0);
    }

    .notification.success {
        background-color: var(--success-color);
    }

    .notification.error {
        background-color: var(--error-color);
    }

    .notification.info {
        background-color: var(--primary-color);
    }
`;
document.head.appendChild(style);

// Add styles for synonym popup
const synonymStyle = document.createElement('style');
synonymStyle.textContent = `
    .synonym-popup {
        position: absolute;
        background: var(--background-color);
        border: 1px solid var(--border-color);
        border-radius: 4px;
        padding: 0.5rem;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        z-index: 1000;
        display: none;
    }

    .synonym-item {
        padding: 0.25rem 0.5rem;
        cursor: pointer;
        border-radius: 2px;
    }

    .synonym-item:hover {
        background-color: var(--hover-color);
    }

    #translatedText {
        cursor: pointer;
    }
`;
document.head.appendChild(synonymStyle);

// Initialize all tools when the document is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize navigation
    initializeNavigation();

    // Initialize all tool functionalities
    initializeCaseConverter();
    initializeWordCounter();
    initializeJsonFormatter();
    initializeTextEncryptor();
    initializeFindReplace();
    initializeTextCleaner();
    initializeBase64Converter();
    initializeSlugGenerator();
    initializeMorseConverter();
    initializeLoremGenerator();
    initializeTextSorter();
    initializeBinaryConverter();
    initializeDiffChecker();
    initializeSwapLetters();
    initializeSwapWords();
    initializeDuplicateWords();
    initializeRemoveWords();
    initializeDuplicateSentences();
    initializeRemoveSentences();
    initializeReplaceWords();
    initializeAddRandomWords();
    initializeAddRandomLetters();
    initializeIntroduceErrors();
    initializeFakeText();
    initializeRemoveRandomLetters();
    initializeRemoveRandomSymbols();
    initializeAddSymbolsAroundWords();
    initializeRemoveSymbolsAroundWords();
    initializeAddPrefixLines();
    initializeAddSuffixLines();
    initializeRemovePrefixLines();
    initializeRemoveSuffixLines();
    initializeAddPrefixWords();
    initializeAddSuffixWords();
    initializeSortSymbols();
    initializeRandomizeLetters();
    initializeScrambleWords();
    initializeRandomizeWords();
    initializeRandomizeLines();
    initializeRandomizeSentences();
    initializeRandomizeParagraphs();
    initializeCalculateLetterSum();
    initializeUnwrapText();
    initializeReverseText();
    initializeRemoveDuplicates();
    initializeSplitText();
    initializeJoinText();
    initializeRepeatText();
    initializeTruncateText();
    initializeSliceText();
    initializeTrimText();
    initializePadText();
    initializeAlignText();
    initializeIndentText();
    initializeJustifyText();
    initializeWrapText();
});

// Navigation functionality
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.quick-nav-links a');
    const toolCards = document.querySelectorAll('.tool-card');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            
            // Update active states
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            
            // Show target tool card
            toolCards.forEach(card => {
                if (card.id === targetId) {
                    card.classList.add('active');
                } else {
                    card.classList.remove('active');
                }
            });
        });
    });

    // Show first tool card by default
    if (toolCards.length > 0) {
        toolCards[0].classList.add('active');
        navLinks[0].classList.add('active');
    }
}

// Text Case Converter
function initializeCaseConverter() {
    const caseInput = document.getElementById('caseInput');
    const caseOutput = document.getElementById('caseOutput');
    const caseButtons = document.querySelectorAll('[data-case]');

    caseButtons.forEach(button => {
        button.addEventListener('click', function() {
            const text = caseInput.value;
            const caseType = this.dataset.case;
            
            switch(caseType) {
                case 'upper':
                    caseOutput.value = text.toUpperCase();
                    break;
                case 'lower':
                    caseOutput.value = text.toLowerCase();
                    break;
                case 'sentence':
                    caseOutput.value = text.toLowerCase().replace(/(^\w|\.\s+\w)/g, letter => letter.toUpperCase());
                    break;
                case 'title':
                    caseOutput.value = text.toLowerCase().replace(/\b\w/g, letter => letter.toUpperCase());
                    break;
            }
        });
    });
}

// Word Counter
function initializeWordCounter() {
    const wordInput = document.getElementById('wordInput');
    const charCount = document.getElementById('charCount');
    const wordCount = document.getElementById('wordCount');
    const lineCount = document.getElementById('lineCount');
    const paraCount = document.getElementById('paragraphCount');

    wordInput.addEventListener('input', () => {
        const text = wordInput.value;
        const chars = text.length;
        const words = text.trim() ? text.trim().split(/\s+/).length : 0;
        const lines = text.split('\n').length;
        const paragraphs = text.split(/\n\s*\n/).filter(p => p.trim()).length;

        // Update the display in a single row
        const stats = `Characters: ${chars} | Words: ${words} | Lines: ${lines} | Paragraphs: ${paragraphs}`;
        
        // Update all stat elements with the combined text
        [charCount, wordCount, lineCount, paraCount].forEach(element => {
            element.textContent = stats;
        });
    });
}

// JSON Formatter
function initializeJsonFormatter() {
    const jsonInput = document.getElementById('jsonInput');
    const jsonOutput = document.getElementById('jsonOutput');
    const jsonButtons = document.querySelectorAll('[data-json]');

    jsonButtons.forEach(button => {
        button.addEventListener('click', function() {
            const action = this.dataset.json;
            try {
                const json = JSON.parse(jsonInput.value);
                if (action === 'format') {
                    jsonOutput.value = JSON.stringify(json, null, 4);
                } else if (action === 'minify') {
                    jsonOutput.value = JSON.stringify(json);
                }
            } catch (e) {
                jsonOutput.value = 'Error: Invalid JSON';
            }
        });
    });
}

// Text Encryptor
function initializeTextEncryptor() {
    const encryptInput = document.getElementById('encryptInput');
    const encryptOutput = document.getElementById('encryptOutput');
    const encryptButtons = document.querySelectorAll('[data-encrypt]');

    encryptButtons.forEach(button => {
        button.addEventListener('click', function() {
            const text = encryptInput.value;
            const cipherType = this.dataset.encrypt;
            
            if (cipherType === 'caesar') {
                encryptOutput.value = text.split('').map(char => {
                    const code = char.charCodeAt(0);
                    if (code >= 65 && code <= 90) { // Uppercase
                        return String.fromCharCode(((code - 65 + 3) % 26) + 65);
                    } else if (code >= 97 && code <= 122) { // Lowercase
                        return String.fromCharCode(((code - 97 + 3) % 26) + 97);
                    }
                    return char;
                }).join('');
            } else if (cipherType === 'rot13') {
                encryptOutput.value = text.split('').map(char => {
                    const code = char.charCodeAt(0);
                    if (code >= 65 && code <= 90) { // Uppercase
                        return String.fromCharCode(((code - 65 + 13) % 26) + 65);
                    } else if (code >= 97 && code <= 122) { // Lowercase
                        return String.fromCharCode(((code - 97 + 13) % 26) + 97);
                    }
                    return char;
                }).join('');
            }
        });
    });
}

// Find & Replace
function initializeFindReplace() {
    const findInput = document.getElementById('findInput');
    const replaceInput = document.getElementById('replaceInput');
    const findReplaceInput = document.getElementById('findReplaceInput');
    const findReplaceOutput = document.getElementById('findReplaceOutput');
    const findReplaceBtn = document.getElementById('findReplaceBtn');
    const caseSensitive = document.getElementById('caseSensitive');

    findReplaceBtn.addEventListener('click', () => {
        const text = findReplaceInput.value;
        const find = findInput.value;
        const replace = replaceInput.value;
        const isCaseSensitive = caseSensitive.checked;

        if (isCaseSensitive) {
            findReplaceOutput.value = text.replace(new RegExp(find, 'g'), replace);
        } else {
            findReplaceOutput.value = text.replace(new RegExp(find, 'gi'), replace);
        }
    });
}

// Text Cleaner
function initializeTextCleaner() {
    const cleanInput = document.getElementById('cleanInput');
    const cleanOutput = document.getElementById('cleanOutput');
    const cleanButtons = document.querySelectorAll('[data-clean]');

    cleanButtons.forEach(button => {
        button.addEventListener('click', function() {
            const text = cleanInput.value;
            const cleanType = this.dataset.clean;
            
            switch(cleanType) {
                case 'spaces':
                    cleanOutput.value = text.replace(/\s+/g, ' ').trim();
                    break;
                case 'lines':
                    cleanOutput.value = text.replace(/^\s*[\r\n]/gm, '');
                    break;
                case 'special':
                    cleanOutput.value = text.replace(/[^\w\s]/g, '');
                    break;
            }
        });
    });
}

// Base64 Converter
function initializeBase64Converter() {
    const base64Encode = document.getElementById('base64Encode');
    const base64Encoded = document.getElementById('base64Encoded');
    const base64Decode = document.getElementById('base64Decode');
    const base64Decoded = document.getElementById('base64Decoded');
    const base64Buttons = document.querySelectorAll('[data-base64]');

    base64Buttons.forEach(button => {
        button.addEventListener('click', function() {
            const action = this.dataset.base64;
            if (action === 'encode') {
                try {
                    base64Encoded.value = btoa(base64Encode.value);
                } catch (e) {
                    base64Encoded.value = 'Error: Invalid input for encoding';
                }
            } else if (action === 'decode') {
                try {
                    base64Decoded.value = atob(base64Decode.value);
                } catch (e) {
                    base64Decoded.value = 'Error: Invalid Base64 input';
                }
            }
        });
    });
}

// Slug Generator
function initializeSlugGenerator() {
    const slugInput = document.getElementById('slugInput');
    const slugOutput = document.getElementById('slugOutput');
    const generateSlugBtn = document.getElementById('generateSlugBtn');

    generateSlugBtn.addEventListener('click', () => {
        const text = slugInput.value;
        const slug = text
            .toLowerCase()
            .replace(/[^\w\s-]/g, '')
            .replace(/[\s_-]+/g, '-')
            .replace(/^-+|-+$/g, '');
        slugOutput.value = slug;
    });
}

// Morse Code Converter
function initializeMorseConverter() {
    const morseEncode = document.getElementById('morseEncode');
    const morseEncoded = document.getElementById('morseEncoded');
    const morseDecode = document.getElementById('morseDecode');
    const morseDecoded = document.getElementById('morseDecoded');
    const morseButtons = document.querySelectorAll('[data-morse]');

    const morseCode = {
        'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',
        'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
        'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
        'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
        'Y': '-.--', 'Z': '--..', ' ': ' '
    };

    const reverseMorseCode = Object.fromEntries(
        Object.entries(morseCode).map(([k, v]) => [v, k])
    );

    morseButtons.forEach(button => {
        button.addEventListener('click', function() {
            const action = this.dataset.morse;
            if (action === 'encode') {
                const text = morseEncode.value.toUpperCase();
                morseEncoded.value = text.split('').map(char => 
                    morseCode[char] || char
                ).join(' ');
            } else if (action === 'decode') {
                const morse = morseDecode.value;
                morseDecoded.value = morse.split(' ').map(code => 
                    reverseMorseCode[code] || code
                ).join('');
            }
        });
    });
}

// Lorem Ipsum Generator
function initializeLoremGenerator() {
    const paragraphCount = document.getElementById('paragraphCount');
    const generateLoremBtn = document.getElementById('generateLoremBtn');
    const loremOutput = document.getElementById('loremOutput');

    const loremText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.';

    generateLoremBtn.addEventListener('click', () => {
        const count = parseInt(paragraphCount.value) || 3;
        const paragraphs = Array(count).fill(loremText).join('\n\n');
        loremOutput.value = paragraphs;
    });
}

// Text Sorter
function initializeTextSorter() {
    const sortInput = document.getElementById('sortInput');
    const sortOutput = document.getElementById('sortOutput');
    const sortButtons = document.querySelectorAll('[data-sort]');

    sortButtons.forEach(button => {
        button.addEventListener('click', function() {
            const text = sortInput.value;
            const sortType = this.dataset.sort;
            const lines = text.split('\n').filter(line => line.trim());

            if (sortType === 'alpha') {
                lines.sort();
            } else if (sortType === 'length') {
                lines.sort((a, b) => a.length - b.length);
            }

            sortOutput.value = lines.join('\n');
        });
    });
}

// Binary Converter
function initializeBinaryConverter() {
    const textToBinary = document.getElementById('textToBinary');
    const binaryOutput = document.getElementById('binaryOutput');
    const binaryToText = document.getElementById('binaryToText');
    const textOutput = document.getElementById('textOutput');
    const binaryButtons = document.querySelectorAll('[data-convert]');

    binaryButtons.forEach(button => {
        button.addEventListener('click', function() {
            const action = this.dataset.convert;
            if (action === 'toBinary') {
                binaryOutput.value = textToBinary.value.split('').map(char => 
                    char.charCodeAt(0).toString(2).padStart(8, '0')
                ).join(' ');
            } else if (action === 'toText') {
                try {
                    textOutput.value = binaryToText.value.split(' ').map(bin => 
                        String.fromCharCode(parseInt(bin, 2))
                    ).join('');
                } catch (e) {
                    textOutput.value = 'Error: Invalid binary input';
                }
            }
        });
    });
}

// Diff Checker
function initializeDiffChecker() {
    const diffText1 = document.getElementById('diffText1');
    const diffText2 = document.getElementById('diffText2');
    const diffOutput = document.getElementById('diffOutput');
    const compareBtn = document.getElementById('compareBtn');

    compareBtn.addEventListener('click', () => {
        const text1 = diffText1.value.split('\n');
        const text2 = diffText2.value.split('\n');
        const diff = [];

        for (let i = 0; i < Math.max(text1.length, text2.length); i++) {
            if (text1[i] !== text2[i]) {
                diff.push(`Line ${i + 1}:`);
                if (text1[i]) diff.push(`- ${text1[i]}`);
                if (text2[i]) diff.push(`+ ${text2[i]}`);
            }
        }

        diffOutput.value = diff.join('\n');
    });
}

// Swap Letters
function initializeSwapLetters() {
    const swapLettersInput = document.getElementById('swapLettersInput');
    const swapLettersOutput = document.getElementById('swapLettersOutput');
    const swapLettersBtn = document.getElementById('swapLettersBtn');

    swapLettersBtn.addEventListener('click', () => {
        const text = swapLettersInput.value;
        const words = text.split(' ');
        const swappedWords = words.map(word => {
            if (word.length <= 1) return word;
            const chars = word.split('');
            for (let i = 0; i < chars.length - 1; i += 2) {
                [chars[i], chars[i + 1]] = [chars[i + 1], chars[i]];
            }
            return chars.join('');
        });
        swapLettersOutput.value = swappedWords.join(' ');
    });
}

// Swap Words
function initializeSwapWords() {
    const swapWordsInput = document.getElementById('swapWordsInput');
    const swapWordsOutput = document.getElementById('swapWordsOutput');
    const swapWordsBtn = document.getElementById('swapWordsBtn');

    swapWordsBtn.addEventListener('click', () => {
        const text = swapWordsInput.value;
        const words = text.split(' ');
        for (let i = 0; i < words.length - 1; i += 2) {
            [words[i], words[i + 1]] = [words[i + 1], words[i]];
        }
        swapWordsOutput.value = words.join(' ');
    });
}

// Duplicate Words
function initializeDuplicateWords() {
    const duplicateWordsInput = document.getElementById('duplicateWordsInput');
    const duplicateWordsOutput = document.getElementById('duplicateWordsOutput');
    const duplicateWordsBtn = document.getElementById('duplicateWordsBtn');

    duplicateWordsBtn.addEventListener('click', () => {
        const text = duplicateWordsInput.value;
        const words = text.split(' ');
        const duplicatedWords = words.map(word => word + ' ' + word);
        duplicateWordsOutput.value = duplicatedWords.join(' ');
    });
}

// Remove Words
function initializeRemoveWords() {
    const removeWordsInput = document.getElementById('removeWordsInput');
    const removeWordsOutput = document.getElementById('removeWordsOutput');
    const removeWordsBtn = document.getElementById('removeWordsBtn');
    const wordToRemove = document.getElementById('wordToRemove');

    removeWordsBtn.addEventListener('click', () => {
        const text = removeWordsInput.value.trim();
        const word = wordToRemove.value.trim();

            if (!text) {
            showNotification('Please enter some text', 'error');
                return;
            }

        if (!word) {
            showNotification('Please enter a word to remove', 'error');
            return;
        }

        try {
            // Escape special characters in the word
            const escapedWord = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            const regex = new RegExp(`\\b${escapedWord}\\b`, 'g');
            const result = text.replace(regex, '').replace(/\s+/g, ' ').trim();
            
            if (result === text) {
                showNotification('No matching words found', 'info');
            }
            
            removeWordsOutput.value = result;
        } catch (error) {
            showNotification('Error processing text', 'error');
            console.error('Error in removeWords:', error);
        }
    });
}

// Duplicate Sentences
function initializeDuplicateSentences() {
    const duplicateSentencesInput = document.getElementById('duplicateSentencesInput');
    const duplicateSentencesOutput = document.getElementById('duplicateSentencesOutput');
    const duplicateSentencesBtn = document.getElementById('duplicateSentencesBtn');

    duplicateSentencesBtn.addEventListener('click', () => {
        const text = duplicateSentencesInput.value;
        const sentences = text.split(/[.!?]+/).filter(s => s.trim());
        const duplicatedSentences = sentences.map(sentence => sentence.trim() + '. ' + sentence.trim() + '.');
        duplicateSentencesOutput.value = duplicatedSentences.join(' ');
    });
}

// Remove Sentences
function initializeRemoveSentences() {
    const removeSentencesInput = document.getElementById('removeSentencesInput');
    const removeSentencesOutput = document.getElementById('removeSentencesOutput');
    const removeSentencesBtn = document.getElementById('removeSentencesBtn');
    const sentenceToRemove = document.getElementById('sentenceToRemove');

    removeSentencesBtn.addEventListener('click', () => {
        const text = removeSentencesInput.value;
        const sentence = sentenceToRemove.value;
        const sentences = text.split(/[.!?]+/).filter(s => s.trim());
        const filteredSentences = sentences.filter(s => s.trim() !== sentence.trim());
        removeSentencesOutput.value = filteredSentences.join('. ') + '.';
    });
}

// Replace Words
function initializeReplaceWords() {
    const replaceWordsInput = document.getElementById('replaceWordsInput');
    const replaceWordsOutput = document.getElementById('replaceWordsOutput');
    const replaceWordsBtn = document.getElementById('replaceWordsBtn');
    const wordToReplace = document.getElementById('wordToReplace');
    const replacementWord = document.getElementById('replacementWord');

    replaceWordsBtn.addEventListener('click', () => {
        const text = replaceWordsInput.value;
        const word = wordToReplace.value;
        const replacement = replacementWord.value;
        const regex = new RegExp(`\\b${word}\\b`, 'g');
        replaceWordsOutput.value = text.replace(regex, replacement);
    });
}

// Add Random Words
function initializeAddRandomWords() {
    const addRandomWordsInput = document.getElementById('addRandomWordsInput');
    const addRandomWordsOutput = document.getElementById('addRandomWordsOutput');
    const addRandomWordsBtn = document.getElementById('addRandomWordsBtn');
    const randomWords = ['apple', 'banana', 'cherry', 'date', 'elderberry', 'fig', 'grape', 'honeydew'];

    addRandomWordsBtn.addEventListener('click', () => {
        const text = addRandomWordsInput.value;
        const words = text.split(' ');
        const result = words.map(word => {
            const randomWord = randomWords[Math.floor(Math.random() * randomWords.length)];
            return word + ' ' + randomWord;
        });
        addRandomWordsOutput.value = result.join(' ');
    });
}

// Add Random Letters
function initializeAddRandomLetters() {
    const addRandomLettersInput = document.getElementById('addRandomLettersInput');
    const addRandomLettersOutput = document.getElementById('addRandomLettersOutput');
    const addRandomLettersBtn = document.getElementById('addRandomLettersBtn');
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';

    addRandomLettersBtn.addEventListener('click', () => {
        const text = addRandomLettersInput.value;
        const result = text.split('').map(char => {
            const randomLetter = alphabet[Math.floor(Math.random() * alphabet.length)];
            return char + randomLetter;
        });
        addRandomLettersOutput.value = result.join('');
    });
}

// Helper functions
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.classList.add('show');
    }, 100);

    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showNotification('Copied to clipboard!', 'success');
    }).catch(() => {
        showNotification('Failed to copy to clipboard', 'error');
    });
}

// Introduce Errors
function initializeIntroduceErrors() {
    const introduceErrorsInput = document.getElementById('introduceErrorsInput');
    const introduceErrorsOutput = document.getElementById('introduceErrorsOutput');
    const introduceErrorsBtn = document.getElementById('introduceErrorsBtn');
    const errorRate = document.getElementById('errorRate');

    introduceErrorsBtn.addEventListener('click', () => {
        const text = introduceErrorsInput.value;
        const rate = parseFloat(errorRate.value) || 0.1;
        const result = text.split('').map(char => {
            if (Math.random() < rate) {
                return String.fromCharCode(char.charCodeAt(0) + 1);
            }
            return char;
        });
        introduceErrorsOutput.value = result.join('');
    });
}

// Fake Text
function initializeFakeText() {
    const fakeTextLength = document.getElementById('fakeTextLength');
    const fakeTextOutput = document.getElementById('fakeTextOutput');
    const generateFakeTextBtn = document.getElementById('generateFakeTextBtn');
    const words = ['lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit'];

    generateFakeTextBtn.addEventListener('click', () => {
        const length = parseInt(fakeTextLength.value) || 50;
        const result = [];
        for (let i = 0; i < length; i++) {
            result.push(words[Math.floor(Math.random() * words.length)]);
        }
        fakeTextOutput.value = result.join(' ');
    });
}

// Remove Random Letters
function initializeRemoveRandomLetters() {
    const removeRandomLettersInput = document.getElementById('removeRandomLettersInput');
    const removeRandomLettersOutput = document.getElementById('removeRandomLettersOutput');
    const removeRandomLettersBtn = document.getElementById('removeRandomLettersBtn');
    const letterRemovalRate = document.getElementById('letterRemovalRate');

    removeRandomLettersBtn.addEventListener('click', () => {
        const text = removeRandomLettersInput.value;
        const rate = parseFloat(letterRemovalRate.value) || 0.1;
        const result = text.split('').filter(char => Math.random() >= rate);
        removeRandomLettersOutput.value = result.join('');
    });
}

// Remove Random Symbols
function initializeRemoveRandomSymbols() {
    const removeRandomSymbolsInput = document.getElementById('removeRandomSymbolsInput');
    const removeRandomSymbolsOutput = document.getElementById('removeRandomSymbolsOutput');
    const removeRandomSymbolsBtn = document.getElementById('removeRandomSymbolsBtn');
    const symbolRemovalRate = document.getElementById('symbolRemovalRate');

    removeRandomSymbolsBtn.addEventListener('click', () => {
        const text = removeRandomSymbolsInput.value;
        const rate = parseFloat(symbolRemovalRate.value) || 0.1;
        const result = text.split('').filter(char => {
            if (/[^\w\s]/.test(char)) {
                return Math.random() >= rate;
            }
            return true;
        });
        removeRandomSymbolsOutput.value = result.join('');
    });
}

// Add Symbols Around Words
function initializeAddSymbolsAroundWords() {
    const addSymbolsInput = document.getElementById('addSymbolsInput');
    const addSymbolsOutput = document.getElementById('addSymbolsOutput');
    const addSymbolsBtn = document.getElementById('addSymbolsBtn');
    const symbols = ['*', '#', '@', '&', '$'];

    addSymbolsBtn.addEventListener('click', () => {
        const text = addSymbolsInput.value;
        const words = text.split(' ');
        const result = words.map(word => {
            const symbol = symbols[Math.floor(Math.random() * symbols.length)];
            return symbol + word + symbol;
        });
        addSymbolsOutput.value = result.join(' ');
    });
}

// Remove Symbols Around Words
function initializeRemoveSymbolsAroundWords() {
    const removeSymbolsInput = document.getElementById('removeSymbolsInput');
    const removeSymbolsOutput = document.getElementById('removeSymbolsOutput');
    const removeSymbolsBtn = document.getElementById('removeSymbolsBtn');

    removeSymbolsBtn.addEventListener('click', () => {
        const text = removeSymbolsInput.value;
        const result = text.replace(/[^\w\s]([^\s]+)[^\w\s]/g, '$1');
        removeSymbolsOutput.value = result;
    });
}

// Add Prefix Lines
function initializeAddPrefixLines() {
    const addPrefixLinesInput = document.getElementById('addPrefixLinesInput');
    const addPrefixLinesOutput = document.getElementById('addPrefixLinesOutput');
    const addPrefixLinesBtn = document.getElementById('addPrefixLinesBtn');
    const prefixText = document.getElementById('prefixText');

    addPrefixLinesBtn.addEventListener('click', () => {
        const text = addPrefixLinesInput.value;
        const prefix = prefixText.value;
        const lines = text.split('\n');
        const result = lines.map(line => prefix + line);
        addPrefixLinesOutput.value = result.join('\n');
    });
}

// Add Suffix Lines
function initializeAddSuffixLines() {
    const addSuffixLinesInput = document.getElementById('addSuffixLinesInput');
    const addSuffixLinesOutput = document.getElementById('addSuffixLinesOutput');
    const addSuffixLinesBtn = document.getElementById('addSuffixLinesBtn');
    const suffixText = document.getElementById('suffixText');

    addSuffixLinesBtn.addEventListener('click', () => {
        const text = addSuffixLinesInput.value;
        const suffix = suffixText.value;
        const lines = text.split('\n');
        const result = lines.map(line => line + suffix);
        addSuffixLinesOutput.value = result.join('\n');
    });
}

// Remove Prefix Lines
function initializeRemovePrefixLines() {
    const removePrefixLinesInput = document.getElementById('removePrefixLinesInput');
    const removePrefixLinesOutput = document.getElementById('removePrefixLinesOutput');
    const removePrefixLinesBtn = document.getElementById('removePrefixLinesBtn');
    const prefixToRemove = document.getElementById('prefixToRemove');

    removePrefixLinesBtn.addEventListener('click', () => {
        const text = removePrefixLinesInput.value;
        const prefix = prefixToRemove.value;
        const lines = text.split('\n');
        const result = lines.map(line => {
            if (line.startsWith(prefix)) {
                return line.slice(prefix.length);
            }
            return line;
        });
        removePrefixLinesOutput.value = result.join('\n');
    });
}

// Remove Suffix Lines
function initializeRemoveSuffixLines() {
    const removeSuffixLinesInput = document.getElementById('removeSuffixLinesInput');
    const removeSuffixLinesOutput = document.getElementById('removeSuffixLinesOutput');
    const removeSuffixLinesBtn = document.getElementById('removeSuffixLinesBtn');
    const suffixToRemove = document.getElementById('suffixToRemove');

    removeSuffixLinesBtn.addEventListener('click', () => {
        const text = removeSuffixLinesInput.value;
        const suffix = suffixToRemove.value;
        const lines = text.split('\n');
        const result = lines.map(line => {
            if (line.endsWith(suffix)) {
                return line.slice(0, -suffix.length);
            }
            return line;
        });
        removeSuffixLinesOutput.value = result.join('\n');
    });
}

// Add Prefix Words
function initializeAddPrefixWords() {
    const addPrefixWordsInput = document.getElementById('addPrefixWordsInput');
    const addPrefixWordsOutput = document.getElementById('addPrefixWordsOutput');
    const addPrefixWordsBtn = document.getElementById('addPrefixWordsBtn');
    const prefixWord = document.getElementById('prefixWord');

    addPrefixWordsBtn.addEventListener('click', () => {
        const text = addPrefixWordsInput.value;
        const prefix = prefixWord.value;
        const words = text.split(' ');
        const result = words.map(word => prefix + word);
        addPrefixWordsOutput.value = result.join(' ');
    });
}

// Add Suffix Words
function initializeAddSuffixWords() {
    const addSuffixWordsInput = document.getElementById('addSuffixWordsInput');
    const addSuffixWordsOutput = document.getElementById('addSuffixWordsOutput');
    const addSuffixWordsBtn = document.getElementById('addSuffixWordsBtn');
    const suffixWord = document.getElementById('suffixWord');

    addSuffixWordsBtn.addEventListener('click', () => {
        const text = addSuffixWordsInput.value;
        const suffix = suffixWord.value;
        const words = text.split(' ');
        const result = words.map(word => word + suffix);
        addSuffixWordsOutput.value = result.join(' ');
    });
}

// Sort Symbols
function initializeSortSymbols() {
    const sortSymbolsInput = document.getElementById('sortSymbolsInput');
    const sortSymbolsOutput = document.getElementById('sortSymbolsOutput');
    const sortSymbolsBtn = document.getElementById('sortSymbolsBtn');

    sortSymbolsBtn.addEventListener('click', () => {
        const text = sortSymbolsInput.value;
        const symbols = text.match(/[^\w\s]/g) || [];
        const sortedSymbols = symbols.sort();
        sortSymbolsOutput.value = sortedSymbols.join('');
    });
}

// Randomize Letters
function initializeRandomizeLetters() {
    const randomizeLettersInput = document.getElementById('randomizeLettersInput');
    const randomizeLettersOutput = document.getElementById('randomizeLettersOutput');
    const randomizeLettersBtn = document.getElementById('randomizeLettersBtn');

    randomizeLettersBtn.addEventListener('click', () => {
        const text = randomizeLettersInput.value;
        const letters = text.split('');
        for (let i = letters.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [letters[i], letters[j]] = [letters[j], letters[i]];
        }
        randomizeLettersOutput.value = letters.join('');
    });
}

// Scramble Words
function initializeScrambleWords() {
    const scrambleWordsInput = document.getElementById('scrambleWordsInput');
    const scrambleWordsOutput = document.getElementById('scrambleWordsOutput');
    const scrambleWordsBtn = document.getElementById('scrambleWordsBtn');

    scrambleWordsBtn.addEventListener('click', () => {
        const text = scrambleWordsInput.value;
        const words = text.split(' ');
        const scrambledWords = words.map(word => {
            const letters = word.split('');
            for (let i = letters.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [letters[i], letters[j]] = [letters[j], letters[i]];
            }
            return letters.join('');
        });
        scrambleWordsOutput.value = scrambledWords.join(' ');
    });
}

// Randomize Words
function initializeRandomizeWords() {
    const randomizeWordsInput = document.getElementById('randomizeWordsInput');
    const randomizeWordsOutput = document.getElementById('randomizeWordsOutput');
    const randomizeWordsBtn = document.getElementById('randomizeWordsBtn');

    randomizeWordsBtn.addEventListener('click', () => {
        try {
            const text = randomizeWordsInput.value.trim();
            if (!text) {
                showNotification('Please enter some text', 'error');
                return;
            }
            const words = text.split(/\s+/);
            for (let i = words.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [words[i], words[j]] = [words[j], words[i]];
            }
            randomizeWordsOutput.value = words.join(' ');
            showNotification('Words randomized successfully', 'success');
        } catch (error) {
            showNotification('Error randomizing words', 'error');
            console.error('Error in randomizeWords:', error);
        }
    });
}

// Randomize Lines
function initializeRandomizeLines() {
    const randomizeLinesInput = document.getElementById('randomizeLinesInput');
    const randomizeLinesOutput = document.getElementById('randomizeLinesOutput');
    const randomizeLinesBtn = document.getElementById('randomizeLinesBtn');

    randomizeLinesBtn.addEventListener('click', () => {
        try {
            const text = randomizeLinesInput.value.trim();
            if (!text) {
                showNotification('Please enter some text', 'error');
                            return;
                        }
            const lines = text.split('\n').filter(line => line.trim());
            if (lines.length <= 1) {
                showNotification('Need more than one line to randomize', 'info');
                return;
            }
            for (let i = lines.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [lines[i], lines[j]] = [lines[j], lines[i]];
            }
            randomizeLinesOutput.value = lines.join('\n');
            showNotification('Lines randomized successfully', 'success');
            } catch (error) {
            showNotification('Error randomizing lines', 'error');
            console.error('Error in randomizeLines:', error);
        }
    });
}

// Randomize Sentences
function initializeRandomizeSentences() {
    const randomizeSentencesInput = document.getElementById('randomizeSentencesInput');
    const randomizeSentencesOutput = document.getElementById('randomizeSentencesOutput');
    const randomizeSentencesBtn = document.getElementById('randomizeSentencesBtn');

    randomizeSentencesBtn.addEventListener('click', () => {
        try {
            const text = randomizeSentencesInput.value.trim();
        if (!text) {
                showNotification('Please enter some text', 'error');
            return;
        }

            // Split text into sentences while preserving punctuation
            const sentences = text.match(/[^.!?]+[.!?]+/g) || [];
            
            if (sentences.length <= 1) {
                showNotification('Need more than one sentence to randomize', 'info');
            return;
        }

            // Clean and store original punctuation
            const cleanedSentences = sentences.map(sentence => {
                const trimmed = sentence.trim();
                const punctuation = trimmed.match(/[.!?]+$/)?.[0] || '.';
                return {
                    text: trimmed.replace(/[.!?]+$/, '').trim(),
                    punctuation: punctuation
                };
            });

            // Randomize the sentences
            for (let i = cleanedSentences.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [cleanedSentences[i], cleanedSentences[j]] = [cleanedSentences[j], cleanedSentences[i]];
            }

            // Reconstruct the text with proper spacing and punctuation
            const result = cleanedSentences
                .map(sentence => sentence.text + sentence.punctuation)
                .join(' ');

            randomizeSentencesOutput.value = result;
            showNotification('Sentences randomized successfully', 'success');
        } catch (error) {
            showNotification('Error randomizing sentences', 'error');
            console.error('Error in randomizeSentences:', error);
        }
    });
}

// Randomize Paragraphs
function initializeRandomizeParagraphs() {
    const randomizeParagraphsInput = document.getElementById('randomizeParagraphsInput');
    const randomizeParagraphsOutput = document.getElementById('randomizeParagraphsOutput');
    const randomizeParagraphsBtn = document.getElementById('randomizeParagraphsBtn');

    randomizeParagraphsBtn.addEventListener('click', () => {
        try {
            const text = randomizeParagraphsInput.value.trim();
            if (!text) {
                showNotification('Please enter some text', 'error');
                return;
            }
            const paragraphs = text.split(/\n\s*\n/).filter(p => p.trim());
            if (paragraphs.length <= 1) {
                showNotification('Need more than one paragraph to randomize', 'info');
                return;
            }
            for (let i = paragraphs.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [paragraphs[i], paragraphs[j]] = [paragraphs[j], paragraphs[i]];
            }
            randomizeParagraphsOutput.value = paragraphs.join('\n\n');
            showNotification('Paragraphs randomized successfully', 'success');
        } catch (error) {
            showNotification('Error randomizing paragraphs', 'error');
            console.error('Error in randomizeParagraphs:', error);
        }
    });
}

// Calculate Letter Sum
function initializeCalculateLetterSum() {
    const letterSumInput = document.getElementById('letterSumInput');
    const letterSumOutput = document.getElementById('letterSumOutput');
    const calculateLetterSumBtn = document.getElementById('calculateLetterSumBtn');

    calculateLetterSumBtn.addEventListener('click', () => {
        try {
            const text = letterSumInput.value.trim();
                    if (!text) {
                showNotification('Please enter some text', 'error');
                        return;
                    }
            const sum = text.split('').reduce((acc, char) => {
                const code = char.toLowerCase().charCodeAt(0);
                if (code >= 97 && code <= 122) { // a-z
                    return acc + (code - 96);
                }
                return acc;
            }, 0);
            letterSumOutput.value = `Sum: ${sum}`;
            showNotification('Letter sum calculated successfully', 'success');
            } catch (error) {
            showNotification('Error calculating letter sum', 'error');
            console.error('Error in calculateLetterSum:', error);
        }
    });
}

// Unwrap Text
function initializeUnwrapText() {
    const unwrapTextInput = document.getElementById('unwrapTextInput');
    const unwrapTextOutput = document.getElementById('unwrapTextOutput');
    const unwrapTextBtn = document.getElementById('unwrapTextBtn');

    unwrapTextBtn.addEventListener('click', () => {
        try {
            const text = unwrapTextInput.value.trim();
        if (!text) {
                showNotification('Please enter some text', 'error');
            return;
            }
            const unwrapped = text.replace(/\n/g, ' ').replace(/\s+/g, ' ').trim();
            unwrapTextOutput.value = unwrapped;
            showNotification('Text unwrapped successfully', 'success');
        } catch (error) {
            showNotification('Error unwrapping text', 'error');
            console.error('Error in unwrapText:', error);
        }
    });
}

// Reverse Text
function initializeReverseText() {
    const reverseTextInput = document.getElementById('reverseTextInput');
    const reverseTextOutput = document.getElementById('reverseTextOutput');
    const reverseTextBtn = document.getElementById('reverseTextBtn');

    reverseTextBtn.addEventListener('click', () => {
        const text = reverseTextInput.value;
        const reversed = text.split('').reverse().join('');
        reverseTextOutput.value = reversed;
    });
}

// Remove Duplicates
function initializeRemoveDuplicates() {
    const duplicateInput = document.getElementById('duplicateInput');
    const duplicateOutput = document.getElementById('duplicateOutput');
    const removeDuplicatesBtn = document.getElementById('removeDuplicatesBtn');

    removeDuplicatesBtn.addEventListener('click', () => {
        const text = duplicateInput.value;
        const lines = text.split('\n');
        const uniqueLines = [...new Set(lines)];
        duplicateOutput.value = uniqueLines.join('\n');
    });
}

// Split Text
function initializeSplitText() {
    const splitTextInput = document.getElementById('splitTextInput');
    const splitTextOutput = document.getElementById('splitTextOutput');
    const splitTextBtn = document.getElementById('splitTextBtn');
    const splitDelimiter = document.getElementById('splitDelimiter');

    splitTextBtn.addEventListener('click', () => {
        const text = splitTextInput.value;
        const delimiter = splitDelimiter.value || '\n';
        const parts = text.split(delimiter);
        splitTextOutput.value = parts.join('\n');
    });
}

// Join Text
function initializeJoinText() {
    const joinTextInput = document.getElementById('joinTextInput');
    const joinTextOutput = document.getElementById('joinTextOutput');
    const joinTextBtn = document.getElementById('joinTextBtn');
    const joinDelimiter = document.getElementById('joinDelimiter');

    joinTextBtn.addEventListener('click', () => {
        const text = joinTextInput.value;
        const delimiter = joinDelimiter.value || ' ';
        const lines = text.split('\n');
        joinTextOutput.value = lines.join(delimiter);
    });
}

// Repeat Text
function initializeRepeatText() {
    const repeatTextInput = document.getElementById('repeatTextInput');
    const repeatTextOutput = document.getElementById('repeatTextOutput');
    const repeatTextBtn = document.getElementById('repeatTextBtn');
    const repeatCount = document.getElementById('repeatCount');

    repeatTextBtn.addEventListener('click', () => {
        const text = repeatTextInput.value;
        const count = parseInt(repeatCount.value) || 1;
        repeatTextOutput.value = text.repeat(count);
    });
}

// Truncate Text
function initializeTruncateText() {
    const truncateTextInput = document.getElementById('truncateTextInput');
    const truncateTextOutput = document.getElementById('truncateTextOutput');
    const truncateTextBtn = document.getElementById('truncateTextBtn');
    const truncateLength = document.getElementById('truncateLength');
    const truncateSuffix = document.getElementById('truncateSuffix');

    truncateTextBtn.addEventListener('click', () => {
        const text = truncateTextInput.value;
        const length = parseInt(truncateLength.value) || 100;
        const suffix = truncateSuffix.value || '...';
        
        if (text.length <= length) {
            truncateTextOutput.value = text;
                } else {
            truncateTextOutput.value = text.substring(0, length) + suffix;
        }
    });
}

// Slice Text
function initializeSliceText() {
    const sliceTextInput = document.getElementById('sliceTextInput');
    const sliceTextOutput = document.getElementById('sliceTextOutput');
    const sliceTextBtn = document.getElementById('sliceTextBtn');
    const sliceStart = document.getElementById('sliceStart');
    const sliceEnd = document.getElementById('sliceEnd');

    sliceTextBtn.addEventListener('click', () => {
        const text = sliceTextInput.value;
        const start = parseInt(sliceStart.value) || 0;
        const end = parseInt(sliceEnd.value) || text.length;
        
        if (start < 0) start = 0;
        if (end > text.length) end = text.length;
        
        sliceTextOutput.value = text.slice(start, end);
    });
}

// Trim Text
function initializeTrimText() {
    const trimTextInput = document.getElementById('trimTextInput');
    const trimTextOutput = document.getElementById('trimTextOutput');
    const trimStartBtn = document.getElementById('trimStartBtn');
    const trimEndBtn = document.getElementById('trimEndBtn');
    const trimBothBtn = document.getElementById('trimBothBtn');

    trimStartBtn.addEventListener('click', () => {
        trimTextOutput.value = trimTextInput.value.replace(/^\s+/g, '');
    });

    trimEndBtn.addEventListener('click', () => {
        trimTextOutput.value = trimTextInput.value.replace(/\s+$/g, '');
    });

    trimBothBtn.addEventListener('click', () => {
        trimTextOutput.value = trimTextInput.value.trim();
    });
}

// Pad Text
function initializePadText() {
    const padTextInput = document.getElementById('padTextInput');
    const padTextOutput = document.getElementById('padTextOutput');
    const padTextBtn = document.getElementById('padTextBtn');
    const padLength = document.getElementById('padLength');
    const padChar = document.getElementById('padChar');
    const padDirection = document.getElementById('padDirection');

    padTextBtn.addEventListener('click', () => {
        const text = padTextInput.value;
        const length = parseInt(padLength.value) || 20;
        const char = padChar.value || ' ';
        const direction = padDirection.value;

        let result = text;
        const padding = char.repeat(Math.max(0, length - text.length));

        switch(direction) {
            case 'start':
                result = padding + text;
                    break;
            case 'end':
                result = text + padding;
                break;
            case 'both':
                const halfPad = char.repeat(Math.floor((length - text.length) / 2));
                result = halfPad + text + halfPad;
                if (result.length < length) result += char;
                    break;
            }

        padTextOutput.value = result;
    });
}

// Align Text
function initializeAlignText() {
    const alignTextInput = document.getElementById('alignTextInput');
    const alignTextOutput = document.getElementById('alignTextOutput');
    const alignTextBtn = document.getElementById('alignTextBtn');
    const alignDirection = document.getElementById('alignDirection');
    const alignWidth = document.getElementById('alignWidth');

    alignTextBtn.addEventListener('click', () => {
        const text = alignTextInput.value;
        const width = parseInt(alignWidth.value) || 80;
        const direction = alignDirection.value;
        const lines = text.split('\n');

        const alignedLines = lines.map(line => {
            if (line.length >= width) return line;
            const padding = width - line.length;
            
            switch(direction) {
                case 'left':
                    return line;
                case 'center':
                    const leftPad = Math.floor(padding / 2);
                    const rightPad = padding - leftPad;
                    return ' '.repeat(leftPad) + line + ' '.repeat(rightPad);
                case 'right':
                    return ' '.repeat(padding) + line;
            }
        });

        alignTextOutput.value = alignedLines.join('\n');
    });
}

// Indent Text
function initializeIndentText() {
    const indentTextInput = document.getElementById('indentTextInput');
    const indentTextOutput = document.getElementById('indentTextOutput');
    const indentTextBtn = document.getElementById('indentTextBtn');
    const indentSize = document.getElementById('indentSize');
    const indentChar = document.getElementById('indentChar');

    indentTextBtn.addEventListener('click', () => {
        const text = indentTextInput.value;
        const size = parseInt(indentSize.value) || 4;
        const char = indentChar.value === 'tab' ? '\t' : ' '.repeat(size);
        const lines = text.split('\n');
        
        indentTextOutput.value = lines.map(line => char + line).join('\n');
    });
}

// Justify Text
function initializeJustifyText() {
    const justifyTextInput = document.getElementById('justifyTextInput');
    const justifyTextOutput = document.getElementById('justifyTextOutput');
    const justifyTextBtn = document.getElementById('justifyTextBtn');
    const justifyWidth = document.getElementById('justifyWidth');

    justifyTextBtn.addEventListener('click', () => {
        const text = justifyTextInput.value;
        const width = parseInt(justifyWidth.value) || 80;
        const lines = text.split('\n');

        const justifiedLines = lines.map(line => {
            if (line.length >= width) return line;
            
            const words = line.split(/\s+/);
            if (words.length <= 1) return line;

            const totalSpaces = width - line.replace(/\s+/g, '').length;
            const spaceSlots = words.length - 1;
            const baseSpaces = Math.floor(totalSpaces / spaceSlots);
            const extraSpaces = totalSpaces % spaceSlots;

            let result = words[0];
            for (let i = 1; i < words.length; i++) {
                const spaces = baseSpaces + (i <= extraSpaces ? 1 : 0);
                result += ' '.repeat(spaces) + words[i];
            }

            return result;
        });

        justifyTextOutput.value = justifiedLines.join('\n');
    });
}

// Wrap Text
function initializeWrapText() {
    const wrapTextInput = document.getElementById('wrapTextInput');
    const wrapTextOutput = document.getElementById('wrapTextOutput');
    const wrapTextBtn = document.getElementById('wrapTextBtn');
    const wrapWidth = document.getElementById('wrapWidth');
    const wrapMode = document.getElementById('wrapMode');

    wrapTextBtn.addEventListener('click', () => {
        const text = wrapTextInput.value;
        const width = parseInt(wrapWidth.value) || 80;
        const mode = wrapMode.value;

        if (mode === 'word') {
            const words = text.split(/\s+/);
            const lines = [];
            let currentLine = '';

            words.forEach(word => {
                if (currentLine.length + word.length + 1 <= width) {
                    currentLine += (currentLine ? ' ' : '') + word;
                } else {
                    lines.push(currentLine);
                    currentLine = word;
                }
            });
            if (currentLine) lines.push(currentLine);

            wrapTextOutput.value = lines.join('\n');
        } else {
            const chars = text.split('');
            const lines = [];
            let currentLine = '';

            chars.forEach(char => {
                if (currentLine.length + 1 <= width) {
                    currentLine += char;
                } else {
                    lines.push(currentLine);
                    currentLine = char;
                }
            });
            if (currentLine) lines.push(currentLine);

            wrapTextOutput.value = lines.join('\n');
        }
    });
} 