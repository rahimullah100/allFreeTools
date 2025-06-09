// Initialize all components when the page loads
document.addEventListener('DOMContentLoaded', function() {
    // Setup file uploads for all sections
    setupFileUpload('documentUpload', 'documentInput');
    setupFileUpload('imageUpload', 'imageInput');
    setupFileUpload('audioUpload', 'audioInput');
    setupFileUpload('videoUpload', 'videoInput');

    // Setup conversion options for each section
    setupConversionOptions('documentOptions');
    setupConversionOptions('imageOptions');
    setupConversionOptions('audioOptions');
    setupConversionOptions('videoOptions');

    // Setup quick navigation
    setupQuickNavigation();

    // Initialize file conversion tools
    initializeDocxToPdf();
    initializePdfToDocx();
    initializeImageToPdf();
    initializePdfToImage();
});

// Quick Navigation
function setupQuickNavigation() {
    const quickNavLinks = document.querySelectorAll('.quick-nav-links a');
    if (!quickNavLinks.length) return;

    // Hide all tool cards except the first one
    const toolCards = document.querySelectorAll('.tool-card');
    toolCards.forEach((card, index) => {
        card.classList.toggle('active', index === 0);
    });

    quickNavLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            
            // Update active state
            quickNavLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            
            // Show target card
            toolCards.forEach(card => card.classList.remove('active'));
            const targetCard = document.getElementById(targetId);
            if (targetCard) {
                targetCard.classList.add('active');
            }
        });
    });
}

// Setup file uploads for all sections
function setupFileUpload(uploadId, inputId) {
    const upload = document.getElementById(uploadId);
    const input = document.getElementById(inputId);
    
    if (!upload || !input) {
        console.warn(`Missing elements for ${uploadId} or ${inputId}`);
        return;
    }
    
    // Hide file upload initially
    upload.style.display = 'none';
    
    upload.addEventListener('click', () => input.click());
    
    upload.addEventListener('dragover', (e) => {
        e.preventDefault();
        upload.style.borderColor = 'var(--primary-color)';
    });
    
    upload.addEventListener('dragleave', () => {
        upload.style.borderColor = 'var(--border-color)';
    });
    
    upload.addEventListener('drop', (e) => {
        e.preventDefault();
        upload.style.borderColor = 'var(--border-color)';
        
        const file = e.dataTransfer.files[0];
        if (validateFile(file, input.accept)) {
            input.files = e.dataTransfer.files;
            handleFileSelect(input);
        }
    });
    
    input.addEventListener('change', () => {
        const file = input.files[0];
        if (validateFile(file, input.accept)) {
            handleFileSelect(input);
        }
    });
}

function handleFileSelect(input) {
    const file = input.files[0];
    if (!file) return;
    
    const upload = input.parentElement;
    if (!upload) return;

    const status = document.getElementById(input.id.replace('Input', 'Status'));
    const progress = document.getElementById(input.id.replace('Input', 'Progress'));
    const loading = document.getElementById(input.id.replace('Input', 'Loading'));
    const loader = upload.querySelector('.file-upload-loader');
    const fileName = document.getElementById(input.id.replace('Input', 'FileName'));
    const fileSize = document.getElementById(input.id.replace('Input', 'FileSize'));
    
    // Show loading state
    if (loader) {
        loader.classList.add('active');
    }
    upload.classList.add('ready');
    
    // Update file info
    if (fileName) {
        fileName.textContent = file.name;
    }
    if (fileSize) {
        fileSize.textContent = formatFileSize(file.size);
    }
    
    // Reset status and progress
    if (status) {
        status.className = 'conversion-status';
        status.textContent = '';
    }
    if (progress) {
        progress.style.display = 'none';
        const progressBar = progress.querySelector('.progress');
        if (progressBar) {
            progressBar.style.width = '0';
        }
    }
    
    // Force reset convert button if it's a document input
    if (input.id === 'documentInput') {
        forceResetConvertButton();
    }
    
    // Hide loading after a short delay to show the ready state
    setTimeout(() => {
        if (loader) {
            loader.classList.remove('active');
        }
    }, 1000);
}

// Format file size
function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Conversion Option Selection
function setupConversionOptions(optionsId) {
    const options = document.getElementById(optionsId);
    if (!options) {
        console.warn(`Missing options element: ${optionsId}`);
        return () => null;
    }

    let selectedType = null;
    
    // Hide file upload initially for all sections
    const fileUploads = {
        'documentOptions': 'documentUpload',
        'imageOptions': 'imageUpload',
        'audioOptions': 'audioUpload',
        'videoOptions': 'videoUpload'
    };
    
    // Hide all file uploads initially
    Object.values(fileUploads).forEach(uploadId => {
        const upload = document.getElementById(uploadId);
        if (upload) {
            upload.style.display = 'none';
        }
    });
    
    const conversionOptions = options.querySelectorAll('.conversion-option');
    if (!conversionOptions.length) {
        console.warn(`No conversion options found in ${optionsId}`);
        return () => null;
    }

    conversionOptions.forEach(option => {
        option.addEventListener('click', () => {
            // Remove selected class from all options
            conversionOptions.forEach(opt => opt.classList.remove('selected'));
            
            // Add selected class to clicked option
            option.classList.add('selected');
            selectedType = option.dataset.type;
            
            // Show file upload area for the current section
            const uploadId = fileUploads[optionsId];
            if (uploadId) {
                const fileUpload = document.getElementById(uploadId);
                if (fileUpload) {
                    fileUpload.style.display = 'block';
                    fileUpload.classList.remove('ready');
                    
                    // Update accepted file types based on conversion type
                    const input = document.getElementById(uploadId.replace('Upload', 'Input'));
                    if (input) {
                        const [fromType] = selectedType.split('-');
                        input.accept = getAcceptedFileTypes(fromType);
                    }
                    
                    // Reset file upload area
                    const uploadText = fileUpload.querySelector('p');
                    if (uploadText) {
                        uploadText.textContent = 'Drag and drop your file here or click to browse';
                    }
                    
                    const fileSize = document.getElementById('fileSize');
                    if (fileSize) {
                        fileSize.textContent = '-';
                    }
                    
                    // Reset status and progress
                    const status = document.getElementById(uploadId.replace('Upload', 'Status'));
                    if (status) {
                        status.className = 'conversion-status';
                        status.textContent = '';
                    }
                    
                    const progress = document.getElementById(uploadId.replace('Upload', 'Progress'));
                    if (progress) {
                        progress.style.display = 'none';
                        const progressBar = progress.querySelector('.progress');
                        if (progressBar) {
                            progressBar.style.width = '0';
                        }
                    }
                    
                    // Force reset convert button
                    forceResetConvertButton();
                }
            }
        });
    });
    
    return () => selectedType;
}

