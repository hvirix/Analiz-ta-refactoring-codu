export class User {
    constructor(name, email) { this.name = name; this.email = email; }
    getRole() { throw new Error("Abstract method"); }
}

export class Customer extends User {
    constructor(name, email, address) { super(name, email); this.address = address; }
    getRole() { return "Customer"; }
}

export class Admin extends User {
    constructor(name, email, level) { super(name, email); this.level = level; }
    getRole() { return "Admin"; }
}

export class UserFactory {
    static createUser(type, name, email, extraData) {
        if (type === 'Customer') return new Customer(name, email, extraData);
        if (type === 'Admin') return new Admin(name, email, extraData);
        throw new Error('Unknown user type');
    }
}