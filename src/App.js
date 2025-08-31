import React, { useState } from 'react';
import axios from 'axios';
import AuthForm from './components/AuthForm';
import UploadForm from './components/UploadForm';
import FileList from './components/FileList';
import Navbar from './components/Navbar';


function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState(null);
  const [file, setFile] = useState(null);
  const [filesList, setFilesList] = useState([]);

  // Signup
  const handleSignup = async () => {
    try {
      await axios.post('http://localhost:3000/signup', { username, password });
      alert('Signup successful! Now login.');
    } catch (err) {
      alert(err.response?.data?.error || 'Signup failed');
    }
  };

  // Login
  const handleLogin = async () => {
    try {
      const res = await axios.post('http://localhost:3000/login', { username, password });
      setToken(res.data.token);
      alert('Login successful!');
      fetchFiles(res.data.token);
    } catch (err) {
      alert(err.response?.data?.error || 'Login failed');
    }
  };

  const handleLogout = () => {
  setToken(null);     // clear the token from state
  setUsername('');    // optional: clear username
  setPassword('');    // optional: clear password
  setFilesList([]);   // optional: clear file list
};

  // Fetch files
  const fetchFiles = async (jwtToken) => {
    try {
      const res = await axios.get('http://localhost:3000/files', {
        headers: { Authorization: `Bearer ${jwtToken}` },
      });
      setFilesList(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // Upload file
  const handleUpload = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);

    try {
      await axios.post('http://localhost:3000/upload', formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFile(null);
      fetchFiles(token);
    } catch (err) {
      console.error(err);
    }
  };

  // Download file
  const handleDownload = async (fileName) => {
    try {
      const response = await fetch(`http://localhost:3000/download/${fileName}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error("Download failed");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container py-4">
    <Navbar token={token} handleLogout={handleLogout} />
      {!token && (
        <AuthForm
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
          handleSignup={handleSignup}
          handleLogin={handleLogin}
        />
      )}

      {token && (
        <>
          <UploadForm file={file} setFile={setFile} handleUpload={handleUpload} />
          <FileList filesList={filesList} handleDownload={handleDownload} />
        </>
      )}
    </div>
  );
}

export default App;
