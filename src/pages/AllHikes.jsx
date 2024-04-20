import appwriteService from '../appwrite/config';
import { useState } from 'react';
import { useEffect } from 'react';
import Container from '../components/container/Container';
import PostCard from '../components/PostCard';

function AllHikes() {
  const [hikes, setHikes] = useState([]);

  useEffect(() => {
    appwriteService.getPosts([]).then((hikes) => {
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
          {hikes.map((hike) => (
            <div className='w-1/4 p-2' key={hike.$id}>
              <PostCard {...hike} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default AllHikes;
