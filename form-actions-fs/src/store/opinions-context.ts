/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext} from "react";
import type { Opinion } from "../types";

export const OpinionsContext = createContext<{
    opinions: Opinion[];
    addOpinion: (opinion: Omit<Opinion, 'id' | 'votes'>) => void;
    upvoteOpinion: (opinionId: number) => void;
    downvoteOpinion: (opinionId: number) => void;
}>({
    opinions: [],
    addOpinion: (opinion: Omit<Opinion, 'id' | 'votes'>) => {},
    upvoteOpinion: (opinionId: number) => {},
    downvoteOpinion: (opinionId: number) => {},
});

