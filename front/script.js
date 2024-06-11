const BACKEND_URL = "http://0.0.0.0:8000" 

document.getElementById("imageForm").addEventListener('submit', e => {
    e.preventDefault()
    processImage(e);
    return false;
})

const processImage = async (e) => {
    e.preventDefault()
    const fileInput = document.getElementById('imageInput');
    const image = fileInput.files[0];
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
        console.log(image)
        showSpinner()
        const formData = new FormData();
        formData.append('img', image);
        formData.append('mask_path', maskPath);
        formData.append('product_category', label);
    
        var xhr = new XMLHttpRequest();
        xhr.open('POST', `${BACKEND_URL}/process`, true);
        xhr.responseType = 'blob'; // Указываем, что ожидаем в ответе бинарные данные (изображение)

        xhr.onload = function() {
            if (xhr.status === 200) {
                var blob = xhr.response;
                var imageUrl = URL.createObjectURL(blob);
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

        // const response = await fetch(`${BACKEND_URL}/process`, {
        //     method: 'POST',
        //     body: formData
        // })

        // console.log(response)
        // const imageData = await response.blob();
        // const imageUrl = URL.createObjectURL(imageData);
        // console.log(imageData)
        // showGeneratedImage(imageData)
    }   
    return false;
}

const showImagePreview = () => {
    const fileInput = document.getElementById('imageInput');
    const file = fileInput.files[0];
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

const showGeneratedImage = imageData => {
    // const noGeneratedImagesFlag   = document.getElementById("noGeneratedImages")
    // const generationInProcessFlag = document.getElementById("generationInProcess")
    // const imageGeneratedFlag      = document.getElementById("imageGenerated")
    // const generatedImageSpinner   = document.getElementById("generatedImageSpinner")
    // const serverImage             = document.getElementById("serverImage")

    // // Hide unnecessary flags
    // noGeneratedImagesFlag.style.display   = "none"; 
    // generationInProcessFlag.style.display = "none"; 
    // generatedImageSpinner.style.display   = "none";

    // // Show actual blocks
    // imageGeneratedFlag.style.display = "block";
    // serverImage.style.display        = "block";

    
    // const imageUrl = URL.createObjectURL(imageData);
    // serverImage.src = imageUrl;
    // console.log(imageUrl)
}