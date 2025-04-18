import { useEffect, useState } from 'react';
import { auth, db } from '@/firebase/firebase';
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
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-8">
        <div className="mb-6 border-b pb-4 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
              👤 Profil Saya
            </h1>
            <p className="text-gray-500 text-sm">Kelola informasi pribadi kamu</p>
          </div>
          <button
            onClick={() => (editMode ? handleSave() : setEditMode(true))}
            className={`px-4 py-2 rounded-lg font-medium ${
              editMode
                ? 'bg-green-600 text-white hover:bg-green-700'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {editMode ? 'Simpan' : 'Edit Profil'}
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {[
            { label: 'Username', name: 'username' },
            { label: 'Tanggal Lahir', name: 'birthdate', type: 'date' },
            { label: 'Jenis Kelamin', name: 'gender' },
            { label: 'Tinggi Badan (cm)', name: 'height' },
            { label: 'Berat Badan (kg)', name: 'weight' }
          ].map(({ label, name, type = 'text' }) => (
            <div key={name}>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                {label}
              </label>
              {editMode ? (
                <input
                  type={type}
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <div className="w-full p-3 border rounded-lg bg-gray-100 text-gray-700">
                  {userData[name] || '-'}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
