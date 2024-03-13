import {GraphQLScalarType, ValueNode} from 'graphql';

export const GeoJSONPoint = new GraphQLScalarType({
  name: 'Geometry',
  description: 'Geometry scalar type',
  parseValue(value) {
    return {
      type: 'Point',
      coordinates: value,
    };
  },

  serialize(value) {
    return value;
  },

  parseLiteral(ast: ValueNode) {

    return {
      type: 'Point',
      coordinates: ast,
    };
  },
});
