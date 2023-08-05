import localforage from "localforage";
import { useState, useEffect } from "react";
import Todo from "./Todo";
import Notes from "./Notes";
function App() {
  const [note, setNote] = useState(true);
  const [todo, setTodo] = useState(true);
  useEffect(() => {
    localforage
      .getItem("view")
      .then(function (value) {
        const note = value.note;
        const todo = value.todo;
        setNote(note);
        setTodo(todo);
      })
      .catch(function (err) {});
  });
  return (
    <>
      <div className="min-h-screen bg-gray-900 text-white flex flex-col justify-center items-center">
        <header className="text-4xl font-bold mb-8">Notes + Todo</header>
        <div className="container flex">
          <div className={`${note ? "" : note} bg-gray-700 h-full w-1/2 m-2 rounded-lg`}>
            <h2 className="rounded-t-lg bg-blue-500 text-2xl font-semibold p-3 text-center">
              Notes
            </h2>
            <Notes />
          </div>
          <div className={`${todo ? "" : todo} bg-gray-700 h-full w-1/2 m-2 rounded-lg`}>
            <h2 className="rounded-t-lg bg-blue-500 text-2xl font-semibold p-3 text-center">Todo</h2>
            <Todo />
          </div>
        </div>
        <footer className="mt-8 text-sm text-gray-600">
          © 2023 Notes + Todo by Luki
        </footer>
      </div>
    </>
  );
}

export default App;
