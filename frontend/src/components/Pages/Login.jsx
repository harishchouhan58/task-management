import React from 'react'
import { useNavigate } from 'react-router-dom';


const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = React.useState({
        email: "",
        password: ""
    });
    const [error, setError] = React.useState("");
    const [message, setMessage] = React.useState("");

    const inputHandler = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    }

    const loginUser = async (e) => {
        e.preventDefault();
        setError("");
        setMessage(""); 

        try {
            const data = await fetch("http://localhost:3000/auth/user/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });
            const result = await data.json();
            if (result.error) {
                setError(result.error);
            } else {
                setMessage("Login successful!");
                localStorage.setItem("accessToken", result.accessToken);
                navigate("/"); // Redirect to home page after successful login
            }
        } catch (err) {
            setError("An error occurred while logging in.");
            console.error("Login error:", err);
        }
    }

  return (
    <>
      <div className='container'>
        <h1 className='text-3xl font-bold text-center mb-10'>Login</h1>
        <div className='mb-4'>
            {error && <p className='text-red-500 text-center'>{error}</p>}
            {message && <p className='text-green-500 text-center'>{message}</p>}
        </div>
        <form className=' bg-black w-2/4 mx-auto p-10 rounded-lg' onSubmit={loginUser}>
            <div className='block mb-4'>
                <input type='email' placeholder='Email' name='email' className='bg-white w-full rounded p-3' onChange={inputHandler}     />
            </div>
            <div className='block mb-4'>
                <input type='password' placeholder='Password' name='password' className='bg-white w-full rounded p-3' onChange={inputHandler} />
            </div>
            <div className='block text-center'>
                <input type='submit' name='submit' value="Submit" className='bg-blue-500 text-white p-2 px-6 rounded' />
            </div>
        </form>
      </div>
    </>
  )
}

export default Login
