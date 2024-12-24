// app/page.tsx
import Globe from "./components/Globe";
import { Key } from "react";
import { getAccessToken } from "../utils/auth";
import { redirect } from "next/navigation";

async function getLightroomPhotos() {
  // First check for API key
  if (!process.env.ADOBE_API_KEY) {
    throw new Error("Missing Adobe API credentials");
  }

  try {
    // Get the access token
    console.log("Attempting to get access token...");
    const accessToken = await getAccessToken();
    console.log("access token retrieved successfully");

    // Fetch catalogs
    const catalogResponse = await fetch("https://lr.adobe.io/v2/catalogs", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "X-API-Key": process.env.ADOBE_API_KEY,
      },
    });

    // Better error handling for catalog response
    if (!catalogResponse.ok) {
      console.error("Catalog response status:", catalogResponse.status);
      const errorText = await catalogResponse.text();
      console.error("Catalog error:", errorText);
      throw new Error("Failed to fetch catalogs");
    }

    const catalogData = await catalogResponse.json();

    // Add error checking for catalog data
    if (!catalogData.resources || catalogData.resources.length === 0) {
      throw new Error("No catalogs found");
    }

    const catalogId = catalogData.resources[0].id;

    // Fetch albums
    const albumsResponse = await fetch(
      `https://lr.adobe.io/v2/catalogs/${catalogId}/albums`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "X-API-Key": process.env.ADOBE_API_KEY,
        },
      }
    );

    // Better error handling for albums response
    if (!albumsResponse.ok) {
      console.error("Albums response status:", albumsResponse.status);
      const errorText = await albumsResponse.text();
      console.error("Albums error:", errorText);
      throw new Error("Failed to fetch albums");
    }

    const albumsData = await albumsResponse.json();

    // Add error checking for album data
    if (!albumsData.resources || albumsData.resources.length === 0) {
      throw new Error("No albums found");
    }

    const albumId = albumsData.resources[0].id; // Fixed "resource" to "resources"

    // Fetch photos
    const photosResponse = await fetch(
      `https://lr.adobe.io/v2/catalogs/${catalogId}/albums/${albumId}/assets?embed=asset`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "X-API-Key": process.env.ADOBE_API_KEY,
        },
      }
    );

    // Better error handling for photos response
    if (!photosResponse.ok) {
      console.error("Photos response status:", photosResponse.status);
      const errorText = await photosResponse.text();
      console.error("Photos error:", errorText);
      throw new Error("Failed to fetch photos");
    }

    return photosResponse.json();
  } catch (error: any) {
    console.log("Caught error in getLightroomPhotos:", error.message);
;

    // Check for missing access token (fixed spelling)
    if (error.message === "No access token found") {
      console.log("No access token found, redirecting to login...")
      redirect("/api/auth/login"); // Removed 'app' from path
    }
    throw error;
  }
}

export default async function Home() {
  try {
    const photoData = await getLightroomPhotos();

    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-black">
        <Globe />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          {photoData.resources?.map(
            (photo: {
              id: Key | null | undefined;
              links: { [x: string]: string | undefined };
            }) => (
              <div key={photo.id} className="relative aspect-square">
                <img
                  src={photo.links["2048"]}
                  alt="Lightroom photo"
                  className="object-cover w-full h-full"
                />
              </div>
            )
          )}
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error in Home component:", error);
    // You might want to show an error state here
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Error loading photos. Please try again.</p>
      </div>
    );
  }
}
