const BACKEND_URL = "http://0.0.0.0:8000" 

const processImage = async () => {
    const fileInput = document.getElementById('imageInput');
    const image  = fileInput.files[0];
    const label  = document.getElementById('labelInput').value;
    const maskPath = document.getElementById('maskPathInput').value;
    const width  = document.getElementById('widthInput').value;
    const height = document.getElementById('heightInput').value;
    const length = document.getElementById('lengthInput').value;
    
    const all = (arr, fn = Boolean) => arr.every(fn);

    if (!all([image, maskPath, label, width, height, length])) {
        alert("Не указаны все данные!")
    } else {
        console.log(`Данные отправлены по адресу ${BACKEND_URL}.`)
        await sendImageData(image, maskPath, label, length, width, height)
    }   
}

const sendImageData = async (image, maskPath, label, length, width, height) => {
    showSpinner()
    await fetch(`${BACKEND_URL}/generate_image`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: { image, maskPath, label, length, width, height }
    })
    .then(response => response.json())
    .then(data => showGeneratedImage(data))
    .catch(error => {
        console.error('Error:', error);
    });
}

const showImagePreview = () => {
    const fileInput = document.getElementById('imageInput');
    const file = fileInput.files[0];
    let reader = new FileReader();
    reader.onload = e => {
        let preview = document.getElementById('imagePreview');
        preview.style.display = "block"
        preview.src = e.target.result;
    }
    reader.readAsDataURL(file);
}

const showSpinner = () => {
    const noGeneratedImagesFlag = document.getElementById("noGeneratedImages")
    const generationInProcessFlag = document.getElementById("generationInProcess")
    const imageGeneratedFlag = document.getElementById("imageGenerated")
    const generatedImageSpinner = document.getElementById("generatedImageSpinner")

    // Hide unnecessary flags
    noGeneratedImagesFlag.style.display = "none"; 
    imageGeneratedFlag.style.display    = "none"; 

    // Show actual blocks
    generationInProcessFlag.style.display = "block";
    generatedImageSpinner.style.display   = "flex";

}

const showGeneratedImage = image => {
    const noGeneratedImagesFlag = document.getElementById("noGeneratedImages")
    const generationInProcessFlag = document.getElementById("generationInProcess")
    const imageGeneratedFlag = document.getElementById("imageGenerated")
    const generatedImageSpinner = document.getElementById("generatedImageSpinner")
    const serverImage = document.getElementById("serverImage")

    // Hide unnecessary flags
    noGeneratedImagesFlag.style.display   = "none"; 
    generationInProcessFlag.style.display = "none"; 
    generatedImageSpinner.style.display   = "none";

    // Show actual blocks
    imageGeneratedFlag.style.display = "block";
    serverImage.style.display        = "block";

    // Load image
    let reader = new FileReader();
    reader.onload = e => { serverImage.src = e.target.result }
    reader.readAsDataURL(image);
}