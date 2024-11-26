import { surpriseMePrompts} from "../constants";

export const getRandomPrompt = (prompt) => {
    const randomIndex = Math.floor(Math.random() * surpriseMePrompts.length);
    const randomPrompt = surpriseMePrompts[randomIndex];

    //to avoid getting the same index again
    if (randomPrompt === prompt) {
        return getRandomPrompt(prompt);
    }

    return randomPrompt;
}