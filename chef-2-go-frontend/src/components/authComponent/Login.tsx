// react imports
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { setCurrentUser, setIsLoogedIn } from '../../store/slice/user-slice';
// material ui imports
import { Button, TextField, Typography, CardContent, CardActions } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { PersonPinCircleOutlined, EmailOutlined, VpnKeyOutlined } from '@mui/icons-material';
import Alert from '@mui/material/Alert';

//css import
import './Login.css';
import { Link } from 'react-router-dom';
import { loginUserService } from '../../services/UserAPI';

type Props = {

}
const Login = (props: Props) => {

    // React Hooks
    // State hooks to handle the current state of the component
    const location = useLocation();
    const dispatch = useDispatch();

    const navigate = useNavigate();
    
    
    const [email, setEmail] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [btnVarinat, setBtnVariant] = useState<'contained' | 'outlined'>('outlined');
    const [showPassword, setShowPassword] = useState(false);
    const [redirectTo, setRedirectTo] = useState('/');
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        // If the user directly lands on the login page, set redirectTo to home page
        if (location.state && location.state.from === '/') {
          setRedirectTo('/'); // Set to home page
        } else {
          // Otherwise, set redirectTo to the previous page
          setRedirectTo(location.state?.from || '/');
        }
      }, [location.state]);
    // event handlers for mouse events and keyboard events
    const handleMouseEnter = () => {
        setBtnVariant('contained');
    }

    const handleMouseLeave = () => {
        setBtnVariant('outlined');
    }

    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (e?.target?.value) {
            setEmail(e?.target?.value);
        }
    }

    const handleUserNameChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (e?.target?.value) {
            setUsername(e?.target?.value);
        }
    }
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (e?.target?.value) {
            setPassword(e?.target?.value);
        }
    }

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const reqBody = {
            email: email,
            username: username,
            password: password
        }
        try{
      // Call login API service
        const response = await loginUserService(reqBody);
    // Store token and user details in local storage

        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
         // Update Redux store with user details and set login state
        dispatch(setIsLoogedIn(true));
        dispatch(setCurrentUser(response.data.user));
        setIsError(false);
        navigate(redirectTo);
        } catch (error) {
            setIsError(true)
        };
    }


    return (
        <div className="flex flex-col">
            {isError && <Alert severity="error">Please check your credentials and try again</Alert>}
            <CardContent >
                <form onSubmit={handleLogin} className="signin-form flex flex-col justify-center h-screen items-center gap-5">
                    <div className="tagline-container">
                        <Typography variant="h5" gutterBottom style={{ fontFamily: 'Agbalumo, Dancing Script, Neucha, sans-serif' }}>
                            Unlock Culinary Delights with a Click
                        </Typography>
                    </div>
                    <div className="icon-container">
                        <   img src="" alt="" />
                    </div>
                    <div className="username-container w-1/2 flex gap-2 items-center">
                        <PersonPinCircleOutlined fontSize="large" />
                        <TextField
                            required
                            id="outlined-required"
                            label="User Name"
                            placeholder="basupatil1213"
                            className="username-input w-full"
                            onChange={handleUserNameChange}
                        />
                    </div>
                    <div className="email-container w-1/2 flex gap-2 items-center">
                        <EmailOutlined fontSize="large" />
                        <TextField
                            required
                            id="outlined-required"
                            label="Email"
                            placeholder="patil.ba@northeastern.edu"
                            className="email-input w-full"
                            onChange={handleEmailChange}
                        />
                    </div>
                    {(email !== '' || username !== '') &&
                        <div className="password-container w-1/2 flex gap-2 items-center">
                            <VpnKeyOutlined fontSize="large" />
                            <TextField
                                id="outlined-password-input-required"
                                label="Password*"
                                type={showPassword ? 'text' : 'password'}
                                autoComplete="current-password"
                                className="password-input w-full"
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={handleTogglePasswordVisibility} edge="end">
                                                {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                                onChange={handlePasswordChange}
                            />
                        </div>
                    }
                    <div className="login-note-container">
                        <Typography variant="body2" gutterBottom >
                            note: sign in using username or email
                        </Typography>
                    </div>

                    <div className="flex items-center justify-center">
                            <Typography variant="body2" gutterBottom >
                                Don't have an account? &nbsp;
                            <Link to="/signup" className="signup-link hover:border-b-2 border-black">
                                Sign Up
                            </Link>
                            </Typography>
                        </div>

                    <CardActions>

                        <div className="button-container block">
                            <Button
                                variant={btnVarinat}
                                className="signin-button"
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                                // handles mouse clicked and left
                                type='submit'
                            >Sign In
                            </Button>
                        </div>
                        <br />
                        
                    </CardActions>
                </form>
            </CardContent>
        </div >
    );
}

export default Login;

