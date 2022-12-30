export default function Button({ children }) {
  return (
    <button
      className="bg-black dark:bg-white text-lg text-teal-200 dark:text-teal-700rounded-lg px-2"
      onClick={() => {
        alert(`thanks to ${children}`);
      }}
    >
      {children}
    </button>
  );
}
