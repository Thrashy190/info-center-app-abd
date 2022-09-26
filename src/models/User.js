export class User {
    constructor(
        name,
        lastNameFather,
        lastNameMother,
        phone,
        email,
        gender,
        password,
    ) {
        this.name = name;
        this.lastNameFather = lastNameFather;
        this.lastNameMother = lastNameMother;
        this.phone = phone;
        this.email = email;
        this.gender = gender;
        this.password = password;
    }
    toString() {
        return this.name + ',' + this.lastNameFather + ',' + this.lastNameMother + ',' + this.phone + ',' + this.email + ',' + this.gender + ',' + this.password;
    };
}

