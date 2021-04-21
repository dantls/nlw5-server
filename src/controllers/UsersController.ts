import { Response ,Request} from "express";
import { UsersService } from "../services/UsersService";


class UsersController {
  async create(request: Request,response: Response): Promise<Response> {
    const {email, username} = request.body;

    const usersService = new UsersService();

    try {
      const user = await usersService.create({username, email});

      return response.json(user);

    }catch(err){
      return response.status(400).json({message:err.message});
    }
    
  }

}

export {UsersController};
