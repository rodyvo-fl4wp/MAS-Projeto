$(document).ready(function() {
    // Check if there's a saved image in localStorage
    var profileImage = localStorage.getItem('profileImage');

    if (profileImage) {
        // If an image is saved, set it as the source for the profile picture
        $('#pfp-pic').css('background-image', 'url(' + profileImage + ')');
    } else {
        // If no image is saved, use a default profile picture
        $('#pfp-pic').css('background-image', 'url(https://static.vecteezy.com/system/resources/previews/036/280/650/non_2x/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-illustration-vector.jpg)');
    }
});