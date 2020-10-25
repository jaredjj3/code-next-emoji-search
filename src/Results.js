import React from 'react';
import { getSrc } from './util/getSrc';
import { useClipboard } from './hooks/useClipboard';

export const Results = (props) => {
  useClipboard('.copy-to-clipboard');

  return (
    <ul className="list-group">
      {props.emojis.map(emoji => (
        <li key={emoji.title} className="list-group-item">
          <img src={getSrc(emoji.symbol)} width={32} height={32} />
          &nbsp;
          {emoji.title}
        </li>
      ))}
    </ul>
  );
};
