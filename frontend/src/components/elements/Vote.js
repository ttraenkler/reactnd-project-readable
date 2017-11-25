import React from "react";

export type Props = {
  onVote: boolean => void
};

const fontSize = 30;

const Vote = ({ votes, onVote, children }: Props) => (
  <span>
    {children} Votes: {votes}{" "}
    <a key="up" onClick={() => onVote(true)}>
      <span role="img" aria-label="thumb up" style={{ fontSize }}>
        &#128077;
      </span>
    </a>{" "}
    <a key="down" onClick={() => onVote(false)}>
      <span role="img" aria-label="thumb down" style={{ fontSize }}>
        &#128078;
      </span>
    </a>
  </span>
);

export default Vote;
