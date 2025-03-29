import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./shared/Navbar";
import Footer from "./shared/Footer";

const roles = [
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "Data Analyst",
  "Cybersecurity",
  "App Developer",
];

const skills = {
  "Frontend Developer": ["React", "Vue", "Angular"],
  "Backend Developer": ["Node.js", "Django", "Spring Boot"],
  "Full Stack Developer": ["MERN", "MEAN", "LAMP"],
  "Data Analyst": ["Python", "SQL", "Power BI"],
  "Cybersecurity": ["Ethical Hacking", "Pen Testing"],
  "App Developer": ["Flutter", "React Native"],
};

const experiences = ["Fresher", "1 Year", "2 Years", "3+ Years"];

const demoQuestions = {
  "Frontend Developer": [
    {
      question: "What is React?",
      options: ["A JavaScript library for building user interfaces.", "A CSS framework.", "A backend framework.", "A database."],
      answer: "A JavaScript library for building user interfaces.",
    },
    {
      question: "What is JSX?",
      options: ["A syntax extension for JavaScript.", "A JavaScript library.", "A CSS preprocessor.", "A database."],
      answer: "A syntax extension for JavaScript.",
    },
    {
      question: "What are props in React?",
      options: ["Inputs to components.", "State variables.", "Functions.", "Styles."],
      answer: "Inputs to components.",
    },
    {
      question: "What is state in React?",
      options: ["A built-in object that stores property values.", "A CSS property.", "A JavaScript function.", "A component."],
      answer: "A built-in object that stores property values.",
    },
    {
      question: "What is a component in React?",
      options: ["A reusable piece of UI.", "A JavaScript variable.", "A CSS class.", "A database."],
      answer: "A reusable piece of UI.",
    },
    {
      question: "What is the virtual DOM?",
      options: ["A lightweight copy of the actual DOM.", "A CSS framework.", "A JavaScript library.", "A database."],
      answer: "A lightweight copy of the actual DOM.",
    },
    {
      question: "What is a hook in React?",
      options: ["Functions that let you use state and other React features.", "A CSS property.", "A JavaScript variable.", "A database."],
      answer: "Functions that let you use state and other React features.",
    },
    {
      question: "What is Redux?",
      options: ["A state management library for JavaScript apps.", "A CSS framework.", "A JavaScript library.", "A database."],
      answer: "A state management library for JavaScript apps.",
    },
    {
      question: "What is a higher-order component?",
      options: ["A function that takes a component and returns a new component.", "A CSS class.", "A JavaScript variable.", "A database."],
      answer: "A function that takes a component and returns a new component.",
    },
    {
      question: "What is the purpose of useEffect?",
      options: ["To perform side effects in function components.", "To manage state.", "To style components.", "To create components."],
      answer: "To perform side effects in function components.",
    },
  ],
  // Add demo questions for other roles as needed
};

