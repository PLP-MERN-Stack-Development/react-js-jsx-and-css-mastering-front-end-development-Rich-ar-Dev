const API_URL = 'https://jsonplaceholder.typicode.com/posts';

export const fetchPosts = async ({ page = 1, limit = 10, query = '' }) => {
  const url = new URL(API_URL);
  url.searchParams.append('_page', page);
  url.searchParams.append('_limit', limit);
  if (query) {
    url.searchParams.append('q', query);
  }
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch posts');
  }
  const totalCount = response.headers.get('x-total-count');
  const data = await response.json();
  return { data, totalCount: parseInt(totalCount, 10) };
};