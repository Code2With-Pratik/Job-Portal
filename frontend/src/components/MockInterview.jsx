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
      options: [
        "A JavaScript library for building user interfaces.",
        "A CSS framework.",
        "A backend framework.",
        "A database."
      ],
      answer: "A JavaScript library for building user interfaces."
    },
    {
      question: "What is Vue?",
      options: [
        "A progressive JavaScript framework.",
        "A database.",
        "A JavaScript testing library.",
        "A backend framework."
      ],
      answer: "A progressive JavaScript framework."
    },
    {
      question: "What is Angular?",
      options: [
        "A TypeScript-based open-source front-end framework.",
        "A JavaScript runtime.",
        "A CSS preprocessor.",
        "A JavaScript library."
      ],
      answer: "A TypeScript-based open-source front-end framework."
    }
  ],

  "Backend Developer": [
    {
      question: "What is Node.js?",
      options: [
        "A JavaScript runtime environment.",
        "A CSS framework.",
        "A JavaScript library.",
        "A database."
      ],
      answer: "A JavaScript runtime environment."
    },
    {
      question: "What is Django?",
      options: [
        "A high-level Python web framework.",
        "A JavaScript framework.",
        "A frontend design tool.",
        "A database."
      ],
      answer: "A high-level Python web framework."
    },
    {
      question: "What is Spring Boot?",
      options: [
        "A Java-based framework for building microservices.",
        "A Node.js module.",
        "A database optimization tool.",
        "A Python library."
      ],
      answer: "A Java-based framework for building microservices."
    }
  ],

  "Full Stack Developer": [
    {
      question: "What is the MERN stack?",
      options: [
        "MongoDB, Express.js, React, and Node.js.",
        "MySQL, Express.js, React, and Node.js.",
        "MongoDB, Ember.js, React, and Node.js.",
        "MongoDB, Express.js, React, and Next.js."
      ],
      answer: "MongoDB, Express.js, React, and Node.js."
    },
    {
      question: "What is the MEAN stack?",
      options: [
        "MongoDB, Express.js, Angular, and Node.js.",
        "MongoDB, Ember.js, Angular, and Node.js.",
        "MongoDB, Express.js, React, and Next.js.",
        "MongoDB, Express.js, Angular, and Nest.js."
      ],
      answer: "MongoDB, Express.js, Angular, and Node.js."
    },
    {
      question: "What is the LAMP stack?",
      options: [
        "Linux, Apache, MySQL, and PHP.",
        "Linux, Angular, MySQL, and PHP.",
        "Linux, Apache, MongoDB, and Python.",
        "Linux, Apache, MongoDB, and PHP."
      ],
      answer: "Linux, Apache, MySQL, and PHP."
    }
  ],

  "Data Analyst": [
    {
      question: "What is Python used for in Data Analysis?",
      options: [
        "Performing data analysis, visualization, and machine learning.",
        "Building mobile apps.",
        "Managing databases.",
        "Creating front-end UI components."
      ],
      answer: "Performing data analysis, visualization, and machine learning."
    },
    {
      question: "What is SQL used for?",
      options: [
        "Querying and managing structured databases.",
        "Styling web pages.",
        "Building JavaScript applications.",
        "Creating UI components."
      ],
      answer: "Querying and managing structured databases."
    },
    {
      question: "What is Power BI?",
      options: [
        "A business intelligence and data visualization tool by Microsoft.",
        "A JavaScript framework.",
        "A backend database management system.",
        "An open-source Python library."
      ],
      answer: "A business intelligence and data visualization tool by Microsoft."
    }
  ],

  "Cybersecurity": [
    {
      question: "What is Ethical Hacking?",
      options: [
        "Legally breaking into computers to test security.",
        "A type of malware.",
        "A hacking technique used by cybercriminals.",
        "A cryptographic algorithm."
      ],
      answer: "Legally breaking into computers to test security."
    },
    {
      question: "What is Pen Testing?",
      options: [
        "A security assessment that simulates cyber attacks.",
        "A type of network firewall.",
        "A programming language.",
        "A cyber attack method."
      ],
      answer: "A security assessment that simulates cyber attacks."
    }
  ],

  "App Developer": [
    {
      question: "What is Flutter?",
      options: [
        "An open-source UI framework by Google.",
        "A JavaScript library for web development.",
        "A database management system.",
        "A version control system."
      ],
      answer: "An open-source UI framework by Google."
    },
    {
      question: "What is React Native?",
      options: [
        "A framework for building native mobile apps using React.",
        "A backend framework.",
        "A CSS preprocessor.",
        "A database."
      ],
      answer: "A framework for building native mobile apps using React."
    }
  ]
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

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
      setSelectedAnswer(null);
    }
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
    if (score < 5) return "Keep Trying👎!";
    if (score >= 5 && score < 8) return "Good 🙂!";
    return "Excellent👍!";
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
    <div>
      <Navbar />
      <div className="bg-white shadow-[0px_10px_30px_rgba(0,0,0,0.3)] rounded-lg p-10 w-full max-w-3xl mx-auto mt-20">
        {!interviewStarted ? (
          <>
            <h2 className="text-3xl font-bold mb-5 mx-32">Start Your Mock Interview</h2>
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
                        className="mr-2 accent-purple-600"
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
              className="bg-purple-800 text-white p-2 rounded w-full"
              onClick={handleStart}
            >
              Start Interview
            </button>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-4">
              Question {currentQuestion + 1}:
            </h2>
            <p className="mb-4">{demoQuestions[role][currentQuestion]?.question}</p>
            <div className="mb-4">
              {demoQuestions[role][currentQuestion]?.options.map((option, index) => (
                <label key={index} className="block">
                  <input
                    type="radio"
                    value={option}
                    checked={selectedAnswer === option}
                    onChange={() => setSelectedAnswer(option)}
                    className="mr-2 accent-purple-600"
                  />
                  {option}
                </label>
              ))}
            </div>
            <div className="flex justify-between items-center mb-4">
              <button
                className="bg-gray-500 text-white p-2 rounded"
                onClick={handleBack}
                disabled={currentQuestion === 0}
              >
                Back
              </button>
              <span className="text-lg font-semibold">
                Time Left: {Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, "0")}
              </span>
              <button
                className="bg-purple-700 text-white p-2 rounded"
                onClick={handleNext}
                disabled={!selectedAnswer}
              >
                Next
              </button>
            </div>
          </>
        )}
        {showResults && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
            <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-4xl max-h-[500px] overflow-y-auto">
              <h2 className="text-2xl font-bold mb-4">
                Your Score: {score}/{demoQuestions[role].length}
              </h2>
              <h3
                className={`
                  text-2xl sm:text-3xl font-bold mb-4 
                  ${score < 5 ? "text-red-500" : score === 5 ? "text-yellow-500" : "text-green-500"}
                `}
              >
                {getGreeting()}
              </h3>
              <div className="mb-4">
                <h4 className="font-semibold">Score Visualization:</h4>
                <div className="flex">
                  <div
                    className="bg-green-500"
                    style={{ width: `${(score / demoQuestions[role].length) * 100}%`, height: "20px" }}
                  ></div>
                  <div
                    className="bg-red-500"
                    style={{ width: `${((demoQuestions[role].length - score) / demoQuestions[role].length) * 100}%`, height: "20px" }}
                  ></div>
                </div>
              </div>
              <table className="min-w-full border-collapse border border-gray-300 mt-4">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="border border-gray-300 p-2">Question</th>
                    <th className="border border-gray-300 p-2">Your Answer</th>
                    <th className="border border-gray-300 p-2">Correct Answer</th>
                  </tr>
                </thead>
                <tbody>
                  {answers.map((ans, index) => (
                    <tr key={index} className="border border-gray-300">
                      <td className="border border-gray-300 p-2 text-black font-medium">
                        {ans.question}
                      </td>
                      <td
                        className={`border border-gray-300 p-2 ${
                          ans.selected === ans.correct ? "text-green-500 font-semibold" : "text-red-500 font-semibold"
                        }`}
                      >
                        {ans.selected}
                      </td>
                      <td className="border border-gray-300 p-2 text-black font-semibold">
                        {ans.correct}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button
                className="bg-purple-800 text-white p-2 rounded w-full mt-4 hover:bg-purple-900 transition"
                onClick={handleRestart}
              >
                Restart
              </button>
            </div>
          </div>
        )}
      </div>
      <Footer/>
    </div>
  );
};

export default MockInterview;
