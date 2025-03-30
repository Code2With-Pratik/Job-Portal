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
      question: "What is the difference between CSS Grid and Flexbox?",
      options: [
        "Flexbox is used for two-dimensional layouts, while CSS Grid is for one-dimensional layouts.",
        "Both are identical in functionality.",
        "CSS Grid is used for two-dimensional layouts, while Flexbox is for one-dimensional layouts.",
        "CSS Grid is only used for mobile applications."
      ],
      answer: "CSS Grid is used for two-dimensional layouts, while Flexbox is for one-dimensional layouts."
    },
    {
      question: "What is the primary role of the Virtual DOM in React?",
      options: [
        "To store application state globally.",
        "To improve performance by minimizing direct manipulation of the real DOM.",
        "To manage authentication and security.",
        "To handle HTTP requests in React applications."
      ],
      answer: "To improve performance by minimizing direct manipulation of the real DOM."
    },
    {
      question: "Which of the following is NOT a JavaScript framework?",
      options: [
        "React",
        "Vue",
        "jQuery",
        "Django"
      ],
      answer: "Django"
    },
    {
      question: "What is the purpose of the useState hook in React?",
      options: [
        "To manage state in function components.",
        "To fetch data from an API.",
        "To define styles in JSX.",
        "To navigate between different pages."
      ],
      answer: "To manage state in function components."
    },
    {
      question: "What is the purpose of media queries in CSS?",
      options: [
        "To fetch data from a server.",
        "To apply different styles based on screen size or device type.",
        "To handle event listeners in JavaScript.",
        "To structure HTML elements."
      ],
      answer: "To apply different styles based on screen size or device type."
    },
    {
      question: "Which JavaScript method is used to fetch data from an API?",
      options: [
        "getElementById()",
        "querySelector()",
        "fetch()",
        "addEventListener()"
      ],
      answer: "fetch()"
    },
    {
      question: "What does the term 'responsive web design' mean?",
      options: [
        "A framework for developing native mobile applications.",
        "A design approach that ensures web pages look good on all devices and screen sizes.",
        "A technique used for improving database performance.",
        "A software testing methodology."
      ],
      answer: "A design approach that ensures web pages look good on all devices and screen sizes."
    },
    {
      question: "Which of the following is a CSS preprocessor?",
      options: [
        "SASS",
        "TypeScript",
        "Babel",
        "React"
      ],
      answer: "SASS"
    },
    {
      question: "What is the main purpose of the useEffect hook in React?",
      options: [
        "To create reusable UI components.",
        "To perform side effects in function components.",
        "To define component props.",
        "To manage state globally."
      ],
      answer: "To perform side effects in function components."
    },
    {
      question: "What is the role of a Content Delivery Network (CDN) in frontend development?",
      options: [
        "To store and manage relational databases.",
        "To handle user authentication and authorization.",
        "To build reusable UI components.",
        "To distribute website content across multiple servers to improve speed and availability."
      ],
      answer: "To distribute website content across multiple servers to improve speed and availability."
    }
  ],

  "Backend Developer": [
    {
      question: "What is the primary purpose of a RESTful API?",
      options: [
        "To create a user interface for web applications.",
        "To allow communication between client and server using standard HTTP methods.",
        "To store and retrieve data in a frontend framework.",
        "To optimize CSS styles in a web page."
      ],
      answer: "To allow communication between client and server using standard HTTP methods."
    },
    {
      question: "Which HTTP method is typically used for updating an existing resource?",
      options: [
        "GET",
        "POST",
        "PUT",
        "DELETE"
      ],
      answer: "PUT"
    },
    {
      question: "What is the difference between SQL and NoSQL databases?",
      options: [
        "SQL databases use structured tables, while NoSQL databases use flexible schemas.",
        "NoSQL databases do not store data, while SQL databases do.",
        "SQL is faster than NoSQL in all cases.",
        "NoSQL databases cannot handle large data volumes."
      ],
      answer: "SQL databases use structured tables, while NoSQL databases use flexible schemas."
    },
    {
      question: "What is middleware in backend development?",
      options: [
        "A database that stores middleware logic.",
        "A front-end framework for handling API calls.",
        "A function that runs between a request and a response in a web application.",
        "A caching system for JavaScript functions."
      ],
      answer: "A function that runs between a request and a response in a web application."
    },
    {
      question: "Which of the following is an example of a relational database?",
      options: [
        "MongoDB",
        "Redis",
        "MySQL",
        "Elasticsearch"
      ],
      answer: "MySQL"
    },
    {
      question: "What is the role of an ORM (Object-Relational Mapping) tool?",
      options: [
        "It allows developers to interact with a database using object-oriented programming.",
        "It optimizes front-end rendering performance.",
        "It is used for building mobile applications.",
        "It is a type of JavaScript framework."
      ],
      answer: "It allows developers to interact with a database using object-oriented programming."
    },
    {
      question: "What is the purpose of caching in backend development?",
      options: [
        "To store session-related data in the frontend.",
        "To enhance CSS animations in web applications.",
        "To automatically generate new database records.",
        "To speed up data retrieval by storing frequently accessed data."
      ],
      answer: "To speed up data retrieval by storing frequently accessed data."
    },
    {
      question: "Which of the following is a common authentication method in backend development?",
      options: [
        "OAuth",
        "HTML",
        "CSS",
        "React Hooks"
      ],
      answer: "OAuth"
    },
    {
      question: "What is the purpose of Docker in backend development?",
      options: [
        "To serve static files in a frontend project.",
        "To act as a caching layer for database queries.",
        "To package applications and their dependencies into isolated containers.",
        "To build UI components for a web application."
      ],
      answer: "To package applications and their dependencies into isolated containers."
    },
    {
      question: "What is GraphQL used for in backend development?",
      options: [
        "To allow clients to request specific data from an API.",
        "To store frontend UI components.",
        "To encrypt database connections.",
        "To optimize CSS styles."
      ],
      answer: "To allow clients to request specific data from an API."
    }
  ],

  "Full Stack Developer": [
    {
      question: "What is the difference between front-end and back-end development?",
      options: [
        "Front-end is responsible for UI, back-end manages server logic and databases.",
        "Back-end handles the UI, front-end handles databases.",
        "Both are the same.",
        "Back-end only involves APIs."
      ],
      answer: "Front-end is responsible for UI, back-end manages server logic and databases."
    },
    {
      question: "Which of the following is NOT a frontend framework?",
      options: ["React", "Vue", "Django", "Angular"],
      answer: "Django"
    },
    {
      question: "Which database type is used for storing relational data?",
      options: ["MongoDB", "MySQL", "Redis", "GraphQL"],
      answer: "MySQL"
    },
  
    // Medium Questions
    {
      question: "What is the main advantage of using REST APIs?",
      options: [
        "They allow standardized communication between client and server.",
        "They make the frontend load faster.",
        "They store data permanently in browsers.",
        "They replace the need for databases."
      ],
      answer: "They allow standardized communication between client and server."
    },
    {
      question: "How does JWT (JSON Web Token) improve authentication security?",
      options: [
        "It allows stateless authentication by encoding user data into a token.",
        "It encrypts all requests between frontend and backend.",
        "It only works with OAuth 2.0.",
        "It does not require any server-side verification."
      ],
      answer: "It allows stateless authentication by encoding user data into a token."
    },
    {
      question: "Which of the following is NOT a benefit of using Docker in full-stack development?",
      options: [
        "Consistent development environment.",
        "Lightweight containerization of applications.",
        "Better frontend rendering performance.",
        "Easier deployment across different systems."
      ],
      answer: "Better frontend rendering performance."
    },
    {
      question: "What is an ORM, and why is it used in backend development?",
      options: [
        "ORM (Object-Relational Mapping) simplifies database interactions using code instead of SQL.",
        "ORM is a JavaScript library for frontend development.",
        "ORM replaces the need for databases.",
        "ORM is used for caching API responses."
      ],
      answer: "ORM (Object-Relational Mapping) simplifies database interactions using code instead of SQL."
    },
  
    // Tough Questions
    {
      question: "What problem does CORS (Cross-Origin Resource Sharing) solve in web development?",
      options: [
        "It speeds up backend API requests.",
        "It allows secure communication between different domains.",
        "It prevents database injection attacks.",
        "It replaces the need for authentication."
      ],
      answer: "It allows secure communication between different domains."
    },
    {
      question: "How does the event loop work in Node.js?",
      options: [
        "It handles asynchronous operations by using a single-threaded non-blocking mechanism.",
        "It creates a new thread for every request.",
        "It requires multi-threading to function.",
        "It executes all code synchronously."
      ],
      answer: "It handles asynchronous operations by using a single-threaded non-blocking mechanism."
    },
    {
      question: "What is the difference between SQL and NoSQL databases, and when would you use each?",
      options: [
        "SQL is always faster than NoSQL.",
        "NoSQL databases do not store any structured data.",
        "SQL databases use structured tables, while NoSQL databases are flexible and schema-less.",
        "SQL databases are only used in frontend applications."
      ],
      answer: "SQL databases use structured tables, while NoSQL databases are flexible and schema-less."
    }
  ],

  "Data Analyst": [
    {
      question: "What is the primary purpose of a data analyst?",
      options: [
        "To analyze data and provide insights for decision-making.",
        "To create front-end applications.",
        "To develop backend APIs.",
        "To design UI/UX interfaces."
      ],
      answer: "To analyze data and provide insights for decision-making."
    },
    {
      question: "Which of the following is a structured query language?",
      options: ["Python", "SQL", "Excel", "Power BI"],
      answer: "SQL"
    },
    {
      question: "What is the role of a primary key in a database?",
      options: [
        "To store duplicate values.",
        "To uniquely identify each record in a table.",
        "To connect multiple databases together.",
        "To display data visually."
      ],
      answer: "To uniquely identify each record in a table."
    },
  
    // Medium Questions
    {
      question: "What does the term ETL stand for in data analysis?",
      options: [
        "Evaluate, Test, Learn",
        "Estimate, Train, Log",
        "Edit, Transform, Link",
        "Extract, Transform, Load"
      ],
      answer: "Extract, Transform, Load"
    },
    {
      question: "Which data visualization tool is commonly used by analysts?",
      options: ["Power BI", "Photoshop", "TensorFlow", "Docker"],
      answer: "Power BI"
    },
    {
      question: "Which SQL function is used to remove duplicate values from a result set?",
      options: ["DISTINCT", "UNIQUE", "FILTER", "GROUP BY"],
      answer: "DISTINCT"
    },
    {
      question: "Which Python library is widely used for data analysis?",
      options: ["Pandas", "Django", "React", "Flask"],
      answer: "Pandas"
    },
  
    // Tough Questions
    {
      question: "What is the difference between supervised and unsupervised learning in data analysis?",
      options: [
        "Supervised learning is used only for image processing.",
        "Unsupervised learning requires labeled datasets.",
        "Supervised learning uses labeled data, unsupervised learning finds patterns in unlabeled data.",
        "Both are the same."
      ],
      answer: "Supervised learning uses labeled data, unsupervised learning finds patterns in unlabeled data."
    },
    {
      question: "What is the purpose of normalization in a database?",
      options: [
        "To create duplicate records.",
        "To reduce data redundancy and improve efficiency.",
        "To speed up queries by duplicating data.",
        "To store data in raw form."
      ],
      answer: "To reduce data redundancy and improve efficiency."
    },
    {
      question: "Which of the following is an example of a NoSQL database?",
      options: ["MongoDB", "MySQL", "PostgreSQL", "SQLite"],
      answer: "MongoDB"
    }
  ],

  "Cybersecurity": [
    {
      question: "What is the primary goal of cybersecurity?",
      options: [
        "To design user interfaces.",
        "To develop mobile applications.",
        "To protect systems, networks, and data from cyber threats.",
        "To create animated graphics."
      ],
      answer: "To protect systems, networks, and data from cyber threats."
    },
    {
      question: "Which of the following is an example of two-factor authentication (2FA)?",
      options: [
        "Using a simple password.",
        "Entering a password and a one-time code sent via SMS.",
        "Logging in with just an email address.",
        "Opening a website without login credentials."
      ],
      answer: "Entering a password and a one-time code sent via SMS."
    },
    {
      question: "Which of the following is a common type of cyber attack?",
      options: [
        "White-boxing",
        "Phishing",
        "Blueprinting",
        "Prototyping"
      ],
      answer: "Phishing"
    },
  
    // Medium Questions
    {
      question: "What is a firewall used for in cybersecurity?",
      options: [
        "To scan for software updates.",
        "To monitor and control incoming and outgoing network traffic.",
        "To increase internet speed.",
        "To enhance video resolution."
      ],
      answer: "To monitor and control incoming and outgoing network traffic."
    },
    {
      question: "Which encryption algorithm is commonly used to secure online transactions?",
      options: [
        "DNS",
        "AES",
        "HTML",
        "HDD"
      ],
      answer: "AES"
    },
    {
      question: "Which of the following is a strong password?",
      options: [
        "123456",
        "password",
        "P@ssw0rd123!",
        "qwerty"
      ],
      answer: "P@ssw0rd123!"
    },
    {
      question: "What does the term 'zero-day vulnerability' refer to?",
      options: [
        "A hacking attempt that lasts for 24 hours.",
        "An outdated antivirus system.",
        "A security flaw that has no official patch or fix.",
        "A cyber attack that happens once a year."
      ],
      answer: "A security flaw that has no official patch or fix."
    },
  
    // Tough Questions
    {
      question: "Which cybersecurity framework is widely used by organizations?",
      options: [
        "NIST",
        "JPEG",
        "HTTPS",
        "Wi-Fi 6"
      ],
      answer: "NIST"
    },
    {
      question: "What is the purpose of penetration testing?",
      options: [
        "To protect against power outages.",
        "To identify vulnerabilities in a system before attackers do.",
        "To increase the speed of a server.",
        "To prevent software updates."
      ],
      answer: "To identify vulnerabilities in a system before attackers do."
    },
    {
      question: "Which of the following is NOT a cybersecurity best practice?",
      options: [
        "Enabling multi-factor authentication.",
        "Using the same password for all accounts.",
        "Regularly updating software and systems.",
        "Using strong and unique passwords."
      ],
      answer: "Using the same password for all accounts."
    }
  ],

  "App Developer": [
    {
      question: "Which programming language is primarily used for developing Flutter applications?",
      options: [
        "Dart",
        "Java",
        "Kotlin",
        "Swift"
      ],
      answer: "Dart"
    },
    {
      question: "Which of the following is a cross-platform mobile development framework?",
      options: [
        "React Native",
        "Spring Boot",
        "Angular",
        "ASP.NET"
      ],
      answer: "React Native"
    },
    {
      question: "What does the term 'hot reload' mean in Flutter?",
      options: [
        "It allows developers to see code changes in real time without restarting the app.",
        "It restarts the app after every code change.",
        "It is a technique to reduce app size.",
        "It optimizes app animations."
      ],
      answer: "It allows developers to see code changes in real time without restarting the app."
    },
  
    // Medium Questions
    {
      question: "Which of the following is used for managing global state in React Native applications?",
      options: [
        "Redux",
        "Bootstrap",
        "jQuery",
        "Django"
      ],
      answer: "Redux"
    },
    {
      question: "Which database is commonly used for offline storage in mobile applications?",
      options: [
        "SQLite",
        "MongoDB",
        "PostgreSQL",
        "Firebase Firestore"
      ],
      answer: "SQLite"
    },
    {
      question: "What is the purpose of the `pubspec.yaml` file in a Flutter project?",
      options: [
        "To manage dependencies and project settings.",
        "To define UI components.",
        "To store local database queries.",
        "To execute HTTP requests."
      ],
      answer: "To manage dependencies and project settings."
    },
    {
      question: "Which of these mobile app development frameworks is built by Google?",
      options: [
        "Flutter",
        "React Native",
        "SwiftUI",
        "Xamarin"
      ],
      answer: "Flutter"
    },
  
    // Tough Questions
    {
      question: "What is the key advantage of using React Native over native development?",
      options: [
        "Code reusability across iOS and Android.",
        "Better GPU performance.",
        "Automatic memory management.",
        "Built-in database support."
      ],
      answer: "Code reusability across iOS and Android."
    },
    {
      question: "Which of the following is NOT a benefit of using Flutter?",
      options: [
        "Limited need for platform-specific code.",
        "Slower performance compared to native development.",
        "A single codebase for Android and iOS.",
        "Built-in support for Material Design and Cupertino widgets."
      ],
      answer: "Slower performance compared to native development."
    },
    {
      question: "What does the `useEffect` hook do in a React Native application?",
      options: [
        "It performs side effects in function components.",
        "It handles global state management.",
        "It replaces the traditional Redux store.",
        "It executes network requests synchronously."
      ],
      answer: "It performs side effects in function components."
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
