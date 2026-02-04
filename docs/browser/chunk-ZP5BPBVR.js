import{$ as le,C as A,F as E,a as et,b as M,e as re,f as tt,g as it,h as ae,ha as R,i as z,ia as ce,m as O,q as F,wa as ue}from"./chunk-N6UF5KRC.js";import{a as v,b as C,c as qe,d as Ri,f as ki}from"./chunk-ATDPNAVO.js";var Pt=Ri((Qn,Ve)=>{"use strict";Ve.exports=ye;Ve.exports.default=ye;function ye(t,o,e){e=e||2;var i=o&&o.length,s=i?o[0]*e:t.length,n=yt(t,0,s,e,!0),r=[];if(!n||n.next===n.prev)return r;var a,l,c,u,f,d,p;if(i&&(n=eo(t,o,n,e)),t.length>80*e){a=c=t[0],l=u=t[1];for(var g=e;g<s;g+=e)f=t[g],d=t[g+1],f<a&&(a=f),d<l&&(l=d),f>c&&(c=f),d>u&&(u=d);p=Math.max(c-a,u-l),p=p!==0?32767/p:0}return Q(n,r,e,a,l,p,0),r}function yt(t,o,e,i,s){var n,r;if(s===Ue(t,o,e,i)>0)for(n=o;n<e;n+=i)r=xt(n,t[n],t[n+1],r);else for(n=e-i;n>=o;n-=i)r=xt(n,t[n],t[n+1],r);return r&&me(r,r.next)&&(ee(r),r=r.next),r}function U(t,o){if(!t)return t;o||(o=t);var e=t,i;do if(i=!1,!e.steiner&&(me(e,e.next)||S(e.prev,e,e.next)===0)){if(ee(e),e=o=e.prev,e===e.next)break;i=!0}else e=e.next;while(i||e!==o);return o}function Q(t,o,e,i,s,n,r){if(t){!r&&n&&so(t,i,s,n);for(var a=t,l,c;t.prev!==t.next;){if(l=t.prev,c=t.next,n?Xi(t,i,s,n):Yi(t)){o.push(l.i/e|0),o.push(t.i/e|0),o.push(c.i/e|0),ee(t),t=c.next,a=c.next;continue}if(t=c,t===a){r?r===1?(t=Qi(U(t),o,e),Q(t,o,e,i,s,n,2)):r===2&&qi(t,o,e,i,s,n):Q(U(t),o,e,i,s,n,1);break}}}}function Yi(t){var o=t.prev,e=t,i=t.next;if(S(o,e,i)>=0)return!1;for(var s=o.x,n=e.x,r=i.x,a=o.y,l=e.y,c=i.y,u=s<n?s<r?s:r:n<r?n:r,f=a<l?a<c?a:c:l<c?l:c,d=s>n?s>r?s:r:n>r?n:r,p=a>l?a>c?a:c:l>c?l:c,g=i.next;g!==o;){if(g.x>=u&&g.x<=d&&g.y>=f&&g.y<=p&&j(s,a,n,l,r,c,g.x,g.y)&&S(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function Xi(t,o,e,i){var s=t.prev,n=t,r=t.next;if(S(s,n,r)>=0)return!1;for(var a=s.x,l=n.x,c=r.x,u=s.y,f=n.y,d=r.y,p=a<l?a<c?a:c:l<c?l:c,g=u<f?u<d?u:d:f<d?f:d,h=a>l?a>c?a:c:l>c?l:c,x=u>f?u>d?u:d:f>d?f:d,y=Ge(p,g,o,e,i),_=Ge(h,x,o,e,i),m=t.prevZ,P=t.nextZ;m&&m.z>=y&&P&&P.z<=_;){if(m.x>=p&&m.x<=h&&m.y>=g&&m.y<=x&&m!==s&&m!==r&&j(a,u,l,f,c,d,m.x,m.y)&&S(m.prev,m,m.next)>=0||(m=m.prevZ,P.x>=p&&P.x<=h&&P.y>=g&&P.y<=x&&P!==s&&P!==r&&j(a,u,l,f,c,d,P.x,P.y)&&S(P.prev,P,P.next)>=0))return!1;P=P.nextZ}for(;m&&m.z>=y;){if(m.x>=p&&m.x<=h&&m.y>=g&&m.y<=x&&m!==s&&m!==r&&j(a,u,l,f,c,d,m.x,m.y)&&S(m.prev,m,m.next)>=0)return!1;m=m.prevZ}for(;P&&P.z<=_;){if(P.x>=p&&P.x<=h&&P.y>=g&&P.y<=x&&P!==s&&P!==r&&j(a,u,l,f,c,d,P.x,P.y)&&S(P.prev,P,P.next)>=0)return!1;P=P.nextZ}return!0}function Qi(t,o,e){var i=t;do{var s=i.prev,n=i.next.next;!me(s,n)&&mt(s,i,i.next,n)&&q(s,n)&&q(n,s)&&(o.push(s.i/e|0),o.push(i.i/e|0),o.push(n.i/e|0),ee(i),ee(i.next),i=t=n),i=i.next}while(i!==t);return U(i)}function qi(t,o,e,i,s,n){var r=t;do{for(var a=r.next.next;a!==r.prev;){if(r.i!==a.i&&lo(r,a)){var l=vt(r,a);r=U(r,r.next),l=U(l,l.next),Q(r,o,e,i,s,n,0),Q(l,o,e,i,s,n,0);return}a=a.next}r=r.next}while(r!==t)}function eo(t,o,e,i){var s=[],n,r,a,l,c;for(n=0,r=o.length;n<r;n++)a=o[n]*i,l=n<r-1?o[n+1]*i:t.length,c=yt(t,a,l,i,!1),c===c.next&&(c.steiner=!0),s.push(ao(c));for(s.sort(to),n=0;n<s.length;n++)e=io(s[n],e);return e}function to(t,o){return t.x-o.x}function io(t,o){var e=oo(t,o);if(!e)return o;var i=vt(e,t);return U(i,i.next),U(e,e.next)}function oo(t,o){var e=o,i=t.x,s=t.y,n=-1/0,r;do{if(s<=e.y&&s>=e.next.y&&e.next.y!==e.y){var a=e.x+(s-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(a<=i&&a>n&&(n=a,r=e.x<e.next.x?e:e.next,a===i))return r}e=e.next}while(e!==o);if(!r)return null;var l=r,c=r.x,u=r.y,f=1/0,d;e=r;do i>=e.x&&e.x>=c&&i!==e.x&&j(s<u?i:n,s,c,u,s<u?n:i,s,e.x,e.y)&&(d=Math.abs(s-e.y)/(i-e.x),q(e,t)&&(d<f||d===f&&(e.x>r.x||e.x===r.x&&no(r,e)))&&(r=e,f=d)),e=e.next;while(e!==l);return r}function no(t,o){return S(t.prev,t,o.prev)<0&&S(o.next,t,t.next)<0}function so(t,o,e,i){var s=t;do s.z===0&&(s.z=Ge(s.x,s.y,o,e,i)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==t);s.prevZ.nextZ=null,s.prevZ=null,ro(s)}function ro(t){var o,e,i,s,n,r,a,l,c=1;do{for(e=t,t=null,n=null,r=0;e;){for(r++,i=e,a=0,o=0;o<c&&(a++,i=i.nextZ,!!i);o++);for(l=c;a>0||l>0&&i;)a!==0&&(l===0||!i||e.z<=i.z)?(s=e,e=e.nextZ,a--):(s=i,i=i.nextZ,l--),n?n.nextZ=s:t=s,s.prevZ=n,n=s;e=i}n.nextZ=null,c*=2}while(r>1);return t}function Ge(t,o,e,i,s){return t=(t-e)*s|0,o=(o-i)*s|0,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,o=(o|o<<8)&16711935,o=(o|o<<4)&252645135,o=(o|o<<2)&858993459,o=(o|o<<1)&1431655765,t|o<<1}function ao(t){var o=t,e=t;do(o.x<e.x||o.x===e.x&&o.y<e.y)&&(e=o),o=o.next;while(o!==t);return e}function j(t,o,e,i,s,n,r,a){return(s-r)*(o-a)>=(t-r)*(n-a)&&(t-r)*(i-a)>=(e-r)*(o-a)&&(e-r)*(n-a)>=(s-r)*(i-a)}function lo(t,o){return t.next.i!==o.i&&t.prev.i!==o.i&&!co(t,o)&&(q(t,o)&&q(o,t)&&uo(t,o)&&(S(t.prev,t,o.prev)||S(t,o.prev,o))||me(t,o)&&S(t.prev,t,t.next)>0&&S(o.prev,o,o.next)>0)}function S(t,o,e){return(o.y-t.y)*(e.x-o.x)-(o.x-t.x)*(e.y-o.y)}function me(t,o){return t.x===o.x&&t.y===o.y}function mt(t,o,e,i){var s=xe(S(t,o,e)),n=xe(S(t,o,i)),r=xe(S(e,i,t)),a=xe(S(e,i,o));return!!(s!==n&&r!==a||s===0&&he(t,e,o)||n===0&&he(t,i,o)||r===0&&he(e,t,i)||a===0&&he(e,o,i))}function he(t,o,e){return o.x<=Math.max(t.x,e.x)&&o.x>=Math.min(t.x,e.x)&&o.y<=Math.max(t.y,e.y)&&o.y>=Math.min(t.y,e.y)}function xe(t){return t>0?1:t<0?-1:0}function co(t,o){var e=t;do{if(e.i!==t.i&&e.next.i!==t.i&&e.i!==o.i&&e.next.i!==o.i&&mt(e,e.next,t,o))return!0;e=e.next}while(e!==t);return!1}function q(t,o){return S(t.prev,t,t.next)<0?S(t,o,t.next)>=0&&S(t,t.prev,o)>=0:S(t,o,t.prev)<0||S(t,t.next,o)<0}function uo(t,o){var e=t,i=!1,s=(t.x+o.x)/2,n=(t.y+o.y)/2;do e.y>n!=e.next.y>n&&e.next.y!==e.y&&s<(e.next.x-e.x)*(n-e.y)/(e.next.y-e.y)+e.x&&(i=!i),e=e.next;while(e!==t);return i}function vt(t,o){var e=new De(t.i,t.x,t.y),i=new De(o.i,o.x,o.y),s=t.next,n=o.prev;return t.next=o,o.prev=t,e.next=s,s.prev=e,i.next=e,e.prev=i,n.next=i,i.prev=n,i}function xt(t,o,e,i){var s=new De(t,o,e);return i?(s.next=i.next,s.prev=i,i.next.prev=s,i.next=s):(s.prev=s,s.next=s),s}function ee(t){t.next.prev=t.prev,t.prev.next=t.next,t.prevZ&&(t.prevZ.nextZ=t.nextZ),t.nextZ&&(t.nextZ.prevZ=t.prevZ)}function De(t,o,e){this.i=t,this.x=o,this.y=e,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}ye.deviation=function(t,o,e,i){var s=o&&o.length,n=s?o[0]*e:t.length,r=Math.abs(Ue(t,0,n,e));if(s)for(var a=0,l=o.length;a<l;a++){var c=o[a]*e,u=a<l-1?o[a+1]*e:t.length;r-=Math.abs(Ue(t,c,u,e))}var f=0;for(a=0;a<i.length;a+=3){var d=i[a]*e,p=i[a+1]*e,g=i[a+2]*e;f+=Math.abs((t[d]-t[g])*(t[p+1]-t[d+1])-(t[d]-t[p])*(t[g+1]-t[d+1]))}return r===0&&f===0?0:Math.abs((f-r)/r)};function Ue(t,o,e,i){for(var s=0,n=o,r=e-i;n<e;n+=i)s+=(t[r]-t[n])*(t[n+1]+t[r+1]),r=n;return s}ye.flatten=function(t){for(var o=t[0][0].length,e={vertices:[],holes:[],dimensions:o},i=0,s=0;s<t.length;s++){for(var n=0;n<t[s].length;n++)for(var r=0;r<o;r++)e.vertices.push(t[s][n][r]);s>0&&(i+=t[s-1].length,e.holes.push(i))}return e}});var H={CLOCKWISE:1,COUNTER_CLOCKWISE:-1};function D(t,o,e={}){return ot(t,e)!==o?(Bi(t,e),!0):!1}function ot(t,o={}){return Math.sign(fe(t,o))}var Fe={x:0,y:1,z:2};function fe(t,o={}){let{start:e=0,end:i=t.length,plane:s="xy"}=o,n=o.size||2,r=0,a=Fe[s[0]],l=Fe[s[1]];for(let c=e,u=i-n;c<i;c+=n)r+=(t[c+a]-t[u+a])*(t[c+l]+t[u+l]),u=c;return r/2}function Bi(t,o){let{start:e=0,end:i=t.length,size:s=2}=o,n=(i-e)/s,r=Math.floor(n/2);for(let a=0;a<r;++a){let l=e+a*s,c=e+(n-1-a)*s;for(let u=0;u<s;++u){let f=t[l+u];t[l+u]=t[c+u],t[c+u]=f}}}function T(t,o){let e=o.length,i=t.length;if(i>0){let s=!0;for(let n=0;n<e;n++)if(t[i-e+n]!==o[n]){s=!1;break}if(s)return!1}for(let s=0;s<e;s++)t[i+s]=o[s];return!0}function $(t,o){let e=o.length;for(let i=0;i<e;i++)t[i]=o[i]}function N(t,o,e,i,s=[]){let n=i+o*e;for(let r=0;r<e;r++)s[r]=t[n+r];return s}function de(t,o,e,i,s=[]){let n,r;if(e&8)n=(i[3]-t[1])/(o[1]-t[1]),r=3;else if(e&4)n=(i[1]-t[1])/(o[1]-t[1]),r=1;else if(e&2)n=(i[2]-t[0])/(o[0]-t[0]),r=2;else if(e&1)n=(i[0]-t[0])/(o[0]-t[0]),r=0;else return null;for(let a=0;a<t.length;a++)s[a]=(r&1)===a?i[r]:n*(o[a]-t[a])+t[a];return s}function J(t,o){let e=0;return t[0]<o[0]?e|=1:t[0]>o[2]&&(e|=2),t[1]<o[1]?e|=4:t[1]>o[3]&&(e|=8),e}function Y(t,o){let{size:e=2,broken:i=!1,gridResolution:s=10,gridOffset:n=[0,0],startIndex:r=0,endIndex:a=t.length}=o||{},l=(a-r)/e,c=[],u=[c],f=N(t,0,e,r),d,p,g=rt(f,s,n,[]),h=[];T(c,f);for(let x=1;x<l;x++){for(d=N(t,x,e,r,d),p=J(d,g);p;){de(f,d,p,g,h);let y=J(h,g);y&&(de(f,h,y,g,h),p=y),T(c,h),$(f,h),Gi(g,s,p),i&&c.length>e&&(c=[],u.push(c),T(c,f)),p=J(d,g)}T(c,d),$(f,d)}return i?u:u[0]}var nt=0,Ni=1;function X(t,o=null,e){if(!t.length)return[];let{size:i=2,gridResolution:s=10,gridOffset:n=[0,0],edgeTypes:r=!1}=e||{},a=[],l=[{pos:t,types:r?new Array(t.length/i).fill(Ni):null,holes:o||[]}],c=[[],[]],u=[];for(;l.length;){let{pos:f,types:d,holes:p}=l.shift();Di(f,i,p[0]||f.length,c),u=rt(c[0],s,n,u);let g=J(c[1],u);if(g){let h=st(f,d,i,0,p[0]||f.length,u,g),x={pos:h[0].pos,types:h[0].types,holes:[]},y={pos:h[1].pos,types:h[1].types,holes:[]};l.push(x,y);for(let _=0;_<p.length;_++)h=st(f,d,i,p[_],p[_+1]||f.length,u,g),h[0]&&(x.holes.push(x.pos.length),x.pos=pe(x.pos,h[0].pos),r&&(x.types=pe(x.types,h[0].types))),h[1]&&(y.holes.push(y.pos.length),y.pos=pe(y.pos,h[1].pos),r&&(y.types=pe(y.types,h[1].types)))}else{let h={positions:f};r&&(h.edgeTypes=d),p.length&&(h.holeIndices=p),a.push(h)}}return a}function st(t,o,e,i,s,n,r){let a=(s-i)/e,l=[],c=[],u=[],f=[],d=[],p,g,h,x=N(t,a-1,e,i),y=Math.sign(r&8?x[1]-n[3]:x[0]-n[2]),_=o&&o[a-1],m=0,P=0;for(let L=0;L<a;L++)p=N(t,L,e,i,p),g=Math.sign(r&8?p[1]-n[3]:p[0]-n[2]),h=o&&o[i/e+L],g&&y&&y!==g&&(de(x,p,r,n,d),T(l,d)&&u.push(_),T(c,d)&&f.push(_)),g<=0?(T(l,p)&&u.push(h),m-=g):u.length&&(u[u.length-1]=nt),g>=0?(T(c,p)&&f.push(h),P+=g):f.length&&(f[f.length-1]=nt),$(x,p),y=g,_=h;return[m?{pos:l,types:o&&u}:null,P?{pos:c,types:o&&f}:null]}function rt(t,o,e,i){let s=Math.floor((t[0]-e[0])/o)*o+e[0],n=Math.floor((t[1]-e[1])/o)*o+e[1];return i[0]=s,i[1]=n,i[2]=s+o,i[3]=n+o,i}function Gi(t,o,e){e&8?(t[1]+=o,t[3]+=o):e&4?(t[1]-=o,t[3]-=o):e&2?(t[0]+=o,t[2]+=o):e&1&&(t[0]-=o,t[2]-=o)}function Di(t,o,e,i){let s=1/0,n=-1/0,r=1/0,a=-1/0;for(let l=0;l<e;l+=o){let c=t[l],u=t[l+1];s=c<s?c:s,n=c>n?c:n,r=u<r?u:r,a=u>a?u:a}return i[0][0]=s,i[0][1]=r,i[1][0]=n,i[1][1]=a,i}function pe(t,o){for(let e=0;e<o.length;e++)t.push(o[e]);return t}var Ui=85.051129;function Re(t,o){let{size:e=2,startIndex:i=0,endIndex:s=t.length,normalize:n=!0}=o||{},r=t.slice(i,s);at(r,e,0,s-i);let a=Y(r,{size:e,broken:!0,gridResolution:360,gridOffset:[-180,-180]});if(n)for(let l of a)lt(l,e);return a}function ke(t,o=null,e){let{size:i=2,normalize:s=!0,edgeTypes:n=!1}=e||{};o=o||[];let r=[],a=[],l=0,c=0;for(let f=0;f<=o.length;f++){let d=o[f]||t.length,p=c,g=Vi(t,i,l,d);for(let h=g;h<d;h++)r[c++]=t[h];for(let h=l;h<g;h++)r[c++]=t[h];at(r,i,p,c),Hi(r,i,p,c,e?.maxLatitude),l=d,a[f]=c}a.pop();let u=X(r,a,{size:i,gridResolution:360,gridOffset:[-180,-180],edgeTypes:n});if(s)for(let f of u)lt(f.positions,i);return u}function Vi(t,o,e,i){let s=-1,n=-1;for(let r=e+1;r<i;r+=o){let a=Math.abs(t[r]);a>s&&(s=a,n=r-1)}return n}function Hi(t,o,e,i,s=Ui){let n=t[e],r=t[i-o];if(Math.abs(n-r)>180){let a=N(t,0,o,e);a[0]+=Math.round((r-n)/360)*360,T(t,a),a[1]=Math.sign(a[1])*s,T(t,a),a[0]=n,T(t,a)}}function at(t,o,e,i){let s=t[0],n;for(let r=e;r<i;r+=o){n=t[r];let a=n-s;(a>180||a<-180)&&(n-=Math.round(a/360)*360),t[r]=s=n}}function lt(t,o){let e,i=t.length/o;for(let n=0;n<i&&(e=t[n*o],(e+180)%360===0);n++);let s=-Math.round(e/360)*360;if(s!==0)for(let n=0;n<i;n++)t[n*o]+=s}function ct(t,o,e,i){let s;if(Array.isArray(t[0])){let n=t.length*o;s=new Array(n);for(let r=0;r<t.length;r++)for(let a=0;a<o;a++)s[r*o+a]=t[r][a]||0}else s=t;return e?Y(s,{size:o,gridResolution:e}):i?Re(s,{size:o}):s}var Zi=1,Ki=2,Be=4,ge=class extends ue{constructor(o){super(C(v({},o),{attributes:{positions:{size:3,padding:18,initialize:!0,type:o.fp64?Float64Array:Float32Array},segmentTypes:{size:1,type:Uint8ClampedArray}}}))}get(o){return this.attributes[o]}getGeometryFromBuffer(o){return this.normalize?super.getGeometryFromBuffer(o):null}normalizeGeometry(o){return this.normalize?ct(o,this.positionSize,this.opts.resolution,this.opts.wrapLongitude):o}getGeometrySize(o){if(ut(o)){let i=0;for(let s of o)i+=this.getGeometrySize(s);return i}let e=this.getPathLength(o);return e<2?0:this.isClosed(o)?e<3?0:e+2:e}updateGeometryAttributes(o,e){if(e.geometrySize!==0)if(o&&ut(o))for(let i of o){let s=this.getGeometrySize(i);e.geometrySize=s,this.updateGeometryAttributes(i,e),e.vertexStart+=s}else this._updateSegmentTypes(o,e),this._updatePositions(o,e)}_updateSegmentTypes(o,e){let i=this.attributes.segmentTypes,s=o?this.isClosed(o):!1,{vertexStart:n,geometrySize:r}=e;i.fill(0,n,n+r),s?(i[n]=Be,i[n+r-2]=Be):(i[n]+=Zi,i[n+r-2]+=Ki),i[n+r-1]=Be}_updatePositions(o,e){let{positions:i}=this.attributes;if(!i||!o)return;let{vertexStart:s,geometrySize:n}=e,r=new Array(3);for(let a=s,l=0;l<n;a++,l++)this.getPointOnPath(o,l,r),i[a*3]=r[0],i[a*3+1]=r[1],i[a*3+2]=r[2]}getPathLength(o){return o.length/this.positionSize}getPointOnPath(o,e,i=[]){let{positionSize:s}=this;e*s>=o.length&&(e+=1-o.length/s);let n=e*s;return i[0]=o[n],i[1]=o[n+1],i[2]=s===3&&o[n+2]||0,i}isClosed(o){if(!this.normalize)return!!this.opts.loop;let{positionSize:e}=this,i=o.length-e;return o[0]===o[i]&&o[1]===o[i+1]&&(e===2||o[2]===o[i+2])}};function ut(t){return Array.isArray(t[0])}var ft=`uniform pathUniforms {
  float widthScale;
  float widthMinPixels;
  float widthMaxPixels;
  float jointType;
  float capType;
  float miterLimit;
  bool billboard;
  highp int widthUnits;
} path;
`,dt={name:"path",vs:ft,fs:ft,uniformTypes:{widthScale:"f32",widthMinPixels:"f32",widthMaxPixels:"f32",jointType:"f32",capType:"f32",miterLimit:"f32",billboard:"f32",widthUnits:"i32"}};var pt=`#version 300 es
#define SHADER_NAME path-layer-vertex-shader
in vec2 positions;
in float instanceTypes;
in vec3 instanceStartPositions;
in vec3 instanceEndPositions;
in vec3 instanceLeftPositions;
in vec3 instanceRightPositions;
in vec3 instanceLeftPositions64Low;
in vec3 instanceStartPositions64Low;
in vec3 instanceEndPositions64Low;
in vec3 instanceRightPositions64Low;
in float instanceStrokeWidths;
in vec4 instanceColors;
in vec3 instancePickingColors;
uniform float opacity;
out vec4 vColor;
out vec2 vCornerOffset;
out float vMiterLength;
out vec2 vPathPosition;
out float vPathLength;
out float vJointType;
const float EPSILON = 0.001;
const vec3 ZERO_OFFSET = vec3(0.0);
float flipIfTrue(bool flag) {
return -(float(flag) * 2. - 1.);
}
vec3 getLineJoinOffset(
vec3 prevPoint, vec3 currPoint, vec3 nextPoint,
vec2 width
) {
bool isEnd = positions.x > 0.0;
float sideOfPath = positions.y;
float isJoint = float(sideOfPath == 0.0);
vec3 deltaA3 = (currPoint - prevPoint);
vec3 deltaB3 = (nextPoint - currPoint);
mat3 rotationMatrix;
bool needsRotation = !path.billboard && project_needs_rotation(currPoint, rotationMatrix);
if (needsRotation) {
deltaA3 = deltaA3 * rotationMatrix;
deltaB3 = deltaB3 * rotationMatrix;
}
vec2 deltaA = deltaA3.xy / width;
vec2 deltaB = deltaB3.xy / width;
float lenA = length(deltaA);
float lenB = length(deltaB);
vec2 dirA = lenA > 0. ? normalize(deltaA) : vec2(0.0, 0.0);
vec2 dirB = lenB > 0. ? normalize(deltaB) : vec2(0.0, 0.0);
vec2 perpA = vec2(-dirA.y, dirA.x);
vec2 perpB = vec2(-dirB.y, dirB.x);
vec2 tangent = dirA + dirB;
tangent = length(tangent) > 0. ? normalize(tangent) : perpA;
vec2 miterVec = vec2(-tangent.y, tangent.x);
vec2 dir = isEnd ? dirA : dirB;
vec2 perp = isEnd ? perpA : perpB;
float L = isEnd ? lenA : lenB;
float sinHalfA = abs(dot(miterVec, perp));
float cosHalfA = abs(dot(dirA, miterVec));
float turnDirection = flipIfTrue(dirA.x * dirB.y >= dirA.y * dirB.x);
float cornerPosition = sideOfPath * turnDirection;
float miterSize = 1.0 / max(sinHalfA, EPSILON);
miterSize = mix(
min(miterSize, max(lenA, lenB) / max(cosHalfA, EPSILON)),
miterSize,
step(0.0, cornerPosition)
);
vec2 offsetVec = mix(miterVec * miterSize, perp, step(0.5, cornerPosition))
* (sideOfPath + isJoint * turnDirection);
bool isStartCap = lenA == 0.0 || (!isEnd && (instanceTypes == 1.0 || instanceTypes == 3.0));
bool isEndCap = lenB == 0.0 || (isEnd && (instanceTypes == 2.0 || instanceTypes == 3.0));
bool isCap = isStartCap || isEndCap;
if (isCap) {
offsetVec = mix(perp * sideOfPath, dir * path.capType * 4.0 * flipIfTrue(isStartCap), isJoint);
vJointType = path.capType;
} else {
vJointType = path.jointType;
}
vPathLength = L;
vCornerOffset = offsetVec;
vMiterLength = dot(vCornerOffset, miterVec * turnDirection);
vMiterLength = isCap ? isJoint : vMiterLength;
vec2 offsetFromStartOfPath = vCornerOffset + deltaA * float(isEnd);
vPathPosition = vec2(
dot(offsetFromStartOfPath, perp),
dot(offsetFromStartOfPath, dir)
);
geometry.uv = vPathPosition;
float isValid = step(instanceTypes, 3.5);
vec3 offset = vec3(offsetVec * width * isValid, 0.0);
if (needsRotation) {
offset = rotationMatrix * offset;
}
return offset;
}
void clipLine(inout vec4 position, vec4 refPosition) {
if (position.w < EPSILON) {
float r = (EPSILON - refPosition.w) / (position.w - refPosition.w);
position = refPosition + (position - refPosition) * r;
}
}
void main() {
geometry.pickingColor = instancePickingColors;
vColor = vec4(instanceColors.rgb, instanceColors.a * layer.opacity);
float isEnd = positions.x;
vec3 prevPosition = mix(instanceLeftPositions, instanceStartPositions, isEnd);
vec3 prevPosition64Low = mix(instanceLeftPositions64Low, instanceStartPositions64Low, isEnd);
vec3 currPosition = mix(instanceStartPositions, instanceEndPositions, isEnd);
vec3 currPosition64Low = mix(instanceStartPositions64Low, instanceEndPositions64Low, isEnd);
vec3 nextPosition = mix(instanceEndPositions, instanceRightPositions, isEnd);
vec3 nextPosition64Low = mix(instanceEndPositions64Low, instanceRightPositions64Low, isEnd);
geometry.worldPosition = currPosition;
vec2 widthPixels = vec2(clamp(
project_size_to_pixel(instanceStrokeWidths * path.widthScale, path.widthUnits),
path.widthMinPixels, path.widthMaxPixels) / 2.0);
vec3 width;
if (path.billboard) {
vec4 prevPositionScreen = project_position_to_clipspace(prevPosition, prevPosition64Low, ZERO_OFFSET);
vec4 currPositionScreen = project_position_to_clipspace(currPosition, currPosition64Low, ZERO_OFFSET, geometry.position);
vec4 nextPositionScreen = project_position_to_clipspace(nextPosition, nextPosition64Low, ZERO_OFFSET);
clipLine(prevPositionScreen, currPositionScreen);
clipLine(nextPositionScreen, currPositionScreen);
clipLine(currPositionScreen, mix(nextPositionScreen, prevPositionScreen, isEnd));
width = vec3(widthPixels, 0.0);
DECKGL_FILTER_SIZE(width, geometry);
vec3 offset = getLineJoinOffset(
prevPositionScreen.xyz / prevPositionScreen.w,
currPositionScreen.xyz / currPositionScreen.w,
nextPositionScreen.xyz / nextPositionScreen.w,
project_pixel_size_to_clipspace(width.xy)
);
DECKGL_FILTER_GL_POSITION(currPositionScreen, geometry);
gl_Position = vec4(currPositionScreen.xyz + offset * currPositionScreen.w, currPositionScreen.w);
} else {
prevPosition = project_position(prevPosition, prevPosition64Low);
currPosition = project_position(currPosition, currPosition64Low);
nextPosition = project_position(nextPosition, nextPosition64Low);
width = vec3(project_pixel_size(widthPixels), 0.0);
DECKGL_FILTER_SIZE(width, geometry);
vec3 offset = getLineJoinOffset(prevPosition, currPosition, nextPosition, width.xy);
geometry.position = vec4(currPosition + offset, 1.0);
gl_Position = project_common_position_to_clipspace(geometry.position);
DECKGL_FILTER_GL_POSITION(gl_Position, geometry);
}
DECKGL_FILTER_COLOR(vColor, geometry);
}
`;var gt=`#version 300 es
#define SHADER_NAME path-layer-fragment-shader
precision highp float;
in vec4 vColor;
in vec2 vCornerOffset;
in float vMiterLength;
in vec2 vPathPosition;
in float vPathLength;
in float vJointType;
out vec4 fragColor;
void main(void) {
geometry.uv = vPathPosition;
if (vPathPosition.y < 0.0 || vPathPosition.y > vPathLength) {
if (vJointType > 0.5 && length(vCornerOffset) > 1.0) {
discard;
}
if (vJointType < 0.5 && vMiterLength > path.miterLimit + 1.0) {
discard;
}
}
fragColor = vColor;
DECKGL_FILTER_COLOR(fragColor, geometry);
}
`;var ht=[0,0,0,255],$i={widthUnits:"meters",widthScale:{type:"number",min:0,value:1},widthMinPixels:{type:"number",min:0,value:0},widthMaxPixels:{type:"number",min:0,value:Number.MAX_SAFE_INTEGER},jointRounded:!1,capRounded:!1,miterLimit:{type:"number",min:0,value:4},billboard:!1,_pathType:null,getPath:{type:"accessor",value:t=>t.path},getColor:{type:"accessor",value:ht},getWidth:{type:"accessor",value:1},rounded:{deprecatedFor:["jointRounded","capRounded"]}},We={enter:(t,o)=>o.length?o.subarray(o.length-t.length):t},Ji=(()=>{class t extends R{getShaders(){return super.getShaders({vs:pt,fs:gt,modules:[O,F,dt]})}get wrapLongitude(){return!1}getBounds(){return this.getAttributeManager()?.getBounds(["vertexPositions"])}initializeState(){this.getAttributeManager().addInstanced({vertexPositions:{size:3,vertexOffset:1,type:"float64",fp64:this.use64bitPositions(),transition:We,accessor:"getPath",update:this.calculatePositions,noAlloc:!0,shaderAttributes:{instanceLeftPositions:{vertexOffset:0},instanceStartPositions:{vertexOffset:1},instanceEndPositions:{vertexOffset:2},instanceRightPositions:{vertexOffset:3}}},instanceTypes:{size:1,type:"uint8",update:this.calculateSegmentTypes,noAlloc:!0},instanceStrokeWidths:{size:1,accessor:"getWidth",transition:We,defaultValue:1},instanceColors:{size:this.props.colorFormat.length,type:"unorm8",accessor:"getColor",transition:We,defaultValue:ht},instancePickingColors:{size:4,type:"uint8",accessor:(s,{index:n,target:r})=>this.encodePickingColor(s&&s.__source?s.__source.index:n,r)}}),this.setState({pathTesselator:new ge({fp64:this.use64bitPositions()})})}updateState(e){super.updateState(e);let{props:i,changeFlags:s}=e,n=this.getAttributeManager();if(s.dataChanged||s.updateTriggersChanged&&(s.updateTriggersChanged.all||s.updateTriggersChanged.getPath)){let{pathTesselator:a}=this.state,l=i.data.attributes||{};a.updateGeometry({data:i.data,geometryBuffer:l.getPath,buffers:l,normalize:!i._pathType,loop:i._pathType==="loop",getGeometry:i.getPath,positionFormat:i.positionFormat,wrapLongitude:i.wrapLongitude,resolution:this.context.viewport.resolution,dataChanged:s.dataChanged}),this.setState({numInstances:a.instanceCount,startIndices:a.vertexStarts}),s.dataChanged||n.invalidateAll()}s.extensionsChanged&&(this.state.model?.destroy(),this.state.model=this._getModel(),n.invalidateAll())}getPickingInfo(e){let i=super.getPickingInfo(e),{index:s}=i,n=this.props.data;return n[0]&&n[0].__source&&(i.object=n.find(r=>r.__source.index===s)),i}disablePickingIndex(e){let i=this.props.data;if(i[0]&&i[0].__source)for(let s=0;s<i.length;s++)i[s].__source.index===e&&this._disablePickingIndex(s);else super.disablePickingIndex(e)}draw({uniforms:e}){let{jointRounded:i,capRounded:s,billboard:n,miterLimit:r,widthUnits:a,widthScale:l,widthMinPixels:c,widthMaxPixels:u}=this.props,f=this.state.model,d={jointType:Number(i),capType:Number(s),billboard:n,widthUnits:z[a],widthScale:l,miterLimit:r,widthMinPixels:c,widthMaxPixels:u};f.shaderInputs.setProps({path:d}),f.draw(this.context.renderPass)}_getModel(){let e=[0,1,2,1,4,2,1,3,4,3,5,4],i=[0,0,0,-1,0,1,1,-1,1,1,1,0];return new A(this.context.device,C(v({},this.getShaders()),{id:this.props.id,bufferLayout:this.getAttributeManager().getBufferLayouts(),geometry:new E({topology:"triangle-list",attributes:{indices:new Uint16Array(e),positions:{value:new Float32Array(i),size:2}}}),isInstanced:!0}))}calculatePositions(e){let{pathTesselator:i}=this.state;e.startIndices=i.vertexStarts,e.value=i.get("positions")}calculateSegmentTypes(e){let{pathTesselator:i}=this.state;e.startIndices=i.vertexStarts,e.value=i.get("segmentTypes")}}return t.defaultProps=$i,t.layerName="PathLayer",t})(),Ne=Ji;var It=ki(Pt(),1);var ve=H.CLOCKWISE,Ct=H.COUNTER_CLOCKWISE,G={isClosed:!0};function fo(t){if(t=t&&t.positions||t,!Array.isArray(t)&&!ArrayBuffer.isView(t))throw new Error("invalid polygon")}function Z(t){return"positions"in t?t.positions:t}function te(t){return"holeIndices"in t?t.holeIndices:null}function po(t){return Array.isArray(t[0])}function go(t){return t.length>=1&&t[0].length>=2&&Number.isFinite(t[0][0])}function ho(t){let o=t[0],e=t[t.length-1];return o[0]===e[0]&&o[1]===e[1]&&o[2]===e[2]}function xo(t,o,e,i){for(let s=0;s<o;s++)if(t[e+s]!==t[i-o+s])return!1;return!0}function _t(t,o,e,i,s){let n=o,r=e.length;for(let a=0;a<r;a++)for(let l=0;l<i;l++)t[n++]=e[a][l]||0;if(!ho(e))for(let a=0;a<i;a++)t[n++]=e[0][a]||0;return G.start=o,G.end=n,G.size=i,D(t,s,G),n}function Lt(t,o,e,i,s=0,n,r){n=n||e.length;let a=n-s;if(a<=0)return o;let l=o;for(let c=0;c<a;c++)t[l++]=e[s+c];if(!xo(e,i,s,n))for(let c=0;c<i;c++)t[l++]=e[s+c];return G.start=o,G.end=l,G.size=i,D(t,r,G),l}function wt(t,o){fo(t);let e=[],i=[];if("positions"in t){let{positions:s,holeIndices:n}=t;if(n){let r=0;for(let a=0;a<=n.length;a++)r=Lt(e,r,s,o,n[a-1],n[a],a===0?ve:Ct),i.push(r);return i.pop(),{positions:e,holeIndices:i}}t=s}if(!po(t))return Lt(e,0,t,o,0,e.length,ve),e;if(!go(t)){let s=0;for(let[n,r]of t.entries())s=_t(e,s,r,o,n===0?ve:Ct),i.push(s);return i.pop(),{positions:e,holeIndices:i}}return _t(e,0,t,o,ve),e}function He(t,o,e){let i=t.length/3,s=0;for(let n=0;n<i;n++){let r=(n+1)%i;s+=t[n*3+o]*t[r*3+e],s-=t[r*3+o]*t[n*3+e]}return Math.abs(s/2)}function St(t,o,e,i){let s=t.length/3;for(let n=0;n<s;n++){let r=n*3,a=t[r+0],l=t[r+1],c=t[r+2];t[r+o]=a,t[r+e]=l,t[r+i]=c}}function Mt(t,o,e,i){let s=te(t);s&&(s=s.map(a=>a/o));let n=Z(t),r=i&&o===3;if(e){let a=n.length;n=n.slice();let l=[];for(let c=0;c<a;c+=o){l[0]=n[c],l[1]=n[c+1],r&&(l[2]=n[c+2]);let u=e(l);n[c]=u[0],n[c+1]=u[1],r&&(n[c+2]=u[2])}}if(r){let a=He(n,0,1),l=He(n,0,2),c=He(n,1,2);if(!a&&!l&&!c)return[];a>l&&a>c||(l>c?(e||(n=n.slice()),St(n,0,2,1)):(e||(n=n.slice()),St(n,2,0,1)))}return(0,It.default)(n,s,o)}var Pe=class extends ue{constructor(o){let{fp64:e,IndexType:i=Uint32Array}=o;super(C(v({},o),{attributes:{positions:{size:3,type:e?Float64Array:Float32Array},vertexValid:{type:Uint16Array,size:1},indices:{type:i,size:1}}}))}get(o){let{attributes:e}=this;return o==="indices"?e.indices&&e.indices.subarray(0,this.vertexCount):e[o]}updateGeometry(o){super.updateGeometry(o);let e=this.buffers.indices;if(e)this.vertexCount=(e.value||e).length;else if(this.data&&!this.getGeometry)throw new Error("missing indices buffer")}normalizeGeometry(o){if(this.normalize){let e=wt(o,this.positionSize);return this.opts.resolution?X(Z(e),te(e),{size:this.positionSize,gridResolution:this.opts.resolution,edgeTypes:!0}):this.opts.wrapLongitude?ke(Z(e),te(e),{size:this.positionSize,maxLatitude:86,edgeTypes:!0}):e}return o}getGeometrySize(o){if(At(o)){let e=0;for(let i of o)e+=this.getGeometrySize(i);return e}return Z(o).length/this.positionSize}getGeometryFromBuffer(o){return this.normalize||!this.buffers.indices?super.getGeometryFromBuffer(o):null}updateGeometryAttributes(o,e){if(o&&At(o))for(let i of o){let s=this.getGeometrySize(i);e.geometrySize=s,this.updateGeometryAttributes(i,e),e.vertexStart+=s,e.indexStart=this.indexStarts[e.geometryIndex+1]}else{let i=o;this._updateIndices(i,e),this._updatePositions(i,e),this._updateVertexValid(i,e)}}_updateIndices(o,{geometryIndex:e,vertexStart:i,indexStart:s}){let{attributes:n,indexStarts:r,typedArrayManager:a}=this,l=n.indices;if(!l||!o)return;let c=s,u=Mt(o,this.positionSize,this.opts.preproject,this.opts.full3d);l=a.allocate(l,s+u.length,{copy:!0});for(let f=0;f<u.length;f++)l[c++]=u[f]+i;r[e+1]=s+u.length,n.indices=l}_updatePositions(o,{vertexStart:e,geometrySize:i}){let{attributes:{positions:s},positionSize:n}=this;if(!s||!o)return;let r=Z(o);for(let a=e,l=0;l<i;a++,l++){let c=r[l*n],u=r[l*n+1],f=n>2?r[l*n+2]:0;s[a*3]=c,s[a*3+1]=u,s[a*3+2]=f}}_updateVertexValid(o,{vertexStart:e,geometrySize:i}){let{positionSize:s}=this,n=this.attributes.vertexValid,r=o&&te(o);if(o&&o.edgeTypes?n.set(o.edgeTypes,e):n.fill(1,e,e+i),r)for(let a=0;a<r.length;a++)n[e+r[a]/s-1]=0;n[e+i-1]=0}};function At(t){return Array.isArray(t)&&t.length>0&&!Number.isFinite(t[0])}var bt=`uniform solidPolygonUniforms {
  bool extruded;
  bool isWireframe;
  float elevationScale;
} solidPolygon;
`,Tt={name:"solidPolygon",vs:bt,fs:bt,uniformTypes:{extruded:"f32",isWireframe:"f32",elevationScale:"f32"}};var Ce=`in vec4 fillColors;
in vec4 lineColors;
in vec3 pickingColors;
out vec4 vColor;
struct PolygonProps {
vec3 positions;
vec3 positions64Low;
vec3 normal;
float elevations;
};
vec3 project_offset_normal(vec3 vector) {
if (project.coordinateSystem == COORDINATE_SYSTEM_LNGLAT ||
project.coordinateSystem == COORDINATE_SYSTEM_LNGLAT_OFFSETS) {
return normalize(vector * project.commonUnitsPerWorldUnit);
}
return project_normal(vector);
}
void calculatePosition(PolygonProps props) {
vec3 pos = props.positions;
vec3 pos64Low = props.positions64Low;
vec3 normal = props.normal;
vec4 colors = solidPolygon.isWireframe ? lineColors : fillColors;
geometry.worldPosition = props.positions;
geometry.pickingColor = pickingColors;
if (solidPolygon.extruded) {
pos.z += props.elevations * solidPolygon.elevationScale;
}
gl_Position = project_position_to_clipspace(pos, pos64Low, vec3(0.), geometry.position);
DECKGL_FILTER_GL_POSITION(gl_Position, geometry);
if (solidPolygon.extruded) {
#ifdef IS_SIDE_VERTEX
normal = project_offset_normal(normal);
#else
normal = project_normal(normal);
#endif
geometry.normal = normal;
vec3 lightColor = lighting_getLightColor(colors.rgb, project.cameraPosition, geometry.position.xyz, geometry.normal);
vColor = vec4(lightColor, colors.a * layer.opacity);
} else {
vColor = vec4(colors.rgb, colors.a * layer.opacity);
}
DECKGL_FILTER_COLOR(vColor, geometry);
}
`;var Et=`#version 300 es
#define SHADER_NAME solid-polygon-layer-vertex-shader
in vec3 vertexPositions;
in vec3 vertexPositions64Low;
in float elevations;
${Ce}
void main(void) {
PolygonProps props;
props.positions = vertexPositions;
props.positions64Low = vertexPositions64Low;
props.elevations = elevations;
props.normal = vec3(0.0, 0.0, 1.0);
calculatePosition(props);
}
`;var zt=`#version 300 es
#define SHADER_NAME solid-polygon-layer-vertex-shader-side
#define IS_SIDE_VERTEX
in vec2 positions;
in vec3 vertexPositions;
in vec3 nextVertexPositions;
in vec3 vertexPositions64Low;
in vec3 nextVertexPositions64Low;
in float elevations;
in float instanceVertexValid;
${Ce}
void main(void) {
if(instanceVertexValid < 0.5){
gl_Position = vec4(0.);
return;
}
PolygonProps props;
vec3 pos;
vec3 pos64Low;
vec3 nextPos;
vec3 nextPos64Low;
#if RING_WINDING_ORDER_CW == 1
pos = vertexPositions;
pos64Low = vertexPositions64Low;
nextPos = nextVertexPositions;
nextPos64Low = nextVertexPositions64Low;
#else
pos = nextVertexPositions;
pos64Low = nextVertexPositions64Low;
nextPos = vertexPositions;
nextPos64Low = vertexPositions64Low;
#endif
props.positions = mix(pos, nextPos, positions.x);
props.positions64Low = mix(pos64Low, nextPos64Low, positions.x);
props.normal = vec3(
pos.y - nextPos.y + (pos64Low.y - nextPos64Low.y),
nextPos.x - pos.x + (nextPos64Low.x - pos64Low.x),
0.0);
props.elevations = elevations * positions.y;
calculatePosition(props);
}
`;var Ot=`#version 300 es
#define SHADER_NAME solid-polygon-layer-fragment-shader
precision highp float;
in vec4 vColor;
out vec4 fragColor;
void main(void) {
fragColor = vColor;
geometry.uv = vec2(0.);
DECKGL_FILTER_COLOR(fragColor, geometry);
}
`;var Le=[0,0,0,255],mo={filled:!0,extruded:!1,wireframe:!1,_normalize:!0,_windingOrder:"CW",_full3d:!1,elevationScale:{type:"number",min:0,value:1},getPolygon:{type:"accessor",value:t=>t.polygon},getElevation:{type:"accessor",value:1e3},getFillColor:{type:"accessor",value:Le},getLineColor:{type:"accessor",value:Le},material:!0},_e={enter:(t,o)=>o.length?o.subarray(o.length-t.length):t},vo=(()=>{class t extends R{getShaders(e){return super.getShaders({vs:e==="top"?Et:zt,fs:Ot,defines:{RING_WINDING_ORDER_CW:!this.props._normalize&&this.props._windingOrder==="CCW"?0:1},modules:[O,re,F,Tt]})}get wrapLongitude(){return!1}getBounds(){return this.getAttributeManager()?.getBounds(["vertexPositions"])}initializeState(){let{viewport:e}=this.context,{coordinateSystem:i}=this.props,{_full3d:s}=this.props;e.isGeospatial&&i===ae.DEFAULT&&(i=ae.LNGLAT);let n;i===ae.LNGLAT&&(s?n=e.projectPosition.bind(e):n=e.projectFlat.bind(e)),this.setState({numInstances:0,polygonTesselator:new Pe({preproject:n,fp64:this.use64bitPositions(),IndexType:Uint32Array})});let r=this.getAttributeManager(),a=!0;r.remove(["instancePickingColors"]),r.add({indices:{size:1,isIndexed:!0,update:this.calculateIndices,noAlloc:a},vertexPositions:{size:3,type:"float64",stepMode:"dynamic",fp64:this.use64bitPositions(),transition:_e,accessor:"getPolygon",update:this.calculatePositions,noAlloc:a,shaderAttributes:{nextVertexPositions:{vertexOffset:1}}},instanceVertexValid:{size:1,type:"uint16",stepMode:"instance",update:this.calculateVertexValid,noAlloc:a},elevations:{size:1,stepMode:"dynamic",transition:_e,accessor:"getElevation"},fillColors:{size:this.props.colorFormat.length,type:"unorm8",stepMode:"dynamic",transition:_e,accessor:"getFillColor",defaultValue:Le},lineColors:{size:this.props.colorFormat.length,type:"unorm8",stepMode:"dynamic",transition:_e,accessor:"getLineColor",defaultValue:Le},pickingColors:{size:4,type:"uint8",stepMode:"dynamic",accessor:(l,{index:c,target:u})=>this.encodePickingColor(l&&l.__source?l.__source.index:c,u)}})}getPickingInfo(e){let i=super.getPickingInfo(e),{index:s}=i,n=this.props.data;return n[0]&&n[0].__source&&(i.object=n.find(r=>r.__source.index===s)),i}disablePickingIndex(e){let i=this.props.data;if(i[0]&&i[0].__source)for(let s=0;s<i.length;s++)i[s].__source.index===e&&this._disablePickingIndex(s);else super.disablePickingIndex(e)}draw({uniforms:e}){let{extruded:i,filled:s,wireframe:n,elevationScale:r}=this.props,{topModel:a,sideModel:l,wireframeModel:c,polygonTesselator:u}=this.state,f={extruded:!!i,elevationScale:r,isWireframe:!1};c&&n&&(c.setInstanceCount(u.instanceCount-1),c.shaderInputs.setProps({solidPolygon:C(v({},f),{isWireframe:!0})}),c.draw(this.context.renderPass)),l&&s&&(l.setInstanceCount(u.instanceCount-1),l.shaderInputs.setProps({solidPolygon:f}),l.draw(this.context.renderPass)),a&&s&&(a.setVertexCount(u.vertexCount),a.shaderInputs.setProps({solidPolygon:f}),a.draw(this.context.renderPass))}updateState(e){super.updateState(e),this.updateGeometry(e);let{props:i,oldProps:s,changeFlags:n}=e,r=this.getAttributeManager();(n.extensionsChanged||i.filled!==s.filled||i.extruded!==s.extruded)&&(this.state.models?.forEach(l=>l.destroy()),this.setState(this._getModels()),r.invalidateAll())}updateGeometry({props:e,oldProps:i,changeFlags:s}){if(s.dataChanged||s.updateTriggersChanged&&(s.updateTriggersChanged.all||s.updateTriggersChanged.getPolygon)){let{polygonTesselator:r}=this.state,a=e.data.attributes||{};r.updateGeometry({data:e.data,normalize:e._normalize,geometryBuffer:a.getPolygon,buffers:a,getGeometry:e.getPolygon,positionFormat:e.positionFormat,wrapLongitude:e.wrapLongitude,resolution:this.context.viewport.resolution,fp64:this.use64bitPositions(),dataChanged:s.dataChanged,full3d:e._full3d}),this.setState({numInstances:r.instanceCount,startIndices:r.vertexStarts}),s.dataChanged||this.getAttributeManager().invalidateAll()}}_getModels(){let{id:e,filled:i,extruded:s}=this.props,n,r,a;if(i){let l=this.getShaders("top");l.defines.NON_INSTANCED_MODEL=1;let c=this.getAttributeManager().getBufferLayouts({isInstanced:!1});n=new A(this.context.device,C(v({},l),{id:`${e}-top`,topology:"triangle-list",bufferLayout:c,isIndexed:!0,userData:{excludeAttributes:{instanceVertexValid:!0}}}))}if(s){let l=this.getAttributeManager().getBufferLayouts({isInstanced:!0});r=new A(this.context.device,C(v({},this.getShaders("side")),{id:`${e}-side`,bufferLayout:l,geometry:new E({topology:"triangle-strip",attributes:{positions:{size:2,value:new Float32Array([1,0,0,0,1,1,0,1])}}}),isInstanced:!0,userData:{excludeAttributes:{indices:!0}}})),a=new A(this.context.device,C(v({},this.getShaders("side")),{id:`${e}-wireframe`,bufferLayout:l,geometry:new E({topology:"line-strip",attributes:{positions:{size:2,value:new Float32Array([1,0,0,0,0,1,1,1])}}}),isInstanced:!0,userData:{excludeAttributes:{indices:!0}}}))}return{models:[r,a,n].filter(Boolean),topModel:n,sideModel:r,wireframeModel:a}}calculateIndices(e){let{polygonTesselator:i}=this.state;e.startIndices=i.indexStarts,e.value=i.get("indices")}calculatePositions(e){let{polygonTesselator:i}=this.state;e.startIndices=i.vertexStarts,e.value=i.get("positions")}calculateVertexValid(e){e.value=this.state.polygonTesselator.get("vertexValid")}}return t.defaultProps=mo,t.layerName="SolidPolygonLayer",t})(),je=vo;var Ft=`uniform iconUniforms {
  float sizeScale;
  vec2 iconsTextureDim;
  float sizeBasis;
  float sizeMinPixels;
  float sizeMaxPixels;
  bool billboard;
  highp int sizeUnits;
  float alphaCutoff;
} icon;
`,Rt={name:"icon",vs:Ft,fs:Ft,uniformTypes:{sizeScale:"f32",iconsTextureDim:"vec2<f32>",sizeBasis:"f32",sizeMinPixels:"f32",sizeMaxPixels:"f32",billboard:"f32",sizeUnits:"i32",alphaCutoff:"f32"}};var kt=`#version 300 es
#define SHADER_NAME icon-layer-vertex-shader
in vec2 positions;
in vec3 instancePositions;
in vec3 instancePositions64Low;
in float instanceSizes;
in float instanceAngles;
in vec4 instanceColors;
in vec3 instancePickingColors;
in vec4 instanceIconFrames;
in float instanceColorModes;
in vec2 instanceOffsets;
in vec2 instancePixelOffset;
out float vColorMode;
out vec4 vColor;
out vec2 vTextureCoords;
out vec2 uv;
vec2 rotate_by_angle(vec2 vertex, float angle) {
float angle_radian = angle * PI / 180.0;
float cos_angle = cos(angle_radian);
float sin_angle = sin(angle_radian);
mat2 rotationMatrix = mat2(cos_angle, -sin_angle, sin_angle, cos_angle);
return rotationMatrix * vertex;
}
void main(void) {
geometry.worldPosition = instancePositions;
geometry.uv = positions;
geometry.pickingColor = instancePickingColors;
uv = positions;
vec2 iconSize = instanceIconFrames.zw;
float sizePixels = clamp(
project_size_to_pixel(instanceSizes * icon.sizeScale, icon.sizeUnits),
icon.sizeMinPixels, icon.sizeMaxPixels
);
float iconConstraint = icon.sizeBasis == 0.0 ? iconSize.x : iconSize.y;
float instanceScale = iconConstraint == 0.0 ? 0.0 : sizePixels / iconConstraint;
vec2 pixelOffset = positions / 2.0 * iconSize + instanceOffsets;
pixelOffset = rotate_by_angle(pixelOffset, instanceAngles) * instanceScale;
pixelOffset += instancePixelOffset;
pixelOffset.y *= -1.0;
if (icon.billboard)  {
gl_Position = project_position_to_clipspace(instancePositions, instancePositions64Low, vec3(0.0), geometry.position);
DECKGL_FILTER_GL_POSITION(gl_Position, geometry);
vec3 offset = vec3(pixelOffset, 0.0);
DECKGL_FILTER_SIZE(offset, geometry);
gl_Position.xy += project_pixel_size_to_clipspace(offset.xy);
} else {
vec3 offset_common = vec3(project_pixel_size(pixelOffset), 0.0);
DECKGL_FILTER_SIZE(offset_common, geometry);
gl_Position = project_position_to_clipspace(instancePositions, instancePositions64Low, offset_common, geometry.position);
DECKGL_FILTER_GL_POSITION(gl_Position, geometry);
}
vTextureCoords = mix(
instanceIconFrames.xy,
instanceIconFrames.xy + iconSize,
(positions.xy + 1.0) / 2.0
) / icon.iconsTextureDim;
vColor = instanceColors;
DECKGL_FILTER_COLOR(vColor, geometry);
vColorMode = instanceColorModes;
}
`;var Bt=`#version 300 es
#define SHADER_NAME icon-layer-fragment-shader
precision highp float;
uniform sampler2D iconsTexture;
in float vColorMode;
in vec4 vColor;
in vec2 vTextureCoords;
in vec2 uv;
out vec4 fragColor;
void main(void) {
geometry.uv = uv;
vec4 texColor = texture(iconsTexture, vTextureCoords);
vec3 color = mix(texColor.rgb, vColor.rgb, vColorMode);
float a = texColor.a * layer.opacity * vColor.a;
if (a < icon.alphaCutoff) {
discard;
}
fragColor = vec4(color, a);
DECKGL_FILTER_COLOR(fragColor, geometry);
}
`;var Po=1024,Co=4,Wt=()=>{},Nt={minFilter:"linear",mipmapFilter:"linear",magFilter:"linear",addressModeU:"clamp-to-edge",addressModeV:"clamp-to-edge"},_o={x:0,y:0,width:0,height:0};function Lo(t){return Math.pow(2,Math.ceil(Math.log2(t)))}function So(t,o,e,i){let s=Math.min(e/o.width,i/o.height),n=Math.floor(o.width*s),r=Math.floor(o.height*s);return s===1?{image:o,width:n,height:r}:(t.canvas.height=r,t.canvas.width=n,t.clearRect(0,0,n,r),t.drawImage(o,0,0,o.width,o.height,0,0,n,r),{image:t.canvas,width:n,height:r})}function ie(t){return t&&(t.id||t.url)}function Io(t,o,e,i){let{width:s,height:n,device:r}=t,a=r.createTexture({format:"rgba8unorm",width:o,height:e,sampler:i,mipLevels:r.getMipLevelCount(o,e)}),l=r.createCommandEncoder();return l.copyTextureToTexture({sourceTexture:t,destinationTexture:a,width:s,height:n}),l.finish(),a.generateMipmapsWebGL(),t.destroy(),a}function Gt(t,o,e){for(let i=0;i<o.length;i++){let{icon:s,xOffset:n}=o[i],r=ie(s);t[r]=C(v({},s),{x:n,y:e})}}function wo({icons:t,buffer:o,mapping:e={},xOffset:i=0,yOffset:s=0,rowHeight:n=0,canvasWidth:r}){let a=[];for(let l=0;l<t.length;l++){let c=t[l],u=ie(c);if(!e[u]){let{height:f,width:d}=c;i+d+o>r&&(Gt(e,a,s),i=0,s=n+s+o,n=0,a=[]),a.push({icon:c,xOffset:i}),i=i+d+o,n=Math.max(n,f)}}return a.length>0&&Gt(e,a,s),{mapping:e,rowHeight:n,xOffset:i,yOffset:s,canvasWidth:r,canvasHeight:Lo(n+s+o)}}function Mo(t,o,e){if(!t||!o)return null;e=e||{};let i={},{iterable:s,objectInfo:n}=le(t);for(let r of s){n.index++;let a=o(r,n),l=ie(a);if(!a)throw new Error("Icon is missing.");if(!a.url)throw new Error("Icon url is missing.");!i[l]&&(!e[l]||a.url!==e[l].url)&&(i[l]=C(v({},a),{source:r,sourceIndex:n.index}))}return i}var Se=class{constructor(o,{onUpdate:e=Wt,onError:i=Wt}){this._loadOptions=null,this._texture=null,this._externalTexture=null,this._mapping={},this._samplerParameters=null,this._pendingCount=0,this._autoPacking=!1,this._xOffset=0,this._yOffset=0,this._rowHeight=0,this._buffer=Co,this._canvasWidth=Po,this._canvasHeight=0,this._canvas=null,this.device=o,this.onUpdate=e,this.onError=i}finalize(){this._texture?.delete()}getTexture(){return this._texture||this._externalTexture}getIconMapping(o){let e=this._autoPacking?ie(o):o;return this._mapping[e]||_o}setProps({loadOptions:o,autoPacking:e,iconAtlas:i,iconMapping:s,textureParameters:n}){o&&(this._loadOptions=o),e!==void 0&&(this._autoPacking=e),s&&(this._mapping=s),i&&(this._texture?.delete(),this._texture=null,this._externalTexture=i),n&&(this._samplerParameters=n)}get isLoaded(){return this._pendingCount===0}packIcons(o,e){if(!this._autoPacking||typeof document>"u")return;let i=Object.values(Mo(o,e,this._mapping)||{});if(i.length>0){let{mapping:s,xOffset:n,yOffset:r,rowHeight:a,canvasHeight:l}=wo({icons:i,buffer:this._buffer,canvasWidth:this._canvasWidth,mapping:this._mapping,rowHeight:this._rowHeight,xOffset:this._xOffset,yOffset:this._yOffset});this._rowHeight=a,this._mapping=s,this._xOffset=n,this._yOffset=r,this._canvasHeight=l,this._texture||(this._texture=this.device.createTexture({format:"rgba8unorm",data:null,width:this._canvasWidth,height:this._canvasHeight,sampler:this._samplerParameters||Nt,mipLevels:this.device.getMipLevelCount(this._canvasWidth,this._canvasHeight)})),this._texture.height!==this._canvasHeight&&(this._texture=Io(this._texture,this._canvasWidth,this._canvasHeight,this._samplerParameters||Nt)),this.onUpdate(!0),this._canvas=this._canvas||document.createElement("canvas"),this._loadIcons(i)}}_loadIcons(o){let e=this._canvas.getContext("2d",{willReadFrequently:!0});for(let i of o)this._pendingCount++,et(i.url,this._loadOptions).then(s=>{let n=ie(i),r=this._mapping[n],{x:a,y:l,width:c,height:u}=r,{image:f,width:d,height:p}=So(e,s,c,u),g=a+(c-d)/2,h=l+(u-p)/2;this._texture?.copyExternalImage({image:f,x:g,y:h,width:d,height:p}),r.x=g,r.y=h,r.width=d,r.height=p,this._texture?.generateMipmapsWebGL(),this.onUpdate(d!==c||p!==u)}).catch(s=>{this.onError({url:i.url,source:i.source,sourceIndex:i.sourceIndex,loadOptions:this._loadOptions,error:s})}).finally(()=>{this._pendingCount--})}};var Dt=[0,0,0,255],Ao={iconAtlas:{type:"image",value:null,async:!0},iconMapping:{type:"object",value:{},async:!0},sizeScale:{type:"number",value:1,min:0},billboard:!0,sizeUnits:"pixels",sizeBasis:"height",sizeMinPixels:{type:"number",min:0,value:0},sizeMaxPixels:{type:"number",min:0,value:Number.MAX_SAFE_INTEGER},alphaCutoff:{type:"number",value:.05,min:0,max:1},getPosition:{type:"accessor",value:t=>t.position},getIcon:{type:"accessor",value:t=>t.icon},getColor:{type:"accessor",value:Dt},getSize:{type:"accessor",value:1},getAngle:{type:"accessor",value:0},getPixelOffset:{type:"accessor",value:[0,0]},onIconError:{type:"function",value:null,optional:!0},textureParameters:{type:"object",ignore:!0,value:null}},bo=(()=>{class t extends R{getShaders(){return super.getShaders({vs:kt,fs:Bt,modules:[O,F,Rt]})}initializeState(){this.state={iconManager:new Se(this.context.device,{onUpdate:this._onUpdate.bind(this),onError:this._onError.bind(this)})},this.getAttributeManager().addInstanced({instancePositions:{size:3,type:"float64",fp64:this.use64bitPositions(),transition:!0,accessor:"getPosition"},instanceSizes:{size:1,transition:!0,accessor:"getSize",defaultValue:1},instanceOffsets:{size:2,accessor:"getIcon",transform:this.getInstanceOffset},instanceIconFrames:{size:4,accessor:"getIcon",transform:this.getInstanceIconFrame},instanceColorModes:{size:1,type:"uint8",accessor:"getIcon",transform:this.getInstanceColorMode},instanceColors:{size:this.props.colorFormat.length,type:"unorm8",transition:!0,accessor:"getColor",defaultValue:Dt},instanceAngles:{size:1,transition:!0,accessor:"getAngle"},instancePixelOffset:{size:2,transition:!0,accessor:"getPixelOffset"}})}updateState(e){super.updateState(e);let{props:i,oldProps:s,changeFlags:n}=e,r=this.getAttributeManager(),{iconAtlas:a,iconMapping:l,data:c,getIcon:u,textureParameters:f}=i,{iconManager:d}=this.state;if(typeof a=="string")return;let p=a||this.internalState.isAsyncPropLoading("iconAtlas");d.setProps({loadOptions:i.loadOptions,autoPacking:!p,iconAtlas:a,iconMapping:p?l:null,textureParameters:f}),p?s.iconMapping!==i.iconMapping&&r.invalidate("getIcon"):(n.dataChanged||n.updateTriggersChanged&&(n.updateTriggersChanged.all||n.updateTriggersChanged.getIcon))&&d.packIcons(c,u),n.extensionsChanged&&(this.state.model?.destroy(),this.state.model=this._getModel(),r.invalidateAll())}get isLoaded(){return super.isLoaded&&this.state.iconManager.isLoaded}finalizeState(e){super.finalizeState(e),this.state.iconManager.finalize()}draw({uniforms:e}){let{sizeScale:i,sizeBasis:s,sizeMinPixels:n,sizeMaxPixels:r,sizeUnits:a,billboard:l,alphaCutoff:c}=this.props,{iconManager:u}=this.state,f=u.getTexture();if(f){let d=this.state.model,p={iconsTexture:f,iconsTextureDim:[f.width,f.height],sizeUnits:z[a],sizeScale:i,sizeBasis:s==="height"?1:0,sizeMinPixels:n,sizeMaxPixels:r,billboard:l,alphaCutoff:c};d.shaderInputs.setProps({icon:p}),d.draw(this.context.renderPass)}}_getModel(){let e=[-1,-1,1,-1,-1,1,1,1];return new A(this.context.device,C(v({},this.getShaders()),{id:this.props.id,bufferLayout:this.getAttributeManager().getBufferLayouts(),geometry:new E({topology:"triangle-strip",attributes:{positions:{size:2,value:new Float32Array(e)}}}),isInstanced:!0}))}_onUpdate(e){e?(this.getAttributeManager()?.invalidate("getIcon"),this.setNeedsUpdate()):this.setNeedsRedraw()}_onError(e){let i=this.getCurrentLayer()?.props.onIconError;i?i(e):M.error(e.error.message)()}getInstanceOffset(e){let{width:i,height:s,anchorX:n=i/2,anchorY:r=s/2}=this.state.iconManager.getIconMapping(e);return[i/2-n,s/2-r]}getInstanceColorMode(e){return this.state.iconManager.getIconMapping(e).mask?1:0}getInstanceIconFrame(e){let{x:i,y:s,width:n,height:r}=this.state.iconManager.getIconMapping(e);return[i,s,n,r]}}return t.defaultProps=Ao,t.layerName="IconLayer",t})(),Ie=bo;var Ut=`uniform scatterplotUniforms {
  float radiusScale;
  float radiusMinPixels;
  float radiusMaxPixels;
  float lineWidthScale;
  float lineWidthMinPixels;
  float lineWidthMaxPixels;
  float stroked;
  float filled;
  bool antialiasing;
  bool billboard;
  highp int radiusUnits;
  highp int lineWidthUnits;
} scatterplot;
`,Vt={name:"scatterplot",vs:Ut,fs:Ut,source:"",uniformTypes:{radiusScale:"f32",radiusMinPixels:"f32",radiusMaxPixels:"f32",lineWidthScale:"f32",lineWidthMinPixels:"f32",lineWidthMaxPixels:"f32",stroked:"f32",filled:"f32",antialiasing:"f32",billboard:"f32",radiusUnits:"i32",lineWidthUnits:"i32"}};var Ht=`#version 300 es
#define SHADER_NAME scatterplot-layer-vertex-shader
in vec3 positions;
in vec3 instancePositions;
in vec3 instancePositions64Low;
in float instanceRadius;
in float instanceLineWidths;
in vec4 instanceFillColors;
in vec4 instanceLineColors;
in vec3 instancePickingColors;
out vec4 vFillColor;
out vec4 vLineColor;
out vec2 unitPosition;
out float innerUnitRadius;
out float outerRadiusPixels;
void main(void) {
geometry.worldPosition = instancePositions;
outerRadiusPixels = clamp(
project_size_to_pixel(scatterplot.radiusScale * instanceRadius, scatterplot.radiusUnits),
scatterplot.radiusMinPixels, scatterplot.radiusMaxPixels
);
float lineWidthPixels = clamp(
project_size_to_pixel(scatterplot.lineWidthScale * instanceLineWidths, scatterplot.lineWidthUnits),
scatterplot.lineWidthMinPixels, scatterplot.lineWidthMaxPixels
);
outerRadiusPixels += scatterplot.stroked * lineWidthPixels / 2.0;
float edgePadding = scatterplot.antialiasing ? (outerRadiusPixels + SMOOTH_EDGE_RADIUS) / outerRadiusPixels : 1.0;
unitPosition = edgePadding * positions.xy;
geometry.uv = unitPosition;
geometry.pickingColor = instancePickingColors;
innerUnitRadius = 1.0 - scatterplot.stroked * lineWidthPixels / outerRadiusPixels;
if (scatterplot.billboard) {
gl_Position = project_position_to_clipspace(instancePositions, instancePositions64Low, vec3(0.0), geometry.position);
DECKGL_FILTER_GL_POSITION(gl_Position, geometry);
vec3 offset = edgePadding * positions * outerRadiusPixels;
DECKGL_FILTER_SIZE(offset, geometry);
gl_Position.xy += project_pixel_size_to_clipspace(offset.xy);
} else {
vec3 offset = edgePadding * positions * project_pixel_size(outerRadiusPixels);
DECKGL_FILTER_SIZE(offset, geometry);
gl_Position = project_position_to_clipspace(instancePositions, instancePositions64Low, offset, geometry.position);
DECKGL_FILTER_GL_POSITION(gl_Position, geometry);
}
vFillColor = vec4(instanceFillColors.rgb, instanceFillColors.a * layer.opacity);
DECKGL_FILTER_COLOR(vFillColor, geometry);
vLineColor = vec4(instanceLineColors.rgb, instanceLineColors.a * layer.opacity);
DECKGL_FILTER_COLOR(vLineColor, geometry);
}
`;var jt=`#version 300 es
#define SHADER_NAME scatterplot-layer-fragment-shader
precision highp float;
in vec4 vFillColor;
in vec4 vLineColor;
in vec2 unitPosition;
in float innerUnitRadius;
in float outerRadiusPixels;
out vec4 fragColor;
void main(void) {
geometry.uv = unitPosition;
float distToCenter = length(unitPosition) * outerRadiusPixels;
float inCircle = scatterplot.antialiasing ?
smoothedge(distToCenter, outerRadiusPixels) :
step(distToCenter, outerRadiusPixels);
if (inCircle == 0.0) {
discard;
}
if (scatterplot.stroked > 0.5) {
float isLine = scatterplot.antialiasing ?
smoothedge(innerUnitRadius * outerRadiusPixels, distToCenter) :
step(innerUnitRadius * outerRadiusPixels, distToCenter);
if (scatterplot.filled > 0.5) {
fragColor = mix(vFillColor, vLineColor, isLine);
} else {
if (isLine == 0.0) {
discard;
}
fragColor = vec4(vLineColor.rgb, vLineColor.a * isLine);
}
} else if (scatterplot.filled < 0.5) {
discard;
} else {
fragColor = vFillColor;
}
fragColor.a *= inCircle;
DECKGL_FILTER_COLOR(fragColor, geometry);
}
`;var Zt=`// Main shaders

struct ScatterplotUniforms {
  radiusScale: f32,
  radiusMinPixels: f32,
  radiusMaxPixels: f32,
  lineWidthScale: f32,
  lineWidthMinPixels: f32,
  lineWidthMaxPixels: f32,
  stroked: f32,
  filled: i32,
  antialiasing: i32,
  billboard: i32,
  radiusUnits: i32,
  lineWidthUnits: i32,
};

struct ConstantAttributeUniforms {
 instancePositions: vec3<f32>,
 instancePositions64Low: vec3<f32>,
 instanceRadius: f32,
 instanceLineWidths: f32,
 instanceFillColors: vec4<f32>,
 instanceLineColors: vec4<f32>,
 instancePickingColors: vec3<f32>,

 instancePositionsConstant: i32,
 instancePositions64LowConstant: i32,
 instanceRadiusConstant: i32,
 instanceLineWidthsConstant: i32,
 instanceFillColorsConstant: i32,
 instanceLineColorsConstant: i32,
 instancePickingColorsConstant: i32
};

@group(0) @binding(2) var<uniform> scatterplot: ScatterplotUniforms;

struct ConstantAttributes {
  instancePositions: vec3<f32>,
  instancePositions64Low: vec3<f32>,
  instanceRadius: f32,
  instanceLineWidths: f32,
  instanceFillColors: vec4<f32>,
  instanceLineColors: vec4<f32>,
  instancePickingColors: vec3<f32>
};

const constants = ConstantAttributes(
  vec3<f32>(0.0),
  vec3<f32>(0.0),
  0.0,
  0.0,
  vec4<f32>(0.0, 0.0, 0.0, 1.0),
  vec4<f32>(0.0, 0.0, 0.0, 1.0),
  vec3<f32>(0.0)
);

struct Attributes {
  @builtin(instance_index) instanceIndex : u32,
  @builtin(vertex_index) vertexIndex : u32,
  @location(0) positions: vec3<f32>,
  @location(1) instancePositions: vec3<f32>,
  @location(2) instancePositions64Low: vec3<f32>,
  @location(3) instanceRadius: f32,
  @location(4) instanceLineWidths: f32,
  @location(5) instanceFillColors: vec4<f32>,
  @location(6) instanceLineColors: vec4<f32>,
  @location(7) instancePickingColors: vec3<f32>
};

struct Varyings {
  @builtin(position) position: vec4<f32>,
  @location(0) vFillColor: vec4<f32>,
  @location(1) vLineColor: vec4<f32>,
  @location(2) unitPosition: vec2<f32>,
  @location(3) innerUnitRadius: f32,
  @location(4) outerRadiusPixels: f32,
};

@vertex
fn vertexMain(attributes: Attributes) -> Varyings {
  var varyings: Varyings;

  // Draw an inline geometry constant array clip space triangle to verify that rendering works.
  // var positions = array<vec2<f32>, 3>(vec2(0.0, 0.5), vec2(-0.5, -0.5), vec2(0.5, -0.5));
  // if (attributes.instanceIndex == 0) {
  //   varyings.position = vec4<f32>(positions[attributes.vertexIndex], 0.0, 1.0);
  //   return varyings;
  // }

  // var geometry: Geometry;
  // geometry.worldPosition = instancePositions;

  // Multiply out radius and clamp to limits
  varyings.outerRadiusPixels = clamp(
    project_unit_size_to_pixel(scatterplot.radiusScale * attributes.instanceRadius, scatterplot.radiusUnits),
    scatterplot.radiusMinPixels, scatterplot.radiusMaxPixels
  );

  // Multiply out line width and clamp to limits
  let lineWidthPixels = clamp(
    project_unit_size_to_pixel(scatterplot.lineWidthScale * attributes.instanceLineWidths, scatterplot.lineWidthUnits),
    scatterplot.lineWidthMinPixels, scatterplot.lineWidthMaxPixels
  );

  // outer radius needs to offset by half stroke width
  varyings.outerRadiusPixels += scatterplot.stroked * lineWidthPixels / 2.0;
  // Expand geometry to accommodate edge smoothing
  let edgePadding = select(
    (varyings.outerRadiusPixels + SMOOTH_EDGE_RADIUS) / varyings.outerRadiusPixels,
    1.0,
    scatterplot.antialiasing != 0
  );

  // position on the containing square in [-1, 1] space
  varyings.unitPosition = edgePadding * attributes.positions.xy;
  geometry.uv = varyings.unitPosition;
  geometry.pickingColor = attributes.instancePickingColors;

  varyings.innerUnitRadius = 1.0 - scatterplot.stroked * lineWidthPixels / varyings.outerRadiusPixels;

  if (scatterplot.billboard != 0) {
    varyings.position = project_position_to_clipspace(attributes.instancePositions, attributes.instancePositions64Low, vec3<f32>(0.0)); // TODO , geometry.position);
    // DECKGL_FILTER_GL_POSITION(varyings.position, geometry);
    let offset = attributes.positions; // * edgePadding * varyings.outerRadiusPixels;
    // DECKGL_FILTER_SIZE(offset, geometry);
    let clipPixels = project_pixel_size_to_clipspace(offset.xy);
    varyings.position.x = clipPixels.x;
    varyings.position.y = clipPixels.y;
  } else {
    let offset = edgePadding * attributes.positions * project_pixel_size_float(varyings.outerRadiusPixels);
    // DECKGL_FILTER_SIZE(offset, geometry);
    varyings.position = project_position_to_clipspace(attributes.instancePositions, attributes.instancePositions64Low, offset); // TODO , geometry.position);
    // DECKGL_FILTER_GL_POSITION(varyings.position, geometry);
  }

  // Apply opacity to instance color, or return instance picking color
  varyings.vFillColor = vec4<f32>(attributes.instanceFillColors.rgb, attributes.instanceFillColors.a * color.opacity);
  // DECKGL_FILTER_COLOR(varyings.vFillColor, geometry);
  varyings.vLineColor = vec4<f32>(attributes.instanceLineColors.rgb, attributes.instanceLineColors.a * color.opacity);
  // DECKGL_FILTER_COLOR(varyings.vLineColor, geometry);

  return varyings;
}

@fragment
fn fragmentMain(varyings: Varyings) -> @location(0) vec4<f32> {
  // var geometry: Geometry;
  // geometry.uv = unitPosition;

  let distToCenter = length(varyings.unitPosition) * varyings.outerRadiusPixels;
  let inCircle = select(
    smoothedge(distToCenter, varyings.outerRadiusPixels),
    step(distToCenter, varyings.outerRadiusPixels),
    scatterplot.antialiasing != 0
  );

  if (inCircle == 0.0) {
    discard;
  }

  var fragColor: vec4<f32>;

  if (scatterplot.stroked != 0) {
    let isLine = select(
      smoothedge(varyings.innerUnitRadius * varyings.outerRadiusPixels, distToCenter),
      step(varyings.innerUnitRadius * varyings.outerRadiusPixels, distToCenter),
      scatterplot.antialiasing != 0
    );

    if (scatterplot.filled != 0) {
      fragColor = mix(varyings.vFillColor, varyings.vLineColor, isLine);
    } else {
      if (isLine == 0.0) {
        discard;
      }
      fragColor = vec4<f32>(varyings.vLineColor.rgb, varyings.vLineColor.a * isLine);
    }
  } else if (scatterplot.filled == 0) {
    discard;
  } else {
    fragColor = varyings.vFillColor;
  }

  fragColor.a *= inCircle;
  // DECKGL_FILTER_COLOR(fragColor, geometry);

  // Apply premultiplied alpha as required by transparent canvas
  fragColor = deckgl_premultiplied_alpha(fragColor);

  return fragColor;
  // return vec4<f32>(0, 0, 1, 1);
}
`;var Kt=[0,0,0,255],To={radiusUnits:"meters",radiusScale:{type:"number",min:0,value:1},radiusMinPixels:{type:"number",min:0,value:0},radiusMaxPixels:{type:"number",min:0,value:Number.MAX_SAFE_INTEGER},lineWidthUnits:"meters",lineWidthScale:{type:"number",min:0,value:1},lineWidthMinPixels:{type:"number",min:0,value:0},lineWidthMaxPixels:{type:"number",min:0,value:Number.MAX_SAFE_INTEGER},stroked:!1,filled:!0,billboard:!1,antialiasing:!0,getPosition:{type:"accessor",value:t=>t.position},getRadius:{type:"accessor",value:1},getFillColor:{type:"accessor",value:Kt},getLineColor:{type:"accessor",value:Kt},getLineWidth:{type:"accessor",value:1},strokeWidth:{deprecatedFor:"getLineWidth"},outline:{deprecatedFor:"stroked"},getColor:{deprecatedFor:["getFillColor","getLineColor"]}},Eo=(()=>{class t extends R{getShaders(){return super.getShaders({vs:Ht,fs:jt,source:Zt,modules:[O,it,F,Vt]})}initializeState(){this.getAttributeManager().addInstanced({instancePositions:{size:3,type:"float64",fp64:this.use64bitPositions(),transition:!0,accessor:"getPosition"},instanceRadius:{size:1,transition:!0,accessor:"getRadius",defaultValue:1},instanceFillColors:{size:this.props.colorFormat.length,transition:!0,type:"unorm8",accessor:"getFillColor",defaultValue:[0,0,0,255]},instanceLineColors:{size:this.props.colorFormat.length,transition:!0,type:"unorm8",accessor:"getLineColor",defaultValue:[0,0,0,255]},instanceLineWidths:{size:1,transition:!0,accessor:"getLineWidth",defaultValue:1}})}updateState(e){super.updateState(e),e.changeFlags.extensionsChanged&&(this.state.model?.destroy(),this.state.model=this._getModel(),this.getAttributeManager().invalidateAll())}draw({uniforms:e}){let{radiusUnits:i,radiusScale:s,radiusMinPixels:n,radiusMaxPixels:r,stroked:a,filled:l,billboard:c,antialiasing:u,lineWidthUnits:f,lineWidthScale:d,lineWidthMinPixels:p,lineWidthMaxPixels:g}=this.props,h={stroked:a,filled:l,billboard:c,antialiasing:u,radiusUnits:z[i],radiusScale:s,radiusMinPixels:n,radiusMaxPixels:r,lineWidthUnits:z[f],lineWidthScale:d,lineWidthMinPixels:p,lineWidthMaxPixels:g},x=this.state.model;x.shaderInputs.setProps({scatterplot:h}),this.context.device.type==="webgpu"&&(x.instanceCount=this.props.data.length),x.draw(this.context.renderPass)}_getModel(){let e=this.context.device.type==="webgpu"?{depthWriteEnabled:!0,depthCompare:"less-equal"}:void 0,i=[-1,-1,0,1,-1,0,-1,1,0,1,1,0];return new A(this.context.device,C(v({},this.getShaders()),{id:this.props.id,bufferLayout:this.getAttributeManager().getBufferLayouts(),geometry:new E({topology:"triangle-strip",attributes:{positions:{size:3,value:new Float32Array(i)}}}),isInstanced:!0,parameters:e}))}}return t.defaultProps=To,t.layerName="ScatterplotLayer",t})(),$t=Eo;var we=class extends E{constructor(o){let{indices:e,attributes:i}=zo(o);super(C(v({},o),{indices:e,attributes:i}))}};function zo(t){let{radius:o,height:e=1,nradial:i=10}=t,{vertices:s}=t;s&&(M.assert(s.length>=i),s=s.flatMap(p=>[p[0],p[1]]),D(s,H.COUNTER_CLOCKWISE));let n=e>0,r=i+1,a=n?r*3+1:i,l=Math.PI*2/i,c=new Uint16Array(n?i*3*2:0),u=new Float32Array(a*3),f=new Float32Array(a*3),d=0;if(n){for(let p=0;p<r;p++){let g=p*l,h=p%i,x=Math.sin(g),y=Math.cos(g);for(let _=0;_<2;_++)u[d+0]=s?s[h*2]:y*o,u[d+1]=s?s[h*2+1]:x*o,u[d+2]=(1/2-_)*e,f[d+0]=s?s[h*2]:y,f[d+1]=s?s[h*2+1]:x,d+=3}u[d+0]=u[d-3],u[d+1]=u[d-2],u[d+2]=u[d-1],d+=3}for(let p=n?0:1;p<r;p++){let g=Math.floor(p/2)*Math.sign(.5-p%2),h=g*l,x=(g+i)%i,y=Math.sin(h),_=Math.cos(h);u[d+0]=s?s[x*2]:_*o,u[d+1]=s?s[x*2+1]:y*o,u[d+2]=e/2,f[d+2]=1,d+=3}if(n){let p=0;for(let g=0;g<i;g++)c[p++]=g*2+0,c[p++]=g*2+2,c[p++]=g*2+0,c[p++]=g*2+1,c[p++]=g*2+1,c[p++]=g*2+3}return{indices:c,attributes:{POSITION:{size:3,value:u},NORMAL:{size:3,value:f}}}}var Jt=`uniform columnUniforms {
  float radius;
  float angle;
  vec2 offset;
  bool extruded;
  bool stroked;
  bool isStroke;
  float coverage;
  float elevationScale;
  float edgeDistance;
  float widthScale;
  float widthMinPixels;
  float widthMaxPixels;
  highp int radiusUnits;
  highp int widthUnits;
} column;
`,Yt={name:"column",vs:Jt,fs:Jt,uniformTypes:{radius:"f32",angle:"f32",offset:"vec2<f32>",extruded:"f32",stroked:"f32",isStroke:"f32",coverage:"f32",elevationScale:"f32",edgeDistance:"f32",widthScale:"f32",widthMinPixels:"f32",widthMaxPixels:"f32",radiusUnits:"i32",widthUnits:"i32"}};var Xt=`#version 300 es
#define SHADER_NAME column-layer-vertex-shader
in vec3 positions;
in vec3 normals;
in vec3 instancePositions;
in float instanceElevations;
in vec3 instancePositions64Low;
in vec4 instanceFillColors;
in vec4 instanceLineColors;
in float instanceStrokeWidths;
in vec3 instancePickingColors;
out vec4 vColor;
#ifdef FLAT_SHADING
out vec3 cameraPosition;
out vec4 position_commonspace;
#endif
void main(void) {
geometry.worldPosition = instancePositions;
vec4 color = column.isStroke ? instanceLineColors : instanceFillColors;
mat2 rotationMatrix = mat2(cos(column.angle), sin(column.angle), -sin(column.angle), cos(column.angle));
float elevation = 0.0;
float strokeOffsetRatio = 1.0;
if (column.extruded) {
elevation = instanceElevations * (positions.z + 1.0) / 2.0 * column.elevationScale;
} else if (column.stroked) {
float widthPixels = clamp(
project_size_to_pixel(instanceStrokeWidths * column.widthScale, column.widthUnits),
column.widthMinPixels, column.widthMaxPixels) / 2.0;
float halfOffset = project_pixel_size(widthPixels) / project_size(column.edgeDistance * column.coverage * column.radius);
if (column.isStroke) {
strokeOffsetRatio -= sign(positions.z) * halfOffset;
} else {
strokeOffsetRatio -= halfOffset;
}
}
float shouldRender = float(color.a > 0.0 && instanceElevations >= 0.0);
float dotRadius = column.radius * column.coverage * shouldRender;
geometry.pickingColor = instancePickingColors;
vec3 centroidPosition = vec3(instancePositions.xy, instancePositions.z + elevation);
vec3 centroidPosition64Low = instancePositions64Low;
vec2 offset = (rotationMatrix * positions.xy * strokeOffsetRatio + column.offset) * dotRadius;
if (column.radiusUnits == UNIT_METERS) {
offset = project_size(offset);
}
vec3 pos = vec3(offset, 0.);
DECKGL_FILTER_SIZE(pos, geometry);
gl_Position = project_position_to_clipspace(centroidPosition, centroidPosition64Low, pos, geometry.position);
geometry.normal = project_normal(vec3(rotationMatrix * normals.xy, normals.z));
DECKGL_FILTER_GL_POSITION(gl_Position, geometry);
if (column.extruded && !column.isStroke) {
#ifdef FLAT_SHADING
cameraPosition = project.cameraPosition;
position_commonspace = geometry.position;
vColor = vec4(color.rgb, color.a * layer.opacity);
#else
vec3 lightColor = lighting_getLightColor(color.rgb, project.cameraPosition, geometry.position.xyz, geometry.normal);
vColor = vec4(lightColor, color.a * layer.opacity);
#endif
} else {
vColor = vec4(color.rgb, color.a * layer.opacity);
}
DECKGL_FILTER_COLOR(vColor, geometry);
}
`;var Qt=`#version 300 es
#define SHADER_NAME column-layer-fragment-shader
precision highp float;
out vec4 fragColor;
in vec4 vColor;
#ifdef FLAT_SHADING
in vec3 cameraPosition;
in vec4 position_commonspace;
#endif
void main(void) {
fragColor = vColor;
geometry.uv = vec2(0.);
#ifdef FLAT_SHADING
if (column.extruded && !column.isStroke && !bool(picking.isActive)) {
vec3 normal = normalize(cross(dFdx(position_commonspace.xyz), dFdy(position_commonspace.xyz)));
fragColor.rgb = lighting_getLightColor(vColor.rgb, cameraPosition, position_commonspace.xyz, normal);
}
#endif
DECKGL_FILTER_COLOR(fragColor, geometry);
}
`;var Me=[0,0,0,255],Oo={diskResolution:{type:"number",min:4,value:20},vertices:null,radius:{type:"number",min:0,value:1e3},angle:{type:"number",value:0},offset:{type:"array",value:[0,0]},coverage:{type:"number",min:0,max:1,value:1},elevationScale:{type:"number",min:0,value:1},radiusUnits:"meters",lineWidthUnits:"meters",lineWidthScale:1,lineWidthMinPixels:0,lineWidthMaxPixels:Number.MAX_SAFE_INTEGER,extruded:!0,wireframe:!1,filled:!0,stroked:!1,flatShading:!1,getPosition:{type:"accessor",value:t=>t.position},getFillColor:{type:"accessor",value:Me},getLineColor:{type:"accessor",value:Me},getLineWidth:{type:"accessor",value:1},getElevation:{type:"accessor",value:1e3},material:!0,getColor:{deprecatedFor:["getFillColor","getLineColor"]}},Fo=(()=>{class t extends R{getShaders(){let e={},{flatShading:i}=this.props;return i&&(e.FLAT_SHADING=1),super.getShaders({vs:Xt,fs:Qt,defines:e,modules:[O,i?tt:re,F,Yt]})}initializeState(){this.getAttributeManager().addInstanced({instancePositions:{size:3,type:"float64",fp64:this.use64bitPositions(),transition:!0,accessor:"getPosition"},instanceElevations:{size:1,transition:!0,accessor:"getElevation"},instanceFillColors:{size:this.props.colorFormat.length,type:"unorm8",transition:!0,accessor:"getFillColor",defaultValue:Me},instanceLineColors:{size:this.props.colorFormat.length,type:"unorm8",transition:!0,accessor:"getLineColor",defaultValue:Me},instanceStrokeWidths:{size:1,accessor:"getLineWidth",transition:!0}})}updateState(e){super.updateState(e);let{props:i,oldProps:s,changeFlags:n}=e,r=n.extensionsChanged||i.flatShading!==s.flatShading;r&&(this.state.models?.forEach(l=>l.destroy()),this.setState(this._getModels()),this.getAttributeManager().invalidateAll());let a=this.getNumInstances();this.state.fillModel.setInstanceCount(a),this.state.wireframeModel.setInstanceCount(a),(r||i.diskResolution!==s.diskResolution||i.vertices!==s.vertices||(i.extruded||i.stroked)!==(s.extruded||s.stroked))&&this._updateGeometry(i)}getGeometry(e,i,s){let n=new we({radius:1,height:s?2:0,vertices:i,nradial:e}),r=0;if(i)for(let a=0;a<e;a++){let l=i[a],c=Math.sqrt(l[0]*l[0]+l[1]*l[1]);r+=c/e}else r=1;return this.setState({edgeDistance:Math.cos(Math.PI/e)*r}),n}_getModels(){let e=this.getShaders(),i=this.getAttributeManager().getBufferLayouts(),s=new A(this.context.device,C(v({},e),{id:`${this.props.id}-fill`,bufferLayout:i,isInstanced:!0})),n=new A(this.context.device,C(v({},e),{id:`${this.props.id}-wireframe`,bufferLayout:i,isInstanced:!0}));return{fillModel:s,wireframeModel:n,models:[n,s]}}_updateGeometry({diskResolution:e,vertices:i,extruded:s,stroked:n}){let r=this.getGeometry(e,i,s||n);this.setState({fillVertexCount:r.attributes.POSITION.value.length/3});let a=this.state.fillModel,l=this.state.wireframeModel;a.setGeometry(r),a.setTopology("triangle-strip"),a.setIndexBuffer(null),l.setGeometry(r),l.setTopology("line-list")}draw({uniforms:e}){let{lineWidthUnits:i,lineWidthScale:s,lineWidthMinPixels:n,lineWidthMaxPixels:r,radiusUnits:a,elevationScale:l,extruded:c,filled:u,stroked:f,wireframe:d,offset:p,coverage:g,radius:h,angle:x}=this.props,y=this.state.fillModel,_=this.state.wireframeModel,{fillVertexCount:m,edgeDistance:P}=this.state,L={radius:h,angle:x/180*Math.PI,offset:p,extruded:c,stroked:f,coverage:g,elevationScale:l,edgeDistance:P,radiusUnits:z[a],widthUnits:z[i],widthScale:s,widthMinPixels:n,widthMaxPixels:r};c&&d&&(_.shaderInputs.setProps({column:C(v({},L),{isStroke:!0})}),_.draw(this.context.renderPass)),u&&(y.setVertexCount(m),y.shaderInputs.setProps({column:C(v({},L),{isStroke:!1})}),y.draw(this.context.renderPass)),!c&&f&&(y.setVertexCount(m*2/3),y.shaderInputs.setProps({column:C(v({},L),{isStroke:!0})}),y.draw(this.context.renderPass))}}return t.layerName="ColumnLayer",t.defaultProps=Oo,t})(),Ro=Fo;function qt({data:t,getIndex:o,dataRange:e,replace:i}){let{startRow:s=0,endRow:n=1/0}=e,r=t.length,a=r,l=r;for(let d=0;d<r;d++){let p=o(t[d]);if(a>d&&p>=s&&(a=d),p>=n){l=d;break}}let c=a,f=l-a!==i.length?t.slice(l):void 0;for(let d=0;d<i.length;d++)t[c++]=i[d];if(f){for(let d=0;d<f.length;d++)t[c++]=f[d];t.length=c}return{startRow:a,endRow:a+i.length}}function ei(t,o){if(!t)return null;let e="startIndices"in t?t.startIndices[o]:o,i=t.featureIds.value[e];return e!==-1?ko(t,i,e):null}function ko(t,o,e){let i={properties:v({},t.properties[o])};for(let s in t.numericProps)i.properties[s]=t.numericProps[s].value[e];return i}function ti(t,o){let e={points:null,lines:null,polygons:null};for(let i in e){let s=t[i].globalFeatureIds.value;e[i]=new Uint8ClampedArray(s.length*4);let n=[];for(let r=0;r<s.length;r++)o(s[r],n),e[i][r*4+0]=n[0],e[i][r*4+1]=n[1],e[i][r*4+2]=n[2],e[i][r*4+3]=255}return e}var ii=`uniform sdfUniforms {
  float gamma;
  bool enabled;
  float buffer;
  float outlineBuffer;
  vec4 outlineColor;
} sdf;
`,oi={name:"sdf",vs:ii,fs:ii,uniformTypes:{gamma:"f32",enabled:"f32",buffer:"f32",outlineBuffer:"f32",outlineColor:"vec4<f32>"}};var ni=`#version 300 es
#define SHADER_NAME multi-icon-layer-fragment-shader
precision highp float;
uniform sampler2D iconsTexture;
in vec4 vColor;
in vec2 vTextureCoords;
in vec2 uv;
out vec4 fragColor;
void main(void) {
geometry.uv = uv;
if (!bool(picking.isActive)) {
float alpha = texture(iconsTexture, vTextureCoords).a;
vec4 color = vColor;
if (sdf.enabled) {
float distance = alpha;
alpha = smoothstep(sdf.buffer - sdf.gamma, sdf.buffer + sdf.gamma, distance);
if (sdf.outlineBuffer > 0.0) {
float inFill = alpha;
float inBorder = smoothstep(sdf.outlineBuffer - sdf.gamma, sdf.outlineBuffer + sdf.gamma, distance);
color = mix(sdf.outlineColor, vColor, inFill);
alpha = inBorder;
}
}
float a = alpha * color.a;
if (a < icon.alphaCutoff) {
discard;
}
fragColor = vec4(color.rgb, a * layer.opacity);
}
DECKGL_FILTER_COLOR(fragColor, geometry);
}
`;var Ze=192/256,si=[],Bo={getIconOffsets:{type:"accessor",value:t=>t.offsets},alphaCutoff:.001,smoothing:.1,outlineWidth:0,outlineColor:{type:"color",value:[0,0,0,255]}},Wo=(()=>{class t extends Ie{getShaders(){let e=super.getShaders();return C(v({},e),{modules:[...e.modules,oi],fs:ni})}initializeState(){super.initializeState(),this.getAttributeManager().addInstanced({instanceOffsets:{size:2,accessor:"getIconOffsets"},instancePickingColors:{type:"uint8",size:3,accessor:(i,{index:s,target:n})=>this.encodePickingColor(s,n)}})}updateState(e){super.updateState(e);let{props:i,oldProps:s}=e,{outlineColor:n}=i;n!==s.outlineColor&&(n=n.map(r=>r/255),n[3]=Number.isFinite(n[3])?n[3]:1,this.setState({outlineColor:n})),!i.sdf&&i.outlineWidth&&M.warn(`${this.id}: fontSettings.sdf is required to render outline`)()}draw(e){let{sdf:i,smoothing:s,outlineWidth:n}=this.props,{outlineColor:r}=this.state,a=n?Math.max(s,Ze*(1-n)):-1,l=this.state.model,c={buffer:Ze,outlineBuffer:a,gamma:s,enabled:!!i,outlineColor:r};if(l.shaderInputs.setProps({sdf:c}),super.draw(e),i&&n){let{iconManager:u}=this.state;u.getTexture()&&(l.shaderInputs.setProps({sdf:C(v({},c),{outlineBuffer:Ze})}),l.draw(this.context.renderPass))}}getInstanceOffset(e){return e?Array.from(e).flatMap(i=>super.getInstanceOffset(i)):si}getInstanceColorMode(e){return 1}getInstanceIconFrame(e){return e?Array.from(e).flatMap(i=>super.getInstanceIconFrame(i)):si}}return t.defaultProps=Bo,t.layerName="MultiIconLayer",t})(),ri=Wo;var Ae=class{constructor({fontSize:o=24,buffer:e=3,radius:i=8,cutoff:s=.25,fontFamily:n="sans-serif",fontWeight:r="normal",fontStyle:a="normal",lang:l=null}={}){this.buffer=e,this.cutoff=s,this.radius=i,this.lang=l;let c=this.size=o+e*4,u=this._createCanvas(c),f=this.ctx=u.getContext("2d",{willReadFrequently:!0});f.font=`${a} ${r} ${o}px ${n}`,f.textBaseline="alphabetic",f.textAlign="left",f.fillStyle="black",this.gridOuter=new Float64Array(c*c),this.gridInner=new Float64Array(c*c),this.f=new Float64Array(c),this.z=new Float64Array(c+1),this.v=new Uint16Array(c)}_createCanvas(o){let e=document.createElement("canvas");return e.width=e.height=o,e}draw(o){let{width:e,actualBoundingBoxAscent:i,actualBoundingBoxDescent:s,actualBoundingBoxLeft:n,actualBoundingBoxRight:r}=this.ctx.measureText(o),a=Math.ceil(i),l=0,c=Math.max(0,Math.min(this.size-this.buffer,Math.ceil(r-n))),u=Math.min(this.size-this.buffer,a+Math.ceil(s)),f=c+2*this.buffer,d=u+2*this.buffer,p=Math.max(f*d,0),g=new Uint8ClampedArray(p),h={data:g,width:f,height:d,glyphWidth:c,glyphHeight:u,glyphTop:a,glyphLeft:l,glyphAdvance:e};if(c===0||u===0)return h;let{ctx:x,buffer:y,gridInner:_,gridOuter:m}=this;this.lang&&(x.lang=this.lang),x.clearRect(y,y,c,u),x.fillText(o,y,y+a);let P=x.getImageData(y,y,c,u);m.fill(1e20,0,p),_.fill(0,0,p);for(let L=0;L<u;L++)for(let I=0;I<c;I++){let k=P.data[4*(L*c+I)+3]/255;if(k===0)continue;let B=(L+y)*f+I+y;if(k===1)m[B]=0,_[B]=1e20;else{let W=.5-k;m[B]=W>0?W*W:0,_[B]=W<0?W*W:0}}ai(m,0,0,f,d,f,this.f,this.v,this.z),ai(_,y,y,c,u,f,this.f,this.v,this.z);for(let L=0;L<p;L++){let I=Math.sqrt(m[L])-Math.sqrt(_[L]);g[L]=Math.round(255-255*(I/this.radius+this.cutoff))}return h}};function ai(t,o,e,i,s,n,r,a,l){for(let c=o;c<o+i;c++)li(t,e*n+c,n,s,r,a,l);for(let c=e;c<e+s;c++)li(t,c*n+o,1,i,r,a,l)}function li(t,o,e,i,s,n,r){n[0]=0,r[0]=-1e20,r[1]=1e20,s[0]=t[o];for(let a=1,l=0,c=0;a<i;a++){s[a]=t[o+a*e];let u=a*a;do{let f=n[l];c=(s[a]-s[f]+u-f*f)/(a-f)/2}while(c<=r[l]&&--l>-1);l++,n[l]=a,r[l]=c,r[l+1]=1e20}for(let a=0,l=0;a<i;a++){for(;r[l+1]<a;)l++;let c=n[l],u=a-c;t[o+a*e]=s[c]+u*u}}var No=32,Go=[];function Do(t){return Math.pow(2,Math.ceil(Math.log2(t)))}function ci({characterSet:t,getFontWidth:o,fontHeight:e,buffer:i,maxCanvasWidth:s,mapping:n={},xOffset:r=0,yOffset:a=0}){let l=0,c=r,u=e+i*2;for(let f of t)if(!n[f]){let d=o(f);c+d+i*2>s&&(c=0,l++),n[f]={x:c+i,y:a+l*u+i,width:d,height:u,layoutWidth:d,layoutHeight:e},c+=d+i*2}return{mapping:n,xOffset:c,yOffset:a+l*u,canvasHeight:Do(a+(l+1)*u)}}function ui(t,o,e,i){let s=0;for(let n=o;n<e;n++){let r=t[n];s+=i[r]?.layoutWidth||0}return s}function fi(t,o,e,i,s,n){let r=o,a=0;for(let l=o;l<e;l++){let c=ui(t,l,l+1,s);a+c>i&&(r<l&&n.push(l),r=l,a=0),a+=c}return a}function Uo(t,o,e,i,s,n){let r=o,a=o,l=o,c=0;for(let u=o;u<e;u++)if((t[u]===" "||t[u+1]===" "||u+1===e)&&(l=u+1),l>a){let f=ui(t,a,l,s);c+f>i&&(r<a&&(n.push(a),r=a,c=0),f>i&&(f=fi(t,a,l,i,s,n),r=n[n.length-1])),a=l,c+=f}return c}function Vo(t,o,e,i,s=0,n){n===void 0&&(n=t.length);let r=[];return o==="break-all"?fi(t,s,n,e,i,r):Uo(t,s,n,e,i,r),r}function Ho(t,o,e,i,s,n){let r=0,a=0;for(let l=o;l<e;l++){let c=t[l],u=i[c];u?(a||(a=u.layoutHeight),s[l]=r+u.layoutWidth/2,r+=u.layoutWidth):(M.warn(`Missing character: ${c} (${c.codePointAt(0)})`)(),s[l]=r,r+=No)}n[0]=r,n[1]=a}function di(t,o,e,i,s){let n=Array.from(t),r=n.length,a=new Array(r),l=new Array(r),c=new Array(r),u=(e==="break-word"||e==="break-all")&&isFinite(i)&&i>0,f=[0,0],d=[0,0],p=0,g=0,h=0;for(let x=0;x<=r;x++){let y=n[x];if((y===`
`||x===r)&&(h=x),h>g){let _=u?Vo(n,e,i,s,g,h):Go;for(let m=0;m<=_.length;m++){let P=m===0?g:_[m-1],L=m<_.length?_[m]:h;Ho(n,P,L,s,a,d);for(let I=P;I<L;I++){let k=n[I],B=s[k]?.layoutOffsetY||0;l[I]=p+d[1]/2+B,c[I]=d[0]}p=p+d[1]*o,f[0]=Math.max(f[0],d[0])}g=h}y===`
`&&(a[g]=0,l[g]=0,c[g]=0,g++)}return f[1]=p,{x:a,y:l,rowWidth:c,size:f}}function pi({value:t,length:o,stride:e,offset:i,startIndices:s,characterSet:n}){let r=t.BYTES_PER_ELEMENT,a=e?e/r:1,l=i?i/r:0,c=s[o]||Math.ceil((t.length-l)/a),u=n&&new Set,f=new Array(o),d=t;if(a>1||l>0){let p=t.constructor;d=new p(c);for(let g=0;g<c;g++)d[g]=t[g*a+l]}for(let p=0;p<o;p++){let g=s[p],h=s[p+1]||c,x=d.subarray(g,h);f[p]=String.fromCodePoint.apply(null,x),u&&x.forEach(u.add,u)}if(u)for(let p of u)n.add(String.fromCodePoint(p));return{texts:f,characterCount:c}}var oe=class{constructor(o=5){this._cache={},this._order=[],this.limit=o}get(o){let e=this._cache[o];return e&&(this._deleteOrder(o),this._appendOrder(o)),e}set(o,e){this._cache[o]?(this.delete(o),this._cache[o]=e,this._appendOrder(o)):(Object.keys(this._cache).length===this.limit&&this.delete(this._order[0]),this._cache[o]=e,this._appendOrder(o))}delete(o){this._cache[o]&&(delete this._cache[o],this._deleteOrder(o))}_deleteOrder(o){let e=this._order.indexOf(o);e>=0&&this._order.splice(e,1)}_appendOrder(o){this._order.push(o)}};function jo(){let t=[];for(let o=32;o<128;o++)t.push(String.fromCharCode(o));return t}var V={fontFamily:"Monaco, monospace",fontWeight:"normal",characterSet:jo(),fontSize:64,buffer:4,sdf:!1,cutoff:.25,radius:12,smoothing:.1},gi=1024,hi=.9,xi=1.2,mi=3,be=new oe(mi);function Zo(t,o){let e;typeof o=="string"?e=new Set(Array.from(o)):e=new Set(o);let i=be.get(t);if(!i)return e;for(let s in i.mapping)e.has(s)&&e.delete(s);return e}function Ko(t,o){for(let e=0;e<t.length;e++)o.data[4*e+3]=t[e]}function yi(t,o,e,i){t.font=`${i} ${e}px ${o}`,t.fillStyle="#000",t.textBaseline="alphabetic",t.textAlign="left"}function vi(t){M.assert(Number.isFinite(t)&&t>=mi,"Invalid cache limit"),be=new oe(t)}var Te=class{constructor(){this.props=v({},V)}get atlas(){return this._atlas}get mapping(){return this._atlas&&this._atlas.mapping}get scale(){let{fontSize:o,buffer:e}=this.props;return(o*xi+e*2)/o}setProps(o={}){Object.assign(this.props,o),this._key=this._getKey();let e=Zo(this._key,this.props.characterSet),i=be.get(this._key);if(i&&e.size===0){this._atlas!==i&&(this._atlas=i);return}let s=this._generateFontAtlas(e,i);this._atlas=s,be.set(this._key,s)}_generateFontAtlas(o,e){let{fontFamily:i,fontWeight:s,fontSize:n,buffer:r,sdf:a,radius:l,cutoff:c}=this.props,u=e&&e.data;u||(u=document.createElement("canvas"),u.width=gi);let f=u.getContext("2d",{willReadFrequently:!0});yi(f,i,n,s);let{mapping:d,canvasHeight:p,xOffset:g,yOffset:h}=ci(v({getFontWidth:x=>f.measureText(x).width,fontHeight:n*xi,buffer:r,characterSet:o,maxCanvasWidth:gi},e&&{mapping:e.mapping,xOffset:e.xOffset,yOffset:e.yOffset}));if(u.height!==p){let x=f.getImageData(0,0,u.width,u.height);u.height=p,f.putImageData(x,0,0)}if(yi(f,i,n,s),a){let x=new Ae({fontSize:n,buffer:r,radius:l,cutoff:c,fontFamily:i,fontWeight:`${s}`});for(let y of o){let{data:_,width:m,height:P,glyphTop:L}=x.draw(y);d[y].width=m,d[y].layoutOffsetY=n*hi-L;let I=f.createImageData(m,P);Ko(_,I),f.putImageData(I,d[y].x,d[y].y)}}else for(let x of o)f.fillText(x,d[x].x,d[x].y+r+n*hi);return{xOffset:g,yOffset:h,mapping:d,data:u,width:u.width,height:u.height}}_getKey(){let{fontFamily:o,fontWeight:e,fontSize:i,buffer:s,sdf:n,radius:r,cutoff:a}=this.props;return n?`${o} ${e} ${i} ${s} ${r} ${a}`:`${o} ${e} ${i} ${s}`}};var Pi=`uniform textBackgroundUniforms {
  bool billboard;
  float sizeScale;
  float sizeMinPixels;
  float sizeMaxPixels;
  vec4 borderRadius;
  vec4 padding;
  highp int sizeUnits;
  bool stroked;
} textBackground;
`,Ci={name:"textBackground",vs:Pi,fs:Pi,uniformTypes:{billboard:"f32",sizeScale:"f32",sizeMinPixels:"f32",sizeMaxPixels:"f32",borderRadius:"vec4<f32>",padding:"vec4<f32>",sizeUnits:"i32",stroked:"f32"}};var _i=`#version 300 es
#define SHADER_NAME text-background-layer-vertex-shader
in vec2 positions;
in vec3 instancePositions;
in vec3 instancePositions64Low;
in vec4 instanceRects;
in float instanceSizes;
in float instanceAngles;
in vec2 instancePixelOffsets;
in float instanceLineWidths;
in vec4 instanceFillColors;
in vec4 instanceLineColors;
in vec3 instancePickingColors;
out vec4 vFillColor;
out vec4 vLineColor;
out float vLineWidth;
out vec2 uv;
out vec2 dimensions;
vec2 rotate_by_angle(vec2 vertex, float angle) {
float angle_radian = radians(angle);
float cos_angle = cos(angle_radian);
float sin_angle = sin(angle_radian);
mat2 rotationMatrix = mat2(cos_angle, -sin_angle, sin_angle, cos_angle);
return rotationMatrix * vertex;
}
void main(void) {
geometry.worldPosition = instancePositions;
geometry.uv = positions;
geometry.pickingColor = instancePickingColors;
uv = positions;
vLineWidth = instanceLineWidths;
float sizePixels = clamp(
project_size_to_pixel(instanceSizes * textBackground.sizeScale, textBackground.sizeUnits),
textBackground.sizeMinPixels, textBackground.sizeMaxPixels
);
dimensions = instanceRects.zw * sizePixels + textBackground.padding.xy + textBackground.padding.zw;
vec2 pixelOffset = (positions * instanceRects.zw + instanceRects.xy) * sizePixels + mix(-textBackground.padding.xy, textBackground.padding.zw, positions);
pixelOffset = rotate_by_angle(pixelOffset, instanceAngles);
pixelOffset += instancePixelOffsets;
pixelOffset.y *= -1.0;
if (textBackground.billboard)  {
gl_Position = project_position_to_clipspace(instancePositions, instancePositions64Low, vec3(0.0), geometry.position);
DECKGL_FILTER_GL_POSITION(gl_Position, geometry);
vec3 offset = vec3(pixelOffset, 0.0);
DECKGL_FILTER_SIZE(offset, geometry);
gl_Position.xy += project_pixel_size_to_clipspace(offset.xy);
} else {
vec3 offset_common = vec3(project_pixel_size(pixelOffset), 0.0);
DECKGL_FILTER_SIZE(offset_common, geometry);
gl_Position = project_position_to_clipspace(instancePositions, instancePositions64Low, offset_common, geometry.position);
DECKGL_FILTER_GL_POSITION(gl_Position, geometry);
}
vFillColor = vec4(instanceFillColors.rgb, instanceFillColors.a * layer.opacity);
DECKGL_FILTER_COLOR(vFillColor, geometry);
vLineColor = vec4(instanceLineColors.rgb, instanceLineColors.a * layer.opacity);
DECKGL_FILTER_COLOR(vLineColor, geometry);
}
`;var Li=`#version 300 es
#define SHADER_NAME text-background-layer-fragment-shader
precision highp float;
in vec4 vFillColor;
in vec4 vLineColor;
in float vLineWidth;
in vec2 uv;
in vec2 dimensions;
out vec4 fragColor;
float round_rect(vec2 p, vec2 size, vec4 radii) {
vec2 pixelPositionCB = (p - 0.5) * size;
vec2 sizeCB = size * 0.5;
float maxBorderRadius = min(size.x, size.y) * 0.5;
vec4 borderRadius = vec4(min(radii, maxBorderRadius));
borderRadius.xy =
(pixelPositionCB.x > 0.0) ? borderRadius.xy : borderRadius.zw;
borderRadius.x = (pixelPositionCB.y > 0.0) ? borderRadius.x : borderRadius.y;
vec2 q = abs(pixelPositionCB) - sizeCB + borderRadius.x;
return -(min(max(q.x, q.y), 0.0) + length(max(q, 0.0)) - borderRadius.x);
}
float rect(vec2 p, vec2 size) {
vec2 pixelPosition = p * size;
return min(min(pixelPosition.x, size.x - pixelPosition.x),
min(pixelPosition.y, size.y - pixelPosition.y));
}
vec4 get_stroked_fragColor(float dist) {
float isBorder = smoothedge(dist, vLineWidth);
return mix(vFillColor, vLineColor, isBorder);
}
void main(void) {
geometry.uv = uv;
if (textBackground.borderRadius != vec4(0.0)) {
float distToEdge = round_rect(uv, dimensions, textBackground.borderRadius);
if (textBackground.stroked) {
fragColor = get_stroked_fragColor(distToEdge);
} else {
fragColor = vFillColor;
}
float shapeAlpha = smoothedge(-distToEdge, 0.0);
fragColor.a *= shapeAlpha;
} else {
if (textBackground.stroked) {
float distToEdge = rect(uv, dimensions);
fragColor = get_stroked_fragColor(distToEdge);
} else {
fragColor = vFillColor;
}
}
DECKGL_FILTER_COLOR(fragColor, geometry);
}
`;var $o={billboard:!0,sizeScale:1,sizeUnits:"pixels",sizeMinPixels:0,sizeMaxPixels:Number.MAX_SAFE_INTEGER,borderRadius:{type:"object",value:0},padding:{type:"array",value:[0,0,0,0]},getPosition:{type:"accessor",value:t=>t.position},getSize:{type:"accessor",value:1},getAngle:{type:"accessor",value:0},getPixelOffset:{type:"accessor",value:[0,0]},getBoundingRect:{type:"accessor",value:[0,0,0,0]},getFillColor:{type:"accessor",value:[0,0,0,255]},getLineColor:{type:"accessor",value:[0,0,0,255]},getLineWidth:{type:"accessor",value:1}},Jo=(()=>{class t extends R{getShaders(){return super.getShaders({vs:_i,fs:Li,modules:[O,F,Ci]})}initializeState(){this.getAttributeManager().addInstanced({instancePositions:{size:3,type:"float64",fp64:this.use64bitPositions(),transition:!0,accessor:"getPosition"},instanceSizes:{size:1,transition:!0,accessor:"getSize",defaultValue:1},instanceAngles:{size:1,transition:!0,accessor:"getAngle"},instanceRects:{size:4,accessor:"getBoundingRect"},instancePixelOffsets:{size:2,transition:!0,accessor:"getPixelOffset"},instanceFillColors:{size:4,transition:!0,type:"unorm8",accessor:"getFillColor",defaultValue:[0,0,0,255]},instanceLineColors:{size:4,transition:!0,type:"unorm8",accessor:"getLineColor",defaultValue:[0,0,0,255]},instanceLineWidths:{size:1,transition:!0,accessor:"getLineWidth",defaultValue:1}})}updateState(e){super.updateState(e);let{changeFlags:i}=e;i.extensionsChanged&&(this.state.model?.destroy(),this.state.model=this._getModel(),this.getAttributeManager().invalidateAll())}draw({uniforms:e}){let{billboard:i,sizeScale:s,sizeUnits:n,sizeMinPixels:r,sizeMaxPixels:a,getLineWidth:l}=this.props,{padding:c,borderRadius:u}=this.props;c.length<4&&(c=[c[0],c[1],c[0],c[1]]),Array.isArray(u)||(u=[u,u,u,u]);let f=this.state.model,d={billboard:i,stroked:!!l,borderRadius:u,padding:c,sizeUnits:z[n],sizeScale:s,sizeMinPixels:r,sizeMaxPixels:a};f.shaderInputs.setProps({textBackground:d}),f.draw(this.context.renderPass)}_getModel(){let e=[0,0,1,0,0,1,1,1];return new A(this.context.device,C(v({},this.getShaders()),{id:this.props.id,bufferLayout:this.getAttributeManager().getBufferLayouts(),geometry:new E({topology:"triangle-strip",vertexCount:4,attributes:{positions:{size:2,value:new Float32Array(e)}}}),isInstanced:!0}))}}return t.defaultProps=$o,t.layerName="TextBackgroundLayer",t})(),Si=Jo;var Ii={start:1,middle:0,end:-1},wi={top:1,center:0,bottom:-1},Ke=[0,0,0,255],Yo=1,Xo={billboard:!0,sizeScale:1,sizeUnits:"pixels",sizeMinPixels:0,sizeMaxPixels:Number.MAX_SAFE_INTEGER,background:!1,getBackgroundColor:{type:"accessor",value:[255,255,255,255]},getBorderColor:{type:"accessor",value:Ke},getBorderWidth:{type:"accessor",value:0},backgroundBorderRadius:{type:"object",value:0},backgroundPadding:{type:"array",value:[0,0,0,0]},characterSet:{type:"object",value:V.characterSet},fontFamily:V.fontFamily,fontWeight:V.fontWeight,lineHeight:Yo,outlineWidth:{type:"number",value:0,min:0},outlineColor:{type:"color",value:Ke},fontSettings:{type:"object",value:{},compare:1},wordBreak:"break-word",maxWidth:{type:"number",value:-1},getText:{type:"accessor",value:t=>t.text},getPosition:{type:"accessor",value:t=>t.position},getColor:{type:"accessor",value:Ke},getSize:{type:"accessor",value:32},getAngle:{type:"accessor",value:0},getTextAnchor:{type:"accessor",value:"middle"},getAlignmentBaseline:{type:"accessor",value:"center"},getPixelOffset:{type:"accessor",value:[0,0]},backgroundColor:{deprecatedFor:["background","getBackgroundColor"]}},Qo=(()=>{class t extends ce{constructor(){super(...arguments),this.getBoundingRect=(e,i)=>{let{size:[s,n]}=this.transformParagraph(e,i),{fontSize:r}=this.state.fontAtlasManager.props;s/=r,n/=r;let{getTextAnchor:a,getAlignmentBaseline:l}=this.props,c=Ii[typeof a=="function"?a(e,i):a],u=wi[typeof l=="function"?l(e,i):l];return[(c-1)*s/2,(u-1)*n/2,s,n]},this.getIconOffsets=(e,i)=>{let{getTextAnchor:s,getAlignmentBaseline:n}=this.props,{x:r,y:a,rowWidth:l,size:[c,u]}=this.transformParagraph(e,i),f=Ii[typeof s=="function"?s(e,i):s],d=wi[typeof n=="function"?n(e,i):n],p=r.length,g=new Array(p*2),h=0;for(let x=0;x<p;x++){let y=(1-f)*(c-l[x])/2;g[h++]=(f-1)*c/2+y+r[x],g[h++]=(d-1)*u/2+a[x]}return g}}initializeState(){this.state={styleVersion:0,fontAtlasManager:new Te},this.props.maxWidth>0&&M.once(1,"v8.9 breaking change: TextLayer maxWidth is now relative to text size")()}updateState(e){let{props:i,oldProps:s,changeFlags:n}=e;(n.dataChanged||n.updateTriggersChanged&&(n.updateTriggersChanged.all||n.updateTriggersChanged.getText))&&this._updateText(),(this._updateFontAtlas()||i.lineHeight!==s.lineHeight||i.wordBreak!==s.wordBreak||i.maxWidth!==s.maxWidth)&&this.setState({styleVersion:this.state.styleVersion+1})}getPickingInfo({info:e}){return e.object=e.index>=0?this.props.data[e.index]:null,e}_updateFontAtlas(){let{fontSettings:e,fontFamily:i,fontWeight:s}=this.props,{fontAtlasManager:n,characterSet:r}=this.state,a=C(v({},e),{characterSet:r,fontFamily:i,fontWeight:s});if(!n.mapping)return n.setProps(a),!0;for(let l in a)if(a[l]!==n.props[l])return n.setProps(a),!0;return!1}_updateText(){let{data:e,characterSet:i}=this.props,s=e.attributes?.getText,{getText:n}=this.props,r=e.startIndices,a,l=i==="auto"&&new Set;if(s&&r){let{texts:c,characterCount:u}=pi(C(v({},ArrayBuffer.isView(s)?{value:s}:s),{length:e.length,startIndices:r,characterSet:l}));a=u,n=(f,{index:d})=>c[d]}else{let{iterable:c,objectInfo:u}=le(e);r=[0],a=0;for(let f of c){u.index++;let d=Array.from(n(f,u)||"");l&&d.forEach(l.add,l),a+=d.length,r.push(a)}}this.setState({getText:n,startIndices:r,numInstances:a,characterSet:l||i})}transformParagraph(e,i){let{fontAtlasManager:s}=this.state,n=s.mapping,r=this.state.getText,{wordBreak:a,lineHeight:l,maxWidth:c}=this.props,u=r(e,i)||"";return di(u,l,a,c*s.props.fontSize,n)}renderLayers(){let{startIndices:e,numInstances:i,getText:s,fontAtlasManager:{scale:n,atlas:r,mapping:a},styleVersion:l}=this.state,{data:c,_dataDiff:u,getPosition:f,getColor:d,getSize:p,getAngle:g,getPixelOffset:h,getBackgroundColor:x,getBorderColor:y,getBorderWidth:_,backgroundBorderRadius:m,backgroundPadding:P,background:L,billboard:I,fontSettings:k,outlineWidth:B,outlineColor:W,sizeScale:Je,sizeUnits:Ye,sizeMinPixels:Xe,sizeMaxPixels:Qe,transitions:b,updateTriggers:w}=this.props,Oi=this.getSubLayerClass("characters",ri),Fi=this.getSubLayerClass("background",Si);return[L&&new Fi({getFillColor:x,getLineColor:y,getLineWidth:_,borderRadius:m,padding:P,getPosition:f,getSize:p,getAngle:g,getPixelOffset:h,billboard:I,sizeScale:Je,sizeUnits:Ye,sizeMinPixels:Xe,sizeMaxPixels:Qe,transitions:b&&{getPosition:b.getPosition,getAngle:b.getAngle,getSize:b.getSize,getFillColor:b.getBackgroundColor,getLineColor:b.getBorderColor,getLineWidth:b.getBorderWidth,getPixelOffset:b.getPixelOffset}},this.getSubLayerProps({id:"background",updateTriggers:{getPosition:w.getPosition,getAngle:w.getAngle,getSize:w.getSize,getFillColor:w.getBackgroundColor,getLineColor:w.getBorderColor,getLineWidth:w.getBorderWidth,getPixelOffset:w.getPixelOffset,getBoundingRect:{getText:w.getText,getTextAnchor:w.getTextAnchor,getAlignmentBaseline:w.getAlignmentBaseline,styleVersion:l}}}),{data:c.attributes&&c.attributes.background?{length:c.length,attributes:c.attributes.background}:c,_dataDiff:u,autoHighlight:!1,getBoundingRect:this.getBoundingRect}),new Oi({sdf:k.sdf,smoothing:Number.isFinite(k.smoothing)?k.smoothing:V.smoothing,outlineWidth:B/(k.radius||V.radius),outlineColor:W,iconAtlas:r,iconMapping:a,getPosition:f,getColor:d,getSize:p,getAngle:g,getPixelOffset:h,billboard:I,sizeScale:Je*n,sizeUnits:Ye,sizeMinPixels:Xe*n,sizeMaxPixels:Qe*n,transitions:b&&{getPosition:b.getPosition,getAngle:b.getAngle,getColor:b.getColor,getSize:b.getSize,getPixelOffset:b.getPixelOffset}},this.getSubLayerProps({id:"characters",updateTriggers:{all:w.getText,getPosition:w.getPosition,getAngle:w.getAngle,getColor:w.getColor,getSize:w.getSize,getPixelOffset:w.getPixelOffset,getIconOffsets:{getTextAnchor:w.getTextAnchor,getAlignmentBaseline:w.getAlignmentBaseline,styleVersion:l}}}),{data:c,_dataDiff:u,startIndices:e,numInstances:i,getIconOffsets:this.getIconOffsets,getIcon:s})]}static set fontAtlasCacheLimit(e){vi(e)}}return t.defaultProps=Xo,t.layerName="TextLayer",t})(),Mi=Qo;var ne={circle:{type:$t,props:{filled:"filled",stroked:"stroked",lineWidthMaxPixels:"lineWidthMaxPixels",lineWidthMinPixels:"lineWidthMinPixels",lineWidthScale:"lineWidthScale",lineWidthUnits:"lineWidthUnits",pointRadiusMaxPixels:"radiusMaxPixels",pointRadiusMinPixels:"radiusMinPixels",pointRadiusScale:"radiusScale",pointRadiusUnits:"radiusUnits",pointAntialiasing:"antialiasing",pointBillboard:"billboard",getFillColor:"getFillColor",getLineColor:"getLineColor",getLineWidth:"getLineWidth",getPointRadius:"getRadius"}},icon:{type:Ie,props:{iconAtlas:"iconAtlas",iconMapping:"iconMapping",iconSizeMaxPixels:"sizeMaxPixels",iconSizeMinPixels:"sizeMinPixels",iconSizeScale:"sizeScale",iconSizeUnits:"sizeUnits",iconAlphaCutoff:"alphaCutoff",iconBillboard:"billboard",getIcon:"getIcon",getIconAngle:"getAngle",getIconColor:"getColor",getIconPixelOffset:"getPixelOffset",getIconSize:"getSize"}},text:{type:Mi,props:{textSizeMaxPixels:"sizeMaxPixels",textSizeMinPixels:"sizeMinPixels",textSizeScale:"sizeScale",textSizeUnits:"sizeUnits",textBackground:"background",textBackgroundPadding:"backgroundPadding",textFontFamily:"fontFamily",textFontWeight:"fontWeight",textLineHeight:"lineHeight",textMaxWidth:"maxWidth",textOutlineColor:"outlineColor",textOutlineWidth:"outlineWidth",textWordBreak:"wordBreak",textCharacterSet:"characterSet",textBillboard:"billboard",textFontSettings:"fontSettings",getText:"getText",getTextAngle:"getAngle",getTextColor:"getColor",getTextPixelOffset:"getPixelOffset",getTextSize:"getSize",getTextAnchor:"getTextAnchor",getTextAlignmentBaseline:"getAlignmentBaseline",getTextBackgroundColor:"getBackgroundColor",getTextBorderColor:"getBorderColor",getTextBorderWidth:"getBorderWidth"}}},se={type:Ne,props:{lineWidthUnits:"widthUnits",lineWidthScale:"widthScale",lineWidthMinPixels:"widthMinPixels",lineWidthMaxPixels:"widthMaxPixels",lineJointRounded:"jointRounded",lineCapRounded:"capRounded",lineMiterLimit:"miterLimit",lineBillboard:"billboard",getLineColor:"getColor",getLineWidth:"getWidth"}},Ee={type:je,props:{extruded:"extruded",filled:"filled",wireframe:"wireframe",elevationScale:"elevationScale",material:"material",_full3d:"_full3d",getElevation:"getElevation",getFillColor:"getFillColor",getLineColor:"getLineColor"}};function K({type:t,props:o}){let e={};for(let i in o)e[i]=t.defaultProps[o[i]];return e}function ze(t,o){let{transitions:e,updateTriggers:i}=t.props,s={updateTriggers:{},transitions:e&&{getPosition:e.geometry}};for(let n in o){let r=o[n],a=t.props[n];n.startsWith("get")&&(a=t.getSubLayerAccessor(a),s.updateTriggers[r]=i[n],e&&(s.transitions[r]=e[n])),s[r]=a}return s}function bi(t){if(Array.isArray(t))return t;switch(M.assert(t.type,"GeoJSON does not have type"),t.type){case"Feature":return[t];case"FeatureCollection":return M.assert(Array.isArray(t.features),"GeoJSON does not have features array"),t.features;default:return[{geometry:t}]}}function $e(t,o,e={}){let i={pointFeatures:[],lineFeatures:[],polygonFeatures:[],polygonOutlineFeatures:[]},{startRow:s=0,endRow:n=t.length}=e;for(let r=s;r<n;r++){let a=t[r],{geometry:l}=a;if(l)if(l.type==="GeometryCollection"){M.assert(Array.isArray(l.geometries),"GeoJSON does not have geometries array");let{geometries:c}=l;for(let u=0;u<c.length;u++){let f=c[u];Ai(f,i,o,a,r)}}else Ai(l,i,o,a,r)}return i}function Ai(t,o,e,i,s){let{type:n,coordinates:r}=t,{pointFeatures:a,lineFeatures:l,polygonFeatures:c,polygonOutlineFeatures:u}=o;if(!en(n,r)){M.warn(`${n} coordinates are malformed`)();return}switch(n){case"Point":a.push(e({geometry:t},i,s));break;case"MultiPoint":r.forEach(f=>{a.push(e({geometry:{type:"Point",coordinates:f}},i,s))});break;case"LineString":l.push(e({geometry:t},i,s));break;case"MultiLineString":r.forEach(f=>{l.push(e({geometry:{type:"LineString",coordinates:f}},i,s))});break;case"Polygon":c.push(e({geometry:t},i,s)),r.forEach(f=>{u.push(e({geometry:{type:"LineString",coordinates:f}},i,s))});break;case"MultiPolygon":r.forEach(f=>{c.push(e({geometry:{type:"Polygon",coordinates:f}},i,s)),f.forEach(d=>{u.push(e({geometry:{type:"LineString",coordinates:d}},i,s))})});break;default:}}var qo={Point:1,MultiPoint:2,LineString:2,MultiLineString:3,Polygon:3,MultiPolygon:4};function en(t,o){let e=qo[t];for(M.assert(e,`Unknown GeoJSON type ${t}`);o&&--e>0;)o=o[0];return o&&Number.isFinite(o[0])}function Ti(){return{points:{},lines:{},polygons:{},polygonsOutline:{}}}function Oe(t){return t.geometry.coordinates}function Ei(t,o){let e=Ti(),{pointFeatures:i,lineFeatures:s,polygonFeatures:n,polygonOutlineFeatures:r}=t;return e.points.data=i,e.points._dataDiff=o.pointFeatures&&(()=>o.pointFeatures),e.points.getPosition=Oe,e.lines.data=s,e.lines._dataDiff=o.lineFeatures&&(()=>o.lineFeatures),e.lines.getPath=Oe,e.polygons.data=n,e.polygons._dataDiff=o.polygonFeatures&&(()=>o.polygonFeatures),e.polygons.getPolygon=Oe,e.polygonsOutline.data=r,e.polygonsOutline._dataDiff=o.polygonOutlineFeatures&&(()=>o.polygonOutlineFeatures),e.polygonsOutline.getPath=Oe,e}function zi(t,o){let e=Ti(),{points:i,lines:s,polygons:n}=t,r=ti(t,o);e.points.data={length:i.positions.value.length/i.positions.size,attributes:C(v({},i.attributes),{getPosition:i.positions,instancePickingColors:{size:4,value:r.points}}),properties:i.properties,numericProps:i.numericProps,featureIds:i.featureIds},e.lines.data={length:s.pathIndices.value.length-1,startIndices:s.pathIndices.value,attributes:C(v({},s.attributes),{getPath:s.positions,instancePickingColors:{size:4,value:r.lines}}),properties:s.properties,numericProps:s.numericProps,featureIds:s.featureIds},e.lines._pathType="open";let a=n.positions.value.length/n.positions.size,l=Array(a).fill(1);for(let c of n.primitivePolygonIndices.value)l[c-1]=0;return e.polygons.data={length:n.polygonIndices.value.length-1,startIndices:n.polygonIndices.value,attributes:C(v({},n.attributes),{getPolygon:n.positions,instanceVertexValid:{size:1,value:new Uint16Array(l)},pickingColors:{size:4,value:r.polygons}}),properties:n.properties,numericProps:n.numericProps,featureIds:n.featureIds},e.polygons._normalize=!1,n.triangles&&(e.polygons.data.attributes.indices=n.triangles.value),e.polygonsOutline.data={length:n.primitivePolygonIndices.value.length-1,startIndices:n.primitivePolygonIndices.value,attributes:C(v({},n.attributes),{getPath:n.positions,instancePickingColors:{size:4,value:r.polygons}}),properties:n.properties,numericProps:n.numericProps,featureIds:n.featureIds},e.polygonsOutline._pathType="open",e}var tn=["points","linestrings","polygons"],on=C(v(v(v(v(v({},K(ne.circle)),K(ne.icon)),K(ne.text)),K(se)),K(Ee)),{stroked:!0,filled:!0,extruded:!1,wireframe:!1,_full3d:!1,iconAtlas:{type:"object",value:null},iconMapping:{type:"object",value:{}},getIcon:{type:"accessor",value:t=>t.properties.icon},getText:{type:"accessor",value:t=>t.properties.text},pointType:"circle",getRadius:{deprecatedFor:"getPointRadius"}}),nn=(()=>{class t extends ce{initializeState(){this.state={layerProps:{},features:{},featuresDiff:{}}}updateState({props:e,changeFlags:i}){if(!i.dataChanged)return;let{data:s}=this.props,n=s&&"points"in s&&"polygons"in s&&"lines"in s;this.setState({binary:n}),n?this._updateStateBinary({props:e,changeFlags:i}):this._updateStateJSON({props:e,changeFlags:i})}_updateStateBinary({props:e,changeFlags:i}){let s=zi(e.data,this.encodePickingColor);this.setState({layerProps:s})}_updateStateJSON({props:e,changeFlags:i}){let s=bi(e.data),n=this.getSubLayerRow.bind(this),r={},a={};if(Array.isArray(i.dataChanged)){let c=this.state.features;for(let u in c)r[u]=c[u].slice(),a[u]=[];for(let u of i.dataChanged){let f=$e(s,n,u);for(let d in c)a[d].push(qt({data:r[d],getIndex:p=>p.__source.index,dataRange:u,replace:f[d]}))}}else r=$e(s,n);let l=Ei(r,a);this.setState({features:r,featuresDiff:a,layerProps:l})}getPickingInfo(e){let i=super.getPickingInfo(e),{index:s,sourceLayer:n}=i;return i.featureType=tn.find(r=>n.id.startsWith(`${this.id}-${r}-`)),s>=0&&n.id.startsWith(`${this.id}-points-text`)&&this.state.binary&&(i.index=this.props.data.points.globalFeatureIds.value[s]),i}_updateAutoHighlight(e){let i=`${this.id}-points-`,s=e.featureType==="points";for(let n of this.getSubLayers())n.id.startsWith(i)===s&&n.updateAutoHighlight(e)}_renderPolygonLayer(){let{extruded:e,wireframe:i}=this.props,{layerProps:s}=this.state,n="polygons-fill",r=this.shouldRenderSubLayer(n,s.polygons?.data)&&this.getSubLayerClass(n,Ee.type);if(r){let a=ze(this,Ee.props),l=e&&i;return l||delete a.getLineColor,a.updateTriggers.lineColors=l,new r(a,this.getSubLayerProps({id:n,updateTriggers:a.updateTriggers}),s.polygons)}return null}_renderLineLayers(){let{extruded:e,stroked:i}=this.props,{layerProps:s}=this.state,n="polygons-stroke",r="linestrings",a=!e&&i&&this.shouldRenderSubLayer(n,s.polygonsOutline?.data)&&this.getSubLayerClass(n,se.type),l=this.shouldRenderSubLayer(r,s.lines?.data)&&this.getSubLayerClass(r,se.type);if(a||l){let c=ze(this,se.props);return[a&&new a(c,this.getSubLayerProps({id:n,updateTriggers:c.updateTriggers}),s.polygonsOutline),l&&new l(c,this.getSubLayerProps({id:r,updateTriggers:c.updateTriggers}),s.lines)]}return null}_renderPointLayers(){let{pointType:e}=this.props,{layerProps:i,binary:s}=this.state,{highlightedObjectIndex:n}=this.props;!s&&Number.isFinite(n)&&(n=i.points.data.findIndex(c=>c.__source.index===n));let r=new Set(e.split("+")),a=[];for(let c of r){let u=`points-${c}`,f=ne[c],d=f&&this.shouldRenderSubLayer(u,i.points?.data)&&this.getSubLayerClass(u,f.type);if(d){let p=ze(this,f.props),g=i.points;if(c==="text"&&s){let l=g.data.attributes,{instancePickingColors:h}=l,x=qe(l,["instancePickingColors"]);g=C(v({},g),{data:C(v({},g.data),{attributes:x})})}a.push(new d(p,this.getSubLayerProps({id:u,updateTriggers:p.updateTriggers,highlightedObjectIndex:n}),g))}}return a}renderLayers(){let{extruded:e}=this.props,i=this._renderPolygonLayer(),s=this._renderLineLayers(),n=this._renderPointLayers();return[!e&&i,s,n,e&&i]}getSubLayerAccessor(e){let{binary:i}=this.state;return!i||typeof e!="function"?super.getSubLayerAccessor(e):(s,n)=>{let{data:r,index:a}=n,l=ei(r,a);return e(l,n)}}}return t.layerName="GeoJsonLayer",t.defaultProps=on,t})(),sn=nn;export{Ro as a,Ne as b,je as c,sn as d};
