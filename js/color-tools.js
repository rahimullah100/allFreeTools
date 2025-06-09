// Color Tools JavaScript

// Tool Visibility Management
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

    // Initialize all tools
    initializeColorPicker();
    initializePaletteGenerator();
    initializeGradientGenerator();
    initializeColorConverter();
    initializeImageColorPicker();
});

// Color Picker Tool
function initializeColorPicker() {
    const colorPicker = document.getElementById('colorPicker');
    const hexValue = document.getElementById('hexValue');
    const rgbValue = document.getElementById('rgbValue');
    const hslValue = document.getElementById('hslValue');

    function updateColorValues(color) {
        // Update HEX
        hexValue.value = color;

        // Convert to RGB
        const r = parseInt(color.substr(1, 2), 16);
        const g = parseInt(color.substr(3, 2), 16);
        const b = parseInt(color.substr(5, 2), 16);
        rgbValue.value = `rgb(${r}, ${g}, ${b})`;

        // Convert to HSL
        const hsl = rgbToHsl(r, g, b);
        hslValue.value = `hsl(${Math.round(hsl.h)}°, ${Math.round(hsl.s)}%, ${Math.round(hsl.l)}%)`;
    }

    // Add copy buttons
    [hexValue, rgbValue, hslValue].forEach(input => {
        const copyBtn = document.createElement('button');
        copyBtn.className = 'copy-btn';
        copyBtn.innerHTML = '<i class="fas fa-copy"></i>';
        copyBtn.addEventListener('click', async () => {
            try {
                await navigator.clipboard.writeText(input.value);
                copyBtn.innerHTML = '<i class="fas fa-check"></i>';
                setTimeout(() => {
                    copyBtn.innerHTML = '<i class="fas fa-copy"></i>';
                }, 2000);
            } catch (err) {
                console.error('Failed to copy:', err);
            }
        });
        input.parentElement.appendChild(copyBtn);
    });

    colorPicker.addEventListener('input', (e) => {
        updateColorValues(e.target.value);
    });

    // Initialize with default color
    updateColorValues(colorPicker.value);
}

