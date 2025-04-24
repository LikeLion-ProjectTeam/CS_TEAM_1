// src/lib/searchApi.ts
const BASE_URL = "http://localhost:8000/api";

export async function fetchTagSearch(tag: string) {
  try {
    const url = `${BASE_URL}/search/${tag}/`;
    console.log('Fetching tag search:', url);
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Tag search failed: ${res.status}`);
    return await res.json();
  } catch (error) {
    console.error('Tag search error:', error);
    throw error;
  }
}

export async function fetchMultiSearch(params: {
  keyword?: string;
  hashtags?: string[];
  category?: string;
  start_date?: string;
  end_date?: string;
}) {
  try {
    const query = new URLSearchParams();
    
    if (params.keyword) query.append('keyword', params.keyword);
    if (params.category) query.append('category', params.category);
    if (params.start_date) query.append('start_date', params.start_date);
    if (params.end_date) query.append('end_date', params.end_date);
    
    // Handle array of hashtags
    if (params.hashtags) {
      params.hashtags.forEach(tag => {
        query.append('hashtags', tag);
      });
    }

    const url = `${BASE_URL}/search/?${query.toString()}`;
    console.log('Fetching multi-search:', url);
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Multi-search failed: ${res.status}`);
    return await res.json();
  } catch (error) {
    console.error('Multi-search error:', error);
    throw error;
  }
}