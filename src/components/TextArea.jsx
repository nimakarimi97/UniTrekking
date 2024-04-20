import React, { useId } from 'react';
import PropTypes from 'prop-types';

const TextArea = React.forwardRef(function Input({ label, className = '', ...props }, ref) {
  const id = useId();
  return (
    <div className='w-full'>
      {label && (
        <label htmlFor={id} className='block text-gray-300 text-sm font-medium mb-1'>
          {label}
        </label>
      )}
      <textarea
        className={`form-input w-full text-gray-300 ${className}`}
        ref={ref}
        {...props}
        id={id}
      />
    </div>
  );
});

TextArea.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  className: PropTypes.string,
};

export default TextArea;
