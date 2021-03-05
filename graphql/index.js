require('dotenv').config();

const { ApolloServer, gql } = require('apollo-server-azure-functions');

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Query {
    version: String
    books: [Book]
    sneakers: [Sneaker]
    brands: [String]
  }

   type Book {
    title: String
    author: String
  }

  type Sneaker {
    id: Int
    brand: String
    image: String
    model: String
    purchaseDate: String
  }

`;

const books = [
  {
    title: 'The Awakening',
    author: 'Kate Chopin',
  },
  {
    title: 'City of Glass',
    author: 'Paul Auster',
  },
];


const sneakers = [{
    id: 1,
    brand: 'Skechers',
    model: 'Basura',
    image: 'https://sneakersimages.blob.core.windows.net/sneakers/IMG-4907.jpg',
    purchaseDate: '2020-12-25T00:00:00'
  },  {
    id: 2,
    brand: 'Timberland',
    model: 'Boots',
    image: 'https://sneakersimages.blob.core.windows.net/sneakers/3EB6F1D7-D136-4615-91E2-F5E6C684C27D.JPG',
    purchaseDate: '2020-12-26T00:00:00'
  },  {
    id: 3,
    brand: 'Adidas',
    model: 'Pro Fi',
    image: 'https://sneakersimages.blob.core.windows.net/sneakers/3EB6F1D7-D136-4615-91E2-F5E6C684C27D.JPG',
    purchaseDate: '2020-12-26T00:00:00'
  },
  ,  {
    id: 4,
    brand: 'Nike',
    model: 'BW/97',
    image: 'https://sneakersimages.blob.core.windows.net/sneakers/3EB6F1D7-D136-4615-91E2-F5E6C684C27D.JPG',
    purchaseDate: '2020-12-27T00:00:00'
  },
];


// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    version: () => process.env.SiteVersion,
    books: () => books,
    sneakers: () => sneakers,
    brands: () => {
      let unique = [...new Set(sneakers.map(item => item.brand))];
      return unique;
    }
  },
};

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

const server = new ApolloServer({ typeDefs, resolvers });

exports.graphqlHandler = server.createHandler();