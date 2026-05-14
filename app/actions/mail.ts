import transporter from "@/lib/mailer";

// send a mail to the customer trying to contact me, as a confirmation mail.
async function sendEmailToCustomer( 
    customer_email: string, 
    subject: string, 
    customer_text: string, 
    lang: 'FR' | 'EN'
) {

    try {
        console.log(`Sending email to ${customer_email}...`);
    
        const mailOptions = {
            from: 'Chris Doudjo Yohanan Fousseni',
            to: customer_email,
            replyTo: "yohananchris@outlook.com", // So the receiver can reply to someone
            subject: subject ?? lang == "FR" ? "Confirmation d'envoi" : "Mail confirmation",
            cc: "yohananchris@outlook.com", //so i can see the mail sent to the customer
            // attachments: [
            //     {
            //     path: "./assets/meal_tablet.jpg",
            //     cid: "meal@maisondoudjo.com"
            //     }
            // ],
            html: `
            <html>
                <head>
                    <meta charset='utf-8' />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

                </head>
                <body>
                    <main>
                        <h1>MAISON DOUDJO</h1>
                        <p>Bonjour ,</p>
                        <p> 
                        ${lang == "FR" ? 
                            "Votre mail a bien été envoyé, je vous contacterai après lecture." 
                            : 'Your mail has been sent, i will respond after reading it'} 
                        </p>
                        <p>
                        ${lang == "FR" ? 'Ci-dessous le contenu de votre mail' : 'Below is your mail content' }
                        </p>
                        <div style="width:100%;">
                            ${customer_text}
                        </div>
                        <p>
                        ${lang == "FR" ? "Cordialement" : "See you soon (sorry for my english)"}
                        </p>
                    </main>
                </body>
            </html>
            `,
        };

        const result = await transporter.sendMail(mailOptions);
        console.log('Email sending result:', result);
        return result;
    }catch(err) {
        console.error('Error sending email:', err);
    }
}


//send me a mail containing the customer needs
export async function receiveCustomerMessage(
    customer_email: string, 
    subject: string, 
    customer_text: string, 
    lang: 'FR' | 'EN'
) {

    try {
        console.log(`Sending email from ${customer_email}...`)
    
        const mailOptions = {
            from: `${customer_email} <Portfolio>`,
            to: "yohananchris@outlook.com",
            replyTo: customer_email, // So i can respond to the customer
            subject: subject ?? "Prise de contact depuis le portfolio",
            cc: "yohananchris@gmail.com",
            // attachments: [
            //     {
            //     path: "@/assets/meal_tablet.jpg",
            //     cid: "meal@maisondoudjo.com"
            //     }
            // ],
            html: `
            <html>
                <head>
                    <meta charset="utf-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    
                </head>
                <body>
                    <main>
                        <p><strong>Langue : </strong><span>${lang}</span></p>
                        <p>${customer_text}</p>
                        <p>
                        ${lang == "FR" ? "Cordialement" : "See you soon (sorry for my english)"}
                        </p>
                    </main>
                </body>
            </html>
            `,
        };

        const result = await transporter.sendMail(mailOptions);
        console.log('Email sending result:', result);
        sendEmailToCustomer(customer_email, subject, customer_text, "FR");
        return result;
    }catch(err) {
        console.error('Error sending email:', err);
    }
}


