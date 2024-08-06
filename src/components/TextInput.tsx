interface TextInputProps {
  value: string;
  setName: (name: string) => void;
  type: "text" | "email" | "password";
  label?: string;
  placeholder?: string;
}

export default function TextInput({
  value,
  setName,
  type,
  label,
  placeholder,
}: TextInputProps) {
  return (
    <div>
      {label && <label className="block text-sm font-medium ">{label}</label>}
      <input
        type={type}
        value={value}
        onChange={(e) => setName(e.target.value)}
        className="text-sm rounded-lg block w-full p-2.5 bg-gray-200 border-blue-500 border-2 placeholder-gray-400  focus:border-blue-800 outline-none "
        placeholder={placeholder}
      />
    </div>
  );
}
