import React, { useState, useEffect } from 'react';
import { updateUserSettings, getUserProfile } from '../pages/api/vocabulary/api';

const SettingsPage = () => {
  const [settings, setSettings] = useState({
    dailyGoal: 10,
    notificationsEnabled: true,
    theme: 'light',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const profile = await getUserProfile();
        setSettings(profile.settings);
      } catch (err) {
        setError('Failed to load settings. Please try again later.', err);
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings(prevSettings => ({
      ...prevSettings,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateUserSettings(settings);
      alert('Settings updated successfully!');
    } catch (error) {
      setError('Error updating settings. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container">
      <h1>Settings</h1>
      <form onSubmit={handleSubmit}>
        {/* Form fields remain the same */}
        <button type="submit" disabled={loading}>
          {loading ? 'Saving...' : 'Save Settings'}
        </button>
      </form>
    </div>
  );
};

export default SettingsPage;