// Function to force reset convert button
function forceResetConvertButton() {
    try {
        const activeCard = document.querySelector('.tool-card.active');
        if (!activeCard) {
            console.warn('No active tool card found');
            return;
        }

        const buttonContainer = activeCard.querySelector('.button-container');
        if (!buttonContainer) {
            console.warn('No button container found in active card');
            return;
        }

        // Remove any existing buttons
        const existingButton = buttonContainer.querySelector('button, a');
        if (existingButton) {
            existingButton.remove();
        }
        
        // Create new convert button
        const newConvertBtn = document.createElement('button');
        newConvertBtn.id = 'convertDocument';
        newConvertBtn.className = 'btn';
        newConvertBtn.textContent = 'Convert';
        newConvertBtn.addEventListener('click', () => {
            const file = document.getElementById('documentInput')?.files[0];
            const type = getDocumentType();
            if (!file) {
                const status = document.getElementById('documentStatus');
                if (status) {
                    showStatus(status, 'Please select a file first', 'error');
                }
                return;
            }
            if (!type) {
                const status = document.getElementById('documentStatus');
                if (status) {
                    showStatus(status, 'Please select a conversion type', 'error');
                }
                return;
            }
            convertDocument(file, type);
        });
        
        // Add the new button to the container
        buttonContainer.appendChild(newConvertBtn);
    } catch (error) {
        console.error('Error resetting convert button:', error);
    }
}

// Get accepted file types based on conversion type
function getAcceptedFileTypes(fromType) {
    const typeMap = {
        'docx': '.doc,.docx',
        'doc': '.doc,.docx',
        'txt': '.txt',
        'html': '.html,.htm',
        'md': '.md,.markdown',
        'csv': '.csv',
        'json': '.json',
        'xml': '.xml',
        'pdf': '.pdf',
        'png': '.png',
        'jpg': '.jpg,.jpeg',
        'jpeg': '.jpg,.jpeg',
        'webp': '.webp',
        'bmp': '.bmp',
        'svg': '.svg',
        'wav': '.wav',
        'mp3': '.mp3',
        'ogg': '.ogg',
        'webm': '.webm',
        'mp4': '.mp4',
        'mov': '.mov'
    };
    return typeMap[fromType] || '*';
}

// Setup conversion options for each section
const getDocumentType = setupConversionOptions('documentOptions');
const getImageType = setupConversionOptions('imageOptions');
const getAudioType = setupConversionOptions('audioOptions');
const getVideoType = setupConversionOptions('videoOptions');

// Conversion Handlers
document.getElementById('convertDocument').addEventListener('click', () => {
    const file = document.getElementById('documentInput').files[0];
    const type = getDocumentType();
    if (!file) {
        showStatus('documentStatus', 'Please select a file first', 'error');
        return;
    }
    if (!type) {
        showStatus('documentStatus', 'Please select a conversion type', 'error');
        return;
    }
    convertDocument(file, type);
});

document.getElementById('convertImage').addEventListener('click', () => {
    const file = document.getElementById('imageInput').files[0];
    const type = getImageType();
    if (!file) {
        showStatus('imageStatus', 'Please select a file first', 'error');
        return;
    }
    if (!type) {
        showStatus('imageStatus', 'Please select a conversion type', 'error');
        return;
    }
    
    // Special handling for SVG conversions
    if (file.type === 'image/svg+xml' && (type === 'svg-png' || type === 'svg-jpg')) {
        const targetFormat = type === 'svg-png' ? 'image/png' : 'image/jpeg';
        handleSvgConversion(file, targetFormat);
    } else {
        convertImage(file, type);
    }
});

document.getElementById('convertAudio').addEventListener('click', () => {
    const file = document.getElementById('audioInput').files[0];
    const type = getAudioType();
    if (!file) {
        showStatus('audioStatus', 'Please select a file first', 'error');
        return;
    }
    if (!type) {
        showStatus('audioStatus', 'Please select a conversion type', 'error');
        return;
    }
    convertAudio(file, type);
});

document.getElementById('convertVideo').addEventListener('click', () => {
    const file = document.getElementById('videoInput').files[0];
    const type = getVideoType();
    if (!file) {
        showStatus('videoStatus', 'Please select a file first', 'error');
        return;
    }
    if (!type) {
        showStatus('videoStatus', 'Please select a conversion type', 'error');
        return;
    }
    convertVideo(file, type);
});

