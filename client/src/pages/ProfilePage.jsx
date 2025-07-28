import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Allergy from "../components/Allergy";

import "../css/ProfilePage.css";

const ProfilePage = () => {
  const [allergy, setAllergy] = useState("");
  const [allergies, setAllergies] = useState([]);
  const [profile, setProfile] = useState({
    meatConsumption: "",
    fishConsumption: "",
    vegetableConsumption: "",
    spicinessLevel: ""
  });
  const navigate = useNavigate();
  
  // After submitting form, saves all the user's preferenceson their diet
  const handleSubmit = e => {
    e.preventDefault();
    const userId = localStorage.getItem("userId");
    alert(`Selected option: Meat: ${profile.meatConsumption}, Fish: ${profile.fishConsumption}, Veggie: ${profile.vegetableConsumption}, Spicy: ${profile.spicinessLevel}`)
    navigate(`/users/${userId}/ingredients`)
  }
  
  // Adds a new allergy and resets the input
  const handleAdd = (e) => {
    e.preventDefault();
    setAllergies([...allergies, allergy])
    alert(`Added ${allergy}`);
    setAllergy("");
  }

  const handleRadioChange = e => {
    const { name, value } = e.target;
    setProfile(prevProfile => ({
      ...prevProfile, [name]: value
    }))
  }

  const handleChange = (e) => {
    const { value } = e.target;
    setAllergy(value);
  }

  // Show all allergies that do not include the allergy to be deleted
  const handleDelete = allergy => {
    setAllergies(prevAllergies => prevAllergies.filter(item => !(item === allergy)));
  }
  
  return (
    <div className="profile-container">
      <div className="profile text-font">
      <h2>Profile</h2>
      <form className="profile-form" onSubmit={handleSubmit}>
        <p>Allergies (optional)</p>
        <div className="input-group">
          <input type="text" placeholder="Add allergy" id="allergies" value={allergy} onChange={handleChange}/>
          <button onClick={handleAdd}>Add</button>
        </div>
        <div className="allergies">
          {allergies && allergies.map((allergy, i) => (
            <Allergy allergy={allergy} handleDelete={handleDelete} key={i}/>
          ))}
        </div>
        
        <div className="radio-group">
          <p>Meat Consumption {!profile.meatConsumption && <span style={{color: "red"}}>*</span>}</p>
          {/* For the radio group to be required, they must all have the same name value and have one input be required */}
          {/* checked makes the radio button checked if the meat state equals never */}
          <input type="radio" id="meat0" name="meatConsumption" value="Never" checked={profile.meatConsumption === "Never"} onChange={handleRadioChange} required/>
          <label htmlFor="meat0">Never</label>
          <input type="radio" id="meat1" name="meatConsumption" value="Rarely" checked={profile.meatConsumption === "Rarely"} onChange={handleRadioChange}/>
          <label htmlFor="meat1">Rarely</label>
          <input type="radio" id="meat2" name="meatConsumption" value="Occasionally" checked={profile.meatConsumption === "Occasionally"} onChange={handleRadioChange}/>
          <label htmlFor="meat2">Occasionally</label>
          <input type="radio" id="meat3" name="meatConsumption" value="Frequently" checked={profile.meatConsumption === "Frequently"} onChange={handleRadioChange}/>
          <label htmlFor="meat3">Frequently</label>
          <input type="radio" id="meat4" name="meatConsumption" value="Daily" checked={profile.meatConsumption === "Daily"} onChange={handleRadioChange}/>
          <label htmlFor="meat4">Daily</label>
        </div>

        <div className="radio-group">
          <p>Fish Consumption {!profile.fishConsumption && <span style={{color: "red"}}>*</span>}</p>
          <input type="radio" id="fish0" name="fishConsumption" value="Never" checked={profile.fishConsumption === "Never"} onChange={handleRadioChange} required/>
          <label htmlFor="fish0">Never</label>
          <input type="radio" id="fish1" name="fishConsumption" value="Rarely" checked={profile.fishConsumption === "Rarely"} onChange={handleRadioChange}/>
          <label htmlFor="fish1">Rarely</label>
          <input type="radio" id="fish2" name="fishConsumption" value="Occasionally" checked={profile.fishConsumption === "Occasionally"} onChange={handleRadioChange}/>
          <label htmlFor="fish2">Occasionally</label>
          <input type="radio" id="fish3" name="fishConsumption" value="Frequently" checked={profile.fishConsumption === "Frequently"} onChange={handleRadioChange}/>
          <label htmlFor="fish3">Frequently</label>
          <input type="radio" id="fish4" name="fishConsumption" value="Daily" checked={profile.fishConsumption === "Daily"} onChange={handleRadioChange}/>
          <label htmlFor="fish4">Daily</label>
        </div>

        <div className="radio-group">
          <p>Vegetable Consumption {!profile.vegetableConsumption && <span style={{color: "red"}}>*</span>}</p>
          <input type="radio" id="vegetable0" name="vegetableConsumption" value="Never" checked={profile.vegetableConsumption === "Never"} onChange={handleRadioChange} required/>
          <label htmlFor="vegetable0">Never</label>
          <input type="radio" id="vegetable1" name="vegetableConsumption" value="Rarely" checked={profile.vegetableConsumption === "Rarely"} onChange={handleRadioChange}/>
          <label htmlFor="vegetable1">Rarely</label>
          <input type="radio" id="vegetable2" name="vegetableConsumption" value="Occasionally" checked={profile.vegetableConsumption === "Occasionally"} onChange={handleRadioChange}/>
          <label htmlFor="vegetable2">Occasionally</label>
          <input type="radio" id="vegetable3" name="vegetableConsumption" value="Frequently" checked={profile.vegetableConsumption === "Frequently"} onChange={handleRadioChange}/>
          <label htmlFor="vegetable3">Frequently</label>
          <input type="radio" id="vegetable4" name="vegetableConsumption" value="Daily" checked={profile.vegetableConsumption === "Daily"} onChange={handleRadioChange}/>
          <label htmlFor="vegetable4">Daily</label>
        </div>

        <div className="radio-group">
          <p>Spiciness {!profile.spicinessLevel && <span style={{color: "red"}}>*</span>}</p>
          <input type="radio" id="spicy0" name="spicinessLevel" value="0" checked={profile.spicinessLevel === "0"} onChange={handleRadioChange} required/>
          <label htmlFor="spicy0">0</label>
          <input type="radio" id="spicy1" name="spicinessLevel" value="1" checked={profile.spicinessLevel === "1"} onChange={handleRadioChange}/>
          <label htmlFor="spicy1">1</label>
          <input type="radio" id="spicy2" name="spicinessLevel" value="2" checked={profile.spicinessLevel === "2"} onChange={handleRadioChange}/>
          <label htmlFor="spicy2">2</label>
          <input type="radio" id="spicy3" name="spicinessLevel" value="3" checked={profile.spicinessLevel === "3"} onChange={handleRadioChange}/>
          <label htmlFor="spicy3">3</label>
          <input type="radio" id="spicy4" name="spicinessLevel" value="4" checked={profile.spicinessLevel === "4"} onChange={handleRadioChange}/>
          <label htmlFor="spicy4">4</label>
        </div>
        <button className="profile-btn" type="submit">Save</button>
        </form>
      </div>
    </div>
  )
}

export default ProfilePage;