// Initialize all tools when the page loads
document.addEventListener('DOMContentLoaded', function() {
    // Setup quick navigation
    setupQuickNavigation();
    
    // Initialize all image tools
    initializeResizeTool();
    initializeCropTool();
    initializeRotateTool();
    initializeFlipTool();
    initializeCompressTool();
    initializeDrawTool();
    initializeBlurSharpenTool();
    initializeAdjustTool();
    initializeFilterTool();
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

// Resize Image Tool
function initializeResizeTool() {
    const resizeInput = document.getElementById('resizeInput');
    const resizeLabel = resizeInput.nextElementSibling;
    const resizePreview = document.getElementById('resizePreview');
    const resizeWidth = document.getElementById('resizeWidth');
    const resizeHeight = document.getElementById('resizeHeight');
    const maintainAspect = document.getElementById('maintainAspect');
    const resizeBtn = document.getElementById('resizeBtn');
    const downloadResizeBtn = document.getElementById('downloadResizeBtn');

    let originalImage = null;
    let originalWidth = 0;
    let originalHeight = 0;

    resizeInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                originalImage = new Image();
                originalImage.onload = function() {
                    // Store original dimensions
                    originalWidth = originalImage.width;
                    originalHeight = originalImage.height;
                    
                    // Set initial dimensions
                    resizeWidth.value = originalWidth;
                    resizeHeight.value = originalHeight;
                    
                    // Set initial preview
                    resizePreview.src = e.target.result;
                    resizePreview.classList.add('active');
                    
                    // Set initial preview size to match input dimensions
                    resizePreview.style.width = `${originalWidth}px`;
                    resizePreview.style.height = `${originalHeight}px`;
                    resizePreview.style.maxWidth = '100%';
                    resizePreview.style.maxHeight = '600px';
                    resizePreview.style.objectFit = 'contain';
                    
                    downloadResizeBtn.disabled = true;
                    resizeLabel.innerHTML = `<i class="fas fa-file-image"></i><span>Selected: ${file.name}</span>`;
                };
                originalImage.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });

    function updateResizePreview() {
        if (!originalImage) return;
        
        const newWidth = parseInt(resizeWidth.value);
        const newHeight = parseInt(resizeHeight.value);
        
        // Create canvas with new dimensions
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = newWidth;
        canvas.height = newHeight;
        
        // Draw image with new dimensions
        ctx.drawImage(originalImage, 0, 0, newWidth, newHeight);
        
        // Update preview with exact dimensions from input
        resizePreview.style.width = `${newWidth}px`;
        resizePreview.style.height = `${newHeight}px`;
        resizePreview.style.maxWidth = '100%';
        resizePreview.style.maxHeight = '600px';
        resizePreview.style.objectFit = 'contain';
        resizePreview.src = canvas.toDataURL('image/png');
        
        // Enable download button
        downloadResizeBtn.disabled = false;
    }

    // Update preview when width changes
    resizeWidth.addEventListener('input', function() {
        if (maintainAspect.checked && originalImage) {
            const ratio = originalHeight / originalWidth;
            resizeHeight.value = Math.round(this.value * ratio);
        }
        updateResizePreview();
    });

    // Update preview when height changes
    resizeHeight.addEventListener('input', function() {
        if (maintainAspect.checked && originalImage) {
            const ratio = originalWidth / originalHeight;
            resizeWidth.value = Math.round(this.value * ratio);
        }
        updateResizePreview();
    });

    // Add download functionality
    downloadResizeBtn.addEventListener('click', function() {
        const link = document.createElement('a');
        link.download = 'resized-image.png';
        link.href = resizePreview.src;
        link.click();
    });

    // Add resize button functionality
    resizeBtn.addEventListener('click', function() {
        updateResizePreview();
    });
}

