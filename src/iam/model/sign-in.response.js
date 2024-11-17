/**
 * Sign in response model
 * @summary
 * This model is used to create a sign in response object
 */
export class SignInResponse {
    /**
     * Constructor
     * @param id The user id
     * @param username The username
     * @param phone The phone number
     * @param email The email address
     * @param password The password
     */
    constructor(id, username, phone, email, password) {
        this.id = id;
        this.username = username;
        this.phone = phone;
        this.email = email;
        this.password = password;
    }
}