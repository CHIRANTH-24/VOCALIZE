import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { assets } from "@/assets/assets";

const ExercisePage = () => {
  const randomScore = () => Math.random() * 20.0 + 80.0; // Generates a random number between 80.0 and 100.0

  const initializeScores = (week, challenge) => {
    const scores = Array.from({ length: 7 }, () => Array(7).fill(0.0));
    for (let i = 0; i <= week; i++) {
      for (let j = 0; j <= (i === week ? challenge - 2 : 6); j++) {
        scores[i][j] = randomScore();
      }
    }
    return scores;
  };

  const initialUserState = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    diagnosed: "No Disorders",
    photo: "",
    curWeek: 3,
    curChallenge: 2,
    badges: Array(7).fill(false),
    userId: "",
    activityDates: [],
    scores: initializeScores(2, 2), // Generate random scores up to curWeek(3) and curChallenge(2)
  };

  const [user, setUser] = useState(initialUserState);
  const [progress, setProgress] = useState(30);
  const [selectedWeek, setSelectedWeek] = useState(user.curWeek);

  const handleWeekClick = (week) => {
    if (week > user.curWeek) {
      toast.error("Complete the current week's challenge to unlock this!");
    } else {
      setSelectedWeek(week);
    }
  };

  const CompletedCard = ({ day }) => (
    <div className="bg-[#17c964] cursor-pointer flex flex-col gap-2 text-white items-center px-4 py-2 rounded-xl min-h-[250px] justify-center">
      <div className="text-black bg-white w-[120px] h-[120px] p-3 inline-flex justify-center items-center rounded-full font-medium text-2xl">
        Day {day + 1}
      </div>
      <p className="font-semibold text-lg">Challenge Completed!</p>
      <p className="font-semibold text-lg mt-[-6px]">
        Best Score: {user.scores[selectedWeek - 1][day].toFixed(2)}%
      </p>
    </div>
  );

  const ChallengeCard = ({ day }) => {
    // Map days to rainbow colors in assets
    const colors = [
      assets.violet,
      assets.indigo,
      assets.blue,
      assets.green,
      assets.yellow,
      assets.orange,
      assets.red,
    ];
    const bgImage = colors[day];

    return (
      <div
        className="flex flex-col gap-4 cursor-pointer text-white items-center px-4 py-2 rounded-xl min-h-[250px] justify-center"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="text-black bg-white w-[120px] h-[120px] p-3 inline-flex justify-center items-center rounded-full font-medium text-2xl">
          Day {day + 1}
        </div>
        <p className="font-semibold text-lg bg-white/60 text-black text-center rounded-xl min-h-[60px]">Your Challenge Awaits: Let's do this!</p>
      </div>
    );
  };

  return (
    <div className="pt-40 max-w-[1280px] mx-auto flex flex-col pb-20 items-center">
      {/* Progress Bar */}
      <div className="mb-8 w-[900px] max-w-[900px]">
        <p className="text-sm mt-2">Your Progress: {progress}%</p>
        <div className="h-4 bg-gray-200 rounded-full">
          <div
            className="h-4 bg-green-500 rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Week Bar */}
      <div className="flex items-center gap-4">
        <span>Week: </span>
        {Array.from({ length: 7 }).map((_, i) => (
          <div
            key={i}
            className={`p-2 rounded-md cursor-pointer w-[30px] h-[30px] inline-flex items-center justify-center ${
              i + 1 === selectedWeek
                ? "bg-primary-blue text-white"
                : i + 1 < user.curWeek
                ? "bg-green-500 text-white"
                : "bg-white text-black border border-black"
            }`}
            onClick={() => handleWeekClick(i + 1)}
          >
            {i + 1}
          </div>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,240px))] gap-4 p-4 w-full mx-auto justify-center max-w-[1100px]">
        {Array.from({ length: 7 }).map((_, i) => {
          // Determine whether to render CompletedCard or ChallengeCard
          const isCompleted =
            selectedWeek - 1 < user.curWeek - 1 ||
            (selectedWeek - 1 === user.curWeek - 1 &&
              i < user.curChallenge - 1);

          return isCompleted ? (
            <CompletedCard key={i} day={i} />
          ) : (
            <ChallengeCard key={i} day={i} />
          );
        })}
      </div>
    </div>
  );
};

export default ExercisePage;
