import appwriteService from '../appwrite/config';
import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Container from '../components/container/Container';

function AllHikes() {
  const [hikes, setHikes] = useState([]);

  useEffect(() => {
    appwriteService.getHikes([]).then((hikes) => {
      if (hikes) setHikes(hikes.documents);
    });
  }, []);

  if (hikes.length === 0)
    return (
      <Container>
        <h1>No hikes found</h1>
      </Container>
    );

  return (
    <div className='w-full py-8'>
      <Container>
        <div className='flex flex-wrap'>
          {hikes.map(({ $id, title, featuredImage }) => (
            <div className='w-1/4 p-2' key={$id}>
              <Link to={`/hike/${$id}`}>
                <div className='w-full p-4 bg-gray-100 rounded-xl'>
                  <div className='justify-center w-full mb-4'>
                    <img
                      src={appwriteService.getFilePreview(featuredImage)}
                      alt={title}
                      className='rounded-xl'
                    />
                  </div>
                  <h2 className='text-xl font-bold'>{title}</h2>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default AllHikes;
