import { assets } from '@/assets/assets';
import ActivityGrid from '@/components/ActivityGrid';
import { addActivityDate, setUser, updateSelectedWeek } from '@/redux/userSlice';
import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import MyChartComponent from '@/components/MyChartComponent';
import AnimatedCircularProgressBar from '@/components/ui/animated-circular-progress-bar';

// Register all chart components
Chart.register(...registerables);


const MyProfile = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);

  // Test Function to add dummy user activities
  const generateActivityDates = (startDate, weeks = 7, challengesPerWeek = 7) => {
    const dates = [];
    const currentDate = new Date(startDate);

    for (let week = 1; week <= 3; week++) {
      for (let challenge = 1; challenge <= (week == 3 ? 1 : 7); challenge++) {
        dispatch(addActivityDate({
          date: new Date(currentDate).toISOString(),
          curChallenge: challenge,
          curWeek: week,
        }));
        if (week == 1 && challenge == 5) currentDate.setDate(currentDate.getDate() + 3);
        else currentDate.setDate(currentDate.getDate() + 1); // Increment date by 1 day
      }
    }
  };
  generateActivityDates("2024-11-24T13:19:13.186Z");
  
  useEffect(() => {
    console.log(user);
  }, [user]);

  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsEdit(false);
    // Update user information in the Redux store here if necessary
    // e.g., dispatch(setUser(updatedUser))
  };

  const handleWeekClick = (week) => {
    if (week > user.curWeek) {
      toast.error("Complete the current week's challenge to unlock this!");
    } else {
      dispatch(updateSelectedWeek(week));
    }
  };


    // Data for the chart (accuracy of challenges)
    const chartRef = useRef(null);
    const chartInstance = useRef(null);

    // Chart initialization and update
    useEffect(() => {
    if (chartRef.current) {
        // Destroy existing chart if it exists
        if (chartInstance.current) {
        chartInstance.current.destroy();
        }

        const challengeLabels = ['Challenge 1', 'Challenge 2', 'Challenge 3', 'Challenge 4', 'Challenge 5', 'Challenge 6', 'Challenge 7'];
        const selectedWeekData = user.scores[user.selectedWeek - 1] || [];

        chartInstance.current = new Chart(chartRef.current, {
            type: 'bar',
            data: {
              labels: challengeLabels,
              datasets: [{
                label: `Week ${user.selectedWeek} Challenge Scores`,
                data: selectedWeekData,
                backgroundColor: '#5f6FFF',
                borderColor: '#001aff',
                borderWidth: 1,
              }]
            },
            options: {
              responsive: true,
              scales: {
                y: {
                  beginAtZero: true,
                  max: 100,
                  title: {
                    display: true,
                    text: 'Score (%)',
                    color: '#000000',  // Make y-axis title black
                    font: {
                        size: '20px',
                        weight: 'bold',
                        family: 'Poppins'
                    }
                  },
                  ticks: {
                    color: '#000000' , // Make y-axis labels black
                    font: {
                        size: '16px',
                        weight: 'medium',
                        family: 'Poppins'
                    }
                  },
                  grid: {
                    color: 'rgba(0, 0, 0, 0.1)'  // Optional: make grid lines lighter black
                  }
                },
                x: {
                  ticks: {
                    color: '#000000',  // Make x-axis labels black
                    font: {
                        size: '16px',
                        weight: 'medium',
                        family: 'Poppins'
                    }
                  },
                  grid: {
                    color: 'rgba(0, 0, 0, 0.1)'  // Optional: make grid lines lighter black
                  }
                }
              },
              plugins: {
                title: {
                  display: true,
                  text: `Week ${user.selectedWeek} Performance`,
                  color: '#000000',  // Make title black
                  font: {
                    size: '20px',
                    weight: 'bold',
                    family: 'Poppins'
                }
                },
                legend: {
                  labels: {
                    color: '#000000'  // Make legend text black
                  }
                }
              }
            }
          });
    }

    // Cleanup function
    return () => {
        if (chartInstance.current) {
        chartInstance.current.destroy();
        }
    };
    }, [user.selectedWeek, user.scores]);

    const calculateAverageAccuracy = () => {
        let sum = 0
        let count = 0
        for(let i = 0; i < user.curWeek; i++){
            for(let j = 0; j < (i == user.curWeek-1 ? user.curChallenge-1 : 7); j++){
                sum += user.scores[i][j]
                count += 1
            }
        }
        return sum/count
    }

  return (
    <div className='max-w-[1280px] mx-auto pt-40'>
      {/* My Profile */}
      <div className='flex flex-col gap-8 items-center bg-gray-200 px-6 py-4 rounded-2xl' style={{boxShadow: '6px 6px 10px #0f0f0f'}}>
        <div className='flex gap-4 items-center'>
          <h2 className='font-bold text-xl'>My Profile:</h2>
          {!isEdit ? (
            <img onClick={() => setIsEdit(true)} src={assets.PencilIcon} className='w-6' />
          ) : (
            <div onClick={handleSubmit} className='bg-primary-blue text-white font-medium text-lg px-4 py-2 rounded-full cursor-pointer'>Submit</div>
          )}
        </div>

        <div className='rounded-full overflow-hidden border border-black flex items-center relative'>
          <img src={image ? URL.createObjectURL(image) : user.photo} className='w-32 h-32 object-cover' />
        </div>
        {isEdit && (
          <div>
            <label htmlFor="image" className='bg-primary-blue text-white font-medium text-lg px-4 py-2 rounded-full cursor-pointer'>Upload Photo</label>
            <input onChange={(e) => setImage(e.target.files[0])} type="file" id='image' hidden/>
          </div>
        )}

        <div className='flex justify-between w-full max-w-[1000px]'>
          <div className='flex-1 flex flex-col items-center'>
            <p className='text-[#676767] font-medium'>First Name:</p>
            {isEdit ? (
              <input className='bg-gray-100 border border-black text-xl font-bold max-w-60 text-center' type="text" value={user.firstName} onChange={e => dispatch(setUser({ ...user, firstName: e.target.value }))} />
            ) : (
              <p className='font-bold text-xl'>{user.firstName}</p>
            )}
          </div>
          <div className='flex-1 flex flex-col items-center'>
            <p className='text-[#676767] font-medium'>Last Name:</p>
            {isEdit ? (
              <input className='bg-gray-100 border border-black text-xl font-bold max-w-60 text-center' type="text" value={user.lastName} onChange={e => dispatch(setUser({ ...user, lastName: e.target.value }))} />
            ) : (
              <p className='font-bold text-xl'>{user.lastName}</p>
            )}
          </div>
          <div className='flex-1 flex flex-col items-center'>
            <p className='text-[#676767] font-medium'>Email:</p>
            {isEdit ? (
              <input className='bg-gray-100 border border-black text-xl font-bold max-w-60 text-center' type="text" value={user.email} onChange={e => dispatch(setUser({ ...user, email: e.target.value }))} />
            ) : (
              <p className='font-bold text-xl'>{user.email}</p>
            )}
          </div>
        </div>
        <div className='flex justify-between w-full max-w-[600px]'>
          <div className='flex-1 flex flex-col items-center'>
            <p className='text-[#676767] font-medium'>Phone No:</p>
            {isEdit ? (
              <input className='bg-gray-100 border border-black text-xl font-bold max-w-60 text-center' type="text" value={user.phone} onChange={e => dispatch(setUser({ ...user, phone: e.target.value }))} />
            ) : (
              <p className='font-bold text-xl'>{user.phone}</p>
            )}
          </div>
          <div className='flex-1 flex flex-col items-center'>
            <p className='text-[#676767] font-medium'>Diagnosed With:</p>
            {isEdit ? (
              <input className='bg-gray-100 border border-black text-xl font-bold max-w-60 text-center' type="text" value={user.diagnosed} onChange={e => dispatch(setUser({ ...user, diagnosed: e.target.value }))} />
            ) : (
              <p className='font-bold text-xl text-primary-blue'>{user.diagnosed}</p>
            )}
          </div>
        </div>
      </div>

      {/* Consistency */}
      <div >
        <p className='text-xl font-bold mt-20'>Consistency:</p>
        <ActivityGrid />
      </div>

      {/* Badges Section */}
      <div>
        <p className='text-xl font-bold mt-20 mb-10'>Badges:</p>
        <div className='bg-black/90 flex flex-wrap gap-8 justify-center px-6 py-6 rounded-3xl max-w-[1000px] mx-auto' style={{boxShadow: '6px 6px 10px #0f0f0f'}}>
          {Array.from([1,2,3,4,5,6,7]).map((_,i) => {
            const badge = user.badges[i];
            let name = "";
            if (badge) name = 'Badge'+(i+1);
            return badge ? (
              <div className='w-[100px] h-[100px] rounded-[25px] border-white border-[4px] overflow-hidden'>
                <img src={assets[name]} className='scale-125' />
              </div>
            ) : (
              <div className='h-[100px] w-[100px] border-[4px] border-white text-white font-semibold rounded-[25px] flex items-center justify-center bg-gradient-to-b from-black to-gray-700 '>
                Week {i}
              </div>
            );
          })}
        </div>
      </div>

      {/* Chart JS */}
        <div className="flex items-center gap-4 mt-20 justify-center">
            <span className='text-xl font-bold'>Progress: </span>
            {Array.from({ length: 7 }).map((_, i) => (
            <div
                key={i}
                className={`p-2 rounded-md cursor-pointer w-[30px] h-[30px] inline-flex items-center justify-center ${
                i + 1 === user.selectedWeek
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

        {/* Line Chart for Accuracy */}
        <div className='border border-black rounded-2xl p-4' style={{ width: '800px', margin: '20px auto', boxShadow: '6px 6px 10px #0f0f0f' }}>
            <canvas ref={chartRef}></canvas>
        </div>

      
      {/* Average Accuracy */}
      <div className='mb-20'>
        <p className='text-xl font-bold mt-20 mb-10'>Your Average Accuracy so far:</p>
        <AnimatedCircularProgressBar
              max={100}
              min={0}
              value={calculateAverageAccuracy()} // Use item for individual feedback data
              gaugePrimaryColor="rgb(79 70 229)"
              gaugeSecondaryColor="rgba(0, 0, 0, 0.1)"
              className="self-end w-48 h-48 mx-auto"
            />
      </div>

    </div>
  );
};

export default MyProfile;
