import {
  Sym,
  TransitionMap,
  ObjectMap,
  TransitionSource,
  TransitionTarget,
  DEFAULT_BAND_SYMBOL, 
} from "./types";


export const parseTM = (turingMachine: string): TransitionMap =>
  new ObjectMap(
    turingMachine
      .split("11")
      .map((fn) => fn.split("1").map((zeros): number => zeros.length-1))
      .map(([currentQ, inputSymbol, nextQ, writeSymbol, direction]): [
        TransitionSource,
        TransitionTarget
      ] =>
        [
          {
            currentQ,
            inputSymbol
          },
          { nextQ, writeSymbol, direction: direction === 0 ? "L" : "R" }
        ]
      )
  );

// DECODE
export const decodeTM = (transitions: TransitionMap): string => {
  return [...transitions.entries()].map(([source, target]) =>
      `Q${source.currentQ}, ${source.inputSymbol}, Q${target.nextQ}, ${target.writeSymbol}, ${target.direction}`
    ).join("\n");
}

export const decodeInput = (input: string): Sym[] => {
  if(!input.includes("1"))
    return [];
  return input.split("1").map((zeros): number => zeros.length - 1);
};

// ENCODING

const getInt = (str) => {
  const match =  /.*([0-9]+).*/.exec(str);
  if(match) return parseInt(match[1]);
  return null;
}

export const encodeTM = (str: string): string => {
  const fns = [];
  const ret = str
    .trim()
    .split("\n")
    .map((str) => str.trim())
    .map((str) => str.split(",").map((v) => v.trim()))
    .map(([currentQ, inputSymbol, nextQ, writeSymbol, direction]) => {
      fns.push({ currentQ, inputSymbol, nextQ, writeSymbol, direction });
      return [
        getInt(currentQ),
        getInt(inputSymbol)?? DEFAULT_BAND_SYMBOL,
        getInt(nextQ) ,
        getInt(writeSymbol) ,
        direction === "L" ? 0 : 1
      ]
        .map((nr) => "0".repeat(nr + 1))
        .join("1");
    })
    .join("11");

  return ret;
};

export const encodeInput = (str: string): string => {
  return str.split("").map(symbol => parseInt(symbol)+1)
  .map((nr) => "0".repeat(nr))
  .join("1");
  })
}