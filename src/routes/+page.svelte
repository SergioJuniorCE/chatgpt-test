<script lang="ts">
	import { onMount } from 'svelte';
	import type { ChatMessage } from '../lib/models';
	import type { PageData } from './$types';

	export let data: PageData;

	const { systemMessage, initalMessage } = data;

	let messages: ChatMessage[] = [systemMessage, initalMessage];

	let newMessage: string;

	async function chat() {
		messages = [...messages, { role: 'user', content: newMessage }];
		newMessage = '';
		const res = await fetch('/', {
			method: 'POST',
			body: JSON.stringify({ messages })
		});

		const chatGPTMessage = await res.json();

		if (chatGPTMessage.message === 'Internal Error') {
			messages = [...messages, { role: 'assistant', content: 'Internal Error' }];
		} else {
			messages = [...messages, chatGPTMessage];
		}
	}
</script>

<main class="container">
	<h1 class="text-center">ChatGPT Test</h1>

	{#each messages as message}
		{#if message.role !== 'system'}
			<div class="message {message.role === 'assistant' ? 'chatgpt-message' : 'user-message'}">
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

	<div class="mb-3">
		<input
			type="text"
			class="form-control"
			name="message"
			placeholder="Enter your message"
			bind:value={newMessage}
			on:keypress={(e) => {
				if (e.key === 'Enter') {
					chat();
				}
			}}
		/>
	</div>
	<button class="btn btn-primary" type="button" on:click={chat}>Send</button>
</main>

<style>
	.message {
		padding: 0;
		margin: 0;
		margin-bottom: 8px;
		display: flex;
		align-items: center;
	}

	.content {
		display: flex;
		align-items: center;
	}

	.chatgpt-message {
		border-radius: 16px;
		background-color: rgba(86, 184, 67, 0.5);
		border: 1px solid rgba(86, 184, 67, 1);
	}

	.user-message {
		border-radius: 16px;
		background-color: rgba(255, 162, 0, 0.5);
		border: 1px solid rgb(255, 162, 0);
	}
	.avatar {
		border-radius: 16px;
		width: 24px;
		margin-left: 8px;
		margin-right: 8px;
	}
</style>
