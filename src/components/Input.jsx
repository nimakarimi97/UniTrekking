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
        <label htmlFor={id} className='block text-gray-300 text-sm font-medium mb-1'>
          {label}
        </label>
      )}
      <input
        className={`form-input w-full text-gray-300 ${className}`}
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
