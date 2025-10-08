// import React, { useEffect, useState } from 'react';
// import API from '../api';
// import { motion } from 'framer-motion';

// export default function Profile() {
//   const [user, setUser] = useState(null);
//   const [form, setForm] = useState({ name: '', email: '', password: '' });
//   const [file, setFile] = useState(null);
//   const [msg, setMsg] = useState('');

//   // Fetch logged-in user profile
//   const fetchProfile = async () => {
//     try {
//       const res = await API.get('/users/profile');
//       setUser(res.data);
//       setForm({ name: res.data.name, email: res.data.email, password: '' });
//       localStorage.setItem('user', JSON.stringify(res.data));
//     } catch (err) {
//       setMsg('Unable to fetch profile');
//     }
//   };

//   useEffect(() => {
//     fetchProfile();
//     // eslint-disable-next-line
//   }, []);

//   const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

//   const onUpdate = async (e) => {
//     e.preventDefault();
//     try {
//       await API.put('/users/profile', form);
//       setMsg('Profile updated successfully');
//       fetchProfile();
//     } catch (err) {
//       setMsg(err.response?.data?.message || 'Update failed');
//     }
//   };

//   const onFileChange = (e) => setFile(e.target.files[0]);

//   const onUpload = async () => {
//     if (!file) return setMsg('Select a file first');
//     const fd = new FormData();
//     fd.append('profileImage', file);

//     try {
//       const res = await API.post('/users/upload', fd, {
//         headers: { 'Content-Type': 'multipart/form-data' },
//       });
//       setMsg('Upload successful');

//       // Update avatar immediately without re-fetching profile
//       setUser(prev => ({ ...prev, avatar: res.data.avatar }));
//       localStorage.setItem(
//         'user',
//         JSON.stringify({ ...user, avatar: res.data.avatar })
//       );

//     } catch (err) {
//       setMsg(err.response?.data?.message || 'Upload failed');
//     }
//   };

//   if (!user)
//     return (
//       <div className="flex items-center justify-center h-screen text-gray-500">
//         Loading...
//       </div>
//     );

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-purple-400 to-pink-400 flex justify-center items-start py-10 px-4">
//       <motion.div
//         initial={{ opacity: 0, y: -50 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//         className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-2xl"
//       >
//         {msg && (
//           <div className="bg-green-100 text-green-700 p-3 rounded mb-4 text-center">
//             {msg}
//           </div>
//         )}

//         <div className="flex flex-col items-center">
//           <motion.img
//             key={user.avatar} // ensures re-render animation on avatar change
//             src={
//               user.avatar
//                 ? `${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/uploads/${user.avatar}`
//                 : 'https://via.placeholder.com/150'
//             }
//             alt="avatar"
//             className="w-36 h-36 object-cover rounded-full border-4 border-purple-400 mb-4 shadow-md"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ duration: 0.6 }}
//           />

//           <h2 className="text-2xl font-bold text-gray-800 mb-1">{user.name}</h2>
//           <p className="text-gray-600 mb-4">{user.email}</p>
//         </div>

//         <hr className="my-6" />

//         <h3 className="text-xl font-semibold mb-4 text-gray-700">Update Profile</h3>
//         <form className="space-y-4" onSubmit={onUpdate}>
//           <input
//             name="name"
//             value={form.name}
//             onChange={onChange}
//             placeholder="Name"
//             className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
//           />
//           <input
//             name="email"
//             type="email"
//             value={form.email}
//             onChange={onChange}
//             placeholder="Email"
//             className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
//           />
//           <input
//             name="password"
//             type="password"
//             value={form.password}
//             onChange={onChange}
//             placeholder="New password (leave blank to keep)"
//             className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
//           />
//           <motion.button
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             type="submit"
//             className="w-full py-3 bg-purple-500 text-white font-semibold rounded-lg shadow hover:bg-purple-600 transition"
//           >
//             Update Profile
//           </motion.button>
//         </form>

//         <hr className="my-6" />

//         <h3 className="text-xl font-semibold mb-4 text-gray-700">Upload Profile Picture</h3>
//         <div className="flex items-center gap-3">
//           <input type="file" accept="image/*" onChange={onFileChange} />
//           <motion.button
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             onClick={onUpload}
//             className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition"
//           >
//             Upload
//           </motion.button>
//         </div>
//       </motion.div>
//     </div>
//   );
// }
import React, { useEffect, useState } from 'react';
import API from '../api';
import { motion } from 'framer-motion';

export default function Profile() {
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [file, setFile] = useState(null);
  const [msg, setMsg] = useState('');

  // Fetch logged-in user profile
  const fetchProfile = async () => {
    try {
      const res = await API.get('/users/profile');
      setUser(res.data);
      setForm({ name: res.data.name, email: res.data.email, password: '' });
      localStorage.setItem('user', JSON.stringify(res.data));
    } catch (err) {
      setMsg('Unable to fetch profile');
    }
  };

  useEffect(() => {
    fetchProfile();
    // eslint-disable-next-line
  }, []);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onUpdate = async (e) => {
    e.preventDefault();
    try {
      await API.put('/users/profile', form);
      setMsg('Profile updated successfully');
      fetchProfile();
    } catch (err) {
      setMsg(err.response?.data?.message || 'Update failed');
    }
  };

  const onFileChange = (e) => setFile(e.target.files[0]);

  const onUpload = async () => {
    if (!file) return setMsg('Select a file first');
    const fd = new FormData();
    fd.append('profileImage', file);

    try {
      const res = await API.post('/users/upload', fd, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setMsg('Upload successful');

      // Immediately update avatar in frontend
      setUser((prev) => ({
        ...prev,
        avatar: res.data.avatar, // backend should return { avatar: 'filename.jpg' }
      }));

      fetchProfile(); // optional, if you want to refresh full profile
    } catch (err) {
      setMsg(err.response?.data?.message || 'Upload failed');
    }
  };

  if (!user)
    return (
      <div className="flex items-center justify-center h-screen text-gray-500">
        Loading...
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 to-pink-400 flex justify-center items-start py-10 px-4">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-2xl"
      >
        {msg && (
          <div className="bg-green-100 text-green-700 p-3 rounded mb-4 text-center">
            {msg}
          </div>
        )}

        <div className="flex flex-col items-center">
         <img
  src={user.profileImage || 'https://via.placeholder.com/150'}
  alt="avatar"
  className="w-36 h-36 object-cover rounded-full border-4 border-purple-400 mb-4 shadow-md"
/>

          <h2 className="text-2xl font-bold text-gray-800 mb-1">{user.name}</h2>
          <p className="text-gray-600 mb-4">{user.email}</p>
        </div>

        <hr className="my-6" />

        <h3 className="text-xl font-semibold mb-4 text-gray-700">Update Profile</h3>
        <form className="space-y-4" onSubmit={onUpdate}>
          <input
            name="name"
            value={form.name}
            onChange={onChange}
            placeholder="Name"
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
          />
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={onChange}
            placeholder="Email"
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
          />
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={onChange}
            placeholder="New password (leave blank to keep)"
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full py-3 bg-purple-500 text-white font-semibold rounded-lg shadow hover:bg-purple-600 transition"
          >
            Update Profile
          </motion.button>
        </form>

        <hr className="my-6" />

        <h3 className="text-xl font-semibold mb-4 text-gray-700">Upload Profile Picture</h3>
        <div className="flex items-center gap-3">
          <input type="file" accept="image/*" onChange={onFileChange} />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onUpload}
            className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition"
          >
            Upload
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
