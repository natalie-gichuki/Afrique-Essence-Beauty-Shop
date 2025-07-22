import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error } = useSelector((state) => state.auth);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await dispatch(login({ email, password }));
            if (result.meta.requestStatus === 'fulfilled') {
                clearForm();
                // Redirect to home or dashboard after successful login
                navigate('/');
            }
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    // clear form fields after submission
    const clearForm = () => {
        setEmail('');
        setPassword('');
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-sm mx-auto mt-24 bg-white p-8 rounded shadow-md"
            autoComplete="off"
        >
            <div className="flex justify-center mb-6">
                {/* Bootstrap logo substitute */}
                <div className="bg-purple-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-2xl font-bold">
                    L
                </div>
            </div>

            <h2 className="text-center text-2xl font-semibold mb-6">Please sign in</h2>

            {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

            <div className="mb-4">
                <label className="block mb-1 text-sm font-medium text-gray-700">Email address</label>
                <input
                    type="email"
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="new-email"
                />
            </div>

            <div className="mb-4">
                <label className="block mb-1 text-sm font-medium text-gray-700">Password</label>
                <input
                    type="password"
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete="new-password"
                />
            </div>

            <div className="flex items-center mb-4">
                <input type="checkbox" className="mr-2" />
                <label className="text-sm text-gray-700">Remember me</label>
            </div>

            <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded"
                disabled={loading}
            >
                {loading ? 'Logging in...' : 'Sign in'}
            </button>

            <p className="text-center text-xs text-gray-400 mt-6">© 2017–2025</p>
        </form>

    );
}

export default Login;