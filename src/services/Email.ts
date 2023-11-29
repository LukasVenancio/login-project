const brevo = require('@getbrevo/brevo');

type EmailReceiver = {
    name: string;
    email: string;
}

export class EmailService {

    private defaultClient = brevo.ApiClient.instance;
    private apiKey = this.defaultClient.authentications['api-key'];
    private apiInstance = new brevo.TransactionalEmailsApi();
    private sendSmtpEmail = new brevo.SendSmtpEmail();

    constructor(){
        this.apiKey.apiKey = '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'
    }

    public send = (receiver: EmailReceiver, redirectUrl: string, message: string) => {
        this.sendSmtpEmail.subject = message;
        this.sendSmtpEmail.htmlContent = `<html><body><h1>${message}</h1><br><p>${redirectUrl}</p></body></html>`;
        this.sendSmtpEmail.sender = { "name": "John", "email": "example@example.com" };
        this.sendSmtpEmail.to = [receiver];
        this.sendSmtpEmail.replyTo = { "email": "example@brevo.com", "name": "sample-name" };
        this.sendSmtpEmail.headers = { "Some-Custom-Name": "unique-id-1234" };
        // this.sendSmtpEmail.params = { "parameter": "My param value", "subject": "common subject" };


        this.apiInstance.sendTransacEmail(this.sendSmtpEmail).then(function (data: any) {
            console.log('API called successfully. Returned data: ' + JSON.stringify(data));
        }, function (error: any) {
            console.error(error);
        });
    }

}
















// const SibApiV3Sdk = require('sib-api-v3-typescript');

// type EmailReceiver={
//     name: string;
//     email: string;
// }


// export class EmailService {
//     private apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
//     private apiKey = this.apiInstance.authentications['apiKey'];
//     private sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

//     constructor() {
//         this.apiKey.apiKey = "I8xCPtVvBJUny53a"
//     }

//     public send = (receiver: EmailReceiver, redirectUrl: string) => {
//         this.sendSmtpEmail.subject = "My {{params.subject}}";
//         this.sendSmtpEmail.htmlContent = `<html><body><h1>This is my first transactional email ${redirectUrl}</h1></body></html>`;
//         this.sendSmtpEmail.sender = { "name": "John Doe", "email": "example@example.com" };
//         this.sendSmtpEmail.to = [receiver];
//         // this.sendSmtpEmail.cc = [{ "email": "example2@example2.com", "name": "Janice Doe" }];
//         // this.sendSmtpEmail.bcc = [{ "name": "John Doe", "email": "example@example.com" }];
//         // this.sendSmtpEmail.replyTo = { "email": "replyto@domain.com", "name": "John Doe" };
//         // this.sendSmtpEmail.headers = { "Some-Custom-Name": "unique-id-1234" };
//         // this.sendSmtpEmail.params = { "parameter": "My param value", "subject": "New Subject" };

//         console.log(this.apiKey)
//         console.log('-=-=-=-=-=-=-=-=-=-=-=-=-=-=-', this.sendSmtpEmail)

//         this.apiInstance.sendTransacEmail(this.sendSmtpEmail).then(function (data: any) {
//             console.log('API called successfully. Returned data: ' + JSON.stringify(data));
//         }, function (error: Error) {
//             console.error(error);
//         });
//     }
// }