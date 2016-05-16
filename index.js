import express from 'express';


const app = express();

app.get('/', (req, res) => {
  res.json({ hello: 'All the best' });
});


const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Service started on port : ${port}`);
});
