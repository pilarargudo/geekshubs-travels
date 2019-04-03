const NodeMailer = require( 'nodemailer' );

if ( !process.env.EMAIL_GMAIL && !process.env.PASSWORD_GMAIL )  {
    throw new Error( 'SET ENV: EMAIL_GMAIL && PASSWORD_GMAIL' )
}

let gmail = {
    transporter: NodeMailer.createTransport( {
        service: 'Gmail',
        auth: {
            user: process.env.EMAIL_GMAIL,
            pass: process.env.PASSWORD_GMAIL
        },
        tls: { rejectUnauthorized: true }
    }, {
        from: process.env.EMAIL_GMAIL,
        headers: {}
    } )
};


module.exports = gmail;