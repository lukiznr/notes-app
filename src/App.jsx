import localforage from "localforage";
import { useState, useEffect } from "react";
import Header from "./components/header";
import Editor from "./components/editor";
import FAB from "./components/fab";
function App() {
  const [isEditing, setIsEditing] = useState(false);
  const [editor, setEditor] = useState("note");
  const [item, setItem] = useState([]);
  const [index, setIndex] = useState(0);
  useEffect(() => {
    async function getData() {
      await localforage
        .getItem("item")
        .then((data) => setItem(JSON.parse(data)))
        .catch((err) => console.error(err));
    }
    getData();
  }, [isEditing]);
  useEffect(() => {
    setIndex(item.length - 1);
  }, [item]);
  return (
    <>
      <Header />
      {isEditing ? (
        <>
          <button onClick={() => setIsEditing(!isEditing)}>
            <span className="icon bg-surface-variant bg-opacity-60 rounded-xl p-2 ml-2">
              arrow_back
            </span>
          </button>
          <Editor editor={editor} index={index} />
        </>
      ) : (
        <>
          <div className="columns-2 sm:columns-3 md:columns-4 gap-4 p-4">
            {item &&
              item.map((data, index) => (
                <div
                  className="border-2 border-outline rounded-lg break-inside-avoid p-4"
                  key={index}
                  onClick={() => {
                    setIsEditing(!isEditing);
                    setIndex(index);
                  }}
                >
                  {JSON.stringify(data, null, 2)}
                </div>
              ))}
          </div>
          <FAB
            setEditor={setEditor}
            setIsEditing={setIsEditing}
            index={index}
            setIndex={setIndex}
          />
        </>
      )}
    </>
  );
}

export default App;
