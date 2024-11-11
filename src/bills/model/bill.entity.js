export class Bill {
    constructor({id = '', name = '', ruc = '', type = '', num = '', emission_date = '', expiration_date = '', status = '', amount = 0}) {
        this.id = id;
        this.name = name;
        this.ruc = ruc;
        this.type = type;
        this.num = num;
        this.emission_date = emission_date;
        this.expiration_date = expiration_date;
        this.status = status;
        this.amount = amount;
    }

}