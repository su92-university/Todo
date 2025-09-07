// TaskCard.js
import React, { useState } from "react";
import "../style/editform.css"
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/authcontext";

const TaskCard = ({ task, onDelete, onUpdate, onToggleDone }) => {
  const { token } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
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

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    setIsSubmitting(true);
    setErrors({});
    try {
      const res = await axios.put(
        `http://localhost:5000/api/tasks/updatetask/${task._id}`,
        {
          title: formData.title,
          content: formData.content,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      if (res.data.success) {
        // toast("Task updated successfully!");
        setMessage(res.data.msg);
        setIsEditing(false);
        setIsSubmitting(false);
        // Update in parent
        if (onUpdate) onUpdate(task._id, res.data.updatedTask || { ...task, ...formData });
      } else {
        setErrors({ submit: res.data.msg || "Update failed" });
        setIsSubmitting(false);
      }
    } catch (error) {
      setErrors({ submit: error.response?.data?.msg || "Something went wrong" });
      setIsSubmitting(false);
    }
  }

  const handleCancel = () => {
    setEditedTitle(task.title);
    setIsEditing(false);
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
  return (
    <div className={`task-card ${task.isDone ? "done" : "pending"}`}>
      <h3 className="task-title">{task.title}</h3>
      <p className="task-description">{task.content}</p>
      <div className="task-actions">
        <button
          onClick={() => onToggleDone(task._id)}
          className={`status-btn ${task.isDone ? "Pending" : "done"}`}
        >
          {task.isDone ? "Done" : "Pending"}
        </button>

        <button
          onClick={() => {
            setFormData({ title: task.title, content: task.content });
            setIsEditing(true);
          }}
          className="update-btn"
        >
          Update
        </button>
        <button onClick={() => onDelete(task._id)} className="delete-btn">
          Delete
        </button>
      </div>

      {isEditing && (
        <div className="modal-overlay">
          <div className="modal-card editsignup-card">
            <button className="modal-close-btn" onClick={handleCancel} aria-label="Close">&times;</button>
            <div className="editsignup-header">
              <h2>Update Task</h2>
            </div>
            {errors.submit && (
              <div className="editalert editalert-error">
                <div className="editalert-icon">⚠</div>
                <div className="editalert-content">
                  <p>{errors.submit}</p>
                </div>
              </div>
            )}
            <form className="editsignup-form" onSubmit={handleUpdate}>
              <div className="editform-group">
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
                {errors.title && (
                  <span className="editerror-message">{errors.title}</span>
                )}
              </div>
              <div className="editform-group">
                <label htmlFor="content">Content</label>
                <textarea
                  id="content"
                  name="content"
                  value={formData.content}
                  onChange={handleInputChange}
                  className={errors.content ? "error" : ""}
                  placeholder="Enter your Content"
                ></textarea>
                {errors.content && (
                  <span className="editerror-message">{errors.content}</span>
                )}
              </div>
              <div className="editform-groupbtndown">
                <button
                  type="submit"
                  className={`editsignup-btn ${isSubmitting ? "editloading" : ""}`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="editspinner"></span>
                      Updating...
                    </>
                  ) : (
                    "Update Task"
                  )}
                </button>
                <button
                  type="button"
                  className="editsignup-btn"
                  onClick={handleCancel}
                >
                  Cancel
                </button>

              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskCard;
