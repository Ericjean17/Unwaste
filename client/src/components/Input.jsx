import "./Input.css";

const Input = ({ label, name, type, id, value, onChange }) => {
  return (
    <div className="user-input">
      <div className="user-input-container">
        <label htmlFor={id}>
          {label}
        </label>
        <input 
          type={type} 
          name={name} 
          id={id} 
          placeholder={label}
          value={value}
          onChange={onChange}
        />
      </div>
    </div>
	)
}

export default Input;