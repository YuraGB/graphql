const graphql = require('graphql');
const data = require('./data.json');

let rootType = graphql.buildSchema(
  `type Message {
      name : String
      types : String
      l : String
  }
  
  type Query {
    getMessage(types: String!): Message
  }
  `);


let resolver = {
  getMessage: ({types}) => {
    return data[types];
  }
};

/*let rootType = new graphql.GraphQLObjectType({
   name: 'query',
   fields: {
     books: {
       type:booksType,
       args: {
         name: {
           type: graphql.GraphQLString
         },
         types: {
           type: graphql.GraphQLString
         },
         l: {
           type: graphql.GraphQLString,
         },
       },
       resolve(root, args) {
         return data[args.types];
       }
     }
   }
});*/

/*
let schema = new graphql.GraphQLSchema({
  query: rootType,
});
*/

module.exports = {
  resolver: resolver,
  rootType: rootType
};
