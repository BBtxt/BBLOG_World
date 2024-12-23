// app/page.tsx
import Globe from "./components/Globe";
import { Key } from "react";
import { getAccessToken } from "../utils/auth";
import { redirect } from "next/navigation";
async function getLightroomPhotos() {
  if (!process.env.ADOBE_API_KEY) {
    throw new Error("Missing Adobe API credentials");
  }

  try {
    const accessToken = await getAccessToken();

    const catalogResponse = await fetch("https://lr.adobe.io/v2/catalogs", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "X-API-Key": process.env.ADOBE_API_KEY,
      },
    });
    if (!catalogResponse.ok) {
      throw new Error("Failed to fetch catalogs");
    }

    const catalogData = await catalogResponse.json();
    const catalogId = catalogData.resources[0].id;

    const albumsResponse = await fetch(
      `https://lr.adobe.io/v2/catalogs/${catalogId}/albums`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "X-API-Key": process.env.ADOBE_API_KEY,
        },
      }
    );

    if (!albumsResponse) {
      throw new Error("failed to fetch albums");
    }
    const albumsData = await albumsResponse.json();
    const albumId = albumsData.resource[0].id;

    const photosResponse = await fetch(
      `https://lr.adobe.io/v2/catalogs/${catalogId}/albums/${albumId}/assets?embed=asset`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "X-API-Key": process.env.ADOBE_API_KEY,
        },
      }
    );

    if (!photosResponse) {
      throw new Error("failed to fetch albums");
    }

    return photosResponse.json();
  } catch (error) {
    if (error.message === "No acces token found") {
      redirect("/app/api/auth/login");
    }
    throw error;
  }
}

export default async function Home() {
  const photoData = await getLightroomPhotos();
  return (
    <div className="h-full w-full flex items-center justify-center">
      <Globe />
      <div>
        {photoData.resources.map(
          (photo: {
            id: Key | null | undefined;
            links: { [x: string]: string | undefined };
          }) => (
            <div key={photo.id}>
              <img src={photo.links["2048"]} className="w-full h-full" />
            </div>
          )
        )}
      </div>
    </div>
  );
}
