import express from 'express';
import bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.json({ hello: 'App is now running, please post the data' });
});

app.post('/', (req, res) => {
  const data = req.body;
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
  return res.json(respData);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Service started on port : ${port}`);
});
