

function populateBlogListing() {
	jQuery.get('/blog/listing', function(err, data) {
		if (data.length) {
			jQuery.each(data, function (element) {
				jQuery('#blogList').append('<li>' + element.title + '<li>');
			});
		} else {
			jQuery('#blogList').append('No results');
		}
	});
}

function getBlogPost(postId) {
	jQuery.get('/blog/post' + postId, function(err, post) {
		if (err) {
			jQuery('#errorRow').text(err);
		} else {
			jQuery('#postTitle').text(post.title);
			jQuery('#postCreatedDate').text(post.createdDate);
			jQuery('#postParagraph').text(post.text);
		}
	});
}

