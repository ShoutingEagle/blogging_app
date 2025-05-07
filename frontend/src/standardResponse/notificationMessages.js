// messages.js

const invalidEmail = "Please enter a valid email address.";
const emptyEmail = "Email field cannot be empty.";
const emptyPassword = "Password field cannot be empty.";
const shortPassword = "Password must be at least 6 characters long.";
const mismatchedPasswords = "Passwords do not match.";
const emptyUsername = "Username cannot be empty.";
const shortUsername = "Username must be at least 3 characters long.";
const loginFailed = "Invalid email or password.";
const signupSuccess = "Account created successfully!";
const loginSuccess = "Logged in successfully!";
const emptyOtp = "Please enter the OTP.";
const incompleteOtp = "Please enter all OTP digits.";
const otpSent = "OTP has been sent to your email.";
const invalidOtp = "Invalid OTP. Please try again.";
const otpExpired = "OTP has expired. Request a new one.";
const otpVerificationResponse =  "Invalid OTP or Email"
const formIncomplete = "Please fill out all required fields.";
const unauthorizedAccess = "You are not authorized to perform this action.";
const serverError = "Something went wrong. Please try again later.";
const networkError = "Network error. Check your connection.";
const logoutSuccess = "You have been logged out successfully.";
const actionSuccessful = "Action completed successfully.";
const updateSuccess = "Information updated successfully.";
const deleteConfirm = "Are you sure you want to delete this?";
const deletionSuccess = "Item deleted successfully.";
const resendOtpCooldown = "Please wait before requesting a new OTP.";
const imageUploadFailed = "Failed to upload image. Please try again.";

export {
  invalidEmail,
  emptyEmail,
  emptyPassword,
  shortPassword,
  mismatchedPasswords,
  emptyUsername,
  shortUsername,
  loginFailed,
  signupSuccess,
  loginSuccess,
  emptyOtp,
  incompleteOtp,
  otpSent,
  invalidOtp,
  otpExpired,
  otpVerificationResponse,
  formIncomplete,
  unauthorizedAccess,
  serverError,
  networkError,
  logoutSuccess,
  actionSuccessful,
  updateSuccess,
  deleteConfirm,
  deletionSuccess,
  resendOtpCooldown,
  imageUploadFailed
};
