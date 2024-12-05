<template>
  <div class="menu-container">
    <ul class="menu">
      <li class="left"><router-link to="/">Thailand LifeStyle</router-link></li>
      <li><router-link to="/bangkok">Bangkok</router-link></li>
      <li><router-link to="/pattaya">Pattaya</router-link></li>
      <li><router-link to="/Phuket">Phuket</router-link></li>
      <li class="right"><router-link to="/cart">Kundkorg</router-link></li>
    </ul>
  </div>
</template>
<style scoped>
.menu-container {
  display: flex;
  justify-content: center;
  background-color: #f4f4f4;
  padding: 10px;
  width: 100%;
}

.menu {
  display: flex;
  justify-content: center;
  list-style-type: none;
  padding: 0;
  width: 100%;
}

.menu li {
  display: flex;
  margin: 0 1rem;
  
}

.menu li a {
  text-decoration: none;
  color: #333;
  font-size: 16px;
  padding: 10px;
  font-size: smaller;
}

.menu li a:hover {
  background-color: #007bff;
  color: white;
}

.menu li.left {
  margin-right: auto;
}

.menu li.right {
  margin-left: auto;
}

@media screen and (max-width: 920px) {
  .menu-container {
    padding: 10px 0;
  }
  .menu {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
    margin: 0 auto;

  }

  .menu li {
    margin: 0;
    max-width: 2.5rem;
  }

  .menu li.left {
    margin-right: 0;
  }

  .menu li.right {
    margin-left: 0;
  }
}

</style>
