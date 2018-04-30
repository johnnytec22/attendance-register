$(document).ready(function() {
    $("#recent_guest table #edit_btn").click(function(event){
        event.preventDefault();
        var url = $(this).parents('tr').siblings('#guest_edit_modal').children('.modal_content').children('form').attr('action');

        alert(url)
    });
})
alert('hello')