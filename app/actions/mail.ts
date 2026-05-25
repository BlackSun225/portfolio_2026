"use server"

import transporter from "@/lib/mailer";
import { z } from "zod";

const mailSchema = z.object({
    customer_email: z.email(),
    customer_name: z.string().nonempty().regex(/^[\p{L}' -]+$/u),
    // subject: z.string(),
    customer_text: z.string().nonempty(),
    lang: z.enum(["FR", "EN"])
})

// send a mail to the customer trying to contact me, as a confirmation mail.
async function sendEmailToCustomer(
    customer_email: string,
    customer_name: string,
    customer_text: string,
    lang: 'FR' | 'EN'
) {

    try {
        console.log(`Sending email to ${customer_email}...`);

        const mailOptions = {
            from: 'Chris Doudjo Yohanan Fousseni <yohananchris@outlook.com>',
            to: customer_email,
            replyTo: "yohananchris@outlook.com", // So the receiver can reply to someone
            subject: /*subject ??*/ lang == "FR" ? "Confirmation d'envoi" : "Mail confirmation",
            cc: "yohananchris@outlook.com", //so i can see the mail sent to the customer
            html: `
            <html>
                <head>
                    <meta charset='utf-8' />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <link rel="preconnect" href="https://fonts.googleapis.com">
                    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
                    <link href="https://fonts.googleapis.com/css2?family=Aladin&family=Glass+Antiqua&display=swap" rel="stylesheet">
                </head>
                <body>
                    <main style="max-width:600px;margin:0 auto;">
                        <h1 style="font-family:'Glass Antiqua',Georgia,serif;font-size:24px;text-align:center;background:black;color:ivory;padding:1.5rem;letter-spacing:2px;" >
                            MAISON DOUDJO
                        </h1>
                        <section style="padding:0 1rem;">
                            <p>Bonjour <span style="font-family:'Aladin',Arial,sans-serif;font-size:18px" >${customer_name}</span>,</p>
                            <p> 
                            ${lang == "FR" ?
                    "Votre mail a bien été envoyé, je vous contacterai après lecture."
                    : 'Your mail has been sent, i will respond after reading it'} 
                            </p>
                            <p >
                            ${lang == "FR" ? 'Ci-dessous le contenu de votre mail' : 'Below is your mail content'}
                            </p>
                            <div style="background:rgb(255, 247, 238);border:2px solid rgb(234, 120, 33);border-radius:7px;padding:1rem;">
                                ${customer_text}
                            </div>
                            <p>
                                ${lang == "FR" ? "Cordialement" : "See you soon "}
                            </p>
                        </section>
                        <div style="display:flex;width:100%;gap:7px;justify-content:center;align-items:center;background:black;padding:10px 0;" >
                            <span style="display:block;width:5px;aspect-ratio:1/1;border-radius:7px;background:orange;" ></span>
                            <span style="display:block;width:5px;aspect-ratio:1/1;border-radius:7px;background:white;" ></span>
                            <span style="display:block;width:5px;aspect-ratio:1/1;border-radius:7px;background:green;" ></span>
                        </div>
                    </main>
                </body>
            </html>
            `,
        };

        const result = await transporter.sendMail(mailOptions);
        console.log('Result sending mail to customer:', result);
        // return result;
    } catch (err) {
        console.error('Result sending mail to customer:', err);
    }
}


//send me a mail containing the customer needs
export async function receiveCustomerMessage(validatedData: {
    customer_email: string;
    customer_name: string;
    customer_text: string;
    lang: "FR" | "EN";
}) {

    try {
        const actionCheck = mailSchema.safeParse(validatedData);
        if (!actionCheck.success) {
            return { status: false, error: z.flattenError(actionCheck.error).fieldErrors };
        }

        console.log(`Sending email from ${actionCheck.data.customer_email}...`);

        const mailOptions = {
            from: `${actionCheck.data.customer_email} <Portfolio>`,
            to: "yohananchris@outlook.com",
            replyTo: actionCheck.data.customer_email, // So i can respond to the customer
            subject: /*actionCheck.data.subject ??*/ "Prise de contact depuis le portfolio",
            cc: "yohananchris@gmail.com",
            html: `
            <html>
                <head>
                    <meta charset="utf-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <link rel="preconnect" href="https://fonts.googleapis.com">
                    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
                    <link href="https://fonts.googleapis.com/css2?family=Aladin&family=Glass+Antiqua&display=swap" rel="stylesheet">
                </head>
                <body>
                    <main style="max-width:600px;margin:0 auto;" >
                        <h1 style="font-family:'Glass Antiqua', Georgia, 'Times New Roman', serif;font-size:24px;text-align:center;background:black;color:ivory;padding:1.5rem;letter-spacing:2px;" >
                            MAISON DOUDJO
                        </h1>
                        <section style="padding:0 1rem;" >
                            <p><strong>Langue : </strong><span>${validatedData.lang}</span></p>
                            <p>Ci-dessous le message du client : </p>
                            <p style="background:rgb(255, 247, 238);border:2px solid rgb(234, 120, 33);border-radius:7px;padding:1rem;" >${validatedData.customer_text}</p>
                            <p>
                            ${validatedData.lang == "FR" ? "Cordialement" : "See you soon (sorry for my english)"}
                            </p>
                        </section>
                        <div style="display:flex;width:100%;gap:7px;justify-content:center;align-items:center;background:black;padding:10px 0;" >
                            <span style="display:block;width:5px;aspect-ratio:1/1;border-radius:7px;background:orange;" ></span>
                            <span style="display:block;width:5px;aspect-ratio:1/1;border-radius:7px;background:white;" ></span>
                            <span style="display:block;width:5px;aspect-ratio:1/1;border-radius:7px;background:green;" ></span>
                        </div>
                    </main>
                </body>
            </html>
            `,
        };

        const result = await transporter.sendMail(mailOptions);
        console.log('Result sending customer mail :', result);

        await sendEmailToCustomer(actionCheck.data.customer_email, actionCheck.data.customer_name, actionCheck.data.customer_text, actionCheck.data.lang);
        return { status: true, error: null };
    } catch (err) {
        console.error('Error sending email:', err);
        return {
            status: false,
            error: err instanceof Error ? err.message : "Unknown error occurred"
        };
    }
}


