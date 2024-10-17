export class PostObj {
    id: number;
    body: string;
    first_created: string;
    last_updated: string;

    // TODO: default constructor
    constructor(id: number=0, body: string='', first_created: string='', last_updated: string='') {
        this.id = id;
        this.body = body;
        this.first_created = first_created;
        this.last_updated = last_updated;
    }
}

