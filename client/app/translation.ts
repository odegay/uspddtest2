export class LanguageEntity {
    id;
    langid;
    transquestion;
    transanswers;
    constructor(data) {
        if (data) {
            this.id = data.id;
            this.langid = data.langid;
            this.transquestion = data.transquestion;
            this.transanswers = data.transanswers;
        } else {
            this.id = '';
            this.langid = '';
            this.transquestion = '';
            this.transanswers = [];
        }
    }
}

export class Translation {
    sysId;
    id;
    qId;
    updateDate;
    originalquestion;
    originalanswers;
    translations;
    constructor(data) {
        if (data) {
            this.sysId = data._id;
            this.id = data.id;
            this.qId = data.qId;
            this.originalquestion = data.originalquestion;
            this.originalanswers = data.originalanswers;
            this.translations = data.translations;
        } else {
            this.sysId = '';
            this.id = '';
            this.qId = '';
            this.originalquestion = '';
            this.originalanswers = [];
            this.translations = [];
        }
    }
}

