const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const AWS = require('aws-sdk');
const app = express();

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.use(express.static('public'));
const config = require('./config.js');

AWS.config.update({
    accessKeyId: config.AWSAccessKeyId,
    secretAccessKey: config.AWSSecretKey
  });

let s3 = new AWS.S3();
const listDirectories = params => {
  return new Promise ((resolve, reject) => {
    const s3params = {
      Bucket: config.BucketName,
      MaxKeys: 20,
      Prefix: 'Content/Directories',
      Delimiter: '',
    };
    s3.listObjectsV2 (s3params, (err, data) => {
      if (err) {
        reject (err);
      }
      console.log(data);
    });
  });
};

listDirectories();

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
          let img = new Image(imageName, `https://s3.us-east-2.amazonaws.com/jimmylangford/Content/Directories/${directory}/${imageName}`);
          dir.addImage(img);
      });
});

app.get('/directories', (req, res) => {
  res.send(directoryList);
});

app.get('/directory-detail/:id', (req,res) => {
  res.sendFile(`directory-detail/directory-detail.html`, { root: 'public'});
});

app.get('/calendar', (req,res) => {
  res.sendFile(`calendar/calendar.html`, { root: 'public'});

});

app.get('/directory/:id', (req,res) =>{
    let index = parseInt(req.params.id);
    if(index >= directoryList.activeItem || index < 0){
      res.status(401).send({message: 'invalid index'});
    }
    res.send(directoryList.directories[index]);
});
app.listen(process.env.PORT || 5000, () => console.log(`I'm listening on port 5000`));
