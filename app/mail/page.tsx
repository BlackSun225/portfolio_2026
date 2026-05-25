"use client"

import { useContext, useState } from "react";
import { LangContext } from "../components/navContext";
import { LangPrefix } from "../utils/models";
import { useRouter } from "next/navigation";
import { receiveCustomerMessage } from "../actions/mail";

import * as z from "zod";
import { en, fr } from "zod/locales"


import styles from "@/app/lib/styles/mailForm.module.css";

const pageDictionary = {
    h1: {
        fr: "Formulaire de contact",
        en: "Contact form"
    },
    customer_email: {
        fr: "Email",
        en: "Email",
        placeholder: {
            fr: "Votre adresse mail",
            en: "Your email address"
        }
    },
    customer_name: {
        fr: "Prénoms et Nom",
        en: "Firstname and Lastname",
        placeholder: {
            fr: "ex: John DOE",
            en: "ex: John DOE"
        }
    },
    /*subject: {
        fr: "",
        en: ""
    },*/
    customer_text: {
        fr: "Comment pouvons nous collaborer ?",
        en: "How can we collaborate ?",
        placeholder: {
            fr: "Parlez moi de votre projet, comment puis-je vous aider ?",
            en: "Explain me your project, how can i help you ?"
        }
    },
    submitBtn: {
        fr: "Envoyer",
        en: "Send"
    },
    errorMsg: {
        fr: "",
        en: ""
    },
    btnText: {
        'default': {
            fr: "Soumettre",
            en: "Send"
        },
        'loading': {
            fr: "Veuillez patienter... ⌛",
            en: "Processing... ⌛"
        }
    },
    local: {
        fr: "FR",
        en: "EN"
    }
}


