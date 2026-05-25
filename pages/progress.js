import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import Link from 'next/link';
import NavBar from '../components/NavBar';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function ProgressSkeleton() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
        {[1, 2, 3].map((i) => (
          <div key={i} className="skeleton" style={{ height: '90px', borderRadius: '1rem' }} />
        ))}
      </div>
      <div className="skeleton" style={{ height: '280px', borderRadius: '1rem' }} />
    </div>
  );
}

export default function Progress() {
  const [progressData, setProgressData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/progress/get')
      .then((res) => res.json())
      .then((data) => setProgressData(data))
      .finally(() => setLoading(false));
  }, []);

  const totalReviewed = progressData?.length ?? 0;
  const totalCorrect = progressData?.filter((p) => p.correct).length ?? 0;
  const accuracy = totalReviewed > 0 ? Math.round((totalCorrect / totalReviewed) * 100) : 0;

  const chartData = {
    labels: progressData?.map((_, i) => `Word ${i + 1}`) ?? [],
    datasets: [
      {
        label: 'Times Reviewed',
        data: progressData?.map((p) => p.timesReviewed) ?? [],
        fill: true,
        borderColor: '#22d3ee',
        backgroundColor: 'rgba(34,211,238,0.08)',
        pointBackgroundColor: '#22d3ee',
        pointBorderColor: 'rgba(34,211,238,0.4)',
        pointRadius: 4,
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: 'rgba(15,23,42,0.9)',
        borderColor: 'rgba(255,255,255,0.1)',
        borderWidth: 1,
        titleColor: '#f1f5f9',
        bodyColor: 'rgba(255,255,255,0.6)',
      },
    },
    scales: {
      x: {
        grid: { color: 'rgba(255,255,255,0.05)' },
        ticks: { color: 'rgba(255,255,255,0.35)', font: { size: 11 } },
      },
      y: {
        grid: { color: 'rgba(255,255,255,0.05)' },
        ticks: { color: 'rgba(255,255,255,0.35)', font: { size: 11 } },
      },
    },
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0f172a' }}>
      <NavBar />

      <main style={{ maxWidth: '720px', margin: '0 auto', padding: '3rem 1.5rem' }}>

        <h1 style={{
          fontSize: '1.75rem', fontWeight: '700',
          background: 'linear-gradient(135deg, #f1f5f9, rgba(255,255,255,0.6))',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          margin: '0 0 2rem',
        }}>
          Your Progress
        </h1>

        {loading && <ProgressSkeleton />}

        {!loading && (!progressData || progressData.length === 0) && (
          <div className="glass-card" style={{ padding: '3rem', textAlign: 'center' }}>
            <p style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>📊</p>
            <p style={{ color: 'rgba(255,255,255,0.5)', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
              No progress data yet. Complete some flashcards to see your stats here.
            </p>
            <Link href="/learn" style={{
              display: 'inline-block',
              padding: '0.7rem 1.5rem',
              background: 'linear-gradient(135deg, #22d3ee, #a855f7)',
              borderRadius: '0.5rem',
              color: 'white', fontWeight: '600', fontSize: '0.9rem',
            }}>
              Start Learning →
            </Link>
          </div>
        )}

        {!loading && progressData && progressData.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
              {[
                { label: 'Words Reviewed', value: totalReviewed, color: '#22d3ee' },
                { label: 'Correct Answers', value: totalCorrect, color: '#a855f7' },
                { label: 'Accuracy', value: `${accuracy}%`, color: accuracy >= 70 ? '#4ade80' : '#fb923c' },
              ].map(({ label, value, color }) => (
                <div key={label} className="glass-card" style={{ padding: '1.25rem 1.5rem' }}>
                  <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem', margin: '0 0 0.4rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                    {label}
                  </p>
                  <p style={{ fontSize: '1.75rem', fontWeight: '700', color, margin: 0 }}>
                    {value}
                  </p>
                </div>
              ))}
            </div>

            <div className="glass-card" style={{ padding: '1.5rem' }}>
              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem', fontWeight: '500', margin: '0 0 1rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                Review Activity
              </p>
              <Line data={chartData} options={chartOptions} />
            </div>

          </div>
        )}
      </main>
    </div>
  );
}
