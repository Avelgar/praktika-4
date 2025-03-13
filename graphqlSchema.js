const { GraphQLObjectType, GraphQLSchema, GraphQLString, GraphQLFloat, GraphQLList } = require('graphql');
const fs = require('fs');

const ProductType = new GraphQLObjectType({
    name: 'Product',
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        price: { type: GraphQLFloat },
        description: { type: GraphQLString },
        categories: { type: new GraphQLList(GraphQLString) }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        products: {
            type: new GraphQLList(ProductType),
            args: { category: { type: GraphQLString } },
            resolve(parent, args) {
                const data = fs.readFileSync('./data/products.json', 'utf8');
                const products = JSON.parse(data);
                if (args.category) {
                    return products.filter(product => product.categories.includes(args.category));
                }
                return products;
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});
