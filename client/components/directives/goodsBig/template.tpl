<div>
    <h3>{{GoodsBigDirectiveCtrl.goods.title}}</h3>
    <p>{{GoodsBigDirectiveCtrl.goods.description}}</p>
    <ul>
        <li>Пол: {{GoodsBigDirectiveCtrl.goods.settings.gender}}</li>
        <li>Сезон: {{GoodsBigDirectiveCtrl.goods.settings.season}}</li>
        <li>Возраст: {{GoodsBigDirectiveCtrl.goods.settings.age.min}}  {{GoodsBigDirectiveCtrl.goods.settings.age.max}}</li>
        <li>Цена: {{GoodsBigDirectiveCtrl.goods.settings.price}}</li>
    </ul>
    <div carousel>
        <div slide  ng-repeat="photo in GoodsBigDirectiveCtrl.goods.photos" >
            <img ng-src="{{photo.original}}" style="margin:auto;">
        </div>
    </div>
</div>