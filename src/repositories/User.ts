import { AppDataSource } from "../data-source";
import { User } from "../entities/User";

export class UserRepository {
   private ormRepository = AppDataSource.getRepository(User)

   public save = async (user: User) => {
    return await this.ormRepository.save(user);
   }

   public findUserByEmail = async(email: string): Promise<User | null> => {
    return await this.ormRepository.findOneBy({email: email})
   }

   public update = async (user: User) => {
      return await this.ormRepository.update(user.id, user)
   }
}