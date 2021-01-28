function getAverageColor(imageElement, blockSize) {
  // blockSize = how many pixels to visit
  // if blockSize = 5, we visit every 5 blocks
  const canvas = document.createElement("canvas");

  let height = (canvas.height = imageElement.naturalHeight);
  let width = (canvas.width = imageElement.naturalWidth);

  const context = canvas.getContext("2d");
  context.drawImage(imageElement, 0, 0);

  let imgData, length;

  try {
    imgData = context.getImageData(0, 0, width, height);
    // console.log(imgData);
    // console.log(imgData.data);
    // imgData.data is an array of rgba values
    length = imgData.data.length;
  } catch (error) {
    console.error(error);
    return {
      R: 0,
      G: 0,
      B: 0,
      A: 1,
    };
  }

  let R, G, B, A;
  R = G = B = A = 0;

  let i = -4,
    count = 0;
  while ((i += blockSize * 4) < length) {
    count++;
    R += imgData.data[i];
    G += imgData.data[i + 1];
    B += imgData.data[i + 2];
    A += imgData.data[i + 3];

  }
  R = ~~(R / count);
  G = ~~(G / count);
  B = ~~(B / count);
  A = ~~(A / count);

  return { R, G, B, A };
}

window.addEventListener("load", () => {
  const image = document.querySelector("#img1");
  const { R, G, B, A } = getAverageColor(image, 4);
  document.body.style.background = `rgba(${R},${G},${B},${0.4})`;
});
