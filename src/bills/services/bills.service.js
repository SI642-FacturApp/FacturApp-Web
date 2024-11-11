export class BillsService {
    resourceEndpoint = '/bills';

    getAll() {
        return http.get(this.resourceEndpoint);
    }

    getById(id) {
        return http.get(`${this.resourceEndpoint}/${id}`);
    }

    create(bill) {
        return http.post(this.resourceEndpoint, bill);
    }

    update(id, bill) {
        return http.put(`${this.resourceEndpoint}/${id}`, bill);
    }

    delete(id) {
        return http.delete(`${this.resourceEndpoint}/${id}`);
    }

    findByName(name) {
        return http.get(`${this.resourceEndpoint}?name=${name}`);
    }
}