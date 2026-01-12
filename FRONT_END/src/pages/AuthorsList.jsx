import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAuthors, deleteAuthor } from "../api/authorsApi";

const AuthorsList = () => {
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    getAuthors().then(setAuthors);
  }, []);

  const handleDelete = async (id) => {
    await deleteAuthor(id);
    setAuthors((prev) => prev.filter((a) => a.id !== id));
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Authors</h1>
        <Link
          to="/authors/new"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          New Author
        </Link>
      </div>

      {authors.length === 0 ? (
        <p>No authors yet.</p>
      ) : (
        <div className="space-y-3">
          {authors.map((a) => (
            <div
              key={a.id}
              className="p-4 bg-white rounded-lg shadow flex justify-between"
            >
              <span>{a.name}</span>
              <div className="flex gap-3">
                <Link
                  to={`/authors/${a.id}/edit`}
                  className="text-blue-600 font-medium"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(a.id)}
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

export default AuthorsList;