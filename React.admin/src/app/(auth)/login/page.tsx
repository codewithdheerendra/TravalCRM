'use client';

import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Image from "next/image";
import React from "react";
import { BiChevronLeft, BiEnvelope, BiLockAlt } from "react-icons/bi";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { FaRegEnvelope } from "react-icons/fa";

export default function Login() {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isValidEmail, setIsValidEmail] = React.useState(false);
  const [isVisiblePass, setPassVisibility] = React.useState(false);
  const [emailError, setEmailError] = React.useState('');
  const [passwordError, setPasswordError] = React.useState('');

  const isFormValid = email && password && !emailError && !passwordError;

  const validateEmail = (value: string) => {
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    setEmailError(isValid ? '' : 'Please enter a valid email address.');
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    validateEmail(value);
    setIsValidEmail(value.length > 0 && !emailError);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    setPasswordError(value.length >= 6 ? '' : 'Password must be at least 6 characters.');
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
    <div className="size-full flex flex-col items-center justify-around">
      <Image src="/images/Logo.svg" alt="logo" width={177} height={55} />
      <Box component={'form'} noValidate className="w-full max-w-lg p-5">
        <div className="text-center mb-10">
          <Typography fontSize="1.5rem" fontWeight={'bold'} className="primary-text">Login</Typography>
        </div>
        <div className="my-3">
          <Typography component={'label'} htmlFor="emailCtrl" className="secondary-text">Email *</Typography>
          <TextField fullWidth size="small" name="email" placeholder="Email Address" id="emailCtrl" helperText={emailError} slotProps={{
              input: {
                inputMode: 'email', type: 'email', autoComplete: 'email', value: email,
                onChange: handleEmailChange, error: !!emailError,
                'aria-invalid': !!emailError, 'aria-describedby': 'email-error-text',
                startAdornment: (
                  <InputAdornment position="start">
                    <BiEnvelope size={16} />
                  </InputAdornment>
                ),
              },
            }}
          />
        </div>
          <Typography component={'label'} htmlFor="password" className="secondary-text">Password *</Typography>
          <TextField fullWidth size="small" name="password" id="password" placeholder="Password"
            slotProps={{
              input: {
                type: isVisiblePass ? 'text' : 'password', autoComplete: 'current-password', value: password,
                onChange: handlePasswordChange,
                startAdornment: (
                  <InputAdornment position="start">
                    <BiLockAlt size={16} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="start">
                    <IconButton aria-label="toggle password visibility" size="small" onClick={() => setPassVisibility(!isVisiblePass)} edge="end">
                      {isVisiblePass ? <BsEye size={16} /> : <BsEyeSlash size={16} />}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />
        <div className="flex justify-between items-center mt-2 mb-5">
          <Typography className="flex bold items-center" fontWeight={'bold'} component={'p'}>
            <Checkbox /> Remember me
          </Typography>
          <Typography fontWeight="bold" className="error-text" onClick={handleClickOpen}>Forgot Password?</Typography>
        </div>

        <Button fullWidth size="large" disabled={!isFormValid} variant="contained" color="primary" className="mt-10">Login</Button>
      </Box>
      <p className="muted-text font-bold">
        Don&apos;t have login? 
        <span className="primary-text"> Contact your Admin</span>
      </p>
    </div>
    <React.Fragment>
      <Dialog fullScreen={fullScreen} open={open} onClose={handleClose} aria-labelledby="change-password-dialog-title" role="alertdialog" aria-describedby="change-password-dialog-description" slotProps={{ paper: {sx: { borderRadius: '20px' }} }}>
        <DialogTitle id="change-password-dialog-title">
          <span role="button" tabIndex={-1} aria-label="Back" className="px-3 py-1 border border-b-blue-900 rounded-lg me-10" onClick={handleClose}>
            <BiChevronLeft className="inline"/>
          </span>
          {"Password Recovery"}
        </DialogTitle>
        <DialogContent>
          <p className="text-[#4B5563] text-center mt-2 mb-4">We will send you a new password to your mailbox.</p>
          <Typography component={'label'} htmlFor="recoveryEmail">Email Address</Typography>
          <TextField autoFocus margin="none" size="small" id="recoveryEmail" type="email" fullWidth onChange={handleEmailChange}
            variant="outlined" placeholder="Email address" sx={{borderColor: 'CaptionText'}} value={email} required
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <FaRegEnvelope size={16} />
                  </InputAdornment>
                ),
              },
            }}
          />
          <div className="pt-4">
        <Button variant="contained" disabled={!isValidEmail} fullWidth onClick={handleClose}>Send Mail</Button>
          </div>
          <Typography className="text-[#A4A4A4] pt-7" textAlign={'center'} fontWeight={600}><small>Remember your password? <a href="#" role="button" className="text-blue-950" onClick={e=> {e.preventDefault(); handleClose()}}>Login</a></small></Typography>
        </DialogContent>
      </Dialog>
    </React.Fragment>
    </>
  );
}
