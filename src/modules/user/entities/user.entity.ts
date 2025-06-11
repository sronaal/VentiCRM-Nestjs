import { BeforeInsert, Column, Entity, PrimaryColumn } from 'typeorm';
import * as bcrypy from 'bcrypt'
@Entity()
export class User {

    @PrimaryColumn()
    id: string

    @Column()
    name: string

    @Column()
    email: string

    @Column()
    password: string

    @Column({default: 'customer'})
    role: string

    @BeforeInsert()
    async hashPassword(){
        let hashPassword = await bcrypy.hash(this.password, 10)
        this.password = hashPassword 
    }


}
