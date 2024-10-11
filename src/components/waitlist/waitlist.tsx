import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import toast, { Toaster } from "react-hot-toast";
import "../../App.css";
import { PiStudentBold } from "react-icons/pi";
import ReactMarkdown from "react-markdown";
import { SlideShowData, PlansMonthly } from "./slideShowData";

type SignUpFormState = {
  user_name: string;
  user_email: string;
};

interface Plans {
  title: string,
  price: string,
  features: string[],
  buttonText: string,
  buttonColor: string,
  iconBgColor: string,
  iconColor: string
}

const Waitlist: React.FC = () => {
  const PUBLIC_KEY: string | undefined = import.meta.env.VITE_PUBLIC_ID;
  const SERVICE_ID: string | undefined = import.meta.env.VITE_SERVICE_ID;
  const TEMPLATE_ID: string | undefined = import.meta.env.VITE_TEMPLATE_ID;

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

    const allFieldsFilled = formData.user_name && formData.user_email;

    if (!allFieldsFilled) {
      toast.error("Please fill in all the information!");
      return;
    }

    if (form.current && SERVICE_ID && TEMPLATE_ID && PUBLIC_KEY) {
      emailjs
        .sendForm(SERVICE_ID, TEMPLATE_ID, form.current, {
          publicKey: PUBLIC_KEY,
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
            console.log({ Error: error });
          }
        );
    } else {
      toast.error("Missing configuration. Please check your environment variables.");
    }
  };

  return (
    <section className="min-h-screen w-full">
      <div className="mx-auto flex flex-col md:flex-row justify-center items-center text-center sm:container font-mono py-8">
        <Toaster position="bottom-center" reverseOrder={false} />

        <section className="md:w-2/3 mb-8 md:mb-0">
          {SlideShowData.map((item, index) => (
            <div key={index} className="mb-6">
              <h2 className="text-2xl font-bold">{item.heading}</h2>
              <ul className="list-disc list-inside">
                {item.info.map((content, index) => (
                  <li key={index} className="mb-1">
                    <ReactMarkdown>{content}</ReactMarkdown>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        <section className="md:w-1/3 flex flex-col justify-center items-center">
          <div className="mb-6">
            <h1 className="text-center font-bold text-6xl md:text-7xl handjet mb-2">
              KenkoNav
            </h1>
            <h2 className="text-center text-4xl md:text-5xl handjet mb-4">
              Waitlist
            </h2>
            <p className="text-lg">
              Be the first to discover what is in your food!
            </p>
          </div>

          <form
            ref={form}
            onSubmit={sendEmail}
            className="flex flex-col gap-y-4 w-full max-w-md"
          >
            <label className="input input-bordered flex items-center gap-2">
              <input
                type="text"
                className="grow"
                name="user_name"
                value={formData.user_name}
                onChange={handleInputChange}
                placeholder="Name"
                required
              />
            </label>
            <label className="input input-bordered flex items-center gap-2">
              <input
                type="email"
                className="grow"
                name="user_email"
                value={formData.user_email}
                onChange={handleInputChange}
                placeholder="Email"
                required
              />
            </label>

            <button
              className="btn bg-slate-300 text-black hover:bg-slate-800 hover:text-white"
              type="submit"
            >
              Join Waitlist! 🎉
            </button>
          </form>
        </section>
      </div>

      <div className="container mx-auto px-4 py-8">
        <h1 className="handjet text-5xl md:text-6xl font-bold text-center mb-8">
          Pricing
        </h1>

        <div className="grid md:grid-cols-2 gap-8">
          {PlansMonthly.map((plan, index) => (
            <PlanCard key={index} plan={plan} />
          ))}
        </div>
      </div>
    </section>
  );
};

const PlanCard: React.FC<{ plan: Plans }> = ({ plan }) => (
  <div className="flex flex-col justify-between p-5 bg-white border rounded shadow-sm">
    <div className="mb-6">
      <div className="flex items-center justify-between pb-6 mb-6 border-b">
        <div>
          <p className="text-sm font-bold tracking-wider uppercase">
            {plan.title}
          </p>
          <p className="text-4xl font-extrabold">{plan.price}</p>
        </div>
        {/*<div
          className={`flex items-center justify-center w-16 h-16 rounded-full ${plan.iconBgColor}`}
        >
           <svg
            className={`w-8 h-8 ${plan.iconColor}`}
            viewBox="0 0 24 24"
            strokeLinecap="round"
            strokeWidth="2"
          >
            <path
              d="M12,7L12,7 c-1.657,0-3-1.343-3-3v0c0-1.657,1.343-3,3-3h0c1.657,0,3,1.343,3,3v0C15,5.657,13.657,7,12,7z"
              fill="none"
              stroke="currentColor"
            />
            <path
              d="M15,23H9v-5H7v-6 c0-1.105,0.895-2,2-2h6c1.105,0,2,0.895,2,2v6h-2V23z"
              fill="none"
              stroke="currentColor"
            />
          </svg> 
        </div>*/}
          <PiStudentBold />
      </div>
      <div>
        <p className="mb-2 font-bold tracking-wide">Features</p>
        <ul className="space-y-2">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-center">
              <div className="mr-2">
                <svg
                  className="w-4 h-4 text-deep-purple-accent-400"
                  viewBox="0 0 24 24"
                  strokeLinecap="round"
                  strokeWidth="2"
                >
                  <polyline
                    fill="none"
                    stroke="currentColor"
                    points="6,12 10,16 18,8"
                  />
                  <circle
                    cx="12"
                    cy="12"
                    fill="none"
                    r="11"
                    stroke="currentColor"
                  />
                </svg>
              </div>
              <p className="font-medium text-gray-800">{feature}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
    <div>
      <a
        href="/"
        className={`inline-flex items-center justify-center w-full h-12 px-6 mb-4 font-medium tracking-wide text-white transition duration-200 rounded shadow-md ${plan.buttonColor} focus:shadow-outline focus:outline-none`}
      >
        {plan.buttonText}
      </a>
      <p className="text-sm text-gray-600">
        Sed ut perspiciatis unde omnis iste natus error sit voluptatem
        accusantium
      </p>
    </div>
  </div>
);


export default Waitlist;
