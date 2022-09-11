import User from '../infra/typeorm/entities/User';
import IFindAllUsersDTO from '../dtos/IFindAllUsers';
import ICreateUserDTO from '../dtos/ICreateUsersDTO';

export default interface IUsersRepository {
  findAllUsers(data: IFindAllUsersDTO): Promise<User[]>;
  findById(id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  create(data: ICreateUserDTO): Promise<User>;
  save(user: User): Promise<User>;
}
