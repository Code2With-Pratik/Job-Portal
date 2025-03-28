import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./shared/Navbar";
import Footer from "./shared/Footer";

const roles = ["Frontend Developer", "Backend Developer", "Full Stack Developer", "Data Analyst", "Cybersecurity", "App Developer"];
const skills = {
  "Frontend Developer": ["React", "Vue", "Angular"],
  "Backend Developer": ["Node.js", "Django", "Spring Boot"],
  "Full Stack Developer": ["MERN", "MEAN", "LAMP"],
  "Data Analyst": ["Python", "SQL", "Power BI"],
  "Cybersecurity": ["Ethical Hacking", "Pen Testing"],
  "App Developer": ["Flutter", "React Native"],
};
const experiences = ["Fresher", "1 Year", "2 Years", "3+ Years"];

const questionsData = {
  "Frontend Developer": [
    { question: "Which is a JavaScript framework?", options: ["React", "Laravel", "Django", "Flask"], answer: "React" },
    { question: "Which is used for CSS styling?", options: ["Bootstrap", "Node.js", "Django", "Express"], answer: "Bootstrap" },
  ],
  "Backend Developer": [
    { question: "Which backend framework is based on JavaScript?", options: ["Node.js", "Django", "Spring Boot", "Flask"], answer: "Node.js" },
    { question: "Which database is NoSQL?", options: ["MongoDB", "MySQL", "PostgreSQL", "SQLite"], answer: "MongoDB" },
  ],
};

const MockInterview = () => {
  const [role, setRole] = useState("");
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [experience, setExperience] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [interviewStarted, setInterviewStarted] = useState(false);
  const navigate = useNavigate();

  const handleSkillChange = (skill) => {
    setSelectedSkills((prevSkills) =>
      prevSkills.includes(skill) ? prevSkills.filter((s) => s !== skill) : [...prevSkills, skill]
    );
  };

  const handleStart = () => {
    if (!role || selectedSkills.length === 0 || !experience) {
      alert("Please fill all fields to proceed.");
      return;
    }
    setInterviewStarted(true);
  };

  const handleNext = () => {
    if (selectedAnswer !== null) {
      const correctAnswer = questionsData[role][currentQuestion].answer;
      setAnswers([...answers, { ...questionsData[role][currentQuestion], selected: selectedAnswer }]);
      if (selectedAnswer === correctAnswer) {
        setScore(score + 1);
      }
    }
    setSelectedAnswer(null);
    if (currentQuestion < questionsData[role].length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setInterviewStarted(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <Navbar />
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-2xl">
        {!interviewStarted ? (
          <>
            <h2 className="text-2xl font-bold mb-4">Start Your Mock Interview</h2>
            <label className="block text-lg font-semibold mb-2">Select Role:</label>
            <select className="w-full p-2 mb-4 border rounded" value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="">Select Role</option>
              {roles.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
            {role && (
              <>
                <label className="block text-lg font-semibold mb-2">Select Skills:</label>
                <div className="grid grid-cols-2 gap-2 mb-4">
                  {skills[role]?.map((skill) => (
                    <label key={skill} className="flex items-center">
                      <input type="checkbox" value={skill} checked={selectedSkills.includes(skill)} onChange={() => handleSkillChange(skill)} className="mr-2" />
                      {skill}
                    </label>
                  ))}
                </div>
              </>
            )}
            <label className="block text-lg font-semibold mb-2">Select Experience:</label>
            <select className="w-full p-2 mb-4 border rounded" value={experience} onChange={(e) => setExperience(e.target.value)}>
              <option value="">Select Experience</option>
              {experiences.map((exp) => (
                <option key={exp} value={exp}>{exp}</option>
              ))}
            </select>
            <button className="bg-purple-600 text-white p-2 rounded w-full" onClick={handleStart}>Start Interview</button>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-4">Interview Question</h2>
            <p className="mb-4">{questionsData[role][currentQuestion]?.question}</p>
            {questionsData[role][currentQuestion]?.options.map((option) => (
              <button key={option} className={`block w-full p-2 mb-2 border rounded ${selectedAnswer === option ? 'bg-blue-500 text-white' : 'bg-gray-200'}`} onClick={() => setSelectedAnswer(option)}>
                {option}
              </button>
            ))}
            <button className="bg-green-500 text-white p-2 rounded w-full mt-4" onClick={handleNext}>Next</button>
          </>
        )}
        {!interviewStarted && answers.length > 0 && (
          <div className="mt-6">
            <h2 className="text-xl font-bold">Your Score: {score}/{answers.length}</h2>
            <h3 className="text-lg font-semibold mt-4">Answers:</h3>
            <ul>
              {answers.map((ans, index) => (
                <li key={index} className="mt-2">
                  <p><strong>Q:</strong> {ans.question}</p>
                  <p><strong>Your Answer:</strong> {ans.selected}</p>
                  <p><strong>Correct Answer:</strong> {ans.answer}</p>
                </li>
              ))}
            </ul>
            <button className="bg-blue-500 text-white p-2 rounded w-full mt-4" onClick={() => navigate("/")}>Back to Home</button>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default MockInterview;