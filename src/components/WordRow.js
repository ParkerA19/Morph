// @flow

import logo from "../logo.svg";
import "../App.css";
import { words } from "../words.js";
import * as React from "react";

type Props = $ReadOnly<{
  word: string,
}>;

const LETTERS = 5;

function Box(): React.MixedElement {
  return <div style={styles.box}>hey</div>;
}

export default function WordRow(props: Props): React.MixedElement {
  const boxes = [];
  for (let i = 0; i < LETTERS; i++) {
    const box = <Box />;
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
  },
};
