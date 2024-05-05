import appwriteService from '../appwrite/config';
import { useState } from 'react';
import { useEffect } from 'react';
import Container from '../components/container/Container';

export default function Home() {
  const [hikes, setHikes] = useState([]);

  useEffect(() => {
    appwriteService.getHikes([]).then((hikes) => {
      if (hikes) setHikes(hikes.documents);
    });
  }, []);

  return (
    <div className='w-full py-8'>
      <Container>
        <h1>Home page</h1>
        <p>number of hikes: {hikes.length}</p>
      </Container>
    </div>
  );
}
