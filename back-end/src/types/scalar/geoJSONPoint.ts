import { GraphQLScalarType, ValueNode  } from 'graphql';

export const GeoJSONPoint = new GraphQLScalarType({
  name: 'Geometry',
  description: 'Geometry scalar type',
  parseValue(value) {
    const geometryData = {
      type: 'Point', 
      coordinates: value,
    };

    return geometryData;
  },

  serialize(value) {
    return value;
  },

  parseLiteral(ast: ValueNode) {

    const geometryData = {
      type: 'Point',
      coordinates: ast,
    };

    return geometryData;
  },
});