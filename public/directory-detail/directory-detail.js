(function() {
    let id = window.location.pathname.substring(18);
    fetch(`/directory/${id}`)
        .then(res => res.json())
        .then(data => displayImages(data));

    function displayImages(directoryItem){
      directoryItem.images.forEach((directoryItem) => displayImage(directoryItem));
    }

    function displayImage(image) {
        console.log(image.src);
        const mainDiv = document.getElementById('main-content-container');
        let imageDiv = document.createElement('div');

        let i = document.createElement("img");
        i.src = `${image.src}`;
        console.log(i.src);
        i.setAttribute("height", "400px");
        i.setAttribute("width", "450px");
        imageDiv.classList.add('entire-container');
        imageDiv.classList.add('shadow');
        imageDiv.appendChild(i);
        mainDiv.appendChild(imageDiv);
    }
}())
