import { UserRepository } from "../../ports/repositories/UserRepository";
import { User } from "../../../domain/entities/User";
import { createUserDTO } from "../../dto/userDto/CreateUserDTO";
export class CreateUser {
    constructor(private userRepository: UserRepository) {}

    async execute(input :createUserDTO): Promise<void> {
        const user = new User(
            null, 
            input.name, 
            input.email
        );
        await this.userRepository.create(user);
    }
}