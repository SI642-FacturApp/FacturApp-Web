/**
 * Sign up request model.
 * @summary
 * This model is used to create a new user.
 */
export class SignUpRequest {
    /**
     * Constructor.
     * @param username The username.
     * @param phone The phone number
     * @param email The email address
     * @param password The password.
     */
    constructor(username, phone, email, password) {
        this.username = username;
        this.phone = phone;
        this.email = email;
        this.password = password;
    }
}