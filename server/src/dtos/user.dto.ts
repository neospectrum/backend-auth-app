// User Data Transfer Object
export class UserDto {
    email: string;
    id: string;
    isActivated: boolean;
    role: string;

    constructor(model: any) {
        this.email = model.email;
        this.id = model._id;
        this.isActivated = model.isActivated;
        this.role = model.role;
    }
}
