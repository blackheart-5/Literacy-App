import React, { useState, useEffect } from 'react';
import { getUserProfile } from '../pages/api/vocabulary/api';

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getUserProfile();
        setProfile(data);
      } catch (err) {
        setError('Failed to load profile. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!profile) return <div>No profile data available.</div>;

  return (
    <div className="container">
      <h1>User Profile</h1>
      <p>Username: {profile.username}</p>
      <p>Email: {profile.email}</p>
      <p>Languages: {profile.languages.join(', ')}</p>
      <p>Total words learned: {profile.wordsLearned}</p>
    </div>
  );
};

export default ProfilePage;