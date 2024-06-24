<script>
	// @ts-nocheck
	import Swal from 'sweetalert2';
	import Editor from 'cl-editor/src/Editor.svelte';
	import { onMount } from 'svelte';
	import { getCampaignById, editCampaign, deleteCampaign } from '../../modules/campaign.module';

	let campaign = {};

	let data = {
		name: '',
		subject: '',
		content: '',
		email: '',
		createBy: ''
	};

	let html = '';

	let componentKey = 0;

	onMount(async () => {
		const urlParams = new URLSearchParams(window.location.search);
		const myParam = urlParams.get('id');
		const response = await getCampaignById(myParam);
		if (response.code === 0) {
			campaign = response.data;
			data = {
				id: campaign._id,
				name: campaign.name,
				subject: campaign.subject,
				content: campaign.content,
				email: campaign.email,
				createBy: campaign.createBy
			};
			html = data.content;
			componentKey = componentKey + 1;
		}
	});

	const editItem = async () => {
		const newData = {
			id: data.id,
			data: {
				name: data.name,
				subject: data.subject,
				content: html,
				email: data.email,
				createBy: data.createBy
			}
		};
		const response = await editCampaign(newData);
		if (response.code === 0) {
			Swal.fire({
				title: 'Done edit',
				icon: 'success',
				confirmButtonColor: '#3085d6',
				confirmButtonText: 'Done'
			}).then((result) => {
				if (result.isConfirmed) {
					window.location.reload;
				}
			});
		} else {
			Swal.fire({
				icon: 'error',
				title: response.message,
				text: `Error code : ${response.code}`
			});
		}
	};

	const deleteItem = async () => {
		Swal.fire({
			title: 'Are you sure to delete?',
			icon: 'warning',
			confirmButtonColor: '#F32B2B',
			confirmButtonText: 'Comfirm'
		}).then(async(result) => {
			if (result.isConfirmed) {
				const response = await deleteCampaign(data.id);
        if (response.code === 0) {
          window.location.href = '/'
        }
			}
		});
	};
</script>

<svelte:head>
	<title>Campaign Management</title>
	<meta name='description' content='Svelte demo app' />
</svelte:head>

<div class='wrapper-sector'>
	<div class='mb-2'>
		<h1>Campaign Management</h1>
	</div>
	<div class='flex justify-center'>
		<form class='w-full max-w-sm'>
			<div class='md:flex md:items-center mb-6'>
				<div class='md:w-1/3'>
					<label
						class='block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pr-4'
						for='inline-full-name'
					>
						Name:
					</label>
				</div>
				<div class='md:w-2/3'>
					<input
						class='appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500'
						id='inline-full-name'
						type='text'
						bind:value={data.name}
					/>
				</div>
			</div>
			<div class='md:flex md:items-center mb-6'>
				<div class='md:w-1/3'>
					<label
						class='block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pr-4'
						for='inline-full-name'
					>
						Subject:
					</label>
				</div>
				<div class='md:w-2/3'>
					<input
						class='appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500'
						id='inline-full-name'
						type='text'
						bind:value={data.subject}
					/>
				</div>
			</div>
			<label
				class='block text-gray-500 font-bold md:text-left mb-1 md:mb-3 pr-4'
				for='inline-password'
			>
				Content
			</label>
			{#key componentKey}
				<div class='md:flex md:items-center mb-6'>
					<Editor {html} on:change={(evt) => (html = evt.detail)} />
				</div>
			{/key}
			<div class='md:flex md:items-center mb-6'>
				<div class='md:w-1/3'>
					<label
						class='block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pr-4'
						for='inline-full-name'
					>
						Email:
					</label>
				</div>
				<div class='md:w-2/3'>
					<input
						class='appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500'
						id='inline-full-name'
						type='text'
						bind:value={data.email}
					/>
				</div>
			</div>
			<div class='md:flex md:items-center mb-6'>
				<div class='md:w-1/3'>
					<label
						class='block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pr-4'
						for='inline-full-name'
					>
						Create By:
					</label>
				</div>
				<div class='md:w-2/3'>
					<input
						class='appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500'
						id='inline-full-name'
						type='text'
						bind:value={data.createBy}
					/>
				</div>
			</div>
		</form>
	</div>
	<div class='text-center pb-4 flex justify-center'>
		<div>
			<button class='btn-blue' on:click={() => (window.location.href = '/')}> Back</button>
		</div>
		<div class='mx-2'>
			<button class='btn-green' on:click={() => editItem()}>Edit</button>
		</div>
		<div>
			<button class='btn-red' on:click={() => deleteItem()}>Delete</button>
		</div>
	</div>
</div>

<style>
	.wrapper-sector {
		padding: 5% 10%;
		height: 100vh;
	}

	.btn-green {
		background-color: aquamarine;
		padding: 10px 15px;
		border-radius: 1rem;
		border: 1px solid #000;
	}

	.btn-blue {
		background-color: blue;
		padding: 10px 15px;
		border-radius: 1rem;
		border: 1px solid #000;
		color: #fff;
	}

	.btn-red {
		background-color: crimson;
		color: #fff;
		padding: 10px 15px;
		border-radius: 1rem;
		border: 1px solid #000;
	}
</style>
