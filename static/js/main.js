var Application = {
	route: function(){
		if (!window.location.hash.length){
			this.setActive('#home');
			return this.renderContent('#home');
		}
		this.setActive(window.location.hash);
		return this.renderContent(window.location.hash);
	},
	setActive: function(hash){
		$(hash + "-link").addClass('active');
	},
	renderContent: function(hash){
		console.log(hash);
	}
};

Application.route();
