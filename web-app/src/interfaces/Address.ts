export interface AddressInterface {
  properties: {
    label: string;
    name: string;
    city: string;
  };
  geometry: {
    coordinates: number[];
  };
}
