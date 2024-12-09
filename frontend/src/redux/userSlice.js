import { assets } from "@/assets/assets";
import { createSlice } from "@reduxjs/toolkit";

const randomScore = () => Math.random() * 20.0 + 80.0;

const initializeScores = (week, challenge) => {
  const scores = Array.from({ length: 7 }, () => Array(7).fill(0.0));
  for (let i = 0; i <= week; i++) {
    for (let j = 0; j <= (i === week ? challenge - 2 : 6); j++) {
      scores[i][j] = randomScore();
    }
  }
  return scores;
};


// Generate the activityDates array with placeholder data
const generateActivityDates = (startDate, weeks = 7, challengesPerWeek = 7) => {
  const dates = [];
  const currentDate = new Date(startDate);

  for (let week = 1; week <= 3; week++) {
    for (let challenge = 1; challenge <= (week == 3 ? 1 : 7); challenge++) {
      dates.push({
        date: new Date(currentDate).toISOString(),
        challengeNo: challenge,
        weekNo: week,
      });
      currentDate.setDate(currentDate.getDate() + 1); // Increment date by 1 day
    }
  }
  return dates;
};


const initialState = {
  firstName: "John",
  lastName: "Doe",
  email: "JohnDoe@gmail.com",
  phone: "9876543210",
  diagnosed: "No Disorders",
  photo: assets.person1,
  curWeek: 3,
  curChallenge: 2,
  badges: Array(7).fill(false),
  userId: "",
  scores: initializeScores(2, 2),
  selectedWeek: 3,
  // date: new Date().toISOString(), // Store user's creation date as ISO string
  date: "2024-11-24T13:19:13.186Z",
  activityDates: []
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      return { ...state, ...action.payload };
    },
    updateScores: (state, action) => {
      const { week, day, score } = action.payload;
      if (Number(score) > state.scores[week][day])
        state.scores[week][day] = Number(score);
    },
    updateProgress: (state, action) => {
      const { curWeek, curChallenge } = action.payload;
      state.curWeek = curWeek;
      state.curChallenge = curChallenge;
    },
    updateSelectedWeek: (state, action) => {
      state.selectedWeek = action.payload; // Update selectedWeek
    },
    addActivityDate: (state, action) => {
      const { date, curWeek, curChallenge } = action.payload;
      // Avoid adding duplicate dates for the same challenge
      const existingActivity = state.activityDates.find(
        (activity) =>
          activity.date === date &&
          activity.weekNo === curWeek &&
          activity.challengeNo === curChallenge
      );

      if (!existingActivity) {
        state.activityDates.push({
          date: date,
          weekNo: curWeek,
          challengeNo: curChallenge,
        });
      }

      // Check if the user has completed all challenges for the current week consecutively
      const weekActivities = state.activityDates.filter(
        (activity) => activity.weekNo === curWeek
      );
      
      // Sort dates to check for consecutive streak
      weekActivities.sort((a, b) => new Date(a.date) - new Date(b.date));
      
      // Check for consecutive dates
      const isConsecutive = weekActivities.every((_, index, arr) => {
        if (index === 0) return true;
        const prevDate = new Date(arr[index - 1].date);
        const currentDate = new Date(arr[index].date);
        const differenceInDays = (currentDate - prevDate) / (1000 * 60 * 60 * 24);
        return differenceInDays === 1;
      });
      
      if (isConsecutive && weekActivities.length === 7) {
        // Mark the badge for this week as true
        state.badges[curWeek - 1] = true;
      }
    },
  },
});

export const { setUser, updateScores, updateProgress, updateSelectedWeek, addActivityDate } = userSlice.actions;
export default userSlice.reducer;