const MockInterview = () => {
  const [role, setRole] = useState("");
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [experience, setExperience] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [interviewStarted, setInterviewStarted] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [timer, setTimer] = useState(120); // two minutes in seconds
  const navigate = useNavigate();

  useEffect(() => {
    let interval = null;
    if (interviewStarted && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      handleNext();
    }
    return () => clearInterval(interval);
  }, [interviewStarted, timer]);

  const handleSkillChange = (skill) => {
    setSelectedSkills((prevSkills) =>
      prevSkills.includes(skill)
        ? prevSkills.filter((s) => s !== skill)
        : [...prevSkills, skill]
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
    if (selectedAnswer) {
      const correctAnswer = demoQuestions[role][currentQuestion].answer;
      setAnswers((prev) => [
        ...prev,
        { question: demoQuestions[role][currentQuestion].question, selected: selectedAnswer, correct: correctAnswer },
      ]);
      if (selectedAnswer === correctAnswer) {
        setScore(score + 1);
      }
    }
    setSelectedAnswer("");
    if (currentQuestion < demoQuestions[role].length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setInterviewStarted(false);
      setShowResults(true);
    }
  };

  const getGreeting = () => {
    if (score < 5) return "Work Hard";
    if (score >= 5 && score < 8) return "Good";
    return "Excellent";
  };

  const handleRestart = () => {
    setRole("");
    setSelectedSkills([]);
    setExperience("");
    setCurrentQuestion(0);
    setSelectedAnswer("");
    setScore(0);
    setAnswers([]);
    setInterviewStarted(false);
    setShowResults(false);
    setTimer(120);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <Navbar />
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-2xl">
        {!interviewStarted ? (
          <>
            <h2 className="text-2xl font-bold mb-4">Start Your Mock Interview</h2>
            <label className="block text-lg font-semibold mb-2">Select Role:</label>
            <select
              className="w-full p-2 mb-4 border rounded"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="">Select Role</option>
              {roles.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
            {role && (
              <>
                <label className="block text-lg font-semibold mb-2">Select Skills:</label>
                <div className="grid grid-cols-2 gap-2 mb-4">
                  {skills[role]?.map((skill) => (
                    <label key={skill} className="flex items-center">
                      <input
                        type="checkbox"
                        value={skill}
                        checked={selectedSkills.includes(skill)}
                        onChange={() => handleSkillChange(skill)}
                        className="mr-2"
                      />
                      {skill}
                    </label>
                  ))}
                </div>
              </>
            )}
            <label className="block text-lg font-semibold mb-2">Select Experience:</label>
            <select
              className="w-full p-2 mb-4 border rounded"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
            >
              <option value="">Select Experience</option>
              {experiences.map((exp) => (
                <option key={exp} value={exp}>
                  {exp}
                </option>
              ))}
            </select>
            <button
              className="bg-purple-600 text-white p-2 rounded w-full"
              onClick={handleStart}
            >
              Start Interview
            </button>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-4">Interview Question</h2>
            <p className="mb-4">{demoQuestions[role][currentQuestion]?.question}</p>
            <div className="mb-4">
              {demoQuestions[role][currentQuestion]?.options.map((option, index) => (
                <label key={index} className="block">
                  <input
                    type="radio"
                    value={option}
                    checked={selectedAnswer === option}
                    onChange={() => setSelectedAnswer(option)}
                    className="mr-2"
                  />
                  {option}
                </label>
              ))}
            </div>
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-semibold">Time Left: {Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, '0')}</span>
              <button
                className="bg-green-500 text-white p-2 rounded"
                onClick={handleNext}
              >
                Next
              </button>
            </div>
          </>
        )}
        {showResults && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
              <h2 className="text-2xl font-bold mb-4">Your Score: {score}/{demoQuestions[role].length}</h2>
              <h3 className="text-lg font-semibold mb-4">{getGreeting()}</h3>
              <div className="mb-4">
                <h4 className="font-semibold">Score Visualization:</h4>
                <div className="flex">
                  <div className="bg-green-500" style={{ width: `${(score / demoQuestions[role].length) * 100}%`, height: '20px' }}></div>
                  <div className="bg-red-500" style={{ width: `${((demoQuestions[role].length - score) / demoQuestions[role].length) * 100}%`, height: '20px' }}></div>
                </div>
              </div>
              <table className="min-w-full border-collapse border border-gray-300">
                <thead>
                  <tr>
                    <th className="border border-gray-300 p-2">Question</th>
                    <th className="border border-gray-300 p-2">Your Answer</th>
                    <th className="border border-gray-300 p-2">Correct Answer</th>
                  </tr>
                </thead>
                <tbody>
                  {answers.map((ans, index) => (
                    <tr key={index} className={ans.selected === ans.correct ? "bg-green-200" : "bg-red-200"}>
                      <td className="border border-gray-300 p-2">{ans.question}</td>
                      <td className="border border-gray-300 p-2">{ans.selected}</td>
                      <td className="border border-gray-300 p-2">{ans.correct}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button
                className="bg-blue-500 text-white p-2 rounded w-full mt-4"
                onClick={handleRestart}
              >
                Restart
              </button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default MockInterview;

