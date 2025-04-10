import { useEffect, useState } from 'react';
import { auth, db } from '@/firebase/firebase'; // pastikan path-nya sesuai
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

export default function ProfilePage() {
  const [userData, setUserData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    birthdate: '',
    gender: '',
    height: '',
    weight: ''
  });

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const docRef = doc(db, 'users', user.uid);
        const snap = await getDoc(docRef);
        if (snap.exists()) {
          setUserData(snap.data());
          setFormData(snap.data());
        }
      }
    });
    return () => unsub();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    const uid = auth.currentUser?.uid;
    if (!uid) return;
    const ref = doc(db, 'users', uid);
    await updateDoc(ref, formData);
    setUserData(formData);
    setEditMode(false);
  };

  if (!userData) return <div className="p-4">Loading...</div>;

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      <h1 className="text-2xl font-bold mb-4">👤 Profil</h1>

      <div className="space-y-4">
        {['username', 'birthdate', 'gender', 'height', 'weight'].map((field) => (
          <div key={field}>
            <label className="block font-medium capitalize">{field}</label>
            {editMode ? (
              <input
                type={field === 'birthdate' ? 'date' : 'text'}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            ) : (
              <div className="p-2 border rounded bg-gray-100">{userData[field]}</div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-6">
        {editMode ? (
          <button onClick={handleSave} className="px-4 py-2 bg-green-600 text-white rounded">Simpan</button>
        ) : (
          <button onClick={() => setEditMode(true)} className="px-4 py-2 bg-blue-600 text-white rounded">Edit Profil</button>
        )}
      </div>
    </div>
  );
}
