// import { useState, useEffect } from 'react';
// import { getUsers, disableUser } from '../../services/UserService';

// export default function UserList() {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const fetchUsers = async () => {
//     try {
//       const data = await getUsers();
//       setUsers(data);
//       setLoading(false);
//     } catch (err) {
//       setError(err.message);
//       setLoading(false);
//     }
//   };

//   const handleDisable = async (userId) => {
//     if (window.confirm('Are you sure you want to disable this user account?')) {
//       try {
//         await disableUser(userId);
//         setUsers(users.filter(user => user.id !== userId));
//       } catch (err) {
//         setError(err.message);
//       }
//     }
//   };

//   if (loading) return <div className="p-4">Loading users...</div>;
//   if (error) return <div className="p-4 text-red-500">Error: {error}</div>;

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-6">User Management</h1>
      
//       <div className="bg-white rounded-lg shadow overflow-hidden">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-gray-50">
//             <tr>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//             </tr>
//           </thead>
          
//           <tbody className="bg-white divide-y divide-gray-200">
//             {users.map((user) => (
//               <tr key={user.id}>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.id}</td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.username}</td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                   <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
//                     user.role === 'admin' 
//                       ? 'bg-green-100 text-green-800' 
//                       : 'bg-blue-100 text-blue-800'
//                   }`}>
//                     {user.role}
//                   </span>
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                   {user.role !== 'admin' && (
//                     <button
//                       onClick={() => handleDisable(user.id)}
//                       className="text-red-600 hover:text-red-900"
//                     >
//                       Disable
//                     </button>
//                   )}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, disableUser } from '../../redux/userSlice';

const UserList = () => {
  const dispatch = useDispatch();
  const { users, status, error } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleDisable = (id) => {
    if (window.confirm('Are you sure you want to disable this user?')) {
      dispatch(disableUser(id));
    }
  };

  if (status === 'loading') return <p>Loading users...</p>;
  if (status === 'failed') return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">User List</h2>
      <table className="min-w-full border text-sm text-left">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Username</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Role</th>
            <th className="p-2 border">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 && (
            <tr>
              <td colSpan="5" className="text-center p-4">
                No users found
              </td>
            </tr>
          )}
          {users.map((user) => (
            <tr key={user.id}>
              <td className="p-2 border">{user.id}</td>
              <td className="p-2 border">{user.username}</td>
              <td className="p-2 border">{user.email}</td>
              <td className="p-2 border">{user.role}</td>
              <td className="p-2 border">
                {user.role !== 'admin' ? (
                  <button
                    onClick={() => handleDisable(user.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                  >
                    Disable
                  </button>
                ) : (
                  <span className="text-gray-400 italic">N/A</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
