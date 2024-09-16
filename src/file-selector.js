import React, { useCallback, useState } from "react";

const shippingThreshold = 2;

const API_URL = "https://www.wayfair.com/keyword.php?keyword=red+chair";
const HEADERS = {
  Accept:
    "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
  "Accept-Language": "en-GB,en-US;q=0.9,en;q=0.8",
  Connection: "keep-alive",
  Cookie:
    "CSNUtId=0af4180c-6414-5bb4-04fe-bcf2390fc902; CSN=g_countryCode%3DUS%26g_zip%3D02116%26CSNLV%3D; _RCRTX03=b55c1b7708d611ee94060f2ea482b7b7bd4f2f551d624c889e2a36c89ff144e5; _RCRTX03-samesite=b55c1b7708d611ee94060f2ea482b7b7bd4f2f551d624c889e2a36c89ff144e5; criticals_tool_area=2; _hjSessionUser_1670786=eyJpZCI6IjUxZTJkMDQ1LWQzMjAtNWEwOS04ZmM5LTVmYjJjMzE5ODdmOCIsImNyZWF0ZWQiOjE2ODA3NjUyMzQzMjEsImV4aXN0aW5nIjp0cnVlfQ==; _ga_DJQW2QQKC1=GS1.2.1699510942.52.1.1699511232.60.0.0; tangerineWarehouseId=27; _sp_id.f4d8=a6399766-cd78-425e-8a48-856beb672d95.1686542873.5.1703760574.1700283198.8a2abc00-a7ea-4562-bb28-805f329098a8; _ga_TS5S6EZ0L3=GS1.1.1703760454.5.1.1703760711.60.0.0; _ga_72N7M0FYZV=GS1.2.1705595019.1.1.1705595057.0.0.0; _ga_BK5DLHZX86=GS1.1.1710930160.20.0.1710930160.60.0.0; _ga_7PS5X0JMNQ=GS1.1.1713941680.5.1.1713941824.0.0.0; WFSID=190a8cdc30cb546d0aab88a8498687bc; ExCSNUtId=0af4180c-6414-5bb4-04fe-bcf2390fc902; CSNADMINID=6E20D981-A55C-4D3F-9EB1-9B5820848F1A; extranet_WFSID=2ceac07f68c65ff5d3c8af3af7bba70b; partner_home_language=eng_US; _ga_3TXHCN45NL=GS1.1.1715861361.9.1.1715863046.0.0.0; i18nPrefs=lang%3Den-US; SFSID=5372a6766f6fa92f2053329931ee0862; postalCode=02116; _wf_fs_sample_user=true; _ga_BZG5L1NJK2=GS1.2.1718271457.8.1.1718271463.0.0.0; _ga_HC0V4JRLT8=GS1.1.1718271456.10.1.1718271472.0.0.0; supplierID=150557; _ga_W5CBQ28KZV=GS1.1.1724138822.29.0.1724138860.22.0.0; _ga_TLNRVZPPMM=GS1.2.1724138832.28.1.1724138863.0.0.0; fs_uid=#WEEMY#524088dd-0a81-4ec0-97b2-07ecb2675da2:853b7917-0ad4-474e-ae19-dff91d7db384:1724138864424::1#d5324d0d#/1755598341; bearer_token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbXBsb3llZV9pZCI6MTEwMzc1NSwiYXVkIjoiaHR0cHM6XC9cL2FwaS53YXlmYWlyLmNvbVwvIiwic3ViIjoiVGJoM01Ra0V3U0cxQTFhclFzcUZEQzkyVWRMNlJyS05AY2xpZW50cyIsImlzcyI6Imh0dHBzOlwvXC9hZG1pbi53YXlmYWlyLmNvbVwvIiwiZXhwIjoxNzI0ODQ2NzkyfQ.XWkjKxPO75dYz11ZEdZ28wqWJ7FabsimacRPugx-R4o",
  Referer:
    "https://www.wayfair.com/keyword.php?keyword=vase+ceramic+cylinder+minimalistic+matt-finish",
  "Sec-Fetch-Dest": "document",
  "Sec-Fetch-Mode": "navigate",
  "Sec-Fetch-Site": "same-origin",
  "Sec-Fetch-User": "?1",
  "Upgrade-Insecure-Requests": "1",
  "User-Agent":
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36",
  "sec-ch-ua":
    '"Chromium";v="128", "Not;A=Brand";v="24", "Google Chrome";v="128"',
  "sec-ch-ua-mobile": "?0",
  "sec-ch-ua-platform": '"macOS"',
};

function ImageUpload() {
  const [image, setImage] = useState(null);
  const [status, setStatus] = useState();
  const [html, setHtml] = useState(true);

  const handleImageChange = useCallback((e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  }, []);

  const handleImageUpload = useCallback(async () => {
    if (!image) {
      alert("Please select an image first!");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        body: formData,
        headers: HEADERS,
      });

      if (response.ok) {
        setStatus(200);
        setHtml(response.text);
        alert("Image uploaded successfully!");
      } else {
        setStatus(response.status);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      setStatus(400);
    }
  }, [image]);

  return (
    <div>
      <h2>Upload an Image</h2>
      <input type="file" name="myImage" onChange={handleImageChange} />
      {html && (
        <div
          dangerouslySetInnerHTML={{
            __html: html,
          }}
        />
      )}
      {image && (
        <div style={{ alignItems: "center", justifyContent: "center" }}>
          <h3>Uploaded Image:</h3>
          <img
            src={image}
            alt="Uploaded Preview"
            style={{ width: "200px", marginTop: "10px" }}
          />
          <button onClick={handleImageUpload}>Upload</button>
        </div>
      )}
    </div>
  );
}

export default ImageUpload;
