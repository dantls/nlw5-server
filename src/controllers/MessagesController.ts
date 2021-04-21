
import {Request, Response} from 'express';
import { MessagesService } from '../services/MessagesService';

class MessagesController {
  async create(request: Request,response: Response): Promise<Response>{
    const {user_id, admin_id, text} = request.body;

    const messagesService = new MessagesService();

    try {
      const message = await messagesService.create({user_id, admin_id, text});
      return response.json(message);
    }catch (err){
      return response.status(400).json({message: err.message})
    }
  }

  async showByUser(request: Request,response: Response): Promise<Response>{

    const { id } = request.params;

    const messagesService = new MessagesService();

    try {
      const list = await messagesService.listByUser(id)

      return response.json(list);
    }catch(err){
      return response.status(400).json({message: err.message})

    }
  }
}

export {MessagesController}