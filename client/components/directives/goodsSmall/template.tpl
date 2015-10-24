<div ng-if="GoodsSmallDirectiveCtrl.goods" class="thumbnail">
    <img ng-src="{{GoodsSmallDirectiveCtrl.goods.photos[0].original}}" ng-alt="{{GoodsSmallDirectiveCtrl.goods.title}}">
    <div class="caption">
        <h3>{{GoodsSmallDirectiveCtrl.goods.title}}</h3>
        <p>{{GoodsSmallDirectiveCtrl.goods.description}}</p>
        <p>
            <a ui-sref="goods({ id: GoodsSmallDirectiveCtrl.goods._id})" class="btn btn-primary" role="button">Подробнее</a> 
            <button class="btn btn-default" role="button"
            ng-click="GoodsSmallDirectiveCtrl.removeGoods(GoodsSmallDirectiveCtrl.goods._id)">Удалить</button>
        </p>
    </div>
</div>