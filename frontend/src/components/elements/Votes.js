import React from "react";

export type Props = {
  onVote: boolean => void
};

const Votes = ({ votes }: Props) => (
  <span>
    Votes: {votes}{" "}
    {votes >= 0 ? (
      <span role="img" aria-label="thumb up">
        &#128077;
      </span>
    ) : (
      <span role="img" aria-label="thumb down">
        &#128078;
      </span>
    )}
  </span>
);

export default Votes;
