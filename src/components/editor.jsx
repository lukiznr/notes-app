import { v4 as uuid } from "uuid";
import { useState, useEffect } from "react";
import localforage from "localforage";
export default function Editor({ editor, index }) {
  const [item, setItem] = useState([]);
  useEffect(() => {
    async function getItem() {
      const data = await localforage.getItem("item");
      if (data) {
        const temp = JSON.parse(data);
        setItem([...temp, { type: editor, id: uuid() }]);
      } else {
        setItem([{ type: editor, id: uuid() }]);
      }
    }
    getItem();
    console.log(item, index, editor);
  }, []);
  useEffect(() => {
    async function save() {
      await localforage.setItem("item", JSON.stringify(item));
    }
    save();
    console.log("saved");
  }, [item]);
  if (editor === "note") {
    return (
      <>
        <input
          className="focus:outline-none p-4 bg-surface-variant bg-opacity-60 mt-3 rounded-t-xl w-full text-lg font-bold border-b-4 border-background"
          placeholder="Title"
          onChange={(e) => {
            setItem((prevItem) => {
              const data = [...prevItem];
              data[index] = { ...data[index], title: e.target.value };
              return data;
            });
          }}
        />
        <textarea
          className="focus:outline-none w-full p-4 bg-surface-variant bg-opacity-60 h-screen"
          placeholder="Content here ..."
          onChange={(e) => {
            setItem((prevItem) => {
              const data = [...prevItem];
              data[index] = { ...data[index], content: e.target.value };
              return data;
            });
          }}
        />
        {JSON.stringify(item)}
      </>
    );
  } else {
    return (
      <>
        <h1>Todo</h1>
        {JSON.stringify(item)}
      </>
    );
  }
}
