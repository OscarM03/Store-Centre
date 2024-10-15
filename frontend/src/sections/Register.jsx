import { useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (password !== rePassword) {
            setError('Passwords do not match.');
            return;
        }

        try {
            const response = await api.post('/api/v1/users/', {
                username,
                email,
                first_name: firstName,
                last_name: lastName,
                password,
                re_password: rePassword
            });
            console.log(response.data)
            if (response.status === 201) {
                setSuccess('Registration successful! Please check your email to activate your account.');
                setUsername('');
                setEmail('');
                setFirstName('');
                setLastName('');
                setPassword('');
                setRePassword('');
                navigate(`/auth/activate?email=${encodeURIComponent(email)}`);

            } else {
                setError('Registration failed. Please try again.');
            }
        } catch (error) {
            if (error.response && error.response.data) {
                const errorData = error.response.data;
                let errorMessage = 'Registration failed. Please try again.';
                if (errorData.username) {
                    errorMessage = `Username: ${errorData.username[0]}`;
                } else if (errorData.email) {
                    errorMessage = `Email: ${errorData.email[0]}`;
                } else if (errorData.first_name) {
                    errorMessage = `First name: ${errorData.first_name[0]}`;
                } else if (errorData.last_name) {
                    errorMessage = `Last name: ${errorData.last_name[0]}`;
                } else if (errorData.password) {
                    errorMessage = `Password: ${errorData.password[0]}`;
                } else if (errorData.re_password) {
                    errorMessage = `Password confirmation: ${errorData.re_password[0]}`;
                } else if (errorData.non_field_errors) {
                    errorMessage = errorData.non_field_errors[0];
                }
                setError(errorMessage);
            } else {
                setError('An unexpected error occurred.');
            }
        }
    };

    return (
        <section className="container flex justify-center">
            <div className="mt-32 border items-center w-[350px] border-gray-400 rounded-xl text-center">
                <form onSubmit={handleSubmit} className="py-4">
                    <div className="border-b border-gray-400">
                        <h2 className="text-2xl font-bold text-xiaomi-color pb-4">Register</h2>
                        {error && <p className="text-red-500">{error}</p>}
                        {success && <p className="text-green-500">{success}</p>}
                    </div>
                    {/* Registration form fields */}
                    <div className="mt-8">
                        <input
                            type="text"
                            required
                            placeholder="Enter your first name"
                            className="text-gray-400 bg-transparent border-b-2 border-xiaomi-color relative w-[300px] focus:bg-transparent focus:outline-none"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </div>
                    <div className="mt-8">
                        <input
                            type="text"
                            required
                            placeholder="Enter your last name"
                            className="text-gray-400 bg-transparent border-b-2 border-xiaomi-color relative w-[300px] focus:bg-transparent focus:outline-none"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </div>
                    <div className="mt-8">
                        <input
                            type="text"
                            required
                            placeholder="Enter your username"
                            className="text-gray-400 bg-transparent border-b-2 border-xiaomi-color relative w-[300px] focus:bg-transparent focus:outline-none"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="mt-8">
                        <input
                            type="email"
                            required
                            placeholder="Enter your email"
                            className="text-gray-400 bg-transparent border-b-2 border-xiaomi-color relative w-[300px] focus:bg-transparent focus:outline-none"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <ul className="text-gray-400 text-start mx-6 mt-4">
                            <li>*Must be at least 8 characters long.</li>
                            <li className="mt-1">*Should not be too similar to your username or email.</li>
                            <li className="mt-1">*Cannot be a commonly used password. (1234...)</li>
                            <li className="mt-1">*Cannot be entirely numeric.</li>
                        </ul>
                    </div>
                    <div className="mt-8">
                        <input
                            type="password"
                            required
                            placeholder="Enter your password"
                            className="text-gray-400 bg-transparent border-b-2 border-xiaomi-color relative w-[300px] focus:bg-transparent focus:outline-none"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="my-4">
                        <input
                            type="password"
                            required
                            placeholder="Confirm your password"
                            className="text-gray-400 my-6 bg-transparent border-b-2 border-xiaomi-color relative w-[300px] focus:bg-transparent focus:outline-none"
                            value={rePassword}
                            onChange={(e) => setRePassword(e.target.value)}
                        />
                    </div>
                    <div className="flex justify-center mx-6 mb-6">
                        <button type="submit" className="text-white bg-xiaomi-color px-2 font-bold">Register</button>
                    </div>
                    
                    <div>
                        <p className="text-gray-400">Already have an account? <a href="/login" className="text-xiaomi-color">Login</a></p>
                    </div>
                </form>
            </div>
        </section>
    );
}

export default Register;
