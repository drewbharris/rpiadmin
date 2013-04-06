var Application = {
	setup: function(){
		this.setupPolling();
		if (!window.location.hash.length){
			this.setActive('#home');
			return this.renderContent('#home');
		}
		this.setActive(window.location.hash);
		return this.renderContent(window.location.hash);
	},
	setupPolling: function(){
		this.pollingInterval = setInterval(this.updateStatistics, 30000);
	},
	updateStatistics: function(){
		$.get('/api/v1/system/statistics', function(data){
			$("#cpu").text(data.cpu_usage);
			$("#memory").text(data.mem_usage);
		});
	},
	setActive: function(hash){
		$(hash + "-link").addClass('active');
	},
	renderContent: function(hash){
		console.log(hash);
	}
};

Application.setup();
