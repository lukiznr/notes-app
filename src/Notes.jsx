import localforage from "localforage";
import { useState, useEffect } from "react";
import Note from "./Note";
localforage.config();
export default function Notes() {
  const [notes, setNotes] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedNotes = await localforage.getItem("note");
        if (storedNotes !== null) {
          const parsedNotes = JSON.parse(storedNotes);
          setNotes(parsedNotes);
          console.log("berhasil mengambil data");
        }
      } catch (error) {
        console.error("Error fetching data from localforage:", error);
      }
    };

    fetchData();
  }, []);

  const regex = /<input.*?>|<\/input>|<form.*?>|<\/form>/gi;
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const contentChange = (e) => {
    setContent(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };
  const titleChange = (e) => {
    setTitle(e.target.value);
  };
  const addNotes = async (e) => {
    e.preventDefault();
    if (!title | !content) {
      return;
    }
    const data = [...notes, { title, content, pinned: false, archive: false }];
    setNotes(data);
    await localforage.setItem("note", JSON.stringify(data));
    setTitle("");
    setContent("");
  };
  const deleteNote = async (index) => {
    const updatedNotes = [...notes];
    updatedNotes.splice(index, 1);
    setNotes(updatedNotes);

    // Simpan perubahan ke localforage
    await localforage.setItem("note", JSON.stringify(updatedNotes));
  };
  const updateNotes = async (index, pinned, archive) => {
    const updatedNotes = [...notes];
    updatedNotes[index] = {
      ...updatedNotes[index],
      pinned: pinned,
      archive: archive,
    };
    console.log(JSON.stringify(updatedNotes));
    setNotes(updatedNotes);
    await localforage.setItem("note", JSON.stringify(updatedNotes));
  };
  return (
    <div className="container p-2">
      <ul>
        <button className="w-full pb-3 pt-1">Archived note 📥</button>
        <Note notes={notes} />
      </ul>
      <form onSubmit={addNotes}>
        <input
          className="w-full p-2 bg-gray-800 rounded-t-md border-none focus:outline-none"
          placeholder="Title"
          value={title}
          onChange={titleChange}
        />
        <div className="flex flex-nowrap w-full relative">
          <textarea
            className="border p-2 resize-none bg-gray-800 rounded-bl-md flex-1 border-none focus:outline-none"
            placeholder="Content"
            value={content}
            onChange={contentChange}
          />
          <button
            className="px-4 py-2 bg-gray-800 text-gray-800 rounded-br-md"
            disabled={true}
          >
            Add
          </button>
          <button
            type="submit"
            className="absolute right-0 bottom-0 px-4 py-2 rounded-md bg-gray-900"
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
}
