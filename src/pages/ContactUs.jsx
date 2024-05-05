import Container from '../components/container/Container';
import { useForm } from 'react-hook-form';
import Input from '../components/Input';
import TextArea from '../components/TextArea';
import Button from '../components/Button';

export default function ContactUs() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    // TODO add email service
    console.log(data);

    reset();
  };
  return (
    <div className='md:w-[50%] w-full py-8 mx-auto'>
      <Container>
        <h1 className='mb-4 h2'>Contact Us</h1>
        <p className='mb-4'>
          If you have any questions or would like to get in touch, please fill out the form below.
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
          <Input
            label='Your Name'
            {...register('name', { required: 'Name is required' })}
            type='text'
            className={errors.name && 'border-red-500'}
          />
          {errors.name && <p className='text-sm text-red-500'>{errors.name.message}</p>}

          <Input
            label='Your Email'
            {...register('email', {
              required: 'Email is required',
              pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' },
            })}
            type='email'
            className={errors.email && 'border-red-500'}
          />
          {errors.email && <p className='text-sm text-red-500'>{errors.email.message}</p>}

          <TextArea
            label='Your Message'
            {...register('message', { required: 'Message is required' })}
            className={errors.message && 'border-red-500'}
          />
          {errors.message && <p className='text-sm text-red-500'>{errors.message.message}</p>}

          <Button type='submit'>Send Message</Button>
        </form>
      </Container>
    </div>
  );
}
