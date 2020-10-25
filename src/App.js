import React, { useState } from "react";
import { Header } from "./Header";
import { Input } from './Input';
import { Results } from './Results';
import * as EmojiAPI from './data/EmojiAPI';

const SEARCH_LIMIT = 20;

const DEFAULT_EMOJIS = EmojiAPI.search('', SEARCH_LIMIT);

export default function App() {
  const [emojis, setEmojis] = useState(DEFAULT_EMOJIS);

  const onInputChange = (query) => {
    const nextEmojis = EmojiAPI.search(query, SEARCH_LIMIT);
    setEmojis(nextEmojis);
  };

  return (
    <div>
      <Header />
      <Input onChange={onInputChange} />

      <br />

      <Results emojis={emojis} />
    </div>
  );
}
