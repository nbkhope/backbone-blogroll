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
