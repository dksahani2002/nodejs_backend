import { UserRepository } from "../../ports/repositories/UserRepository";

export class UpdateUser{
    constructor(private userRepository: UserRepository) {}

    async execute(id: string, name?: string, email?: string): Promise<void> {
        const user = await this.userRepository.findById(id);
        if (!user) {
            throw new Error("User not found");
        }
        user.update(name, email);
        await this.userRepository.update(user);
    }
}