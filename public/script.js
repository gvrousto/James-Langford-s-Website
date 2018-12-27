(function(){
  var urlParams = new URLSearchParams(window.location.search);
  let promise;
  let currentDirectoryCounter = 0;
  let slideIndex = 0;
  let lazyLoad = 0;

  promise = fetch(`/directories`);
  promise
        .then(res => res.json())
        .then(data => displayItems(data));

  let headerDiv = document.getElementById('header-text');
  headerDiv.onclick = () => {
          window.location.href=`/`;
  }

  let calendarLink = document.getElementById('calendar-button');
  calendarLink.onclick = () => {
    window.location.href=`/calendar`;
  }

  function displayItems(directoryList) {
    console.log(directoryList.directories);
    directoryList.directories.forEach((item) => displayItem(item));
    directoryList.directories.forEach((item) => makeModal(item));
  }

  function displayItem(item){
    const mainDiv = document.getElementById('main-content-container');
    let imageDiv = document.createElement('div');

    let i = document.createElement("img");
    i.src = item.images[0].src;
    //i.setAttribute("height", "750px");
    i.setAttribute("width", "500px");
    i.setAttribute("margin-left", "50px")
    i.classList.add('displayImg');
    imageDiv.appendChild(i);

    let h = document.createElement("P")                // Create a <p> element
    let t = document.createTextNode(item.name);
    h.appendChild(t);

    imageDiv.classList.add('entire-container');
    //imageDiv.classList.add('shadow');
    imageDiv.appendChild(h);
    imageDiv.onclick = () => {
            openModal(item.id);
            //window.location.href=`/directory-detail/${item.id}`;
    }

    mainDiv.appendChild(imageDiv);
  }

  function makeModal(item){
    let directoryId = item.id;

    let body = document.getElementById('body');
    let modal = document.createElement('div');
    let modalContent = document.createElement('div');
    let closeCursor = document.createElement('span');

    modal.classList.add('modal');
    modal.setAttribute('id', `myModal${item.id}`);

    modalContent.classList.add('modal-content');
    modalContent.setAttribute('id', `myModalContent${item.id}`);

    closeCursor.classList.add('close');

    closeCursor.innerHTML = '&times;';

    closeCursor.onclick = () => {
      closeModal(directoryId);
    };

    body.appendChild(modal);
    modal.appendChild(closeCursor);
    modal.appendChild(modalContent);

    item.images.forEach((item, blach) => addSlides(item, blach));
    currentDirectoryCounter++;

    let next = document.createElement('a');
    let prev = document.createElement('a');
    next.classList.add('prev');
    prev.classList.add('next');
    next.innerHTML = '&#10094;';
    prev.innerHTML = '&#10095;';
    next.onclick = () => {
      plusSlides(-1, directoryId);
    };
    prev.onclick = () => {
      plusSlides(1, directoryId);
    };

    modal.appendChild(prev);
    modal.appendChild(next);


    console.log(modal);
  }

  function addSlides(item){
    let modalContent = document.getElementById(`myModalContent${currentDirectoryCounter}`);

    let mySlides = document.createElement('div');
    mySlides.classList.add(`mySlides${currentDirectoryCounter}`);


    let i = document.createElement("img");
    i.src = item.src;
    i.setAttribute("style", "width:100%");


    modalContent.appendChild(mySlides);
    mySlides.appendChild(i);

  }

  function openModal(n){
    document.getElementById(`myModal${n}`).style.display = "block";
    console.log(n);
    showSlide(n, 0);
  }

  function closeModal(n){
    if(lazyLoad === 0){

    }
    document.getElementById(`myModal${n}`).style.display = "none";
    slideIndex = 0;
  }

  function showSlide(modalNum, slideNum){
    let slides = document.getElementsByClassName(`mySlides${modalNum}`);
    console.log(slides);
    if (slideNum > slides.length - 1) {slideIndex = 0}
    if (slideNum < 0) {slideIndex = slides.length - 1}
    console.log(slideIndex);
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    slides[slideIndex].style.display = "block";
  }

  function plusSlides(increment, modalNum){
    slideIndex = slideIndex + increment;
    showSlide(modalNum, slideIndex);
  }

}())
