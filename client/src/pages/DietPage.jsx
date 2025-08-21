import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Allergy from "../components/Allergy";
import Navbar from "../components/Navbar";

import "../css/DietPage.css";

const DietPage = () => {
  const [allergy, setAllergy] = useState("");
  const [diet, setDiet] = useState({
    // veganType: "",
    meatConsumption: "",
    fishConsumption: "",
    vegetableConsumption: "",
    spicinessLevel: "",
    allergies: []
  });
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  
  // After submitting form, saves all the user's preferenceson their diet
  const handleSubmit = async e => {
    e.preventDefault();

    // const response = 
    await fetch(`http://localhost:3000/users/${userId}/diet`, {
      method: "PUT",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(diet)
    })

    // const data = await response.json();
    // console.log(data);
    // alert(`Preferences saved: Meat: ${diet.meatConsumption}, Fish: ${diet.fishConsumption}, Veggie: ${diet.vegetableConsumption}, Spiciness: ${diet.spicinessLevel}`)
    navigate(`/users/${userId}/ingredients`)
  }
  
  // Adds a new allergy and resets the input
  const handleAdd = e => {
    e.preventDefault();
    if (allergy === "") {
      alert("Cannot add an empty allergy");
      return;
    }
    setDiet(prevDiet => ({
      ...prevDiet, allergies: [...prevDiet.allergies, allergy]
    }));
    // alert(`Added ${allergy}`);
    setAllergy("");
  }

  const handleRadioChange = e => {
    const { name, value } = e.target;
    setDiet(prevDiet => ({
      ...prevDiet, [name]: value
    }))
  }

  const handleChange = e => {
    const { value } = e.target;
    setAllergy(value);
  }

  // Show all allergies that do not include the allergy to be deleted
  const handleDelete = allergy => {
    setDiet(prevDiet => ({
      ...prevDiet, allergies: prevDiet.allergies.filter(item => !(item === allergy))
    }))
  }
  
  const getDiet = async () => {
    try {
      const response = await fetch(`http://localhost:3000/users/${userId}/diet`, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (!response.ok) {
        localStorage.removeItem("userId");
        localStorage.removeItem("token");
        localStorage.removeItem("currRecipes");
        alert("You need to login");
        navigate("/login");
        return;
      }

      const data = await response.json();
      // alert(`Diet is: ${data.pref_meats}, ${data.pref_fish}, ${data.pref_veggies}, ${data.pref_spicy}, ${data.allergies}`);
      setDiet(prevDiet => ({
        ...prevDiet, 
        meatConsumption: data.pref_meats,
        fishConsumption: data.pref_fish,
        vegetableConsumption: data.pref_veggies,
        spicinessLevel: data.pref_spicy,
        allergies: data.allergies || []
      }));
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getDiet();
  }, [])

  return (
    <>
      <Navbar />
      <div className="diet-container">
        <div>
          <h2>Diet</h2>
          <form className="diet-form" onSubmit={handleSubmit}>
            <p>Allergies (optional)</p>
            <div className="input-group">
              <input type="text" placeholder="Add allergy" id="allergies" value={allergy} onChange={handleChange}/>
              <button onClick={handleAdd}>Add</button>
            </div>
            <div className="allergies">
              {diet.allergies && diet.allergies.length > 0 ? (
                diet.allergies.map((allergy, i) => (
                  <Allergy allergy={allergy} handleDelete={handleDelete} key={i} />
                ))
              ) : (
                <p>No allergies added</p>
              )}
            </div>
            
            {/* <div className="radio-group">
              <p>Vegan Options (optional)</p>
              <input type="radio" id="vegan0" name="veganType" value="Strict" checked={diet.veganType === "Strict"} onChange={handleRadioChange} required/>
              <label htmlFor="meat0">Never</label>
              <input type="radio" id="vegan1" name="veganType" value="Lacto" checked={diet.veganType === "Lacto"} onChange={handleRadioChange}/>
              <label htmlFor="meat1">Rarely</label>
              <input type="radio" id="vegan2" name="veganType" value="Ovo" checked={diet.veganType === "OccOvosionally"} onChange={handleRadioChange}/>
              <label htmlFor="meat2">Occasionally</label>
              <input type="radio" id="vegan3" name="veganType" value="Pescatarian" checked={diet.veganType === "Pescatarian"} onChange={handleRadioChange}/>
              <label htmlFor="meat3">Frequently</label>
              <input type="radio" id="vegan4" name="veganType" value="Flexitarian" checked={diet.veganType === "Flexitarian"} onChange={handleRadioChange}/>
              <label htmlFor="meat4">Daily</label>
            </div> */}

            <div className="radio-group">
              <p>Meat Consumption {!diet.meatConsumption && <span style={{color: "red"}}>*</span>}</p>
              {/* For the radio group to be required, they must all have the same name value and have one input be required */}
              {/* checked makes the radio button checked if the meat state equals never */}
              <input type="radio" id="meat0" name="meatConsumption" value="Never" checked={diet.meatConsumption === "Never"} onChange={handleRadioChange} required/>
              <label htmlFor="meat0">Never</label>
              <input type="radio" id="meat1" name="meatConsumption" value="Rarely" checked={diet.meatConsumption === "Rarely"} onChange={handleRadioChange}/>
              <label htmlFor="meat1">Rarely</label>
              <input type="radio" id="meat2" name="meatConsumption" value="Occasionally" checked={diet.meatConsumption === "Occasionally"} onChange={handleRadioChange}/>
              <label htmlFor="meat2">Occasionally</label>
              <input type="radio" id="meat3" name="meatConsumption" value="Frequently" checked={diet.meatConsumption === "Frequently"} onChange={handleRadioChange}/>
              <label htmlFor="meat3">Frequently</label>
              <input type="radio" id="meat4" name="meatConsumption" value="Daily" checked={diet.meatConsumption === "Daily"} onChange={handleRadioChange}/>
              <label htmlFor="meat4">Daily</label>
            </div>

            <div className="radio-group">
              <p>Fish Consumption {!diet.fishConsumption && <span style={{color: "red"}}>*</span>}</p>
              <input type="radio" id="fish0" name="fishConsumption" value="Never" checked={diet.fishConsumption === "Never"} onChange={handleRadioChange} required/>
              <label htmlFor="fish0">Never</label>
              <input type="radio" id="fish1" name="fishConsumption" value="Rarely" checked={diet.fishConsumption === "Rarely"} onChange={handleRadioChange}/>
              <label htmlFor="fish1">Rarely</label>
              <input type="radio" id="fish2" name="fishConsumption" value="Occasionally" checked={diet.fishConsumption === "Occasionally"} onChange={handleRadioChange}/>
              <label htmlFor="fish2">Occasionally</label>
              <input type="radio" id="fish3" name="fishConsumption" value="Frequently" checked={diet.fishConsumption === "Frequently"} onChange={handleRadioChange}/>
              <label htmlFor="fish3">Frequently</label>
              <input type="radio" id="fish4" name="fishConsumption" value="Daily" checked={diet.fishConsumption === "Daily"} onChange={handleRadioChange}/>
              <label htmlFor="fish4">Daily</label>
            </div>

            <div className="radio-group">
              <p>Vegetable Consumption {!diet.vegetableConsumption && <span style={{color: "red"}}>*</span>}</p>
              <input type="radio" id="vegetable0" name="vegetableConsumption" value="Never" checked={diet.vegetableConsumption === "Never"} onChange={handleRadioChange} required/>
              <label htmlFor="vegetable0">Never</label>
              <input type="radio" id="vegetable1" name="vegetableConsumption" value="Rarely" checked={diet.vegetableConsumption === "Rarely"} onChange={handleRadioChange}/>
              <label htmlFor="vegetable1">Rarely</label>
              <input type="radio" id="vegetable2" name="vegetableConsumption" value="Occasionally" checked={diet.vegetableConsumption === "Occasionally"} onChange={handleRadioChange}/>
              <label htmlFor="vegetable2">Occasionally</label>
              <input type="radio" id="vegetable3" name="vegetableConsumption" value="Frequently" checked={diet.vegetableConsumption === "Frequently"} onChange={handleRadioChange}/>
              <label htmlFor="vegetable3">Frequently</label>
              <input type="radio" id="vegetable4" name="vegetableConsumption" value="Daily" checked={diet.vegetableConsumption === "Daily"} onChange={handleRadioChange}/>
              <label htmlFor="vegetable4">Daily</label>
            </div>

            <div className="radio-group">
              <p>Spiciness {!diet.spicinessLevel && <span style={{color: "red"}}>*</span>}</p>
              <input type="radio" id="spicy0" name="spicinessLevel" value="0" checked={diet.spicinessLevel === "0"} onChange={handleRadioChange} required/>
              <label htmlFor="spicy0">0</label>
              <input type="radio" id="spicy1" name="spicinessLevel" value="1" checked={diet.spicinessLevel === "1"} onChange={handleRadioChange}/>
              <label htmlFor="spicy1">1</label>
              <input type="radio" id="spicy2" name="spicinessLevel" value="2" checked={diet.spicinessLevel === "2"} onChange={handleRadioChange}/>
              <label htmlFor="spicy2">2</label>
              <input type="radio" id="spicy3" name="spicinessLevel" value="3" checked={diet.spicinessLevel === "3"} onChange={handleRadioChange}/>
              <label htmlFor="spicy3">3</label>
              <input type="radio" id="spicy4" name="spicinessLevel" value="4" checked={diet.spicinessLevel === "4"} onChange={handleRadioChange}/>
              <label htmlFor="spicy4">4</label>
            </div>
            <button className="diet-btn" type="submit">Save</button>
          </form>
        </div>
      </div>
    </>
  )
}

export default DietPage;