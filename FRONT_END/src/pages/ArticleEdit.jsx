import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getArticles, updateArticle } from "../api/articlesApi";
import ArticleForm from "../components/ArticleForm";

const ArticleEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState(null);

  useEffect(() => {
    getArticles().then((data) => {
      const article = data.find((a) => a.id === parseInt(id));
      if (article) setInitialValues(article);
    });
  }, [id]);

  const handleSubmit = async (data) => {
    await updateArticle(id, data);
    navigate("/articles");
  };

  if (!initialValues) return <p>Loading...</p>;

  return (
    <div className="p-4 bg-white rounded shadow">
      <h1 className="text-xl font-bold mb-4">Edit Article</h1>
      <ArticleForm
        initialValues={initialValues}
        onSubmit={handleSubmit}
        submitLabel="Update"
      />
    </div>
  );
};

export default ArticleEdit;