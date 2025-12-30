import { User } from "../../../domain/entities/User";

export interface UserRepository {
    create(user: User): Promise<void>;
    findById(id: string): Promise<User | null>;
    update( user: User): Promise<void>;
}