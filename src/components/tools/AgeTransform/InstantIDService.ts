export async function processAgeTransform(imageUrl: string, targetAge: number): Promise<string> {
  // In mock mode, simulate processing delay
  if (process.env.MOCK_MODE === "true") {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(imageUrl);
      }, 3000);
    });
  }

  // In real mode, call Hugging Face API
  const response = await fetch("https://api-inference.huggingface.co/models/InstantID/InstantID", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.HUGGING_FACE_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      inputs: imageUrl,
      parameters: {
        target_age: targetAge
      }
    })
  });

  if (!response.ok) {
    throw new Error(`Hugging Face API error: ${response.status}`);
  }

  const result = await response.blob();
  return URL.createObjectURL(result);
}
