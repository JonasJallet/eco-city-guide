import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  In,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from "typeorm";
import { Geometry } from "geojson";
import { ObjectType, Field, ID } from "type-graphql";
import { CreatePlace, UpdatePlace } from "../types/place.args";
import { GeoJSONPoint } from "../types/scalar/geoJSONPoint";
import Category from "./category";
import User from "./user";

@Entity()
@ObjectType()
@Unique("custom_unique_constraint", ["name", "coordinates"])
class Place extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  @Field(() => ID)
  id!: string;

  @CreateDateColumn()
  @Field()
  createdAt!: Date;

  @Column()
  @Field()
  name!: string;

  @Column()
  @Field()
  description!: string;

  @Column()
  @Field()
  address!: string;

  @Column()
  @Field()
  city!: string;

  @Column({
    type: "geometry",
    spatialFeatureType: "Point",
  })
  @Field((type) => GeoJSONPoint)
  coordinates!: Geometry;

  @ManyToOne(() => User, (user) => user.ownedPlaces, {
    nullable: true,
  })
  @Field(() => User, { nullable: true })
  owner!: User | null;

  @JoinTable({ name: "CategoriesForPlaces" })
  @ManyToMany(() => Category, (category) => category.places, { eager: true })
  @Field(() => [Category])
  categories!: Category[];

  @ManyToMany(() => User, (user) => user.favoritesPlaces)
  users!: User[];

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

      if (!place.address) {
        throw new Error("Place address cannot be empty.");
      }
      this.address = place.address;

      if (!place.city) {
        throw new Error("Place city cannot be empty.");
      }
      this.city = place.city;
    }
  }

  static async saveNewPlace(placeData: CreatePlace): Promise<Place> {
    const newPlace = new Place(placeData);

    if (placeData.categoryIds.length === 0) {
      throw new Error("Vous devez sélectionner au moins une catégorie.");
    }

    newPlace.categories = await Promise.all(
      placeData.categoryIds.map(Category.getCategoryById)
    );

    if (placeData.ownerId) {
      newPlace.owner = await User.getUserById(placeData.ownerId);
    }

    return await newPlace.save();
  }

  static async getPlaces(
    city?: string,
    categoryIds?: string[]
  ): Promise<Place[]> {
    let whereClause: any = {};

    if (categoryIds && categoryIds.length > 0) {
      whereClause.categories = { id: In(categoryIds) };
    }

    if (city) {
      whereClause.city = city;
    }

    return await Place.find({
      where: whereClause,
    });
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
    await place.reload();
    return place;
  }
}

export default Place;
