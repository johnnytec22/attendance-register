

var guest_edit_modal = document.getElementById('guest_edit_modal');
var edit_btn = document.getElementsByClassName('edit_btn');
var close_btn = document.getElementById('close');

$('#recent_guest table tbody .button_container a.edit_btn').on('click', function(event) {
    //PREVENTING THE A TAG FROM FOLLOWING THE HREF LINK
    event.preventDefault();
    //retrieving the guest's data from the clicked button
    var guest = $(this).data('guest');

    //populating the guest edit form(modal:current hidden) with d above data
    $('#guest_edit_modal .modal_content form input[name=full_name]').val(guest.full_name)
    $('#guest_edit_modal .modal_content form input[name=Phone]').val(guest.Phone)
    $('#guest_edit_modal .modal_content form input[name=email]').val(guest.email)
    $('#guest_edit_modal .modal_content form input[name=time_in]').val(guest.time_in)
    $('#guest_edit_modal .modal_content form input[name=time_out]').val(guest.time_out)
    $('#guest_edit_modal .modal_content h5.message').text('')

    //obtaining href link of the clicked edit button to be used as action='link' for the edit modal form
    var url = $(this).attr('href');
    //obtaining d html data-*(guest_key) attr data from which was also passed to the clicked button in the html file
    var guest_key = $(this).data('guest_key');

    //assigning the url to the action attribute of the form in edit modal form
    $('#guest_edit_modal .modal_content form').attr('action', url);
    //making the retrieved guest key identity available to the form
    $('#guest_edit_modal .modal_content form').data('row_id', guest_key);

    //who are we editing
    $('#guest_edit_modal .modal_content h4').text('EDIT '+guest.full_name)


    //show the form in form of modal pop-up
    guest_edit_modal.style.display = 'block';
})



//sumbiting form data and displaying a message (error/success) as well as updating the table row that was edited
$('#guest_edit_modal .modal_content form input[type=submit]').on('click', function(event) {
    //preventing the submit button from submitting the form
    event.preventDefault();
    //obtaining target row key identity from the form data-* attribute
    var row_id = $('#guest_edit_modal .modal_content form').data('row_id')

    //grabbing the form input fields' values
    var full_name = $('#guest_edit_modal .modal_content form input[name=full_name]').val()
    var Phone = $('#guest_edit_modal .modal_content form input[name=Phone]').val()
    var email = $('#guest_edit_modal .modal_content form input[name=email]').val()
    var time_in = $('#guest_edit_modal .modal_content form input[name=time_in]').val()
    var time_out = $('#guest_edit_modal .modal_content form input[name=time_out]').val()

    //obtaining the post url from the action attr of the form.
    var post_url = $('#guest_edit_modal .modal_content form').attr('action');
    //putting the form data together
    var formdata = {
        'full_name': full_name,
        'Phone': Phone,
        'email': email,
        'time_in': time_in,
        'time_out': time_out
    };
    //making an AJAX post request the server API and posting the form's data

    $.post(post_url, formdata, function(message, status) {
        //if the request is successful
        if(status == 'success') {
            //grabbing the specific row from which a guest to be updated is selected from, from the form //
            var row = $('#recent_guest table tbody tr#'+row_id);
            //updating the table of guests at the location of the updated guest
            row.children('#full_name').text(full_name);
            row.children('#email').text(email);
            row.children('#Phone').text(Phone)
            row.children('#time_in').text(time_in);
            row.children('#time_out').text(time_out);

            //displaying a success messages to the user
            $('#guest_edit_modal .modal_content h5.message').text(message)
        }else {
            //displaying an error message to the user
            $('#guest_edit_modal .modal_content h5.message').text('Update was NOT successfull, Please try again')            
        }
    })

})

//closers
window.onclick = function (event) {
    if(event.target == guest_edit_modal) {
        guest_edit_modal.style.display = 'none';
    }
}

close_btn.onclick = function() {
    guest_edit_modal.style.display = 'none'
}

var delete_modal = document.getElementById('delete_modal');
delete_close_btn = $('#delete_modal .content strong#delete_close')
//closers
window.onclick = function (event) {
    if(event.target == delete_modal) {
        delete_modal.style.display = 'none';
    }
}

delete_close_btn.onclick = function() {
    delete_modal.style.display = 'none'
}

//DELETE FUNCTIONALITY
$('#recent_guest table tbody .button_container a.delete_btn').on('click', function(event) {
    event.preventDefault();

    //getting the Delete link
    var delete_link = $(this).attr('href');
    //grabbing the attached guest's name
    var guest_name = $(this).data('guest_name');

    //passing required data into the Delete modal
    var message = "You are about to DELETE "+guest_name+" from record. Note that this process is not reversible."
    $('#delete_modal .content h5.warning').text(message)

    //updating the modal to have the delete url
    $('#delete_modal .content a').attr('href', delete_link);

    //showing the modal
    $('#delete_modal').css('display', 'block')
})
