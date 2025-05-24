import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { login, register } from '../../redux/actions/authActions';
import {
  AuthContainer,
  AuthForm,
  AuthTitle,
  AuthInput,
  AuthButton,
  AuthToggle,
  AuthError,
} from '../../components/auth/AuthStyles';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        await dispatch(login({ 
          email: formData.email, 
          password: formData.password 
        }));
        toast.success('Logged in successfully');
      } else {
        await dispatch(register(formData));
        toast.success('Registered successfully');
      }
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.message || 'Authentication failed');
    }
  };

  // Redirect if already authenticated
  if (isAuthenticated) {
    navigate('/dashboard');
    return null;
  }

  return (
    <AuthContainer>
      <AuthForm onSubmit={handleSubmit}>
        <AuthTitle>{isLogin ? 'Login' : 'Register'}</AuthTitle>
        {error && <AuthError>{error}</AuthError>}
        
        {!isLogin && (
          <AuthInput
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        )}
        
        <AuthInput
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <AuthInput
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <AuthButton type="submit" disabled={loading}>
          {loading ? 'Processing...' : isLogin ? 'Login' : 'Register'}
        </AuthButton>
        <AuthToggle onClick={() => setIsLogin(!isLogin)}>
          {isLogin
            ? "Don't have an account? Register"
            : 'Already have an account? Login'}
        </AuthToggle>
      </AuthForm>
    </AuthContainer>
  );
};

export default AuthPage;

// import { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-hot-toast';
// import { loginUser, registerUser } from '../../features/authSlice';
// import {
//   AuthContainer,
//   AuthForm,
//   AuthTitle,
//   AuthInput,
//   AuthButton,
//   AuthToggle,
//   AuthError,
// } from '../../components/auth/AuthStyles';

// const AuthPage = () => {
//   const [isLogin, setIsLogin] = useState(true);
//   const [formData, setFormData] = useState({
//     username: '',
//     email: '',
//     password: '',
//   });
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { status, error } = useSelector((state) => state.auth);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (isLogin) {
//       const result = await dispatch(loginUser({ 
//         email: formData.email, 
//         password: formData.password 
//       }));
//       if (loginUser.fulfilled.match(result)) {
//         toast.success('Logged in successfully');
//         navigate('/dashboard');
//       }
//     } else {
//       const result = await dispatch(registerUser(formData));
//       if (registerUser.fulfilled.match(result)) {
//         toast.success('Registered successfully');
//         navigate('/dashboard');
//       }
//     }
//   };

//   return (
//     <AuthContainer>
//       <AuthForm onSubmit={handleSubmit}>
//         <AuthTitle>{isLogin ? 'Login' : 'Register'}</AuthTitle>
//         {error && <AuthError>{error}</AuthError>}
        
//         {!isLogin && (
//           <AuthInput
//             type="text"
//             name="username"
//             placeholder="Username"
//             value={formData.username}
//             onChange={handleChange}
//             required
//           />
//         )}
        
//         <AuthInput
//           type="email"
//           name="email"
//           placeholder="Email"
//           value={formData.email}
//           onChange={handleChange}
//           required
//         />
//         <AuthInput
//           type="password"
//           name="password"
//           placeholder="Password"
//           value={formData.password}
//           onChange={handleChange}
//           required
//         />
//         <AuthButton type="submit" disabled={status === 'loading'}>
//           {status === 'loading' ? 'Processing...' : isLogin ? 'Login' : 'Register'}
//         </AuthButton>
//         <AuthToggle onClick={() => setIsLogin(!isLogin)}>
//           {isLogin
//             ? "Don't have an account? Register"
//             : 'Already have an account? Login'}
//         </AuthToggle>
//       </AuthForm>
//     </AuthContainer>
//   );
// };

// export default AuthPage;