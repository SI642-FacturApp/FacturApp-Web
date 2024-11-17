import http from "../../shared/services/http-common.js";

export class UserService {
    resourceEndpoint = '/users';

    create(userResource) {
        return http.post(this.resourceEndpoint, userResource);
    }

    getByEmail(email) {
        const encodedEmail = encodeURIComponent(email);
        return http.get(`${this.resourceEndpoint}?email=${encodedEmail}`);
    }
}