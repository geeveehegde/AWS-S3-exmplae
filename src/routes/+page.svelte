
<script>
import { Fileupload, Label, Helper } from 'flowbite-svelte'
import { Card, Button, Modal } from "flowbite-svelte";
import { onMount } from 'svelte';
import { List, Li } from 'flowbite-svelte';
import FileUploader from './file-uploader.svelte';

let items = '', uploadedFiles = [],
 openFilePopup = false,
 showImage = false,
 path = '',
 progress = 0,
 loadStatus = 'loading',
 target,
 formData;

onMount(async() => {
	const response = await fetch('/listfiles');
	const data = await response.json();
	if(response.status === 200) {
		items = data.data;
	}
});

const upload = (formData) => {
	openFilePopup = true;
	const req = new XMLHttpRequest();
	req.upload.addEventListener('loadstart',(e) => {
		progress = 0;
	})
	req.upload.addEventListener('progress',(e)=>{
		loadStatus = 'loading';
		if(e.lengthComputable){
			progress = (Math.round(e.loaded/e.total*100));
		}
	})
	req.upload.addEventListener('abort', (e) => {
		loadStatus = 'aborted';
	})
	req.addEventListener('readystatechange',(e) => {
		if(req.readyState === 4) {
			if(req.status === 200) {
				loadStatus = 'complete';
			}
		}
	})
	req.open("POST",`/uploadFiles/`);
	req.send(formData);
}
</script>
{#if openFilePopup}
	<Modal bind:open={openFilePopup} closeModal={() => {}}>
		<FileUploader {progress} {loadStatus} />
	</Modal>
{/if}
{#if showImage}
<Modal title="Details of the Image" bind:open={showImage} autoclose>
	<img src={path} />
</Modal>
{/if}
<div class="flex justify-center">
	<Card >
		<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Create, Read, Update, Delete on Files using AWS S3</h5>
		<div class="space-x-4 space-y-4">
			<div class="flex items-center space-x-4">
				<form class="flex space-x-2" action="/">
					<Label class="space-y-2">
						<span>Upload file</span>
						<div class="flex items-center space-x-2">
							<Fileupload on:change={(e) => {
								target = e.target.files;
								const maxFiles = 100;
								const maxFileSizeMb = 5000;
								if(target.length > maxFiles) {
									return; 
								}
								for(let i=0; i< target.length; i++) {
									if(target[i].size > maxFileSizeMb * 1048576) {
										return;
									}
									uploadedFiles.push(target[i]);
								}
								if(target.length > 0) {
									formData = new FormData();
									for(let i=0; i < uploadedFiles.length ; i++) {
									formData.append(uploadedFiles[i].name ,uploadedFiles[i])
									}}
								}} id="with_helper" class="mb-2" />
							<Button type="submit" on:click={() =>  {upload(formData)}}>Upload</Button>
						</div>
						<Helper>SVG, PNG, JPG or GIF (MAX. 800x400px).</Helper>
					</Label>
				</form>
			</div>  
			<List tag="ul" class="divide-y divide-gray-200 dark:divide-gray-700">
			{#each items as item}
				<Li class="pb-3 sm:pb-4" icon>
					<div class="flex items-center space-x-4">
						<div class="flex-1 min-w-0">
							<p class="text-sm font-medium text-gray-900 truncate dark:text-white my-2" on:click={async() => {
								const response = await fetch(`/getFile/${encodeURIComponent(item.Key)}`);
								const data = await response.json();
								if(response.status === 200) {
								showImage = true
								path = data.data[0].path;
								}
								}}>{item.Key}</p>
						</div>
						<button on:click={async() => {
						const response = await fetch(`/deleteFile/${encodeURIComponent(item.Key)}`,{method:'DELETE'});
						const data = await response.json();
						if(response.status === 200) {
						console.log("successfully deleted")
						}
						}}>
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-red-500">
								<path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
							</svg>		  
						</button>
					</div>
				</Li>
			{/each}
			</List>
		</div>
	</Card>
</div>
