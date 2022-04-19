"use strict";(self.webpackChunkeffective_shell=self.webpackChunkeffective_shell||[]).push([[7918],{9979:function(e,t,a){a.r(t),a.d(t,{default:function(){return ke}});var n=a(7294),l=a(6010),r=a(7462),i=a(7325),s=a(3699);function c(e){var t=e.permalink,a=e.title,l=e.subLabel;return n.createElement(s.Z,{className:"pagination-nav__link",to:t},l&&n.createElement("div",{className:"pagination-nav__sublabel"},l),n.createElement("div",{className:"pagination-nav__label"},a))}function o(e){var t=e.previous,a=e.next;return n.createElement("nav",{className:"pagination-nav docusaurus-mt-lg","aria-label":(0,i.I)({id:"theme.docs.paginator.navAriaLabel",message:"Docs pages navigation",description:"The ARIA label for the docs pagination"})},n.createElement("div",{className:"pagination-nav__item"},t&&n.createElement(c,(0,r.Z)({},t,{subLabel:n.createElement(i.Z,{id:"theme.docs.paginator.previous",description:"The label used to navigate to the previous doc"},"Previous")}))),n.createElement("div",{className:"pagination-nav__item pagination-nav__item--next"},a&&n.createElement(c,(0,r.Z)({},a,{subLabel:n.createElement(i.Z,{id:"theme.docs.paginator.next",description:"The label used to navigate to the next doc"},"Next")}))))}var m=a(9962),d=a(6070),u=a(7633);var v={unreleased:function(e){var t=e.siteTitle,a=e.versionMetadata;return n.createElement(i.Z,{id:"theme.docs.versions.unreleasedVersionLabel",description:"The label used to tell the user that he's browsing an unreleased doc version",values:{siteTitle:t,versionLabel:n.createElement("b",null,a.label)}},"This is unreleased documentation for {siteTitle} {versionLabel} version.")},unmaintained:function(e){var t=e.siteTitle,a=e.versionMetadata;return n.createElement(i.Z,{id:"theme.docs.versions.unmaintainedVersionLabel",description:"The label used to tell the user that he's browsing an unmaintained doc version",values:{siteTitle:t,versionLabel:n.createElement("b",null,a.label)}},"This is documentation for {siteTitle} {versionLabel}, which is no longer actively maintained.")}};function p(e){var t=v[e.versionMetadata.banner];return n.createElement(t,e)}function E(e){var t=e.versionLabel,a=e.to,l=e.onClick;return n.createElement(i.Z,{id:"theme.docs.versions.latestVersionSuggestionLabel",description:"The label used to tell the user to check the latest version",values:{versionLabel:t,latestVersionLink:n.createElement("b",null,n.createElement(s.Z,{to:a,onClick:l},n.createElement(i.Z,{id:"theme.docs.versions.latestVersionLinkLabel",description:"The label used for the latest version suggestion link label"},"latest version")))}},"For up-to-date documentation, see the {latestVersionLink} ({versionLabel}).")}function h(e){var t,a=e.className,r=e.versionMetadata,i=(0,m.Z)().siteConfig.title,s=(0,d.gA)({failfast:!0}).pluginId,c=(0,u.J)(s).savePreferredVersionName,o=(0,d.Jo)(s),v=o.latestDocSuggestion,h=o.latestVersionSuggestion,b=null!=v?v:(t=h).docs.find((function(e){return e.id===t.mainDocId}));return n.createElement("div",{className:(0,l.Z)(a,u.kM.docs.docVersionBanner,"alert alert--warning margin-bottom--md"),role:"alert"},n.createElement("div",null,n.createElement(p,{siteTitle:i,versionMetadata:r})),n.createElement("div",{className:"margin-top--md"},n.createElement(E,{versionLabel:h.label,to:b.path,onClick:function(){return c(h.name)}})))}function b(e){var t=e.className,a=(0,u.E6)();return a.banner?n.createElement(h,{className:t,versionMetadata:a}):null}function f(e){var t=e.className,a=(0,u.E6)();return a.badge?n.createElement("span",{className:(0,l.Z)(t,u.kM.docs.docVersionBadge,"badge badge--secondary")},n.createElement(i.Z,{id:"theme.docs.versionBadge.label",values:{versionLabel:a.label}},"Version: {versionLabel}")):null}function g(e){var t=e.lastUpdatedAt,a=e.formattedLastUpdatedAt;return n.createElement(i.Z,{id:"theme.lastUpdated.atDate",description:"The words used to describe on which date a page has been last updated",values:{date:n.createElement("b",null,n.createElement("time",{dateTime:new Date(1e3*t).toISOString()},a))}}," on {date}")}function N(e){var t=e.lastUpdatedBy;return n.createElement(i.Z,{id:"theme.lastUpdated.byUser",description:"The words used to describe by who the page has been last updated",values:{user:n.createElement("b",null,t)}}," by {user}")}function Z(e){var t=e.lastUpdatedAt,a=e.formattedLastUpdatedAt,l=e.lastUpdatedBy;return n.createElement("span",{className:u.kM.common.lastUpdated},n.createElement(i.Z,{id:"theme.lastUpdated.lastUpdatedAtBy",description:"The sentence used to display when a page has been last updated, and by who",values:{atDate:t&&a?n.createElement(g,{lastUpdatedAt:t,formattedLastUpdatedAt:a}):"",byUser:l?n.createElement(N,{lastUpdatedBy:l}):""}},"Last updated{atDate}{byUser}"),!1)}var k=a(3366),_="iconEdit_dcUD",L=["className"];function y(e){var t=e.className,a=(0,k.Z)(e,L);return n.createElement("svg",(0,r.Z)({fill:"currentColor",height:"20",width:"20",viewBox:"0 0 40 40",className:(0,l.Z)(_,t),"aria-hidden":"true"},a),n.createElement("g",null,n.createElement("path",{d:"m34.5 11.7l-3 3.1-6.3-6.3 3.1-3q0.5-0.5 1.2-0.5t1.1 0.5l3.9 3.9q0.5 0.4 0.5 1.1t-0.5 1.2z m-29.5 17.1l18.4-18.5 6.3 6.3-18.4 18.4h-6.3v-6.2z"})))}function T(e){var t=e.editUrl;return n.createElement("a",{href:t,target:"_blank",rel:"noreferrer noopener",className:u.kM.common.editThisPage},n.createElement(y,null),n.createElement(i.Z,{id:"theme.common.editThisPage",description:"The link label to edit the current page"},"Edit this page"))}var C="tag_hD8n",U="tagRegular_D6E_",x="tagWithCount_i0QQ";function A(e){var t=e.permalink,a=e.name,r=e.count;return n.createElement(s.Z,{href:t,className:(0,l.Z)(C,r?x:U)},a,r&&n.createElement("span",null,r))}var M="tags_XVD_",w="tag_JSN8";function F(e){var t=e.tags;return n.createElement(n.Fragment,null,n.createElement("b",null,n.createElement(i.Z,{id:"theme.tags.tagsListLabel",description:"The label alongside a tag list"},"Tags:")),n.createElement("ul",{className:(0,l.Z)(M,"padding--none","margin-left--sm")},t.map((function(e){var t=e.label,a=e.permalink;return n.createElement("li",{key:a,className:w},n.createElement(A,{name:t,permalink:a}))}))))}var H="lastUpdated_foO9";function S(e){return n.createElement("div",{className:(0,l.Z)(u.kM.docs.docFooterTagsRow,"row margin-bottom--sm")},n.createElement("div",{className:"col"},n.createElement(F,e)))}function B(e){var t=e.editUrl,a=e.lastUpdatedAt,r=e.lastUpdatedBy,i=e.formattedLastUpdatedAt;return n.createElement("div",{className:(0,l.Z)(u.kM.docs.docFooterEditMetaRow,"row")},n.createElement("div",{className:"col"},t&&n.createElement(T,{editUrl:t})),n.createElement("div",{className:(0,l.Z)("col",H)},(a||r)&&n.createElement(Z,{lastUpdatedAt:a,formattedLastUpdatedAt:i,lastUpdatedBy:r})))}function I(e){var t=e.content.metadata,a=t.editUrl,r=t.lastUpdatedAt,i=t.formattedLastUpdatedAt,s=t.lastUpdatedBy,c=t.tags,o=c.length>0,m=!!(a||r||s);return o||m?n.createElement("footer",{className:(0,l.Z)(u.kM.docs.docFooter,"docusaurus-mt-lg")},o&&n.createElement(S,{tags:c}),m&&n.createElement(B,{editUrl:a,lastUpdatedAt:r,lastUpdatedBy:s,formattedLastUpdatedAt:i})):null}var V=["toc","className","linkClassName","linkActiveClassName","minHeadingLevel","maxHeadingLevel"];function D(e){var t=e.toc,a=e.className,l=e.linkClassName,r=e.isChild;return t.length?n.createElement("ul",{className:r?void 0:a},t.map((function(e){return n.createElement("li",{key:e.id},n.createElement("a",{href:"#"+e.id,className:null!=l?l:void 0,dangerouslySetInnerHTML:{__html:e.value}}),n.createElement(D,{isChild:!0,toc:e.children,className:a,linkClassName:l}))}))):null}function O(e){var t=e.toc,a=e.className,l=void 0===a?"table-of-contents table-of-contents__left-border":a,i=e.linkClassName,s=void 0===i?"table-of-contents__link":i,c=e.linkActiveClassName,o=void 0===c?void 0:c,m=e.minHeadingLevel,d=e.maxHeadingLevel,v=(0,k.Z)(e,V),p=(0,u.LU)(),E=null!=m?m:p.tableOfContents.minHeadingLevel,h=null!=d?d:p.tableOfContents.maxHeadingLevel,b=(0,u.b9)({toc:t,minHeadingLevel:E,maxHeadingLevel:h}),f=(0,n.useMemo)((function(){if(s&&o)return{linkClassName:s,linkActiveClassName:o,minHeadingLevel:E,maxHeadingLevel:h}}),[s,o,E,h]);return(0,u.Si)(f),n.createElement(D,(0,r.Z)({toc:b,className:l,linkClassName:s},v))}var P="tableOfContents_cNA8",R=["className"];function z(e){var t=e.className,a=(0,k.Z)(e,R);return n.createElement("div",{className:(0,l.Z)(P,"thin-scrollbar",t)},n.createElement(O,(0,r.Z)({},a,{linkClassName:"table-of-contents__link toc-highlight",linkActiveClassName:"table-of-contents__link--active"})))}var j="tocCollapsible_jdIR",q="tocCollapsibleButton_Fzxq",J="tocCollapsibleContent_MpvI",Q="tocCollapsibleExpanded_laf4";function W(e){var t=e.toc,a=e.className,r=e.minHeadingLevel,s=e.maxHeadingLevel,c=(0,u.uR)({initialState:!0}),o=c.collapsed,m=c.toggleCollapsed;return n.createElement("div",{className:(0,l.Z)(j,!o&&Q,a)},n.createElement("button",{type:"button",className:(0,l.Z)("clean-btn",q),onClick:m},n.createElement(i.Z,{id:"theme.TOCCollapsible.toggleButtonLabel",description:"The label used by the button on the collapsible TOC component"},"On this page")),n.createElement(u.zF,{lazy:!0,className:J,collapsed:o},n.createElement(O,{toc:t,minHeadingLevel:r,maxHeadingLevel:s})))}var X="anchorWithStickyNavbar_mojV",G="anchorWithHideOnScrollNavbar_R0VQ",K=["as","id"],Y=["as"];function $(e){var t=e.as,a=e.id,s=(0,k.Z)(e,K),c=(0,u.LU)().navbar.hideOnScroll;return a?n.createElement(t,(0,r.Z)({},s,{className:(0,l.Z)("anchor",c?G:X),id:a}),s.children,n.createElement("a",{className:"hash-link",href:"#"+a,title:(0,i.I)({id:"theme.common.headingLinkTitle",message:"Direct link to heading",description:"Title for link to heading"})},"\u200b")):n.createElement(t,s)}function ee(e){var t=e.as,a=(0,k.Z)(e,Y);return"h1"===t?n.createElement("h1",(0,r.Z)({},a,{id:void 0}),a.children):n.createElement($,(0,r.Z)({as:t},a))}var te="docItemContainer_vinB",ae="docItemCol_DM6M",ne="tocMobile_TmEX",le={breadcrumbsContainer:"breadcrumbsContainer_Xlws"},re=a(9524);function ie(e){var t=e.children,a=e.href,l="breadcrumbs__link";return a?n.createElement(s.Z,{className:l,href:a,itemProp:"item"},n.createElement("span",{itemProp:"name"},t)):n.createElement("span",{className:l,itemProp:"item name"},t)}function se(e){var t=e.children,a=e.active,r=e.index;return n.createElement("li",{itemScope:!0,itemProp:"itemListElement",itemType:"https://schema.org/ListItem",className:(0,l.Z)("breadcrumbs__item",{"breadcrumbs__item--active":a})},t,n.createElement("meta",{itemProp:"position",content:String(r+1)}))}function ce(){var e=(0,re.Z)("/");return n.createElement("li",{className:"breadcrumbs__item"},n.createElement(s.Z,{className:(0,l.Z)("breadcrumbs__link",le.breadcrumbsItemLink),href:e},"\ud83c\udfe0"))}function oe(){var e=(0,u.s1)(),t=(0,u.Ns)();return e?n.createElement("nav",{className:(0,l.Z)(u.kM.docs.docBreadcrumbs,le.breadcrumbsContainer),"aria-label":"breadcrumbs"},n.createElement("ul",{className:"breadcrumbs",itemScope:!0,itemType:"https://schema.org/BreadcrumbList"},t&&n.createElement(ce,null),e.map((function(t,a){return n.createElement(se,{key:a,active:a===e.length-1,index:a},n.createElement(ie,{href:a<e.length-1?t.href:void 0},t.label))})))):null}var me=a(4137),de=a(1514),ue=["mdxType","originalType"];var ve=a(6831);var pe="details_BAp3";function Ee(e){var t=Object.assign({},e);return n.createElement(u.PO,(0,r.Z)({},t,{className:(0,l.Z)("alert alert--info",pe,t.className)}))}function he(e){return n.createElement(ee,e)}var be="img_E7b_";var fe={head:function(e){var t=n.Children.map(e.children,(function(e){return function(e){var t,a;if(null!=e&&null!=(t=e.props)&&t.mdxType&&null!=e&&null!=(a=e.props)&&a.originalType){var l=e.props,r=(l.mdxType,l.originalType,(0,k.Z)(l,ue));return n.createElement(e.props.originalType,r)}return e}(e)}));return n.createElement(de.Z,e,t)},code:function(e){var t=["a","b","big","i","span","em","strong","sup","sub","small"];return n.Children.toArray(e.children).every((function(e){return"string"==typeof e&&!e.includes("\n")||(0,n.isValidElement)(e)&&t.includes(e.props.mdxType)}))?n.createElement("code",e):n.createElement(ve.Z,e)},a:function(e){return n.createElement(s.Z,e)},pre:function(e){var t;return n.createElement(ve.Z,(0,n.isValidElement)(e.children)&&"code"===e.children.props.originalType?null==(t=e.children)?void 0:t.props:Object.assign({},e))},details:function(e){var t=n.Children.toArray(e.children),a=t.find((function(e){var t;return"summary"===(null==e||null==(t=e.props)?void 0:t.mdxType)})),l=n.createElement(n.Fragment,null,t.filter((function(e){return e!==a})));return n.createElement(Ee,(0,r.Z)({},e,{summary:a}),l)},ul:function(e){return n.createElement("ul",(0,r.Z)({},e,{className:(t=e.className,(0,l.Z)(t,(null==t?void 0:t.includes("contains-task-list"))&&"contains-task-list_tsSF"))}));var t},img:function(e){return n.createElement("img",(0,r.Z)({loading:"lazy"},e,{className:(t=e.className,(0,l.Z)(t,be))}));var t},h1:function(e){return n.createElement(he,(0,r.Z)({as:"h1"},e))},h2:function(e){return n.createElement(he,(0,r.Z)({as:"h2"},e))},h3:function(e){return n.createElement(he,(0,r.Z)({as:"h3"},e))},h4:function(e){return n.createElement(he,(0,r.Z)({as:"h4"},e))},h5:function(e){return n.createElement(he,(0,r.Z)({as:"h5"},e))},h6:function(e){return n.createElement(he,(0,r.Z)({as:"h6"},e))}};function ge(e){var t=e.children;return n.createElement(me.Zo,{components:fe},t)}function Ne(e){var t,a=e.content,l=a.metadata,r=a.frontMatter,i=a.assets,s=r.keywords,c=l.description,o=l.title,m=null!=(t=i.image)?t:r.image;return n.createElement(u.d,{title:o,description:c,keywords:s,image:m})}function Ze(e){var t=e.content,a=t.metadata,r=t.frontMatter,i=r.hide_title,s=r.hide_table_of_contents,c=r.toc_min_heading_level,m=r.toc_max_heading_level,d=a.title,v=!i&&void 0===t.contentTitle,p=(0,u.iP)(),E=!s&&t.toc&&t.toc.length>0,h=E&&("desktop"===p||"ssr"===p);return n.createElement("div",{className:"row"},n.createElement("div",{className:(0,l.Z)("col",!s&&ae)},n.createElement(b,null),n.createElement("div",{className:te},n.createElement("article",null,n.createElement(oe,null),n.createElement(f,null),E&&n.createElement(W,{toc:t.toc,minHeadingLevel:c,maxHeadingLevel:m,className:(0,l.Z)(u.kM.docs.docTocMobile,ne)}),n.createElement("div",{className:(0,l.Z)(u.kM.docs.docMarkdown,"markdown")},v&&n.createElement("header",null,n.createElement(ee,{as:"h1"},d)),n.createElement(ge,null,n.createElement(t,null))),n.createElement(I,e)),n.createElement(o,{previous:a.previous,next:a.next}))),h&&n.createElement("div",{className:"col col--3"},n.createElement(z,{toc:t.toc,minHeadingLevel:c,maxHeadingLevel:m,className:u.kM.docs.docTocDesktop})))}function ke(e){var t="docs-doc-id-"+e.content.metadata.unversionedId;return n.createElement(u.FG,{className:t},n.createElement(Ne,e),n.createElement(Ze,e))}},1085:function(e,t,a){var n=a(7294),l={color:"#333333",fontStyle:"italic"};t.Z=function(e){var t=e.annotation,a=e.children;return n.createElement("div",null,n.createElement("span",null,n.createElement("code",null,a)),n.createElement("br",null),n.createElement("br",null),n.createElement("small",{style:l},t))}},1899:function(e,t,a){var n=a(3366),l=a(7294),r=a(748),i=a(6136),s=["src","style"];t.Z=function(e){var t=e.src,c=e.style,o=(0,n.Z)(e,s);return l.createElement(r.default,null,(function(){if(!i.default.canUseDOM)return l.createElement("div",null,"ASCII Cinema Player Unavailable");var e=a(6060),n=(0,l.useRef)(null);return(0,l.useEffect)((function(){var a=n.current;e.create(t,a,o)}),[t]),l.createElement("div",{ref:n,style:c})}))}},6598:function(e,t,a){var n,l=a(7294);!function(e){e.default="block",e.block="block",e.line="line"}(n||(n={}));var r={color:"#FFFFFF",background:"#333333"},i={boxShadow:"inset 1px 0px #000000",background:"#FFFFFF11"},s=function(e){switch(e){case n.block:return r;case n.line:return i;default:return r}};t.Z=function(e){var t=e.caretStyle,a=void 0===t?n.block:t,r=e.children;return l.createElement("span",{style:s(a)},r)}},8263:function(e,t,a){var n=a(7294),l=a(3973),r=a(1085),i=a(1899),s=a(6598),c=a(5944),o=function(e){return n.createElement(n.Fragment,null,n.createElement(l.Z,e))};o.AnnotatedCommand=r.Z,o.AsciinemaPlayer=i.Z,o.Caret=s.Z,o.Image=c.Z,t.Z=o}}]);