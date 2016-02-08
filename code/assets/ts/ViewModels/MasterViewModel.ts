/// <reference path="../../../scripts/typings/jquery/jquery.d.ts" />
/// <reference path="../../../scripts/typings/knockout/knockout.d.ts" />

module Code.ViewModels {
    export class CodeViewModel {
		public posts = ko.observableArray([]);
		public commentForPost = ko.observableArray([]);
		public load = ko.observable(false);

		public getPosts = () => {
			this.load(true);

			$.ajax({
				url: 'http://jsonplaceholder.typicode.com/posts/',
				method: 'GET'
			}).then(data => {
				for (var i = 0; i < $(data).length; i++) {
					this.posts.push(data[i]);
				}

				this.load(false);
			});
		}

		public getCommentsForPost = (post) => {
			this.load(true);

			$.ajax({
				url: 'http://jsonplaceholder.typicode.com/comments?postId=' + post.id,
				method: 'GET'
			}).then(data => {
				this.commentForPost([]);

				for (var i = 0; i < $(data).length; i++) {
					this.commentForPost.push(data[i]);
				}

				this.load(false);
			});
		}
    }
}