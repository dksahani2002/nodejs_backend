import { UserModel } from "../model/UserModel";
import { User } from "../../../domain/entities/User";
import { UserRepository } from "../../../application/ports/repositories/UserRepository";

export class MongoUserRepository implements UserRepository {
    async create(user: User): Promise<void> {
       const doc = await UserModel.create({
        name: user.name,
        email: user.email,
        createdAt: user.getCreatedAt(),
        deletedAt: user.getDeletedAt()
        });
        user.setId(doc._id.toString());
    }

    async findById(id: string): Promise<User | null> {
        const userDoc = await UserModel.findOne({ _id: id, deletedAt: null }).exec();
        if (!userDoc) {
            return null;
        }
        return new User(userDoc.id, userDoc.name, userDoc.email, userDoc.createdAt, userDoc.deletedAt);
    }

    async update(user: User): Promise<void> {
        await UserModel.updateOne(
            { _id: user.id },
            { name: user.name, email: user.email, createdAt: user.getCreatedAt(), deletedAt: user.getDeletedAt() }
        );
    }
}