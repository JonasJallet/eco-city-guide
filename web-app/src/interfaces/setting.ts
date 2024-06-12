import { Category, Place } from "@/gql/graphql";
export interface updateUserArgs {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  updateUserId: string;
}

export type coordinates = [number, number];

export interface favori {
  id: string;
  name: string;
  address: string;
  coordinates: { type: "Point"; coordinates: coordinates };
  createdAt: Date;
  description: string;

  city: {
    id: string;
    name: string;
    coordinates: { type: "Point"; coordinates: coordinates };
  };
  categories: Category[];
  owner: {
    type: "User";
    id: string;
    createdAt: Date;
    firstName: string;
    lastName: string;
    userInitials: string;
    role: string;
    email: string;
    hashedPassword: string;
    favoritesPlaces: Place[];
  };
}
