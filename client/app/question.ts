export class Question {

    sysId;
    id;
    question;
    rightanswer;
    answers;
    userAnswerId;
    isSubmitted;
    translation;

    constructor(data) {
        if (data) {
            this.sysId = data._id;
            this.id = data.id;
            this.question = data.question;
            this.rightanswer = data.rightanswer;
            this.answers = data.answers;
            this.userAnswerId = 0;
            this.isSubmitted = false;
            this.translation = data.translation;
        } else {
            this.sysId = '';
            this.id = '';
            this.question = '';
            this.rightanswer = 0;
            this.answers = [];
            this.userAnswerId = 0;
            this.isSubmitted = false;
        }
    }

    isRightAnswer() {
        // FIX POTENTIAL ISSUE
        return (this.userAnswerId == this.rightanswer);
    }

}
