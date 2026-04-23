export async function processColorize(imageUrl: string): Promise<string> {
  // 1. Input Validation - Mechanical necessity for stability
  if (!imageUrl) {
    throw new Error("Image URL is required for processing.");
  }

  // 2. Mock Mode - Essential for development without burning API credits
  if (process.env.MOCK_MODE === "true") {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(imageUrl);
      }, 3000);
    });
  }

  // 3. Authorization Header check
  const apiKey = process.env.HUGGING_FACE_API_KEY;
  if (!apiKey) {
    console.warn("MNC Warning: Hugging Face API Key is missing.");
  }

  try {
    // 4. Real-mode API Call to DeOldify
    const response = await fetch(
      "https://api-inference.huggingface.co/models/jantic/DeOldify",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputs: imageUrl,
        }),
      }
    );

    // 5. Advanced Error Handling for Production
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HF API Error [${response.status}]: ${errorText}`);
    }

    // 6. Blob Conversion and Object URL Generation
    const result = await response.blob();
    
    // Check if the blob is actually an image
    if (result.type.indexOf("image") === -1) {
      throw new Error("API returned invalid data type.");
    }

    return URL.createObjectURL(result);

  } catch (error) {
    // 7. MNC-Grade Logging
    console.error("Colorize Service Failure Log:", error);
    throw error;
  }
}
