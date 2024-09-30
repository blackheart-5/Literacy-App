import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';

export default function Progress() {
  const [progressData, setProgressData] = useState(null);

  useEffect(() => {
    // Fetch progress data from API
    fetch('/api/progress')
      .then(response => response.json())
      .then(data => setProgressData(data));
  }, []);

  if (!progressData) {
    return <div>Loading...</div>;
  }

  const chartData = {
    labels: progressData.dates,
    datasets: [
      {
        label: 'Words Learned',
        data: progressData.wordsLearned,
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  };

  return (
    <div>
      <h1>Your Progress</h1>
      <Line data={chartData} />
      <div>
        <h2>Statistics</h2>
        <p>Total Words Learned: {progressData.totalWordsLearned}</p>
        <p>Current Streak: {progressData.currentStreak} days</p>
        <p>Longest Streak: {progressData.longestStreak} days</p>
      </div>
    </div>
  );
}