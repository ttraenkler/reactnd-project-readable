import React from "react";

type Props = { onClick: Function };

export default ({ onClick }: Props) => <span onClick={onClick}>&#10005;</span>;
