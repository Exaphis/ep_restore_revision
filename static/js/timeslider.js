function defer(toWaitFor, method) {
    if (window[toWaitFor]) {
        method();
    } else {
        setTimeout(function () { defer(toWaitFor, method) }, 50);
    }
}

defer('jQuery', () => {
    $(document).on('click', '.js-repeat-revision', function(e){
      //var rev = BroadcastSlider.getSliderPosition();
      var rev = window.location.hash.substring(1);
      var padId = $(e.target).closest('a[data-pad]').data('pad');
      if(rev && padId){
        window.location = '/restore/'+padId+'/'+rev;
      } else{
        console.error('Missing pad or revision');
      }
    });
});

