import localforage from "localforage";
export default function Note({ notes, setNotes, showArchive }) {
  const regex = /<input.*?>|<\/input>|<form.*?>|<\/form>/gi;

  const deleteNote = async (index) => {
    const updatedNotes = [...notes];
    updatedNotes.splice(index, 1);
    setNotes(updatedNotes);
    await localforage.setItem("note", JSON.stringify(updatedNotes));
  };
  const updateNotes = async (index, pinned, archive) => {
    const updatedNotes = [...notes];
    updatedNotes[index] = {
      ...updatedNotes[index],
      pinned: pinned,
      archive: archive,
    };
    setNotes(updatedNotes);
    await localforage.setItem("note", JSON.stringify(updatedNotes));
  };
  return (
    <>
      <div>
        {notes.map((data, index) => (
          <li
            key={index}
            className={`${
              showArchive
                ? data.archive
                  ? null
                  : "hidden"
                : data.archive
                ? "hidden"
                : null
            } ${data.pinned ? null : "hidden"} bg-gray-900 rounded-md mb-2`}
          >
            <h1
              className="flex justify-between px-4 py-2 text-lg
 bg-gray-800 rounded-t-md"
            >
              <div>
                {data.title} {data.pinned ? "📌" : ""}
              </div>
              <div className="flex flex-nowrap mr-2">
                <button
                  className="min-h-full aspect-square"
                  onClick={() => updateNotes(index, !data.pinned, data.archive)}
                >
                  📌
                </button>
                <button
                  onClick={() => updateNotes(index, data.pinned, !data.archive)}
                  className="min-h-full aspect-square"
                >
                  📥
                </button>
                <button
                  onClick={() => deleteNote(index)}
                  className="min-h-full aspect-square"
                >
                  🗑️
                </button>
              </div>
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

        {notes.map((data, index) => (
          <li
            key={index}
            className={`${
              showArchive
                ? data.archive
                  ? null
                  : "hidden"
                : data.archive
                ? "hidden"
                : null
            } ${data.pinned ? "hidden" : null} bg-gray-900 rounded-md mb-2`}
          >
            <h1
              className="flex justify-between px-4 py-2 text-lg
 bg-gray-800 rounded-t-md"
            >
              <div>
                {data.title} {data.pinned ? "📌" : ""}
              </div>
              <div className="flex flex-nowrap mr-2">
                <button
                  className="min-h-full aspect-square"
                  onClick={() => updateNotes(index, !data.pinned, data.archive)}
                >
                  📌
                </button>
                <button
                  onClick={() => updateNotes(index, data.pinned, !data.archive)}
                  className="min-h-full aspect-square"
                >
                  📥
                </button>
                <button
                  onClick={() => deleteNote(index)}
                  className="min-h-full aspect-square"
                >
                  🗑️
                </button>
              </div>
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
      </div>
    </>
  );
}
