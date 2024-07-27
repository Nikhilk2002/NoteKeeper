import React, { useState } from 'react';
import { addNotes } from '../../Services/UserApi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

const Addnote = () => {
  const [values, setValues] = useState({
    title: '',
    content: ''
  });

  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState(null);

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

  const handleBlur = () => {
    validate();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        console.log('Submitting note:', values);
        await addNotes(values);

        // Clear the input fields
        setValues({
          title: '',
          content: ''
        });

        // Optionally, you can also clear errors if you want
        setErrors({});
        setSubmitError(null);
        
      } catch (error) {
        console.error('Error adding note:', error);
        setSubmitError(error.message || 'Failed to add note');
      }
    }
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-6">Add Note</h2>
      {submitError && <div className="text-red-500 mb-4">{submitError}</div>}
      <form onSubmit={handleSubmit} className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-lg relative">
        <div className="mb-4">
          <input
            id="title"
            name="title"
            type="text"
            placeholder="Title"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.title}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {errors.title && (
            <div className="text-red-500 text-sm mt-1">{errors.title}</div>
          )}
        </div>

        <div className="mb-6">
          <textarea
            id="content"
            name="content"
            placeholder="Content"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.content}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm min-h-[100px]"
          />
          {errors.content && (
            <div className="text-red-500 text-sm mt-1">{errors.content}</div>
          )}
        </div>

        <button
          type="submit"
          className="absolute bottom-6 right-6 text-indigo-600 hover:text-indigo-700 focus:outline-none"
        >
          <FontAwesomeIcon icon={faPaperPlane} size="lg" />
        </button>
      </form>
    </div>
  );
};

export default Addnote;
