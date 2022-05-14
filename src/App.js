// @flow

import logo from "./logo.svg";
import "./App.css";
import { words } from "./words.js";
import * as React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { wordRowsAtom } from "./atoms.js";
import WordRow from "./components/WordRow";

type Props = $ReadOnly<{
  open: boolean,
}>;

export default function App(props: Props): React.MixedElement {
  // return (
  //   <div className="App">
  //     <header className="App-header">
  //       <img src={logo} className="App-logo" alt="logo" />
  //       <p>
  //         Edit <code>src/App.js</code> and save to reload.
  //       </p>
  //       <a
  //         className="App-link"
  //         href="https://reactjs.org"
  //         target="_blank"
  //         rel="noopener noreferrer"
  //       >
  //         Learn React
  //       </a>
  //     </header>
  //   </div>
  // );
  const [wordRows, setWordRows] = useRecoilState(wordRowsAtom);

  const inputRow = <WordRow word="" />;

  const lastWordRow = <WordRow word="done" />;

  return (
    <div style={styles.layout}>
      <div style={wordRows}>{wordRows}</div>
      <div style={inputRow}>{inputRow}</div>
      <div style={styles.lastWordRow}>{lastWordRow}</div>
    </div>
  );
}

const styles = {
  layout: {
    background: "#212121",
    display: "flex",
    flexDirection: "row",
    // flexWrap: 'wrap',
    // padding: '3px',
    // height: '60px',
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  wordRows: {
    display: "flex",
  },
  inputRow: {
    display: "flex",
  },
  lastWordRow: {
    bottom: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
};
