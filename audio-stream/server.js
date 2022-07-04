const express = require('express'),
app = express(),
fs = require('fs'),
getStat = require('util').promisify(fs.stat);


const port = 3000;


app.get('/audio', async (req, res) => {

  const filePath = './example.ogg';

  const stat = await getStat(filePath);

  res.writeHead(200, {
    'Content-Type': 'audio/ogg',
    'Content-Length': stat.size 
  });

  const stream = fs.createReadStream(filePath);

  stream.on('end',() => console.log('stream ended'));
  stream.on('error', err => console.log('stream error', err));

  stream.pipe(res);

});



app.listen(process.env.PORT || port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });