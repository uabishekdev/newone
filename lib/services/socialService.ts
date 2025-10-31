const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!API_BASE_URL) {
  throw new Error("NEXT_PUBLIC_API_BASE_URL is not set");
}

export async function postSocialShare(
  file: Blob,
  message: string
): Promise<any> {
  try {
    const formData = new FormData();
    formData.append("file", file, "social-post.png");
    formData.append("message", message);

    const response = await fetch(`${API_BASE_URL}/invictus/social-post`, {
      method: "POST",
      headers: {
        "ngrok-skip-browser-warning": "true",
      },
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("API Error:", errorText);
      throw new Error(`API failed: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error("Social Service Error:", error);
    throw error;
  }
}
