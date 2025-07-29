import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { logout } from '../redux/slices/authSlice';
import { t } from 'i18next';

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  if (!user) {
    return <Navigate to="/login" />;
  }

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-fuchsia-100 to-fuchsia-200">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md border border-gray-300">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-extrabold text-gray-800">👤 {t('user')} {t('profile')}</h2>
          <p className="text-gray-500 mt-1">{t('welcomeBack')}, {user.email}</p>
        </div>

        <div className="space-y-4 text-sm text-gray-700">
          <div className="flex justify-between border-b py-2">
            <span className="font-medium">📧 {t('email')}:</span>
            <span>{user.email}</span>
          </div>
          <div className="flex justify-between border-b py-2">
            <span className="font-medium">🎓 {t('role')}:</span>
            <span className="capitalize">{user.role}</span>
          </div>
          <div className="flex justify-between border-b py-2">
            <span className="font-medium">🆔 {t('user')} ID:</span>
            <span>{user.sub || user.id}</span>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="mt-8 w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
        >
          {t('logout')}
        </button>
      </div>
    </div>
  );
};

export default Profile;
