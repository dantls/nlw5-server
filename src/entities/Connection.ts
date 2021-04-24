import {Column, Entity, JoinColumn, ManyToOne, PrimaryColumn} from 'typeorm';
import {v4 as uuid} from 'uuid'
import { User } from './User';

@Entity('connections')
class Connection {
    @PrimaryColumn()
    id: string;
    
    @Column()
    admin_id: string;

    @JoinColumn({name: "user_id"})
    @ManyToOne(()=>User)
    user: User;

    @Column()
    user_id: string;
 
    @Column()
    socket_id: string;

    constructor(){
      if(!this.id){
        this.id = uuid();
      }
    }
}

export {Connection}