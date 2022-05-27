// @flow

import logo from "../logo.svg";
import "../App.css";
import { words } from "../words.js";
import * as React from "react";
import { BOX_DIMENSIONS, FONT_SIZE, LETTERS } from "../constants";
import { useRecoilValue } from "recoil";
import { GameOverAtom } from "../atoms";

type ScoreBoxProps = $ReadOnly<{
  score?: number,
  isEndRow?: boolean,
}>;

function ScoreBox({
  score,
  isEndRow,
}: ScoreBoxProps): React.MixedElement | null {
  const gameOver = useRecoilValue(GameOverAtom);
  if (score == null) {
    return null;
  }
  // let scoreStyle = null;
  // if (score === 1) {
  //   scoreStyle = { color: "green" };
  // } else if (score === 2) {
  //   scoreStyle = { color: "yellow" };
  // } else {
  //   scoreStyle = { color: "red" };
  // }

  const scoreValue = score === -1 ? "" : score;

  const scoreStyle = isEndRow
    ? {
        color: gameOver ? "green" : "white",
        marginLeft: 30,
        borderColor: "white",
      }
    : {
        color:
          score === 1
            ? "green"
            : score === 4
            ? "yellow"
            : score === 0
            ? "white"
            : "red",
        borderColor: "grey",
        marginLeft: 30,
        // borderWidth: 0.5,
      };
  return <div style={{ ...styles.score, ...scoreStyle }}>{scoreValue}</div>;
}

type BoxProps = $ReadOnly<{
  letter: ?string,
  isActiveRow: boolean,
  matchesPrevious?: boolean,
  matchesEnd?: boolean,
  isTopRow?: boolean,
  isEndRow?: boolean,
}>;

function Box({
  letter,
  isActiveRow,
  matchesPrevious,
  matchesEnd,
  isTopRow = false,
  isEndRow = false,
}: BoxProps): React.MixedElement {
  // console.log(letter, "matches:", matchesPrevious);
  const gameOver = useRecoilValue(GameOverAtom);
  const boxStyle = isActiveRow
    ? {
        backgroundColor: matchesEnd ? "green" : null,
        borderTopColor: matchesPrevious ? "green" : "red",
        borderTopWidth: 2,
        borderBottomWidth: 0,
      }
    : isTopRow
    ? {
        borderColor: "white",
        backgroundColor: matchesEnd ? "green" : null,
        borderBottomWidth: 0,
        // borderWidth: 0,
      }
    : isEndRow
    ? {
        backgroundColor: gameOver ? "green" : null,
        borderColor: "white",
      }
    : {
        borderColor: "white",
      };
  return (
    <div
      style={{
        ...styles.box,
        ...boxStyle,
        // ...{ borderBottomWidth: 1, borderBlockColor: "black" },
      }}
    >
      {letter}
    </div>
  );
}

type Props = $ReadOnly<{
  word: ?string,
  previousWord?: string,
  endWord?: string,
  score?: number,
  isActiveRow?: boolean,
  isTopRow?: boolean,
  isEndRow?: boolean,
}>;

export default function WordRow({
  word,
  previousWord,
  endWord,
  score,
  isActiveRow = true,
  isTopRow = false,
  isEndRow = false,
}: Props): React.MixedElement {
  const boxes = [];
  for (let i = 0; i <= LETTERS; i++) {
    let box = null;
    if (i === LETTERS) {
      box = <ScoreBox score={score} isEndRow={isEndRow} />;
    } else {
      let m = false;
      let letter = null;
      let matchesPrevious = false;
      if (word != null && word.length > i) {
        letter = word[i];
      }
      box = (
        <Box
          letter={letter}
          // key={i.toString() + word ?? "null" + letter ?? "null"}
          isActiveRow={isActiveRow}
          // key={i}
          matchesPrevious={previousWord ? letter == previousWord[i] : false}
          matchesEnd={endWord ? letter == endWord[i] : false}
          isTopRow={isTopRow}
          isEndRow={isEndRow}
        />
      );
    }
    boxes.push(box);
  }

  return <div style={styles.container}>{boxes}</div>;
}

const styles = {
  container: {
    // background: "#212121",
    display: "flex",
    flexDirection: "row",
  },
  box: {
    padding: 5,
    display: "flex",
    flex: 1,
    borderStyle: "solid",
    // borderWidth: 0.5,
    borderColor: "grey",
    width: BOX_DIMENSIONS,
    height: BOX_DIMENSIONS,
    alignItems: "center",
    justifyContent: "center",
    fontSize: FONT_SIZE,
  },
  score: {
    positon: "absolute",
    right: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "white",
    padding: 5,
    borderStyle: "solid",
    height: BOX_DIMENSIONS,
    width: BOX_DIMENSIONS,
    fontSize: FONT_SIZE,
  },
};
