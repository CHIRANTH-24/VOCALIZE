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

const initialState = {
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
  scores: initializeScores(2, 2),
  selectedWeek: 3,
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
      state.scores[week][day] = score;
    },
    updateProgress: (state, action) => {
      const { curWeek, curChallenge } = action.payload;
      state.curWeek = curWeek;
      state.curChallenge = curChallenge;
    },
    updateSelectedWeek: (state, action) => {
        state.selectedWeek = action.payload; // Update selectedWeek
    },
  },
});

export const { setUser, updateScores, updateProgress, updateSelectedWeek } = userSlice.actions;
export default userSlice.reducer;
