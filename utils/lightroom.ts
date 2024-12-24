// utils/lightroom.ts
export async function getLightroomPhotos() {
    if (!process.env.ADOBE_API_KEY || !process.env.LIGHTROOM_ACCESS_TOKEN) {
        throw new Error("Missing Adobe API credentials or access token");
    }

    try {
        // Use the stored access token instead of getting it from cookies
        const accessToken = process.env.LIGHTROOM_ACCESS_TOKEN;

        // Fetch catalogs
        const catalogResponse = await fetch("https://lr.adobe.io/v2/catalogs", {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "X-API-Key": process.env.ADOBE_API_KEY,
            },
        });

        if (!catalogResponse.ok) {
            throw new Error(`Failed to fetch catalogs: ${await catalogResponse.text()}`);
        }

        const catalogData = await catalogResponse.json();
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

        if (!albumsResponse.ok) {
            throw new Error(`Failed to fetch albums: ${await albumsResponse.text()}`);
        }

        const albumsData = await albumsResponse.json();
        
        // You might want to filter for a specific album here
        // For example, find an album named "Website Photos"
        const websiteAlbum = albumsData.resources.find(
            (album: any) => album.payload.name === "Website Photos"
        );

        if (!websiteAlbum) {
            throw new Error("Website Photos album not found");
        }

        // Fetch photos from the specific album
        const photosResponse = await fetch(
            `https://lr.adobe.io/v2/catalogs/${catalogId}/albums/${websiteAlbum.id}/assets?embed=asset`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "X-API-Key": process.env.ADOBE_API_KEY,
                },
            }
        );

        if (!photosResponse.ok) {
            throw new Error(`Failed to fetch photos: ${await photosResponse.text()}`);
        }

        return photosResponse.json();
    } catch (error: any) {
        console.error("Error fetching Lightroom photos:", error);
        throw error;
    }
}