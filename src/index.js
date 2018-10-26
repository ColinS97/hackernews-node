const { GraphQLServer } = require('graphql-yoga')
const { find, findIndex } = require('lodash')

//data is stored in links variable
let links = [{
    id: 'link-0',
    url:'www.howtographql.com',
    description:'Fullstack tutorial for GraphQL'
},{
    id: 'link-1',
    url:'www.howtographql.de',
    description:'dummy'
}]

let idCount = links.length
const resolvers = {
    Query: {
        // cannot put null here graphql-js implementation prevents this mistake because String! forces some input!=null
        info: () => `This is the API of a Hackernew Clone`,
        //calling feed resolves to links
        feed: () => links,
        link: (root, args) => find(links, {id: args.id}),
    },

    Mutation: {
        post: (root, args) => {
            const link = {
                id: `link-${idCount++}`,
                description: args.description,
                url: args.url
            }
            links.push(link)
            return link
        },

        deleteLink: (root, args) => {
            const linkIndex = findIndex(links, {id: args.id})
            //console.log(linkIndex)
            const link = find(links, {id: args.id})
            //console.log(link.id)
            if (linkIndex > -1){
            links.splice(linkIndex, 1)
            return link
            } else {return `Id not found in DB`}
            //error case does not really work yet
        },

        updateLink: (root, args) => {
            const link = find(links, {id: args.id})
            const linkIndex = findIndex(links, {id: args.id})
            link.description = args.description
            link.url = args.url
            links[linkIndex]=link
            return link
        }
    }
    //resolving link is trivial so it can be commented out
    //Link: {
    //    id: (root) => root.id,
    //    description: (root) => root.description,
    //    url: (root) => root.url,
    //}

}


const server = new GraphQLServer({
    typeDefs:'./src/schema.graphql',
    resolvers,
})
server.start(() =>  console.log(`Server is running on http://localhost:4000`))