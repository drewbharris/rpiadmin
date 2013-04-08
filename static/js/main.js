var Application = {
    setup: function(){

        this.setupPolling();

        $(".alert").alert();

        $("#force-stats-refresh").on('click', function(){
            this.updateStatistics();
        }.bind(this));

        $("#shutdown").on('click', function(){
            $("#header-alerts").append('<div class="alert manage-alert fade in">' +
                '<button type="button" class="close" id="shutdown-alert" data-dismiss="alert">&times;</button>' +
                'Shutting down...' +
              '</div>');
            setTimeout(function(){
                $("#shutdown-alert").alert('close');
            }, 2000);
            // $.post('/api/v1/system/shutdown');
        });

        $("#reboot").on('click', function(){
            $("#header-alerts").append('<div class="alert manage-alert fade in">' +
                '<button type="button" class="close" id="reboot-alert" data-dismiss="alert">&times;</button>' +
                'Rebooting...' +
              '</div>');
            setTimeout(function(){
                $("#reboot-alert").alert('close');
            }, 2000);
            // $.post('/api/v1/system/reboot');
        });

        $("#launch-xbmc").on('click', function(){
            $("#header-alerts").append('<div class="alert manage-alert fade in">' +
                '<button type="button" class="close" id="launch-xbmc-alert" data-dismiss="alert">&times;</button>' +
                'Launching XBMC...' +
              '</div>');
            setTimeout(function(){
                $("#launch-xbmc-alert").alert('close');
            }, 2000);
            $.post('/api/v1/launch/xbmc');
        });

        $("#launch-emulationstation").on('click', function(){
            $("#header-alerts").append('<div class="alert manage-alert fade in">' +
                '<button type="button" class="close" id="launch-emulationstation-alert" data-dismiss="alert">&times;</button>' +
                'Launching EmulationStation...' +
              '</div>');
            setTimeout(function(){
                $("#launch-emulationstation-alert").alert('close');
            }, 2000);
            $.post('/api/v1/launch/emulationstation');
        });

        $("#start-transmission").on('click', function(){
            $("#header-alerts").append('<div class="alert manage-alert fade in">' +
                '<button type="button" class="close" id="start-transmission-alert" data-dismiss="alert">&times;</button>' +
                'Starting Transmission...' +
              '</div>');
            setTimeout(function(){
                $("#start-transmission-alert").alert('close');
            }, 2000);
        });

        $("#stop-transmission").on('click', function(){
            $("#header-alerts").append('<div class="alert manage-alert fade in">' +
                '<button type="button" class="close" id="stop-transmission-alert" data-dismiss="alert">&times;</button>' +
                'Stopping Transmission...' +
              '</div>');
            setTimeout(function(){
                $("#stop-transmission-alert").alert('close');
            }, 2000);
        });

        $("#restart-transmission").on('click', function(){
            $("#header-alerts").append('<div class="alert manage-alert fade in">' +
                '<button type="button" class="close" id="restart-transmission-alert" data-dismiss="alert">&times;</button>' +
                'Restarting Transmission...' +
              '</div>');
            setTimeout(function(){
                $("#restart-transmission-alert").alert('close');
            }, 2000);
        });

        $("#import-roms").on('click', function(){
            $("#header-alerts").append('<div class="alert manage-alert fade in">' +
                '<button type="button" class="close" id="import-roms-alert" data-dismiss="alert">&times;</button>' +
                'Importing ROMs...' +
              '</div>');
            setTimeout(function(){
                $("#import-roms-alert").alert('close');
            }, 2000);
        });

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
            $("#uptime").text(data.uptime);
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
