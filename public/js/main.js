

function populateBlogListing(numberOfBlogPosts) {
	let limit = parseInt(numberOfBlogPosts);
	jQuery.get('/api/v1/blog/last/'+limit, function(data) {
		if (data.length) {
			jQuery.each(data, function (indexOfArray, element) {
				let blogPostText =
				"<div id=\""+element._id+"\" class=\"card mb-4\">" +
						"<div class=\"card-body\">" +
							"<h2 id=\"postTitle\" class=\"card-title\">" +
								"<a href=\"/blog/post/" + element.id + "\">"+element.title+"</a>" +
							"</h2>" +
						"</div>" +
						"<div class=\"card-footer text-muted\">" +
						"Posted on <strong id=\"postCreatedDate\">"+element.createdAt+"</strong> by " +
						"<a href=\"/about\">Vincent Sordo</a>" +
					"</div>" +
				"</div>";
				jQuery('#blogPosts').append(blogPostText);
			});
		} else {
			jQuery('#blogPosts').append('No results');
		}
	});
}

function populateBlogPost(postId) {
	jQuery.get('/api/v1/blog/' + postId, function(post) {
		if (!post) {
			jQuery('#errorRow').html('<p>Unable to find post</p>');
		} else {
			jQuery('#postTitle').html(post.title);
			jQuery('#postCreatedDate').html(post.createdAt);
			jQuery('#postParagraph').html(post.text);
		}
	});
}

