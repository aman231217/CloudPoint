let markers=[],i=0, infos=[],k=0;

$('#btn1').on('click',function(){
    for(let j=0;j<i;j++)
    { markers[j].setMap(null);                    }

})
$('#btn2').on('click',function(){
    for(let j=0;j<k;j++)
    { infos[j].close();   }

})


function initMap() {

    var map = new google.maps.Map(document.getElementById('map'), {      //par1=mapCanvas par2=mapOptions
        zoom: 7,
        center: {lat: 26.8467, lng: 80.9},
        mapTypeId: google.maps.MapTypeId.HYBRID
    });
    var marker = new google.maps.Marker({
        position:{lat: 26.8467, lng: 80.9462} ,
        map: map,
        animation: google.maps.Animation.DROP
    });
    var infowindow = new google.maps.InfoWindow({

        content: "UTTAR PRADESH"
    });
    infowindow.open(map, marker);

    map.addListener('click', function (e) {
        var marker = new google.maps.Marker({
            position: e.latLng, map: map,
            animation: google.maps.Animation.BOUNCE});

        for(let j=0;j<i;j++)
        {   markers[j].setAnimation(google.maps.Animation.DROP);}
        markers[i]=marker;i++;

        for(let p=0;p<k;p++)
        {  infos[p].close();}

        map.panTo(e.latLng);

        var text="";
        let URL = `https://api.weatherbit.io/v2.0/current?&lat=${e.latLng.lat()}&lon=${e.latLng.lng()}&key=da334a7104474c598181ccae11d00c02`;
        $.ajax({
            url: URL,
            dataType: 'jsonp',
            success: function (info)
            {
                text=info.data[0].weather.description;
                var infowindow = new google.maps.InfoWindow({

                    content: `${text}`
                });
                infowindow.open(map, marker);
                infos[k]=infowindow;k++;
                marker.addListener('click',function(){
                    infowindow.open(map, marker);

                });

            }
        })
    });


}
