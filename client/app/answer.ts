export class Answer {

    sysId;
    id;
    answer;

    constructor(data) {
        if (data) {
            this.sysId = data._id;
            this.id = data.id;
            this.answer = data.answer;
        } else {
            this.sysId = '';
            this.id = '';
            this.answer = '';
        }
    }
}