import _ from 'lodash';


const plugin = (editor) => {
  editor.on('init', function(e){
  	tinymce.activeEditor.schema.addValidElements( "svg[*],defs[*],pattern[*],desc[*],metadata[*],g[*],mask[*],path[*],line[*],marker[*],rect[*],circle[*],ellipse[*],polygon[*],polyline[*],linearGradient[*],radialGradient[*],stop[*],image[*],view[*],text[*],textPath[*],title[*],tspan[*],glyph[*],symbol[*],switch[*],use[*]");

  });	

      
  editor.addButton('drawingTool', {
  	
      image: '/svg/images/pencil.svg',
      onclick: function () {
          
        editor.windowManager.open({
        	
    		title: 'Drawing Tool',
        	url: '/svg/index.html',
   			width: 710,
   			height: 400,
			
   			buttons: [{
              text: 'Insert',
              disabled: false,
              id: 'insertButton',
              onclick: function() {
              	var wnd=document.getElementsByTagName("iframe");
				var wnd1=wnd[1].contentWindow;
				var bg=wnd1.svgCanvas.current_drawing_.all_layers[0];
				var wnd2=wnd1.svgCanvas.current_drawing_.all_layers[1];
              	
              	var widd=wnd2[1].getBBox().width;
              	var heig=wnd2[1].getBBox().height;
              	
              	wnd1.svgCanvas.current_drawing_.svgElem_.setAttribute("width",widd);
              	wnd1.svgCanvas.current_drawing_.svgElem_.setAttribute("height",heig);
              	bg[1].childNodes[1].setAttribute("width",widd);
              	bg[1].childNodes[1].setAttribute("height",heig);
              	
                
              	
              	wnd1.svgCanvas.selectAllInCurrentLayer();
                    wnd1.svgCanvas.groupSelectedElements();
                        wnd1.svgCanvas.alignSelectedElements('l','page');
                        wnd1.svgCanvas.alignSelectedElements('t','page');
                    wnd1.svgCanvas.ungroupSelectedElement();
                wnd1.svgCanvas.clearSelection();
              	
              	wnd1.svgCanvas.current_drawing_.svgElem_.setAttribute("padding",'2em');
              	wnd1.svgCanvas.setResolution('fit', 100);
              	var svg=wnd1.svgCanvas.getSvgString();
              	
              	
				var canvas = document.createElement( "canvas" );
              	
              	canvas.width = widd+4;
				canvas.height = heig+4;
              	
              	var ctx = canvas.getContext( "2d" );
              	
				var img = document.createElement( "img" );
				

				img.setAttribute( "src", "data:image/svg+xml;base64," + btoa( svg ) );
				
				img.onload = function() {
					ctx.drawImage( img, 0, 0 );
    				var p=canvas.toDataURL( "image/png" );
					tinyMCE.execCommand('mceInsertContent', false, "<img alt='"+svg+"' src='" + p + "'/>");
					tinyMCE.activeEditor.windowManager.close();
				};
              }
              
          	}]
          	
        });
        
        
      }
      
      
    });
    
  editor.on('DblClick', function (e) {
      if(e.target.tagName===("IMG"||"img")){
		  var svg= e.target.alt;
		  var count=0;
		  editor.windowManager.open({
        	
    		title: 'Drawing Tool',
        	url: '/svg/index.html',
   			width: 710,
   			height: 400,
   			onMouseOver: function () {
            	if(count==0){
	   				var wnd= document.getElementsByClassName("mce-container-body mce-window-body mce-abs-layout");
					var wnd1= wnd[0].firstElementChild.contentWindow;
					wnd1.svgCanvas.setSvgString(svg);
					count++;
				}
				
       		},
       		buttons: [{
              text: 'Insert',
              disabled: false,
              id: 'insertButton',
              onclick: function() {
              	var wnd=document.getElementsByTagName("iframe");
				var wnd1=wnd[1].contentWindow;
				var bg=wnd1.svgCanvas.current_drawing_.all_layers[0];
				var wnd2=wnd1.svgCanvas.current_drawing_.all_layers[1];
              	
              	var widd=wnd2[1].getBBox().width;
              	var heig=wnd2[1].getBBox().height;
              	
              	wnd1.svgCanvas.current_drawing_.svgElem_.setAttribute("width",widd);
              	wnd1.svgCanvas.current_drawing_.svgElem_.setAttribute("height",heig);
              	bg[1].childNodes[1].setAttribute("width",widd);
              	bg[1].childNodes[1].setAttribute("height",heig);
              	
                
              	
              	wnd1.svgCanvas.selectAllInCurrentLayer();
                    wnd1.svgCanvas.groupSelectedElements();
                        wnd1.svgCanvas.alignSelectedElements('l','page');
                        wnd1.svgCanvas.alignSelectedElements('t','page');
                    wnd1.svgCanvas.ungroupSelectedElement();
                wnd1.svgCanvas.clearSelection();
              	
              	wnd1.svgCanvas.current_drawing_.svgElem_.setAttribute("padding",'2em');
              	wnd1.svgCanvas.setResolution('fit', 100);
              	var svg=wnd1.svgCanvas.getSvgString();
              	
              	
				var canvas = document.createElement( "canvas" );
              	
              	canvas.width = widd+4;
				canvas.height = heig+4;
              	
              	var ctx = canvas.getContext( "2d" );
              	
				var img = document.createElement( "img" );
				

				img.setAttribute( "src", "data:image/svg+xml;base64," + btoa( svg ) );
				
				img.onload = function() {
					ctx.drawImage( img, 0, 0 );
    				var p=canvas.toDataURL( "image/png" );
					tinyMCE.execCommand('mceInsertContent', false, "<img alt='"+svg+"' src='" + p + "'/>");
					tinyMCE.activeEditor.windowManager.close();
				};
              }
              
          	}]
   			
   		});
   		
   	  }
   	  
  });
};

export default plugin;
