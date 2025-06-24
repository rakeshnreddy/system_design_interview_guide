import React from 'react';
import PropTypes from 'prop-types';

const SearchInput = ({ value, onChange, placeholder = "Search..." }) => {
  const handleChange = (event) => {
    onChange(event.target.value);
  };

  return (
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      style={{
        padding: '10px 15px',
        fontSize: '16px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        width: '100%', // Make it responsive
        maxWidth: '400px', // Max width for larger screens
        boxSizing: 'border-box', // Include padding and border in the element's total width and height
        margin: '10px 0',
      }}
    />
  );
};

SearchInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};

export default SearchInput;
