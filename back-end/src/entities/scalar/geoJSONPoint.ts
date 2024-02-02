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
    console.log('serialize');
    return value;
  },

  parseLiteral(ast: ValueNode) {
    console.log('parseLiteral');

    const geometryData = {
      type: 'Point',
      coordinates: ast,
    };

    return geometryData;
  },
});