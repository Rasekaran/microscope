/*Template.postSubmit.events({
    'submit form': function(e) {
        e.preventDefault();
        var post = {
            url: $(e.target).find('[name=url]').val(),
            title: $(e.target).find('[name=title]').val(),
            message: $(e.target).find('[name=message]').val()
        }
        post._id = Posts.insert(post);
        Router.go('postPage', post);
    }
});*/

/*Template.postSubmit.events({
    'submit form': function(e) {
        e.preventDefault();
        var post = {
            url: $(e.target).find('[name=url]').val(),
            title: $(e.target).find('[name=title]').val(),
            message: $(e.target).find('[name=message]').val()
        }
        Meteor.call('post', post, function(error, id) {
            if (error)
                return alert(error.reason);
            Router.go('postPage', {
                _id: id
            });
        });
    }
});*/

Template.postSubmit.events({
    'submit form': function(e) {
        e.preventDefault();
        var post = {
            url: $(e.target).find('[name=url]').val(),
            title: $(e.target).find('[name=title]').val(),
            message: $(e.target).find('[name=message]').val()
        }
        Meteor.call('post', post, function(error, id) {
            if (error) {
                // display the error to the user
                throwError(error.reason);
                if (error.error === 302)
                    Router.go('postPage', {
                        _id: error.details
                    })
            } else {
                Router.go('postPage', {
                    _id: id
                });
            }
        });
    }
});
