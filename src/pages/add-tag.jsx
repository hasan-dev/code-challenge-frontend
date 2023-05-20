import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const BASE_URL = import.meta.env.VITE_BASE_URL_API;

export default function addTag() {
  const navigate = useNavigate();
  const [nameTag, setNameTag] = useState('');

  const handleNameTagChange = (event) => {
    setNameTag(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios
        .post(`${BASE_URL}/tag`, {
          name: nameTag,
        })
        .then(() => navigate('/'));
      console.log(name);
      setNameTag('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2 className='text-2xl text-gray-900 dark:text-white font-semibold mb-5 pt-5 text-center'>
        Add Tag
      </h2>
      <div className='flex justify-center'>
        <div className='w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-xl pb-5 dark:bg-gray-800 dark:border-gray-700'>
          <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
            <form onSubmit={handleSubmit}>
              <div className='mb-6'>
                <label
                  htmlFor='name'
                  className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                >
                  Name
                </label>
                <input
                  type='name'
                  id='name'
                  name='name'
                  value={nameTag}
                  onChange={handleNameTagChange}
                  className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  placeholder=''
                  required
                />
              </div>
              <button
                type='submit'
                className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
