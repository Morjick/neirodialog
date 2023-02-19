<template>
  <section>
    <div class="home-delivery">
      <div class="home-delivery-info">
        <h3>Доставка физических продуктов по всей России</h3>
        <p>Мы доставим ваш продукт в любую точку Российской Федерации самым удобным для вас способом:</p>
        <ul class="home-delivery-list">
          <li class="home-delivery-list-item">Почта Росии</li>
          <li class="home-delivery-list-item">СДЭК</li>
        </ul>
        <p>Мы стараемся добавлять различные способы получения наших продуктов, если вы не нашли подходящего для себя, пожалуйста, подождите пока его добавят или <NuxtLink to="/support">напишите нам</NuxtLink> и оповестите о необходимости одного из методов. Если просьб по добавлению будет достаточно много, мы сделаем всё, чтобы его добавить</p>

      </div>
      <div class="home-delivery-cart"></div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'HomeDelivery'
}
</script>
