import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';


const Register = () => {
    const navigate = useNavigate();
    const [inputs, setInputs] = React.useState({
        name: '',
        email: '',
        password: ''
    });
    const [error, setError] = React.useState(null);
    const [message, setMessage] = React.useState(null);

    const inputHandler = (e) => {
        const { name, value } = e.target;
        setInputs((prev) => ({ ...prev, [name]: value }));
    }

    const registerUser = async (e) => {
        e.preventDefault();
        setError(null);
        setMessage(null);

        try {
            const data = await fetch('http://localhost:3000/auth/user/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(inputs)
            });

            const res = await data.json();

            if (!data.ok) {
                setError(res.message || 'Registration failed');
                return;
            }

            setMessage(res.message || 'Registration successful');
            setInputs({ name: '', email: '', password: '' });
            navigate('/login');
        } catch (err) {
            setError('Unable to reach the server. Please try again later.');
            console.error('registerUser fetch error', err);
        }
    }

  return (
    <>
      <div className='container'>
        <h1 className='text-3xl font-bold text-center mb-10'>Register</h1>
        <div className='mb-4'>
            {error && <p className='text-red-500 text-center'>{error}</p>}
            {message && <p className='text-green-500 text-center'>{message}</p>}
        </div>
        <form className=' bg-black w-2/4 mx-auto p-10 rounded-lg' onSubmit={registerUser}>
            <div className='block mb-4'>
                <input type='text' placeholder='Name' name='name' className='bg-white w-full rounded p-3' onChange={inputHandler} />
            </div>
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

export default Register
