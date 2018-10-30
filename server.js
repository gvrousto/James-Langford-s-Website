const express = require('express');
const fs = require('fs');
const path = require('path');


const app = express();
app.use(express.static('public'));

class Item{
  constructor(name, src, id){
      this.name = name;
      this.src = src;
      this.id = id;
    }
}

class ItemContainer{
  constructor(){
    this.items = [];
    this.activeItem = 0;
  }
}

const itemList = new ItemContainer();

app.get('/items', (req, res) => {
    res.send(itemList.items);
});

app.get('/test', (req,res) => {
  console.log('in get');
  fs.readdir('./public/Content/Directories', function(err, items) {
    items.forEach(item => displayItem(item));
  });
  res.sendFile(`/index.html`, { root: 'public'});
});

function displayItem(item){
  console.log(item);
  const mainDiv = document.getElementById('main-content-container');
  let imageDiv = document.createElement('div');
  let h = document.createElement("H1")                // Create a <h1> element
  let t = document.createTextNode(item);
  h.appendChild(t);
  imageDiv.classList.add('entire-container');
  imageDiv.classList.add('shadow');
  imageDiv.appendChild(h);
  mainDiv.appendChild(imageDiv);
}

app.listen(3000, () => console.log(`I'm listening on port 3000`));