export default function MailForm() {
    const { lang } = useContext(LangContext);
    const router = useRouter();
    const [isSending, setIsSending] = useState<boolean>(false);
    const [mailResult, setMailResult] = useState<{ status: boolean, error: string | null } | null>(null);

    const [formState, setFormState] = useState<{
        general: string,
        customer_email: string,
        customer_name: string,
        customer_text: string,
        lang: string
    }>({
        general: "",
        customer_email: "",
        customer_name: "",
        customer_text: "",
        lang: pageDictionary.local[lang]
    });

    const [formSubmitError, setFormSubmitError] = useState<
        {
            customer_email?: string | undefined;
            customer_name?: string | undefined;
            customer_text?: string | undefined;
            lang?: string | undefined;
        } | null>(null);


    const mailSchema = z.object({
        customer_email: z.email(),
        customer_name: z.string().min(
            3,
            lang == LangPrefix.fr ? "Ce champ doit contenir au moins 3 lettres" : "This field should contains at least 3 letters"
        ).regex(
            /^[\p{L}' -]+$/u,
            lang == LangPrefix.fr ? "Seuls les lettres, accents, apostrophes et espaces sont autorisés" : "Only letters, accents, apostrophes and spaces are allowed"
        ).trim(),
        customer_text: z.string().min(
            5,
            lang == LangPrefix.fr ? "Ce champ doit contenir au moins 5 lettres" : "This field should contains at least 5 letters"
        ).trim(),
        lang: z.enum(["FR", "EN"])
    });

    async function handleSubmit(formData: FormData) {
        setIsSending(true);

        z.config(lang == LangPrefix.fr ? fr() : en());

        const validationResult = mailSchema.safeParse({
            customer_email: formData.get("customer_email"),
            customer_name: formData.get("customer_name"),
            // subject: formData.get("subject"),
            customer_text: formData.get("customer_text"),
            lang: formData.get("lang"),
        });

        if (validationResult.success) {
            try {
                const startTime = Date.now();
                const result = await receiveCustomerMessage(validationResult.data);

                const elapsedTime = Date.now() - startTime;
                if (elapsedTime < 1000) {
                    await new Promise(resolve => setTimeout(resolve, 1000 - elapsedTime));
                }

                if (result.status) {
                    setFormState({
                        general: "",
                        customer_email: "",
                        customer_name: "",
                        customer_text: "",
                        lang: pageDictionary.local[lang]
                    });
                    setMailResult({ status: true, error: null });
                } else {
                    const errorMsg = typeof result.error === 'string'
                        ? result.error
                        : (lang === LangPrefix.fr
                            ? "Une erreur est survenue lors de l'envoi."
                            : "An error occurred while sending.");
                    setFormState(prev => ({
                        ...prev,
                        general: errorMsg
                    }));
                    setMailResult({ status: false, error: errorMsg });
                }
            } catch (error) {
                console.error(error);
                setFormState(prev => ({
                    ...prev,
                    general: lang === LangPrefix.fr
                        ? "Une erreur est survenue lors de l'envoi du message. Veuillez réessayer plus tard."
                        : "An error occurred while sending your message. Please try again later."
                }));
                setMailResult({
                    status: false, error: lang === LangPrefix.fr
                        ? "Une erreur est survenue lors de l'envoi du message. Veuillez réessayer plus tard."
                        : "An error occurred while sending your message. Please try again later."
                });

            } finally {
                setIsSending(false);
            }

        } else {
            const errors = z.flattenError(validationResult.error).fieldErrors;
            const formSubmitErrorClone: {
                customer_email?: string | undefined;
                customer_name?: string | undefined;
                customer_text?: string | undefined;
                lang?: string | undefined;
            } = {
                customer_email: "",
                customer_name: "",
                customer_text: "",
                lang: ""
            };

            for (const key of Object.keys(errors) as Array<keyof typeof errors>) {
                formSubmitErrorClone[key] = errors[key]?.join(" 📬 ");
            }
            console.log(errors);

            setIsSending(false);
            setFormSubmitError(formSubmitErrorClone);
        }

    }

    return (
        <section className={styles.mailForm}>
            <h1 className={styles.h1}>{pageDictionary.h1[lang]}</h1>
            <form className={styles.form} onSubmit={(event) => {
                event.preventDefault();
                handleSubmit(new FormData(event.currentTarget));
            }}>
                <label htmlFor="customer_email" className={styles.inputBox}>
                    <span className={`${styles.label} ${styles.required}`}>{pageDictionary.customer_email[lang]}</span>
                    <input
                        type="email"
                        id="customer_email"
                        name="customer_email"
                        disabled={isSending}
                        className={styles.input}
                        placeholder={pageDictionary.customer_email.placeholder[lang]}
                        value={formState.customer_email}
                        required
                        onChange={(event) => {
                            setFormState(prev => ({ ...prev, customer_email: event.target.value }));
                            if (formSubmitError) {
                                setFormSubmitError(null);
                            }
                            if (mailResult) setMailResult(null);
                        }}
                    />
                    {formSubmitError?.customer_email && (
                        <p className={styles.error}>{formSubmitError?.customer_email}</p>
                    )}
                </label>

                <label htmlFor="customer_name" className={styles.inputBox}>
                    <span className={`${styles.label} ${styles.required}`}>{pageDictionary.customer_name[lang]}</span>
                    <input
                        type="text"
                        id="customer_name"
                        name="customer_name"
                        disabled={isSending}
                        className={styles.input}
                        placeholder={pageDictionary.customer_name.placeholder[lang]}
                        value={formState.customer_name}
                        required
                        onChange={(event) => {
                            setFormState(prev => ({ ...prev, customer_name: event.target.value }))
                            if (formSubmitError) {
                                setFormSubmitError(null);
                            }
                            if (mailResult) setMailResult(null);
                        }}
                    />
                    {formSubmitError?.customer_name && (
                        <p className={styles.error}>{formSubmitError?.customer_name}</p>
                    )}
                </label>

                <label htmlFor="customer_text" className={styles.inputBox}>
                    <span className={`${styles.label} ${styles.required}`}>{pageDictionary.customer_text[lang]}</span>
                    <textarea
                        id="customer_text"
                        name="customer_text"
                        disabled={isSending}
                        className={styles.textarea}
                        required
                        placeholder={pageDictionary.customer_text.placeholder[lang]}
                        value={formState.customer_text}
                        onChange={(event) => {
                            setFormState(prev => ({ ...prev, customer_text: event.target.value }))
                            if (formSubmitError) {
                                setFormSubmitError(null);
                            }
                            if (mailResult) setMailResult(null);
                        }}
                    ></textarea>
                    {formSubmitError?.customer_text && (
                        <p className={styles.error}>{formSubmitError?.customer_text}</p>
                    )}
                </label>

                <input onChange={() => { }} className={styles.hiddenInput} name="lang" value={pageDictionary.local[lang]} />

                {mailResult?.status === false && (
                    <p className={styles.error} style={{ marginBottom: "1rem", fontWeight: "600" }}>
                        {formState.general}
                    </p>
                )}

                {mailResult?.status === true && (
                    <p style={{ color: "green", fontSize: "0.9rem", marginBottom: "1rem", fontWeight: "600" }}>
                        {lang === LangPrefix.fr
                            ? "✓ Mail envoyé avec succès !"
                            : "✓ Mail sent successfully!"}
                    </p>
                )}


                <button
                    disabled={isSending}
                    className={styles.submitBtn}
                    type="submit"
                >
                    {pageDictionary.btnText[isSending ? 'loading' : 'default'][lang]}
                </button>
            </form>
        </section>
    );
}