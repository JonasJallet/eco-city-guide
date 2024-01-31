import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    JoinTable,
    ManyToMany,
    ManyToOne,
    MultiPoint,
    OneToMany,
    Point,
    PrimaryGeneratedColumn,
  } from "typeorm";
  import { ObjectType, Field, ID, Float } from "type-graphql";
  
//   import Category from "./category";
  import { CreateOrUpdatePlace } from "./place.args";
    
  // import Note from "./note";
  
  
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
    
    // @ManyToOne(() => User, (user) => user.Places, { eager: true })
    // @Field()
    // owner!: User;

    // @JoinTable({ name: "CategoryForPlaces" })
    // @ManyToMany(() => Category, (category) => category.places, { eager: true })
    // @Field(() => [Category])
    // categories!: Category[];
  
    @Column()
    @Field(() => [Float])
    point!: Point[];

    // @Column()
    // @Field(() => Float)
    // coordinates2!: MultiPoint;
    
    // @OneToMany(() => Note, (note) => note.place)
    // @Field(() => [Note])
    // notes!: Note[];

    // @Column({ default: "" })
    // @Field()
    // picture!: string;
  
    @CreateDateColumn()
    @Field()
    createdAt!: Date;
  
  
    constructor(place?: CreateOrUpdatePlace) {
      super();
  
      if (place) {
        this.name = place.name;
        this.description = place.description;
        // this.categories = place.categoryIds;
        this.point = place.point;
        // this.notes = place.notes;
      }
    }
  
    // static async saveNewPlace(placeData: CreateOrUpdatePlace): Promise<Place> {
    //   const newPlace = new Place(PlaceData);
    //   if (PlaceData.categoryId) {
    //     const category = await Category.getCategoryById(PlaceData.categoryId);
    //     newPlace.category = category;
    //   }
//       if (PlaceData.tagIds) {
//         // Promise.all will call each function in array passed as argument and resolve when all are resolved
//         newPlace.tags = await Promise.all(PlaceData.tagIds.map(Tag.getTagById));
//       }
//       const savedPlace = await newPlace.save();
//       console.log(`New Place saved: ${savedPlace.getStringRepresentation()}.`);
//       return savedPlace;
//     }
  
//     static async getPlaces(categoryId?: number): Promise<Place[]> {
//       const Places = await Place.find({
//         where: { category: { id: categoryId } },
//         order: { createdAt: "DESC" },
//       });
//       return Places;
//     }
  
//     static async getPlaceById(id: string): Promise<Place> {
//       const Place = await Place.findOne({
//         where: { id },
//       });
//       if (!Place) {
//         throw new Error(`Place with ID ${id} does not exist.`);
//       }
//       return Place;
//     }
  
//     static async deletePlace(id: string): Promise<Place> {
//       const Place = await Place.getPlaceById(id);
//       await Place.delete(id);
//       return Place;
//     }
  
//     static async updatePlace(id: string, partialPlace: CreateOrUpdatePlace): Promise<Place> {
//       const Place = await Place.getPlaceById(id);
//       Object.assign(Place, partialPlace);
  
//       if (partialPlace.categoryId) {
//         Place.category = await Category.getCategoryById(partialPlace.categoryId);
//       }
//       if (partialPlace.tagIds) {
//         Place.tags = await Promise.all(partialPlace.tagIds.map(Tag.getTagById));
//       }
  
//       await Place.save();
//       Place.reloPlace();
//       return Place;
//     }
  
//     getStringRepresentation(): string {
//       return `${this.id} | ${this.title} | ${this.owner} | ${this.price} €`;
//     }
  }
  
  export default Place;