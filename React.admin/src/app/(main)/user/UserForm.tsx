"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import {
  TextField,
  MenuItem,
  Button,
  IconButton,
  InputAdornment,
  Switch,
  FormControlLabel,
  Avatar,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

type FormValues = {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  userType: string;
  role: string;
  username: string;
  password: string;
  confirmPassword: string;
  sendCredentials: boolean;
};

const userTypes = [
  { label: "Traveler", value: "traveler" },
  { label: "Agent", value: "agent" },
  { label: "Admin", value: "admin" },
];

const roles = [
  { label: "Viewer", value: "viewer" },
  { label: "Editor", value: "editor" },
  { label: "Manager", value: "manager" },
];

export default function UserForm({ userId }: { userId?: string }) {
  const router = useRouter();
  const pathname = usePathname();

  const isViewMode = pathname.startsWith("/user/view");
  const isEditMode = pathname.startsWith("/user/edit");

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      id: "",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      userType: "",
      role: "",
      username: "",
      password: "",
      confirmPassword: "",
      sendCredentials: false,
    },
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    async function fetchUser(id: string) {
      // simulate API call
      await new Promise((res) => setTimeout(res, 400));
      const data = {
        id,
        firstName: "John",
        lastName: "Doe",
        email: "john@example.com",
        phone: "+919876543210",
        userType: "traveler",
        role: "viewer",
        username: "johndoe",
        password: "Pass@123",
        confirmPassword: "Pass@123",
      };
      Object.entries(data).forEach(([k, v]) =>
        setValue(k as keyof FormValues, v as any)
      );
    }

    if ((isViewMode || isEditMode) && userId) fetchUser(userId);
  }, [isViewMode, isEditMode, userId, setValue]);

  const onSubmit = (data: FormValues) => {
    console.log("submit:", data);
  };

  const password = watch("password");
  const disabled = isViewMode;

  return (
    <div className="h-full p-3 flex flex-col">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-8 flex-1 h-full overflow-auto"
      >
        {/* Basic User Details */}
        <div>
          <div className="flex items-center gap-2">
            <h2 className="font-semibold text-lg mb-2">Basic User Details</h2>
            <hr className="border-gray-200 w-full flex-1" />
          </div>

          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-shrink-0 w-30 flex flex-col items-center justify-center">
              <div>
                <p className="text-gray-500 text-sm mt-2">Profile Picture</p>
                <Avatar sx={{ width: 88, height: 88 }} />
              </div>
            </div>

            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  First Name
                </label>
                <Controller
                  name="firstName"
                  control={control}
                  rules={{ required: "First name is required" }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      id="firstName"
                      placeholder="Enter first name"
                      size="small"
                      fullWidth
                      disabled={disabled}
                      error={!!errors.firstName}
                      helperText={errors.firstName?.message}
                    />
                  )}
                />
              </div>

              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Last Name
                </label>
                <Controller
                  name="lastName"
                  control={control}
                  rules={{ required: "Last name is required" }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      id="lastName"
                      placeholder="Enter last name"
                      size="small"
                      fullWidth
                      disabled={disabled}
                      error={!!errors.lastName}
                      helperText={errors.lastName?.message}
                    />
                  )}
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email Address
                </label>
                <Controller
                  name="email"
                  control={control}
                  rules={{
                    required: "Email is required",
                    pattern: { value: /^\S+@\S+$/i, message: "Invalid email" },
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      id="email"
                      placeholder="Enter email address"
                      size="small"
                      fullWidth
                      disabled={disabled}
                      error={!!errors.email}
                      helperText={errors.email?.message}
                    />
                  )}
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Phone Number
                </label>
                <Controller
                  name="phone"
                  control={control}
                  rules={{ required: "Phone number is required" }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      id="phone"
                      placeholder="+91 Enter phone number"
                      size="small"
                      fullWidth
                      disabled={disabled}
                      error={!!errors.phone}
                      helperText={errors.phone?.message}
                    />
                  )}
                />
              </div>

              <div>
                <label
                  htmlFor="userType"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  User Type
                </label>
                <Controller
                  name="userType"
                  control={control}
                  rules={{ required: "User type is required" }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      id="userType"
                      select
                      placeholder="Select"
                      size="small"
                      fullWidth
                      disabled={disabled}
                      error={!!errors.userType}
                      helperText={errors.userType?.message}
                    >
                      {userTypes.map((ut) => (
                        <MenuItem key={ut.value} value={ut.value}>
                          {ut.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
              </div>

              <div>
                <label
                  htmlFor="role"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Role Assignment
                </label>
                <Controller
                  name="role"
                  control={control}
                  rules={{ required: "Role is required" }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      id="role"
                      select
                      placeholder="Select"
                      size="small"
                      fullWidth
                      disabled={disabled}
                      error={!!errors.role}
                      helperText={errors.role?.message}
                    >
                      {roles.map((r) => (
                        <MenuItem key={r.value} value={r.value}>
                          {r.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Login Credentials */}
        <div>
          <div className="flex items-center gap-2">
            <h2 className="font-semibold text-lg mb-2">Login Credentials</h2>
            <hr className="border-gray-200 w-full flex-1" />
          </div>

          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Username
                </label>
                <Controller
                  name="username"
                  control={control}
                  rules={{ required: "Username is required" }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      id="username"
                      placeholder="Enter username"
                      size="small"
                      fullWidth
                      disabled={disabled}
                      error={!!errors.username}
                      helperText={errors.username?.message}
                    />
                  )}
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Password
                </label>
                <Controller
                  name="password"
                  control={control}
                  rules={{
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      id="password"
                      placeholder="Enter password"
                      type={showPassword ? "text" : "password"}
                      size="small"
                      fullWidth
                      disabled={disabled}
                      error={!!errors.password}
                      helperText={errors.password?.message}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => setShowPassword((s) => !s)}
                              aria-label="toggle password"
                              size="small"
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                />
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Confirm Password
                </label>
                <Controller
                  name="confirmPassword"
                  control={control}
                  rules={{
                    required: "Confirm password is required",
                    validate: (v) => v === password || "Passwords do not match",
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      id="confirmPassword"
                      placeholder="Enter password"
                      type={showConfirmPassword ? "text" : "password"}
                      size="small"
                      fullWidth
                      disabled={disabled}
                      error={!!errors.confirmPassword}
                      helperText={errors.confirmPassword?.message}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => setShowConfirmPassword((s) => !s)}
                              aria-label="toggle confirm password"
                              size="small"
                            >
                              {showConfirmPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                />
              </div>
            </div>
            {/* left placeholder equal to profile width */}
            <div className="w-30 flex-shrink-0" />
          </div>

          <div className="mt-2">
            <Controller
              name="sendCredentials"
              control={control}
              render={({ field }) => (
                <FormControlLabel
                  control={
                    <Switch
                      checked={!!field.value}
                      onChange={(e) => field.onChange(e.target.checked)}
                      disabled={disabled}
                    />
                  }
                  label="Send Login Credentials via Email"
                />
              )}
            />
          </div>
        </div>
      </form>
      <div className="flex justify-end gap-4">
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => router.push("/user")}
        >
          Cancel
        </Button>

        {!isViewMode && (
          <Button
            onClick={handleSubmit(onSubmit)}
            variant="contained"
            color="primary"
          >
            {isEditMode ? "Update User" : "Save User"}
          </Button>
        )}
      </div>
    </div>
  );
}
