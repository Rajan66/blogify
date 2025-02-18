import React from "react";
import Image from "next/image";

interface ImageComponentProps {
  imgUrl: string;
  imgWidth: number;
  imgHeight: number;
}
const ImageComponent: React.FC<ImageComponentProps> = ({
  imgUrl,
  imgWidth,
  imgHeight,
}) => {
  return <Image src={imgUrl} alt="Image" height={imgHeight} width={imgWidth} />;
};

export default ImageComponent;
