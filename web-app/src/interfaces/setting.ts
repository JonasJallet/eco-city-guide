import { Category, Place } from "@/gql/graphql";
export interface updateUserArgs {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  updateUserId: string;
}
