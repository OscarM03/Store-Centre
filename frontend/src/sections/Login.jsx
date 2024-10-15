import { useState } from "react";
import api from "../api";
import Button from "../components/Button";
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'; 

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate(); 

    const handleLogin = async (event) => {
        event.preventDefault();
    
        try {
            const response = await api.post('api/v1/jwt/create/', {
                email,
                password,
            });
    
            const { access, refresh } = response.data;
            Cookies.set('access_token', access);
            Cookies.set('refresh_token', refresh);
            navigate('/');
    
        } catch (err) {
            if (err.response && err.response.data) {
                setError('Email or password is incorrect. Please check your credentials and try again.');
            } else {
                setError('An unexpected error occurred.');
            }
        }
    };
    
    

    return (
        <section className="container flex justify-center">
            <div className="mt-40 border items-center w-[350px] border-gray-400 rounded-xl text-center">
                <form className="py-4">
                    <div className="border-b border-gray-400">
                        <h2 className="text-2xl font-bold text-xiaomi-color pb-4">Login</h2>
                        {error && <p className="text-red-500">{error}</p>}
                    </div>
                    <div className="mt-8">
                        <input 
                            type="email" 
                            required
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="text-gray-400 bg-transparent border-b-2 border-xiaomi-color relative w-[300px] focus:bg-transparent focus:outline-none"
                        />
                    </div>
                    <div className="my-4">
                        <input 
                            type="password" 
                            required
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="text-gray-400 my-6 bg-transparent border-b-2 border-xiaomi-color relative w-[300px] focus:bg-transparent focus:outline-none"
                        />
                    </div>
                    <div className="flex items-center justify-between mx-6 mb-6">
                        <a href="/forgetpassword" className="text-gray-400">Forgot Password?</a>
                        <Button label="Log In" onClick={handleLogin} />
                    </div>
                    <div>
                        <p className="text-gray-400">
                            Don't have an account? <a href="/register" className="text-xiaomi-color">Register</a>
                        </p>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default Login;
