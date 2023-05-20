import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Main from './pages/home';
import AddNote from './pages/add-notes';
import AddTag from './pages/add-tag';
import DetailNote from './pages/detail-note';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
  },
  {
    path: '/add-note',
    element: <AddNote />,
  },
  {
    path: '/add-tag',
    element: <AddTag />,
  },
  {
    path: '/note-detail/:id',
    element: <DetailNote />,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
export default App;
