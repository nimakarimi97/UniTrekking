import appwriteService from '../appwrite/config';
import { useState } from 'react';
import { useEffect } from 'react';
import Container from '../components/container/Container';

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    appwriteService.getPosts([]).then((posts) => {
      if (posts) setPosts(posts.documents);
    });
  }, []);

  return (
    <div className='w-full py-8'>
      <Container>
        <h1>Home page</h1>
        <p>number of hikes: {posts.length}</p>
      </Container>
    </div>
  );
}

export default Home;
