import React from "react";

export default function UploadForm({ file, setFile, handleUpload }) {
  return (
    <div className="card shadow p-4 mt-4">
      <h4>Upload File</h4>
      <input type="file" className="form-control mb-3" onChange={e => setFile(e.target.files[0])} />
      <button className="btn btn-success" onClick={handleUpload}>Upload</button>
    </div>
  );
}
