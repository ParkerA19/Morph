// @flow

import logo from "./logo.svg";
import "./App.css";
import { words, WordGraph1Step, WordGraph2Step } from "./words.js";
import * as React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  InputWordAtom,
  PreviousWordsAtom,
  ScoreAtom,
  WordRowsAtom,
} from "./atoms.js";
import WordRow from "./components/WordRow";
import { ALPHABET, BOX_DIMENSIONS, FONT_SIZE, LETTERS } from "./constants";
import { GameOverAtom } from "./atoms";

type Props = $ReadOnly<{}>;

const calculateDifferences = (
  previousWord: string,
  inputWord: string
): number => {
  // Check which word graph the association is in,
  // if (WordGraph1Step[previousWord]?.includes(inputWord)) {
  //   return 1;
  // } else if (WordGraph2Step[previousWord]?.includes(inputWord)) {
  //   return 2;
  // } else return 10;
  let count = 0;
  for (let i = 0; i < LETTERS; i++) {
    console.log("pi: ", previousWord[i]);
    console.log("ii:", inputWord[i]);
    if (previousWord[i] != inputWord[i]) {
      count++;
    }
  }
  return count;
};

export function MobileApp(props: Props): React.MixedElement {
  // Basically we are going to type into the inputRow,
  // and then onEnter we will add that row to the wordRows
  // and reset the inputRow
  const [wordRows, setWordRows] = useRecoilState(WordRowsAtom);
  const [previousWords, setPreviousWords] = useRecoilState(PreviousWordsAtom);
  const [inputWord, setInputWord] = useRecoilState(InputWordAtom);
  const [score, setScore] = useRecoilState(ScoreAtom);
  const [gameOver, setGameOver] = useRecoilState(GameOverAtom);

  const isMobile = window.innerWidth < 700;
  console.log("isMobile:", isMobile);
  // React.useEffect(() => setScore(window.innerWidth));

  const wordRowsRef = React.useRef(null);
  const AlwaysScrollToBottom = () => {
    const elementRef = React.useRef(null);
    React.useEffect(() => elementRef.current?.scrollIntoView());
    return <div ref={elementRef} />;
  };

  console.log("wordRows:", wordRows);
  console.log("inputWord:", inputWord);

  const startWord = "morph";
  const endWord = "hello";

  const topWordRow = <WordRow word={startWord} key="top" />;
  const inputRow = <WordRow word={inputWord} key="input" />;
  const lastWordRow = <WordRow word={endWord} key="end" />;

  const onKeyDown = (event): void => {
    if (gameOver) {
      return;
    }
    var key = String(event.key).toLowerCase();
    console.log("You pressed a key: " + key);
    if (key == "enter") {
      // implement some logic here to make sure that the word is LETTERS long
      if (
        inputWord.length === LETTERS &&
        // words.includes(inputWord) &&
        !previousWords.includes(inputWord)
      ) {
        const differences = calculateDifferences(
          previousWords[previousWords.length - 1],
          inputWord
        );
        console.log("diffs:", differences);
        if (differences > 3) {
          return;
        }
        setScore(score + differences * differences);

        if (inputWord == endWord) {
          setGameOver(true);
          return;
        }

        const newPreviousWords = previousWords.concat(inputWord);
        setPreviousWords(newPreviousWords);

        const newWordRow = <WordRow word={inputWord} />;
        const newWordRows = wordRows.concat([newWordRow]);
        setWordRows(newWordRows);
        setInputWord("");
        wordRowsRef.current?.scrollIntoView({ behavior: "smooth" });
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

  const gameOverStyle = gameOver ? styles.gameOverRow : null;
  const mobileStyle = isMobile ? { backgroundColor: "pink" } : null;

  return (
    <div style={styles.layout} onKeyDown={onKeyDown} tabIndex={0}>
      <div style={{ ...styles.score, ...mobileStyle }}>Score: {score}</div>
      <div style={styles.topWordRow}>{topWordRow}</div>
      <div style={styles.wordRows} ref={wordRowsRef}>
        {wordRows}
        <AlwaysScrollToBottom />
      </div>
      {!gameOver ? (
        <div style={{ ...styles.inputRow, ...gameOverStyle }} tabIndex={-1}>
          {inputRow}
        </div>
      ) : null}
      <div style={{ ...styles.lastWordRow, ...gameOverStyle }}>
        {lastWordRow}
      </div>
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
    // justifyContent: "center",
    height: "100vh",
    outline: "none",
  },
  topWordRow: {
    // position: "absolute",
    top: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  wordRows: {
    position: "relative",
    top: "0",
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
    // justifyContent: "center",
    height: "30%",
  },
  inputRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "green",
  },
  lastWordRow: {
    position: "absolute",
    bottom: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  score: {
    position: "absolute",
    right: 0,
    top: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    padding: 10,
    height: BOX_DIMENSIONS,
    width: BOX_DIMENSIONS * 4.5,
    fontSize: FONT_SIZE,
  },
  gameOverRow: {
    backgroundColor: "green",
  },
};
