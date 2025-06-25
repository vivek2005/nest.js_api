import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';


@Injectable()
export class UsersService {

    private users = [
        {
            "id": 1,
            "name": "Vivek",
            "email": "vivek@gmail.com",
            "role": "ADMIN"
        },
        {
            "id": 2,
            "name": "Vishal",
            "email": "vishal@gmail.com",
            "role": "INTERN"
        },
    ]

    findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN'){
        if(role){
            const rolesArray = this.users.filter(user => user.role === role)
            if(rolesArray.length == 0) throw new NotFoundException('Users not found!')
                return rolesArray
        }
        return this.users
    }

    findOne(id: number){
        const user = this.users.find(user => user.id === id)
        if(!user) throw new NotFoundException('User not found!')
        return user
    }

    create(createUserDto: CreateUserDto){
        const id = new Date().getTime()
        const newUser = {
            id: id,
            ...createUserDto
        }

        this.users.push(newUser)
        return newUser
    }
    
    update(id: number, updateUserDto: UpdateUserDto){
        this.users = this.users.map(user => {
            if(user.id === id){
                return {...user, ...updateUserDto}
            }
            return user
        })
        return this.findOne(id)
    }

    delete(id: number){
        const removedUser = this.findOne(id)
        this.users = this.users.filter(user => user.id !== id)
        return removedUser
    }

}
