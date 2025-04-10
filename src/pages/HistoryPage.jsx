import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase/firebase";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const HistoryPage = () => {
  const [bmiHistory, setBmiHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = auth.currentUser;

  useEffect(() => {
    const fetchHistory = async () => {
      if (!user) return;

      try {
        const q = query(
          collection(db, "bmiHistory"),
          where("uid", "==", user.uid),
          orderBy("date", "asc")
        );
        const querySnapshot = await getDocs(q);

        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setBmiHistory(data);
      } catch (error) {
        console.error("Error fetching history:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [user]);

  if (loading) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto mt-10 p-4 bg-white shadow rounded">
      <h1 className="text-2xl font-bold mb-6 text-center">BMI History</h1>

      {bmiHistory.length === 0 ? (
        <p className="text-center text-gray-500">No BMI records found.</p>
      ) : (
        <>
          {/* 🧾 Table List */}
          <div className="overflow-x-auto mb-6">
            <table className="table-auto w-full border">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-2 border">Date</th>
                  <th className="px-4 py-2 border">Weight (kg)</th>
                  <th className="px-4 py-2 border">Height (cm)</th>
                  <th className="px-4 py-2 border">BMI</th>
                </tr>
              </thead>
              <tbody>
                {bmiHistory.map((item) => (
                  <tr key={item.id}>
                    <td className="border px-4 py-2">{item.date}</td>
                    <td className="border px-4 py-2">{item.weight}</td>
                    <td className="border px-4 py-2">{item.height}</td>
                    <td className="border px-4 py-2">{item.bmi.toFixed(1)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 📈 Line Chart */}
          <h2 className="text-xl font-semibold mb-2">BMI Progress Chart</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={bmiHistory}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis domain={["dataMin - 1", "dataMax + 1"]} />
                <Tooltip />
                <Line type="monotone" dataKey="bmi" stroke="#3182ce" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </>
      )}
    </div>
  );
};

export default HistoryPage;
