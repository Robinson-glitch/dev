

// import logo from './logo.svg';
import React, { useState,useEffect } from "react";
import axios from "axios";
import './App.css';

function App() {

const[countries,Setcountries]=useState([]);
const[states, Setstates]=useState([]);
const[cities, Setcities]=useState([]);
const[selectedCountry,setSelectedCountry]=useState("");
const[selectedState, setSelectedState]=useState("");
const[selectedCity,setSelectedCity]=useState("");

useEffect(()=>{
  
fetchCountries();

},[])

 const fetchCountries=()=>{

  axios.get("https://crio-location-selector.onrender.com/countries").then((response)=>{

    Setcountries(response.data);
    console.log(response.data);

  }).catch((error)=>{

    console.log(`Error fetching data:${error}`);
  });
  }
  
  const handleSelectCountry=(event)=>{
    
    setSelectedCountry(event.target.value)
    fetchStates(event.target.value);
  }

   const handleSelectState=(event)=>{
    const SelectedState=event.target.value;
    setSelectedState(event.target.value)
    fetchCities(selectedCountry,SelectedState);
  }

   const handleSelectCity=(event)=>{
    setSelectedCity(event.target.value)

  }

  const fetchStates=(countryName)=>{
  axios.get(`https://crio-location-selector.onrender.com/country=${countryName}/states`).then((response)=>{

    Setstates(response.data);

  }).catch((error)=>{

    console.log(`Error fetching data:${error}`);
  });
    
  }

  const fetchCities=(countryName,stateName)=>{
  axios.get(`https://crio-location-selector.onrender.com/country=${countryName}/state=${stateName}/cities`).then((response)=>{

    Setcities(response.data);

  }).catch((error)=>{

    console.log(`Error fetching data:${error}`);
  });
    
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




