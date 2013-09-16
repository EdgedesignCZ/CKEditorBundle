CKEDITOR.plugins.add('cmsimagelink');
CKEDITOR.on('dialogDefinition', function(ev){
    var dialogName = ev.data.name;
    var dialogDefinition = ev.data.definition;

    if (dialogName == 'image'){
        var infoTab = dialogDefinition.getContents('info');
        var label = 'CMS Image Link';
        var images = [ ['',''] ];

        if (CKEDITOR.cmsimagelink){
            if (CKEDITOR.cmsimagelink.label) label = CKEDITOR.cmsimagelink.label;
            if (CKEDITOR.cmsimagelink.images) images = CKEDITOR.cmsimagelink.images;
        }

        infoTab.remove('cmbAlign');
        infoTab.remove('txtVSpace');
        infoTab.remove('txtHSpace');
        infoTab.remove('txtBorder');
        infoTab.remove('ratioLock');
        infoTab.remove('txtHeight');
        infoTab.remove('txtWidth');
//        infoTab.remove('htmlPreview');
        infoTab.get('htmlPreview').style="display: none";
        console.log(infoTab.get('htmlPreview'));
        console.log(infoTab);

        var values = [];
        for (var key in images) {
            values.push([images[key].title, key]);
        }

        infoTab.add(
            {
                type : 'select',
                id : 'cmsimagelink',
                label : label,
                'default' : '',
                style : 'width:30em',
                items : values,
                onChange : function(){
                    if (this.getValue() in images){
                        var d = CKEDITOR.dialog.getCurrent();
                        d.setValueOf('info', 'txtUrl', images[this.getValue()].url);
                        d.setValueOf('info', 'txtAlt', images[this.getValue()].description);
                    }
                },
                setup : function(data){
                    this.allowOnChange = false;
                    this.setValue(data.url ? data.url.url : '');
                    this.allowOnChange = true;
                }
            }
        );

        dialogDefinition.onLoad = function(){
            var internField = this.getContentElement( 'info', 'cmsimagelink' );
            internField.reset();
        };
    }
} );