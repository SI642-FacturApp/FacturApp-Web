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

    getByNum(num) {
        return http.get(`${this.resourceEndpoint}/${num}`);
    }

    create(bill) {
        return http.post(this.resourceEndpoint, bill);
    }

    async updateStatus(billId, status, value, tcea) {
        try {
            // Retrieve the bill by its ID
            const response = await http.get(`${this.resourceEndpoint}/${billId}`);
            const bill = response.data;

            // Update the bill's status
            bill.status = status;
            bill.amount = value;
            bill.tcea = tcea;

            // Send the updated bill back to the server
            const updateResponse = await http.patch(`${this.resourceEndpoint}/${billId}`, bill);
            return updateResponse.data;
        } catch (error) {
            throw new Error(`Error updating bill status: ${error.message}`);
        }
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