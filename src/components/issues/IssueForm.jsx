import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { addIssue, editIssue, fetchIssueById, clearCurrentIssue } from '../../features/issueSlice';
import {
  FormContainer,
  FormTitle,
  FormGroup,
  FormLabel,
  FormInput,
  FormTextarea,
  FormSelect,
  FormFileInput,
  FormButton,
  FormImagePreview,
} from './FormStyles';

const IssueForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = !!id;

  const { currentIssue, status } = useSelector((state) => state.issues);
  const { user } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Road',
    location: '',
    image: null,
    previewImage: null,
  });

  useEffect(() => {
    if (isEditing) {
      dispatch(fetchIssueById(id));
    }

    return () => {
      if (isEditing) {
        dispatch(clearCurrentIssue());
      }
    };
  }, [id, isEditing, dispatch]);

  useEffect(() => {
    if (isEditing && currentIssue) {
      setFormData({
        title: currentIssue.title,
        description: currentIssue.description,
        category: currentIssue.category,
        location: currentIssue.location,
        image: null,
        previewImage: currentIssue.image
          ? `${import.meta.env.VITE_API_URL}/${currentIssue.image}`
          : null,
      });
    }
  }, [currentIssue, isEditing]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setFormData({
        ...formData,
        image: e.target.files[0],
        previewImage: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const issueData = new FormData();
    issueData.append('title', formData.title);
    issueData.append('description', formData.description);
    issueData.append('category', formData.category);
    issueData.append('location', formData.location);
    if (formData.image) {
      issueData.append('image', formData.image);
    }

    try {
      if (isEditing) {
        await dispatch(editIssue({ id, issueData })).unwrap();
        toast.success('Issue updated successfully');
      } else {
        await dispatch(addIssue(issueData)).unwrap();
        toast.success('Issue created successfully');
      }
      navigate('/issues');
    } catch (error) {
      toast.error(error.message || 'Something went wrong');
    }
  };

  return (
    <FormContainer>
      <FormTitle>{isEditing ? 'Edit Issue' : 'Report New Issue'}</FormTitle>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <FormLabel>Title</FormLabel>
          <FormInput
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <FormLabel>Description</FormLabel>
          <FormTextarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <FormLabel>Category</FormLabel>
          <FormSelect
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="Road">Road</option>
            <option value="Water">Water</option>
            <option value="Sanitation">Sanitation</option>
            <option value="Electricity">Electricity</option>
            <option value="Other">Other</option>
          </FormSelect>
        </FormGroup>

        <FormGroup>
          <FormLabel>Location</FormLabel>
          <FormInput
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <FormLabel>Image (Optional)</FormLabel>
          <FormFileInput type="file" accept="image/*" onChange={handleImageChange} />
          {formData.previewImage && (
            <FormImagePreview src={formData.previewImage} alt="Preview" />
          )}
        </FormGroup>

        <FormButton type="submit" disabled={status === 'loading'}>
          {status === 'loading'
            ? 'Processing...'
            : isEditing
            ? 'Update Issue'
            : 'Submit Issue'}
        </FormButton>
      </form>
    </FormContainer>
  );
};

export default IssueForm;