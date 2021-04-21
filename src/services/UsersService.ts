import { getCustomRepository, Repository } from "typeorm";
import { User } from "../entities/User";
import { UsersRepository } from "../repositories/UsersRepository";

interface IUsersCreateDTO{
  username: string;
  email: string;
}

class UsersService {
  private usersRepository: Repository<User>

  constructor(){
    this.usersRepository = getCustomRepository(UsersRepository);
  }

  async create({username, email}: IUsersCreateDTO){

    const userAlreadyExists = await this.usersRepository.findOne({
      email
    })

    if(userAlreadyExists){
      return userAlreadyExists
    }

    const user = this.usersRepository.create({
      username, email
    })
    
    await this.usersRepository.save(user);

    return user;

  }
}

export { UsersService }