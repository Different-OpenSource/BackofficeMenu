interface ButtonProps {
  text: string;
  onClick: () => void;
  style: "primary" | "secondary" | "danger" | "outline";
}
export default function Button({ text, onClick, style }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg  w-full
        ${style === "primary" && "bg-blue-500 hover:bg-blue-600 text-white"}
        ${style === "secondary" && "bg-gray-500"}
        ${style === "danger" && "bg-red-500"}
        ${style === "outline" && "bg-transparent border-2 border-blue-500 text-blue-500 hover:border-blue-800 hover:text-blue-800"}`}
    >
      {text}
    </button>
  );
}
