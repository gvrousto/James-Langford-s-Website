(function(){
  var urlParams = new URLSearchParams(window.location.search);
  let promise;
  console.log('in client side');
  promise = fetch(`/directories`);
  promise
        .then(res => res.json())
        .then(data => displayItems(data));

  function displayItems(directoryList) {
    console.log(directoryList.directories);
    directoryList.directories.forEach((item) => displayItem(item));
  }

  function displayItem(item){
    console.log(item.name);
    const mainDiv = document.getElementById('main-content-container');
    let imageDiv = document.createElement('div');

    let i = document.createElement("img");
    console.log(item.images[0].src);
    i.src = item.images[0].src;
    i.setAttribute("height", "400px");
    i.setAttribute("width", "450px");
    imageDiv.appendChild(i);

    let h = document.createElement("H1")                // Create a <h1> element
    let t = document.createTextNode(item.name);
    h.appendChild(t);

    imageDiv.classList.add('entire-container');
    imageDiv.classList.add('shadow');
    imageDiv.appendChild(h);
    imageDiv.onclick = () => {
            window.location.href=`/directory-detail/${item.id}`;
    }

    mainDiv.appendChild(imageDiv);
  }
}())
