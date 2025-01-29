import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import { SiCodemagic } from "react-icons/si";
import { Link } from 'react-router-dom'
import { RiLoader2Fill } from "react-icons/ri";
import { ArrowLeft } from "lucide-react";

interface FormField {
  label: string;
  name: string;
  type: string;
  placeholder: string;
}

interface FormData {
  allergies: string;
  medicalConditions: string;
  restrictions: string;
  additionalInfo: string;
  photo: File | null;
}

const formFields: FormField[] = [
  {
    label: "Allergies",
    name: "allergies",
    type: "text",
    placeholder: "Allergies",
  },
  {
    label: "Medical Conditions",
    name: "medicalConditions",
    type: "text",
    placeholder: "Medical Conditions",
  },
  {
    label: "Restrictions",
    name: "restrictions",
    type: "text",
    placeholder: "Restrictions",
  },
  {
    label: "Additional Info",
    name: "additionalInfo",
    type: "text",
    placeholder: "Additional Info",
  },
];

const InputField: React.FC<{
  field: FormField;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ field, value, onChange }) => (
  <div className="sm:flex sm:items-center sm:justify-between sm:w-full sm:space-y-0 space-y-2">
    <label htmlFor={field.name} className="sm:w-1/3 text-left">{field.label}</label>
    <input
      className="input rounded-none input-bordered w-full sm:w-2/3"
      type={field.type}
      name={field.name}
      id={field.name}
      placeholder={field.placeholder}
      value={value}
      onChange={onChange}
    />
  </div>
);

const Cosmetics: React.FC = () => {
  const [formData, setFormData] = useState({
    allergies: "",
    medicalConditions: "",
    restrictions: "",
    additionalInfo: "",
    photo: null as File | null,
  });
  const [loading, setLoading] = useState(false);
  const [responseData, setResponseData] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (name === "photo" && files) {
      setFormData({ ...formData, photo: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.photo) {
      setError("Photo is required");
      return;
    }

    const data = new FormData();
    data.append("category", "cosmetics");
    data.append("allergies", formData.allergies);
    data.append("medicalConditions", formData.medicalConditions);
    data.append("restrictions", formData.restrictions);
    data.append("additionalInfo", formData.additionalInfo);
    data.append("file", formData.photo);

    try {
      setLoading(true);
      const PRODUCTION_URL = import.meta.env.VITE_PRODUCTION_URL;
      const response = await fetch(
        `${PRODUCTION_URL}/cosmetics/set_model_response_cosmetics`,
        {
          method: "POST",
          body: data,
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        }
      );

      // const response = await fetch('http://127.0.0.1:8000/cosmetics/set_model_response_cosmetics', {
      //   method: 'POST',
      //   body: data,
      //   headers: {
      //     "Access-Control-Allow-Origin": "*"
      //   }
      // });

      if (response.ok) {
        const result = await response.json();
        console.log("Form submitted successfully:", result);
        setResponseData(result);
        setError("");
      } else {
        console.error("Form submission failed");
        setError("Form submission failed");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setError("Error submitting form");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex flex-col justify-center items-center min-h-screen py-10 text-center gap-y-10 mx-auto container px-5 sm:px-0 bg-gray-50 text-gray-800 relative">
      <button className="absolute text-sm md:text-md top-2 md:top-4 left-4 bg-gray-800 hover:bg-indigo-500 rounded-full py-1 px-2 text-white inline-flex items-center gap-x-1"><ArrowLeft size={16} />
        <Link to="/">Back</Link>
      </button>
      <div className="gap-y-10">
        <span className="flex flex-row justify-center items-start w-full gap-x-4">
          <Link className="hover:underline" to="/">
            <h1 className="handjet text-6xl font-bold">KenkoNav</h1>
          </Link>
          <div className="rounded-full bg-indigo-500 text-white px-2 text-lg handjet font-bold">
            Cosmetics
          </div>
        </span>
        <h3 className="sm:text-xl text-md mt-4">
          Please fill the below columns and upload the ingredients image in the
          form below
        </h3>
      </div>

      <form
        className="flex flex-col gap-y-4 w-full max-w-2xl items-center justify-around"
        onSubmit={handleSubmit}
      >
        {formFields.map((field) => (
          <InputField
            key={field.name}
            field={field}
            value={formData[field.name as keyof FormData] as string}
            onChange={handleChange}
          />
        ))}
        <div className="sm:flex sm:items-center sm:justify-between w-full sm:space-y-0 space-y-2">
          <label htmlFor="photo-upload" className="sm:w-1/3 text-left">
            Upload Photos<span className="text-red-500">*</span>
          </label>
          <input
            className="file-input rounded-none file-input-bordered w-full sm:w-2/3"
            type="file"
            name="photo"
            id="photo-upload"
            accept="image/*"
            onChange={handleChange}
            required
          />
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <button type="submit" className="btn btn-wide bg-gray-800 rounded-none my-4 text-white hover:bg-gray-200 hover:text-black">
          Submit
        </button>
      </form>

      {loading ? (
        <p className="flex items-center justify-center gap-x-2"><RiLoader2Fill />Loading...</p>
      ) : (
        responseData && (
          <section className="flex flex-col gap-y-2 text-white mt-4 w-full max-w-2xl">
            <div className="flex items-center justify-center gap-x-2">
              <SiCodemagic />
              <h3 className="handjet text-bold text-2xl">Response</h3>
            </div>
            <div className="bg-gray-800 p-4 rounded-none">
              <ReactMarkdown>{responseData}</ReactMarkdown>
            </div>
            <i className="text-red-600 opacity-70">This responses is generated by AI. It may output wrong response.</i>
          </section>
        )
      )}
    </section>
  );
};
export default Cosmetics;
