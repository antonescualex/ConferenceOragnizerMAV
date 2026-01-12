import { useNavigate } from "react-router-dom";
import { createArticle } from "../api/articlesApi";
import ArticleForm from "../components/ArticleForm";

console.log("ArticleCreate loaded");


const ArticleCreate = () => {
  const navigate = useNavigate();

  const handleSubmit = async (data) => {
    await createArticle(data);
    navigate("/articles");
  };

  return (
    
    <div className="p-4 bg-white rounded shadow">
      <h1 className="text-xl font-bold mb-4">Create Article</h1>
      <ArticleForm
        initialValues={{
          title: "",
          status: "",
          version: "",
          authorId: "",
          conferenceId: "",
        }}
        onSubmit={handleSubmit}
        submitLabel="Create"
      />
    </div>
  );
};

export default ArticleCreate;