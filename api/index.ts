import imageSize from "image-size";
import { eventHandler, getRequestURL } from "vinxi/http";
import fs from "node:fs/promises";

type Image = {
  image: string;
  height: number;
  width: number;
};

export default eventHandler(async (event) => {
  const url = getRequestURL(event);
  if (url.pathname.startsWith("/api/images")) {
    const files = await fs.readdir("./images");
    const images: Image[] = [];
    for (const image of files.filter((file) => file.endsWith(".jpg"))) {
      const { height, width } = imageSize(`./images/${image}`);
      images.push({ image, height: height!, width: width! });
    }
    return images
  }
});
