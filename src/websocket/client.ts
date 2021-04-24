import { io } from '../app';

import {ConnectionsService} from '../services/ConnectionsService';
import {UsersService} from '../services/UsersService';
import {MessagesService} from '../services/MessagesService';

interface IParams {
  text: string;
  email: string;
}

io.on("connect", (socket)=>{
  

  const connectionService = new ConnectionsService();
  const messagesService = new MessagesService();
  const usersService = new UsersService();
  
  socket.on("client_first_access",async (params : IParams) =>{
    const socket_id = socket.id;
    const {email,text} = params as IParams;
    let user_id = null;

    const userExists = await usersService.findByEmail(email);

    if(!userExists){
      const user = await usersService.create({username:email, email})
      
      user_id = user.id;

      const connection = await connectionService.create({
        socket_id,
        user_id
      })
      
      

    }else {
      
      user_id = userExists.id;

      const connection = await connectionService.findByUserId(userExists.id);

      if(!connection){
        await connectionService.create({
          socket_id,
          user_id
        })
      }else{
        connection.socket_id = socket_id;

        await connectionService.create(connection)
      }
    }

    await messagesService.create({
      text,
      user_id
    });

    const allMessages = await messagesService.listByUser(user_id);

    socket.emit("client_list_all_messages", allMessages);

  })
})