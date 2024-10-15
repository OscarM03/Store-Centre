import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Button from "./Button"
import api from "../api"

const ForgetPassword = () => {
    const [email, setEmail] = useState("")
    const [status, setStatus] = useState("")
    const navigate = useNavigate();

    const handleClick = async (event) => {
        event.preventDefault()

        try {
            const response = await api.post('api/v1/users/reset_password/', {
                email,
            });
            if (response.status == 204) {
                setStatus("Link sent successfully, please check your email");
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
                    <div className="flex items-center justify-center mx-6 my-6">
                        <Button label="Send Link"  onClick={handleClick}/>
                    </div>
                </form>
            </div>
        </section>
  )
}

export default ForgetPassword
