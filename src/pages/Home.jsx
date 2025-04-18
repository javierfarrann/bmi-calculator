import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { FaCalculator, FaChartLine, FaUser } from 'react-icons/fa';
import { db } from '../firebase/firebase';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';


const getLatestBMI = async (userId) => {
  const bmiHistoryRef = collection(db, 'users', userId, 'bmiHistory');
  const q = query(bmiHistoryRef, orderBy('createdAt', 'status '), limit(1));
  const querySnapshot = await getDocs(q);
  if (!querySnapshot.empty) {
    const doc = querySnapshot.docs[0];
    return doc.data();
  }
  return null;
};


const getBMIStatus = (bmi) => {
  if (bmi < 18.5) return 'Underweight';
  if (bmi < 25) return 'Normal';
  return 'Overweight';
};

const Home = () => {
  const { currentUser } = useAuth();
  const [latestBMI, setLatestBMI] = useState(null);
  const [bmiStatus, setBMIStatus] = useState('');

  const username = currentUser?.displayName || currentUser?.email?.split('@')[0];

  useEffect(() => {
    const fetchBMI = async () => {
      try {
        const bmiData = await getLatestBMI(currentUser.uid);
        if (bmiData) {
          setLatestBMI(bmiData.bmi);
          setBMIStatus(getBMIStatus(bmiData.bmi));
        }
      } catch (error) {
        console.error('Error fetching BMI data:', error);
      }
    };
    if (currentUser) {
      fetchBMI();
    }
  }, [currentUser]);
  

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10 md:px-10">
      <div className="max-w-5xl mx-auto space-y-10">

        {/* Welcome */}
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Welcome back, {username} 👋</h1>
          <p className="text-gray-600 mt-2">Here's your quick health overview and tools to stay on track.</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-100 rounded-2xl p-6">
            <p className="text-sm text-gray-500">Your Latest BMI</p>
            <h2 className="text-2xl font-semibold text-gray-800 mt-1">
              {latestBMI !== null ? latestBMI : 'Loading...'}
            </h2>
            <span className="text-sm text-green-600">{bmiStatus}</span>
          </div>

          <div className="bg-gray-100 rounded-2xl p-6">
            <p className="text-sm text-gray-500">Last Updated</p>
            <h2 className="text-lg font-medium text-gray-700 mt-1">April 10, 2025</h2>
          </div>

          <div className="bg-gray-100 rounded-2xl p-6">
            <p className="text-sm text-gray-500">Weight Goal</p>
            <h2 className="text-lg font-medium text-gray-700 mt-1">Maintain</h2>
          </div>
        </div>


        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <Link to="/bmicalculator">
            <div className="flex items-center gap-4 p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition cursor-pointer">
              <FaCalculator className="text-indigo-500 text-2xl" />
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Calculate BMI</h3>
                <p className="text-sm text-gray-500">Use the BMI calculator tool</p>
              </div>
            </div>
          </Link>

          <Link to="/history">
            <div className="flex items-center gap-4 p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition cursor-pointer">
              <FaChartLine className="text-green-500 text-2xl" />
              <div>
                <h3 className="text-lg font-semibold text-gray-800">View History</h3>
                <p className="text-sm text-gray-500">See your BMI trends</p>
              </div>
            </div>
          </Link>

          <Link to="/profile">
            <div className="flex items-center gap-4 p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition cursor-pointer">
              <FaUser className="text-blue-500 text-2xl" />
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Your Profile</h3>
                <p className="text-sm text-gray-500">Manage your health info</p>
              </div>
            </div>
          </Link>
        </div>


        {/* Daily Motivation */}
        <div className="mt-10 p-6 bg-indigo-100 text-indigo-900 rounded-xl text-center shadow-sm">
          <p className="italic text-lg">“A little progress each day adds up to big results.”</p>
        </div>

      </div>
    </div>
  );
};

export default Home;
