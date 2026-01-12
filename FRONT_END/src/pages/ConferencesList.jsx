import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getConferences, deleteConference } from "../api/conferencesApi";

const ConferencesList = () => {
  const [conferences, setConferences] = useState([]);

  useEffect(() => {
    getConferences().then(setConferences);
  }, []);

  const handleDelete = async (id) => {
    await deleteConference(id);
    setConferences((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Conferences</h1>
        <Link
          to="/conferences/new"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          New Conference
        </Link>
      </div>

      {/* List */}
      {conferences.length === 0 ? (
        <p>No conferences yet.</p>
      ) : (
        <div className="space-y-3">
          {conferences.map((c) => (
            <div
              key={c.id}
              className="p-4 bg-white rounded-lg shadow flex justify-between"
            >
              <span>{c.name}</span>

              <div className="flex gap-3">
                <Link
                  to={`/conferences/${c.id}/edit`}
                  className="text-blue-600 font-medium"
                >
                  Edit
                </Link>

                <button
                  onClick={() => handleDelete(c.id)}
                  className="text-red-600 font-medium"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ConferencesList;