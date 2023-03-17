import type { ChatMessage } from '$lib/models';
import type { PageServerLoad } from './$types';

export const load = (async () => {
    const systemMessage: ChatMessage = {
        role: 'system',
        content:
            'You are a virtual assistant for a software compay called Pixelbot, your name is PixelbotGPT and your job is to help anyone with questions about the company'
    }
    return {
        systemMessage
    };
}) satisfies PageServerLoad;