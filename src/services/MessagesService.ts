import { getCustomRepository, Repository } from "typeorm"
import { Message } from "../entities/Messages"
import { MessagesRepository } from "../repositories/MessagesRepository"

interface IMessagesCreateDTO {
  text: string;
  admin_id?: string;
  user_id:string;
}

class MessagesService {
  private messagesRepository: Repository<Message>
  constructor(){
    this.messagesRepository = getCustomRepository(MessagesRepository)
  }

  async create({text, admin_id, user_id}:IMessagesCreateDTO){
    // const messagesRepository = getCustomRepository(MessagesRepository)

    const message = this.messagesRepository.create({
      admin_id,
      user_id,
      text
    })

    await this.messagesRepository.save(message);

    return message;
  }

  async listByUser(user_id: string){
    // const messagesRepository = getCustomRepository(MessagesRepository)

    const list = await this.messagesRepository.find({
      where:{user_id},
      relations: ["user"]
    })

    return list
  }
}

export {MessagesService}