// Color Palette Generator
function initializePaletteGenerator() {
    const generateBtn = document.getElementById('generatePalette');
    const paletteType = document.getElementById('paletteType');
    const palettePreview = document.getElementById('palettePreview');
    const baseColorInput = document.getElementById('baseColor');

    function generateRandomColor() {
        return '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
    }

    function generateAnalogousPalette(baseColor) {
        const colors = [baseColor];
        const hsl = hexToHsl(baseColor);
        
        // Generate 4 analogous colors
        for (let i = 1; i <= 4; i++) {
            const newHue = (hsl.h + (i * 30)) % 360;
            colors.push(hslToHex(newHue, hsl.s, hsl.l));
        }
        
        return colors;
    }

    function generateComplementaryPalette(baseColor) {
        const hsl = hexToHsl(baseColor);
        const complementaryHue = (hsl.h + 180) % 360;
        return [
            baseColor,
            hslToHex(complementaryHue, hsl.s, hsl.l),
            hslToHex((hsl.h + 60) % 360, hsl.s, hsl.l),
            hslToHex((hsl.h + 120) % 360, hsl.s, hsl.l),
            hslToHex((hsl.h + 240) % 360, hsl.s, hsl.l)
        ];
    }

    function generateTriadicPalette(baseColor) {
        const hsl = hexToHsl(baseColor);
        return [
            baseColor,
            hslToHex((hsl.h + 120) % 360, hsl.s, hsl.l),
            hslToHex((hsl.h + 240) % 360, hsl.s, hsl.l),
            hslToHex((hsl.h + 60) % 360, hsl.s, hsl.l),
            hslToHex((hsl.h + 180) % 360, hsl.s, hsl.l)
        ];
    }

    function generateSplitComplementaryPalette(baseColor) {
        const hsl = hexToHsl(baseColor);
        return [
            baseColor,
            hslToHex((hsl.h + 150) % 360, hsl.s, hsl.l),
            hslToHex((hsl.h + 210) % 360, hsl.s, hsl.l),
            hslToHex((hsl.h + 30) % 360, hsl.s, hsl.l),
            hslToHex((hsl.h + 330) % 360, hsl.s, hsl.l)
        ];
    }

    function generatePalette() {
        const baseColor = baseColorInput.value || generateRandomColor();
        const type = paletteType.value;
        let colors = [];

        switch(type) {
            case 'analogous':
                colors = generateAnalogousPalette(baseColor);
                break;
            case 'complementary':
                colors = generateComplementaryPalette(baseColor);
                break;
            case 'triadic':
                colors = generateTriadicPalette(baseColor);
                break;
            case 'split-complementary':
                colors = generateSplitComplementaryPalette(baseColor);
                break;
            default:
                colors = generateAnalogousPalette(baseColor);
        }

        displayPalette(colors);
    }

    function displayPalette(colors) {
        palettePreview.innerHTML = '';
        colors.forEach(color => {
            const colorBox = document.createElement('div');
            colorBox.className = 'palette-color';
            colorBox.style.backgroundColor = color;
            
            const colorValue = document.createElement('span');
            colorValue.textContent = color.toUpperCase();
            colorBox.appendChild(colorValue);
            
            const copyBtn = document.createElement('button');
            copyBtn.className = 'copy-btn';
            copyBtn.innerHTML = '<i class="fas fa-copy"></i>';
            copyBtn.addEventListener('click', async (e) => {
                e.stopPropagation();
                try {
                    await navigator.clipboard.writeText(color);
                    copyBtn.innerHTML = '<i class="fas fa-check"></i>';
                    setTimeout(() => {
                        copyBtn.innerHTML = '<i class="fas fa-copy"></i>';
                    }, 2000);
                } catch (err) {
                    console.error('Failed to copy:', err);
                }
            });
            colorBox.appendChild(copyBtn);
            
            colorBox.addEventListener('click', async () => {
                try {
                    await navigator.clipboard.writeText(color);
                    copyBtn.innerHTML = '<i class="fas fa-check"></i>';
                    setTimeout(() => {
                        copyBtn.innerHTML = '<i class="fas fa-copy"></i>';
                    }, 2000);
                } catch (err) {
                    console.error('Failed to copy:', err);
                }
            });
            
            palettePreview.appendChild(colorBox);
        });

        // Add copy all button
        const copyAllBtn = document.createElement('button');
        copyAllBtn.className = 'copy-all-btn';
        copyAllBtn.innerHTML = '<i class="fas fa-copy"></i> Copy All Colors';
        copyAllBtn.addEventListener('click', async () => {
            try {
                const colorList = colors.join('\n');
                await navigator.clipboard.writeText(colorList);
                copyAllBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
                setTimeout(() => {
                    copyAllBtn.innerHTML = '<i class="fas fa-copy"></i> Copy All Colors';
                }, 2000);
            } catch (err) {
                console.error('Failed to copy:', err);
            }
        });
        palettePreview.appendChild(copyAllBtn);
    }

    generateBtn.addEventListener('click', generatePalette);
    paletteType.addEventListener('change', generatePalette);
    baseColorInput.addEventListener('input', generatePalette);

    // Generate initial palette
    generatePalette();
}

