import React from 'react';
import { getSrc } from './util/getSrc';

export const Results = (props) => {
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
