import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import Resizer from "react-image-file-resizer";
import { storage } from "../firebase/firebaseConfig";

export const handleEnterPress = (
  form: any,
  currentFieldName: string,
  nextFieldName: string | null,
) => {
  form.validateFields([currentFieldName]).then(() => {
    if (nextFieldName) {
      const nextField = form.getFieldInstance(nextFieldName);
      if (nextField) {
        nextField.focus();
      }
    } else {
      form.submit();
    }
  });
};

export const replaceName = (str: string) => {
  return str
    .normalize("NFD")
    .toLocaleLowerCase()
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .replace(/ /g, "-")
    .replace(/[:!@#$%^&*()?;/]/g, "");
};

export const removeVietnameseTones = (str: string) => {
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/đ/g, "d");
  return str;
};

const valueMap: {
  [key: string]: string;
} = {
  PENDING: "lime",
  "Đang chờ xử lý": "lime",
  PAID: "green",
  CANCELLED: "red",
  "Đã xác nhận": "cyan",
  "Đã thay đổi lịch": "orange",
  "Đã hủy": "red",
  "Đã hoàn thành": "green",
  "Tại phòng khám": "green",
  "Tại nhà": "lime",
  "Tư vấn trực tuyến": "orange",
  nam: "green",
  nữ: "orange",
  đực: "green",
  cái: "orange",
  yes: "green",
  no: "red",
};

export const getValue = (value: string) => {
  return valueMap[value];
};

export const uploadFile = async (
  file: any,
  folder: "customers" | "fishes" | "staffs" | "doctors",
) => {
  const compressedFile: any = await handleResize(file);

  const fileName = replaceName(compressedFile.name);

  const storageRef = ref(storage, `${folder}/${fileName}`);

  const res = await uploadBytes(storageRef, compressedFile);

  if (res) {
    return getDownloadURL(storageRef);
  } else {
    return "Error upload";
  }
};

const handleResize = (file: any) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      1080,
      720,
      "JPEG",
      80, // Giảm chất lượng xuống 60
      0,
      (compressedFile) => {
        if (compressedFile) {
          console.log("Compressed file size:", (compressedFile as File).size);
          resolve(compressedFile);
        }
      },
      "file",
    );
  });