// Crop Image Tool
function initializeCropTool() {
    const cropInput = document.getElementById('cropInput');
    const cropLabel = cropInput.nextElementSibling;
    const cropPreview = document.getElementById('cropPreview');
    const cropContainer = document.getElementById('cropContainer');
    const cropBtn = document.getElementById('cropBtn');
    const downloadCropBtn = document.getElementById('downloadCropBtn');
    
    let cropper = null;

    cropInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                cropPreview.src = e.target.result;
                cropContainer.style.display = 'flex';
                cropLabel.innerHTML = `<i class="fas fa-file-image"></i><span>Selected: ${file.name}</span>`;
                
                if (cropper) {
                    cropper.destroy();
                }
                
                cropper = new Cropper(cropPreview, {
                    aspectRatio: NaN,
                    viewMode: 1,
                    dragMode: 'move',
                    autoCropArea: 1,
                    restore: false,
                    guides: true,
                    center: true,
                    highlight: false,
                    cropBoxMovable: true,
                    cropBoxResizable: true,
                    toggleDragModeOnDblclick: false,
                    minContainerWidth: 600,
                    minContainerHeight: 600
                });
                
                cropBtn.disabled = false;
            };
            reader.readAsDataURL(file);
        }
    });

    cropBtn.addEventListener('click', function() {
        if (!cropper) return;
        
        const canvas = cropper.getCroppedCanvas();
        cropPreview.src = canvas.toDataURL('image/png');
        cropper.destroy();
        cropper = null;
        downloadCropBtn.disabled = false;
    });

    downloadCropBtn.addEventListener('click', function() {
        const link = document.createElement('a');
        link.download = 'cropped-image.png';
        link.href = cropPreview.src;
        link.click();
    });
}

// Rotate Image Tool
function initializeRotateTool() {
    const rotateInput = document.getElementById('rotateInput');
    const rotatePreview = document.getElementById('rotatePreview');
    const rotateAngle = document.getElementById('rotateAngle');
    const rotateAngleValue = document.getElementById('rotateAngleValue');
    const rotateLeftBtn = document.getElementById('rotateLeftBtn');
    const rotateRightBtn = document.getElementById('rotateRightBtn');
    const downloadRotateBtn = document.getElementById('downloadRotateBtn');

    let currentAngle = 0;
    let originalImage = null;

    rotateInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                originalImage = new Image();
                originalImage.onload = function() {
                    rotatePreview.src = e.target.result;
                    rotatePreview.classList.add('active');
                    currentAngle = 0;
                    rotateAngle.value = 0;
                    rotateAngleValue.value = 0;
                    downloadRotateBtn.disabled = true;
                };
                originalImage.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });

    function updateRotation() {
        if (!originalImage) return;
        
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        // Calculate new dimensions
        const angle = currentAngle * Math.PI / 180;
        const sin = Math.abs(Math.sin(angle));
        const cos = Math.abs(Math.cos(angle));
        
        canvas.width = originalImage.width * cos + originalImage.height * sin;
        canvas.height = originalImage.width * sin + originalImage.height * cos;
        
        // Rotate
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate(angle);
        ctx.drawImage(originalImage, -originalImage.width / 2, -originalImage.height / 2);
        
        rotatePreview.src = canvas.toDataURL('image/png');
        downloadRotateBtn.disabled = false;
    }

    rotateAngle.addEventListener('input', function() {
        currentAngle = parseInt(this.value);
        rotateAngleValue.value = currentAngle;
        updateRotation();
    });

    rotateAngleValue.addEventListener('input', function() {
        currentAngle = parseInt(this.value);
        rotateAngle.value = currentAngle;
        updateRotation();
    });

    rotateLeftBtn.addEventListener('click', function() {
        currentAngle = (currentAngle - 90) % 360;
        rotateAngle.value = currentAngle;
        rotateAngleValue.value = currentAngle;
        updateRotation();
    });

    rotateRightBtn.addEventListener('click', function() {
        currentAngle = (currentAngle + 90) % 360;
        rotateAngle.value = currentAngle;
        rotateAngleValue.value = currentAngle;
        updateRotation();
    });

    downloadRotateBtn.addEventListener('click', function() {
        const link = document.createElement('a');
        link.download = 'rotated-image.png';
        link.href = rotatePreview.src;
        link.click();
    });
}

