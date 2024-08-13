import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import appwriteService from '../appwrite/config';
import { useEffect } from 'react';
import Container from '../components/container/Container';
import HikeForm from '../components/hike-form/HikeForm';

function EditHike() {
  const [hike, setHike] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (slug) {
      appwriteService.getHike(slug).then((hike) => {
        if (hike) setHike(hike);
        else navigate('/');
      });
    }
  }, [slug, navigate]);

  return (
    <div className='py-6'>
      <Container>
        <HikeForm hike={hike} />
      </Container>
    </div>
  );
}

export default EditHike;
