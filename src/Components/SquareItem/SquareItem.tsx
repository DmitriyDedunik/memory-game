import React, { FC } from "react";
import "./SquareItem.css";

interface Props {
  id: number;
  image: string;
  showImage: boolean;
  match: boolean;
  onClickSquare: (id: number) => void;
}

export const SquareItem: FC<Props> = ({
  id,
  image,
  showImage,
  match,
  onClickSquare,
}) => (
  <div>
    {showImage ? (
      <div className={`square squareImage ${match ? "squareInvisible" : ''}`}>
        {match ? <div></div> : <img className="" src={image} alt={image} />}
      </div>
    ) : (
      <div className="square" onClick={() => onClickSquare(id)}>
        K/C
      </div>
    )}
  </div>
);
