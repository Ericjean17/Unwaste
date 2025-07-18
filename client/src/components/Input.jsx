import "../css/Input.css";

const Input = ({ label, name, type, id, value, onChange }) => {
  const showAsterisk = value.trim() === "";
  
  return (
    <div className="user-input">
      <div className="user-input-container">
        <label htmlFor={id}>
          {label}{" "}
          {showAsterisk && <span style={{ color: "red" }}>*</span>}
        </label>
        <input 
          type={type} 
          name={name} 
          id={id} 
          placeholder={label}
          value={value}
          onChange={onChange}
          required
        />
      </div>
    </div>
	)
}

export default Input;