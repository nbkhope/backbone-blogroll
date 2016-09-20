// Backbone model (is like creating a class)
var Blog = Backbone.Model.extend({
  defaults: {
    author: '',
    title: '',
    url: ''
  }
});

var blog = new Blog(); // uses the defaults
var otherBlog = new Blog({
  author: 'John Doe',
  title: 'My First Entry',
  url: 'http://google.com/'
});
console.log(blog.toJSON());
console.log(otherBlog.toJSON());

// Backbone collection
var Blogs = Backbone.Collection.extend({});

var blogs = new Blogs([blog, otherBlog]);

// Backbone views

// view for one blog
var BlogView = Backbone.View.extend({
  model: new Blog(),
  tagName: 'tr', // this will be referred as $el
  initialize: function() {
    var blogsListTemplate = $('#blogs-list-template').html();
    // uses underscore template
    this.template = _.template(blogsListTemplate);
  },
  render: function() {
    this.$el.html(
      this.template({ model: this.model.toJSON() })
    );
  }
});

// view for all blogs
var BlogsView = Backbone.View.extend({
  model: blogs,
  el: $('.blogs-list'),
  initialize: function() {
    this.model.on('add', this.render(), this);
  },
  render: function() {
    var self = this;
    this.$el.html('');
    _.each(this.model, function(blog) {
      var newBlogView = new BlogView({ model: blog });
      self.$el.append(newBlogView.render().$el);
    });
  }
});
