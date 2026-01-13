import { useNavigate } from 'react-router-dom';
import { Leaf, ArrowRight, CheckCircle2 } from 'lucide-react';

export function About() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
{/* Header provided globally via `Header` component */}

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            About Weed Classifier
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            An AI-powered solution for precision agriculture, helping farmers distinguish weeds from crops using advanced computer vision
          </p>
        </div>

        {/* Purpose Section */}
        <section className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Our Purpose</h3>
          <div className="bg-green-50 border border-green-200 rounded-lg p-8">
            <p className="text-gray-700 leading-relaxed mb-4">
              Modern agriculture faces the challenge of managing weeds effectively while minimizing environmental impact. Traditional methods often involve blanket herbicide application, which can be wasteful and harmful to the ecosystem.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Our Weed Classifier leverages deep learning to enable <strong>precision agriculture</strong> - identifying weeds with high accuracy so farmers can apply targeted treatments, reduce herbicide usage, and promote sustainable farming practices.
            </p>
          </div>
        </section>

        {/* CNN Workflow */}
        <section className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">How It Works: CNN Workflow</h3>
          
          <div className="space-y-6">
            {/* Step 1 */}
            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">
                1
              </div>
              <div className="flex-1">
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Image Upload</h4>
                <p className="text-gray-600">
                  User uploads an image of a plant through the web interface. The image is sent to the backend API for processing.
                </p>
              </div>
            </div>

            <div className="flex justify-center">
              <ArrowRight className="size-6 text-gray-400" />
            </div>

            {/* Step 2 */}
            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">
                2
              </div>
              <div className="flex-1">
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Preprocessing</h4>
                <p className="text-gray-600 mb-3">
                  The image is resized to a standard input size (224×224 pixels) and pixel values are normalized. This ensures consistent input for the neural network.
                </p>
                <div className="bg-gray-100 rounded-lg p-4 font-mono text-sm text-gray-700">
                  <div>• Resize: 224×224 px</div>
                  <div>• Normalize: pixel values [0-1]</div>
                  <div>• Convert: NumPy array format</div>
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <ArrowRight className="size-6 text-gray-400" />
            </div>

            {/* Step 3 */}
            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">
                3
              </div>
              <div className="flex-1">
                <h4 className="text-lg font-semibold text-gray-900 mb-2">CNN Inference</h4>
                <p className="text-gray-600 mb-3">
                  The preprocessed image passes through a Convolutional Neural Network (CNN). Our model uses a ResNet-50 architecture:
                </p>
                <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6 border border-green-200">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                      <span className="text-gray-700"><strong>Convolution Layers:</strong> Extract features (edges, textures, patterns)</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                      <span className="text-gray-700"><strong>Pooling Layers:</strong> Reduce dimensionality while preserving important features</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                      <span className="text-gray-700"><strong>Fully Connected Layers:</strong> Combine features for final classification</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                      <span className="text-gray-700"><strong>Output Layer:</strong> Produces probability scores for each class</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <ArrowRight className="size-6 text-gray-400" />
            </div>

            {/* Step 4 */}
            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">
                4
              </div>
              <div className="flex-1">
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Classification Result</h4>
                <p className="text-gray-600 mb-3">
                  The backend returns a JSON response containing the prediction (Weed or Crop) along with a confidence score indicating the model's certainty.
                </p>
                <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm text-green-400">
                  {`{\n  "prediction": "Weed",\n  "confidence": 0.92\n}`}
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <ArrowRight className="size-6 text-gray-400" />
            </div>

            {/* Step 5 */}
            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">
                5
              </div>
              <div className="flex-1">
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Display Results</h4>
                <p className="text-gray-600">
                  The frontend displays the classification result with a visual confidence indicator, helping farmers make informed decisions about weed management.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Sustainability Impact */}
        <section className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Sustainability Benefits</h3>
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <CheckCircle2 className="size-8 text-green-600 mb-3" />
              <h4 className="font-semibold text-gray-900 mb-2">Reduced Herbicide Use</h4>
              <p className="text-sm text-gray-600">
                Targeted weed identification enables spot treatment instead of blanket application, reducing chemical usage by up to 70%.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <CheckCircle2 className="size-8 text-green-600 mb-3" />
              <h4 className="font-semibold text-gray-900 mb-2">Environmental Protection</h4>
              <p className="text-sm text-gray-600">
                Less herbicide means reduced soil contamination and water pollution, protecting ecosystems and biodiversity.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <CheckCircle2 className="size-8 text-green-600 mb-3" />
              <h4 className="font-semibold text-gray-900 mb-2">Cost Efficiency</h4>
              <p className="text-sm text-gray-600">
                Precision application reduces chemical costs and labor, improving farm profitability while maintaining crop yields.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <CheckCircle2 className="size-8 text-green-600 mb-3" />
              <h4 className="font-semibold text-gray-900 mb-2">Data-Driven Decisions</h4>
              <p className="text-sm text-gray-600">
                AI-powered insights help farmers understand weed distribution patterns and optimize field management strategies.
              </p>
            </div>
          </div>
        </section>

        {/* Technical Specs */}
        <section className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Technical Specifications</h3>
          <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Model Architecture</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Base: ResNet-50 (Transfer Learning)</li>
                  <li>• Input: 224×224×3 RGB images</li>
                  <li>• Output: Binary classification (Weed/Crop)</li>
                  <li>• Framework: TensorFlow / PyTorch</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Performance Metrics</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Accuracy: ~95% on test set</li>
                  <li>• Inference Time: <3 seconds</li>
                  <li>• Training Dataset: 50,000+ labeled images</li>
                  <li>• API: RESTful (Flask/FastAPI)</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-lg p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-3">Ready to Try It?</h3>
          <p className="mb-6 text-green-50">
            Upload your first image and see our AI in action
          </p>
          <button
            onClick={() => navigate('/')}
            className="px-8 py-3 bg-white text-green-600 font-semibold rounded-lg hover:bg-green-50 transition-colors"
          >
            Get Started
          </button>
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
