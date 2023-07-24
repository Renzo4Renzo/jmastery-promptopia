import { Schema, model, models } from "mongoose";

const PromptSchema = new Schema({
  id: {
    type: String,
    required: true,
  },
  creatorId: {
    type: String,
    required: [true, "CreatorId is required."],
  },
  prompt: {
    type: String,
    required: [true, "Prompt is required."],
  },
  tag: {
    type: String,
    required: [true, "Tag is required."],
  },
});

export interface PromptType {
  id: string;
  creatorId: string;
  prompt: string;
  tag: string;
}

const Prompt = models.Prompt || model("Prompt", PromptSchema);

export default Prompt;
