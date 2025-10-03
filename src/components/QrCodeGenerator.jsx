import React, { useState, useEffect } from "react";

export default function QrCodeGenerator() {
  const [qrUrl, setQrUrl] = useState("");

  const name = "Md Abdur Razzak";
  const phone = "+8801755202615";
  const email = "razzaque.0011@gmail.com";
  const title = "MERN Stack Web Developer";

  const vCard = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `FN:${name}`,
    `TITLE:${title}`,
    `TEL;TYPE=CELL:${phone}`,
    `EMAIL:${email}`,
    "END:VCARD",
  ].join("\n");

  useEffect(() => {
    const url = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(
      vCard
    )}`;
    setQrUrl(url);
  }, []);

  return (
    <div className="flex justify-center items-center">
      {qrUrl && <img src={qrUrl} alt="QR Code" width={150} height={150} />}
    </div>
  );
}
