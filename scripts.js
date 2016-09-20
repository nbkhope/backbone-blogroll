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
    var blogsListTemplate = $('.blogs-list-template').html();
    // uses underscore template
    this.template = _.template(blogsListTemplate);
  },
  render: function() {
    this.$el.html(
      this.template(this.model.toJSON())
    );

    return this;
  }
});

// view for all blogs
var BlogsView = Backbone.View.extend({
  model: blogs,
  el: $('.blogs-list'),
  initialize: function() {
    this.model.on('add', this.render, this);
  },
  render: function() {
    var self = this;

    this.$el.html('');
    _.each(this.model.toArray(), function(blog) {
      var newBlogView = new BlogView({ model: blog });
      self.$el.append(newBlogView.render().$el);
    });

    return this;
  }
});

var blogsView = new BlogsView();

$(document).ready(function() {
  // Add event listener to 'Add' button
  $('.add-blog').on('click', function() {
    // Create new blogroll entry
    var blog = new Blog({
      author: $('.author-input').val(),
      title: $('.title-input').val(),
      url: $('.url-input').val()
    });
    console.log("New blogroll entry added!", blog.toJSON());
    // Add new blog entry to the collection of `blogs`
    blogs.add(blog);

    // Clear the form
    clearForm();
  });
});

/**
 * Clears up all the fields in the new blogroll entry form
 */
function clearForm() {
  var fields = ['.author-input', '.title-input', '.url-input'];

  fields.forEach(function(field) {
    $(field).val('');
  });
}
