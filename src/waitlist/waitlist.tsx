import React, { useRef, useState } from 'react'
import emailjs from '@emailjs/browser';
import toast, { Toaster } from 'react-hot-toast';
import "../App.css";
import ReactMarkdown from 'react-markdown';


type SignUpFormState = {
    user_name: string;
    user_email: string;
};


const Waitlist = () => {

    // TEMPORARY
    const SlideShowData = [
        {
            heading: "slide 1",
            info: ["text 1", "text 2", "text 3"],
        },
        {
            heading: "slide 2",
            info: ["text 1", "text 2", "text 3"],
        },
        {
            heading: "slide 3",
            info: ["text 1", "text 2", "text 3"],
        },
    ];

    const PUBLIC_KEY: string | undefined = "8522DpHSGd_U-d0M4";
    const SERVICE_ID: string | undefined = "service_i6rpj8a";
    const TEMPLATE_ID: string | undefined = "template_2vtsz9h";

    const form = useRef<HTMLFormElement>(null);

    const [formData, setFormData] = useState<SignUpFormState>({
        user_name: "",
        user_email: "",
    });

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

        if (form.current) {
            emailjs
                .sendForm(SERVICE_ID!, TEMPLATE_ID!, form.current, {
                    publicKey: PUBLIC_KEY!,
                })
                .then(
                    (result) => {
                        console.log("Email sent successfully!", result);
                        toast.success("You have been added to the waitlist! 😎");
                        setFormData({ user_name: "", user_email: "" });
                        if (form.current) form.current.reset();
                    },
                    (error) => {
                        toast.error("Failed to send email. Please try again later.");
                        console.log({ "Error": error });
                    }
                );

        };
    }

    return (

        <section className='h-screen w-screen overflow-y-scroll'>

            <div className='flex flex-row justify-center items-center text-center w-[80vw] h-[100%] font-mono'>

                <section>
                    <Toaster
                        position="bottom-center"
                        reverseOrder={false}
                    />
                </section>

                {/* Card to explain about the functionality */}
                <section className='sm:w-2/3'>
                    {SlideShowData.map((item, index) => (
                    <div key={index}>
                            
                       <h1>{item.heading}</h1>
                       <ul>
                       {item.info.map((content, index) => (
                        <li key={index}>
                            <ReactMarkdown>
                                {content}
                            </ReactMarkdown>
                        </li>
                       ))
                }
                </ul>
                       
                    </div>
                ))}
                </section>

                <section className='sm:w-1/3  '>
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
                                    placeholder="Name"
                                    required
                                />
                            </label>
                            <label className="input input-bordered flex items-center gap-2">
                                <input type="text"
                                    className="grow"
                                    name="user_email"
                                    value={formData.user_email}
                                    onChange={handleInputChange}
                                    placeholder="Email"
                                    required
                                />
                            </label>

                            <button className="btn bg-slate-300 text-black hover:bg-slate-800 hover:text-white" type='submit'>Join Waitlist! 🎉</button>
                        </form>
                    </div>
                </section>

            </div>

            <div className='h-[100%]'>


                {/* Card to explain about the price segments */}
                <div>

                </div>
            </div>
        </section>
    )
}

export default Waitlist