import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

// Articles
import ArticlesList from "./pages/ArticlesList";
import ArticleCreate from "./pages/ArticleCreate";
import ArticleEdit from "./pages/ArticleEdit";
import TestApi from "./pages/TestApi";

// Authors
import AuthorsList from "./pages/AuthorsList";
import AuthorCreate from "./pages/AuthorCreate";
import AuthorEdit from "./pages/AuthorEdit";

// Conferences
import ConferencesList from "./pages/ConferencesList";
import ConferenceCreate from "./pages/ConferenceCreate";
import ConferenceEdit from "./pages/ConferenceEdit";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        {/* Navbar */}
        <nav className="bg-white shadow mb-6">
          <div className="max-w-5xl mx-auto px-4 py-3 flex gap-6 text-blue-600 font-medium">
            <Link to="/articles">Articles</Link>
            <Link to="/authors">Authors</Link>
            <Link to="/conferences">Conferences</Link>
            <Link to="/test">Test API</Link>
          </div>
        </nav>

        {/* Main content */}
        <main className="max-w-5xl mx-auto px-4 space-y-8">
          <Routes>
            {/* Articles */}
            <Route path="/articles" element={<ArticlesList />} />
            <Route path="/articles/new" element={<ArticleCreate />} />
            <Route path="/articles/:id/edit" element={<ArticleEdit />} />

            {/* Authors */}
            <Route path="/authors" element={<AuthorsList />} />
            <Route path="/authors/new" element={<AuthorCreate />} />
            <Route path="/authors/:id/edit" element={<AuthorEdit />} />

            {/* Conferences */}
            <Route path="/conferences" element={<ConferencesList />} />
            <Route path="/conferences/new" element={<ConferenceCreate />} />
            <Route path="/conferences/:id/edit" element={<ConferenceEdit />} />

            {/* Test */}
            <Route path="/test" element={<TestApi />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;