export default function FormRow({
  name,
  value,
  type,
  handleChange,
  labelText,
}) {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {name || labelText}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={handleChange}
        className="form-input"
      />
    </div>
  );
}
