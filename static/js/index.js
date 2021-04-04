let rev = null;

exports.goToRevisionEvent = function setRev(name, context) {
    rev = context.rev;
}

exports.postTimesliderInit = function initButton() {
    $(document).on('click', '.js-repeat-revision', function(e) {
        let padId = $(e.target).closest('a[data-pad]').data('pad');

        if (rev !== null && padId){
            window.location = '/restore/' + padId + '/' + rev;
        }
        else {
            console.error('Missing pad or revision');
        }
    });
}
