import React, { useState } from 'react';
import { uploadOCRImage } from '../api/ocr';
import './OCRUploader.css';

function OCRUploader({ onComplete }) {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setError(null);
  };

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    setError(null);

    try {
      const result = await uploadOCRImage(file);
      onComplete(result.text);  
    } catch (err) {
      setError('OCR 업로드 실패');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="ocr-uploader">
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={uploading || !file}>
        {uploading ? '업로드 중...' : 'OCR 이미지 업로드'}
      </button>
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default OCRUploader;
