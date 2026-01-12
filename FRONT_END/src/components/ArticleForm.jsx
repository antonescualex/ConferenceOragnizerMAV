import { useEffect, useState } from "react";
import { getAuthors } from "../api/authorsApi";
import { getConferences } from "../api/conferencesApi";

const STATUSES = ["SUBMITTED", "UNDER_REVIEW", "ACCEPTED", "REJECTED"];

const ArticleForm = ({ initialValues, onSubmit, submitLabel }) => {
  const [formData, setFormData] = useState(initialValues);
  const [authors, setAuthors] = useState([]);
  const [conferences, setConferences] = useState([]);

  useEffect(() => {
    getAuthors().then((data) => setAuthors(data || []));
    getConferences().then((data) => setConferences(data || []));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow-lg space-y-6 border border-gray-200"
    >
      {/* Title */}
      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-700">Title</label>
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter article title"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          required
        />
      </div>

      {/* Two columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Status */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            required
          >
            <option value="">Select status</option>
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        {/* Version */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">Version</label>
          <input
            name="version"
            value={formData.version}
            onChange={handleChange}
            placeholder="1.0"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            required
          />
        </div>
      </div>

      {/* Two columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Author */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">Author</label>
          <select
            name="authorId"
            value={formData.authorId}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            required
          >
            <option value="">Select author</option>
            {Array.isArray(authors) &&
              authors.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.name}
                </option>
              ))}
          </select>
        </div>

        {/* Conference */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">Conference</label>
          <select
            name="conferenceId"
            value={formData.conferenceId}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            required
          >
            <option value="">Select conference</option>
            {Array.isArray(conferences) &&
              conferences.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
          </select>
        </div>
      </div>

      {/* Submit button */}
      <button
        type="submit"
        className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition shadow-md"
      >
        {submitLabel}
      </button>
    </form>
  );
};

export default ArticleForm;