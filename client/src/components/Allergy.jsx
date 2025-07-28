import "../css/Allergy.css";

const Allergy = ({ allergy, handleDelete }) => {
  return (
    <span className="allergy-card">
      {allergy}
      <button className="delete-allergy" onClick={() => handleDelete(allergy)}>✕</button>
    </span>
  )
}

export default Allergy;