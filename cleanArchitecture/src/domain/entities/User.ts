export class User {
    constructor(
        public  id: string | null,
        public name: string,
        public email: string,
        private createdAt: Date = new Date( ),
        private deletedAt: Date | null = null
    ) {}
    update(name?: string, email?: string){
        if( this.isDeleted() ){
            throw new Error("Cannot update a deleted user");
        }
        if (name !== undefined) this.name = name;
        if (email !== undefined) this.email = email;
    }
    softDelete() {
        if( this.isDeleted() ){
            throw new Error("User is already deleted");
        }
        this.deletedAt = new Date();
    }

    isDeleted(): boolean {
        return this.deletedAt !== null;
    }   
    getDeletedAt(): Date | null {
        return this.deletedAt;
    }   
    getCreatedAt(): Date {
        return this.createdAt;
    }
    setId(id: string) {
    if (this.id) {
        throw new Error("User ID already set");
        }
        this.id = id;
    }
} 