// Conversion Functions
async function convertDocument(file, type) {
    const status = document.getElementById('documentStatus');
    const progress = document.getElementById('documentProgress');
    const convertBtn = document.getElementById('convertDocument');
    
    try {
        showStatus(status, 'Converting document...', '');
        progress.style.display = 'block';
        convertBtn.disabled = true;
        
        // Simulate progress
        let width = 0;
        const interval = setInterval(() => {
            if (width >= 100) {
                clearInterval(interval);
                return;
            }
            width += 5;
            progress.querySelector('.progress').style.width = width + '%';
        }, 100);

        try {
            switch (type) {
                case 'docx-pdf':
                case 'doc-pdf':
                    await convertDocToPdf(file);
                    break;
                case 'txt-pdf':
                    await convertTxtToPdf(file);
                    break;
                case 'html-pdf':
                    await convertHtmlToPdf(file);
                    break;
                case 'md-html':
                    await convertMarkdownToHtml(file);
                    break;
                case 'md-pdf':
                    await convertMarkdownToPdf(file);
                    break;
                case 'csv-json':
                    await convertCsvToJson(file);
                    break;
                case 'json-csv':
                    await convertJsonToCsv(file);
                    break;
                case 'xml-json':
                    await convertXmlToJson(file);
                    break;
                case 'json-xml':
                    await convertJsonToXml(file);
                    break;
                case 'pdf-txt':
                    await convertPdfToTxt(file);
                    break;
                case 'pdf-html':
                    await convertPdfToHtml(file);
                    break;
                default:
                    throw new Error('Unsupported conversion type');
            }
        } catch (error) {
            throw new Error(`Conversion failed: ${error.message}`);
        }

        clearInterval(interval);
        progress.querySelector('.progress').style.width = '100%';
        
    } catch (error) {
        showStatus(status, `Error: ${error.message}`, 'error');
        convertBtn.disabled = false;
    }
}

async function convertImage(file, type) {
    const status = document.getElementById('imageStatus');
    const buttonContainer = document.querySelector('.tool-card.active .button-container');
    const progress = document.getElementById('imageProgress');
    
    try {
        showStatus(status, 'Converting image...', '');
        progress.style.display = 'block';
        
        // Create an image element
        const img = new Image();
        const imageUrl = URL.createObjectURL(file);
        
        // Wait for image to load
        await new Promise((resolve, reject) => {
            img.onload = resolve;
            img.onerror = reject;
            img.src = imageUrl;
        });
        
        // Create canvas
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        // Set canvas dimensions
        canvas.width = img.width;
        canvas.height = img.height;
        
        // Draw image on canvas
        ctx.drawImage(img, 0, 0);
        
        // Get target format and quality
        let targetFormat, quality;
        switch (type) {
            case 'png-jpg':
                targetFormat = 'image/jpeg';
                quality = 0.92;
                break;
            case 'png-webp':
                targetFormat = 'image/webp';
                quality = 0.92;
                break;
            case 'png-bmp':
                targetFormat = 'image/bmp';
                quality = 1.0;
                break;
            case 'jpg-png':
                targetFormat = 'image/png';
                quality = 1.0;
                break;
            case 'jpg-webp':
                targetFormat = 'image/webp';
                quality = 0.92;
                break;
            case 'webp-png':
                targetFormat = 'image/png';
                quality = 1.0;
                break;
            case 'webp-jpg':
                targetFormat = 'image/jpeg';
                quality = 0.92;
                break;
            case 'svg-png':
                targetFormat = 'image/png';
                quality = 1.0;
                break;
            case 'svg-jpg':
                targetFormat = 'image/jpeg';
                quality = 0.92;
                break;
            default:
                throw new Error('Unsupported conversion type');
        }
        
        // Convert to blob
        const blob = await new Promise(resolve => {
            canvas.toBlob(resolve, targetFormat, quality);
        });
        
        if (!blob) {
            throw new Error('Failed to convert image');
        }
        
        // Create download URL
        const url = URL.createObjectURL(blob);
        
        // Get file extension
        const extension = targetFormat.split('/')[1];
        
        // Create download button
        const downloadBtn = document.createElement('a');
        downloadBtn.href = url;
        downloadBtn.download = file.name.replace(/\.[^/.]+$/, `.${extension}`);
        downloadBtn.className = 'btn';
        downloadBtn.innerHTML = `<i class="fas fa-download"></i> Download ${extension.toUpperCase()}`;
        downloadBtn.style.marginTop = '1rem';

        // Replace convert button with download button
        const existingButton = buttonContainer.querySelector('button, a');
        if (existingButton) {
            existingButton.remove();
        }
        buttonContainer.appendChild(downloadBtn);
        
        // Clean up
        URL.revokeObjectURL(imageUrl);
        
        // Show success message
        showStatus(status, 'Conversion completed! Click the download button to save your image.', 'success');
        progress.style.display = 'none';
        
        // Add click handler to download button
        downloadBtn.addEventListener('click', () => {
            // Reset convert button after download
            setTimeout(forceResetConvertButton, 1000);
        });
        
    } catch (error) {
        console.error('Image conversion error:', error);
        showStatus(status, `Error: ${error.message}`, 'error');
        progress.style.display = 'none';
        throw error;
    }
}

