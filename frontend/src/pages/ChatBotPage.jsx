import { assets, disordersData } from "@/assets/assets.js";
import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import AnimatedCircularProgressBar from "@/components/ui/animated-circular-progress-bar.jsx";
import { addActivityDate, updateProgress, updateScores } from "@/redux/userSlice";
import { GoogleGenerativeAI } from "@google/generative-ai";
import "../index.css";

const ChatbotPage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { id } = useParams();
  const sentence =
    disordersData[0].Sentences[user.selectedWeek - 1][id - 1].split(".")[0];

  const [isRecording, setIsRecording] = useState(false);
  const [transcriptions, setTranscriptions] = useState([]);
  const recognitionRef = useRef(null);
  const sentenceIndexRef = useRef(0);
  const [feedback, setFeedback] = useState([]);
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  useEffect(() => {
    if (transcriptions.length > 0) {
      calculateAccuracy(sentence, transcriptions);
    }
  }, [transcriptions]);

  const makeAPICall = async ({ originalWords, transcribedWords, accuracy }) => {
    if (accuracy >= 80) {
      // Update progress if accuracy is >= 80
      handleChallengeCompletion();

      setFeedback((prev) => [
        ...prev,
        {
          feedback:
            "Fantastic! You may either continue practicing further to improve your skills, or take a look back at your profile! See you tomorrow!",
          accuracy,
        },
      ]);
      return;
    }

    const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GOOGLE_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `Provide feedback on the following transcription:\n\nOriginal: ${originalWords.join(
      " "
    )}\nTranscribed: ${transcribedWords.join(
      " "
    )}\n\n Since I am sending you data from speech-to-text API, "of becoming off or vice versa", "seven becoming 7" etc. are not errors and need not be pointed out. Follow that rule strictly in your response. But some words totally changing, like shell becomes sale, Sarah becomes Sharad, is an error and needs to be pointed out. Cut to cut reply only.`;

    const result = await model.generateContent(prompt);
    setFeedback((prev) => [
      ...prev,
      { feedback: result.response.text(), accuracy },
    ]);
  };

  const handleChallengeCompletion = () => {
    let { curWeek, curChallenge } = user;
    // Add today's activity to activityDates
    const today = new Date().toISOString(); // Current date in ISO format
    dispatch(addActivityDate({ date: today, curWeek, curChallenge }));

    // Increment the challenge and week if necessary
    if (curChallenge === 7) {
      curWeek += 1;
      curChallenge = 1;
    } else {
      curChallenge += 1;
    }

    // Update the user's progress in Redux
    dispatch(updateProgress({ curWeek, curChallenge }));
  };

  const updateUserScore = (accuracy) => {
    const week = user.selectedWeek - 1;
    const day = id - 1;

    dispatch(updateScores({ week, day, score: accuracy }));
  };

  const calculateAccuracy = (original, transcribed) => {
    const transcribedWords = transcribed.join(" ").split(" ");
    const originalWords = original.split(" ");
    const matches = originalWords.filter(
      (word, index) =>
        word?.toLowerCase() === transcribedWords[index]?.toLowerCase()
    );
    const accuracy = ((matches.length / originalWords.length) * 100).toFixed(2);

    // Update user score regardless of accuracy
    updateUserScore(accuracy);

    makeAPICall({ originalWords, transcribedWords, accuracy });
    return accuracy;
  };

  const startRecognition = () => {
    if (!SpeechRecognition) {
      alert("Your browser does not support speech recognition.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsRecording(true);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setTranscriptions((prev) => [...prev, transcript]);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      alert("An error occurred while recording. Please try again.");
    };

    recognition.onend = () => {
      setIsRecording(false);
      handleSubmit();
    };

    recognitionRef.current = recognition;
    recognition.start();
  };

  const handleStartRecording = () => {
    sentenceIndexRef.current = 0; // Reset for the new recording session
    setTranscriptions([]); // Clear previous transcriptions
    startRecognition();
  };

  const handleStopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current = null;
    }
    setIsRecording(false);
  };

  const handleSubmit = () => {
    handleStopRecording();
  };

  const apiResponse = () => {
    return (
      <>
        {feedback.map((item, index) => (
          <div key={index} className="flex flex-col pr-12 gap-4 mt-4">
            <AnimatedCircularProgressBar
              max={100}
              min={0}
              value={item.accuracy} // Use item for individual feedback data
              gaugePrimaryColor="rgb(79 70 229)"
              gaugeSecondaryColor="rgba(0, 0, 0, 0.1)"
              className="self-end w-32 h-32"
            />
            <div className="relative">
              <span className="self-start font-medium text-lg bg-[#ededed] max-w-[800px] rounded-full px-8 py-4 inline-block">
                {item.feedback} <br /> Let’s perfect it! Speak these words:{" "}
                <br /> "{sentence}."
              </span>
              <img
                onClick={() => readStatement(item.feedback)}
                src={assets.SpeakerIcon}
                className="w-8 absolute -bottom-[25px] left-5 cursor-pointer"
              />
            </div>
          </div>
        ))}
      </>
    );
  };

  const readStatement = (text) => {
    if (!window.speechSynthesis) {
      alert("Your browser does not support Text-to-Speech.");
      return;
    }

    const speech = new SpeechSynthesisUtterance(text || "");
    speech.lang = "en-US";
    window.speechSynthesis.speak(speech);
  };

  return (
    <div className="p-8 mt-40 rounded-2xl chatArea max-w-[1320px] mx-auto max-h-[70vh] border border-black/10 overflow-y-scroll">
      <span className="font-medium text-lg bg-[#ededed] max-w-[800px] rounded-full px-4 py-2 inline-block">
        Your turn to shine! Speak this out loud:<br /> "{sentence}."
      </span>

      {feedback && apiResponse()}

      <div
        className="p-2 bg-primary-blue rounded-full fixed bottom-10 left-[50%] translate-x-[-50%]"
        onClick={handleStartRecording}
      >
        {isRecording ? (
          <div className="bg-primary-blue rounded-xl p-2">
            <div className="w-8 h-8 rounded-lg bg-white"></div>
          </div>
        ) : (
          <img src={assets.micIcon} className="w-12" />
        )}
      </div>
    </div>
  );
};

export default ChatbotPage;
