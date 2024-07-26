import React, { useState } from 'react';
import './Addnote.css';
import { useNavigate } from 'react-router-dom';

const Addnote = () => {
  const [values, setValues] = useState({
    title: '',
    content: ''
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const validate = () => {
    const errors = {};
    if (!values.title) {
      errors.title = 'Required';
    } else if (values.title.length > 15) {
      errors.title = 'Must be 15 characters or less';
    }

    if (!values.content) {
      errors.content = 'Required';
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value
    });
  };

  const handleBlur = (e) => {
    validate();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      navigate('/allnotes');
    }
  };

  return (
    <div className="addnote-container">
      <h2>Add Note</h2>
      <form onSubmit={handleSubmit}>
        <div className='content-heade'> 
          <label htmlFor="title">Title</label>
          <input
            id="title"
            name="title"
            type="text"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.title}
          />
          {errors.title && (
            <div className="error">{errors.title}</div>
          )}
        </div>

        <div className='content-heade'>
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            name="content"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.content}
          />
          {errors.content && (
            <div className="error">{errors.content}</div>
          )}
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Addnote;
