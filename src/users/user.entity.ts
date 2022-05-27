import { Entity, Column, PrimaryGeneratedColumn, AfterInsert, AfterUpdate, AfterRemove} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @AfterInsert()
  afterInsert() {
    console.log(`Inserted user with id: ${this.id}`);
  }

  @AfterUpdate()
  afterUpdate() {
    console.log(`Updated user with id: ${this.id}`);
  }

  @AfterRemove()
  afterRemove() {
    console.log(`Removed user with id: ${this.id}`);
  }
}