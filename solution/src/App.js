import React, { useState, useEffect } from "react";
import { Header } from "./Header";
import { Input } from './Input';
import { Results } from './Results';
import * as EmojiAPI from './data/EmojiAPI';

const SEARCH_LIMIT = 20;

export default function App() {
  const [emojis, setEmojis] = useState([]);
  const [query, setQuery] = useState('');

  const onInputChange = (query) => {
    setQuery(query);
  };

  useEffect(() => {
    const nextEmojis = EmojiAPI.search(query, SEARCH_LIMIT);
    setEmojis(nextEmojis);
  }, [query])

  return (
    <div>
      <Header />
      <Input value={query} onChange={onInputChange} />

      <br />

      <Results emojis={emojis} />
    </div>
  );
}
