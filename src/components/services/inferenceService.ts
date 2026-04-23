"use client";

/**
 * AXIS LEGACY - INFERENCE ENGINE v2.0.4
 * Core service for handling neural network requests and image processing.
 */

export class InferenceService {
  /**
   * Universal processor for Axis Hub tools
   * Handles the heavy lifting for Colorize, Face Clarity, etc.
   */
  static async processImage(
    image: string, // Changed to string (base64/URL) for consistency with state
    tool: string,
    parameters: Record<string, any>
  ): Promise<string> {
    console.log(`[AXIS ENGINE] Initializing ${tool} protocol...`, parameters);

    // If using MOCK_MODE for local testing in Palani
    if (process.env.NEXT_PUBLIC_MOCK_MODE === "true") {
      return new Promise((resolve) => {
        setTimeout(() => resolve(image), 2000);
      });
    }

    try {
      // Professional implementation would use your API Route to hide the Hugging Face Key
      const response = await fetch("/api/inference", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image, tool, parameters }),
      });

      if (!response.ok) throw new Error("Neural Engine Handshake Failed");

      const result = await response.json();
      return result.outputUrl;
    } catch (error) {
      console.error("[AXIS ERROR] Engine Failure:", error);
      throw error;
    }
  }

  static async getUsageStats(): Promise<{ totalCalls: number; todayCalls: number; lastUpdated: string }> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          totalCalls: 1250,
          todayCalls: 42,
          lastUpdated: new Date().toISOString()
        });
      }, 500);
    });
  }
}

/** * STANDALONE EXPORTS
 * Required for direct component imports in AgeTransformTool and AncestryMixTool
 */

export async function processAgeTransform(image: string, targetAge: number): Promise<string> {
  // Logic specifically for Temporal AI Transformation
  return await InferenceService.processImage(image, "age-transform", { targetAge });
}

export async function processAncestryMix(
  fatherImage: string, 
  motherImage: string
): Promise<string> {
  console.log("[AXIS FUSION] Commencing Genetic Blend...");
  
  // Real Hugging Face Logic as requested
  try {
    const response = await fetch("https://api-inference.huggingface.co/models/InstantID/InstantID-FaceFusion", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.NEXT_PUBLIC_HUGGING_FACE_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        inputs: { father: fatherImage, mother: motherImage }
      })
    });

    if (!response.ok) throw new Error(`Fusion API error: ${response.status}`);

    const resultBlob = await response.blob();
    return URL.createObjectURL(resultBlob);
  } catch (err) {
    console.error("[AXIS FUSION ERROR]", err);
    throw err;
  }
}