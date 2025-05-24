import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import {
  createIssue,
  updateIssue,
  fetchIssueById,
  clearCurrentIssue,
} from "../../redux/actions/issueActions";
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
  FormButtonGroup,
  FormCancelButton,
  Container,
  CoordinateContainer,
  LocationButton,
} from "./FormStyles";

const IssueForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = !!id;

  const { currentIssue, status } = useSelector((state) => state.issues);
  const { user } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "Road",
    location: "", // This can remain as text location
    latitude: "",
    longitude: "",
    image: null,
    previewImage: null,
  });

  useEffect(() => {
    if (isEditing) {
      dispatch(fetchIssueById(id));
    }

    return () => {
      dispatch(clearCurrentIssue());
    };
  }, [id, isEditing, dispatch]);

  useEffect(() => {
    if (isEditing && currentIssue) {
      setFormData({
        title: currentIssue.title,
        description: currentIssue.description,
        category: currentIssue.category,
        location: currentIssue.location,
        latitude: currentIssue.latitude || "",
        longitude: currentIssue.longitude || "",
        image: null,
        previewImage: currentIssue.image,
      });
    }
  }, [currentIssue, isEditing]);

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData({
            ...formData,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          toast.success("Location detected successfully");
        },
        (error) => {
          toast.error("Unable to retrieve your location");
          console.error("Geolocation error:", error);
        }
      );
    } else {
      toast.error("Geolocation is not supported by your browser");
    }
  };

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

  const handleRemoveImage = () => {
    setFormData({
      ...formData,
      image: null,
      previewImage: null,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataObj = new FormData();
    formDataObj.append("title", formData.title);
    formDataObj.append("description", formData.description);
    formDataObj.append("category", formData.category);
    formDataObj.append("location", formData.location);

    // Convert and append coordinates
    if (formData.latitude) {
      formDataObj.append("latitude", parseFloat(formData.latitude));
    }
    if (formData.longitude) {
      formDataObj.append("longitude", parseFloat(formData.longitude));
    }

    // Append image if exists
    if (formData.image) {
      formDataObj.append("image", formData.image);
    }

    // Debug: Log FormData
    for (let [key, value] of formDataObj.entries()) {
      console.log(key, value);
    }

    try {
      if (isEditing) {
        await dispatch(updateIssue({ id, issueData: formDataObj }));
        toast.success("Issue updated successfully");
      } else {
        await dispatch(createIssue(formDataObj));
        toast.success("Issue created successfully");
      }
      navigate(isEditing ? `/issues/${id}` : "/issues");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to submit issue";
      toast.error(errorMessage);
      console.error("Submission error:", error.response?.data);
    }
  };
  if (isEditing && status === "loading") {
    return <div>Loading issue data...</div>;
  }

  return (
    <Container>
      <FormContainer>
        <FormTitle>{isEditing ? "Edit Issue" : "Report New Issue"}</FormTitle>
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <FormLabel>Title *</FormLabel>
            <FormInput
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </FormGroup>

          <FormGroup>
            <FormLabel>Description *</FormLabel>
            <FormTextarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="5"
              required
            />
          </FormGroup>

          <FormGroup>
            <FormLabel>Category *</FormLabel>
            <FormSelect
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="Road">Road</option>
              <option value="Water">Water</option>
              <option value="Sanitation">Sanitation</option>
              <option value="Electricity">Electricity</option>
              <option value="Other">Other</option>
            </FormSelect>
          </FormGroup>

          <FormGroup>
            <FormLabel>Location *</FormLabel>
            <FormInput
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              placeholder="Street address or location name"
            />
          </FormGroup>

          <FormGroup>
            <FormLabel>Coordinates</FormLabel>
            <CoordinateContainer>
              <FormInput
                type="number"
                name="latitude"
                value={formData.latitude}
                onChange={handleChange}
                placeholder="Latitude"
                step="any"
              />
              <FormInput
                type="number"
                name="longitude"
                value={formData.longitude}
                onChange={handleChange}
                placeholder="Longitude"
                step="any"
              />
            </CoordinateContainer>
            <LocationButton type="button" onClick={getCurrentLocation}>
              Use My Current Location
            </LocationButton>
          </FormGroup>
          <FormGroup>
            <FormLabel>Image {!isEditing && "(Optional)"}</FormLabel>
            <FormFileInput
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
            {formData.previewImage && (
              <div>
                <FormImagePreview src={formData.previewImage} alt="Preview" />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  style={{
                    marginTop: "8px",
                    padding: "4px 8px",
                    background: "#ff4444",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  Remove Image
                </button>
              </div>
            )}
          </FormGroup>

          <FormButtonGroup>
            <FormButton type="submit" disabled={status === "loading"}>
              {status === "loading"
                ? "Processing..."
                : isEditing
                ? "Update Issue"
                : "Submit Issue"}
            </FormButton>
            <FormCancelButton
              type="button"
              onClick={() => navigate(isEditing ? `/issues/${id}` : "/issues")}
            >
              Cancel
            </FormCancelButton>
          </FormButtonGroup>
        </form>
      </FormContainer>
    </Container>
  );
};

export default IssueForm;

// import { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate, useParams } from 'react-router-dom';
// import { toast } from 'react-hot-toast';
// import { addIssue, editIssue, fetchIssueById, clearCurrentIssue } from '../../redux/actions/issueActions';
// import {
//   FormContainer,
//   FormTitle,
//   FormGroup,
//   FormLabel,
//   FormInput,
//   FormTextarea,
//   FormSelect,
//   FormFileInput,
//   FormButton,
//   FormImagePreview,
// } from './FormStyles';

// const IssueForm = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { id } = useParams();
//   const isEditing = !!id;

//   const { currentIssue, status } = useSelector((state) => state.issues);
//   const { user } = useSelector((state) => state.auth);

//   const [formData, setFormData] = useState({
//     title: '',
//     description: '',
//     category: 'Road',
//     location: '',
//     image: null,
//     previewImage: null,
//   });

//   useEffect(() => {
//     if (isEditing) {
//       dispatch(fetchIssueById(id));
//     }

//     return () => {
//       if (isEditing) {
//         dispatch(clearCurrentIssue());
//       }
//     };
//   }, [id, isEditing, dispatch]);

//   useEffect(() => {
//     if (isEditing && currentIssue) {
//       setFormData({
//         title: currentIssue.title,
//         description: currentIssue.description,
//         category: currentIssue.category,
//         location: currentIssue.location,
//         image: null,
//         previewImage: currentIssue.image
//           ? `${import.meta.env.VITE_API_URL}/${currentIssue.image}`
//           : null,
//       });
//     }
//   }, [currentIssue, isEditing]);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleImageChange = (e) => {
//     if (e.target.files[0]) {
//       setFormData({
//         ...formData,
//         image: e.target.files[0],
//         previewImage: URL.createObjectURL(e.target.files[0]),
//       });
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const issueData = new FormData();
//     issueData.append('title', formData.title);
//     issueData.append('description', formData.description);
//     issueData.append('category', formData.category);
//     issueData.append('location', formData.location);
//     if (formData.image) {
//       issueData.append('image', formData.image);
//     }

//     try {
//       if (isEditing) {
//         await dispatch(editIssue({ id, issueData })).unwrap();
//         toast.success('Issue updated successfully');
//       } else {
//         await dispatch(addIssue(issueData)).unwrap();
//         toast.success('Issue created successfully');
//       }
//       navigate('/issues');
//     } catch (error) {
//       toast.error(error.message || 'Something went wrong');
//     }
//   };

//   return (
//     <FormContainer>
//       <FormTitle>{isEditing ? 'Edit Issue' : 'Report New Issue'}</FormTitle>
//       <form onSubmit={handleSubmit}>
//         <FormGroup>
//           <FormLabel>Title</FormLabel>
//           <FormInput
//             type="text"
//             name="title"
//             value={formData.title}
//             onChange={handleChange}
//             required
//           />
//         </FormGroup>

//         <FormGroup>
//           <FormLabel>Description</FormLabel>
//           <FormTextarea
//             name="description"
//             value={formData.description}
//             onChange={handleChange}
//             required
//           />
//         </FormGroup>

//         <FormGroup>
//           <FormLabel>Category</FormLabel>
//           <FormSelect
//             name="category"
//             value={formData.category}
//             onChange={handleChange}
//           >
//             <option value="Road">Road</option>
//             <option value="Water">Water</option>
//             <option value="Sanitation">Sanitation</option>
//             <option value="Electricity">Electricity</option>
//             <option value="Other">Other</option>
//           </FormSelect>
//         </FormGroup>

//         <FormGroup>
//           <FormLabel>Location</FormLabel>
//           <FormInput
//             type="text"
//             name="location"
//             value={formData.location}
//             onChange={handleChange}
//             required
//           />
//         </FormGroup>

//         <FormGroup>
//           <FormLabel>Image (Optional)</FormLabel>
//           <FormFileInput type="file" accept="image/*" onChange={handleImageChange} />
//           {formData.previewImage && (
//             <FormImagePreview src={formData.previewImage} alt="Preview" />
//           )}
//         </FormGroup>

//         <FormButton type="submit" disabled={status === 'loading'}>
//           {status === 'loading'
//             ? 'Processing...'
//             : isEditing
//             ? 'Update Issue'
//             : 'Submit Issue'}
//         </FormButton>
//       </form>
//     </FormContainer>
//   );
// };

// export default IssueForm;
