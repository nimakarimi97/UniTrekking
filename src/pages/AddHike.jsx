import Container from '../components/container/Container';
import HikeForm from '../components/hike-form/HikeForm';

function AddHike() {
  return (
    <div className='py-6'>
      <Container>
        <HikeForm />
      </Container>
    </div>
  );
}

export default AddHike;
