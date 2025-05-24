import styled from 'styled-components';

export const Container = styled.div`
   width: 100svw;
`;

export const FormContainer = styled.div`
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

export const FormTitle = styled.h2`
  margin-bottom: 1.5rem;
  color: #333;
  text-align: center;
`;

export const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

export const FormLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #555;
`;

export const FormInput = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.2s;

  &:focus {
    border-color: #4a90e2;
    outline: none;
  }
`;

export const FormTextarea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  font-family: inherit;
  transition: border-color 0.2s;

  &:focus {
    border-color: #4a90e2;
    outline: none;
  }
`;

export const FormSelect = styled.select`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.2s;

  &:focus {
    border-color: #4a90e2;
    outline: none;
  }
`;

export const FormFileInput = styled.input`
  width: 100%;
  padding: 0.5rem;
`;

export const FormImagePreview = styled.img`
  max-width: 100%;
  max-height: 300px;
  margin-top: 1rem;
  border-radius: 4px;
  border: 1px solid #eee;
`;

export const FormButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  background-color: #4a90e2;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #3a7bc8;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

export const FormButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
`;

export const FormCancelButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  background-color: #f5f5f5;
  color: #333;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #e0e0e0;
  }
`;


export const CoordinateContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
`;

export const LocationButton = styled.button`
  padding: 8px 12px;
  background: #4285F4;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 15px;
  font-size: 0.9rem;
  
  &:hover {
    background: #3367D6;
  }
`;



// import styled from 'styled-components';

// export const FormContainer = styled.div`
//   padding: 2rem;
//   max-width: 800px;
//   margin: 0 auto;

//   @media (max-width: 768px) {
//     padding: 1.5rem;
//   }

//   @media (max-width: 480px) {
//     padding: 1rem;
//   }
// `;

// export const FormTitle = styled.h2`
//   color: #2c3e50;
//   margin-bottom: 2rem;
//   font-size: 1.8rem;

//   @media (max-width: 480px) {
//     font-size: 1.5rem;
//     margin-bottom: 1.5rem;
//   }
// `;

// export const FormGroup = styled.div`
//   margin-bottom: 1.5rem;
// `;

// export const FormLabel = styled.label`
//   display: block;
//   margin-bottom: 0.5rem;
//   font-weight: 600;
//   color: #2c3e50;
// `;

// export const FormInput = styled.input`
//   width: 100%;
//   padding: 0.75rem 1rem;
//   border: 1px solid #ddd;
//   border-radius: 4px;
//   font-size: 1rem;
//   transition: border-color 0.3s;

//   &:focus {
//     outline: none;
//     border-color: #3498db;
//   }
// `;

// export const FormTextarea = styled.textarea`
//   width: 100%;
//   padding: 0.75rem 1rem;
//   border: 1px solid #ddd;
//   border-radius: 4px;
//   font-size: 1rem;
//   min-height: 150px;
//   resize: vertical;
//   transition: border-color 0.3s;

//   &:focus {
//     outline: none;
//     border-color: #3498db;
//   }
// `;

// export const FormSelect = styled.select`
//   width: 100%;
//   padding: 0.75rem 1rem;
//   border: 1px solid #ddd;
//   border-radius: 4px;
//   font-size: 1rem;
//   transition: border-color 0.3s;

//   &:focus {
//     outline: none;
//     border-color: #3498db;
//   }
// `;

// export const FormFileInput = styled.input`
//   width: 100%;
//   padding: 0.5rem;
//   border: 1px dashed #ddd;
//   border-radius: 4px;
//   font-size: 0.9rem;
// `;

// export const FormButton = styled.button`
//   padding: 0.75rem 1.5rem;
//   background-color: #3498db;
//   color: white;
//   border: none;
//   border-radius: 4px;
//   font-size: 1rem;
//   font-weight: 600;
//   cursor: pointer;
//   transition: background-color 0.3s;

//   &:hover:not(:disabled) {
//     background-color: #2980b9;
//   }

//   &:disabled {
//     background-color: #95a5a6;
//     cursor: not-allowed;
//   }
// `;

// export const FormImagePreview = styled.img`
//   max-width: 100%;
//   max-height: 300px;
//   margin-top: 1rem;
//   border-radius: 4px;
//   object-fit: cover;
// `;