'use client';
import Image, { ImageProps } from 'next/image';
import { useState } from 'react';

export const FallbackProductImage = (props: ImageProps) => {
  const [src, setSrc] = useState(props.src);

  return (
    <Image
      {...props}
      src={src}
      onError={() => setSrc('/product/default-product.png')}
    />
  );
};
