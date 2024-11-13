import React, { useState } from 'react';
import { TextField, Button, Select, MenuItem } from '@mui/material';

const EditForm = ({ security }) => {
  const [formData, setFormData] = useState({ ...security });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    // Submit the updated data
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Description"
        name="description"
        value={formData.description}
        onChange={handleChange}
        fullWidth
      />
      <Select name="pfCreditRating" value={formData.pfCreditRating} onChange={handleChange}>
        <MenuItem value="AAA">AAA</MenuItem>
        <MenuItem value="AA">AA</MenuItem>
        <MenuItem value="A">A</MenuItem>
      </Select>
      <Button type="submit">Update</Button>
    </form>
  );
};

export default EditForm;
