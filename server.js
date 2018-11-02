const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.use(express.static('public'));

class Image{
  constructor(name, src){
      this.name = name;
      this.src = src;
    }
}

class Directory{
  constructor(name, images, id){
      this.name = name;
      this.images = [];
      this.id = id;
    }
  addImage(Image){
    this.images.push(Image);
  }
}

class DirectoryContainer{
  constructor(){
    this.directories = [];
    this.activeItem = 0;
  }
  addItem(Item){
    this.directories.push(Item);
  }
}

const directoryList = new DirectoryContainer();

let directories = fs.readdirSync('./public/Content/Directories');
directories.forEach((directory)=>{
      let dir = new Directory(directory, '', directoryList.activeItem);
      directoryList.addItem(dir);
      directoryList.activeItem++;
      let images = fs.readdirSync(`./public/Content/Directories/${directory}`);
      images.forEach((imageName) =>{
          let img = new Image(imageName, `./Content/Directories/${directory}/${imageName}`);
          dir.addImage(img);
      });
});

app.get('/directories', (req, res) => {
  res.send(directoryList);
});

app.listen(3000, () => console.log(`I'm listening on port 3000`));
