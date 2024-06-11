const BACKEND_URL = "http://0.0.0.0:8000" 

document.getElementById("imageForm").addEventListener("submit", event => {
    event.preventDefault();
    processImage(event);
})

const processImage = event => {
    event.preventDefault()
    const fileInput = document.getElementById('imageInput');
    const image     = fileInput.files[0];
    const label     = document.getElementById('labelInput').value;
    const maskPath  = document.getElementById('maskPathInput').value;
    const width     = document.getElementById('widthInput').value;
    const height    = document.getElementById('heightInput').value;
    const length    = document.getElementById('lengthInput').value;
    
    // Check if all inner values are true
    const all = (arr, fn = Boolean) => arr.every(fn);

    if (!all([image, maskPath, label, width, height, length])) {
        alert("Не указаны все данные!")
    } else {
        // Show spinner on load
        showSpinner()

        // Form req. body
        const formData = new FormData();
        formData.append('img', image);
        formData.append('mask_path', maskPath);
        formData.append('product_category', label);
    
        // Perform request
        var xhr = new XMLHttpRequest();
        xhr.open('POST', `${BACKEND_URL}/process`, true);
        xhr.responseType = 'blob'; // Binary as response

        xhr.onload = function() {
            if (xhr.status === 200) {
                var blob = xhr.response;
                var imageUrl = URL.createObjectURL(blob);
                console.log(blob)
                const noGeneratedImagesFlag   = document.getElementById("noGeneratedImages")
                const generationInProcessFlag = document.getElementById("generationInProcess")
                const imageGeneratedFlag      = document.getElementById("imageGenerated")
                const generatedImageSpinner   = document.getElementById("generatedImageSpinner")
                const serverImage             = document.getElementById("serverImage")

                // Hide unnecessary flags
                noGeneratedImagesFlag.style.display   = "none"; 
                generationInProcessFlag.style.display = "none"; 
                generatedImageSpinner.style.display   = "none";

                // Show actual blocks
                imageGeneratedFlag.style.display = "block";
                serverImage.style.display        = "block";

                serverImage.src = imageUrl;
            } 
        };

        xhr.send(formData);
    }
    return false;   
}

const showImagePreview = () => {
    const fileInput = document.getElementById('imageInput');
    const file      = fileInput.files[0];

    let reader = new FileReader();
    reader.onload = e => {
        e.preventDefault();
        let preview = document.getElementById('imagePreview');
        preview.style.display = "block"
        preview.src = e.target.result;
    }
    reader.readAsDataURL(file);
}

const showSpinner = () => {
    const noGeneratedImagesFlag   = document.getElementById("noGeneratedImages")
    const generationInProcessFlag = document.getElementById("generationInProcess")
    const imageGeneratedFlag      = document.getElementById("imageGenerated")
    const generatedImageSpinner   = document.getElementById("generatedImageSpinner")

    // Hide unnecessary flags
    noGeneratedImagesFlag.style.display = "none"; 
    imageGeneratedFlag.style.display    = "none"; 

    // Show actual blocks
    generationInProcessFlag.style.display = "block";
    generatedImageSpinner.style.display   = "flex";
}