<script>
  import {browser} from "$app/environment";

  let data = {
    name: "",
    description: ""
  }

  function updateLocalDataState() {
    if (browser) {
      localStorage.setItem("data", JSON.stringify(data));
    }
  }

</script>

<form>
    <input type="text" bind:value={data.name} on:input={updateLocalDataState} placeholder="Ange ditt namn"/>
    <textarea bind:value={data.description} rows="15" on:input={updateLocalDataState}></textarea>
</form>

<style>

    input {
        width: 100%;
        display: block;
        box-sizing: border-box;
        margin-bottom: 1rem;
    }

    textarea {
        width: 100%;
        display: block;
        box-sizing: border-box;
    }

</style>