import { MongoUserRepository } from '../../infrastructure/db/repositories/MongoUserRepository';
import { CreateUser } from '../../application/usecases/UserUsecase/CreateUser';
import { UpdateUser } from '../../application/usecases/UserUsecase/UpdateUser';
import { DeleteUser } from '../../application/usecases/UserUsecase/DeleteUser';
import { UserController } from '../../interfaceAdapters/controllers/UserController';

export function makeUserController(): UserController {
    const userRepo = new MongoUserRepository();
    const createUser = new CreateUser(userRepo);
    const updateUser = new UpdateUser(userRepo);
    const deleteUser = new DeleteUser(userRepo);
    return new UserController(createUser, updateUser, deleteUser);
}