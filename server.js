const express = require('express');
const path = require('path');
const cors = require('cors');
const uuidv4 = require('uuid/v4');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

//*********************************************//

const db = [
    { id: 1, author: 'John Doe', text: 'This company is worth every coin!' },
    { id: 2, author: 'Amanda Doe', text: 'They really know how to make you happy.' },
  ];


app.get('/', (req, res) => {
  res.send('home');
});


/** testimonials start **/
app.get('/testimonials', (req, res) => {
  res.send(db);
});

app.get('/testimonials/:id', (req, res) => { //ok
  for(let record of db){
    if(record.id == req.params.id){
      res.send(record);
    };
  };
});

app.get('/testimonials/random', (req, res) => { //to do
  res.send('random');
});

app.post('/testimonials', (req,res) =>{ //ok
  const {author, text} = req.body;  

  const newPost = {id: uuidv4(), author: author, text: text};
  db.push(newPost);
  res.send({message: 'OK'});
});

app.put('/testimonials/:id', (req, res) =>{
//   const {author, text} = req.body;

  for(let record of db){
    if(record.id == req.params.id){

        res.send(record);
    //   record.author = author;
    //   record.text = text;
    };
  };
    res.send({message: 'OK'});
});

app.delete('/testimonials/:id', (req, res) => { //ok
  for(let record of db){
    if(record.id == req.params.id){
      db.splice(db.indexOf(record));
    };
  };
    res.send({message: 'OK'});
  })

/** testimonials end **/


//*********************************************//

app.use((req, res) => {
  res.status(404).send({ message: 'Not found...' });
});

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});