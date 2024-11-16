import http from "../../shared/services/http-common.js";

export class BillsService {
    resourceEndpoint = '/bills';

    getAll() {
        console.log(http.defaults.baseURL);
        console.log(this.resourceEndpoint);
        return http.get(this.resourceEndpoint);
    }

    getById(id) {
        return http.get(`${this.resourceEndpoint}/${id}`);
    }

    getByStatus(status) {
        return http.get(`${this.resourceEndpoint}/${status}`);
    }

    create(bill) {
        return http.post(this.resourceEndpoint, bill);
    }

    update(id, bill) {
        console.log(`Updating bill with ID: ${id}`); // Log the ID
        return http.put(`${this.resourceEndpoint}/${id}`, bill);
    }

    delete(id) {
        console.log(`Deleting bill with ID: ${id}`); // Log the ID
        console.log(`Request URL: ${this.resourceEndpoint}/${id}`);
        console.log(this.getById(id))
        return http.delete(`${this.resourceEndpoint}/${id}`);
    }

    findByName(name) {
        return http.get(`${this.resourceEndpoint}?name=${name}`);
    }
}