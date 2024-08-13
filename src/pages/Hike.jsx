import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import appwriteService from '../appwrite/config';
import Button from '../components/Button';
import Container from '../components/container/Container';
import parse from 'html-react-parser';
import { useSelector } from 'react-redux';

export default function Hike() {
  const [hike, setHike] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const isAuthor = hike && userData ? hike.userId === userData.$id : false;

  useEffect(() => {
    if (slug) {
      appwriteService.getHike(slug).then((hike) => {
        if (hike) {
          setHike(hike);
        } else {
          navigate('/');
        }
      });
    }
  }, [slug, navigate]);

  const deleteHike = () => {
    appwriteService.deleteHike(hike.$id).then((status) => {
      if (status) {
        appwriteService.deleteFile(hike.featuredImage);
        navigate('/');
      }
    });
  };
  return hike ? (
    <div className='py-8'>
      <Container>
        <div className='relative flex justify-center w-full p-2 mb-4 border rounded-xl'>
          <img
            src={appwriteService.getFilePreview(hike.featuredImage)}
            alt={hike.title}
            className='rounded-xl'
          />
          {isAuthor && (
            <div className='absolute-right-6 top-6'>
              <Link to={`/edit-hike/${hike.$id}`}>
                <Button bgColor='bg-green-500' className='mr-3'>
                  Edit
                </Button>
              </Link>
              <Button bgColor='bg-red-500' onClick={deleteHike}>
                Delete
              </Button>
            </div>
          )}
        </div>
        <div className='w-full mb-6'>
          <h1 className='text-2xl font-bold'>{hike.title}</h1>
          <div className='browser-css'>{parse(hike.content)}</div>
        </div>
      </Container>
    </div>
  ) : null;
}
