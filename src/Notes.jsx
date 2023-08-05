import localforage from "localforage";
import { useState, useEffect } from "react";

localforage.config();
export default function Notes() {
  const [notes, setNotes] = useState([
    {
      title: "Wishlist",
      content: "<ul><li>iPhone</li><li>Lamborgini</li></ul>",
    },
  ]);
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

  // useEffect untuk menyimpan data ke localforage jika notes berubah
  /*useEffect(() => {
    const saveData = async () => {
      try {
        const stringifiedNotes = JSON.stringify(notes);
        await localforage.setItem("note", stringifiedNotes);
        console.log("berhasil menyimpan data");
      } catch (error) {
        console.error("Error saving data to localforage:", error);
      }
    };

    saveData();
  }, [notes])*/;
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
    if (!content) {
      return;
    }
    const data = [...notes, { title, content }];
    setNotes(data);
    await localforage.setItem("note", JSON.stringify(data));
    setTitle("");
    setContent("");
  };
  return (
    <div className="container p-2">
      <ul>
        {notes.map((data, index) => (
          <li key={index} className="bg-gray-900 rounded-md mb-2">
            <h1
              className={`px-4 py-2 text-lg bg-gray-800 rounded-t-md ${
                data.title ? "" : "hidden"
              }`}
            >
              {data.title}
            </h1>
            <div
              className="px-4 py-2 whitespace-pre-wrap"
              dangerouslySetInnerHTML={{
                __html: data.content
                  .replace(/\n/g, "<br/>")
                  .replace(regex, " "),
              }}
            />
          </li>
        ))}
      </ul>
      <form onSubmit={addNotes}>
        <input
          className="w-full p-2 bg-gray-800 rounded-t-md border-none focus:outline-none"
          placeholder="Title"
          value={title}
          onChange={titleChange}
        />
        <div className="flex w-full relative">
          <textarea
            className="border p-2 resize-none bg-gray-800 rounded-bl-md flex-shrink border-none focus:outline-none"
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
