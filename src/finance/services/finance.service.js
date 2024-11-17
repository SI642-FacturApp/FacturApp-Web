import http from "../../shared/services/http-common.js";

export class FinanceService {
    resourceEndpoint = '/banks';

    getAll() {
        return http.get(this.resourceEndpoint);
    }

    getById(id) {
        return http.get(`${this.resourceEndpoint}/${id}`);
    }

    create(finance) {
        return http.post(this.resourceEndpoint, finance);
    }

    update(id, finance) {
        return http.put(`${this.resourceEndpoint}/${id}`, finance);
    }

    delete(id) {
        return http.delete(`${this.resourceEndpoint}/${id}`);
    }

    findByName(name) {
        return http.get(`${this.resourceEndpoint}?name=${name}`);
    }
}