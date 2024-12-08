import React, { useState } from "react";

const ChatbotPage = () => {
  const [transcription, setTranscription] = useState("");
  const [accuracy, setAccuracy] = useState(null);
  const [feedback, setFeedback] = useState("");
  const sentenceOfTheDay = "Your turn to shine, speak this out loud!";

  const calculateAccuracy = (spokenText) => {
    const wordsOriginal = sentenceOfTheDay.split(" ");
    const wordsSpoken = spokenText.split(" ");
    const matches = wordsSpoken.filter((word) =>
      wordsOriginal.includes(word.toLowerCase())
    );
    const accuracy = (matches.length / wordsOriginal.length) * 100;
    return accuracy;
  };

  const handleRecord = () => {
    // Placeholder for Web Speech API
    const simulatedText = "Your turn to shine speak this loud"; // Simulated response
    const acc = calculateAccuracy(simulatedText);
    setTranscription(simulatedText);
    setAccuracy(acc);
    setFeedback(
      acc >= 80
        ? "Great job! You can proceed to your profile or keep practicing."
        : "You need to repeat and fix some words!"
    );
  };

  return (
    <div className="p-8 pt-40">
      <h2 className="text-xl font-bold mb-4">Chatbot</h2>
      <p className="mb-4">{sentenceOfTheDay}</p>

      <button
        className="p-4 bg-blue-500 text-white rounded-md mb-4"
        onClick={handleRecord}
      >
        Record
      </button>

      {transcription && (
        <>
          <p className="mb-2">You said: {transcription}</p>
          <p className="mb-2">Accuracy: {accuracy}%</p>
          <p>{feedback}</p>
        </>
      )}
    </div>
  );
};

export default ChatbotPage;
