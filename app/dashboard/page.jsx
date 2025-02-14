"use client"
import { useState, useEffect } from 'react';
import { fetchWeatherData } from '../_fetchWeather/fetchWeather';
import LeftNavBar from '../_components/LeftNavBar';
import WeatherToday from '../_components/WeatherToday';
import CropRecommendationForm from '../_components/CropRecommendationForm';
import CropRecommendationDashboard from '../_components/CropRecommendationDashboard';
import SeedQualityForm from '../_components/SeedQualityForm';
import SignInForm from '../_components/SignInForm';
import CropMonitoring from '../_components/CropMonitoring';
import RightSideNavBar from '../_components/RightSidebar';
import SignUpForm from '../_components/Register';
import store from 'store2';
import { Loader } from 'lucide-react'; // Import the loader spinner from lucide-react

export default function Home() {
  const [weatherData, setWeatherData] = useState(null);
  const [selectedOption, setSelectedOption] = useState('weather');
  const [formData, setFormData] = useState(null);
  const [isSignIn, setIsSignIn] = useState(true); // State to toggle between SignIn and SignUp
  let city = store.get("city");

  useEffect(() => {
    if (city) {
      console.log("city is " +  city);
      fetchWeatherData(city).then(data => setWeatherData(data));
    }
  }, [city]);

  // if (!weatherData) {
  //   return (
  //     <div className="flex justify-center items-center h-screen">
  //       <div className="text-center">
  //         <div>city value is {city}</div>
  //         <Loader className="animate-spin" size={48} />
  //       </div>
  //     </div>
  //   );
  // }

  const handleFormSave = (data) => {
    setFormData(data);
  };

  const handleReset = () => {
    setFormData(null);
  };

  return (
    <div className="flex">
      <LeftNavBar selectedOption={selectedOption} setSelectedOption={setSelectedOption} />
      
      <div className="flex-1 p-4 flex justify-center items-center">
        {selectedOption === 'crop' && !formData && <CropRecommendationForm onSave={handleFormSave} />}
        {selectedOption === 'crop' && formData && <CropRecommendationDashboard formData={formData} city={city} onReset={handleReset} />}
        {selectedOption === 'seed' && <SeedQualityForm />}
        {selectedOption === 'personal' && isSignIn && <SignInForm onSwitchToSignUp={() => setIsSignIn(false)} />}
        {selectedOption === 'personal' && !isSignIn && <SignUpForm onSwitchToSignIn={() => setIsSignIn(true)} />}
        {selectedOption === 'plant' && <CropMonitoring />}
        {selectedOption === 'weather' && <WeatherToday weatherData={weatherData} city={city}/>}

        {/* Render other forms as needed */}
      </div>

      <div className="w-54 bg-gray-100 p-4 fixed right-0 top-0 bottom-0 overflow-auto">
        <RightSideNavBar />
      </div>
    </div>
  );
}
