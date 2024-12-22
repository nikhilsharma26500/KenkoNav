import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import { SiCodemagic } from "react-icons/si";
import Link from "next/link";

interface FormField {
  label: string;
  name: string;
  type: string;
  placeholder: string;
}

interface FormData {
  allergies: string;
  medicalConditions: string;
  dietaryRestrictions: string;
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
    label: "Dietary Restrictions",
    name: "dietaryRestrictions",
    type: "text",
    placeholder: "Dietary Restrictions",
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
      className="input input-bordered w-full sm:w-2/3"
      type={field.type}
      name={field.name}
      id={field.name}
      placeholder={field.placeholder}
      value={value}
      onChange={onChange}
    />
  </div>
);

const Food: React.FC = () => {
  const [formData, setFormData] = useState({
    allergies: "",
    medicalConditions: "",
    dietaryRestrictions: "",
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
    data.append("category", "food");
    data.append("allergies", formData.allergies);
    data.append("medicalConditions", formData.medicalConditions);
    data.append("dietaryRestrictions", formData.dietaryRestrictions);
    data.append("additionalInfo", formData.additionalInfo);
    data.append("file", formData.photo);

    try {
      // Production URL
      setLoading(true);
      const PRODUCTION_URL = import.meta.env.VITE_PRODUCTION_URL;
      const response = await fetch(
        `${PRODUCTION_URL}/food/set_model_response_food`,
        {
          method: "POST",
          body: data,
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        }
      );

      // Localhost URL
      // const response = await fetch('http://127.0.0.1:8000/food/set_model_response_food', {
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
    <section className="flex flex-col justify-center items-center min-h-screen py-10 text-center gap-y-10 mx-auto container px-5 sm:px-0">
      <div className="gap-y-10">
        <span className="flex flex-row justify-center items-start w-full gap-x-4">
        <Link className="hover:underline" href="/">
          <h1 className="handjet text-6xl font-bold">KenkoNav</h1>
        </Link>
          <div className="rounded-full bg-indigo-500 px-2 text-lg handjet font-bold">
            Food
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
            className="file-input file-input-bordered w-full sm:w-2/3"
            type="file"
            name="photo"
            id="photo-upload"
            accept="image/*"
            onChange={handleChange}
            required
          />
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <button type="submit" className="btn btn-wide bg-gray-800 my-4 text-white hover:bg-gray-400">
          Submit
        </button>
      </form>

      {loading ? (
        <p>Loading...</p>
      ) : (
        responseData && (
          <section className="flex flex-col gap-y-2 text-white mt-4 w-full max-w-2xl">
            <div className="flex items-center justify-center gap-x-2">
              <SiCodemagic />
              <h3 className="handjet text-bold text-2xl">Response</h3>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg">
              <ReactMarkdown>{responseData}</ReactMarkdown>
            </div>
          </section>
        )
      )}
    </section>
  );
};

export default Food;