// Flip Image Tool
function initializeFlipTool() {
    const flipInput = document.getElementById('flipInput');
    const flipPreview = document.getElementById('flipPreview');
    const flipHorizontalBtn = document.getElementById('flipHorizontalBtn');
    const flipVerticalBtn = document.getElementById('flipVerticalBtn');
    const downloadFlipBtn = document.getElementById('downloadFlipBtn');

    let originalImage = null;
    let isFlippedHorizontal = false;
    let isFlippedVertical = false;

    flipInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                originalImage = new Image();
                originalImage.onload = function() {
                    flipPreview.src = e.target.result;
                    flipPreview.classList.add('active');
                    isFlippedHorizontal = false;
                    isFlippedVertical = false;
                    downloadFlipBtn.disabled = true;
                };
                originalImage.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });

    function updateFlip() {
        if (!originalImage) return;
        
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        canvas.width = originalImage.width;
        canvas.height = originalImage.height;
        
        ctx.translate(
            isFlippedHorizontal ? canvas.width : 0,
            isFlippedVertical ? canvas.height : 0
        );
        ctx.scale(
            isFlippedHorizontal ? -1 : 1,
            isFlippedVertical ? -1 : 1
        );
        
        ctx.drawImage(originalImage, 0, 0);
        
        flipPreview.src = canvas.toDataURL('image/png');
        downloadFlipBtn.disabled = false;
    }

    flipHorizontalBtn.addEventListener('click', function() {
        isFlippedHorizontal = !isFlippedHorizontal;
        updateFlip();
    });

    flipVerticalBtn.addEventListener('click', function() {
        isFlippedVertical = !isFlippedVertical;
        updateFlip();
    });

    downloadFlipBtn.addEventListener('click', function() {
        const link = document.createElement('a');
        link.download = 'flipped-image.png';
        link.href = flipPreview.src;
        link.click();
    });
}

