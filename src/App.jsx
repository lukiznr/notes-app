import localforage from "localforage";
import { useState, useEffect } from "react";
import Todo from "./Todos";
import Notes from "./Notes";
function App() {
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

  const [page, setPage] = useState(true);
  const active = "bg-blue-500";
  const nonactive = "bg-gray-700 text-gray-500";
  return (
    <>
      <div className="min-h-screen bg-gray-900 text-white flex flex-col justify-center items-center">
        <header className="text-4xl font-bold mb-8">Notes + Todo</header>
        <div className="container flex flex-col bg-gray-700 rounded-lg">
          <div className="w-full flex flex-row justify-around items-center">
            <h2
              className={`${
                page ? active : nonactive
              } w-1/2 rounded-tl-lg text-center py-3 border-b-2 border-blue-500 relative`}
              onClick={() => setPage(true)}
            >
              Notes
            </h2>
            <h2
              className={`${
                !page ? active : nonactive
              } w-1/2 rounded-tr-lg text-center py-3 border-b-2 border-blue-500 relative`}
              onClick={() => setPage(false)}
            >
              Todo
            </h2>
          </div>
          <div>{page ? <Notes /> : <Todo />}</div>
        </div>
        <footer className="mt-8 text-sm text-gray-600">
          © 2023 Notes + Todo by Luki
        </footer>
      </div>
    </>
  );
}

export default App;