// Special handling for SVG files
async function handleSvgConversion(file, targetFormat) {
    const status = document.getElementById('imageStatus');
    const buttonContainer = document.querySelector('.tool-card.active .button-container');
    
    try {
        // Read SVG file
        const svgText = await file.text();
        
        // Create an image element
        const img = new Image();
        const svgBlob = new Blob([svgText], { type: 'image/svg+xml' });
        const svgUrl = URL.createObjectURL(svgBlob);
        
        // Wait for SVG to load
        await new Promise((resolve, reject) => {
            img.onload = resolve;
            img.onerror = reject;
            img.src = svgUrl;
        });
        
        // Create canvas
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        // Set canvas dimensions
        canvas.width = img.width;
        canvas.height = img.height;
        
        // Draw SVG on canvas
        ctx.drawImage(img, 0, 0);
        
        // Convert to target format
        const blob = await new Promise(resolve => {
            canvas.toBlob(resolve, targetFormat, targetFormat === 'image/png' ? 1.0 : 0.92);
        });
        
        if (!blob) {
            throw new Error('Failed to convert SVG');
        }
        
        // Create download URL
        const url = URL.createObjectURL(blob);
        
        // Get file extension
        const extension = targetFormat.split('/')[1];
        
        // Create download button
        const downloadBtn = document.createElement('a');
        downloadBtn.href = url;
        downloadBtn.download = file.name.replace(/\.svg$/, `.${extension}`);
        downloadBtn.className = 'btn';
        downloadBtn.innerHTML = `<i class="fas fa-download"></i> Download ${extension.toUpperCase()}`;
        downloadBtn.style.marginTop = '1rem';

        // Replace convert button with download button
        const existingButton = buttonContainer.querySelector('button, a');
        if (existingButton) {
            existingButton.remove();
        }
        buttonContainer.appendChild(downloadBtn);
        
        // Clean up
        URL.revokeObjectURL(svgUrl);
        
        // Show success message
        showStatus(status, 'Conversion completed! Click the download button to save your image.', 'success');
        
        // Add click handler to download button
        downloadBtn.addEventListener('click', () => {
            // Reset convert button after download
            setTimeout(forceResetConvertButton, 1000);
        });
        
    } catch (error) {
        console.error('SVG conversion error:', error);
        showStatus(status, `Error: ${error.message}`, 'error');
        throw error;
    }
}

async function convertAudio(file, type) {
    const status = document.getElementById('audioStatus');
    const progress = document.getElementById('audioProgress');
    
    try {
        showStatus(status, 'Converting audio...', '');
        progress.style.display = 'block';
        
        // Simulate progress
        let width = 0;
        const interval = setInterval(() => {
            if (width >= 100) {
                clearInterval(interval);
                return;
            }
            width += 5;
            progress.querySelector('.progress').style.width = width + '%';
        }, 100);
        
        // TODO: Implement actual conversion logic using Web Audio API + FFmpeg WASM
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        clearInterval(interval);
        progress.querySelector('.progress').style.width = '100%';
        showStatus(status, 'Conversion completed successfully!', 'success');
        
        // TODO: Add download functionality
    } catch (error) {
        showStatus(status, 'Error during conversion: ' + error.message, 'error');
    }
}

async function convertVideo(file, type) {
    const status = document.getElementById('videoStatus');
    const progress = document.getElementById('videoProgress');
    
    try {
        showStatus(status, 'Converting video...', '');
        progress.style.display = 'block';
        
        // Simulate progress
        let width = 0;
        const interval = setInterval(() => {
            if (width >= 100) {
                clearInterval(interval);
                return;
            }
            width += 5;
            progress.querySelector('.progress').style.width = width + '%';
        }, 100);
        
        // TODO: Implement actual conversion logic using FFmpeg WASM
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        clearInterval(interval);
        progress.querySelector('.progress').style.width = '100%';
        showStatus(status, 'Conversion completed successfully!', 'success');
        
        // TODO: Add download functionality
    } catch (error) {
        showStatus(status, 'Error during conversion: ' + error.message, 'error');
    }
}

