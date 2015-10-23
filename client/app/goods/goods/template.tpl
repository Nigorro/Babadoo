<div ng-include="'components/navbar/navbar.html'"></div>

<div class="container">
    <div class="row">
        <div class="col-md-12">
          !{{goods}}
          <div ng-if="goods" class="goods-big">
            <h3>{{goods.title}}</h>
            <p>{{goods.description}}</p>
            <ul>
              <li ng-repeat="photo in goods.photos">
                <img src="{{photo.original}}">
              </li>
            </ul>
          </div>
        </div>
    </div>
</div>

<footer class="footer">
  <div class="container">
    <p>Angular Fullstack v2.1.1 |
      <a href="https://twitter.com/tyhenkel">@tyhenkel</a> |
      <a href="https://github.com/DaftMonk/generator-angular-fullstack/issues?state=open">Issues</a></p>
  </div>
</footer>