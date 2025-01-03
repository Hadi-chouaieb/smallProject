const getCroppedImg = async (imageSrc, pixelCrop) => {
  const image = new Image();
  image.src = imageSrc;

  return new Promise((resolve, reject) => {
    image.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      // Set canvas dimensions
      canvas.width = pixelCrop.width;
      canvas.height = pixelCrop.height;

      // Draw the cropped image
      ctx.drawImage(
        image,
        pixelCrop.x,
        pixelCrop.y,
        pixelCrop.width,
        pixelCrop.height,
        0,
        0,
        pixelCrop.width,
        pixelCrop.height
      );

      // Convert the canvas to a Blob
      canvas.toBlob((blob) => {
        if (blob) {
          resolve(blob); // Return the Blob
        } else {
          reject(new Error("Canvas is empty"));
        }
      }, 'image/jpeg'); // Adjust the format if necessary
    };

    image.onerror = (error) => {
      reject(new Error("Image loading failed: " + error));
    };
  });
};

export  default getCroppedImg;