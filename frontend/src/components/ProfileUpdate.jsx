import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import api from "../api";

// Fetch user profile function
const fetchUserProfile = async () => {
  const response = await api.get("api/v1/profile/");
  return response.data;
};

const UserProfile = () => {
  const [userData, setUserData] = useState({
    email: "",
    username: "",
    first_name: "",
    last_name: "",
  });
  const [profileImage, setProfileImage] = useState(null);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Fetch user data using useQuery
  const { data, isLoading, error } = useQuery({
    queryKey: ["userProfile"],
    queryFn: fetchUserProfile,
  });

  // Set user data after the fetch
  if (data && !userData.email) {
    setUserData({
      email: data.user.email,
      username: data.user.username,
      first_name: data.user.first_name,
      last_name: data.user.last_name,
    });
  }

  // Profile update mutation
  const mutation = useMutation({
    mutationFn: async (formData) => {
      const response = await api.put("api/v1/profile/", formData, {
        headers: {
          // No need to specify Content-Type, the browser will set it automatically
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    },
    onSuccess: () => {
      console.log("Profile updated successfully");
      navigate("/profile");
    },
    onError: (error) => {
      if (error.response) {
        setErrors(error.response.data.errors);
      } else {
        console.error("Error updating profile:", error);
      }
    },
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  // Handle profile image change
  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0]; // Assuming only one image is selected
    console.log("Selected Image File:", selectedFile); // Log the image file
    setProfileImage(selectedFile);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a new FormData object
    const formData = new FormData();

    // Append user data fields to the FormData object
    formData.append("email", userData.email);
    formData.append("username", userData.username);
    formData.append("first_name", userData.first_name);
    formData.append("last_name", userData.last_name);

    // Append profile image (if any)
    if (profileImage) {
      formData.append("profile_image", profileImage);
    }

    // Trigger the mutation to send FormData
    mutation.mutate(formData); // Pass FormData to the mutation
  };

  return (
    <section className="container">
      <div className="mx-auto p-6 rounded-lg shadow-md mt-20 text-center">
        <h2 className="text-2xl font-bold text-center mb-4 text-xiaomi-color">
          Update Profile
        </h2>
        {isLoading && <p>Loading user data...</p>}
        {error && <p>Error loading user data</p>}
        {!isLoading && data && (
          <form onSubmit={handleSubmit}>
            <div className="mb-4 mt-8">
              <label
                className="text-xiaomi-color font-bold text-lg block mb-1"
                htmlFor="email"
              >
                Email:
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email"
                value={userData.email}
                onChange={handleChange}
                required
                className={`text-gray-400 bg-transparent border-b-2 relative w-[300px] 
                            ${
                              errors.email
                                ? "border-red-500"
                                : "border-xiaomi-color"
                            }
                            focus:bg-transparent focus:outline-none`}
              />
              {errors.email && (
                <span className="text-red-500 text-sm">
                  {errors.email.join(", ")}
                </span>
              )}
            </div>
            <div className="mb-4 mt-8">
              <label
                className="text-xiaomi-color font-bold text-lg block mb-1"
                htmlFor="username"
              >
                Username:
              </label>
              <input
                type="text"
                name="username"
                id="username"
                placeholder="Enter your username"
                value={userData.username}
                onChange={handleChange}
                required
                className={`text-gray-400 bg-transparent border-b-2 relative w-[300px] 
                            ${
                              errors.username
                                ? "border-red-500"
                                : "border-xiaomi-color"
                            }
                            focus:bg-transparent focus:outline-none`}
              />
              {errors.username && (
                <span className="text-red-500 text-sm">
                  {errors.username.join(", ")}
                </span>
              )}
            </div>
            <div className="mb-4 mt-8">
              <label
                className="text-xiaomi-color font-bold text-lg block mb-1"
                htmlFor="first_name"
              >
                First Name:
              </label>
              <input
                type="text"
                name="first_name"
                id="first_name"
                placeholder="Enter your first name"
                value={userData.first_name}
                onChange={handleChange}
                required
                className={`text-gray-400 bg-transparent border-b-2 relative w-[300px] 
                            ${
                              errors.first_name
                                ? "border-red-500"
                                : "border-xiaomi-color"
                            }
                            focus:bg-transparent focus:outline-none`}
              />
              {errors.first_name && (
                <span className="text-red-500 text-sm">
                  {errors.first_name.join(", ")}
                </span>
              )}
            </div>
            <div className="mb-4 mt-8">
              <label
                className="text-xiaomi-color font-bold text-lg block mb-1"
                htmlFor="last_name"
              >
                Last Name:
              </label>
              <input
                type="text"
                name="last_name"
                id="last_name"
                placeholder="Enter your last name"
                value={userData.last_name}
                onChange={handleChange}
                required
                className={`text-gray-400 bg-transparent border-b-2 relative w-[300px] 
                            ${
                              errors.last_name
                                ? "border-red-500"
                                : "border-xiaomi-color"
                            }
                            focus:bg-transparent focus:outline-none`}
              />
              {errors.last_name && (
                <span className="text-red-500 text-sm">
                  {errors.last_name.join(", ")}
                </span>
              )}
            </div>
            <div className="mb-4 mt-8">
              <label
                className="text-xiaomi-color font-bold text-lg block mb-1"
                htmlFor="profile_image"
              >
                Profile Image:
              </label>
              <input
                type="file"
                name="profile_image"
                id="profile_image"
                accept="image/*"
                onChange={handleImageChange}
                className="text-gray-400 bg-transparent border-b-2 relative w-[300px]"
              />
            </div>
            <button
              type="submit"
              className="p-2 mt-4 text-gray-400 rounded-md border-2 border-xiaomi-color"
            >
              Update Profile
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

export default UserProfile;
