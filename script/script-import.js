function loadScript(url)
{   
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    // head.appendChild(script);
    head.insertBefore( script, head.firstChild );
}
var url = [
'jquery',
'angular.min',
'bootstrap.min',
'angular-route',
'app',
'components/header.component',
'components/slider.component',
'components/card.component',
'components/card-column.component',
'components/music.component'
];
url.forEach(function(element) {
    setTimeout(function() {
        loadScript('script/'+element+'.js');
    }, 500);
}, this);
