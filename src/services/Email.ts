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

    public send = (receiver: EmailReceiver, redirectUrl: string, message: string) => {
        this.apiKey.apiKey = process.env.EMAIL_API_KEY;
        
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