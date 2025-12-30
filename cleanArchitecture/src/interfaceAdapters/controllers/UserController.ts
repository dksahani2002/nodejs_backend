import { Request,Response } from "express";
import { CreateUser } from "../../application/usecases/UserUsecase/CreateUser";
import { UpdateUser } from "../../application/usecases/UserUsecase/UpdateUser";
import { DeleteUser } from "../../application/usecases/UserUsecase/DeleteUser";
import { createUserDTO } from "../../application/dto/userDto/CreateUserDTO";
export class UserController {
    constructor(
        private createUser: CreateUser,
        private updateUser: UpdateUser,
        private deleteUser: DeleteUser
    ) {}    
    create = async (req: Request, res: Response): Promise<void> => {
        const { name, email } = req.body;
        const userInput: createUserDTO = {
            name,
            email
        };
        await this.createUser.execute( userInput);
        res.status(201).send({ message: "User created successfully" });
    };

    update = async (req: Request, res: Response): Promise<void> => {
        const { id } = req.params;
        const { name, email } = req.body;
        await this.updateUser.execute(id, name, email);
        res.status(200).send({ message: "User updated successfully" });
    };

    delete = async (req: Request, res: Response): Promise<void> => {
        const { id } = req.params;
        await this.deleteUser.execute(id);
        res.status(200).send({ message: "User deleted successfully" });
    };
}