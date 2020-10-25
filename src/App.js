import React, { useState } from "react";
import { Header } from "./Header";
import { Input } from './Input';
import { Results } from './Results';

const SEARCH_LIMIT = 20;

export default function App() {
  const [emojis, setEmojis] = useState([]);

  const onInputChange = (query) => {
    const nextEmojis = searchEmojis(query, SEARCH_LIMIT);
  };

  return (
    <div>
      <Header />
      <Input onChange={onInputChange} />
      <Results emojis={emojis} />
    </div>
  );
}
