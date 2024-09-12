

const Cosmetics = () => {
  return (
    <section>
      <div>
        <h2>Cosmetics Page</h2>
        <p>Welcome to the Cosmetics page!</p>
      </div>

      <form className='flex flex-col gap-y-4'>
        <div>
          <label htmlFor="allergies">Allergies</label>
          <input className='border-2' type="text" name="allergies" id="allergies" placeholder='Allergies' />
        </div>
        <div>
          <label htmlFor="medical-conditions">Medical Conditions</label>
          <input className='border-2' type="text" name='medical-conditions' id='medical-conditions' placeholder='Medical Conditions' />
        </div>
        <div>
          <label htmlFor="dietary-restrictions">Restrictions</label>
          <input className='border-2' type="text" name="restrictions" id="dietary-restrictions" placeholder='Restrictions' />
        </div>
        <div>
          <label htmlFor="additional-info">Additional Info</label>
          <input className='border-2' type="text" name="additional-info" id="additional-info" placeholder='Additional Info' />
        </div>
        <div>
          <label htmlFor="photo-upload">Upload Photos</label>
          <input className='border-2' type="file" name="photo-upload" id="photo-upload" accept="image/*" />
        </div>
        <button type="submit" className='px-4 py-2 bg-blue-500 text-white'>Submit</button>
      </form>
    </section>
  );
};

export default Cosmetics;