import { GoogleGenAI, Type } from "@google/genai";
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const ai = new GoogleGenAI({ apiKey: apiKey });

export const generateRecipeSuggestions = async (input, ingredients, diet) => {  
  const numRecipes = 3;

  try {
    // ingredients prop is in form [{...}, {...}, {...}]
    // console.log(`Ingredients: ${ingredients.join(", ")}`);
    const prompt = `
    I have access these ingredients currently resting in my refrigerator and pantry: ${ingredients.join(", ")}.
    Based on these ingredients, and assume I have basic cooking essentials such as water and cooking oil,
    suggest ${numRecipes} highly-rated ${input} recipes that can be made with these ingredients. Show the amount that each ingredient 
    is needed in the amount value where for the amount of ingredient[0] is amount[0]. Also keep in mind that the recipe has 
    to match my diet of ${diet} with each entry being out of 5. Based on my diet, ingredients and your knowledge, recommend
    only one of the ${numRecipes} recipes by making the recommended key true, otherwise false. Each cooking action/step should be in it's own array item.
    ONLY return valid JSON with this output format (array of recipe objects). Do not add explanations, notes, or text outside of JSON. The nutrition object should abbreviate the values, 
    such as turning milligrams into "mg". Do not display the JSON markdown code \`\`\`json, and the entire response must be parseable with JSON.parse().:
    [
      {
        "name": "Recipe name",
        "img": "",
        "description": "Max 12 word brief description of recipe",
        "nutrition": {"Calories": "1250 cal", "Protein": "150g", "Carbs": "", "Fat": "", "Fiber": "", "Sugar": "2g", "Sodium": "500mg"},
        "ingredients": ["Steak", "Ketchup"],
        "amount": ["200g", "50mL"],
        "steps": ["Step 1", "Step 2"],
        "spice_level": 2,
        "reference": "https://gordonramsay.com",
        "missing": ["Mascarpone cheese", "Matcha"] || [],
        "recommended": true
      }
    ]
    Recommend popular recipes from it's own country of origin to make it more authentic and that are highly rated in the world for those recipes if possible. 
    Based on these recipes, make the nutrition as accurate as possible. For example, just find how much protein is in 100g of a certain meat, and do that for
    each ingredient, and add up the total nutrition which includes calories, carbs, fat, fiber, protein, sodium, and sugar.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING },
              img: { type: Type.STRING },
              description: { type: Type.STRING },
              nutrition: {
                type: Type.OBJECT,
                properties: {
                  calories: { type: Type.STRING },
                  protein: { type: Type.STRING },
                  carbs: { type: Type.STRING },
                  fat: { type: Type.STRING },
                  fiber: { type: Type.STRING },
                  sugar: { type: Type.STRING },
                  sodium: { type: Type.STRING },
                },
              },
              ingredients: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
              },
              amount: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              },
              steps: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
              },
              spice_level: { type: Type.NUMBER },
              reference: { type: Type.STRING },
              missing: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
              },
              recommended: {
                type: Type.BOOLEAN,
              }
            },
            propertyOrdering: [
              "name",
              "img",
              "description",
              "nutrition",
              "ingredients",
              "amount",
              "steps",
              "spice_level",
              "reference",
              "missing",
              "recommended"
            ],
          },
        },
      },
    });
    return response.text; // Return just the text, it's already a JSON string from Gemini
  } catch (err) {
    console.error("Error generating recipe suggestions:", err);
    throw err;
  }
}