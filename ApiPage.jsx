import { Search } from 'lucide-react';
import React, { useEffect, useState, useCallback } from 'react';
import { fetchPosts } from '../api/posts';
import Button from '../components/Button';
import Card from '../components/Card';

const ApiPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const limit = 10;

  const getPosts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const { data, totalCount } = await fetchPosts({ page, limit, query: searchTerm });
      setPosts(data);
      setTotalPages(Math.ceil(totalCount / limit));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [page, searchTerm]);

  useEffect(() => {
    getPosts();
  }, [getPosts]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    setSearchTerm(searchQuery);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-center">API Data from JSONPlaceholder</h1>

      <form onSubmit={handleSearch} className="flex gap-2 max-w-md mx-auto">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search posts..."
          className="flex-grow p-2 border rounded-md bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600"
        />
        <Button type="submit" variant="primary" className="flex items-center gap-2">
          <Search size={18} /> Search
        </Button>
      </form>

      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-center text-red-500">Error: {error}</p>}

      {!loading && !error && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Card key={post.id} className="flex flex-col animate-fadeIn">
                <h2 className="text-xl font-bold mb-2 text-blue-500">{post.title}</h2>
                <p className="text-gray-600 dark:text-gray-300 flex-grow">{post.body}</p>
              </Card>
            ))}
          </div>

          <div className="flex justify-center items-center gap-4 mt-8">
            <Button
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={page === 1}
              variant="secondary"
            >
              Previous
            </Button>
            <span>
              Page {page} of {totalPages}
            </span>
            <Button
              onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
              disabled={page === totalPages}
              variant="secondary"
            >
              Next
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default ApiPage;