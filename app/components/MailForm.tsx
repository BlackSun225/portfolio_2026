"use client"

import { useContext, useState } from "react";
import { LangContext } from "./navContext";
import { useRouter } from "next/router";
import { receiveCustomerMessage } from "../actions/mail";


const pageDictionary = {
    h1: {
        fr: "",
        en: ""
    },
    email: {
        fr: "",
        en: ""
    },
    name: {
        fr: "",
        en: ""
    },
    subject: {
        fr: "",
        en: ""
    },
    message: {
        fr: "",
        en: ""
    },
    submitBtn: {
        fr: "",
        en: ""
    },
    errorMsg: {
        fr: "",
        en: ""
    }
}


export function MailForm() {
    const {lang} = useContext(LangContext);
    const router = useRouter();
    const [isSending, setIsSending] = useState<boolean>(false);

    async function handleSubmit(formData: FormData) {
        setIsSending(true);
        const result = await receiveCustomerMessage(formData);
        if(result == "Error sending email") {
            setIsSending(false);
        }
    }

    return(
        <>
            <h1>.{pageDictionary.h1[lang]}</h1>
            <form action={handleSubmit}>

                <button type="submit" >envoyer</button>
            </form>
        </>
    );
}