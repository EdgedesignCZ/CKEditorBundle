CKEDITOR.plugins.add('cmsfilelink');
CKEDITOR.on('dialogDefinition', function(ev){
    var dialogName = ev.data.name;
    var dialogDefinition = ev.data.definition;

    if (dialogName == 'link'){
        var infoTab = dialogDefinition.getContents('info');
        var label = 'CMS File Link';
        var files = [ ['',''] ];

        if (CKEDITOR.cmsfilelink){
            if (CKEDITOR.cmsfilelink.label) label = CKEDITOR.cmsfilelink.label;
            if (CKEDITOR.cmsfilelink.files) files = CKEDITOR.cmsfilelink.files;
        }

        infoTab.add( {
            type : 'select',
            id : 'cmsfilelink',
            label : label,
            'default' : '',
            style : 'width:30em',
            items : files,
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
            var internField = this.getContentElement( 'info', 'cmsfilelink' );
            internField.reset();
        };
    }
} );