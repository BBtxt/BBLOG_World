// pages/api/lightroom/albums.ts
import { NextApiRequest, NextApiResponse } from "next";

async function getAccessToken() {
  const response = await fetch("https://ims-na1.adobelogin.com/ims/token/v3", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      client_id: process.env.ADOBE_CLIENT_ID!,
      client_secret: process.env.ADOBE_CLIENT_SECRET!,
      grant_type: "client_credentials",
      scope: "lr_partner_apis",
    }),
  });

  const data = await response.json();
  return data.access_token;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { albumName } = req.query;

  try {
    const token = await getAccessToken();

    const catalogResponse = await fetch("https://lr.adobe.io/v2/catalogs", {
      headers: {
        Authorization: `Bearer ${token}`,
        "x-api-key": process.env.ADOBE_CLIENT_ID!,
      },
    });

    const catalogs = await catalogResponse.json();

    if (!catalogs.resources || catalogs.resources.length === 0) {
      console.log("Catalogs response:", catalogs);
      return res.status(404).json({ error: "No catalogs found" });
    }

    const catalogId = catalogs.resources[0].id;

    console.log("Found catalog ID:", catalogId);

    const albumsResponse = await fetch(
      `https://lr.adobe.io/v2/catalogs/${catalogId}/albums`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "x-api-key": process.env.ADOBE_CLIENT_ID!,
        },
      },
    );

    const albums = await albumsResponse.json();
    console.log("Albums response:", albums);

    res.status(200).json(albums);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Failed to fetch albums" });
  }
}
