import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../api';
import Button from './Button';

const ActivateAccount = () => {
    const [status, setStatus] = useState("Please wait while we activate your account...");
    const location = useLocation();
    const navigate = useNavigate();
    const [message, setMessage] = useState({ type: '', text: '' });

    const searchParams = new URLSearchParams(location.search);
    const uid = searchParams.get('uid');
    const token = searchParams.get('token');
    const email = searchParams.get('email');


    const handleResend = async () => {
        try {
            const response = await api.post('api/v1/users/resend_activation/', {
                email
            });
            if (response.status === 204) {
                setMessage({ type: 'success', text: 'Activation email resent. Please check your inbox.' });
            } else {
                setMessage({ type: 'error', text: 'Error resending the activation email.' });
            }
        } catch (error) {
            setMessage({ type: 'error', text: 'Error resending the activation email.' });
        }
    };


    useEffect(() => {
        const activateUser = async () => {
            if (!uid || !token) {
                setStatus('Please check your email for the activation link.');
                return;
            }
    
            try {
                const response = await api.post('api/v1/users/activation/', {
                    uid,
                    token
                });
                if (response.status === 204) {
                    setStatus('Your account has been activated successfully. Redirecting to login page...');
                    setTimeout(() => navigate('/login'), 3000);
                }
            } catch (error) {
                setStatus('Activation failed! Please try again or contact support.');
            }
        };
    
        activateUser();
    }, [uid, token, navigate]);
    

    return (
        <section className="container flex justify-center">
            <div className="mt-40 border items-center w-[350px] border-gray-400 rounded-xl text-center pb-6">
                <div>
                    <h2 className="text-2xl font-bold text-xiaomi-color p-4 border-b border-gray-400">Account Activation</h2>
                </div>
                <div className="my-10">
                    <h1 className="text-green-400">{status}</h1>
                </div>
                {message.text && (
                    <div className={message.type === 'success' ? 'text-green-500' : 'text-red-500'}>
                        {message.text}
                    </div>
                )}
                <Button label="Resend Activation Link" onClick={handleResend} />
            </div>
        </section>
    );
};

export default ActivateAccount;
