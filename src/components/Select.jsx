import React, { useId } from 'react';
import PropTypes from 'prop-types';

const Select = React.forwardRef(function Select({ options, label, className, ...props }, ref) {
  const id = useId();
  return (
    <div className='w-full'>
      {label && (
        <label htmlFor={id} className='block text-gray-300 text-sm font-medium mb-1'>
          {label}
        </label>
      )}
      <select
        {...props}
        id={id}
        ref={ref}
        className={`form-select btn text-white bg-purple-600 hover:bg-purple-700 w-full ${className}`}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
});

Select.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  label: PropTypes.string,
  className: PropTypes.string,
};

export default Select;
