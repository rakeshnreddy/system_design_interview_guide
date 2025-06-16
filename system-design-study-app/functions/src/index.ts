import * as logger from "firebase-functions/logger";
import { onCall, HttpsError } from "firebase-functions/v2/https";

// This would typically be initialized if you're using the Firebase Admin SDK for other purposes,
// or if the LLM SDK needs specific initialization. For a simple callable function just
// processing inputs and calling an external LLM API via its own SDK, Admin SDK might not be strictly needed here.
// import * as admin from "firebase-admin";
// admin.initializeApp();

// TODO: Configure your LLM provider (e.g., Vertex AI Gemini)
// This might involve importing its SDK and initializing it with API keys/credentials.
// Example (conceptual, actual SDK usage will vary):
// import { GoogleGenerativeAI } from "@google/generative-ai";
// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || ""); // Ensure API key is set in environment variables

/**
 * Interface for the data expected by the getAiFeedback callable function.
 */
interface AiFeedbackRequestData {
  topicTitle: string;
  problem: string;
  userSolution: string;
}

/**
 * Interface for the data returned by the getAiFeedback callable function.
 */
interface AiFeedbackResponseData {
  feedback: string;
}

/**
 * Firebase HTTPS Callable Function to get AI feedback on a system design problem solution.
 */
export const getAiFeedback = onCall<AiFeedbackRequestData, Promise<AiFeedbackResponseData>>(
  async (request) => {
    logger.info("Received request for AI feedback:", {
      data: request.data,
      auth: request.auth ? { uid: request.auth.uid, token: "一部省略" } : "No auth"
    });

    // Check if user is authenticated. (Optional, but good practice)
    // if (!request.auth) {
    //   logger.error("Authentication Error: User is not authenticated.");
    //   throw new HttpsError("unauthenticated", "The function must be called while authenticated.");
    // }

    const { topicTitle, problem, userSolution } = request.data;

    // 1. Basic Validation
    if (!topicTitle || typeof topicTitle !== "string" || topicTitle.trim() === "") {
      logger.error("Validation Error: topicTitle is missing or invalid.", { topicTitle });
      throw new HttpsError("invalid-argument", "The function must be called with a valid 'topicTitle' (string) argument.");
    }
    if (!problem || typeof problem !== "string" || problem.trim() === "") {
      logger.error("Validation Error: problem is missing or invalid.", { problem });
      throw new HttpsError("invalid-argument", "The function must be called with a valid 'problem' (string) argument.");
    }
    if (!userSolution || typeof userSolution !== "string" || userSolution.trim() === "") {
      logger.error("Validation Error: userSolution is missing or invalid.", { userSolution });
      throw new HttpsError("invalid-argument", "The function must be called with a valid 'userSolution' (string) argument.");
    }

    // 2. Prepare Prompt for LLM (Conceptual)
    // In a real scenario, you would construct a more sophisticated prompt.
    const prompt = `
      System Design Interview Practice Feedback Request:
      Topic: ${topicTitle}
      Problem Statement: """${problem}"""
      User's Proposed Solution: """${userSolution}"""

      As an expert system design interviewer, provide constructive feedback on the user's solution.
      Consider the following aspects:
      - Clarity and completeness: Does the solution address the core requirements of the problem? Is it well-explained?
      - Technical soundness: Are the technology choices appropriate? Are there any obvious flaws, bottlenecks, or overlooked constraints?
      - Trade-offs: Does the solution acknowledge and discuss important trade-offs (e.g., cost vs. performance, consistency vs. availability)?
      - Scalability, Reliability, Availability: How well does the solution address these non-functional requirements?
      - Areas for improvement: What could be done better? What alternative approaches could be considered?
      - Strengths: What aspects of the solution are good?

      Structure your feedback clearly. Be concise and actionable.
      Limit feedback to 3-5 key points.
    `;

    // Sensitive data like the full prompt or user solution should ideally not be logged in production,
    // or logged with appropriate PII handling if necessary for debugging during development.
    logger.info("Constructed prompt for LLM. Length: ${prompt.length}");


    // 3. Call LLM API (Mocked for now)
    // Replace this section with actual LLM API call using its SDK.
    // Example (conceptual using a placeholder function for Vertex AI Gemini):
    /*
    try {
      // const {VertexAI} = require('@google-cloud/vertexai');
      // const vertex_ai = new VertexAI({project: process.env.GCLOUD_PROJECT, location: 'us-central1'});
      // const model = process.env.GEMINI_MODEL || 'gemini-1.0-pro'; // Example model
      // const generativeModel = vertex_ai.preview.getGenerativeModel({ model });
      // const resp = await generativeModel.generateContent(prompt);
      // const llmFeedback = resp.response?.candidates?.[0]?.content?.parts?.[0]?.text || "No feedback content received.";

      // logger.info("Successfully received feedback from LLM.");
      // return { feedback: llmFeedback };

    } catch (error: any) {
      logger.error("Error calling LLM API:", error);
      if (error.response && error.response.data) {
        logger.error("LLM API Error Response:", error.response.data);
      }
      throw new HttpsError("internal", "Failed to get feedback from AI model.", error.message);
    }
    */

    // Mocked Logic:
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay
    const mockFeedback = `Mock AI feedback for topic '${topicTitle}':
Problem was: "${problem.substring(0, 100)}..."
Solution was: "${userSolution.substring(0, 100)}..."
This is placeholder feedback. Real LLM integration is pending.
Key points to consider:
1. Did you clarify all ambiguities in the problem statement?
2. Have you considered non-functional requirements like scalability and availability?
3. Are your technology choices justified with clear trade-offs?`;

    logger.info("Returning mock feedback.");
    return { feedback: mockFeedback };
  }
);
