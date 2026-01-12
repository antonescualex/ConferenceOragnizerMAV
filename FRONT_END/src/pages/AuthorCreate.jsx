import { useNavigate } from "react-router-dom";
import { createAuthor } from "../api/authorsApi";
import AuthorForm from "../components/AuthorForm";

const AuthorCreate = () => {
  const navigate = useNavigate();

  const handleSubmit = async (data) => {
    await createAuthor(data);
    navigate("/authors");
  };

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Create Author</h1>
      <AuthorForm initialValues={{ name: "" }} onSubmit={handleSubmit} submitLabel="Create" />
    </div>
  );
};

export default AuthorCreate;