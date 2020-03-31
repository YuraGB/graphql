const express = require('express');
const graphqlHTTP = require('express-graphql');
const  rootType  = require('./schema').rootType;
const  resolver  = require('./schema').resolver;
var bodyParser = require('body-parser');
var cors = require('cors');
const app = express();

/*app.use(bodyParser.json());
// parse various different custom JSON types as JSON
app.use(bodyParser.json());
app.use(bodyParser.text({ type: 'application/graphql' }));*/

/*app.use((res,req,next) => {
  console.log(req.body)
  next(req)
})*/
app.use(cors());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.use(
  '/graphql',
  graphqlHTTP({
    schema: rootType,
    rootValue: resolver,
    graphiql: true,
  })
);
app.get('/', (req, res,next) => {
  console.log(req);
  res.send("Hello world")
})
app.listen(4000, () => console.log('started'));