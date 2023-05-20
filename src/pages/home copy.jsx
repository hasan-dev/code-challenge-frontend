import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function main() {
  const navigate = useNavigate();

  const [noteTag, setNoteTag] = useState([]);
  const [tag, setTag] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/note');
        setNoteTag(response.data.data);
      } catch (error) {
        console.error(error.message);
      }
    };
    const fetchDataTags = async () => {
      try {
        const response = await axios.get('http://localhost:3001/tag');
        setTag(response.data.data);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchData();
    fetchDataTags();
  }, []);

  return (
    <div className='mx-auto container py-5 px-6'>
      <h1 className='text-4xl font-black text-gray-900 text-center dark:text-white mb-5'>
        Notes
      </h1>

      <div className='mt-5 mb-7 flex'>
        <div>
          <h2 className='text-xl text-gray-900 dark:text-white font-semibold text-center mr-4'>
            All Tags
          </h2>
        </div>

        <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
          {noteTag.map((note) => (
            <div className='rounded' key={note.id}>
              <div className='w-full h-64 flex flex-col justify-between items-start bg-blue-300 rounded-lg border border-blue-300 mb-6 py-5 px-4'>
                <div>
                  <h4 className='text-gray-800 font-bold mb-3'>{note.title}</h4>
                  <p className='text-gray-800 text-sm'>
                    {limitText(note.content, 100)}
                  </p>
                </div>
                <div className='flex'>
                  {note.Tag.map((tag) => (
                    <div className='' key={tag.id}>
                      <span className='bg-gray-100 text-gray-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-gray-700 dark:text-gray-300'>
                        {tag.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
