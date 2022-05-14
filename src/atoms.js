// @flow

import * as React from "react";
import type { RecoilState } from "recoil";
import { atom } from "recoil";

export const BoxIndexAtom: RecoilState<number> = atom({
  key: "BoxIndexAtom",
  default: 0,
});

export const WordRowsAtom: RecoilState<Array<React.Node>> = atom({
  key: "WordRowsAtom",
  default: [],
});

export const InputWordAtom: RecoilState<string> = atom({
  key: "InputWordAtom",
  default: "",
});
