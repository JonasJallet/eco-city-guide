import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  In,
  JoinColumn,
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
import City from "./city";
import { getCache } from "../cache";

@Entity()
@ObjectType()
@Unique("custom_unique_place", ["name", "coordinates"])
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

  @Column({
    type: "geometry",
    spatialFeatureType: "Point",
  })
  @Field((type) => GeoJSONPoint)
  coordinates!: Geometry;

  @ManyToOne(() => City, (city) => city.places, {
    nullable: true,
    eager: true,
  })
  @JoinColumn({ name: "city" })
  @Field(() => City, { nullable: false })
  city!: City;

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
  usersWithFavorite!: User[];

  constructor(place?: CreatePlace) {
    super();

    if (place) {
      if (!place.name) {
        throw new Error("Le nom du lieu ne peut pas être vide.");
      }
      this.name = place.name;

      if (!place.description) {
        throw new Error("La description du lieu ne peut pas être vide.");
      }
      this.description = place.description;

      if (!place.coordinates) {
        throw new Error("Les coordonnées du lieu ne peuvent pas être vides.");
      }
      this.coordinates = place.coordinates;

      if (!place.address) {
        throw new Error("L'adresse du lieu ne peut pas être vide.");
      }
      this.address = place.address;
    }
  }

  static async saveNewPlace(placeData: CreatePlace): Promise<Place> {
    const newPlace = new Place(placeData);

    if (placeData.categoryIds.length === 0) {
      throw new Error("Vous devez sélectionner au moins une catégorie.");
    }

    newPlace.categories = await Promise.all(
      placeData.categoryIds.map(Category.getCategoryById),
    );

    if (placeData.ownerId) {
      newPlace.owner = await User.getUserById(placeData.ownerId);
    }

    let city = await City.getCityByName(placeData.city);

    if (!city) {
      city = await City.saveNewCity(placeData.city);
    }

    newPlace.city = city;

    return await newPlace.save();
  }

  static async getPlaces(
    city?: string,
    categoryIds?: string[],
  ): Promise<Place[]> {
    const cache = await getCache();
    const cacheKey = "get-all-places";

    const cachedResult = await cache.get(cacheKey);
    if (cachedResult) {
      return JSON.parse(cachedResult);
    }
    let whereClause: any = {};

    if (categoryIds && categoryIds.length > 0) {
      whereClause.categories = { id: In(categoryIds) };
    }

    if (city) {
      whereClause.city = { name: city };
    }

    const databaseResult = await Place.find({
      where: whereClause,
    });

    cache.set(cacheKey, JSON.stringify(databaseResult), { EX: 1800 });
    return databaseResult;
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
    await Place.deleteCache();
    return place;
  }

  static async updatePlace(
    id: string,
    partialPlace: UpdatePlace,
  ): Promise<Place> {
    const place = await Place.getPlaceById(id);
    Object.assign(place, partialPlace);

    if (partialPlace.categoryIds) {
      place.categories = await Promise.all(
        partialPlace.categoryIds.map(Category.getCategoryById),
      );
    }

    await place.save();
    await place.reload();
    await Place.deleteCache();
    return place;
  }

  static async deleteCache() {
    const cache = await getCache();
    await cache.del("get-all-places");
  }
}

export default Place;
