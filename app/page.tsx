"use client";
import { Button } from '@/components/ui/button';
import React from 'react';

export default function Home() {
  const [quote, setQuote] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const fetchQuote = async () => {
    setLoading(true);
    setError(null); // Reset error before fetching
    try {
      const response = await fetch(
        'https://api.allorigins.win/get?url=' + encodeURIComponent('https://favqs.com/api/qotd')
      );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      const parsedData = JSON.parse(data.contents); // Parse the proxy response
      setQuote(parsedData.quote.body);
      console.log("Quote fetched:", parsedData);
    } catch (e) {
      console.error("Failed to fetch quote:", e);
      setError('Failed to fetch quote. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <Button onClick={fetchQuote} disabled={loading}>
        {loading ? 'Fetching...' : 'Get quote'}
      </Button>
      <p className="text-center text-black">{quote || "Quote of the day:"}</p>
      {error && <p className="text-center text-red-500">{error}</p>}
    </div>
  );
}
