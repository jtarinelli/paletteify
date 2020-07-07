(this.webpackJsonppaletteify=this.webpackJsonppaletteify||[]).push([[0],{136:function(e,t){},177:function(e,t,a){"use strict";a.r(t);var r=a(0),n=a.n(r),l=a(68),s=a.n(l),o=(a(75),a(1)),i=a(2),c=a(12),u=a(4),m=a(3),p=a(8),d=a(5),h=(a(76),function(e){Object(u.a)(a,e);var t=Object(m.a)(a);function a(e){var r;return Object(o.a)(this,a),(r=t.call(this,e)).state={isLoaded:!1,data:null,error:!1,errorCode:null},r}return Object(i.a)(a,[{key:"componentDidMount",value:function(){var e=this,t=this.props.requestInfo,a=t.artistID,r=t.country,n=t.headers,l=t.handleErrors;fetch("https://api.spotify.com/v1/artists/".concat(a).concat("/top-tracks?country=".concat(r)),{headers:n}).then(l).then((function(e){return e.json()})).then((function(t){return e.setState({isLoaded:!0,data:t})})).catch((function(t){return e.setState({error:!0,errorCode:t.message})}))}},{key:"render",value:function(){var e=this.state,t=e.isLoaded,a=e.data,r=e.error,l=e.errorCode;return t&&!r?n.a.createElement("div",null,n.a.createElement("p",null,"Top Tracks"),n.a.createElement("ol",{className:"Top-tracks"},a.tracks.map((function(e,t){return n.a.createElement("li",{className:"Track",key:t},n.a.createElement("a",{href:e.external_urls.spotify},n.a.createElement("p",null,e.name)))})))):n.a.createElement("div",null,n.a.createElement("p",null,"Top Tracks"),r?n.a.createElement("p",null,"Error:  ",l):n.a.createElement("p",null,"..."))}}]),a}(r.Component)),f=function(e){Object(u.a)(a,e);var t=Object(m.a)(a);function a(e){var r;return Object(o.a)(this,a),(r=t.call(this,e)).state={isLoaded:!1,data:null,error:!1,errorCode:null},r}return Object(i.a)(a,[{key:"makeRequest",value:function(){var e=this,t=this.props.requestInfo,a=t.artistID,r=t.headers,n=t.handleErrors;fetch("https://api.spotify.com/v1/artists/".concat(a),{headers:r}).then(n).then((function(e){return e.json()})).then((function(t){return e.setState({isLoaded:!0,data:t})})).catch((function(t){return e.setState({error:!0,errorCode:t.message})}))}},{key:"componentDidMount",value:function(){this.makeRequest()}},{key:"componentDidUpdate",value:function(e){e!==this.props&&(this.makeRequest(),this.setState({isLoaded:!1,data:null,error:!1,errorCode:null}))}},{key:"render",value:function(){var e=this.state,t=e.isLoaded,a=e.data,r=e.error,l=e.errorCode,s=this.props.requestInfo;return t&&!r?n.a.createElement("header",{className:"App-header"},n.a.createElement("div",{className:"Artist-image"},n.a.createElement("img",{src:a.images[0].url,alt:a.name})),n.a.createElement("div",{className:"Artist-info"},n.a.createElement("h1",null,n.a.createElement("a",{href:a.external_urls.spotify},a.name)),n.a.createElement(h,{requestInfo:s}))):n.a.createElement("header",{className:"App-header Loading"},r?n.a.createElement("h1",null,"Error: ",l):n.a.createElement("h1",null,"Loading..."),r&&"401"!==l&&n.a.createElement("p",null,n.a.createElement("a",{href:"https://developer.spotify.com/documentation/web-api/"},"Status code info here")),r&&"401"===l&&n.a.createElement(p.b,{to:"/paletteify/"},n.a.createElement("p",null,"Unauthorized: Try logging in again")))}}]),a}(r.Component),b=a(81),v=function(e){Object(u.a)(a,e);var t=Object(m.a)(a);function a(e){var r;return Object(o.a)(this,a),(r=t.call(this,e)).state={colorsLoaded:!1,bgStyle:{backgroundImage:"white"},imageColors:[]},r}return Object(i.a)(a,[{key:"componentDidMount",value:function(){this.fetchColors(this.props.src)}},{key:"componentDidUpdate",value:function(e){this.props.numColors!==e.numColors&&this.fetchColors(this.props.src),this.props.display!==e.display&&this.displayMode(this.state.imageColors,this.props.display)}},{key:"displayMode",value:function(e,t){var a="",r=0;0===t?(a="linear-gradient(to bottom left, ",r=424/e.length):1===t?(a="linear-gradient(to right, ",r=300/e.length):2===t&&(e.push("white"),a="radial-gradient(circle, ",r=170/e.length);for(var n=0;n<e.length;n++)a+=e[n]+" "+r*n+"px,"+e[n]+" "+r*(n+1)+"px",n<e.length-1&&(a+=",");a+=")",2===t&&e.pop(),this.setState({bgStyle:{backgroundImage:a}})}},{key:"fetchColors",value:function(e){var t=this,a=this.props.grabColors,r=this.props,n=r.numColors,l=r.display;b(e,{count:n}).then((function(e){t.displayMode(e,l),t.setState({colorsLoaded:!0,imageColors:e}),null!=a&&a(e)}))}},{key:"render",value:function(){var e=this.props,t=e.src,a=e.alt,r=e.onHover;return n.a.createElement("div",{className:"Background",style:this.state.bgStyle},n.a.createElement("img",{className:r,src:t,alt:a}))}}]),a}(r.Component),y=function(e){Object(u.a)(a,e);var t=Object(m.a)(a);function a(){var e;Object(o.a)(this,a);for(var r=arguments.length,n=new Array(r),l=0;l<r;l++)n[l]=arguments[l];return(e=t.call.apply(t,[this].concat(n))).grabColors=function(t){(0,e.props.grabColors)(t)},e}return Object(i.a)(a,[{key:"render",value:function(){var e=this.props,t=e.name,a=e.image,r=e.url,l=e.numColors,s=e.display,o=e.onHover;return n.a.createElement("div",null,n.a.createElement(v,{src:a,alt:t,grabColors:this.grabColors,numColors:l,display:s,onHover:o}),n.a.createElement("p",null,n.a.createElement("a",{href:r},t)))}}]),a}(r.Component),E=function(e){Object(u.a)(a,e);var t=Object(m.a)(a);function a(e){var r;return Object(o.a)(this,a),(r=t.call(this,e)).toggleVisible=function(){r.setState((function(e){return{visible:!e.visible}}))},r.grabColors=function(e){var t=r.props.grabColors,a=r.props.numColors,n=r.state.colors,l=r.state.data.items.length;null===n?r.setState({colors:e}):r.setState({colors:n.concat(e)}),r.state.colors.length===l*a&&t(r.state.colors)},r.state={visible:r.props.visible,isLoaded:!1,data:null,colors:null,error:!1,errorCode:null},r}return Object(i.a)(a,[{key:"makeRequest",value:function(){var e=this,t=this.props.requestInfo,a=t.artistID,r=t.country,n=t.headers,l=t.handleErrors,s=this.props.group;fetch("https://api.spotify.com/v1/artists/".concat(a).concat("/albums?include_groups=".concat(s).concat("&market=").concat(r)),{headers:n}).then(l).then((function(e){return e.json()})).then((function(t){return e.setState({isLoaded:!0,data:t})})).catch((function(t){return e.setState({error:!0,errorCode:t.message})}))}},{key:"componentDidMount",value:function(){this.makeRequest()}},{key:"componentDidUpdate",value:function(e){this.props.requestInfo!==e.requestInfo&&(this.makeRequest(),this.setState({isLoaded:!1,data:null,colors:null,error:!1,errorCode:null})),this.props.numColors!==e.numColors&&this.setState({colors:null})}},{key:"render",value:function(){var e=this,t=this.props,a=t.title,r=t.numColors,l=t.display,s=t.onHover,o=this.state,i=o.visible,c=o.isLoaded,u=o.data,m=o.error,p=o.errorCode;return c&&0===u.items.length?null:c&&!m?n.a.createElement("div",null,n.a.createElement("button",{onClick:this.toggleVisible,className:"h2-button"},n.a.createElement("h2",null,a)),n.a.createElement("div",{className:"Albums "+(i?"visible":"hidden")},u.items.map((function(t,a){return n.a.createElement("div",{className:"Album",key:a},n.a.createElement(y,{name:t.name,image:t.images[1].url,url:t.external_urls.spotify,grabColors:e.grabColors,numColors:r,display:l,onHover:s}))})))):n.a.createElement("div",null,n.a.createElement("button",{onClick:this.toggleVisible,className:"h2-button"},n.a.createElement("h2",null,a)),n.a.createElement("div",{className:"Albums "+(i?"visible":"hidden")},m?n.a.createElement("p",null,"Error:  ",p):n.a.createElement("p",null,"...")))}}]),a}(r.Component),g=function(e){Object(u.a)(a,e);var t=Object(m.a)(a);function a(e){var r;return Object(o.a)(this,a),(r=t.call(this,e)).grabColors=function(e){var t=r.props.grabColors,a=r.state.colors,n=r.state.sectionsLoaded;null===a?r.setState({colors:e,sectionsLoaded:1}):r.setState({colors:a.concat(e),sectionsLoaded:n+1}),2===r.state.sectionsLoaded&&t(r.state.colors)},r.state={colors:null,sectionsLoaded:0},r}return Object(i.a)(a,[{key:"componentDidUpdate",value:function(e){this.props.requestInfo===e.requestInfo&&this.props.numColors===e.numColors||this.setState({colors:null,sectionsLoaded:0})}},{key:"render",value:function(){var e=this.props,t=e.requestInfo,a=e.numColors,r=e.display,l=e.onHover;return n.a.createElement("section",{className:"Albums-Singles"},n.a.createElement(E,{group:"album",title:"Albums",visible:!0,grabColors:this.grabColors,requestInfo:t,numColors:a,display:r,onHover:l}),n.a.createElement(E,{group:"single",title:"Singles and EPs",visible:!1,grabColors:this.grabColors,requestInfo:t,numColors:a,display:r,onHover:l}))}}]),a}(r.Component),C=function(e){Object(u.a)(a,e);var t=Object(m.a)(a);function a(e){var r;return Object(o.a)(this,a),(r=t.call(this,e)).toggleVisible=function(){r.props.alwaysOpen||r.setState((function(e){return{visible:!e.visible}}))},r.state={visible:r.props.alwaysOpen},r}return Object(i.a)(a,[{key:"render",value:function(){var e=this.state.visible,t=this.props,a=t.title,r=t.labels,l=t.params,s=t.funct,o=t.tooltip,i=t.className,c=t.alwaysOpen,u=t.selected;return n.a.createElement("div",{className:"Dropdown",onMouseEnter:this.toggleVisible,onMouseLeave:this.toggleVisible},c?n.a.createElement("p",null,a):n.a.createElement("div",{className:i,title:o},a),n.a.createElement("ul",{className:"Dropdown-content "+(e?"visible":"hidden")},r.map((function(e,t){return n.a.createElement("li",{key:t},n.a.createElement("button",{className:u===l[t]?"Dropdown-option Selected":"Dropdown-option",onClick:function(){return s(l[t])}},e))}))))}}]),a}(r.Component),k=function(e){Object(u.a)(a,e);var t=Object(m.a)(a);function a(e){var r;return Object(o.a)(this,a),(r=t.call(this,e)).toggleVisible=function(){r.setState((function(e){return{visible:!e.visible}}))},r.updateNumColors=function(e){r.props.grabNumColors(e),r.setState({numColors:e})},r.updateDisplay=function(e){r.props.grabDisplay(e),r.setState({display:e})},r.updateOnHover=function(e){r.props.grabOnHover(e),r.setState({onHover:e})},r.state={numColors:5,display:0,onHover:"Disappears"},r}return Object(i.a)(a,[{key:"render",value:function(){var e=[1,2,3,4,5,6,7],t=this.state,a=t.numColors,r=t.display,l=t.onHover;return n.a.createElement("div",{className:"Options"},n.a.createElement(C,{title:"#",labels:e,params:e,funct:this.updateNumColors,tooltip:"Number of colors per album",className:"h2-button",selected:a}),n.a.createElement(C,{title:"\u2610",labels:["Album Art","Color Palette"],params:["Disappears","Appears"],funct:this.updateOnHover,tooltip:"Display by default",className:"h2-button",selected:l}),n.a.createElement(C,{title:"//",labels:["Diagonal","Vertical","Target"],params:[0,1,2],funct:this.updateDisplay,tooltip:"Album colors display style",className:"h2-button",selected:r}))}}]),a}(r.Component),S=function(e){Object(u.a)(a,e);var t=Object(m.a)(a);function a(){return Object(o.a)(this,a),t.apply(this,arguments)}return Object(i.a)(a,[{key:"render",value:function(){var e=this.props.bgColor;return n.a.createElement("div",{className:"Dot",style:{backgroundColor:e}})}}]),a}(r.Component),O=function(e){Object(u.a)(a,e);var t=Object(m.a)(a);function a(e){var r;return Object(o.a)(this,a),(r=t.call(this,e)).sortColors=function(e,t,a){a?e.sort((function(e,a){return e.hsl()[t]-a.hsl()[t]})):e.sort((function(e,a){return a.hsl()[t]-e.hsl()[t]}))},r.makeBins=function(e,t,a){var n=[[]],l=n[0];0===a&&(n[0]=e.filter((function(e){return Number.isNaN(e.hsl()[0])})),l=[],n.push(l),t-=1,e=e.filter((function(e){return!Number.isNaN(e.hsl()[0])}))),r.sortColors(e,a,!1);var s=e[0].hsl()[a],o=(s-e[e.length-1].hsl()[a])/t,i=s-o;return e.forEach((function(e){e.hsl()[a]>i?l.push(e):(i-=o,l=[e],n.push(l))})),n},r.updateNumBins=r.updateNumBins.bind(Object(c.a)(r)),r.updatePrimarySort=r.updatePrimarySort.bind(Object(c.a)(r)),r.updateSecondarySort=r.updateSecondarySort.bind(Object(c.a)(r)),r.state={numBins:14,primarySort:0,secondarySort:1},r}return Object(i.a)(a,[{key:"updatePrimarySort",value:function(e){this.setState({primarySort:e})}},{key:"updateSecondarySort",value:function(e){this.setState({secondarySort:e})}},{key:"updateNumBins",value:function(e){this.setState({numBins:e})}},{key:"render",value:function(){var e=this,t=this.props.colors,a=this.state,r=a.numBins,l=a.primarySort,s=a.secondarySort,o=[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14],i=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],c=["Hue","Saturation","Lightness"],u=[{backgroundImage:"linear-gradient(to right, white, magenta, purple, blue, green, yellow, orange, red)"},{backgroundImage:"linear-gradient(to right, #47d8ff, gray)"},{backgroundImage:"linear-gradient(to right, white, #47d8ff, black)"}];if(null===t)return n.a.createElement("section",{className:"Colors"},n.a.createElement("h2",null,"Colors"),n.a.createElement("div",{className:"Sorting-options"},n.a.createElement(C,{className:"p-button",title:"Max Number of Bins:",labels:i,params:o,funct:this.updateNumBins,selected:r,alwaysOpen:!0}),n.a.createElement("br",null),n.a.createElement(C,{className:"p-button",title:"Primary Sort:",labels:c,params:[0,1,2],funct:this.updatePrimarySort,selected:l,alwaysOpen:!0}),n.a.createElement("br",null),n.a.createElement(C,{className:"p-button",title:"Secondary Sort:",labels:c,params:[0,1,2],funct:this.updateSecondarySort,selected:s,alwaysOpen:!0}),n.a.createElement("br",null)),n.a.createElement("div",{className:"Gradient",style:u[l]}));var m=this.makeBins(t,r,l);return m.forEach((function(t){e.sortColors(t,s,!1)})),n.a.createElement("section",{className:"Colors"},n.a.createElement("h2",null,"Colors"),n.a.createElement("div",{className:"Sorting-options"},n.a.createElement(C,{className:"p-button",title:"Max Number of Bins:",labels:i,params:o,funct:this.updateNumBins,selected:r,alwaysOpen:!0}),n.a.createElement("br",null),n.a.createElement(C,{className:"p-button",title:"Primary Sort:",labels:c,params:[0,1,2],funct:this.updatePrimarySort,selected:l,alwaysOpen:!0}),n.a.createElement("br",null),n.a.createElement(C,{className:"p-button",title:"Secondary Sort:",labels:c,params:[0,1,2],funct:this.updateSecondarySort,selected:s,alwaysOpen:!0}),n.a.createElement("br",null)),n.a.createElement("div",{className:"Gradient",style:u[l]}),n.a.createElement("div",{className:"Dots"},m.map((function(e,t){return n.a.createElement("div",{className:"Bin",key:t},e.map((function(e,t){return n.a.createElement(S,{key:t,bgColor:e})})))}))))}}]),a}(r.Component),N=function(e){Object(u.a)(a,e);var t=Object(m.a)(a);function a(e){var r;return Object(o.a)(this,a),(r=t.call(this,e)).grabColors=function(e){r.setState({colors:e})},r.grabNumColors=function(e){r.setState({numColors:e})},r.grabDisplay=function(e){r.setState({display:e})},r.grabOnHover=function(e){r.setState({onHover:e})},r.state={colors:null,numColors:5,display:0,onHover:"Disappears"},r}return Object(i.a)(a,[{key:"render",value:function(){var e=this.state.colors,t=this.props.requestInfo,a=this.state,r=a.numColors,l=a.display,s=a.onHover;return n.a.createElement("div",{className:"Body"},n.a.createElement(k,{grabNumColors:this.grabNumColors,grabDisplay:this.grabDisplay,grabOnHover:this.grabOnHover}),n.a.createElement(g,{grabColors:this.grabColors,requestInfo:t,numColors:r,display:l,onHover:s}),n.a.createElement(O,{colors:e}))}}]),a}(r.Component),j=function(e){Object(u.a)(a,e);var t=Object(m.a)(a);function a(e){var r;return Object(o.a)(this,a),(r=t.call(this,e)).toggleVisible=function(){r.setState((function(e){return{visible:!e.visible}}))},r.grabColors=function(e){var t=r.state.colors;null===t?r.setState({colors:e}):r.setState({colors:t.concat(e)})},r.grabNumColors=function(e){r.setState({numColors:e})},r.grabDisplay=function(e){r.setState({display:e})},r.grabOnHover=function(e){r.setState({onHover:e})},r.makeAlbums=r.makeAlbums.bind(Object(c.a)(r)),r.state={isLoaded:!1,data:null,albums:{},numColors:5,display:0,onHover:"Disappears",colors:null,error:!1,errorCode:null,visible:!0},r}return Object(i.a)(a,[{key:"makeAlbums",value:function(){var e=this.state,t=e.data,a=e.albums;t.tracks.items.forEach((function(e){var t=e.track;t.is_local||(null!=a[t.album.id]?a[t.album.id].tracks.push({name:t.name,url:t.external_urls.spotify}):a[t.album.id]={name:t.album.name,url:t.album.external_urls.spotify,image:t.album.images[1],artists:t.album.artists,tracks:[{name:t.name,url:t.external_urls.spotify}]})}))}},{key:"makeRequest",value:function(){var e=this,t=this.props.requestInfo,a=t.playlistID,r=t.headers,n=t.handleErrors;fetch("https://api.spotify.com/v1/playlists/".concat(a),{headers:r}).then(n).then((function(e){return e.json()})).then((function(t){return e.setState({data:t})})).catch((function(t){return e.setState({error:!0,errorCode:t.message})}))}},{key:"componentDidMount",value:function(){this.makeRequest()}},{key:"componentDidUpdate",value:function(e,t){e!==this.props&&(this.makeRequest(),this.setState({isLoaded:!1,data:null,colors:null,albums:{},error:!1,errorCode:null})),t.data!==this.state.data&&null!=this.state.data&&!1===this.state.isLoaded&&(this.makeAlbums(),this.setState({isLoaded:!0})),t.numColors!==this.state.numColors&&this.setState({colors:null})}},{key:"render",value:function(){var e=this,t=this.state,a=t.isLoaded,r=t.data,l=t.colors,s=t.numColors,o=t.onHover,i=t.display,c=t.error,u=t.errorCode,m=t.visible,d=Object.values(this.state.albums);return a&&!c?n.a.createElement("div",null,n.a.createElement("header",{className:"App-header"},n.a.createElement("div",{className:"Playlist-image"},n.a.createElement("img",{src:r.images[0].url,alt:r.name})),n.a.createElement("div",{className:"Playlist-info"},n.a.createElement("h1",null,n.a.createElement("a",{href:r.external_urls.spotify},r.name)),n.a.createElement("p",{className:"Playlist-description"},r.description),n.a.createElement("p",null,n.a.createElement("a",{href:r.owner.external_urls.spotify},r.owner.display_name)))),n.a.createElement("div",{className:"Playlist-body"},n.a.createElement(k,{grabNumColors:this.grabNumColors,grabDisplay:this.grabDisplay,grabOnHover:this.grabOnHover}),n.a.createElement("div",{className:"Albums-Singles"},n.a.createElement("button",{className:"h2-button",onClick:this.toggleVisible},n.a.createElement("h2",null,"Albums")),n.a.createElement("div",{className:"Albums "+(m?"visible":"hidden")},d.map((function(t,a){return n.a.createElement("div",{className:"Album",key:a},n.a.createElement(y,{name:t.name,image:t.image.url,url:t.url,grabColors:e.grabColors,numColors:s,display:i,onHover:o}),n.a.createElement("p",null,n.a.createElement(p.b,{to:"/paletteify/artist/"+t.artists[0].id},t.artists[0].name)),n.a.createElement("ul",null,t.tracks.map((function(e,t){return n.a.createElement("li",{key:t},n.a.createElement("a",{href:e.url},e.name))}))))})))),n.a.createElement(O,{colors:l}))):n.a.createElement("header",{className:"App-header Loading"},c?n.a.createElement("h1",null,"Error: ",u):n.a.createElement("h1",null,"Loading..."),c&&"401"!==u&&n.a.createElement("p",null,n.a.createElement("a",{href:"https://developer.spotify.com/documentation/web-api/"},"Status code info here")),c&&"401"===u&&n.a.createElement(p.b,{to:"/paletteify/"},n.a.createElement("p",null,"Unauthorized: Try logging in again")))}}]),a}(r.Component),D=function(e){Object(u.a)(a,e);var t=Object(m.a)(a);function a(e){var r;return Object(o.a)(this,a),(r=t.call(this,e)).toggleVisible=function(){r.setState((function(e){return{visible:!e.visible}}))},r.state={isLoaded:!1,data:null,errorCode:null,visible:!0},r}return Object(i.a)(a,[{key:"makeRequest",value:function(){var e=this,t=this.props.requestInfo,a=t.handleErrors,r=t.token,n={Authorization:"Bearer ".concat(r)};fetch("https://api.spotify.com/v1/me/playlists",{headers:n}).then(a).then((function(e){return e.json()})).then((function(t){return e.setState({data:t})})).catch((function(t){return e.setState({error:!0,errorCode:t.message})}))}},{key:"componentDidMount",value:function(){this.makeRequest()}},{key:"componentDidUpdate",value:function(e){e!==this.props&&this.makeRequest()}},{key:"render",value:function(){var e=this.state,t=e.data,a=e.error,r=e.errorCode,l=e.visible;return null===t||a?n.a.createElement("div",null,a?n.a.createElement("h2",null,"Error: ",r):n.a.createElement("h2",null,"Loading...")):(console.log(t),n.a.createElement("div",null,n.a.createElement("button",{className:"h2-button",onClick:this.toggleVisible},n.a.createElement("h2",null,"Playlists")),n.a.createElement("ul",{className:"Playlists "+(l?"visible":"hidden")},t.items.map((function(e,t){return n.a.createElement("li",{key:t},n.a.createElement("p",null,n.a.createElement(p.b,{to:"/paletteify/playlist/"+e.id},e.name)))})))))}}]),a}(r.Component),I=function(e){Object(u.a)(a,e);var t=Object(m.a)(a);function a(e){var r;return Object(o.a)(this,a),(r=t.call(this,e)).state={isLoaded:!1,data:null,errorCode:null},r}return Object(i.a)(a,[{key:"makeRequest",value:function(){var e=this,t=this.props.handleErrors,a={Authorization:"Bearer ".concat(this.props.token)};fetch("https://api.spotify.com/v1/me",{headers:a}).then(t).then((function(e){return e.json()})).then((function(t){return e.setState({data:t})})).catch((function(t){return e.setState({error:!0,errorCode:t.message})}))}},{key:"componentDidMount",value:function(){this.makeRequest()}},{key:"componentDidUpdate",value:function(e){e!==this.props&&this.makeRequest()}},{key:"render",value:function(){var e=this.state,t=e.data,a=e.error,r=e.errorCode,l={handleErrors:this.props.handleErrors,token:this.props.token};return null===t||a?n.a.createElement("header",{className:"App-header Loading"},a?n.a.createElement("h1",null,"Error: ",r):n.a.createElement("h1",null,"Loading...")):n.a.createElement("div",null,n.a.createElement("header",{className:"App-header"},n.a.createElement("div",{className:"Playlist-image"},n.a.createElement("img",{src:t.images[0].url,alt:t.name})),n.a.createElement("div",{className:"Playlist-info"},n.a.createElement("a",{href:t.external_urls.spotify},n.a.createElement("h1",null,t.display_name)))),n.a.createElement("div",null,n.a.createElement(D,{requestInfo:l})))}}]),a}(r.Component),L=["playlist-read-private"],w=window.location.hash.substring(1).split("&").reduce((function(e,t){if(t){var a=t.split("=");e[a[0]]=decodeURIComponent(a[1])}return e}),{});function q(e){if(!e.ok)throw Error(e.status);return e}window.location.hash="";var A=function(e){Object(u.a)(a,e);var t=Object(m.a)(a);function a(e){var r;return Object(o.a)(this,a),(r=t.call(this,e)).toggleVisible=function(){r.setState((function(e){return{visible:!e.visible}}))},r.artistChange=r.artistChange.bind(Object(c.a)(r)),r.playlistChange=r.playlistChange.bind(Object(c.a)(r)),r.state={artistID:"",playlistID:"",visible:!0},r}return Object(i.a)(a,[{key:"artistChange",value:function(e){this.setState({artistID:e.target.value})}},{key:"playlistChange",value:function(e){this.setState({playlistID:e.target.value})}},{key:"render",value:function(){var e=this.state.visible;return n.a.createElement("div",null,n.a.createElement("div",{className:"Menu "+(e?"visible":"hidden")},n.a.createElement("label",null,"Enter artist ID: ",n.a.createElement("input",{type:"text",value:this.state.artistID,onChange:this.artistChange})),n.a.createElement(p.b,{to:"/paletteify/artist/"+this.state.artistID},">>"),n.a.createElement("label",null,"Enter playlist ID: ",n.a.createElement("input",{type:"text",value:this.state.playlistID,onChange:this.playlistChange})),n.a.createElement(p.b,{to:"/paletteify/playlist/"+this.state.playlistID},">>")))}}]),a}(r.Component);function H(){return n.a.createElement("div",{className:"Menu"},n.a.createElement(p.b,{to:"/paletteify/"},"Home"),n.a.createElement(A,null),n.a.createElement(p.b,{to:"/paletteify/me"},"My Profile"))}function B(e){return n.a.createElement("header",{className:"App-header Loading Cover"},n.a.createElement("h1",{className:"Bigboi"},"Paletteify"),n.a.createElement("h2",{className:"Login-button"},n.a.createElement("a",{href:"https://accounts.spotify.com/authorize?client_id=".concat("a4e61050459f4f3cbac28ccd3826f37a","&redirect_uri=").concat("https://jtarinelli.github.io/paletteify/me","&response_type=token&scope=").concat(L)},"Login to Spotify")),null!==e.token&&n.a.createElement("p",null,n.a.createElement(p.b,{to:"paletteify/me"},"My Profile")),null!==e.token&&n.a.createElement(A,null))}function M(e){var t={playlistID:Object(d.f)().playlistID,country:"US",headers:{Authorization:"Bearer ".concat(e.token)},handleErrors:q};return n.a.createElement("div",null,n.a.createElement(j,{requestInfo:t}))}function P(e){var t={artistID:Object(d.f)().artistID,country:"US",headers:{Authorization:"Bearer ".concat(e.token)},handleErrors:q};return n.a.createElement("div",null,n.a.createElement(f,{requestInfo:t}),n.a.createElement(N,{requestInfo:t}))}var _=function(e){Object(u.a)(a,e);var t=Object(m.a)(a);function a(e){var r;Object(o.a)(this,a),r=t.call(this,e);var n=localStorage.getItem("token");return r.state={token:n},r}return Object(i.a)(a,[{key:"componentDidMount",value:function(){var e=w.access_token;console.log(e),e&&(this.setState({token:e}),localStorage.setItem("token",e))}},{key:"render",value:function(){var e=this.state.token;return n.a.createElement("div",{className:"App"},n.a.createElement(p.a,null,n.a.createElement(d.c,null,n.a.createElement(d.a,{path:"/paletteify/artist/:artistID"},n.a.createElement(H,null),n.a.createElement(P,{token:e})),n.a.createElement(d.a,{path:"/paletteify/playlist/:playlistID"},n.a.createElement(H,null),n.a.createElement(M,{token:e})),n.a.createElement(d.a,{path:"/paletteify/me"},n.a.createElement(H,null),n.a.createElement(I,{token:e})),n.a.createElement(d.a,{path:"/paletteify/"},n.a.createElement(B,{token:e,handleErrors:q})))))}}]),a}(r.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(n.a.createElement(n.a.StrictMode,null,n.a.createElement(_,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},70:function(e,t,a){e.exports=a(177)},75:function(e,t,a){},76:function(e,t,a){},97:function(e,t){},99:function(e,t){}},[[70,1,2]]]);
//# sourceMappingURL=main.5ed3416f.chunk.js.map