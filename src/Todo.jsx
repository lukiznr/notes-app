import { useState, useEffect } from "react";
export default function Todo() {
  const [todo, setTodo] = useState([
    {
      todo: "Make some todo",
      deadline: new Date().toDateString(),
    },
  ]);
  return (
    <div>
      <ul>
        {todo.map((item) => (
          <li className="bg-gray-800 mb-2 rounded-md">
            <h2 className="text-xl bg-gray-900 p-2 rounded-t-md">{item.todo}</h2>
            <p className="rounded-b-md p-2">Deadline: {item.deadline}</p>
          </li>
        ))}
      </ul>
      <form className="flex flex-col w-full">
        <input
          type="text"
          placeholder="Type todo here..."
          className="rounded-t-md bg-gray-800 px-4 py-2 focus:outline-none"
        />
        <div className="flex flex-nowrap">
          <input
            type="datetime-local"
            className="w-full rounded-bl-md px-4 py-2 bg-gray-800 focus:outline-none"
          />
          <button className="bg-gray-900 rounded-br-md px-4 py-2">Add</button>
        </div>
      </form>
    </div>
  );
}