// Gradient Generator
function initializeGradientGenerator() {
    const color1 = document.getElementById('gradientColor1');
    const color2 = document.getElementById('gradientColor2');
    const gradientType = document.getElementById('gradientType');
    const gradientAngle = document.getElementById('gradientAngle');
    const gradientPreview = document.getElementById('gradientPreview');
    const gradientCode = document.getElementById('gradientCode');
    const copyBtn = document.getElementById('copyGradient');

    function updateGradient() {
        const type = gradientType.value;
        const angle = gradientAngle.value;
        let gradient;

        if (type === 'linear') {
            gradient = `linear-gradient(${angle}deg, ${color1.value}, ${color2.value})`;
        } else {
            gradient = `radial-gradient(circle, ${color1.value}, ${color2.value})`;
        }

        gradientPreview.style.background = gradient;
        gradientCode.value = `background: ${gradient};`;
    }

    [color1, color2, gradientType, gradientAngle].forEach(element => {
        element.addEventListener('input', updateGradient);
    });

    copyBtn.addEventListener('click', async () => {
        try {
            await navigator.clipboard.writeText(gradientCode.value);
            copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
            setTimeout(() => {
                copyBtn.innerHTML = '<i class="fas fa-copy"></i> Copy CSS';
            }, 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    });

    // Add color value display
    const colorValues = document.createElement('div');
    colorValues.className = 'color-values';
    colorValues.innerHTML = `
        <div class="color-value">
            <span>Color 1:</span>
            <input type="text" value="${color1.value}" readonly>
            <button class="copy-btn"><i class="fas fa-copy"></i></button>
        </div>
        <div class="color-value">
            <span>Color 2:</span>
            <input type="text" value="${color2.value}" readonly>
            <button class="copy-btn"><i class="fas fa-copy"></i></button>
        </div>
    `;
    gradientPreview.parentElement.insertBefore(colorValues, gradientPreview);

    // Update color values when colors change
    [color1, color2].forEach((input, index) => {
        input.addEventListener('input', () => {
            colorValues.querySelectorAll('input')[index].value = input.value;
        });
    });

    // Add copy buttons for color values
    colorValues.querySelectorAll('.copy-btn').forEach((btn, index) => {
        btn.addEventListener('click', async () => {
            try {
                await navigator.clipboard.writeText([color1, color2][index].value);
                btn.innerHTML = '<i class="fas fa-check"></i>';
                setTimeout(() => {
                    btn.innerHTML = '<i class="fas fa-copy"></i>';
                }, 2000);
            } catch (err) {
                console.error('Failed to copy:', err);
            }
        });
    });

    // Initialize gradient
    updateGradient();
}

// Color Converter
function initializeColorConverter() {
    const colorInput = document.getElementById('colorInput');
    const convertBtn = document.getElementById('convertColor');
    const convertedHex = document.getElementById('convertedHex');
    const convertedRgb = document.getElementById('convertedRgb');
    const convertedHsl = document.getElementById('convertedHsl');

    function convertColor() {
        const input = colorInput.value.trim();
        let hex, rgb, hsl;

        // Try to parse the input color
        try {
            if (input.startsWith('#')) {
                hex = input;
                const r = parseInt(hex.substr(1, 2), 16);
                const g = parseInt(hex.substr(3, 2), 16);
                const b = parseInt(hex.substr(5, 2), 16);
                rgb = `rgb(${r}, ${g}, ${b})`;
                hsl = rgbToHsl(r, g, b);
            } else if (input.startsWith('rgb')) {
                const matches = input.match(/\d+/g);
                const r = parseInt(matches[0]);
                const g = parseInt(matches[1]);
                const b = parseInt(matches[2]);
                hex = rgbToHex(r, g, b);
                rgb = input;
                hsl = rgbToHsl(r, g, b);
            } else if (input.startsWith('hsl')) {
                const matches = input.match(/\d+/g);
                const h = parseInt(matches[0]);
                const s = parseInt(matches[1]);
                const l = parseInt(matches[2]);
                const rgbObj = hslToRgb(h, s, l);
                hex = rgbToHex(rgbObj.r, rgbObj.g, rgbObj.b);
                rgb = `rgb(${rgbObj.r}, ${rgbObj.g}, ${rgbObj.b})`;
                hsl = input;
            }

            convertedHex.value = hex;
            convertedRgb.value = rgb;
            convertedHsl.value = `hsl(${Math.round(hsl.h)}°, ${Math.round(hsl.s)}%, ${Math.round(hsl.l)}%)`;

            // Show color preview
            const preview = document.createElement('div');
            preview.className = 'color-preview';
            preview.style.backgroundColor = hex;
            const results = document.querySelector('.conversion-results');
            results.insertBefore(preview, results.firstChild);

            // Add copy buttons
            [convertedHex, convertedRgb, convertedHsl].forEach(input => {
                if (!input.nextElementSibling?.classList.contains('copy-btn')) {
                    const copyBtn = document.createElement('button');
                    copyBtn.className = 'copy-btn';
                    copyBtn.innerHTML = '<i class="fas fa-copy"></i>';
                    copyBtn.addEventListener('click', async () => {
                        try {
                            await navigator.clipboard.writeText(input.value);
                            copyBtn.innerHTML = '<i class="fas fa-check"></i>';
                            setTimeout(() => {
                                copyBtn.innerHTML = '<i class="fas fa-copy"></i>';
                            }, 2000);
                        } catch (err) {
                            console.error('Failed to copy:', err);
                        }
                    });
                    input.parentElement.appendChild(copyBtn);
                }
            });
        } catch (error) {
            showToast('Invalid color format!');
        }
    }

    convertBtn.addEventListener('click', convertColor);
    colorInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') convertColor();
    });
}

// Utility Functions
function rgbToHex(r, g, b) {
    return '#' + [r, g, b].map(x => {
        const hex = x.toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    }).join('');
}

function hexToHsl(hex) {
    const r = parseInt(hex.substr(1, 2), 16) / 255;
    const g = parseInt(hex.substr(3, 2), 16) / 255;
    const b = parseInt(hex.substr(5, 2), 16) / 255;
    return rgbToHsl(r * 255, g * 255, b * 255);
}

function hslToHex(h, s, l) {
    const rgb = hslToRgb(h, s, l);
    return rgbToHex(rgb.r, rgb.g, rgb.b);
}

function rgbToHsl(r, g, b) {
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
        h: h * 360,
        s: s * 100,
        l: l * 100
    };
}

function hslToRgb(h, s, l) {
    h /= 360;
    s /= 100;
    l /= 100;

    let r, g, b;

    if (s === 0) {
        r = g = b = l;
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

        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }

    return {
        r: Math.round(r * 255),
        g: Math.round(g * 255),
        b: Math.round(b * 255)
    };
}

