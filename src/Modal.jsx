const Modal = ({ isOpen, onClose, children }) => {
  return (
    <div
      className={`fixed inset-0 flex items-center justify-center ${
        isOpen ? "visible" : "invisible"
      }`}
    >
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="bg-white p-4 rounded-md shadow-md z-10">
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-800"
          >
            Close
          </button>
        </div>
        <div className="mt-4">{children}</div>
      </div>
    </div>
  );
};