// Helper Functions for Document Conversions
async function convertDocToPdf(file) {
    const loading = document.getElementById('documentLoading');
    const status = document.getElementById('documentStatus');
    const buttonContainer = document.querySelector('.tool-card.active .button-container');
    loading.style.display = 'block';
    loading.querySelector('.loading-text').textContent = 'Converting DOCX to PDF...';
    
    try {
        // Check if mammoth.js is available
        if (typeof mammoth === 'undefined') {
            throw new Error('Failed to load document conversion library. Please refresh the page and try again.');
        }

        // Read the file
        const arrayBuffer = await file.arrayBuffer();

        // Convert DOCX to HTML using mammoth.js with specific options
        const result = await mammoth.convertToHtml({ 
            arrayBuffer,
            convertImage: mammoth.images.imgElement((image) => {
                return image.read().then((imageBuffer) => {
                    const base64 = btoa(
                        new Uint8Array(imageBuffer)
                            .reduce((data, byte) => data + String.fromCharCode(byte), '')
                    );
                    return {
                        src: `data:${image.contentType};base64,${base64}`
                    };
                });
            })
        });

        if (result.messages.length > 0) {
            console.warn('Conversion messages:', result.messages);
        }

        // Create a temporary container with proper styling
        const container = document.createElement('div');
        container.style.cssText = `
            position: fixed;
            left: -9999px;
            top: -9999px;
            width: 210mm;
            min-height: 297mm;
            padding: 20mm;
            background: white;
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: black;
            box-sizing: border-box;
        `;

        // Add the converted content with proper styling
        container.innerHTML = `
            <div style="
                font-family: Arial, sans-serif;
                line-height: 1.6;
                color: black;
                background: white;
                padding: 20px;
                width: 100%;
                min-height: 100%;
                box-sizing: border-box;
            ">
                ${result.value}
            </div>
        `;

        // Add container to document
        document.body.appendChild(container);

        // Wait for images to load
        const images = container.getElementsByTagName('img');
        if (images.length > 0) {
            await Promise.all(Array.from(images).map(img => {
                if (img.complete) return Promise.resolve();
                return new Promise(resolve => {
                    img.onload = resolve;
                    img.onerror = resolve;
                });
            }));
        }

        // Wait a bit to ensure content is rendered
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Generate PDF
        loading.querySelector('.loading-text').textContent = 'Generating PDF...';
        
        try {
            // Create a new instance of html2pdf
            const pdf = html2pdf();
            
            // Set basic options
            pdf.set({
                margin: 10,
                filename: file.name.replace('.docx', '.pdf'),
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { 
                    scale: 1,
                    useCORS: true,
                    logging: false,
                    windowWidth: 794, // A4 width in pixels at 96 DPI
                    windowHeight: 1123, // A4 height in pixels at 96 DPI
                    scrollX: 0,
                    scrollY: 0
                },
                jsPDF: { 
                    unit: 'mm', 
                    format: 'a4', 
                    orientation: 'portrait'
                }
            });

            // Generate PDF blob
            const pdfBlob = await pdf.from(container).output('blob');
            
            // Verify the PDF blob is not empty
            if (pdfBlob.size === 0) {
                throw new Error('Generated PDF is empty');
            }

            const url = URL.createObjectURL(pdfBlob);

            // Create download button
            const downloadBtn = document.createElement('a');
            downloadBtn.href = url;
            downloadBtn.download = file.name.replace('.docx', '.pdf');
            downloadBtn.className = 'btn';
            downloadBtn.innerHTML = '<i class="fas fa-download"></i> Download PDF';
            downloadBtn.style.marginTop = '1rem';

            // Replace convert button with download button
            const existingButton = buttonContainer.querySelector('button, a');
            if (existingButton) {
                existingButton.remove();
            }
            buttonContainer.appendChild(downloadBtn);

            // Clean up
            document.body.removeChild(container);
            loading.style.display = 'none';

            // Show success message
            showStatus(status, 'Conversion completed! Click the download button to save your PDF.', 'success');

            // Add click handler to download button
            downloadBtn.addEventListener('click', () => {
                // Reset convert button after download
                setTimeout(forceResetConvertButton, 1000);
            });

        } catch (pdfError) {
            console.error('PDF generation error:', pdfError);
            throw new Error('Failed to generate PDF. Please try a different file or refresh the page.');
        }
    } catch (error) {
        loading.style.display = 'none';
        console.error('DOCX to PDF conversion error:', error);
        showStatus(status, `Error: ${error.message}`, 'error');
        throw error;
    }
}

async function convertTxtToPdf(file) {
    const status = document.getElementById('documentStatus');
    const convertBtn = document.getElementById('convertDocument');
    
    try {
        const text = await file.text();
        const element = document.createElement('div');
        element.innerHTML = `<pre>${text}</pre>`;
        
        const pdfBlob = await html2pdf().from(element).output('blob');
        const url = URL.createObjectURL(pdfBlob);
        
        // Create download button
        const downloadBtn = document.createElement('a');
        downloadBtn.href = url;
        downloadBtn.download = file.name.replace(/\.txt$/i, '.pdf');
        downloadBtn.className = 'btn';
        downloadBtn.innerHTML = '<i class="fas fa-download"></i> Download PDF';
        downloadBtn.style.marginTop = '1rem';

        // Replace convert button with download button
        convertBtn.parentNode.replaceChild(downloadBtn, convertBtn);
        
        showStatus(status, 'Conversion completed! Click the download button to save your PDF.', 'success');
    } catch (error) {
        throw new Error(`Failed to convert TXT to PDF: ${error.message}`);
    }
}

async function convertHtmlToPdf(file) {
    const status = document.getElementById('documentStatus');
    const convertBtn = document.getElementById('convertDocument');
    
    try {
        const html = await file.text();
        const element = document.createElement('div');
        element.innerHTML = html;
        
        const pdfBlob = await html2pdf().from(element).output('blob');
        const url = URL.createObjectURL(pdfBlob);
        
        // Create download button
        const downloadBtn = document.createElement('a');
        downloadBtn.href = url;
        downloadBtn.download = file.name.replace(/\.html$/i, '.pdf');
        downloadBtn.className = 'btn';
        downloadBtn.innerHTML = '<i class="fas fa-download"></i> Download PDF';
        downloadBtn.style.marginTop = '1rem';

        // Replace convert button with download button
        convertBtn.parentNode.replaceChild(downloadBtn, convertBtn);
        
        showStatus(status, 'Conversion completed! Click the download button to save your PDF.', 'success');
    } catch (error) {
        throw new Error(`Failed to convert HTML to PDF: ${error.message}`);
    }
}

