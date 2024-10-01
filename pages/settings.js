import { useState } from 'react';
import { updateUserSettings } from './api/vocabulary/api';

const SettingsPage = () => {
  const [settings, setSettings] = useState({
    dailyGoal: 10,
    notificationsEnabled: true,
    theme: 'light',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings(prevSettings => ({
      ...prevSettings,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUserSettings(settings);
      alert('Settings updated successfully!');
    } catch (error) {
      alert('Error updating settings');
    }
  };

  return (
    <div className="container">
      <h1>Settings</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="dailyGoal">Daily Goal (words):</label>
          <input
            type="number"
            id="dailyGoal"
            name="dailyGoal"
            value={settings.dailyGoal}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="notificationsEnabled">Enable Notifications:</label>
          <input
            type="checkbox"
            id="notificationsEnabled"
            name="notificationsEnabled"
            checked={settings.notificationsEnabled}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="theme">Theme:</label>
          <select
            id="theme"
            name="theme"
            value={settings.theme}
            onChange={handleChange}
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>
        <button type="submit">Save Settings</button>
      </form>
    </div>
  );
};

export default SettingsPage;