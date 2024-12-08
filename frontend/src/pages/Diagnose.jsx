import { assets } from "@/assets/assets";
import React, { useState, useRef, useEffect } from "react";

const DiagnosisPage = () => {
  const [currentSet, setCurrentSet] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [transcriptions, setTranscriptions] = useState([]);
  const recognitionRef = useRef(null);
  const sentenceIndexRef = useRef(0);
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const [minAccuracy, setMinAccuracy] = useState(100)
  const [minCategory, setMinCategory] = useState('Lateral Lisp')
  const [showResult, setShowResult] = useState(false)
  
  const categories = [
    {
      title: "Lateral Lisp",
      sentences: [
        "She sells seashells by the seashore",
        "The swift white fox jumped over the sleepy dog",
        "Seven slippery snakes slid slowly southward",
      ],
    },
    {
      title: "Dental Lisp",
      sentences: [
        "Think about thirty-three thirsty thieves",
        "The teacher thought through the theory thoroughly",
        "The thunder roared on Thursday evening",
      ],
    },
    {
      title: "Palatal Lisp",
      sentences: [
        "The giant juggler juggled jelly jars",
        "Many mice marched to the market",
        "The children chattered cheerfully in the chatroom",
      ],
    },
    {
      title: "Frontal Lisp",
      sentences: [
        "The sun shines on the sandy shore",
        "Sam swiftly sipped his strawberry smoothie",
        "The sly snake slithered silently across the sand",
      ],
    },
  ];
  
  useEffect(() => {
    if (transcriptions.length === categories[currentSet].sentences.length) {
      const originalSentences = categories[currentSet].sentences.join(" ");
      const userTranscription = transcriptions.join(" ");
      calculateAccuracy(originalSentences, userTranscription);
    }
  }, [transcriptions]);
  

  const calculateAccuracy = (original, transcribed) => {
    console.log(original, transcribed)
    const originalWords = original.split(" ");
    const transcribedWords = transcribed.split(" ");
    const matches = originalWords.filter((word, index) => word?.toLowerCase() === transcribedWords[index]?.toLowerCase());
    const accuracy = ((matches.length / originalWords.length) * 100).toFixed(2);
    console.log(accuracy)
    if (accuracy < minAccuracy){
        setMinAccuracy(accuracy)
        setMinCategory(categories[currentSet].title)
    }
  };

  useEffect(() => {
    console.log(transcriptions);
  }, [transcriptions]);

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
      console.log("Recording started...");
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      console.log("You said:", transcript);

      setTranscriptions((prev) => [...prev, transcript]);
      sentenceIndexRef.current += 1;

      // If we have not reached the end of the current category, start recording the next sentence immediately
      if (sentenceIndexRef.current < categories[currentSet].sentences.length) {
        recognition.stop();
        setTimeout(() => {
            recognition.start();
        }, 500);
      }
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      alert("An error occurred while recording. Please try again.");
    };

    recognition.onend = () => {
      if (sentenceIndexRef.current >= categories[currentSet].sentences.length) {
        setIsRecording(false);
        console.log("All sentences transcribed:", transcriptions);
        handleSubmit()
      }
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
    console.log("Recording manually stopped.");
  };

  const handleSubmit = () => {
    handleStopRecording();
    handleNextSet()
  };

  const handleNextSet = () => {
    if (currentSet < categories.length - 1) {
      setCurrentSet(currentSet + 1);
      setTranscriptions([]);
    } else {
      alert("Diagnosis Complete! Check your results.");
      setShowResult(true)
    }
  };

  return (
    <div className="flex flex-col items-center pt-52 pb-20 max-w-[1280px] mx-auto">
      <h1 className="text-xl font-bold">{currentSet+1} of 4: {categories[currentSet].title}</h1>
      <p className="text-lg mb-5">Read these sentences out loud:</p>
      <ul className="border-gray-100 border-[3px] rounded-2xl px-4 py-2 mb-6" style={{boxShadow: '4px 5px 10px rgba(0,0,0,0.3) '}}>
        {categories[currentSet].sentences.map((sentence, index) => (
          <li key={index} className="text-lg">
            {index+1}. {sentence}
          </li>
        ))}
      </ul>


      <div className="p-2 bg-primary-blue rounded-full"
      onClick={handleStartRecording}
      >
        {isRecording ? <div className="bg-primary-blue rounded-xl p-2"><div className="w-8 h-8 rounded-lg bg-white"></div></div> : <img src={assets.micIcon} className="w-12" />}
      </div>


        
      {showResult && minAccuracy >= 80 && <p className="font-medium text-lg mt-4">Your speech has been analyzed, and <span className="text-green-600">no signs of any speech disorder were detected!</span></p>}
      {showResult && minAccuracy < 80 && <p className="font-medium text-lg mt-4">You have been diagnosed with <span className="text-red-500">{minCategory}</span></p>}
      {showResult &&  
        <div className="flex gap-4 mt-4">
            <button className='flex items-center gap-2 text-lg bg-primary-blue px-4 py-2 border-2 rounded-full hover:scale-105 transition-all duration-500 text-white group'>Save Data
                <img src={assets.rightArrow} className='w-0 group-hover:w-7 transition-all duration-500' />
            </button>
            <button className='flex items-center gap-2 text-lg bg-primary-orange px-4 py-2 border-2 rounded-full hover:scale-105 transition-all duration-500 text-white group'>Lessons
                <img src={assets.rightArrow} className='w-0 group-hover:w-7 transition-all duration-500' />
            </button>
        </div>
      }
    </div>
  );
};

export default DiagnosisPage;
