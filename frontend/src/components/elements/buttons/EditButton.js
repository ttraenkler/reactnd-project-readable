import React from "react";

type Props = { onClick: Function };

export default ({ onClick }: Props) => <span onClick={onClick}>&#9998;</span>;
