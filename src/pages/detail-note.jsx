import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import jsPDF from 'jspdf';

const BASE_URL = import.meta.env.VITE_BASE_URL_API;

export default function detailNote() {
  const [noteTag, setNoteTag] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/note/${id}`);
        setNoteTag(response.data.data);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchData();
  }, []);

  const exportToPDF = () => {
    const doc = new jsPDF();

    noteTag.forEach((note) => {
      doc.setFontSize(16);
      doc.text(note.title, 10, 10);
      doc.setFontSize(12);
      doc.text(note.content, 10, 20);
      let y = 30;
      note.Tag.forEach((tag) => {
        doc.text(tag.name, 10, y);
        y += 10;
      });
      doc.addPage();
    });

    doc.save('notes.pdf');
  };

  return (
    <div>
      <h2 className='text-2xl text-gray-900 dark:text-white font-semibold mb-5 pt-5 text-center'>
        Detail Note
      </h2>
      <div className='flex justify-center'>
        <div className='w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-xl pb-5 dark:bg-gray-800 dark:border-gray-600'>
          {noteTag.map((note) => (
            <div className='p-6 space-y-4 md:space-y-6 sm:p-8' key={note.id}>
              <h2 className='text-xl'>{note.title}</h2>
              <p className='text-lg'>{note.content}</p>
              <div className='flex'>
                {note.Tag.map((tag) => (
                  <div className='' key={tag.id}>
                    <span className='bg-gray-100 text-gray-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-gray-600 dark:text-gray-300'>
                      {tag.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <button
            onClick={exportToPDF}
            className='text-white ml-5 bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-600 dark:focus:ring-red-800'
          >
            Export to pdf
          </button>
        </div>
      </div>
    </div>
  );
}
