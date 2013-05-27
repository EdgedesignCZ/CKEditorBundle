CKEDITOR.plugins.add('cmslink');
CKEDITOR.on('dialogDefinition', function(ev){
    var dialogName = ev.data.name;
    var dialogDefinition = ev.data.definition;

    if (dialogName == 'link'){
        var infoTab = dialogDefinition.getContents('info');
        var label = 'CMS Link';
        var pages = [ ['',''] ];

        if (CKEDITOR.cmslink){
            if (CKEDITOR.cmslink.label) label = CKEDITOR.cmslink.label;
            if (CKEDITOR.cmslink.pages) pages = CKEDITOR.cmslink.pages;
        }

        infoTab.add( {
            type : 'select',
            id : 'cmslink',
            label : label,
            'default' : '',
            style : 'width:30em',
            items : pages,
            onChange : function(){
                var d = CKEDITOR.dialog.getCurrent();
                d.setValueOf('info', 'url', this.getValue());
                d.setValueOf('info', 'protocol', !this.getValue() ? 'http://' : '');
            },
            setup : function(data){
                this.allowOnChange = false;
                this.setValue(data.url ? data.url.url : '');
                this.allowOnChange = true;
            }
        }, 'browse' );

        dialogDefinition.onLoad = function(){
            var internField = this.getContentElement( 'info', 'cmslink' );
            internField.reset();
        };
    }
} );