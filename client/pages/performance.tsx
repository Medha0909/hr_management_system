import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaFacebook, FaSquareRss } from "react-icons/fa6";
import { FaTwitter, FaLinkedin } from "react-icons/fa";
import { PiInstagramLogoFill } from "react-icons/pi";
import Navbar from "./navbar";

const GoalComponent = () => {
  const [goals, setGoals] = useState<any[]>([]);
  const [review, setReview] = useState<any[]>([]);
  const [developmentPlan, setDevelopmentPlan] = useState<any[]>([]);
  const [newGoal, setNewGoal] = useState({ description: "", status: "", targetDate: "" });
  const [newReview, setNewReview] = useState({ description: "", status: "", targetDate: "" });
  const [newDevelopmentPlan, setNewDevelopmentPlan] = useState({ description: "", status: "", targetDate: "" });

  useEffect(() => {
    const fetchAll = async () => {
      const [goalRes, reviewRes, planRes] = await Promise.all([
        axios.get("https://hr-management-system-f8uk.onrender.com/performance/goals"),
        axios.get("https://hr-management-system-f8uk.onrender.com/performance/reviews"),
        axios.get("https://hr-management-system-f8uk.onrender.com/performance/development-plans"),
      ]);
      setGoals(goalRes.data);
      setReview(reviewRes.data);
      setDevelopmentPlan(planRes.data);
    };
    fetchAll();
  }, []);

  const addGoal = async () => {
    await axios.post("https://hr-management-system-f8uk.onrender.com/performance/goals", newGoal);
    setNewGoal({ description: "", status: "", targetDate: "" });
  };
  const addReview = async () => {
    await axios.post("https://hr-management-system-f8uk.onrender.com/performance/reviews", newReview);
    setNewReview({ description: "", status: "", targetDate: "" });
  };
  const addPlan = async () => {
    await axios.post("https://hr-management-system-f8uk.onrender.com/performance/development-plans", newDevelopmentPlan);
    setNewDevelopmentPlan({ description: "", status: "", targetDate: "" });
  };

  const Section = ({ title, newItem, setNewItem, addItem, list }: any) => (
    <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-3xl mx-auto mt-10">
      <h2 className="text-2xl font-semibold mb-4 text-indigo-700">{title}</h2>
      <div className="grid md:grid-cols-3 sm:grid-cols-1 gap-4">
        <input
          type="text"
          className="border p-2 rounded-md"
          placeholder="Description"
          value={newItem.description}
          onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
        />
        <input
          type="text"
          className="border p-2 rounded-md"
          placeholder="Status/Rating"
          value={newItem.status}
          onChange={(e) => setNewItem({ ...newItem, status: e.target.value })}
        />
        <input
          type="date"
          className="border p-2 rounded-md"
          value={newItem.targetDate}
          onChange={(e) => setNewItem({ ...newItem, targetDate: e.target.value })}
        />
      </div>
      <div className="flex justify-end mt-4">
        <button
          onClick={addItem}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
        >
          Add {title}
        </button>
      </div>
      <ul className="mt-6 space-y-2">
        {list?.map((item: any) => (
          <li key={item._id} className="bg-gray-100 p-3 rounded-md shadow-sm">
            <span className="font-medium">{item.description}</span> – <span>{item.status}</span>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <>
      <Navbar />
      <div className="bg-gray-50 min-h-screen py-10 px-4">
        <Section
          title="Goals"
          newItem={newGoal}
          setNewItem={setNewGoal}
          addItem={addGoal}
          list={goals}
        />
        <Section
          title="Reviews"
          newItem={newReview}
          setNewItem={setNewReview}
          addItem={addReview}
          list={review}
        />
        <Section
          title="Development Plans"
          newItem={newDevelopmentPlan}
          setNewItem={setNewDevelopmentPlan}
          addItem={addPlan}
          list={developmentPlan}
        />
      </div>

      <footer className="bg-indigo-900 text-white py-10">
        <div className="container mx-auto grid md:grid-cols-3 sm:grid-cols-1 gap-8 px-4">
          <div>
            <h3 className="font-bold mb-3">COMPANY</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#">Careers</a></li>
              <li><a href="#">About Us</a></li>
              <li><a href="#">FAQ</a></li>
              <li><a href="#">Blog</a></li>
              <li><a href="#">Privacy</a></li>
              <li><a href="#">Customers</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-3">CATEGORIES</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#">Employee Details</a></li>
              <li><a href="#">Register Employee</a></li>
              <li><a href="#">Payroll</a></li>
              <li><a href="#">Time and Attendance</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-3">GET IN TOUCH</h3>
            <form className="flex flex-col gap-2">
              <input type="email" placeholder="Enter your email here..." className="p-2 rounded-md text-black" />
              <button type="submit" className="bg-white text-indigo-900 px-4 py-2 rounded-md hover:bg-gray-200">
                SEND MESSAGE
              </button>
            </form>
          </div>
        </div>
        <div className="mt-10 text-center text-sm border-t border-indigo-800 pt-4">
          <p>
            © 2022 <a href="#" className="underline">Sage HR</a> | All Rights Reserved
          </p>
          <div className="flex justify-center mt-4 space-x-4 text-xl">
            <a href="#"><FaFacebook /></a>
            <a href="https://x.com/Jaspree99070719"><FaTwitter /></a>
            <a href="https://github.com/Jaspreet-2209"><FaLinkedin /></a>
            <a href="#"><PiInstagramLogoFill /></a>
            <a href="#"><FaSquareRss /></a>
          </div>
        </div>
      </footer>
    </>
  );
};

export default GoalComponent;