// Compress Image Tool
function initializeCompressTool() {
    const compressInput = document.getElementById('compressInput');
    const compressLabel = compressInput.nextElementSibling;
    const compressPreview = document.getElementById('compressPreview');
    const compressBtn = document.getElementById('compressBtn');
    const downloadCompressBtn = document.getElementById('downloadCompressBtn');
    const originalSizeDisplay = document.getElementById('originalSize');
    const compressedSizeDisplay = document.getElementById('compressedSize');
    const fileInputContainer = compressInput.parentElement;

    let originalImage = null;
    let originalFileSize = 0;

    function formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    function findOptimalCompression(canvas, originalSize) {
        // Try different quality levels to find the best compression
        const qualities = [0.8, 0.7, 0.6, 0.5, 0.4, 0.3];
        const formats = ['image/jpeg', 'image/webp'];
        
        for (const format of formats) {
            for (const quality of qualities) {
                const compressedDataUrl = canvas.toDataURL(format, quality);
                const base64str = compressedDataUrl.split(',')[1];
                const compressedSize = Math.ceil((base64str.length * 3) / 4);
                
                // Check if we've achieved at least 50% reduction
                if (compressedSize <= originalSize * 0.5) {
                    return {
                        dataUrl: compressedDataUrl,
                        size: compressedSize,
                        format: format,
                        quality: quality
                    };
                }
            }
        }
        
        // If we couldn't achieve 50% reduction, return the best compression we found
        const bestCompression = canvas.toDataURL('image/jpeg', 0.5);
        const base64str = bestCompression.split(',')[1];
        const compressedSize = Math.ceil((base64str.length * 3) / 4);
        
        return {
            dataUrl: bestCompression,
            size: compressedSize,
            format: 'image/jpeg',
            quality: 0.5
        };
    }

    function handleFile(file) {
        if (!file || !file.type.startsWith('image/')) {
            alert('Please select an image file');
            return;
        }

        originalFileSize = file.size;
        originalSizeDisplay.textContent = formatFileSize(originalFileSize);
        compressedSizeDisplay.textContent = 'Calculating...';
        
        const reader = new FileReader();
        reader.onload = function(e) {
            originalImage = new Image();
            originalImage.onload = function() {
                compressPreview.src = e.target.result;
                compressPreview.classList.add('active');
                downloadCompressBtn.disabled = true;
                compressLabel.innerHTML = `<i class="fas fa-file-image"></i><span>Selected: ${file.name}</span>`;
                updateCompressPreview();
            };
            originalImage.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }

    // Handle file input change
    compressInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            handleFile(file);
        }
    });

    // Handle drag and drop
    fileInputContainer.addEventListener('dragover', function(e) {
        e.preventDefault();
        e.stopPropagation();
        fileInputContainer.classList.add('dragover');
    });

    fileInputContainer.addEventListener('dragleave', function(e) {
        e.preventDefault();
        e.stopPropagation();
        fileInputContainer.classList.remove('dragover');
    });

    fileInputContainer.addEventListener('drop', function(e) {
        e.preventDefault();
        e.stopPropagation();
        fileInputContainer.classList.remove('dragover');
        
        const file = e.dataTransfer.files[0];
        if (file) {
            handleFile(file);
        }
    });

    function updateCompressPreview() {
        if (!originalImage) return;
        
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        canvas.width = originalImage.width;
        canvas.height = originalImage.height;
        
        ctx.drawImage(originalImage, 0, 0);
        
        // Find optimal compression settings
        const compression = findOptimalCompression(canvas, originalFileSize);
        
        // Update preview and display sizes
        compressPreview.src = compression.dataUrl;
        compressedSizeDisplay.textContent = formatFileSize(compression.size);
        
        // Calculate and display compression ratio
        const compressionRatio = ((1 - (compression.size / originalFileSize)) * 100).toFixed(1);
        compressedSizeDisplay.textContent += ` (${compressionRatio}% smaller)`;
        
        // Enable download if we achieved good compression
        if (compression.size < originalFileSize) {
            downloadCompressBtn.disabled = false;
        } else {
            compressedSizeDisplay.textContent = 'No compression possible';
            downloadCompressBtn.disabled = true;
        }
    }

    // Add download functionality
    downloadCompressBtn.addEventListener('click', function() {
        const link = document.createElement('a');
        const format = compressPreview.src.startsWith('data:image/webp') ? 'webp' : 'jpg';
        link.download = `compressed-image.${format}`;
        link.href = compressPreview.src;
        link.click();
    });

    // Add compress button functionality
    compressBtn.addEventListener('click', function() {
        updateCompressPreview();
    });
}

