

// import logo from './logo.svg';
import React, { useState,useEffect } from "react";
import axios from "axios";
import './App.css';

function App() {

const[countries,setCountries]=useState([]);
const[states, Setstates]=useState([]);
const[cities, Setcities]=useState([]);
const[selectedCountry,setSelectedCountry]=useState("");
const[selectedState, setSelectedState]=useState("");
const[selectedCity,setSelectedCity]=useState("");

useEffect(()=>{
  
fetchCountries();

},[])

 const fetchCountries=async()=>{

  try {
      const response = await axios.get("https://crio-location-selector.onrender.com/countries");
      setCountries(response.data);
    } catch (error) {
      console.error(`Error fetching countries: ${error}`);
    }
  }
  
  const handleSelectCountry=(event)=>{
    const selectedcountry=event.target.value;
    setSelectedCountry(selectedcountry)
    setSelectedState("");
    setSelectedCity("");
    Setcities([]);
    Setstates([]);

    if(selectedcountry){
    fetchStates(selectedcountry);
    }
  }

   const handleSelectState=(event)=>{
    const selectedState=event.target.value;
    setSelectedState(selectedState);
    setSelectedCity("");
    Setcities([]);
    if(selectedState){
    fetchCities(selectedCountry,selectedState);
    }
  }

   const handleSelectCity=(event)=>{
    const SelectedCity= event.target.value;
    setSelectedCity(SelectedCity);
    

  }

  const fetchStates=async(countryName)=>{
 
   try {
      const response = await axios.get(`https://crio-location-selector.onrender.com/country=${countryName}/states`);
      Setstates(response.data);
    } catch (error) {
      console.error(`Error fetching countries: ${error}`);
    }
    
  }

  const fetchCities=async(countryName,stateName)=>{
   try {
      const response = await axios.get(`https://crio-location-selector.onrender.com/country=${countryName}/state=${stateName}/cities`);
      Setcities(response.data);
    } catch (error) {
      console.error(`Error fetching countries: ${error}`);
    }
  }

  return (
    <div className="App" style={{display:"flex",gap:"10px"}}>
    <select  value={selectedCountry} onChange={handleSelectCountry}>
    <option value="">Select Country</option>
     {countries.map((country)=>(
     <option key={country} value={country}>{country}</option>
     ))}
    </select>
    <select disabled={selectedCountry!==""?false:true} value={selectedState} onChange={handleSelectState}>
    <option value="">Select State</option>
    {states.map((state)=>(
      <option key={state} value={state}>{state}</option>
    ))}
    </select>
    <select  disabled={selectedState!==""?false:true} value={selectedCity} onChange={handleSelectCity}>
    <option value="">Select City</option>
    {cities.map((city)=>(
<option key={city} value={city}>{city}</option>
    ))}
    </select>
    </div>
  );
}

export default App;




