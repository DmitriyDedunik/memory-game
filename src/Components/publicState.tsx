import React from "react";

const [showImage, setShowImage] = React.useState(false);

export function stateImage(state: boolean) {
  setShowImage(state);
}