// Draw on Image Tool
function initializeDrawTool() {
    const drawInput = document.getElementById('drawInput');
    const drawingCanvas = document.getElementById('drawingCanvas');
    const penTool = document.getElementById('penTool');
    const eraserTool = document.getElementById('eraserTool');
    const drawColor = document.getElementById('drawColor');
    const brushSize = document.getElementById('brushSize');
    const clearCanvas = document.getElementById('clearCanvas');
    const downloadDrawBtn = document.getElementById('downloadDrawBtn');

    const ctx = drawingCanvas.getContext('2d');
    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;
    let isEraser = false;
    let originalImage = null;

    function getMousePos(canvas, evt) {
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        
        return {
            x: (evt.clientX - rect.left) * scaleX,
            y: (evt.clientY - rect.top) * scaleY
        };
    }

    function resizeCanvas() {
        const container = drawingCanvas.parentElement;
        const containerWidth = container.clientWidth;
        const containerHeight = 600;
        
        drawingCanvas.width = containerWidth;
        drawingCanvas.height = containerHeight;
        
        if (originalImage) {
            ctx.drawImage(originalImage, 0, 0, drawingCanvas.width, drawingCanvas.height);
        }
    }

    drawInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                originalImage = new Image();
                originalImage.onload = function() {
                    resizeCanvas();
                    ctx.drawImage(originalImage, 0, 0, drawingCanvas.width, drawingCanvas.height);
                    downloadDrawBtn.disabled = false;
                };
                originalImage.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });

    penTool.addEventListener('click', function() {
        isEraser = false;
        penTool.classList.add('active');
        eraserTool.classList.remove('active');
        ctx.globalCompositeOperation = 'source-over';
    });

    eraserTool.addEventListener('click', function() {
        isEraser = true;
        eraserTool.classList.add('active');
        penTool.classList.remove('active');
        ctx.globalCompositeOperation = 'destination-out';
    });

    clearCanvas.addEventListener('click', function() {
        if (originalImage) {
            ctx.clearRect(0, 0, drawingCanvas.width, drawingCanvas.height);
            ctx.drawImage(originalImage, 0, 0, drawingCanvas.width, drawingCanvas.height);
        } else {
            ctx.clearRect(0, 0, drawingCanvas.width, drawingCanvas.height);
        }
    });

    drawingCanvas.addEventListener('mousedown', function(e) {
        isDrawing = true;
        const pos = getMousePos(drawingCanvas, e);
        lastX = pos.x;
        lastY = pos.y;
    });

    drawingCanvas.addEventListener('mousemove', function(e) {
        if (!isDrawing) return;
        
        const pos = getMousePos(drawingCanvas, e);
        
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(pos.x, pos.y);
        ctx.strokeStyle = isEraser ? '#ffffff' : drawColor.value;
        ctx.lineWidth = brushSize.value;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.stroke();
        
        lastX = pos.x;
        lastY = pos.y;
    });

    drawingCanvas.addEventListener('mouseup', () => isDrawing = false);
    drawingCanvas.addEventListener('mouseout', () => isDrawing = false);

    downloadDrawBtn.addEventListener('click', function() {
        const link = document.createElement('a');
        link.download = 'drawn-image.png';
        link.href = drawingCanvas.toDataURL('image/png');
        link.click();
    });

    window.addEventListener('resize', resizeCanvas);
}

// Blur/Sharpen Tool
function initializeBlurSharpenTool() {
    const blurInput = document.getElementById('blurInput');
    const blurPreview = document.getElementById('blurPreview');
    const blurAmount = document.getElementById('blurAmount');
    const blurAmountValue = document.getElementById('blurAmountValue');
    const sharpenAmount = document.getElementById('sharpenAmount');
    const sharpenAmountValue = document.getElementById('sharpenAmountValue');
    const applyBlurBtn = document.getElementById('applyBlurBtn');
    const downloadBlurBtn = document.getElementById('downloadBlurBtn');

    let originalImage = null;

    blurInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                originalImage = new Image();
                originalImage.onload = function() {
                    blurPreview.src = e.target.result;
                    blurPreview.classList.add('active');
                    blurAmount.value = 0;
                    blurAmountValue.value = 0;
                    sharpenAmount.value = 0;
                    sharpenAmountValue.value = 0;
                    downloadBlurBtn.disabled = true;
                };
                originalImage.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });

    function updateBlurPreview() {
        if (!originalImage) return;
        
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        canvas.width = originalImage.width;
        canvas.height = originalImage.height;
        
        // Apply blur
        ctx.filter = `blur(${blurAmount.value}px)`;
        ctx.drawImage(originalImage, 0, 0);
        
        // Apply sharpen using convolution
        if (sharpenAmount.value > 0) {
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const data = imageData.data;
            const sharpen = sharpenAmount.value / 10;
            
            for (let i = 0; i < data.length; i += 4) {
                data[i] = Math.min(255, data[i] * (1 + sharpen));
                data[i + 1] = Math.min(255, data[i + 1] * (1 + sharpen));
                data[i + 2] = Math.min(255, data[i + 2] * (1 + sharpen));
            }
            
            ctx.putImageData(imageData, 0, 0);
        }
        
        blurPreview.src = canvas.toDataURL('image/png');
        downloadBlurBtn.disabled = false;
    }

    blurAmount.addEventListener('input', function() {
        blurAmountValue.value = this.value;
        updateBlurPreview();
    });

    sharpenAmount.addEventListener('input', function() {
        sharpenAmountValue.value = this.value;
        updateBlurPreview();
    });

    downloadBlurBtn.addEventListener('click', function() {
        const link = document.createElement('a');
        link.download = 'blurred-image.png';
        link.href = blurPreview.src;
        link.click();
    });

    applyBlurBtn.addEventListener('click', function() {
        updateBlurPreview();
    });
}

