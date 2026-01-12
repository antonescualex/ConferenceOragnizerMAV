//afiseaza lista articolelor
import { useEffect, useState } from "react";
import { getArticles, deleteArticles } from "../api/articlesApi";
import { Link } from "react-router-dom";

 const ArticlesList = () =>{
    const [articles, setArticles]= useState([]);

 const load = async () => {
    const data = await getArticles();
    console.log("ARTICOLE PRIMITE:", data);
    setArticles(data);
 }

 useEffect(()=>{
   load();
 },[]);

 const handleDelete = async (id) => {
    if(!confirm("Confirm deleting this article")) return;
    await deleteArticles(id);
    await load();

 }

 return (
    <div className="p-4 bg-white rounded shadow">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Articles</h1>
        <Link
          to="/articles/new"
          className="px-3 py-1 bg-blue-600 text-white rounded text-sm"
        >
          New Article
        </Link>
      </div>

      {articles.length === 0 && <p className="text-gray-500">No articles yet.</p>}

      <ul className="space-y-3">
        {articles.map((a) => (
          <li
            key={a.id}
            className="border rounded p-3 flex justify-between items-start"
          >
            <div>
              <h2 className="font-semibold">{a.title}</h2>
              <p className="text-sm text-gray-600">Status: {a.status}</p>
              <p className="text-sm text-gray-600">Version: {a.version}</p>
              <p className="text-sm text-gray-600">Author ID: {a.authorId}</p>
              <p className="text-sm text-gray-600">
                Conference ID: {a.conferenceId}
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <Link
                to={`/articles/${a.id}/edit`}
                className="text-blue-600 text-sm"
              >
                Edit
              </Link>
              <button
                onClick={() => handleDelete(a.id)}
                className="text-red-600 text-sm"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};


export default ArticlesList;