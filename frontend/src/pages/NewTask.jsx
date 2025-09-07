import { useState } from "react";
import "../style/SignUpForm.css";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authcontext";
export default function NewTask() {
  const navigate = useNavigate();
  const { token } = useAuth();
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });

  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!formData.title.trim()) {
      newErrors.title = "title is required";
    }

    // Password validation
    if (!formData.content) {
      newErrors.content = "Content is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await axios.post(
        "http://localhost:5000/api/tasks/createtask",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      console.log(res);
      if (res.data.success) {
        toast("New Task created successfully!");
        setMessage(res.data.msg);
        setIsSubmitting(false);
        navigate("/")
      }
    } catch (error) {
      console.log("somthing went wrong");
      setErrors(res.error);
        setIsSubmitting(false);
    }
  };

  return (
    <div className="signsignup-container">
      <ToastContainer />
      <div className="signsignup-card">
        <div className="signsignup-header">
          <h2>Create New Task</h2>
        </div>
        {errors.submit && (
          <div className="signalert signalert-error">
            <div className="signalert-icon">⚠</div>
            <div className="signalert-content">
              <p>{errors.submit}</p>
            </div>
          </div>
        )}

        <form className="signsignup-form" onSubmit={handleSubmit}>
          <div className="signform-group">
            <label htmlFor="name">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className={errors.title ? "error" : ""}
              placeholder="Enter your Title"
            />
            {errors.name && (
              <span className="signerror-message">{errors.title}</span>
            )}
          </div>

          <div className="signform-group">
            <label htmlFor="email">Content</label>
            {/* i want the width of this textarea fixed */}
            <textarea 

              type="text"
              id="content"
              name="content"

              value={formData.content}
              onChange={handleInputChange}
              className={errors.content ? "error" : ""}
              placeholder="Enter your Content"></textarea>
            {errors.content && (
              <span className="signerror-message">{errors.content}</span>
            )}
          </div>

          <button
            type="submit"
            className={`signsignup-btn ${isSubmitting ? "signloading" : ""}`}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className="signspinner"></span>
                Adding...
              </>
            ) : (
              "Add Task"
            )}
          </button>
        </form>

        <div className="signsignup-footer">
          <p>
            Back to Home Page
            <Link to="/" className="signsignin-link">
              {" "}
              Click Here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
