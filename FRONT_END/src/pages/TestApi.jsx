import { useEffect } from "react";
import { getArticles } from "../api/articlesApi";

const TestApi = () => {
  useEffect(() => {
    getArticles().then((data) => console.log(data));
  }, []);

  return <div>Testing API...</div>;
};

export default TestApi;
