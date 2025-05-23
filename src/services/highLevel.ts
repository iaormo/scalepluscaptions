
import { HighLevelContact } from "../types";

const HIGH_LEVEL_API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2NhdGlvbl9pZCI6Ik9KVzJvQUlOS253WWZpYjhjZ3E2IiwiY29tcGFueV9pZCI6IlI4cVFpaTZkdGV0RzJ5ZWNWS0I2IiwidmVyc2lvbiI6MSwiaWF0IjoxNzA1NjI1MDAxNDkzLCJzdWIiOiIwbms0QWRFSmZTcVB5WTQ1MlhuZiJ9.Q1UlGWeqhhEmgyYkpCjzYSN2s0CEhTfO40jVEclbif4";
const HIGH_LEVEL_API_URL = "https://rest.gohighlevel.com/v1/contacts/";

export const syncContactToHighLevel = async (contact: HighLevelContact): Promise<boolean> => {
  try {
    const response = await fetch(HIGH_LEVEL_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${HIGH_LEVEL_API_KEY}`,
      },
      body: JSON.stringify({
        ...contact,
        source: "Scale+ Captions App"
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Failed to sync contact to High Level:", errorData);
      return false;
    }

    const data = await response.json();
    console.log("Contact successfully synced to High Level:", data);
    return true;
  } catch (error) {
    console.error("Error syncing contact to High Level:", error);
    return false;
  }
};
