import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL_API;

export default function addNote() {
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [tags, setTags] = useState([]);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handleTagChange = (event) => {
    const tagId = parseInt(event.target.value);
    console.log(selectedTags);
    const isChecked = event.target.checked;

    if (isChecked) {
      setSelectedTags([...selectedTags, tagId]);
    } else {
      setSelectedTags(selectedTags.filter((id) => id !== tagId));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      console.log(selectedTags);
      const response = await axios
        .post(`${BASE_URL}/note`, {
          title,
          content,
          tags: selectedTags.length > 0 ? selectedTags : null,
        })
        .then(() => navigate('/'));

      console.log(response.data);
      setTitle('');
      setContent('');
      setSelectedTags([]);
    } catch (error) {
      console.error(error);
    }
  };

  const loadTags = async () => {
    try {
      const response = await axios.get('http://localhost:3001/tag');
      setTags(response.data.data).then(() => {});
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadTags();
  }, []);

  return (
    <div>
      <h2 className='text-2xl text-gray-900 dark:text-white font-semibold mb-5 pt-5 text-center'>
        Add Note
      </h2>
      <div className='flex justify-center'>
        <div className='w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-xl pb-5 dark:bg-gray-800 dark:border-gray-700'>
          <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
            <form onSubmit={handleSubmit}>
              <div className='mb-6'>
                <label
                  htmlFor='title'
                  className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                >
                  Title
                </label>
                <input
                  type='text'
                  id='title'
                  name='title'
                  value={title}
                  onChange={handleTitleChange}
                  className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  placeholder=''
                  required
                />
              </div>
              <div className='mb-6'>
                <label
                  htmlFor='content'
                  className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                >
                  Content
                </label>
                <textarea
                  rows='4'
                  id='content'
                  name='content'
                  value={content}
                  onChange={handleContentChange}
                  className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  required
                />
              </div>
              <div className='flex items-start mb-6'>
                <div>
                  <label
                    htmlFor='tag'
                    className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                  >
                    Tags
                  </label>
                  {tags.map((tag) => (
                    <div className='flex items-center mb-4' key={tag.id}>
                      <input
                        type='checkbox'
                        id={`tag-${tag.id}`}
                        name='tag'
                        value={tag.id}
                        checked={selectedTags.includes(tag.id)}
                        onChange={handleTagChange}
                        className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                      />
                      <label
                        htmlFor='default-checkbox'
                        className='ml-2 text-sm font-medium text-gray-900 dark:text-gray-300'
                      >
                        {tag.name}
                      </label>
                    </div>
                  ))}
                </div>
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
