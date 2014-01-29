/*Router.configure({
    layoutTemplate: 'layout'
});
Router.map(function() {
    this.route('postsList', {
        path: '/'
    });
});*/
/*Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    waitOn: function() {
        return Meteor.subscribe('posts');
    }
});*/
/*Router.map(function() {
    this.route('postsList', {
        path: '/'
    });
});*/
/*Router.map(function() {
    this.route('postsList', {
        path: '/'
    });
    this.route('postPage', {
        path: '/posts/:_id'
    });
});*/
/*Router.map(function() {
    this.route('postsList', {
        path: '/'
    });
    this.route('postPage', {
        path: '/posts/:_id',
        data: function() {
            return Posts.findOne(this.params._id);
        }
    });
});*/

/*Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    waitOn: function() {
        return Meteor.subscribe('posts');
    }
});
Router.map(function() {
    this.route('postsList', {
        path: '/'
    });
    this.route('postPage', {
        path: '/posts/:_id',
        data: function() {
            return Posts.findOne(this.params._id);
        }
    });
    this.route('postSubmit', {
        path: '/submit'
    });
});*/

/*var requireLogin = function() {
    if (!Meteor.user()) {
        this.render('accessDenied');
        this.stop();
    }
}
Router.before(requireLogin, {
    only: 'postSubmit'
});*/

/*var requireLogin = function() {
    if (!Meteor.user()) {
        if (Meteor.loggingIn())
            this.render(this.loadingTemplate);
        else
            this.render('accessDenied');
        this.stop();
    }
}
Router.before(requireLogin, {
    only: 'postSubmit'
});*/


/*Router.configure({
    layoutTemplate: 'layout'
});*/
/*Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    waitOn: function() {
        return Meteor.subscribe('posts');
    }
});*/

Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    waitOn: function() {
        //return [Meteor.subscribe('posts') /*, Meteor.subscribe('comments')*/ ];
        //return [ Meteor.subscribe('posts'), Meteor.subscribe('notifications')]
        return [Meteor.subscribe('notifications')]
    }
});

/*PostsListController = RouteController.extend({
    template: 'postsList',
    increment: 5,
    limit: function() {
        return parseInt(this.params.postsLimit) || this.increment;
    },
    findOptions: function() {
        return {
            sort: {
                submitted: -1
            },
            limit: this.limit()
        };
    },
    waitOn: function() {
        return Meteor.subscribe('posts', this.findOptions());
    },
    data: function() {
        return {
            posts: Posts.find({}, this.findOptions()),
            nextPath: this.route.path({
                postsLimit: this.limit() + this.increment
            })
        };
    }
});*/

PostsListController = RouteController.extend({
    template: 'postsList',
    increment: 5,
    limit: function() {
        return parseInt(this.params.postsLimit) || this.increment;
    },
    findOptions: function() {
        return {
            sort: this.sort,
            limit: this.limit()
        };
    },
    waitOn: function() {
        return Meteor.subscribe('posts', this.findOptions());
    },
    data: function() {
        return {
            posts: Posts.find({}, this.findOptions()),
            nextPath: this.nextPath()
        };
    }
});
NewPostsListController = PostsListController.extend({
    sort: {
        submitted: -1,
        _id: -1
    },
    nextPath: function() {
        return Router.routes.newPosts.path({
            postsLimit: this.limit() + this.increment
        })
    }
});
BestPostsListController = PostsListController.extend({
    sort: {
        votes: -1,
        submitted: -1,
        _id: -1
    },
    nextPath: function() {
        return Router.routes.bestPosts.path({
            postsLimit: this.limit() + this.increment
        })
    }
});




Router.map(function() {
    /*this.route('postsList', {
        path: '/'
    });*/
    /*this.route('postsList', {
        path: '/:postsLimit?',
        waitOn: function() {
            var postsLimit = parseInt(this.params.postsLimit) || 5;
            return Meteor.subscribe('posts', {
                sort: {
                    submitted: -1
                },
                limit: postsLimit
            });
        },
        data: function() {
            var limit = parseInt(this.params.postsLimit) || 5;
            return {
                posts: Posts.find({}, {
                    sort: {
                        submitted: -1
                    },
                    limit: limit
                })
            };
        }

    });*/
    /*this.route('postsList', {
        path: '/:postsLimit?',
        controller: PostsListController
    });*/

    this.route('home', {
        path: '/',
        controller: NewPostsListController
    });
    this.route('newPosts', {
        path: '/new/:postsLimit?',
        controller: NewPostsListController
    });
    this.route('bestPosts', {
        path: '/best/:postsLimit?',
        controller: BestPostsListController
    });




    /*this.route('postPage', {
        path: '/posts/:_id',
        data: function() {
            return Posts.findOne(this.params._id);
        }
    });*/

    this.route('postPage', {
        path: '/posts/:_id',
        waitOn: function() {
            return [
                Meteor.subscribe('singlePost', this.params._id),
                Meteor.subscribe('comments', this.params._id)
            ];
        },
        data: function() {
            return Posts.findOne(this.params._id);
        }
    });

    this.route('postEdit', {
        path: '/posts/:_id/edit',
        waitOn: function() {
            return Meteor.subscribe('singlePost', this.params._id);
        },

        data: function() {
            return Posts.findOne(this.params._id);
        }
    });
    this.route('postSubmit', {
        path: '/submit',
        disableProgress: true
    });
});
var requireLogin = function() {
    if (!Meteor.user()) {
        if (Meteor.loggingIn())
            this.render('loading')
        else
            this.render('accessDenied');
        this.stop();
    }
}

Router.before(requireLogin, {
    only: 'postSubmit'
});
Router.before(function() {
    clearErrors()
});
/**/
