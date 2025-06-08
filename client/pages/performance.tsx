// components/GoalComponent.tsx
"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";
import { PiInstagramLogoFill } from "react-icons/pi";
import { FaSquareRss } from "react-icons/fa6";
import Navbar from "./navbar";

interface Item {
  _id?: string;
  description: string;
  status: string;
  targetDate: string;
}

const SectionCard = ({ title, items, newItem, setNewItem, onAdd, addLabel }: any) => (
  <div className="bg-white rounded-lg shadow-md p-6">
    <h3 className="text-xl font-semibold mb-4 border-b-2 pb-2">{title}</h3>
    <div className="flex flex-wrap gap-3 mb-4">
      <input
        type="text"
        placeholder={`${title} description`}
        className="flex-1 min-w-[150px] border border-gray-300 rounded px-3 py-2 focus:outline-indigo-500"
        value={newItem.description}
        onChange={e => setNewItem({ ...newItem, description: e.target.value })}
      />
      <input
        type="text"
        placeholder="Status / rating"
        className="w-24 border border-gray-300 rounded px-3 py-2 focus:outline-indigo-500"
        value={newItem.status}
        onChange={e => setNewItem({ ...newItem, status: e.target.value })}
      />
      <input
        type="date"
        className="border border-gray-300 rounded px-3 py-2 focus:outline-indigo-500"
        value={newItem.targetDate}
        onChange={e => setNewItem({ ...newItem, targetDate: e.target.value })}
      />
      <button
        onClick={onAdd}
        className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded px-4 py-2"
      >
        {addLabel}
      </button>
    </div>
    <ul className="list-disc pl-5 space-y-1">
      {items.map((i: Item) => (
        <li key={i._id} className="text-gray-700">
          <span className="font-semibold">{i.description}</span> — <span>{i.status}</span> <span className="text-sm text-gray-400">({i.targetDate})</span>
        </li>
      ))}
    </ul>
  </div>
);

const GoalComponent = () => {
  const [goals, setGoals] = useState<Item[]>([]);
  const [reviews, setReviews] = useState<Item[]>([]);
  const [plans, setPlans] = useState<Item[]>([]);

  const [newGoal, setNewGoal] = useState<Item>({ description: "", status: "", targetDate: "" });
  const [newReview, setNewReview] = useState<Item>({ description: "", status: "", targetDate: "" });
  const [newPlan, setNewPlan] = useState<Item>({ description: "", status: "", targetDate: "" });

  const fetchAll = async () => {
    try {
      const [gRes, rRes, pRes] = await Promise.all([
        axios.get<Item[]>("/performance/goals"),
        axios.get<Item[]>("/performance/reviews"),
        axios.get<Item[]>("/performance/development-plans")
      ]);
      setGoals(gRes.data);
      setReviews(rRes.data);
      setPlans(pRes.data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const handleAdd = async (endpoint: string, item: Item, resetFn: Function) => {
    if (!item.description || !item.status || !item.targetDate) {
      return alert("Please fill all fields!");
    }
    try {
      await axios.post(`/performance/${endpoint}`, item);
      resetFn({ description: "", status: "", targetDate: "" });
      fetchAll();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 py-10 grid gap-8">
        <SectionCard
          title="Goals"
          items={goals}
          newItem={newGoal}
          setNewItem={setNewGoal}
          onAdd={() => handleAdd("goals", newGoal, setNewGoal)}
          addLabel="Add Goal"
        />
        <SectionCard
          title="Reviews"
          items={reviews}
          newItem={newReview}
          setNewItem={setNewReview}
          onAdd={() => handleAdd("reviews", newReview, setNewReview)}
          addLabel="Add Review"
        />
        <SectionCard
          title="Development Plan"
          items={plans}
          newItem={newPlan}
          setNewItem={setNewPlan}
          onAdd={() => handleAdd("development-plans", newPlan, setNewPlan)}
          addLabel="Add Plan"
        />
      </main>

       <section id="foot">
          <footer className="footer">
            <div className="footer-container">
              <div className="footer-column">
                <h3>COMPANY</h3>
                <ul>
                  <li>
                    <a href="#">Careers</a>
                  </li>
                  <li>
                    <a href="#">About Us</a>
                  </li>
                  <li>
                    <a href="#">FAQ</a>
                  </li>
                  <li>
                    <a href="#">Blog</a>
                  </li>
                  <li>
                    <a href="#">Privacy</a>
                  </li>
                  <li>
                    <a href="#">Customers</a>
                  </li>
                </ul>
              </div>
              <div className="footer-column">
                <h3>CATEGORIES</h3>
                <ul>
                  <li>
                    <a href="#">Employee Details</a>
                  </li>
                  <li>
                    <a href="#">Register Employee</a>
                  </li>
                  <li>
                    <a href="#">Payroll</a>
                  </li>
                  <li>
                    <a href="#">Time and attendance</a>
                  </li>
                </ul>
              </div>

              <div className="footer-column newsletter">
                <h3>GET IN TOUCH</h3>
                <form className="get">
                  <input type="email" placeholder="Enter your email here..." />
                  <button type="submit">SEND MESSAGE</button>
                </form>
              </div>
            </div>
            <div className="footer-bottom">
              <p>
                Copyright © 2022 <a href="#">Sage HR</a> | All Rights Reserved
              </p>
              <div className="social-icons">
                <div className="iii">
                  <table>
                    <tbody>
                      <tr>
                        <td>
                          <a className="a1" href="#">
                            <FaFacebook />
                          </a>
                        </td>
                        <td>
                          <a href="https://x.com/Jaspree99070719">
                            <FaTwitter />
                          </a>
                        </td>
                        <td>
                          <a href="https://github.com/Jaspreet-2209">
                            <FaLinkedin />
                          </a>
                        </td>
                        <td>
                          <a href="#">
                            <PiInstagramLogoFill />
                          </a>
                        </td>
                        <td>
                          <a href="#">
                            <FaSquareRss />
                          </a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </footer>
        </section>
    </div>
  );
};

export default GoalComponent;