async function convertMarkdownToHtml(file) {
    const status = document.getElementById('documentStatus');
    const convertBtn = document.getElementById('convertDocument');
    
    try {
        const marked = await import('marked');
        const text = await file.text();
        const html = marked.parse(text);
        
        const blob = new Blob([html], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        
        // Create download button
        const downloadBtn = document.createElement('a');
        downloadBtn.href = url;
        downloadBtn.download = file.name.replace(/\.md$/i, '.html');
        downloadBtn.className = 'btn';
        downloadBtn.innerHTML = '<i class="fas fa-download"></i> Download HTML';
        downloadBtn.style.marginTop = '1rem';

        // Replace convert button with download button
        convertBtn.parentNode.replaceChild(downloadBtn, convertBtn);
        
        showStatus(status, 'Conversion completed! Click the download button to save your HTML file.', 'success');
    } catch (error) {
        throw new Error(`Failed to convert Markdown to HTML: ${error.message}`);
    }
}

async function convertMarkdownToPdf(file) {
    const marked = await import('marked');
    const html2pdf = await import('html2pdf.js');
    
    const text = await file.text();
    const html = marked.parse(text);
    
    const element = document.createElement('div');
    element.innerHTML = html;
    
    const pdf = await html2pdf().from(element).output('blob');
    const url = URL.createObjectURL(pdf);
    
    return {
        url,
        filename: file.name.replace(/\.md$/i, '.pdf'),
        preview: html
    };
}

async function convertCsvToJson(file) {
    const Papa = await import('papaparse');
    const text = await file.text();
    
    return new Promise((resolve, reject) => {
        Papa.parse(text, {
            header: true,
            complete: (results) => {
                const json = JSON.stringify(results.data, null, 2);
                const blob = new Blob([json], { type: 'application/json' });
                const url = URL.createObjectURL(blob);
                
                resolve({
                    url,
                    filename: file.name.replace(/\.csv$/i, '.json'),
                    preview: `<pre>${json}</pre>`
                });
            },
            error: (error) => reject(error)
        });
    });
}

async function convertJsonToCsv(file) {
    const Papa = await import('papaparse');
    const text = await file.text();
    const json = JSON.parse(text);
    
    const csv = Papa.unparse(json);
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    
    return {
        url,
        filename: file.name.replace(/\.json$/i, '.csv'),
        preview: `<pre>${csv}</pre>`
    };
}

async function convertXmlToJson(file) {
    const xml2js = await import('xml2js');
    const text = await file.text();
    
    return new Promise((resolve, reject) => {
        xml2js.parseString(text, (err, result) => {
            if (err) reject(err);
            
            const json = JSON.stringify(result, null, 2);
            const blob = new Blob([json], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            
            resolve({
                url,
                filename: file.name.replace(/\.xml$/i, '.json'),
                preview: `<pre>${json}</pre>`
            });
        });
    });
}

async function convertJsonToXml(file) {
    const xml2js = await import('xml2js');
    const text = await file.text();
    const json = JSON.parse(text);
    
    const builder = new xml2js.Builder();
    const xml = builder.buildObject(json);
    const blob = new Blob([xml], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    
    return {
        url,
        filename: file.name.replace(/\.json$/i, '.xml'),
        preview: `<pre>${xml}</pre>`
    };
}

async function convertPdfToTxt(file) {
    const status = document.getElementById('documentStatus');
    const buttonContainer = document.querySelector('.tool-card.active .button-container');
    
    try {
        // Read the file as ArrayBuffer
        const arrayBuffer = await file.arrayBuffer();
        
        // Load the PDF document
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        
        let text = '';
        // Extract text from each page
        for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const content = await page.getTextContent();
            text += content.items.map(item => item.str).join(' ') + '\n';
        }
        
        // Create text file blob
        const blob = new Blob([text], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        
        // Create download button
        const downloadBtn = document.createElement('a');
        downloadBtn.href = url;
        downloadBtn.download = file.name.replace(/\.pdf$/i, '.txt');
        downloadBtn.className = 'btn';
        downloadBtn.innerHTML = '<i class="fas fa-download"></i> Download TXT';
        downloadBtn.style.marginTop = '1rem';

        // Replace convert button with download button
        const existingButton = buttonContainer.querySelector('button, a');
        if (existingButton) {
            existingButton.remove();
        }
        buttonContainer.appendChild(downloadBtn);
        
        showStatus(status, 'Conversion completed! Click the download button to save your text file.', 'success');
        
        // Add click handler to download button
        downloadBtn.addEventListener('click', () => {
            // Reset convert button after download
            setTimeout(forceResetConvertButton, 1000);
        });
    } catch (error) {
        console.error('PDF to TXT conversion error:', error);
        showStatus(status, `Error: ${error.message}`, 'error');
        throw error;
    }
}

async function convertPdfToHtml(file) {
    const status = document.getElementById('documentStatus');
    const buttonContainer = document.querySelector('.tool-card.active .button-container');
    
    try {
        // Read the file as ArrayBuffer
        const arrayBuffer = await file.arrayBuffer();
        
        // Load the PDF document
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        
        let text = '';
        // Extract text from each page
        for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const content = await page.getTextContent();
            text += content.items.map(item => item.str).join(' ') + '\n';
        }
        
        // Convert text to HTML
        const html = `<div class="pdf-content">${text.split('\n').map(line => `<p>${line}</p>`).join('')}</div>`;
        const blob = new Blob([html], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        
        // Create download button
        const downloadBtn = document.createElement('a');
        downloadBtn.href = url;
        downloadBtn.download = file.name.replace(/\.pdf$/i, '.html');
        downloadBtn.className = 'btn';
        downloadBtn.innerHTML = '<i class="fas fa-download"></i> Download HTML';
        downloadBtn.style.marginTop = '1rem';

        // Replace convert button with download button
        const existingButton = buttonContainer.querySelector('button, a');
        if (existingButton) {
            existingButton.remove();
        }
        buttonContainer.appendChild(downloadBtn);
        
        showStatus(status, 'Conversion completed! Click the download button to save your HTML file.', 'success');
        
        // Add click handler to download button
        downloadBtn.addEventListener('click', () => {
            // Reset convert button after download
            setTimeout(forceResetConvertButton, 1000);
        });
    } catch (error) {
        console.error('PDF to HTML conversion error:', error);
        showStatus(status, `Error: ${error.message}`, 'error');
        throw error;
    }
}

// Validate file type and size
function validateFile(file, acceptedTypes) {
    if (!file) return false;
    
    const status = document.getElementById('documentStatus');
    if (!status) return false;
    
    // Check file type
    const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
    const acceptedExtensions = acceptedTypes.split(',');
    
    if (!acceptedExtensions.some(type => type === fileExtension)) {
        showStatus(status, `Invalid file type. Please select a ${acceptedTypes} file.`, 'error');
        return false;
    }
    
    // Check file size (max 10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB in bytes
    if (file.size > maxSize) {
        showStatus(status, 'File size exceeds 10MB limit.', 'error');
        return false;
    }
    
    return true;
}

// Utility Functions
function showStatus(element, message, type) {
    if (!element) return;
    
    element.textContent = message;
    element.className = 'conversion-status';
    if (type) {
        element.classList.add(type);
    }
}

// DOCX to PDF Conversion
function initializeDocxToPdf() {
    const uploadForm = document.getElementById('docxToPdfForm');
    const fileInput = document.getElementById('docxInput');
    const fileLabel = document.getElementById('docxFileLabel');
    const convertBtn = document.getElementById('convertDocxBtn');
    const loadingIndicator = document.getElementById('docxLoading');
    const resultSection = document.getElementById('docxResult');
    const downloadLink = document.getElementById('docxDownloadLink');
    const statusMessage = document.getElementById('docxStatus');

    // Hide loading and result sections initially
    loadingIndicator.style.display = 'none';
    resultSection.style.display = 'none';
    statusMessage.textContent = '';

    // Prevent form submission
    uploadForm.addEventListener('submit', (e) => {
        e.preventDefault();
    });

    // Handle file selection
    fileInput.addEventListener('change', function() {
        handleFileSelection(this.files[0]);
    });

    // Handle drag and drop
    uploadForm.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadForm.classList.add('dragover');
    });

    uploadForm.addEventListener('dragleave', () => {
        uploadForm.classList.remove('dragover');
    });

    uploadForm.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadForm.classList.remove('dragover');
        handleFileSelection(e.dataTransfer.files[0]);
    });

    // Handle click on the entire upload form
    uploadForm.addEventListener('click', function(event) {
        // Only trigger if clicking directly on the form or label
        if (event.target === uploadForm || event.target === fileLabel) {
            event.preventDefault();
            fileInput.click();
        }
    });

    function handleFileSelection(file) {
        // Reset UI state
        loadingIndicator.style.display = 'none';
        resultSection.style.display = 'none';
        statusMessage.textContent = '';

        if (file) {
            if (file.name.toLowerCase().endsWith('.docx')) {
                fileLabel.innerHTML = `<i class="fas fa-file-word"></i><span>Selected: ${file.name}</span>`;
                convertBtn.disabled = false;
                showStatus(statusMessage, 'File selected. Click Convert to proceed.', 'info');
            } else {
                fileLabel.innerHTML = `<i class="fas fa-cloud-upload-alt"></i><span>Please select a DOCX file</span>`;
                convertBtn.disabled = true;
                showStatus(statusMessage, 'Please select a valid DOCX file.', 'error');
            }
        } else {
            fileLabel.innerHTML = `<i class="fas fa-cloud-upload-alt"></i><span>Click Here to Select a File</span>`;
            convertBtn.disabled = true;
        }
    }

    // Handle conversion
    convertBtn.addEventListener('click', async function() {
        const file = fileInput.files[0];

        if (!file) {
            showStatus(statusMessage, 'Please upload a file first.', 'error');
            return;
        }

        if (!file.name.toLowerCase().endsWith('.docx')) {
            showStatus(statusMessage, 'Please select a valid DOCX file.', 'error');
            return;
        }

        try {
            // Show loading state
            loadingIndicator.style.display = 'block';
            resultSection.style.display = 'none';
            convertBtn.disabled = true;
            showStatus(statusMessage, 'Converting document...', 'info');

            // Read the file
            const arrayBuffer = await file.arrayBuffer();

            // Convert DOCX to HTML using mammoth.js
            const result = await mammoth.convertToHtml({
                arrayBuffer: arrayBuffer,
                styleMap: [
                    "p[style-name='Heading 1'] => h1:fresh",
                    "p[style-name='Heading 2'] => h2:fresh",
                    "p[style-name='Normal'] => p:fresh"
                ]
            });

            if (result.messages.length > 0) {
                console.warn('Conversion messages:', result.messages);
            }

            // Create a temporary container with proper styling
            const container = document.createElement('div');
            container.style.cssText = `
                position: fixed;
                left: -9999px;
                top: -9999px;
                width: 210mm;
                min-height: 297mm;
                padding: 20mm;
                background: white;
                font-family: Arial, sans-serif;
                line-height: 1.6;
                color: black;
                box-sizing: border-box;
            `;

            // Add the converted content with proper styling
            container.innerHTML = `
                <div style="
                    font-family: Arial, sans-serif;
                    line-height: 1.6;
                    color: black;
                    background: white;
                    padding: 20px;
                    width: 100%;
                    min-height: 100%;
                    box-sizing: border-box;
                ">
                    ${result.value}
                </div>
            `;

            // Add container to document
            document.body.appendChild(container);

            // Wait for images to load
            const images = container.getElementsByTagName('img');
            if (images.length > 0) {
                await Promise.all(Array.from(images).map(img => {
                    if (img.complete) return Promise.resolve();
                    return new Promise(resolve => {
                        img.onload = resolve;
                        img.onerror = resolve;
                    });
                }));
            }

            // Generate PDF
            showStatus(statusMessage, 'Generating PDF...', 'info');

            const options = {
                margin: 10,
                filename: file.name.replace('.docx', '.pdf'),
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { 
                    scale: 2,
                    useCORS: true,
                    logging: false
                },
                jsPDF: { 
                    unit: 'mm', 
                    format: 'a4', 
                    orientation: 'portrait'
                }
            };

            const pdfBlob = await html2pdf().from(container).set(options).output('blob');
            
            if (!pdfBlob || pdfBlob.size === 0) {
                throw new Error('Failed to generate PDF');
            }

            // Create download URL
            const url = URL.createObjectURL(pdfBlob);
            downloadLink.href = url;
            downloadLink.download = file.name.replace('.docx', '.pdf');

            // Show success state
            loadingIndicator.style.display = 'none';
            resultSection.style.display = 'block';
            convertBtn.disabled = false;
            showStatus(statusMessage, 'Conversion completed successfully!', 'success');

            // Clean up
            document.body.removeChild(container);

            // Add click handler to download button
            downloadLink.addEventListener('click', () => {
                // Reset after download
                setTimeout(() => {
                    fileInput.value = '';
                    fileLabel.innerHTML = `<i class="fas fa-cloud-upload-alt"></i><span>Click Here to Select a File</span>`;
                    convertBtn.disabled = true;
                    resultSection.style.display = 'none';
                    loadingIndicator.style.display = 'none';
                    showStatus(statusMessage, '', '');
                }, 1000);
            });

        } catch (error) {
            console.error('Conversion error:', error);
            loadingIndicator.style.display = 'none';
            resultSection.style.display = 'none';
            convertBtn.disabled = false;
            showStatus(statusMessage, `Error: ${error.message || 'Failed to convert document'}`, 'error');
        }
    });
}

