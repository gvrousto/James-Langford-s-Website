(function(){
  var urlParams = new URLSearchParams(window.location.search);
  let promise;
  console.log('in client side');
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
  }

  function displayItem(item){
    console.log(item.name);
    const mainDiv = document.getElementById('main-content-container');
    let imageDiv = document.createElement('div');

    let i = document.createElement("img");
    console.log(item.images[0].src);
    i.src = item.images[0].src;
    //i.setAttribute("height", "750px");
    i.setAttribute("width", "1000px");
    i.setAttribute("margin-left", "50px")
    imageDiv.appendChild(i);

    let h = document.createElement("P")                // Create a <h1> element
    let t = document.createTextNode(item.name);
    h.appendChild(t);

    imageDiv.classList.add('entire-container');
    //imageDiv.classList.add('shadow');
    imageDiv.appendChild(h);
    imageDiv.onclick = () => {
            window.location.href=`/directory-detail/${item.id}`;
    }

    mainDiv.appendChild(imageDiv);
  }
}())
