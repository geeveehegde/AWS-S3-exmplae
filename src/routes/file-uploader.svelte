<script>

    export let progress = 0;
    export let loadStatus = 'waiting';

    let errorMessage = '', validity={};

    import { onMount } from 'svelte';
    

    onMount(() => {
        
    })

    

    

</script>

<div>
    <header class="bg-white dark:bg-slate-900 shadow-sm lg:static lg:overflow-y-visible">
        <div class="flex w-full px-6 py-4 justify-between">
            <h3 class="primary font-medium">
                {loadStatus === '' ? 'Queued in for processing' : 'Uploading files'}
            </h3>
        </div>
    </header>
    {#if loadStatus === 'waiting' || loadStatus === ''}
        <div class="default text-center px-4 py-2 mt-2">Please wait for upload to begin.</div>
    {:else if loadStatus === 'loading'}
        <div class="default text-center px-4 py-2 mt-2">{progress}% complete.</div>
        <div class="overflow-hidden h-2 mb-4 text-xs flex rounded bg-indigo-200">
            <div style={{ width: `${progress}%` }} class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-500"></div>
        </div>
    {:else if loadStatus === 'aborted'}
        <div class="secondary text-center px-4 py-2 mt-2">Abort Uploading files to </div>
    {:else if loadStatus === 'complete'}
        <div class="secondary py-2 font-medium text-sm">Upload Complete</div>
        <div class="default py-2 px-2 text-xs">
            If there is a need for conversion, it will take few minutes to appear in assets.
        </div>
        <div class="mt-2 bg-gray-50 dark:bg-slate-800 px-2 py-2">
            <div class="text-sm font-medium secondary">Please select the Categories</div>
            <ul class="w-full">
                
            </ul>
            <div class="w-full flex mt-2 pt-2">
                <p class="flex justify-between items-center">
                    <span class="px-2">
                        
                    </span>
                </p>
            </div>
            <p class="text-xs danger mt-2">
                <i>{errorMessage}</i>
            </p>   
        </div>
        <div class="mt-2 bg-gray-50 dark:bg-slate-800 px-2 py-2">
            <div class="text-sm font-medium secondary">Select validity period for the files</div>
            <ul class="w-full">
            </ul>
            <div class="w-full mt-2 pt-2">
               
            </div>
            <p class="text-xs danger mt-2">
                <i>{errorMessage}</i>
            </p>   
        </div>
        
    {/if}
</div>