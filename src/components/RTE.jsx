import { Controller } from 'react-hook-form';

function RTE({ name, control, label, defaultValue = '' }) {
  return (
    <div className='w-full'>
      {label && <label className='inline-block pl-1 mb-1'> {label}</label>}
      <Controller
        name={name || 'content'}
        control={control}
        render={({ field: { onChange } }) => 'Editor'}
      />
    </div>
  );
}

export default RTE;
