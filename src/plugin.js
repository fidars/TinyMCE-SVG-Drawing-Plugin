import _ from 'lodash';

const plugin = (editor, url) => {
  editor.addButton('drawingTool', {
  	
      image: '/svg/images/pencil.svg',
      onclick: function () {
      	
        editor.windowManager.open({
        	
    		title: 'Drawing Tool',
        	url: '/svg/index.html',
   			width: 900,
   			height: 600,
			
   			buttons: [{
              text: 'Insert',
              disabled: false,
              id: 'insertButton',
              onclick: function() {
              	var wnd= document.getElementsByClassName("mce-container-body mce-window-body mce-abs-layout");
				var wnd1=wnd[0].getElementsByTagName("iframe");
				var wnd2=wnd1[0].contentDocument.body;
				var wnd3=wnd2.getElementsByClassName("svgWorkingArea");
				var svg=wnd3.svgcanvas.children["svgroot"].children[1];
				
				var svgData = new XMLSerializer().serializeToString( svg );
				var canvas = document.createElement( "canvas" );
				var svgSize = svg.getBoundingClientRect();
				
				
				canvas.width = svgSize.width;
				canvas.height = svgSize.height;
				
				var ctx = canvas.getContext( "2d" );

				var img = document.createElement( "img" );
				img.setAttribute( "src", "data:image/svg+xml;base64," + btoa( svgData ) );

				img.onload = function() {
    				ctx.drawImage( img, 0, 0 );
    				var p=canvas.toDataURL( "image/png" );
					tinyMCE.execCommand('mceInsertContent', false, '<img alt="original" src="' + img.src + '"/>');
					tinyMCE.activeEditor.windowManager.close();
				};
				
              }
              
          	}]
          	
        });
      }
    });
  
};

export default plugin;
