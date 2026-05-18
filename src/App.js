import "./App.css";
import { useState } from "react";
import RoleSelection from "./components/RoleSelection";
import { getAIResponse } from "./ai";

function App() {

  const interviewData = {

    "Frontend Developer": [
      "What is React?",
      "Explain CSS Flexbox.",
      "What are components in React?",
      "How do you improve website performance?",
      "Tell me about a frontend project."
    ],

    "Backend Developer": [
      "What is Node.js?",
      "Explain APIs.",
      "What is a database?",
      "What is authentication?",
      "Describe a backend project."
    ],

    "Data Analyst": [
      "What is data analysis?",
      "Explain Excel or SQL usage.",
      "How do you clean data?",
      "What is data visualization?",
      "Describe an analytics project."
    ],

    "HR Interview": [
      "Tell me about yourself.",
      "What are your strengths?",
      "Why should we hire you?",
      "Describe a challenge you faced.",
      "Where do you see yourself in 5 years?"
    ]

  };

  const roles = Object.keys(interviewData);

  const [started, setStarted] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [showNextButton, setShowNextButton] = useState(false);
  const [loading, setLoading] = useState(false);

  const questions = interviewData[selectedRole] || [];

  const generateFeedback = async () => {

    const aiFeedback = await getAIResponse(answer);

    setFeedback(aiFeedback);

    if (answer.length > 120) {

      setScore((prev) => prev + 10);

    }

    else if (answer.length > 50) {

      setScore((prev) => prev + 7);

    }

    else {

      setScore((prev) => prev + 4);

    }

  };

  const handleNext = async () => {

    if (!answer.trim()) {
      alert("Please type an answer first.");
      return;
    }

    setLoading(true);

    await generateFeedback();

    setLoading(false);

    setShowNextButton(true);

  };

  const progress =
    questions.length > 0
      ? ((currentQuestion + 1) / questions.length) * 100
      : 0;

  return (

    <div className="app">

      <div className="card">

        <h1>AI Interview Simulator</h1>

        {!started ? (

          <RoleSelection
            roles={roles}
            selectedRole={selectedRole}
            setSelectedRole={setSelectedRole}
            setStarted={setStarted}
          />

        ) : completed ? (

          <div className="resultScreen">

            <h2>Interview Completed 🎉</h2>

            <h3>Your Final Score:</h3>

            <p className="finalScore">{score}</p>

            <div className="analytics">

              <div className="analyticsCard">
                <h3>Communication</h3>
                <p>
                  {score > 35
                    ? "Excellent communication skills."
                    : score > 20
                    ? "Good communication with room for improvement."
                    : "Need more confidence and detail."}
                </p>
              </div>

              <div className="analyticsCard">
                <h3>Confidence Level</h3>
                <p>
                  {score > 35
                    ? "Highly confident responses."
                    : score > 20
                    ? "Moderately confident."
                    : "Practice more mock interviews."}
                </p>
              </div>

              <div className="analyticsCard">
                <h3>Suggestions</h3>
                <p>
                  Improve answer structure, provide real examples,
                  and maintain clarity while answering.
                </p>
              </div>

            </div>

            <button
              className="restartBtn"
              onClick={() => window.location.reload()}
            >
              Restart Interview
            </button>

          </div>

        ) : (

          <div>

            <div className="progressBar">

              <div
                className="progressFill"
                style={{ width: `${progress}%` }}
              ></div>

            </div>

            <h2>{selectedRole}</h2>

            <p className="question">
              {questions[currentQuestion]}
            </p>

            <textarea
              placeholder="Type your answer here..."
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
            />

            {loading ? (

              <button className="nextBtn">
                Analyzing Answer...
              </button>

            ) : !showNextButton ? (

              <button
                className="nextBtn"
                onClick={handleNext}
              >
                Submit Answer
              </button>

            ) : (

              <button
                className="nextBtn"
                onClick={() => {

                  if (currentQuestion < questions.length - 1) {

                    setCurrentQuestion((prev) => prev + 1);
                    setAnswer("");
                    setFeedback("");
                    setShowNextButton(false);

                  }

                  else {

                    setCompleted(true);

                  }

                }}
              >
                Next Question
              </button>

            )}

            {feedback && (

              <div className="feedbackBox">

                <h3>AI Feedback</h3>

                <p>{feedback}</p>

                <h3>Current Score: {score}</h3>

              </div>

            )}

          </div>

        )}

      </div>

    </div>

  );
}

export default App;