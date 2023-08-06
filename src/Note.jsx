export default function Note({ notes }) {
  return (
    <>
      {notes.map((data, index) => (
        <li key={index} className="bg-gray-900 rounded-md mb-2">
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
              <button className="min-h-full aspect-square">📥</button>
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
              __html: data.content.replace(/\n/g, "<br/>").replace(regex, " "),
            }}
          />
        </li>
      ))}
    </>
  );
}
