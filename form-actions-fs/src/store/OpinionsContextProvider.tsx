import {useEffect, useState, type PropsWithChildren } from "react";
import type { Opinion } from "../types";
import { OpinionsContext } from "./opinions-context";

export default function OpinionsContextProvider({ children }: PropsWithChildren) {
    const [opinions, setOpinions] = useState<Opinion[]>([]);

    useEffect(() => {
        const loadOpinions = async () => {
            const res = await fetch('http://localhost:3000/opinions');
            const data = await res.json();
            setOpinions(data);
        }
        loadOpinions();
    }, []);

    const addOpinion = async (opinion: Omit<Opinion, 'id' | 'votes'>) => {
        const res = await fetch('http://localhost:3000/opinions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(opinion),
        });
        
        if (!res.ok) {
            return;
        }

        const savedOpinion = await res.json();
        setOpinions((prev) => [savedOpinion, ...prev]);
    }

    const upvoteOpinion = async (opinionId: number) => {
        const res = await fetch('http://localhost:3000/opinions/' + opinionId + '/upvote', {
            method: 'POST'
        });

        if (!res.ok) {
            return;
        }

        setOpinions((prev) => prev.map((opinion) => {
            if (opinion.id === opinionId) {
                return { ...opinion, votes: (opinion.votes ?? 0) + 1 };
            }
            return opinion;
        }));
    }

    const downvoteOpinion = async (opinionId: number) => {
        const res = await fetch('http://localhost:3000/opinions/' + opinionId + '/downvote', {
            method: 'POST'
        });

        if (!res.ok) {
            return;
        }

        setOpinions((prev) => prev.map((opinion) => {
            if (opinion.id === opinionId) {
                return { ...opinion, votes: (opinion.votes ?? 0) - 1 };
            }
            return opinion;
        }));
    }

    const contextValue = {
        opinions: opinions,
        addOpinion,
        upvoteOpinion,
        downvoteOpinion,
    }

    return <OpinionsContext.Provider value={contextValue}>{children}</OpinionsContext.Provider>
}