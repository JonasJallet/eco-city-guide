import { GraphQLScalarType } from 'graphql';

export const GeoJSONPoint = new GraphQLScalarType({
    name: 'GeoJSONPoint',
    description: 'Geometry scalar type',
    parseValue(value) {
        return value;
    },

    serialize(value) {
        return value;
    },

    parseLiteral(ast) {
        const geometryData = {
            type: '',
            coordinates: []
        };
        return geometryData;
    }
});