// react imports
import React, { useState } from 'react';

// material ui imports
import { Button, TextField, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { AccountCircleOutlined, PersonPinCircleOutlined, EmailOutlined, VpnKeyOutlined } from '@mui/icons-material';
//css import
import './Signup.css';
type Props = {

}
const Signup: React.FC<Props> = (props) => {
    // React Hooks
    // State hooks to handle the current state of the component
    const [email, setEmail] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [btnVarinat, setBtnVariant] = useState<'contained' | 'outlined'>('outlined');
    const [showPassword, setShowPassword] = useState(false);

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
    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (e?.target?.value) {
            setName(e?.target?.value);
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

    return (
        <div className="flex flex-col">
            <form className="signup-form flex flex-col justify-center h-screen items-center gap-5">
                <div className="tagline-container">
                    <Typography variant="h5" gutterBottom style={{ fontFamily: 'Agbalumo, Dancing Script, Neucha, sans-serif' }} >
                        Your Taste Journey Begins Here
                    </Typography>
                </div>
                <div className="icon-container">
                    <   img src="" alt="" />
                </div>

                {/* handle name change */}
                <div className="name-container w-1/2 flex gap-2 items-center">
                    <AccountCircleOutlined fontSize="large" />
                    <TextField
                        required
                        id="outlined-required"
                        label="Name"
                        placeholder="Basavaraj Patil"
                        className="name-input w-full"
                        onChange={handleNameChange}
                    />
                </div>

                {/* handle username change */}
                {name &&
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
                }

                {/* handle email change */}
                {username &&
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
                }

                {/* handle password change associated with the email */}
                {email &&
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
                <div className="button-container"> {/* css classes:  flex gap-2 */}
                    <Button
                        variant={btnVarinat}
                        className="signup-button"
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    >Sign up
                    </Button>
                    {/* <Button
                        variant={btnVarinat}
                        className="signup-button"
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    >Sign up as Customer
                    </Button> */}
                </div>
            </form>
        </div>
    );
}

export default Signup;