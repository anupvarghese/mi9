import express from 'express';
import bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.contentType('application/json');
  next();
});

app.get('/', (req, res) => {
  res.json({ hello: 'App is now running, please post the data' });
});

app.post('/', (req, res) => {
  console.log(req.length);
  console.log(req.body);
  const data = req.body;
  if (!Object.keys(data)) {
    return res.status(400).send({ error: 'Could not decode request: JSON parsing failed' });
  }
  const filteredData = typeof data.payload !== 'undefined' ?
              data.payload.filter(m => (m.drm === true && m.episodeCount > 0)) :
              null;
  if (!filteredData) {
    return res.status(400).send({ error: 'Could not decode request: JSON parsing failed' });
  }
  const respData = filteredData.map(m => {
    const obj = {};
    obj.image = m.image.showImage;
    obj.slug = m.slug;
    obj.title = m.title;
    return obj;
  });
  if (respData.length === 0) {
    return res.status(400).send({ error: 'Could not decode request: JSON parsing failed' });
  }
  return res.json({ response: respData });
});

app.all('*', () => {
  throw new Error('Bad request');
});

app.use((e, req, res, next) => {
  if (e.message === 'Bad request') {
    res.status(400).json({ error: 'Could not decode request: JSON parsing failed' });
  }
  if (e instanceof SyntaxError) {
    res.status(400).json({ error: 'Could not decode request: JSON parsing failed' });
  }
  next();
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Service started on port : ${port}`);
});
