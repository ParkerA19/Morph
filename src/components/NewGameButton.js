// @flow

import * as React from "react";
// import Button from "react-bootstrap/Button";
import { Button } from "react-bootstrap";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  GameOverAtom,
  InputScoreAtom,
  InputWordAtom,
  PreviousWordsAtom,
  ScoreAtom,
  WordRowsAtom,
} from "../atoms";
import { BOX_DIMENSIONS } from "../constants";

type Props = $ReadOnly<{}>;

export default function NewGameButton(props: Props): React.MixedElement {
  const setWordRows = useSetRecoilState(WordRowsAtom);
  const [previousWords, setPreviousWords] = useRecoilState(PreviousWordsAtom);
  const setInputWord = useSetRecoilState(InputWordAtom);
  const setScore = useSetRecoilState(ScoreAtom);
  const setInputScore = useSetRecoilState(InputScoreAtom);
  const setGameOver = useSetRecoilState(GameOverAtom);

  const resetGame = () => {
    setWordRows([]);
    setPreviousWords([previousWords[0]]);
    setInputWord("");
    setScore(0);
    setInputScore(0);
    setGameOver(false);
  };
  return (
    <div style={styles.container}>
      <Button
        style={styles.button}
        variant="success"
        onClick={resetGame}
        size={"lg"}
      >
        New Game
      </Button>
    </div>
  );
}

const styles = {
  container: {
    position: "absolute",
    left: 0,
    // backgroundColor: "blue",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    width: BOX_DIMENSIONS * 5,
    height: BOX_DIMENSIONS * 5,
  },
  button: {
    backgroundColor: "blue",
    display: "flex",
    borderStyle: "solid",
    borderWidth: 0.1,
    width: BOX_DIMENSIONS,
    height: BOX_DIMENSIONS,
  },
};
