import { useState } from 'react';
import { db } from '../firebase/firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { auth } from '../firebase/firebase';
import { useNavigate } from "react-router-dom";

function BMI() {
    const [weight, setWeight] = useState("");
    const [height, setHeight] = useState("");
    const [bmi, setBmi] = useState(null);
  
    const handleCalculate = (e) => {
      e.preventDefault();
      if (!weight || !height) return;
    
      const weightNum = parseFloat(weight);
      const heightNum = parseFloat(height);
    
      if (isNaN(weightNum) || isNaN(heightNum) || heightNum === 0) return;
    
      const heightInMeters = heightNum / 100;
      const calculatedBmi = (weightNum / (heightInMeters ** 2)).toFixed(1);
      setBmi(calculatedBmi);
    };
  
    const getStatus = (bmi) => {
      const numBmi = parseFloat(bmi);
      if (numBmi < 18.5) return "Underweight";
      if (numBmi < 25) return "Normal"; // ← 24.9 atau 25, better pakai batas atas
      if (numBmi < 30) return "Overweight";
      return "Obese";
    };
    
  
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <form onSubmit={handleCalculate} className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">BMI Calculator</h1>
          <input
            type="number"
            placeholder="Weight (kg)"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="w-full mb-4 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <input
            type="number"
            placeholder="Height (cm)"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="w-full mb-6 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <button
            type="submit"
            className="w-full bg-green-500 text-white p-3 rounded hover:bg-green-600 transition"
          >
            Calculate
          </button>
  
          {bmi && (
            <div className="mt-6 text-center">
              <p className="text-xl font-semibold text-gray-800">Your BMI: {bmi}</p>
              <p className="text-sm text-gray-600 mt-1">{getStatus(bmi)}</p>
            </div>
          )}
        </form>
      </div>
    );
  }
  
  export default BMI;