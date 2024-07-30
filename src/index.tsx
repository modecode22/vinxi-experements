/// <reference types="vinxi/types/client" />
import ReactDOM from "react-dom/client";
import { useEffect, useState, useMemo } from "react";

import "./styles/index.css";

type Photo = {
  image: string;
  height: number;
  width: number;
};

function pack(images: Photo[], columns: number): Photo[][] {
  const packed: Photo[][] = Array.from({ length: columns }, () => []);
  const heights = Array.from({ length: columns }, () => 0);
  for (const image of images) {
    const column = heights.indexOf(Math.min(...heights));
    packed[column].push(image);
    heights[column] += image.height;
  }
  return packed;
}

function ImageDisplay() {
  const [images, setImages] = useState<Photo[]>([]);

  useEffect(() => {
    fetch("/api/images")
      .then((res) => res.json())
      .then((data) => setImages(data));
  }, []);

  const columns = useMemo(() => pack(images, 3), [images]);
  console.log(images);

  return (
    <div className="flex flex-wrap mt-2 px-1">
      {columns.map((column, i) => (
        <div key={i} className="w-1/3 flex flex-col px-1 gap-2">
          {column.map((p) => {
            console.log(`/images/${p.image}`);
            console.log(p, "");

            return (
              <img
                src={`/images/${p.image}`}
                alt={p.image}
                key={p.image}
                style={{
                  aspectRatio: `${p.width}/${p.height}`,
                }}
                className="w-full rounded-2xl"
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <ImageDisplay />
);
