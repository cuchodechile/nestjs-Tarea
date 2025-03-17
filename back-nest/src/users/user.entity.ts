import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Note } from '../notes/notes.entity';
import * as bcrypt from 'bcryptjs';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Note, (notes) => notes.user)
  notes: Note[];

  async hashPassword(): Promise<void> {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
  }
}
