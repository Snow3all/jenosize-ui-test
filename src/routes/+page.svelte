<script>
	// @ts-nocheck
	import Swal from 'sweetalert2';
	import moment from 'moment';
	import { onMount } from 'svelte';
	import { getCampaign } from '../modules/campaign.module';

	let campaigns = [];
	let isEmptyCampaign = false;

	onMount(async () => {
		const response = await getCampaign();
		campaigns = response.data;
		if (!campaigns.length) isEmptyCampaign = true;
	});

	const openModal = async (data) => {
		window.location.href = `/manage?id=${data._id}`;
	};
</script>

<svelte:head>
	<title>Home</title>
	<meta name='description' content='Svelte demo app' />
</svelte:head>

<div class='wrapper-sector'>
	<div>
		<h1 class='text-center'>Campaign Management</h1>
		{#if isEmptyCampaign}
			<div class="mx-2">
				<h1>Campaign is empty now</h1>
			</div>
		{:else}
			<div class='grid grid-cols-2 gap-3 wrapper-card mt-3'>
				{#each campaigns as item}
					<div class='card' on:click={() => openModal(item)}>
						<p>Campaign: {item.name}</p>
						<p>{item.subject}</p>
						<p class='ellipsis'>{@html item.content}</p>
						<p class='text-right'>{item.createBy}</p>
						<p class='text-right'>{moment(item.createDate).format('DD/MM/YYYY')}</p>
					</div>
				{/each}
			</div>
		{/if}
		<div class='text-center'>
			<button class='btn-add' on:click={() => (window.location.href = '/create')}>
				+ Campaign
			</button>
		</div>
	</div>
</div>

<style>
	.wrapper-sector {
		padding: 5% 10%;
		height: 100vh;
		overflow: hidden;
	}

	.wrapper-card {
		overflow-y: scroll;
		height: 75vh;
	}

	.card {
		border: 1px solid #000;
		border-radius: 1rem;
		padding: 2%;
		background-color: #fff;
		cursor: pointer;
	}

	.btn-add {
		padding: 5px 10px;
		background-color: aquamarine;
		border-radius: 1rem;
		border: 1px solid #000;
	}

	.ellipsis {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
</style>
