import React, { useId } from 'react';
import PropTypes from 'prop-types';

const Input = React.forwardRef(function Input(
  { label, type = 'text', className = '', ...props },
  ref,
) {
  const id = useId();
  return (
    <div className='w-full'>
      {label && (
        <label htmlFor={id} className='inline-block pl-1 mb-1'>
          {label}
        </label>
      )}
      <input
        className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
        type={type}
        ref={ref}
        {...props}
        id={id}
      />
    </div>
  );
});

Input.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  className: PropTypes.string,
};

export default Input;
