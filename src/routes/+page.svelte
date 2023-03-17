<script lang="ts">
	import type { ChatMessage } from '../lib/models';
	import type { PageData } from './$types';

	export let data: PageData;

	let messages: ChatMessage[] = [
		{
			role: 'system',
			content: 'You are a virtual assistant for a software compay called Pixelbot.'
		}
	];

	let newMessage: string;

	async function chat() {
		messages = [...messages, { role: 'user', content: newMessage }];

		const res = await fetch('/', {
			method: 'POST',
			body: JSON.stringify({
				messages: messages
			})
		});

		const { chatGPTMessage } = await res.json();
        
		if (chatGPTMessage.message === 'Internal Error') {
			messages = [...messages, { role: 'assistant', content: 'Internal Error' }];
		} else {
			messages = [...messages, chatGPTMessage];
		}
		console.log(messages);
	}
</script>

<main class="container">
	<h1 class="text-center">ChatGPT Test</h1>

	<div class="message-list">
		{#each messages as message}
			{#if message.role !== 'system'}
				<div class="message d-flex">
					<div>
						<img
							class="avatar"
							src={message.role === 'assistant'
								? 'https://blogs.perficient.com/files/openai-avatar.png'
								: 'https://ionicframework.com/docs/img/demos/avatar.svg'}
							alt="Avatar"
						/>
					</div>
					<div class="content">
						<p>{message.content}</p>
					</div>
				</div>
			{/if}
		{/each}
	</div>
	<div class="mb-3">
		<input
			type="text"
			class="form-control"
			name="message"
			placeholder="Enter your message"
			bind:value={newMessage}
		/>
	</div>
	<button class="btn btn-primary" type="button" on:click={chat}>Send</button>
</main>

<style>
	.chatgpt-message {
		margin-bottom: 1rem;
		border-radius: 16px;
		background-color: rgba(86, 184, 67, 0.5);
	}
	.avatar {
		border-radius: 16px;
		width: 24px;
		margin-right: 8px;
	}
</style>
