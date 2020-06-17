const express = require('express');
const axios = require('axios');
const qs = require('qs');

const app = express();
const port = 3000;

const apiKey = '';

const authorizationData = qs.stringify({ grant_type: 'client_credentials', scope: 'auto' });

app.use(express.json()) // for parsing application/json




app.post('/webhook', async (req, res) => {
  const contactId = req.body["Parameters"]["Contact.Id"];

  const authorizationResponse = await axios({
    method: 'post', 
    url: 'https://oauth.wildapricot.org/auth/token', headers: {
      Authorization: 'Basic ' + Buffer.from(`APIKEY:${apiKey}`).toString('base64'),
    },
    data: authorizationData,
  });


  console.log(authorizationResponse.data);

  const accessToken = authorizationResponse.data.access_token;

  res.status(200).send(accessToken);
});


app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
