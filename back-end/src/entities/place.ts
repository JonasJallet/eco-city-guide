import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Geometry } from "geojson";
import { ObjectType, Field, ID } from "type-graphql";
import { CreatePlace, UpdatePlace } from "../types/place.args";
import { GeoJSONPoint } from "../types/scalar/geoJSONPoint";
import Category from "./category";
import User from "./user";

@Entity()
@ObjectType()
class Place extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  @Field(() => ID)
  id!: string;

  @Column()
  @Field()
  name!: string;

  @Column()
  @Field()
  description!: string;

  @Column({
    type: "geometry",
    spatialFeatureType: "Point",
  })
  @Field((type) => GeoJSONPoint)
  coordinates!: Geometry;

  @ManyToOne(() => User, (user) => user.places, { eager: true })
  @Field(() => User)
  owner!: User;

  @JoinTable({ name: "CategoriesForPlaces" })
  @ManyToMany(() => Category, (category) => category.places, { eager: true })
  @Field(() => [Category])
  categories!: Category[];

  @CreateDateColumn()
  @Field()
  createdAt!: Date;

  constructor(place?: CreatePlace) {
    super();

    if (place) {
      if (!place.name) {
        throw new Error("Place name cannot be empty.");
      }
      this.name = place.name;

      if (!place.description) {
        throw new Error("Place description cannot be empty.");
      }
      this.description = place.description;

      if (!place.coordinates) {
        throw new Error("Place coordinates cannot be empty.");
      }
      this.coordinates = place.coordinates;
    }
  }

  static async saveNewPlace(placeData: CreatePlace): Promise<Place> {
    const newPlace = new Place(placeData);

    if (placeData.categoryIds) {
      newPlace.categories = await Promise.all(
        placeData.categoryIds.map(Category.getCategoryById)
      );
    }

    const savedPlace = await newPlace.save();
    console.log(`New Place saved: ${savedPlace.getStringRepresentation()}.`);
    return savedPlace;
  }

  static async getPlaces(categoryIds?: string[]): Promise<Place[]> {
    let places: any = [];
    if (categoryIds) {
      places = await Promise.all(
        categoryIds.map((categoryId: string) =>
          Place.find({
            where: { categories: { id: categoryId } },
          })
        )
      );
    }
    return places;
  }

  static async getPlaceById(id: string): Promise<Place> {
    const place = await Place.findOneBy({ id });
    if (!place) {
      throw new Error(`Place with ID ${id} does not exist.`);
    }
    return place;
  }

  static async deletePlace(id: string): Promise<Place> {
    const place = await Place.getPlaceById(id);
    await Place.delete(id);
    return place;
  }

  static async updatePlace(
    id: string,
    partialPlace: UpdatePlace
  ): Promise<Place> {
    const place = await Place.getPlaceById(id);
    Object.assign(place, partialPlace);

    if (partialPlace.categoryIds) {
      place.categories = await Promise.all(
        partialPlace.categoryIds.map(Category.getCategoryById)
      );
    }

    await place.save();
    place.reload();
    return place;
  }

  getStringRepresentation(): string {
    return `${this.id} | ${this.name} | ${this.description} | ${this.coordinates}`;
  }
}

export default Place;
