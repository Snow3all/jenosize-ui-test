<script>
	// @ts-nocheck
	import Swal from 'sweetalert2';
	import Editor from 'cl-editor/src/Editor.svelte';
	import { createCampaign } from '../../modules/campaign.module';
	let data = {
		name: '',
		subject: '',
		content: '',
		email: '',
		createBy: ''
	};

  let textRich = '';

	const create = async () => {
    data.content = textRich;
		const response = await createCampaign(data);
		if (response.code === 0) {
			Swal.fire({
				title: 'Add New Campaign',
				icon: 'success',
				confirmButtonColor: '#3085d6',
				confirmButtonText: 'Done'
			}).then((result) => {
				if (result.isConfirmed) {
					window.location.href = '/';
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
</script>

<svelte:head>
	<title>Create Campaign</title>
	<meta name='description' content='Svelte demo app' />
</svelte:head>

<div class='wrapper-sector'>
	<div class='mb-2'>
		<h1>Create Campaign</h1>
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
			<div class='md:flex md:items-center mb-6'>
				<Editor on:change={(evt) => (textRich = evt.detail)} />
			</div>
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
    <div class='mr-2'>
      <button class='btn-blue' on:click={() => window.location.href = '/'}> Back</button>
    </div>
		<div>
      <button class='btn-green' on:click={() => create()}>Create</button>
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
    color: #fff;
		padding: 10px 15px;
		border-radius: 1rem;
		border: 1px solid #000;
	}
</style>
