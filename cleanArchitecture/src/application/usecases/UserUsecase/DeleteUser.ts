import { UserRepository } from "../../ports/repositories/UserRepository";

export class DeleteUser{
    constructor(private userRepository: UserRepository) {}

    async execute(id: string): Promise<void> {
        const user = await this.userRepository.findById(id);
        if (!user) {
            throw new Error("User not found");
        }
        user.softDelete();
        await this.userRepository.update(user);
    }
}