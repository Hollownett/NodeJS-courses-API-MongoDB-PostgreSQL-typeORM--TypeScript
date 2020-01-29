import {Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class MyBook {
    @PrimaryGeneratedColumn()
    id: number ;

    @Column({
        type: 'text',
      
    })
    title: string;
    
    @Column({
        type: 'text',
       
    })
    author: string
    }
