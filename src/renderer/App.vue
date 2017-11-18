<template>
  <div id="app">
    <div class="d-flex flex-row h100">
      <friends-list class="flist"></friends-list>
      <router-view class="fill"></router-view>
    </div>

  </div>
</template>

<script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.3/umd/popper.min.js" integrity="sha384-vFJXuSJphROIrBnz7yo7oB41mKfc8JzQZiCq4NCceLEaO4IHwicKwpJf9c9IpFgh" crossorigin="anonymous"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/js/bootstrap.min.js" integrity="sha384-alpBpkh1PFOepccYVYDB4do5UnbKysX5WZXm3XxPqe5iKTfUKjNkCk9SaVuEZflJ" crossorigin="anonymous"></script>

<script>
  import FriendsList from '@/components/FriendsList'
  export default {
    name: 'App',
    components: { FriendsList },
    mounted () {
      this.$store.dispatch('init_firebase')
    }
  }
</script>

<style>
  @import url("https://fonts.googleapis.com/css?family=Source+Sans+Pro");
  @import url("https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/css/bootstrap.min.css");
  .flist {
    border-right: 1px solid #eee;
    width: 250px;
  }
  .fill {
    flex: 1;
    overflow-y: scroll;
  }
  .h100 {
    height: 100vh;
  }
  .header {
    background: #f4f4f4;
    border-bottom: 1px solid #eee;
    line-height: 1em;
    padding: 1em;
    margin: 0;
  }
</style>
