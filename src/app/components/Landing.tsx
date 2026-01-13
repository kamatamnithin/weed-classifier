import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, Leaf } from 'lucide-react';

export function Landing() {
  const navigate = useNavigate();
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    const imageFile = files.find(file => file.type.startsWith('image/'));
    
    if (imageFile) {
      handleImageFile(imageFile);
    }
  }, []);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      handleImageFile(file);
    }
  }, []);

  const handleImageFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      const imageData = reader.result as string;
      // Store image in sessionStorage for the prediction page
      sessionStorage.setItem('uploadedImage', imageData);
      sessionStorage.setItem('uploadedImageName', file.name);
      navigate('/prediction');
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header provided globally via `Header` component */}

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            AI-Powered Weed Classification
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Upload an image to classify weeds vs crops using advanced CNN technology for precision agriculture
          </p>
        </div>

        {/* Upload Area */}
        <div className="mb-12">
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`
              relative border-2 border-dashed rounded-lg p-12 text-center transition-all
              ${isDragging 
                ? 'border-green-500 bg-green-50' 
                : 'border-gray-300 bg-gray-50 hover:border-green-400 hover:bg-green-50/50'
              }
            `}
          >
            <input
              type="file"
              id="fileInput"
              accept="image/*"
              onChange={handleFileInput}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            
            <div className="flex flex-col items-center gap-4">
              <div className={`
                p-4 rounded-full transition-colors
                ${isDragging ? 'bg-green-600' : 'bg-green-600/10'}
              `}>
                <Upload className={`size-12 ${isDragging ? 'text-white' : 'text-green-600'}`} />
              </div>
              
              <div>
                <p className="text-lg font-medium text-gray-900 mb-1">
                  Drag and drop your image here
                </p>
                <p className="text-sm text-gray-500">
                  or click to browse files
                </p>
              </div>
              
              <button
                onClick={() => document.getElementById('fileInput')?.click()}
                className="mt-2 px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
              >
                Choose Image
              </button>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center p-6">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Leaf className="size-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">High Accuracy</h3>
            <p className="text-sm text-gray-600">
              Advanced CNN model trained on extensive agricultural datasets
            </p>
          </div>
          
          <div className="text-center p-6">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg className="size-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Fast Processing</h3>
            <p className="text-sm text-gray-600">
              Get instant results with optimized inference pipeline
            </p>
          </div>
          
          <div className="text-center p-6">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg className="size-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Sustainable Farming</h3>
            <p className="text-sm text-gray-600">
              Reduce herbicide use through precise weed identification
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-gray-600">
          <p>Weed Classification System - Powered by Deep Learning</p>
        </div>
      </footer>
    </div>
  );
}
