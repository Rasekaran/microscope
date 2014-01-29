/*var postsData = [{
    title: 'Introducing Telescope',
    author: 'Sacha Greif',
    url: 'http://sachagreif.com/introducing-telescope/'
}, {
    title: 'Meteor',
    author: 'Tom Coleman',
    url: 'http://meteor.com'
}, {
    title: 'The Meteor Book',
    author: 'Tom Coleman',
    url: 'http://themeteorbook.com'
}];
Template.postsList.helpers({
    posts: postsData
});*/

/*Template.postsList.helpers({
	posts: function() {
		return Posts.find();
	}
});*/

/*Template.postsList.helpers({
    posts: function() {
        return Posts.find({}, {
            sort: {
                submitted: -1
            }
        });
    }
});*/

/*Template.postsList.helpers({
    hasMorePosts: function() {
        this.posts.rewind();
        return Router.current().limit() == this.posts.fetch().length;
    }
});*/

Template.postsList.helpers({
    postsWithRank: function() {
        this.posts.rewind();
        return this.posts.map(function(post, index, cursor) {
            post._rank = index;
            return post;
        });
    },
    hasMorePosts: function() {
        this.posts.rewind();
        return Router.current().limit() == this.posts.fetch().length;
    }
});
