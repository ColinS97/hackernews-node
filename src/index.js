const { GraphQLServer } = require('graphql-yoga')

//1
const typeDefs = `
type Query {
    info: String!
    feed: [Link!]!
}

type Link {
    id: ID!
    description: String!
    url: String!
}
`
let links = [{
    id: 'link-0',
    url:'www.howtographql.com',
    description:'Fullstack tutorial for GraphQL'
}]

//2
const resolvers = {
    Query: {
        // cannot put null here graphql-js implementation prevents this mistake because String! forces some input!=null
        info: () => `This is the API of a Hackernew Clone`
    }
}

//3
const server = new GraphQLServer({
    typeDefs,
    resolvers,
})
server.start(() =>  console.log(`Server is running on http://localhost:4000`))