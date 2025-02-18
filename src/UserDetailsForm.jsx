import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const UserDetailsForm = ({ ticketInfo, onNext, onCancel }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    avatarUrl: "",
    specialRequest: "",
  });
  const [errors, setErrors] = useState({});

  // Load saved data from localStorage on component mount
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("userDetailsFormData"));
    if (savedData) {
      setFormData(savedData);
    }
  }, []);

  // Save form data to localStorage on change
  useEffect(() => {
    localStorage.setItem("userDetailsFormData", JSON.stringify(formData));
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full Name is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.avatarUrl.trim()) {
      newErrors.avatarUrl = "Avatar URL is required";
    } else if (
      !/^https?:\/\/.+\.(jpg|jpeg|png|gif)$/i.test(formData.avatarUrl)
    ) {
      newErrors.avatarUrl = "Invalid image URL";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onNext({ ...ticketInfo, ...formData });
    }
  };

  return (
    <div className="user-details-form">
      <h1>Event Name: Tech Conference 2023</h1>
      <div className="step-indicator">
        <span className="step">1</span>
        <span className="step active">2</span>
        <span className="step">3</span>
      </div>
      <h2>Enter Your Details</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="fullName">Full Name</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            aria-describedby="fullNameError"
          />
          {errors.fullName && (
            <span id="fullNameError" className="error">
              {errors.fullName}
            </span>
          )}
        </div>
        <div>
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            aria-describedby="emailError"
          />
          {errors.email && (
            <span id="emailError" className="error">
              {errors.email}
            </span>
          )}
        </div>
        <div>
          <label htmlFor="avatarUrl">Avatar URL</label>
          <input
            type="url"
            id="avatarUrl"
            name="avatarUrl"
            value={formData.avatarUrl}
            onChange={handleChange}
            aria-describedby="avatarUrlError"
          />
          {errors.avatarUrl && (
            <span id="avatarUrlError" className="error">
              {errors.avatarUrl}
            </span>
          )}
        </div>
        <div>
          <label htmlFor="specialRequest">Special Request</label>
          <textarea
            id="specialRequest"
            name="specialRequest"
            value={formData.specialRequest}
            onChange={handleChange}
          />
        </div>
        <div className="action-buttons">
          <button type="button" className="cancel-button" onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" className="next-button">
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

// Prop validation
UserDetailsForm.propTypes = {
  ticketInfo: PropTypes.shape({
    fullName: PropTypes.string,
    email: PropTypes.string,
    avatarUrl: PropTypes.string,
    specialRequest: PropTypes.string,
  }).isRequired,
  onNext: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default UserDetailsForm;
