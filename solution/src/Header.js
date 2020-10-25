import React from "react";
import { getSrc } from "./util/getSrc";

const SMILE_CAT_SRC = getSrc("😸");
const POUTING_CAT_SRC = getSrc("😾");

export const Header = () => {
  return (
    <header className="text-center">
      <h1>
        <img src={SMILE_CAT_SRC} width="32" height="32" />
        Emoji Search
        <img src={POUTING_CAT_SRC} width="32" height="32" />
      </h1>
    </header>
  );
};
