import React from "react";

export default function AuthForm({ username, password, setUsername, setPassword, handleSignup, handleLogin }) {
  return (
    <div className="card shadow p-4 mt-5">
      <h3 className="text-center mb-4">Personal Cloud Store</h3>
      <input
        className="form-control mb-3"
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
      />
      <input
        className="form-control mb-3"
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <div className="d-flex justify-content-between">
        <button className="btn btn-primary" onClick={handleSignup}>Signup</button>
        <button className="btn btn-success" onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
}
