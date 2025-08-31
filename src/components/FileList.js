import React from "react";

export default function FileList({ filesList, handleDownload }) {
  return (
    <div className="card shadow p-4 mt-4">
      <h4>Your Files</h4>
      <ul className="list-group">
        {filesList.map(f => (
          <li key={f} className="list-group-item d-flex justify-content-between align-items-center">
            {f}
            <button className="btn btn-primary btn-sm" onClick={() => handleDownload(f)}>Download</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
