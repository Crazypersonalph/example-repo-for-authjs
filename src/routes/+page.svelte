<script>
	import { signIn, signOut } from '@auth/sveltekit/client';
	import { page } from '$app/stores';
</script>

<p>
	{#if Object.keys($page.data.session || {}).length}
		<strong>{$page.data.session?.user?.image}</strong>
		<span class="signedInText">
			<small>Signed in as</small><br />
			<strong>{$page.data.session?.user?.email || $page.data.session?.user?.name}</strong>
		</span>
		<button on:click={() => signOut()} class="button">Sign out</button>
	{/if}
</p>