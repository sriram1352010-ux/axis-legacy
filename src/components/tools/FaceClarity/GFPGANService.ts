// src/components/tools/FaceClarity/GFPGANService.ts

export async function processGFPGAN(imageUrl: string): Promise<string> {
  if (!imageUrl) throw new Error("Source image URL is required for AI restoration.");

  // Development Mock Mode
  if (process.env.NEXT_PUBLIC_MOCK_MODE === "true") {
    return new Promise((resolve) => {
      setTimeout(() => resolve(imageUrl), 3000);
    });
  }

  const apiKey = process.env.NEXT_PUBLIC_HUGGING_FACE_API_KEY;
  if (!apiKey) {
    console.error("MNC-Security Alert: Hugging Face API Key is not configured.");
  }

  try {

    const response = await fetch("https://api-inference.huggingface.co/models/TencentARC/GFPGAN", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ inputs: imageUrl })
    });


    if (!response.ok) {
      const errorMsg = await response.text();
      throw new Error(`AI Engine Failure [${response.status}]: ${errorMsg || "Process aborted"}`);
    }


    const result = await response.blob();

  
    if (!result.type.startsWith('image/')) {
      throw new Error("AI Restoration produced an invalid file format.");
    }

    return URL.createObjectURL(result);

  } catch (error) {
    
    console.error("FACE_CLARITY_SERVICE_ERROR:", error);
    throw error; 
  }
}
