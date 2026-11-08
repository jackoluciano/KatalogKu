import { useState } from 'react';

export default function useForm(initialValues, validate) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const handleChange = (field) => (text) => {
    setValues((previous) => ({ ...previous, [field]: text }));
    setErrors((previous) => ({ ...previous, [field]: null }));
  };

  const handleSubmit = (onValid) => () => {
    const newErrors = validate(values);
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      onValid(values);
    }
  };

  const reset = () => {
    setValues(initialValues);
    setErrors({});
  };

  return { values, errors, handleChange, handleSubmit, reset };
}
