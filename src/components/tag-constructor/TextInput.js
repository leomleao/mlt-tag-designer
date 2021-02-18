import React from 'react';

export default function TextInput({ onChange }) {
  return (
    <div className="form__group field">
      <input
        type="text"
        className="form__field"
        placeholder="Desired name:"
        name="name"
        id="desiredName"
        onChange={onChange}
      />
      <label htmlFor="desiredName" className="form__label">
        Desired name:
      </label>
    </div>
  );
}
