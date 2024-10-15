import { useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import Button from "./Button"
import api from "../api"

const NewPassword = () => {
    const [new_password, setNew_password] = useState("")
    const [re_new_password, setRe_new_password] = useState("")
    const [status, setStatus] = useState("")
    const navigate = useNavigate();

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const uid = searchParams.get('uid');
    const token = searchParams.get('token')

    const handleClick = async (event) => {
        event.preventDefault()

        try {
            const response = await api.post('api/v1/users/reset_password_confirm/', {
                uid,
                token,
                new_password,
                re_new_password
            });
            if (response.status == 204) {
                setStatus("Password reset successfully, redirecting you to login");
                setTimeout(() => navigate('/login'), 3000)
            }
        } catch (error) {
            setStatus("An error occured please try again");
        }
    }
  return (
    <section className="container flex justify-center">
    <div className="mt-40 border items-center w-[350px] border-gray-400 rounded-xl text-center">
        <form className="py-4">
        <div className="border-b border-gray-400">
                <h2 className="text-2xl font-bold text-xiaomi-color pb-4">Password Reset</h2>
                {status && <p className="text-green-500">{status}</p>}
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
                    placeholder="Enter Your New Password"
                    value={new_password}
                    onChange={(e) => setNew_password(e.target.value)}
                    className="text-gray-400 bg-transparent border-b-2 border-xiaomi-color relative w-[300px] focus:bg-transparent focus:outline-none"
                />
            </div>
            <div className="mt-8">
                <input 
                    type="password" 
                    required
                    placeholder="Confirm Your New Password"
                    value={re_new_password}
                    onChange={(e) => setRe_new_password(e.target.value)}
                    className="text-gray-400 bg-transparent border-b-2 border-xiaomi-color relative w-[300px] focus:bg-transparent focus:outline-none"
                />
            </div>
            <div className="flex items-center justify-center mx-6 my-6">
                <Button label="Reset Password"  onClick={handleClick}/>
            </div>
        </form>
    </div>
    </section>
  )
}

export default NewPassword
