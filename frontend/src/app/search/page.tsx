'use client';

import { useState, useEffect } from 'react';
import { fetchTagSearch, fetchMultiSearch } from '@/lib/searchApi';

interface SearchResult {
  id: number;
  title: string;
  description: string;
  date?: string;
  tags: string[];
  category?: string;
  image?: string;
}

export default function SearchPage() {
  const [singleTagResults, setSingleTagResults] = useState<SearchResult[]>([]);
  const [multiFilterResults, setMultiFilterResults] = useState<SearchResult[]>([]);
  const [singleTag, setSingleTag] = useState('deaf');
  const [isLoadingSingle, setIsLoadingSingle] = useState(false);
  const [isLoadingMulti, setIsLoadingMulti] = useState(false);
  const [error, setError] = useState('');

  // Multi-filter search state
  const [selectedTags, setSelectedTags] = useState<string[]>(['deaf', 'welfare']);
  const [selectedCategory, setSelectedCategory] = useState('event');
  const [keyword, setKeyword] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // Handle single tag search
  const handleSingleTagSearch = async () => {
    if (!singleTag) return;
    
    setIsLoadingSingle(true);
    setError('');
    
    try {
      const results = await fetchTagSearch(singleTag);
      setSingleTagResults(Array.isArray(results) ? results : []);
    } catch (err) {
      setError('Failed to fetch single tag results');
      console.error(err);
      setSingleTagResults([]);
    } finally {
      setIsLoadingSingle(false);
    }
  };

  // Handle multi-filter search
  const handleMultiFilterSearch = async () => {
    setIsLoadingMulti(true);
    setError('');
    
    try {
      const params = {
        hashtags: selectedTags,
        category: selectedCategory,
        keyword: keyword || undefined,
        start_date: startDate || undefined,
        end_date: endDate || undefined
      };
      
      console.log('Sending params:', params);
      
      const results = await fetchMultiSearch(params);
      
      console.log('Received multi-search results:', results);
      
      // 결과가 형식에 맞지 않는 경우 처리
      if (results && typeof results === 'object') {
        if (results.results) {
          // 표준 응답 형식: { results: [...], has_next: boolean }
          setMultiFilterResults(results.results);
        } else if (Array.isArray(results)) {
          // 배열 응답
          setMultiFilterResults(results);
        } else if (Object.keys(results).length === 0) {
          // 빈 객체
          console.log('Received empty object response, setting empty results');
          setMultiFilterResults([]);
        } else {
          // 알 수 없는 객체 형식
          console.warn('Unexpected results format:', results);
          setMultiFilterResults([]);
        }
      } else if (results === null || results === undefined) {
        // null/undefined 응답
        console.log('Received null/undefined response, setting empty results');
        setMultiFilterResults([]);
      } else {
        // 기타 예상치 못한 응답 형식
        console.warn('Completely unexpected results type:', typeof results);
        setMultiFilterResults([]);
      }
    } catch (err) {
      setError('Failed to fetch multi-filter results');
      console.error('Multi-filter search error:', err);
      // 오류 발생 시 빈 배열로 설정
      setMultiFilterResults([]);
    } finally {
      setIsLoadingMulti(false);
    }
  };

  // Handle tag selection for multi-filter
  const toggleTag = (tag: string) => {
    setSelectedTags((prev: string[]) => 
      prev.includes(tag) 
        ? prev.filter((t: string) => t !== tag) 
        : [...prev, tag]
    );
  };

  // Initial search on page load
  useEffect(() => {
    handleSingleTagSearch();
    handleMultiFilterSearch();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Search</h1>
      
      {/* Single Tag Search Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Single Tag Search</h2>
        <div className="flex gap-4 mb-4">
          <input
            type="text"
            value={singleTag}
            onChange={(e) => setSingleTag(e.target.value)}
            placeholder="Enter tag (e.g. deaf)"
            className="px-4 py-2 border rounded flex-grow"
          />
          <button
            onClick={handleSingleTagSearch}
            disabled={isLoadingSingle}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-blue-300"
          >
            {isLoadingSingle ? 'Searching...' : 'Search'}
          </button>
        </div>
        
        {/* Results for Single Tag Search */}
        <div className="mt-4">
          <h3 className="text-xl font-medium mb-2">Results ({singleTagResults.length})</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {singleTagResults.map(result => (
              <div key={result.id} className="border rounded p-4">
                {result.image && (
                  <img src={result.image} alt={result.title} className="w-full h-40 object-cover mb-2" />
                )}
                <h4 className="text-lg font-semibold">{result.title}</h4>
                <p className="text-gray-600 text-sm mb-2">{result.date}</p>
                <p className="text-sm mb-2">{result.description}</p>
                <div className="flex flex-wrap gap-1">
                  {result.tags.map(tag => (
                    <span key={tag} className="bg-gray-200 text-gray-800 px-2 py-1 text-xs rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
            {singleTagResults.length === 0 && !isLoadingSingle && (
              <p className="col-span-full text-gray-500">No results found</p>
            )}
          </div>
        </div>
      </section>
      
      {/* Multi-Filter Search Section */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Multi-Filter Search</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {/* Keywords */}
          <div>
            <label className="block text-sm font-medium mb-1">Keywords</label>
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Enter keywords"
              className="w-full px-4 py-2 border rounded"
            />
          </div>
          
          {/* Category */}
          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-2 border rounded"
            >
              <option value="event">Event</option>
              <option value="support">Support</option>
              <option value="jobs">Jobs</option>
              <option value="education">Education</option>
            </select>
          </div>
          
          {/* Date Range */}
          <div>
            <label className="block text-sm font-medium mb-1">Start Date</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full px-4 py-2 border rounded"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">End Date</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full px-4 py-2 border rounded"
            />
          </div>
        </div>
        
        {/* Tags Selection */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Tags</label>
          <div className="flex flex-wrap gap-2">
            {['deaf', 'welfare', 'education', 'jobs', 'event', 'support'].map(tag => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`px-3 py-1 rounded-full text-sm ${
                  selectedTags.includes(tag) 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-800'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
        
        <button
          onClick={handleMultiFilterSearch}
          disabled={isLoadingMulti}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-blue-300"
        >
          {isLoadingMulti ? 'Searching...' : 'Apply Filters'}
        </button>
        
        {/* Results for Multi-Filter Search */}
        <div className="mt-6">
          <h3 className="text-xl font-medium mb-2">Results ({multiFilterResults.length})</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {multiFilterResults.map(result => (
              <div key={result.id} className="border rounded p-4">
                {result.image && (
                  <img src={result.image} alt={result.title} className="w-full h-40 object-cover mb-2" />
                )}
                <h4 className="text-lg font-semibold">{result.title}</h4>
                <p className="text-gray-600 text-sm mb-2">{result.date}</p>
                <p className="text-sm mb-2">{result.description}</p>
                <div className="flex flex-wrap gap-1">
                  {result.tags.map(tag => (
                    <span key={tag} className="bg-gray-200 text-gray-800 px-2 py-1 text-xs rounded">
                      {tag}
                    </span>
                  ))}
                </div>
                {result.category && (
                  <span className="inline-block mt-2 bg-blue-100 text-blue-800 px-2 py-1 text-xs rounded">
                    {result.category}
                  </span>
                )}
              </div>
            ))}
            {multiFilterResults.length === 0 && !isLoadingMulti && (
              <p className="col-span-full text-gray-500">No results found</p>
            )}
          </div>
        </div>
      </section>
      
      {/* Error Display */}
      {error && (
        <div className="mt-4 p-4 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}
    </div>
  );
} 