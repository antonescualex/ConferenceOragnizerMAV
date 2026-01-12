import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getAuthors, updateAuthor } from "../api/authorsApi";
import AuthorForm from "../components/AuthorForm";

const AuthorEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState(null);

  useEffect(() => {
    getAuthors().then((data) => {
      const author = data.find((a) => a.id === parseInt(id));
      setInitialValues(author);
    });
  }, [id]);

  if (!initialValues) return <p>Loading...</p>;

  const handleSubmit = async (data) => {
    await updateAuthor(id, data);
    navigate("/authors");
  };

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Edit Author</h1>
      <AuthorForm initialValues={initialValues} onSubmit={handleSubmit} submitLabel="Update" />
    </div>
  );
};

export default AuthorEdit;