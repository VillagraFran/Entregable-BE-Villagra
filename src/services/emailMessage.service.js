import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'shyann.parker@ethereal.email',
        pass: 'BJTQqWU9hzmTGTx2rq'
    }
});

export const ticketMail = async(data) => {
    const mail = {
        from: "shyann.parker@ethereal.email",
        to: "shyann.parker@ethereal.email",
        subject: "compra realizada",
        text: "Plaintext version of the message",
        html: `
            <p>Fecha de la compra:${data.purchase_datetime}</p>
            <p>Monto de la compra:$${data.amount}</p>
        `
    }

    await transporter.sendMail(mail)
    return;
}

export const recoverPasswordMail = async(data) =>{
    const mail = {
        from: "shyann.parker@ethereal.email",
        to: data.email,
        subject: "cambiar contraseña",
        text: "Plaintext version of the message",
        html: `
            <a href="/api/user/recoverPassword">cambiar contraseña</a>
        `
    }
}