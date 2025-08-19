import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AuthFlow = () => {
  const navigate = useNavigate();
  const [currentScreen, setCurrentScreen] = useState("login");
  const [formData, setFormData] = useState({
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
    verificationCode: ["", "", "", ""],
    authMethod: "phone", // 'phone' or 'email'
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [countdown, setCountdown] = useState(0);

  // Handle form input changes
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Handle verification code input
  const handleVerificationCode = (index, value) => {
    const newCode = [...formData.verificationCode];
    newCode[index] = value;
    setFormData((prev) => ({ ...prev, verificationCode: newCode }));

    // Auto-focus next input
    if (value && index < 3) {
      const nextInput = document.getElementById(`code-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  // Start countdown timer
  const startCountdown = () => {
    setCountdown(60);
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Screen transition handlers
  const handleLogin = () => {
    setCurrentScreen("loginVerification");
    startCountdown();
  };

  const handleSignUp = () => {
    setCurrentScreen("signupVerification");
    startCountdown();
  };

  const handleLoginVerification = () => {
    setCurrentScreen("loginSuccess");
  };

  const handleSignUpVerification = () => {
    setCurrentScreen("accountCreated");
  };

  const handleForgotPassword = () => {
    setCurrentScreen("emailVerification");
  };

  const handleEmailVerification = () => {
    setCurrentScreen("createNewPassword");
  };

  const handlePasswordReset = () => {
    setCurrentScreen("passwordChanged");
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  // Login Screen
  const LoginScreen = () => (
    <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">
        Log into your account
      </h2>

      {/* Phone/Email Toggle */}
      <div className="flex bg-gray-100 rounded-full p-1 mb-6">
        <button
          onClick={() => handleInputChange("authMethod", "phone")}
          className={`flex-1 py-2 px-4 rounded-full text-sm font-medium transition-all ${
            formData.authMethod === "phone"
              ? "bg-black text-white"
              : "text-gray-600 hover:text-gray-800"
          }`}
        >
          Phone
        </button>
        <button
          onClick={() => handleInputChange("authMethod", "email")}
          className={`flex-1 py-2 px-4 rounded-full text-sm font-medium transition-all ${
            formData.authMethod === "email"
              ? "bg-black text-white"
              : "text-gray-600 hover:text-gray-800"
          }`}
        >
          Email
        </button>
      </div>

      {/* Input Field */}
      <div className="mb-6">
        <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
          {formData.authMethod === "phone" && (
            <div className="flex items-center px-3 py-3 border-r border-gray-300">
              <img
                src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23ff9933' d='M0 0h24v8h-24z'/%3E%3Cpath fill='%23ffffff' d='M0 8h24v8h-24z'/%3E%3Cpath fill='%23138808' d='M0 16h24v8h-24z'/%3E%3C/svg%3E"
                alt="India"
                className="w-5 h-3 mr-2"
              />
              <span className="text-sm text-gray-700">+91</span>
              <svg
                className="w-4 h-4 ml-1 text-gray-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          )}
          <input
            type={formData.authMethod === "phone" ? "tel" : "email"}
            placeholder={
              formData.authMethod === "phone"
                ? "Mobile Number"
                : "Email Address"
            }
            value={
              formData.authMethod === "phone"
                ? formData.phoneNumber
                : formData.email
            }
            onChange={(e) =>
              handleInputChange(
                formData.authMethod === "phone" ? "phoneNumber" : "email",
                e.target.value
              )
            }
            className="flex-1 px-4 py-3 outline-none text-gray-700"
          />
        </div>
      </div>

      {/* Login Button */}
      <button
        onClick={handleLogin}
        className="w-full bg-black text-white py-3 rounded-lg font-medium mb-6 hover:bg-gray-800 transition-colors"
      >
        LOGIN
      </button>

      {/* Sign Up Link */}
      <p className="text-center text-sm text-gray-600 mb-6">
        Don't have an account?{" "}
        <button
          onClick={() => setCurrentScreen("signup")}
          className="text-black font-medium hover:underline"
        >
          Sign Up
        </button>
      </p>

      {/* Social Login */}
      <div className="space-y-3">
        <button className="w-full flex items-center justify-center py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
          <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
            <path
              fill="#4285f4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34a853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#fbbc05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#ea4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          <span className="text-gray-700">login with Google</span>
        </button>

        <button className="w-full flex items-center justify-center py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
          <svg className="w-5 h-5 mr-3" viewBox="0 0 384 512">
            <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
          </svg>
          <span className="text-gray-700">log in with Apple</span>
        </button>
      </div>
    </div>
  );

  // Sign Up Screen
  const SignUpScreen = () => (
    <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">
        sign up a new account
      </h2>

      {/* Phone/Email Toggle */}
      <div className="flex bg-gray-100 rounded-full p-1 mb-6">
        <button
          onClick={() => handleInputChange("authMethod", "phone")}
          className={`flex-1 py-2 px-4 rounded-full text-sm font-medium transition-all ${
            formData.authMethod === "phone"
              ? "bg-black text-white"
              : "text-gray-600 hover:text-gray-800"
          }`}
        >
          Phone
        </button>
        <button
          onClick={() => handleInputChange("authMethod", "email")}
          className={`flex-1 py-2 px-4 rounded-full text-sm font-medium transition-all ${
            formData.authMethod === "email"
              ? "bg-black text-white"
              : "text-gray-600 hover:text-gray-800"
          }`}
        >
          Email
        </button>
      </div>

      {/* Input Field */}
      <div className="mb-6">
        <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
          {formData.authMethod === "phone" && (
            <div className="flex items-center px-3 py-3 border-r border-gray-300">
              <img
                src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23ff9933' d='M0 0h24v8h-24z'/%3E%3Cpath fill='%23ffffff' d='M0 8h24v8h-24z'/%3E%3Cpath fill='%23138808' d='M0 16h24v8h-24z'/%3E%3C/svg%3E"
                alt="India"
                className="w-5 h-3 mr-2"
              />
              <span className="text-sm text-gray-700">+91</span>
              <svg
                className="w-4 h-4 ml-1 text-gray-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          )}
          <input
            type={formData.authMethod === "phone" ? "tel" : "email"}
            placeholder={
              formData.authMethod === "phone"
                ? "Mobile Number"
                : "Email Address"
            }
            value={
              formData.authMethod === "phone"
                ? formData.phoneNumber
                : formData.email
            }
            onChange={(e) =>
              handleInputChange(
                formData.authMethod === "phone" ? "phoneNumber" : "email",
                e.target.value
              )
            }
            className="flex-1 px-4 py-3 outline-none text-gray-700"
          />
        </div>
      </div>

      {/* Sign Up Button */}
      <button
        onClick={handleSignUp}
        className="w-full bg-black text-white py-3 rounded-lg font-medium mb-6 hover:bg-gray-800 transition-colors"
      >
        SIGN UP
      </button>

      {/* Divider */}
      <div className="text-center text-gray-500 mb-6">or</div>

      {/* Social Login */}
      <div className="space-y-3">
        <button className="w-full flex items-center justify-center py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
          <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
            <path
              fill="#4285f4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34a853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#fbbc05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#ea4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          <span className="text-gray-700">Sign up with Google</span>
        </button>

        <button className="w-full flex items-center justify-center py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
          <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.024-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.887 2.747.097.118.112.222.082.343-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.162-1.499-.688-2.436-2.888-2.436-4.649 0-3.785 2.750-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.357-.631-2.748-1.378 0 0-.599 2.282-.744 2.840-.282 1.084-1.064 2.456-1.549 3.235C9.584 23.815 10.77 24.001 12.017 24.001c6.624-.001 11.990-5.367 11.990-11.988C24.007 5.367 18.641.001 12.017.001z" />
          </svg>
          <span className="text-gray-700">Sign up with Apple</span>
        </button>
      </div>
    </div>
  );

  // Verification Code Screen
  const VerificationScreen = ({
    onSuccess,
    title = "Verification code",
    subtitle = "Please enter the verification code we sent to your phone number",
  }) => (
    <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">
        {title}
      </h2>
      <p className="text-center text-gray-600 mb-8">{subtitle}</p>

      {/* Verification Code Inputs */}
      <div className="flex justify-center space-x-4 mb-6">
        {[0, 1, 2, 3].map((index) => (
          <input
            key={index}
            id={`code-${index}`}
            type="text"
            maxLength="1"
            value={formData.verificationCode[index]}
            onChange={(e) => handleVerificationCode(index, e.target.value)}
            className="w-16 h-16 text-center text-2xl font-bold border-2 border-gray-300 rounded-full focus:border-black focus:outline-none transition-colors"
          />
        ))}
      </div>

      {/* Resend Timer */}
      <div className="text-center mb-6">
        <span className="text-gray-500">Resend in {formatTime(countdown)}</span>
      </div>

      {/* Submit Button */}
      <button
        onClick={onSuccess}
        className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors"
      >
        Please enter the 4 digit pin send to your registered phone number
      </button>
    </div>
  );

  // Success Screen
  const SuccessScreen = ({
    title,
    subtitle,
    buttonText = "Continue",
    onContinue,
  }) => (
    <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">
        {title}
      </h2>
      <p className="text-center text-gray-600 mb-8">{subtitle}</p>

      <button
        onClick={onContinue}
        className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors"
      >
        {buttonText}
      </button>
    </div>
  );

  // Forgot Password Screen
  const ForgotPasswordScreen = () => (
    <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">
        Forgot password?
      </h2>
      <p className="text-center text-gray-600 mb-8">
        Enter email / Phone Number associated with your account and we'll send
        and email with instructions to reset your password
      </p>

      <div className="space-y-4 mb-6">
        <input
          type="email"
          placeholder="✉ Enter your email here"
          value={formData.email}
          onChange={(e) => handleInputChange("email", e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-black transition-colors"
        />
        <input
          type="tel"
          placeholder="📞 Enter your phone number here"
          value={formData.phoneNumber}
          onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-black transition-colors"
        />
      </div>

      <button
        onClick={handleForgotPassword}
        className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors"
      >
        Continue
      </button>
    </div>
  );

  // Email Verification Screen
  const EmailVerificationScreen = () => (
    <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">
        Verify your email address
      </h2>

      <p className="text-sm text-gray-600 mb-6">
        <button
          onClick={() => setCurrentScreen("forgotPassword")}
          className="text-black underline hover:no-underline"
        >
          Click here
        </button>{" "}
        if you did not receive an email or would like to change the email
        address you registered with
      </p>

      <p className="text-sm text-gray-700 mb-8">
        We've sent an email to{" "}
        <span className="text-black underline">yoraa@gmail.com</span> to verify
        your email address and activate your account. the link in the email will
        expire in 24 hr.
      </p>

      <button
        onClick={handleEmailVerification}
        className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors"
      >
        Continue
      </button>
    </div>
  );

  // Create New Password Screen
  const CreateNewPasswordScreen = () => (
    <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">
        Create new password
      </h2>
      <p className="text-center text-gray-600 mb-8">
        Your new password must be different from previously used password
      </p>

      <div className="space-y-4 mb-6">
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter password"
            value={formData.password}
            onChange={(e) => handleInputChange("password", e.target.value)}
            className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg outline-none focus:border-black transition-colors"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        <div className="relative">
          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Re-enter password"
            value={formData.confirmPassword}
            onChange={(e) =>
              handleInputChange("confirmPassword", e.target.value)
            }
            className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg outline-none focus:border-black transition-colors"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
      </div>

      <button
        onClick={handlePasswordReset}
        className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors"
      >
        Submit
      </button>
    </div>
  );

  // Main render function
  const renderCurrentScreen = () => {
    switch (currentScreen) {
      case "login":
        return <LoginScreen />;
      case "signup":
        return <SignUpScreen />;
      case "loginVerification":
        return (
          <VerificationScreen
            onSuccess={handleLoginVerification}
            title="Verification code"
            subtitle="Please enter the verification code we sent to your phone number"
          />
        );
      case "signupVerification":
        return (
          <VerificationScreen
            onSuccess={handleSignUpVerification}
            title="Verification code"
            subtitle="Please enter the verification code we sent to your phone number"
          />
        );
      case "loginSuccess":
        return (
          <SuccessScreen
            title="logged in !"
            subtitle="Your YORAA admin account has been logged in successfully"
            onContinue={() => navigate("/")}
          />
        );
      case "accountCreated":
        return (
          <SuccessScreen
            title="Account created !"
            subtitle="Your YORAA admin account has been created successfully"
            onContinue={() => console.log("Navigate to dashboard")}
          />
        );
      case "forgotPassword":
        return <ForgotPasswordScreen />;
      case "emailVerification":
        return <EmailVerificationScreen />;
      case "createNewPassword":
        return <CreateNewPasswordScreen />;
      case "passwordChanged":
        return (
          <SuccessScreen
            title="Your password has been changed"
            subtitle="Welcome back! Discover now!"
            onContinue={() => setCurrentScreen("login")}
          />
        );
      default:
        return <LoginScreen />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      {renderCurrentScreen()}
    </div>
  );
};

export default AuthFlow;
