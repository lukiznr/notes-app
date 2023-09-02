import { useState } from "react";
export default function FAB({ setEditor, setIsEditing, index, setIndex }) {
  const [isOpen, setIsOpen] = useState(false);
  const action = [
    {
      icon: "notes",
      onclick: () => {
        setEditor("note");
        setIsEditing(true);
        setIsOpen(!isOpen);
        setIndex(index + 1);
      },
    },
    {
      icon: "checklist",
      onclick: () => {
        setEditor("todo");
        setIsEditing(true);
        setIsOpen(!isOpen);
        setIndex(index + 1);
      },
    },
  ];
  return (
    <div className="fixed bottom-3 right-3 flex flex-col justify-center gap-2">
      {isOpen &&
        action.map((data, index) => (
          <button onClick={data.onclick} key={index}>
            <span className="icon bg-primary rounded-full p-2">
              {data.icon}
            </span>
          </button>
        ))}
      <button onClick={() => setIsOpen(!isOpen)}>
        <span
          className={`${
            isOpen ? "-rotate-45" : ""
          } transition-transform icon bg-primary rounded-full p-4`}
        >
          add
        </span>
      </button>
    </div>
  );
}
