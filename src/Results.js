import React from 'react';
import { getSrc } from './util/getSrc';

export const Results = (props) => {
  return (
    <ul className="list-group">
      {props.emojis.map(emoji => (
        <li key={emoji.title} className="list-group-item">
          {getSrc(emoji.symbol)}
          {emoji.title}
        </li>
      ))}
    </ul>
  );
};
