// @flow

import logo from "./logo.svg";
import "./App.css";
import { words } from "./words.js";
import * as React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { InputWordAtom, WordRowsAtom } from "./atoms.js";
import WordRow from "./components/WordRow";
import { ALPHABET, LETTERS } from "./constants";

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

  // Basically we are going to type into the inputRow,
  // and then onEnter we will add that row to the wordRows
  // and reset the inputRow
  const [wordRows, setWordRows] = useRecoilState(WordRowsAtom);
  const [inputWord, setInputWord] = useRecoilState(InputWordAtom);

  console.log("wordRows:", wordRows);
  console.log("inputWord:", inputWord);

  const inputRow = <WordRow word={inputWord} />;

  const lastWordRow = <WordRow word="hello" />;

  const onKeyDown = (event): void => {
    var key = String(event.key).toLowerCase();
    console.log("You pressed a key: " + key);
    if (key == "enter") {
      // implement some logic here to make sure that the word is LETTERS long
      if (inputWord.length === LETTERS && words.includes(inputWord)) {
        const newWordRow = <WordRow word={inputWord} />;
        const newWordRows = wordRows.concat([newWordRow]);
        setWordRows(newWordRows);
        setInputWord("");
      }
    } else if (key == "backspace") {
      if (inputWord.length !== 0) {
        const newInputWord = inputWord.slice(0, inputWord.length - 1);
        setInputWord(newInputWord);
      }
    } else if (ALPHABET.includes(key) && inputWord.length < LETTERS) {
      const newInputWord = inputWord + String(key);
      setInputWord(newInputWord);
    }
  };

  return (
    <div style={styles.layout}>
      {/* <button onClick={onKeyDown}>hey</button> */}
      <div style={styles.wordRows}>{wordRows}</div>
      <div style={styles.inputRow} onKeyDown={onKeyDown} tabIndex={1}>
        {inputRow}
      </div>
      <div style={styles.lastWordRow}>{lastWordRow}</div>
    </div>
  );
}

const styles = {
  layout: {
    background: "#212121",
    display: "flex",
    flexDirection: "column",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
  },
  wordRows: {
    backgroundColor: "red",
    padding: 0,
    overflow: "scroll",
    // position: "absolute",
    // top: 0,
    display: "flex",
    // flex: 1,
    flexDirection: "column",
    // marginTop: 20,
    marginBottom: 50,
    alignItems: "center",
    justifyContent: "center",
    height: "60vh",
  },
  inputRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  lastWordRow: {
    position: "absolute",
    bottom: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
};
