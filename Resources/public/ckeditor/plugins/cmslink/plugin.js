CKEDITOR.plugins.add('cmslink');
CKEDITOR.on('dialogDefinition', function(ev){
    var dialogName = ev.data.name;
    var dialogDefinition = ev.data.definition;
    var label = 'CMS Link';
    var pages = [ ['',''] ];

    if (CKEDITOR.cmslink){
        if (CKEDITOR.cmslink.label) label = CKEDITOR.cmslink.label;
        if (CKEDITOR.cmslink.pages) pages = CKEDITOR.cmslink.pages;
    }

    if (dialogName == 'link'){
        var infoTab = dialogDefinition.getContents('info');

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

    // ====================================
    // Add CMS links also to Image dialog
    // ====================================
    if (dialogName == 'image'){
        var imgLinkTab = dialogDefinition.getContents('Link');

        imgLinkTab.add({
            type : 'vbox',
            id : 'cmsLinkBox',
            children : [{
                type : 'select',
                id : 'cmslink',
                style : 'width:30em',
                label : label,
                items : pages,
                onChange : function(){
                    var d = CKEDITOR.dialog.getCurrent();
                    d.setValueOf('Link', 'txtUrl', this.getValue());
                    // d.setValueOf('info', 'protocol', !this.getValue() ? 'http://' : '');
                },
                setup : function(data){
                    this.allowOnChange = false;
                    this.setValue(data.url ? data.url.url : '');
                    this.allowOnChange = true;
                }
            }]
        });
    }
});