function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// Image Color Picker
function initializeImageColorPicker() {
    const imageInput = document.getElementById('imageInput');
    const canvas = document.getElementById('imageCanvas');
    const ctx = canvas.getContext('2d');
    const colorPreview = document.getElementById('colorPreview');
    const pickedHex = document.getElementById('pickedHex');
    const pickedRgb = document.getElementById('pickedRgb');
    const pickedHsl = document.getElementById('pickedHsl');
    const colorHistory = document.getElementById('colorHistory');
    let isImageLoaded = false;

    // Handle image upload
    imageInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const img = new Image();
                img.onload = () => {
                    // Set canvas size to match image while maintaining aspect ratio
                    const maxWidth = 600;
                    const scale = Math.min(1, maxWidth / img.width);
                    canvas.width = img.width * scale;
                    canvas.height = img.height * scale;
                    
                    // Draw image on canvas
                    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                    isImageLoaded = true;
                    colorPreview.style.display = 'block';
                };
                img.src = event.target.result;
            };
            reader.readAsDataURL(file);
        }
    });

    // Handle mouse movement on canvas
    canvas.addEventListener('mousemove', (e) => {
        if (!isImageLoaded) return;

        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Update color preview position relative to the image container
        const containerRect = canvas.parentElement.getBoundingClientRect();
        const relativeX = e.clientX - containerRect.left;
        const relativeY = e.clientY - containerRect.top;
        colorPreview.style.left = `${relativeX}px`;
        colorPreview.style.top = `${relativeY}px`;

        // Get color at cursor position
        const pixel = ctx.getImageData(x, y, 1, 1).data;
        const hex = rgbToHex(pixel[0], pixel[1], pixel[2]);
        const rgb = `rgb(${pixel[0]}, ${pixel[1]}, ${pixel[2]})`;
        const hsl = rgbToHsl(pixel[0], pixel[1], pixel[2]);

        // Update color preview
        colorPreview.style.backgroundColor = hex;

        // Update color values
        pickedHex.value = hex;
        pickedRgb.value = rgb;
        pickedHsl.value = `hsl(${Math.round(hsl.h)}°, ${Math.round(hsl.s)}%, ${Math.round(hsl.l)}%)`;
    });

    // Handle click on canvas to save color
    canvas.addEventListener('click', () => {
        if (!isImageLoaded) return;
        addColorToHistory(pickedHex.value);
    });

    // Add copy buttons functionality
    document.querySelectorAll('.picked-colors .copy-btn').forEach((btn, index) => {
        btn.addEventListener('click', async () => {
            const value = [pickedHex, pickedRgb, pickedHsl][index].value;
            try {
                await navigator.clipboard.writeText(value);
                btn.innerHTML = '<i class="fas fa-check"></i>';
                setTimeout(() => {
                    btn.innerHTML = '<i class="fas fa-copy"></i>';
                }, 2000);
            } catch (err) {
                console.error('Failed to copy:', err);
            }
        });
    });

    // Function to add color to history
    function addColorToHistory(color) {
        const colorItem = document.createElement('div');
        colorItem.className = 'palette-color';
        colorItem.style.backgroundColor = color;
        
        const colorValue = document.createElement('span');
        colorValue.textContent = color.toUpperCase();
        colorItem.appendChild(colorValue);
        
        const copyBtn = document.createElement('button');
        copyBtn.className = 'copy-btn';
        copyBtn.innerHTML = '<i class="fas fa-copy"></i>';
        copyBtn.addEventListener('click', async (e) => {
            e.stopPropagation();
            try {
                await navigator.clipboard.writeText(color);
                copyBtn.innerHTML = '<i class="fas fa-check"></i>';
                setTimeout(() => {
                    copyBtn.innerHTML = '<i class="fas fa-copy"></i>';
                }, 2000);
            } catch (err) {
                console.error('Failed to copy:', err);
            }
        });
        colorItem.appendChild(copyBtn);
        
        colorItem.addEventListener('click', async () => {
            try {
                await navigator.clipboard.writeText(color);
                copyBtn.innerHTML = '<i class="fas fa-check"></i>';
                setTimeout(() => {
                    copyBtn.innerHTML = '<i class="fas fa-copy"></i>';
                }, 2000);
            } catch (err) {
                console.error('Failed to copy:', err);
            }
        });

        // Add to history (limit to 20 colors)
        colorHistory.insertBefore(colorItem, colorHistory.firstChild);
        if (colorHistory.children.length > 20) {
            colorHistory.removeChild(colorHistory.lastChild);
        }
    }
} 