// Adjust Image Tool
function initializeAdjustTool() {
    const adjustInput = document.getElementById('adjustInput');
    const adjustPreview = document.getElementById('adjustPreview');
    const brightness = document.getElementById('brightness');
    const brightnessValue = document.getElementById('brightnessValue');
    const contrast = document.getElementById('contrast');
    const contrastValue = document.getElementById('contrastValue');
    const saturation = document.getElementById('saturation');
    const saturationValue = document.getElementById('saturationValue');
    const applyAdjustBtn = document.getElementById('applyAdjustBtn');
    const downloadAdjustBtn = document.getElementById('downloadAdjustBtn');

    let originalImage = null;

    adjustInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                originalImage = new Image();
                originalImage.onload = function() {
                    adjustPreview.src = e.target.result;
                    adjustPreview.classList.add('active');
                    brightness.value = 0;
                    brightnessValue.value = 0;
                    contrast.value = 0;
                    contrastValue.value = 0;
                    saturation.value = 0;
                    saturationValue.value = 0;
                    downloadAdjustBtn.disabled = true;
                };
                originalImage.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });

    function updateAdjustPreview() {
        if (!originalImage) return;
        
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        canvas.width = originalImage.width;
        canvas.height = originalImage.height;
        
        // Apply adjustments
        ctx.filter = `brightness(${100 + parseInt(brightness.value)}%) 
                     contrast(${100 + parseInt(contrast.value)}%) 
                     saturate(${100 + parseInt(saturation.value)}%)`;
        
        ctx.drawImage(originalImage, 0, 0);
        
        adjustPreview.src = canvas.toDataURL('image/png');
        downloadAdjustBtn.disabled = false;
    }

    brightness.addEventListener('input', function() {
        brightnessValue.value = this.value;
        updateAdjustPreview();
    });

    contrast.addEventListener('input', function() {
        contrastValue.value = this.value;
        updateAdjustPreview();
    });

    saturation.addEventListener('input', function() {
        saturationValue.value = this.value;
        updateAdjustPreview();
    });

    downloadAdjustBtn.addEventListener('click', function() {
        const link = document.createElement('a');
        link.download = 'adjusted-image.png';
        link.href = adjustPreview.src;
        link.click();
    });

    applyAdjustBtn.addEventListener('click', function() {
        updateAdjustPreview();
    });
}

// Color Filters Tool
function initializeFilterTool() {
    const filterInput = document.getElementById('filterInput');
    const filterPreview = document.getElementById('filterPreview');
    const grayscaleBtn = document.getElementById('grayscaleBtn');
    const sepiaBtn = document.getElementById('sepiaBtn');
    const invertBtn = document.getElementById('invertBtn');
    const downloadFilterBtn = document.getElementById('downloadFilterBtn');

    let originalImage = null;

    filterInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                originalImage = new Image();
                originalImage.onload = function() {
                    filterPreview.src = e.target.result;
                    filterPreview.classList.add('active');
                    downloadFilterBtn.disabled = true;
                };
                originalImage.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });

    function applyFilter(filter) {
        if (!originalImage) return;
        
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        canvas.width = originalImage.width;
        canvas.height = originalImage.height;
        
        ctx.filter = filter;
        ctx.drawImage(originalImage, 0, 0);
        
        filterPreview.src = canvas.toDataURL('image/png');
        downloadFilterBtn.disabled = false;
    }

    grayscaleBtn.addEventListener('click', function() {
        applyFilter('grayscale(100%)');
    });

    sepiaBtn.addEventListener('click', function() {
        applyFilter('sepia(100%)');
    });

    invertBtn.addEventListener('click', function() {
        applyFilter('invert(100%)');
    });

    downloadFilterBtn.addEventListener('click', function() {
        const link = document.createElement('a');
        link.download = 'filtered-image.png';
        link.href = filterPreview.src;
        link.click();
    });
} 