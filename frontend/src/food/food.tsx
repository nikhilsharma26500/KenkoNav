import { useState } from "react";

const Food = () => {
  const [formData, setFormData] = useState({
    // allergies: '',
    // medicalConditions: '',
    // dietaryRestrictions: '',
    // additionalInfo: '',
    file: null as File | null,
  });

  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (name === 'file' && files) {
      setFormData({ ...formData, file: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.file) {
      setError('Photo is required');
      return;
    }

    const data = new FormData();
    // data.append('allergies', formData.allergies);
    // data.append('medicalConditions', formData.medicalConditions);
    // data.append('dietaryRestrictions', formData.dietaryRestrictions);
    // data.append('additionalInfo', formData.additionalInfo);
    data.append('file', formData.file);
    data.append('category', 'food');

    // eslint-disable-next-line prefer-const
    for (let [key, value] of data.entries()) {
      console.log(key, value);
    }

    try {
      const response = await fetch('http://127.0.0.1:8000/cosmetics/set_model_response', {
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
    <section>
      <div>
        <h2>Food Page</h2>
        <p>Welcome to the Food page!</p>
      </div>

      <form className='flex flex-col gap-y-4' onSubmit={handleSubmit}>
        <div>
          <label htmlFor="allergies">Allergies</label>
          <input
            className='border-2'
            type="text"
            name="allergies"
            id="allergies"
            placeholder='Allergies'
            value={formData.allergies}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="medical-conditions">Medical Conditions</label>
          <input
            className='border-2'
            type="text"
            name='medicalConditions'
            id='medical-conditions'
            placeholder='Medical Conditions'
            value={formData.medicalConditions}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="dietary-restrictions">Dietary Restrictions</label>
          <input
            className='border-2'
            type="text"
            name="dietaryRestrictions"
            id="dietary-restrictions"
            placeholder='Dietary Restrictions'
            value={formData.dietaryRestrictions}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="additional-info">Additional Info</label>
          <input
            className='border-2'
            type="text"
            name="additionalInfo"
            id="additional-info"
            placeholder='Additional Info'
            value={formData.additionalInfo}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="photo-upload">Upload Photos <span className="text-red-500">*</span></label>
          <input
            className='border-2'
            type="file"
            name="file"
            id="photo-upload"
            accept="image/*"
            onChange={handleChange}
            required
          />
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <button type="submit" className='px-4 py-2 bg-blue-500 text-white'>Submit</button>
      </form>
    </section>
  );
};

export default Food;