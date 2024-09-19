import React, { useRef, useState } from 'react'
import emailjs from '@emailjs/browser';
import toast from 'react-hot-toast';

type SignUpFormState = {
    user_name: string;
    user_email: string;
};


const Waitlist = () => {
    const PUBLIC_KEY: string | undefined = import.meta.env.PUBLIC_KEY;
    const SERVICE_ID: string | undefined = import.meta.env.SERVICE_ID;
    const TEMPLATE_ID: string | undefined = import.meta.env.TEMPLATE_ID;

    const form = useRef<HTMLFormElement>(null);

    const [formData, setFormData] = useState<SignUpFormState>({
        user_name: "",
        user_email: "",
    });

    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const allFieldsFilled =
            formData.user_name && formData.user_email;

        if (!allFieldsFilled) {
            toast.error("Please fill in all the information!");
            return;
        }

        setIsSubmitted(true);

        if (form.current) {
            emailjs
                .sendForm(SERVICE_ID!, TEMPLATE_ID!, form.current, {
                    publicKey: PUBLIC_KEY!,
                })
                .then(
                    () => {
                        if (isSubmitted) {
                            toast.success("You have been added to the waitlist! 😎");
                            console.log("SUCCESS!");
                        }
                    },
                    (error) => {
                        toast.error("Failed to send email. Please try again later.");
                        console.log("FAILED...", error.text);
                    }
                );

        };
    }

    return (
        <section className='flex flex-col justify-center items-center text-center h-screen font-mono'>
            <div>
                <h1 className='text-center font-bold sm:text-[100px] text-[75px] handjet'>KenkoNav</h1>
                <h2 className='text-center sm:text-[50px] text-[50px] handjet'>Waitlist</h2>
            </div>

            <div>
                <form ref={form} onSubmit={sendEmail} className='flex flex-col gap-y-4'>
                    <label className="input input-bordered flex items-center gap-2">
                        <input type="text"
                            className="grow"
                            name="user_name"
                            value={formData.user_name}
                            onChange={handleInputChange}
                            placeholder="Username" />
                    </label>
                    <label className="input input-bordered flex items-center gap-2">
                        <input type="text"
                            className="grow"
                            name="user_email"
                            value={formData.user_email}
                            onChange={handleInputChange}
                            placeholder="Email" />
                    </label>

                    <button className="btn btn-primary" type='submit'>Join Waitlist! 🎉</button>
                </form>
            </div>
        </section>
    )
}

export default Waitlist