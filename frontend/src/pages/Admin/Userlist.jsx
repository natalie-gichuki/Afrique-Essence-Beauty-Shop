import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, disableUser, fetchDisabledUsers } from '../../redux/userSlice';
import { t } from 'i18next';

const UserList = () => {
  const dispatch = useDispatch();
  const { users, status, error, disabledUsers } = useSelector((state) => state.users);
  const [showDisabled, setShowDisabled] = useState(false);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleDisable = (id) => {
    if (window.confirm('Are you sure you want to disable this user?')) {
      dispatch(disableUser(id));
    }
  };

  const toggleDisabledUsers = () => {
    if (!showDisabled) {
      dispatch(fetchDisabledUsers());
    }
    setShowDisabled(!showDisabled);
  };

  if (status === 'loading') {
    return <p className="text-center text-gray-700">Loading users...</p>;
  }

  if (status === 'failed') {
    return <p className="text-red-600 text-center">Error: {error}</p>;
  }

  return (
    <div className="p-6 bg-fuchsia-50 min-h-screen">
      <h2 className="text-2xl font-semibold text-gray-700 mb-6">👥 {t('userList')}</h2>
      <div className="mb-4 text-right">
        <button
          onClick={toggleDisabledUsers}
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
        >
          {showDisabled ? 'Hide Disabled Users' : '🔒 View Disabled Users'}
        </button>
      </div>

      <div className="overflow-x-auto shadow rounded-lg border border-purple-200 bg-white">
        <table className="min-w-full text-sm text-gray-700">
          <thead className="bg-purple-200 text-left">
            <tr>
              <th className="py-3 px-4 border">ID</th>
              <th className="py-3 px-4 border">{t('username')}</th>
              <th className="py-3 px-4 border">{t('email')}</th>
              <th className="py-3 px-4 border">{t('role')}</th>
              <th className="py-3 px-4 border">{t('actions')}</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500 italic">
                  No users found
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user.id} className="hover:bg-fuchsia-100 transition">
                  <td className="py-2 px-4 border">{user.id}</td>
                  <td className="py-2 px-4 border">{user.username}</td>
                  <td className="py-2 px-4 border">{user.email}</td>
                  <td className="py-2 px-4 border capitalize">{user.role}</td>
                  <td className="py-2 px-4 border text-center">
                    {user.role !== 'admin' ? (
                      <button
                        onClick={() => handleDisable(user.id)}
                        className="bg-purple-800 hover:bg-violet-800 text-white px-3 py-1 rounded-md transition"
                      >
                        {t('disable')}
                      </button>
                    ) : (
                      <span className="text-gray-400 italic">N/A</span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {showDisabled && (
        <div className="mt-10">
          <h3 className="text-xl font-medium text-gray-700 mb-3">🔒 Disabled Users</h3>
          <div className="overflow-x-auto shadow rounded-lg border border-purple-200 bg-white">
            <table className="min-w-full text-sm text-gray-700">
              <thead className="bg-purple-100 text-left">
                <tr>
                  <th className="py-3 px-4 border">ID</th>
                  <th className="py-3 px-4 border">{t('username')}</th>
                  <th className="py-3 px-4 border">{t('email')}</th>
                  <th className="py-3 px-4 border">{t('role')}</th>
                </tr>
              </thead>
              <tbody>
                {disabledUsers.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="text-center py-4 text-gray-500 italic">
                      No disabled users
                    </td>
                  </tr>
                ) : (
                  disabledUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-fuchsia-100 transition">
                      <td className="py-2 px-4 border">{user.id}</td>
                      <td className="py-2 px-4 border">{user.username}</td>
                      <td className="py-2 px-4 border">{user.email}</td>
                      <td className="py-2 px-4 border capitalize">{user.role}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
};

export default UserList;

