export class User {
    constructor({
                    id = '',
                    username='',
                    phone = '',
                    email = '',
                    password = ''}={}) {
        this.id = id;
        this.username = username;
        this.phone = phone;
        this.email = email;
        this.password = password;
    }
}