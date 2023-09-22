import { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";

export function FileUploader({
  onUpload,
  setMissingImage,
  championImg,
  setTooLargeImage,
}) {
  const [image, setImage] = useState(null);

  const onDrop = (acceptedFiles) => {
    const promises = acceptedFiles.map((file) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        setMissingImage(false);

        reader.onload = () => {
          resolve({
            name: file.name,
            type: file.type,
            size: Math.round(file.size / 1000),
            base64: reader.result,
            file: file,
          });
        };
        reader.readAsDataURL(file);
      });
    });

    Promise.all(promises).then((result) => {
      if (result.length > 0) {
        if (result[0].size > 100) {
          setTooLargeImage(true);
          setImage(null);
          onUpload(null);
        } else {
          console.log(result);
          setTooLargeImage(false);
          setImage(result[0].base64);
          onUpload(result[0].base64);
        }
      }
    });
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/png": [".png"],
      "image/jpeg": [".jpg", ".jpeg"],
    },
  });

  useEffect(() => {
    if (championImg) {
      setImage(championImg);
      onUpload(championImg);
    }
  }, []);

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {image ? (
        <img className="w-52" src={image} alt="Imagen cargada" />
      ) : (
        <div
          className="cursor-pointer rounded-2xl"
          style={{ backgroundColor: "#424242" }}
        >
          <AddPhotoAlternateIcon sx={{ fontSize: "208px", color: "#9E9E9E" }} />
        </div>
      )}
    </div>
  );
}
