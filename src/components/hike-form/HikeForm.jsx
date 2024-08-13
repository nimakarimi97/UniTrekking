import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import Button from '../Button';
import Input from '../Input';
import RTE from '../RTE';
import Select from '../Select';
import appwriteService from '../../appwrite/config';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import TextArea from '../TextArea';

// TODO move it to the AddHike.jsx

export default function HikeForm({ hike }) {
  const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
    defaultValues: {
      tittle: hike?.title || '',
      slug: hike?.slug || '',
      content: hike?.content || 'placeholder for hike content',
      status: hike?.status || 'active',
    },
  });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const submit = async (data) => {
    if (hike) {
      const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;

      if (file) appwriteService.deleteFile(hike.featuredImage);

      const dbHike = await appwriteService.updateHike(hike.$id, {
        ...data,
        featuredImage: file ? file.$id : undefined,
      });

      if (dbHike) {
        navigate(`/hike/${dbHike.$id}`);
      }
    } else {
      const file = await appwriteService.uploadFile(data.image[0]);
      if (file) {
        const fileId = file.$id;
        data.featuredImage = fileId;
        const dbHike = await appwriteService.createHike({ ...data, userId: userData.$id });

        if (dbHike) {
          navigate(`/hike/${dbHike.$id}`);
        }
      }
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === 'string')
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, '-')
        .replace(/\s/g, '-');
  }, []);

  React.useEffect(() => {
    watch((value, { name }) => {
      if (name === 'title') {
        setValue('slug', slugTransform(value.title), { shouldValidate: true });
      }
    });
  }, [watch, slugTransform, setValue]);
  return (
    <form onSubmit={handleSubmit(submit)} className='flex flex-wrap'>
      <div className='w-2/3 px-2'>
        <Input
          label='Title'
          placeholder='Title'
          className='mb-4'
          {...register('title', { required: true })}
        />
        <Input
          label='Slug :'
          placeholder='Slug'
          className='mb-4'
          {...register('slug', { required: true })}
          onInput={(e) => {
            setValue('slug', slugTransform(e.currentTarget.value), { shouldValidate: true });
          }}
        />

        <Input label='Date' placeholder='Date' className='mb-4' type='date' />

        <TextArea label='Description' placeholder='Description' className='mb-4' />
        {/* <RTE
                label="Content: "
                name="content"
                control={control}
                defaultValue={getValues("content")}
                /> */}
      </div>
      <div className='px-2 1/3'>
        <Input
          label='Featured Image'
          type='file'
          className='mb-4'
          accept='image/png, image/jpg, image/jpeg'
          {...register('image', { required: !hike })}
        />
        {hike && (
          <div className='w-full mb-4'>
            <img
              src={appwriteService.getFilePreview(hike.featuredImage)}
              alt={hike.title}
              className='rounded-lg'
            />
          </div>
        )}
        <Select
          options={['active', 'inactive']}
          label='Status'
          className='mb-4'
          {...register('status', { required: true })}
        />
        <Button type='submit' bgColor={hike ? 'bg-green-500' : undefined} className='w-full'>
          {hike ? 'Update' : 'Submit'}
        </Button>
      </div>
    </form>
  );
}
