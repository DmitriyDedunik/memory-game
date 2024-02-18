import React, { FC } from "react";
import "./SquareItem.css";

interface Props {
  id: number;
  image: string;
  showImage: boolean;
  onClickSquare: (id: number) => void;
}

export const SquareItem: FC<Props> = ({
  id,
  image,
  showImage,
  onClickSquare,
}) => (
  <div>
    {showImage ? (
      <div className="square squareImage">
        <img className="" src={image} alt={image} />
      </div>
    ) : (
      <div className="square" onClick={() => onClickSquare(id)}>
        K/C
      </div>
    )}
  </div>
);
