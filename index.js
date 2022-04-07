import { ApolloServer, gql } from "apollo-server";

const personas = [
  {
    name: "pepe",
    job: "developer",
    phone: "656546464",
    street: "Pepe street 23",
    city: "Madrid",
  },
  {
    name: "Alberto",
    job: "payaso",
    phone: "4234234234",
    street: "Alberto chungo street 23",
    city: "Madrid",
  },
  {
    name: "Fernando",
    job: "payaso",
    phone: "6565453536464",
    street: "fer street 23",
    city: "Madrid",
  },
  {
    name: "Alfre",
    job: "developer",
    phone: "535345353",
    street: "Alfre street 23",
    city: "Madrid",
  },
  {
    name: "Mauro",
    job: "front-end",
    phone: "53543534535",
    street: "mauro street 23",
    city: "Madrid",
  },
  {
    name: "Felix",
    job: "front-end",
    phone: "8678686",
    street: "Felix street 43",
    city: "Copenaghe",
  },
];

const typeDefinitions = gql`
  type Person {
    name: String!
    job: String!
    phone: String
    street: String
    city: String
    address: String
    check: String!
  }

  type Query {
    personCount: Int!
    allPersons: [Person]!
    findPerson(name: String!): Person
  }
`;

const resolvers = {
  Query: {
    personCount: () => personas.length,
    allPersons: () => personas,
    findPerson: (root, args) => {
      const { name } = args;
      return personas.find((person) => person.name === name);
    },
  },
  Person: {
    address: (root) => `${root.street}, ${root.city}`,
    check: () => "User",
  },
};

const server = new ApolloServer({
  typeDefs: typeDefinitions,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`Server is running at: ${url}`);
});
