import { LLM } from "@/types"

const GOOGLE_PLATORM_LINK = "https://ai.google.dev/"

// Google Models (UPDATED 12/22/23) -----------------------------

// Gemini Flash (UPDATED 05/28/24)
const GEMINI_FLASH: LLM = {
  modelId: "gemini-1.5-flash-latest",
  modelName: "Gemini 1.5 Flash",
  provider: "google",
  hostedId: "gemini-1.5-flash-latest",
  platformLink: GOOGLE_PLATORM_LINK,
  imageInput: true,
  pricing: {
    currency: "USD",
    unit: "1M tokens",
    inputCost: 0.35,
    outputCost: 0.53
  }
}

// // Gemini Pro (UPDATED 12/22/23)
// const GEMINI_PRO: LLM = {
//   modelId: "gemini-pro",
//   modelName: "Gemini Pro",
//   provider: "google",
//   hostedId: "gemini-pro",
//   platformLink: GOOGLE_PLATORM_LINK,
//   imageInput: false
// }

// Gemini Pro Vision (UPDATED 12/22/23)
const GEMINI_PRO_VISION: LLM = {
  modelId: "gemini-1.5-pro-latest",
  modelName: "Gemini 1.5 Pro latest",
  provider: "google",
  hostedId: "gemini-1.5-pro-latest",
  platformLink: GOOGLE_PLATORM_LINK,
  imageInput: true,
  pricing: {
    currency: "USD",
    unit: "1M tokens",
    inputCost: 3.5,
    outputCost:10.5 
  }
}

export const GOOGLE_LLM_LIST: LLM[] = [GEMINI_PRO_VISION, GEMINI_FLASH]
