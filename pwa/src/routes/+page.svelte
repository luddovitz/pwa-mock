<script>
  import { browser } from '$app/environment';
  import {onMount} from "svelte";
  import Form from "../components/Form.svelte";

  onMount(() => {
    if (browser) {

      // clear any local storage
      localStorage.clear();

      window.onoffline = () => {
        console.log("Application is now running offline")
      }

      window.ononline = () => {
        console.log("Application is back online");
        syncLocalData();
      }
    }
  })

  function syncLocalData() {
    if (localStorage.getItem("data")) {
      window.alert("Syncing following data:" + localStorage.getItem("data"))
    }
  }

</script>

<main>
    <h1>SvelteKit as PWA with Local Storage</h1>
    <p>Quick demo doing some input that should persist even if working offline.</p>
    <a href="/documentation">Go to documentation</a>
    <Form />
</main>

<style>
    main {
        max-width: 450px;
        margin-inline: auto;
    }
</style>