import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import Button from '../components/Button';

const ApiPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;

  // Fetch posts from JSONPlaceholder API
  const fetchPosts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      if (!response.ok) throw new Error('Failed to fetch posts');
      const data = await response.json();
      setPosts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // Filter posts based on search term
  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.body.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
          API Integration Demo
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Fetching data from JSONPlaceholder API
        </p>
      </div>

      {/* Search and Controls */}
      <Card>
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="flex-1 w-full">
            <input
              type="text"
              placeholder="Search posts..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>
          <Button onClick={fetchPosts} variant="primary" disabled={loading}>
            {loading ? 'Refreshing...' : 'Refresh Data'}
          </Button>
        </div>
      </Card>

      {/* Loading State */}
      {loading && (
        <Card>
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Loading posts...</p>
          </div>
        </Card>
      )}

      {/* Error State */}
      {error && (
        <Card className="border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20">
          <div className="text-center py-4">
            <p className="text-red-600 dark:text-red-400">Error: {error}</p>
            <Button onClick={fetchPosts} variant="primary" className="mt-2">
              Try Again
            </Button>
          </div>
        </Card>
      )}

      {/* Results Count */}
      {!loading && !error && (
        <Card>
          <p className="text-gray-600 dark:text-gray-400">
            Showing {currentPosts.length} of {filteredPosts.length} posts
            {searchTerm && ` matching "${searchTerm}"`}
          </p>
        </Card>
      )}

      {/* Posts Grid */}
      {!loading && !error && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1">
          {currentPosts.length === 0 ? (
            <Card>
              <p className="text-center text-gray-500 dark:text-gray-400 py-4">
                No posts found matching your search.
              </p>
            </Card>
          ) : (
            currentPosts.map(post => (
              <Card key={post.id} className="hover:shadow-xl transition-shadow duration-200">
                <h3 className="font-semibold text-lg text-gray-800 dark:text-white mb-2">
                  {post.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                  {post.body}
                </p>
                <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
                  <span>Post ID: {post.id}</span>
                  <span>User ID: {post.userId}</span>
                </div>
              </Card>
            ))
          )}
        </div>
      )}

      {/* Pagination */}
      {!loading && !error && filteredPosts.length > 0 && (
        <Card>
          <div className="flex items-center justify-between">
            <Button
              onClick={prevPage}
              disabled={currentPage === 1}
              variant="secondary"
            >
              Previous
            </Button>
            
            <span className="text-gray-600 dark:text-gray-400">
              Page {currentPage} of {totalPages}
            </span>
            
            <Button
              onClick={nextPage}
              disabled={currentPage === totalPages}
              variant="secondary"
            >
              Next
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
};

export default ApiPage;
