import { auth } from '../firebase/firebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md text-center w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Welcome to BMI App</h1>
        <p className="text-gray-600 mb-6">Track your body mass index with ease</p>
        <div className="flex flex-col gap-4">
          <button
            onClick={() => navigate("/bmicalculator")}
            className="w-full bg-green-500 text-white p-3 rounded hover:bg-green-600 transition"
          >
            Go to BMI Calculator
          </button>
          <button
            onClick={() => navigate("/profile")}
            className="w-full bg-indigo-500 text-white p-3 rounded hover:bg-indigo-600 transition"
          >
            Go to Profile
          </button>
          <button
            onClick={handleLogout}
            className="w-full bg-gray-200 text-gray-800 p-3 rounded hover:bg-gray-300 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
