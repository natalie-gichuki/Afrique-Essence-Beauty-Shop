import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [form, setForm] = useState({
        username: '',
        email: '',
        password: '',
        role: 'customer', // Default role
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error } = useSelector((state) => state.auth);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await dispatch(register(form));
            if (result.meta.requestStatus === 'fulfilled') {
                clearForm();
                // Redirect to login page after successful registration
                navigate('/login');
            }
        } catch (error) {
            console.error('Registration failed:', error);
        }
    };

    // clear form fields after submission
    const clearForm = () => {
        setForm({
            username: '',
            email: '',
            password: '',
            role: 'customer', // Reset to default role
        });
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-sm mx-auto mt-24 bg-white p-8 rounded shadow-md space-y-4"
            autoComplete="off"
        >
            <div className="flex justify-center mb-6">
                {/* Register logo substitute */}
                <div className="bg-green-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-2xl font-bold">
                    R
                </div>
            </div>

            <h2 className="text-center text-2xl font-semibold mb-6">Create an account</h2>

            {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

            <div className="mb-4">
                <label className="block mb-1 text-sm font-medium text-gray-700">Username</label>
                <input
                    name="username"
                    value={form.username}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-green-500"
                    placeholder="Username"
                    onChange={handleChange}
                    required
                    autoComplete="new-username"
                />
            </div>

            <div className="mb-4">
                <label className="block mb-1 text-sm font-medium text-gray-700">Email address</label>
                <input
                    name="email"
                    type="email"
                    value={form.email}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-green-500"
                    placeholder="Email"
                    onChange={handleChange}
                    required
                    autoComplete="new-email"
                />
            </div>

            <div className="mb-4">
                <label className="block mb-1 text-sm font-medium text-gray-700">Password</label>
                <input
                    name="password"
                    value={form.password}
                    type="password"
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-green-500"
                    placeholder="Password"
                    onChange={handleChange}
                    required
                    autoComplete="new-password"
                />
            </div>

            <button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded"
                disabled={loading}
            >
                {loading ? 'Registering...' : 'Register'}
            </button>

            <p className="text-center text-xs text-gray-400 mt-6">© 2017–2025</p>
        </form>

    );
}

export default Register;
