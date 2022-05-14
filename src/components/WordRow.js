// @flow

import logo from "../logo.svg";
import "../App.css";
import { words } from "../words.js";
import * as React from "react";
import { BOX_DIMENSIONS, FONT_SIZE, LETTERS } from "../constants";

type BoxProps = $ReadOnly<{
  letter: ?string,
}>;

function Box(props: BoxProps): React.MixedElement {
  return <div style={styles.box}>{props.letter}</div>;
}

type Props = $ReadOnly<{
  word: ?string,
}>;

export default function WordRow({ word }: Props): React.MixedElement {
  const boxes = [];

  for (let i = 0; i < LETTERS; i++) {
    let letter = null;
    if (word != null && word.length > i) {
      letter = word[i];
    }
    const box = <Box letter={letter} />;
    boxes.push(box);
  }

  return <div style={styles.container}>{boxes}</div>;
}

const styles = {
  container: {
    background: "#212121",
    display: "flex",
    flexDirection: "row",
  },
  box: {
    padding: 5,
    display: "flex",
    flex: 1,
    borderStyle: "solid",
    borderColor: "grey",
    width: BOX_DIMENSIONS,
    height: BOX_DIMENSIONS,
    alignItems: "center",
    justifyContent: "center",
    fontSize: FONT_SIZE,
  },
};
