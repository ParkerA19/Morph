// @flow

import * as React from "react";
import type { RecoilState } from "recoil";
import { atom } from "recoil";

export const boxIndexAtom: RecoilState<number> = atom({
  key: "boxIndexAtom",
  default: 0,
});

export const wordRowsAtom: RecoilState<?Array<React.Node>> = atom({
  key: "wordRowsAtom",
  default: null,
});
