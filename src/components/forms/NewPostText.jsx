export default function NewPostText({
  name,
  placeholder,
  handleInputChange,
  styles,
  defaultValue,
}) {
  return (
    <input
      type="text"
      name={name}
      placeholder={placeholder}
      className={`py-1 px-2 rounded-sm w-11/12 border-2 bg-black text-white border-main-purple focus:outline-none ${
        styles ? styles : ``
      }`}
      onChange={handleInputChange}
      defaultValue={defaultValue}
    />
  );
}
