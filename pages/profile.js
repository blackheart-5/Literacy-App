import { useState, useEffect } from 'react';
import { getUserProfile } from './api/vocabulary/api';

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const data = await getUserProfile();
      setProfile(data);
    };
    fetchProfile();
  }, []);

  if (!profile) {
    return <div>Loading...</div>;
  }

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