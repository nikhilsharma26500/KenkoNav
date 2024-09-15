import React, { useState } from "react";

interface FormField {
  label: string;
  name: string;
  type: string;
  placeholder: string;
}

const formFields: FormField[] = [
  { label: "Allergies", name: "allergies", type: "text", placeholder: "Allergies" },
  { label: "Medical Conditions", name: "medicalConditions", type: "text", placeholder: "Medical Conditions" },
  { label: "Dietary Restrictions", name: "dietaryRestrictions", type: "text", placeholder: "Dietary Restrictions" },
  { label: "Additional Info", name: "additionalInfo", type: "text", placeholder: "Additional Info" },
];

const InputField: React.FC<{ field: FormField; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }> = ({ field, value, onChange }) => (
  <div className="sm:flex sm:items-center sm:justify-between sm:w-[50%] sm:space-y-0 space-y-2">
    <label htmlFor={field.name}>{field.label}</label>
    <input
      className='input input-bordered max-w-xs'
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
    allergies: '',
    medicalConditions: '',
    dietaryRestrictions: '',
    additionalInfo: '',
    photo: null as File | null,
  });

  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (name === 'photo' && files) {
      setFormData({ ...formData, photo: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.photo) {
      setError('Photo is required');
      return;
    }

    const data = new FormData();
    const dietaryDetails = {
      allergies: formData.allergies,
      medicalConditions: formData.medicalConditions,
      dietaryRestrictions: formData.dietaryRestrictions,
      additionalInfo: formData.additionalInfo,
    };
    data.append('dietaryDetails', new Blob([JSON.stringify(dietaryDetails)], { type: 'application/json' }));
    data.append('file', formData.photo);

    try {
      const response = await fetch('http://127.0.0.1:8000/food/set_model_response_food', {
        method: 'POST',
        body: data,
      });

      if (response.ok) {
        console.log('Form submitted successfully');
        setError('');
      } else {
        console.error('Form submission failed');
        setError('Form submission failed');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setError('Error submitting form');
    }
  };

  return (
    <section className="flex flex-col justify-center items-center h-screen text-center gap-y-10 mx-auto container px-5 sm:px-0">
      <div className="gap-y-10">
        <span className="flex flex-row justify-center items-start w-full gap-x-4">
          <h1 className="handjet text-6xl font-bold">KenkoNav</h1>
          <div className="rounded-full bg-indigo-500 px-2 text-lg handjet font-bold">Food</div>
        </span>
        <h3 className="sm:text-xl text-md">Please fill the below columns and upload the ingredients image in the form below</h3>
      </div>

      <form className='flex flex-col gap-y-4 w-[60%] items-center justify-around' onSubmit={handleSubmit}>
        {formFields.map((field) => (
          <InputField key={field.name} field={field} value={formData[field.name as keyof typeof formData] as string} onChange={handleChange} />
        ))}
        <div className="sm:flex sm:items-center sm:justify-between sm:w-[50%] sm:space-y-0 space-y-2">
          <label htmlFor="photo-upload">Upload Photos<span className="text-red-500">*</span></label>
          <input
            className='file-input file-input-bordered max-w-xs'
            type="file"
            name="photo"
            id="photo-upload"
            accept="image/*"
            onChange={handleChange}
            required
          />
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <button type="submit" className='btn btn-wide my-4 text-white'>Submit</button>
      </form>
    </section>
  );
};

export default Food;