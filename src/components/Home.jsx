import React, { useState } from "react";

const Home = () => {
    const [file, setFile] = useState(null);
    const [prediction, setPrediction] = useState(null); // State variable to store prediction result

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
        // Clear previous prediction when a new file is selected
        setPrediction(null);
    };

    const handlePredict = async () => {
        if (!file) {
            alert("Please select a file.");
            return;
        }

        try {
            const formData = new FormData();
            formData.append("image", file);

            const response = await fetch("http://127.0.0.1:5000/predict", {
                method: "POST",
                body: formData
            });

            if (!response.ok) {
                throw new Error("Failed to predict.");
            }

            const data = await response.json();
            setPrediction(data.prediction); // Update prediction state with received data
        } catch (error) {
            console.error("Error predicting:", error);
        }
    };

    return (
        <div className="container-fluid vh-100 d-flex justify-content-center align-items-center">
            <div className="background-image" style={{ 
                backgroundImage: `url('https://images.pexels.com/photos/17483869/pexels-photo-17483869/free-photo-of-an-artist-s-illustration-of-artificial-intelligence-ai-this-image-represents-how-machine-learning-is-inspired-by-neuroscience-and-the-human-brain-it-was-created-by-novoto-studio-as-par.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')`, 
                backgroundSize: 'cover', 
                backgroundPosition: 'center', 
                filter: 'brightness(30%)',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: -1
            }}></div>
            <div className="text-center">
                <h1 className="text-white">Check Brain Tumor</h1>
                <div className="input-group mb-3 mt-3">
                    <input type="file" className="form-control" onChange={handleFileChange} />
                </div>
                <button className="btn btn-primary" onClick={handlePredict}>Prediction</button>
                {prediction !== null && ( // Render prediction result if available
                    <div className="mt-3">
                        <h2 className="text-white">Prediction Result:</h2>
                        <p className="text-white">{prediction}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;