// PDF to DOCX Conversion
function initializePdfToDocx() {
    const fileInput = document.getElementById('pdfInput');
    const convertBtn = document.getElementById('convertPdfBtn');
    const downloadBtn = document.getElementById('downloadPdfBtn');
    const statusMessage = document.getElementById('pdfStatus');

    fileInput.addEventListener('change', function() {
        if (this.files[0]) {
            convertBtn.disabled = false;
            showStatus(statusMessage, 'File selected. Click Convert to proceed.', 'info');
        } else {
            convertBtn.disabled = true;
            showStatus(statusMessage, 'Please select a file.', 'error');
        }
    });

    convertBtn.addEventListener('click', function() {
        const file = fileInput.files[0];
        if (!file) {
            showStatus(statusMessage, 'Please select a file first.', 'error');
            return;
        }

        if (!file.name.toLowerCase().endsWith('.pdf')) {
            showStatus(statusMessage, 'Please select a valid PDF file.', 'error');
            return;
        }

        // PDF to DOCX conversion logic here
        showStatus(statusMessage, 'Conversion in progress...', 'info');
        // ... implementation
    });
}

// Image to PDF Conversion
function initializeImageToPdf() {
    const fileInput = document.getElementById('imageInput');
    const convertBtn = document.getElementById('convertImageBtn');
    const downloadBtn = document.getElementById('downloadImageBtn');
    const statusMessage = document.getElementById('imageStatus');

    fileInput.addEventListener('change', function() {
        if (this.files[0]) {
            convertBtn.disabled = false;
            showStatus(statusMessage, 'File selected. Click Convert to proceed.', 'info');
        } else {
            convertBtn.disabled = true;
            showStatus(statusMessage, 'Please select a file.', 'error');
        }
    });

    convertBtn.addEventListener('click', function() {
        const file = fileInput.files[0];
        if (!file) {
            showStatus(statusMessage, 'Please select a file first.', 'error');
            return;
        }

        if (!file.type.startsWith('image/')) {
            showStatus(statusMessage, 'Please select a valid image file.', 'error');
            return;
        }

        // Image to PDF conversion logic here
        showStatus(statusMessage, 'Conversion in progress...', 'info');
        // ... implementation
    });
}

// PDF to Image Conversion
function initializePdfToImage() {
    const fileInput = document.getElementById('pdfToImageInput');
    const convertBtn = document.getElementById('convertPdfToImageBtn');
    const downloadBtn = document.getElementById('downloadPdfToImageBtn');
    const statusMessage = document.getElementById('pdfToImageStatus');

    fileInput.addEventListener('change', function() {
        if (this.files[0]) {
            convertBtn.disabled = false;
            showStatus(statusMessage, 'File selected. Click Convert to proceed.', 'info');
        } else {
            convertBtn.disabled = true;
            showStatus(statusMessage, 'Please select a file.', 'error');
        }
    });

    convertBtn.addEventListener('click', function() {
        const file = fileInput.files[0];
        if (!file) {
            showStatus(statusMessage, 'Please select a file first.', 'error');
            return;
        }

        if (!file.name.toLowerCase().endsWith('.pdf')) {
            showStatus(statusMessage, 'Please select a valid PDF file.', 'error');
            return;
        }

        // PDF to Image conversion logic here
        showStatus(statusMessage, 'Conversion in progress...', 'info');
        // ... implementation
    });
} 