import{a as re,b as Fe,c as Re}from"./chunk-ZP5BPBVR.js";import{$ as oe,C as B,D as _e,E as Ce,F as Me,G as Ie,M as O,b as M,ba as z,ca as Oe,d as Ne,h as I,ha as ie,ia as ne,m as E,q as we,x as W}from"./chunk-N6UF5KRC.js";import"./chunk-OQ43XKI2.js";import{a as x,b as y}from"./chunk-ATDPNAVO.js";function De({pointCount:s,getBinId:i}){let e=new Map;for(let t=0;t<s;t++){let o=i(t);if(o===null)continue;let n=e.get(String(o));n?n.points.push(t):(n={id:o,index:e.size,points:[t]},e.set(String(o),n))}return Array.from(e.values())}function We({bins:s,dimensions:i,target:e}){let t=s.length*i;(!e||e.length<t)&&(e=new Float32Array(t));for(let o=0;o<s.length;o++){let{id:n}=s[o];Array.isArray(n)?e.set(n,o*i):e[o]=n}return e}var so=s=>s.length,Be=(s,i)=>{let e=0;for(let t of s)e+=i(t);return e},ao=(s,i)=>s.length===0?NaN:Be(s,i)/s.length,lo=(s,i)=>{let e=1/0;for(let t of s){let o=i(t);o<e&&(e=o)}return e},co=(s,i)=>{let e=-1/0;for(let t of s){let o=i(t);o>e&&(e=o)}return e},ze={COUNT:so,SUM:Be,MEAN:ao,MIN:lo,MAX:co};function Ve({bins:s,getValue:i,operation:e,target:t}){(!t||t.length<s.length)&&(t=new Float32Array(s.length));let o=1/0,n=-1/0;for(let r=0;r<s.length;r++){let{points:a}=s[r];t[r]=e(a,i),t[r]<o&&(o=t[r]),t[r]>n&&(n=t[r])}return{value:t,domain:[o,n]}}function Se(s,i,e){let t={};for(let n of s.sources||[]){let r=i[n];if(r)t[n]=uo(r);else throw new Error(`Cannot find attribute ${n}`)}let o={};return n=>{for(let r in t)o[r]=t[r](n);return s.getValue(o,n,e)}}function uo(s){let i=s.value,{offset:e=0,stride:t,size:o}=s.getAccessor(),n=i.BYTES_PER_ELEMENT,r=e/n,a=t?t/n:o;if(o===1)return s.isConstant?()=>i[0]:u=>{let g=r+a*u;return i[g]};let c;return s.isConstant?(c=Array.from(i),()=>c):(c=new Array(o),u=>{let g=r+a*u;for(let p=0;p<o;p++)c[p]=i[g+p];return c})}var L=class{constructor(i){this.bins=[],this.binIds=null,this.results=[],this.dimensions=i.dimensions,this.channelCount=i.getValue.length,this.props=y(x({},i),{binOptions:{},pointCount:0,operations:[],customOperations:[],attributes:{}}),this.needsUpdate=!0,this.setProps(i)}destroy(){}get binCount(){return this.bins.length}setProps(i){let e=this.props;if(i.binOptions&&(O(i.binOptions,e.binOptions,2)||this.setNeedsUpdate()),i.operations)for(let t=0;t<this.channelCount;t++)i.operations[t]!==e.operations[t]&&this.setNeedsUpdate(t);if(i.customOperations)for(let t=0;t<this.channelCount;t++)!!i.customOperations[t]!=!!e.customOperations[t]&&this.setNeedsUpdate(t);i.pointCount!==void 0&&i.pointCount!==e.pointCount&&this.setNeedsUpdate(),i.attributes&&(i.attributes=x(x({},e.attributes),i.attributes)),Object.assign(this.props,i)}setNeedsUpdate(i){i===void 0?this.needsUpdate=!0:this.needsUpdate!==!0&&(this.needsUpdate=this.needsUpdate||[],this.needsUpdate[i]=!0)}update(){if(this.needsUpdate===!0){this.bins=De({pointCount:this.props.pointCount,getBinId:Se(this.props.getBin,this.props.attributes,this.props.binOptions)});let i=We({bins:this.bins,dimensions:this.dimensions,target:this.binIds?.value});this.binIds={value:i,type:"float32",size:this.dimensions}}for(let i=0;i<this.channelCount;i++)if(this.needsUpdate===!0||this.needsUpdate[i]){let e=this.props.customOperations[i]||ze[this.props.operations[i]],{value:t,domain:o}=Ve({bins:this.bins,getValue:Se(this.props.getValue[i],this.props.attributes,void 0),operation:e,target:this.results[i]?.value});this.results[i]={value:t,domain:o,type:"float32",size:1},this.props.onUpdate?.({channel:i})}this.needsUpdate=!1}preDraw(){}getBins(){return this.binIds}getResult(i){return this.results[i]}getResultDomain(i){return this.results[i]?.domain??[1/0,-1/0]}getBin(i){let e=this.bins[i];if(!e)return null;let t=new Array(this.channelCount);for(let o=0;o<t.length;o++){let n=this.results[o];t[o]=n?.value[i]}return{id:e.id,value:t,count:e.points.length,pointIndices:e.points}}};function se(s,i,e){return s.createFramebuffer({width:i,height:e,colorAttachments:[s.createTexture({width:i,height:e,format:"rgba32float",sampler:{minFilter:"nearest",magFilter:"nearest"}})]})}var go=`uniform binSorterUniforms {
  ivec4 binIdRange;
  ivec2 targetSize;
} binSorter;
`,Ue={name:"binSorter",vs:go,uniformTypes:{binIdRange:"vec4<i32>",targetSize:"vec2<i32>"}};var Ge=[1,2,4,8],He=3e38,po={SUM:0,MEAN:0,MIN:0,MAX:0,COUNT:0},ee=1024,ae=class{constructor(i,e){this.binsFBO=null,this.device=i,this.model=fo(i,e)}get texture(){return this.binsFBO?this.binsFBO.colorAttachments[0].texture:null}destroy(){this.model.destroy(),this.binsFBO?.colorAttachments[0].texture.destroy(),this.binsFBO?.destroy()}getBinValues(i){if(!this.binsFBO)return null;let e=i%ee,t=Math.floor(i/ee),o=this.device.readPixelsToArrayWebGL(this.binsFBO,{sourceX:e,sourceY:t,sourceWidth:1,sourceHeight:1}).buffer;return new Float32Array(o)}setDimensions(i,e){let t=ee,o=Math.ceil(i/t);this.binsFBO?this.binsFBO.height<o&&this.binsFBO.resize({width:t,height:o}):this.binsFBO=se(this.device,t,o);let n={binIdRange:[e[0][0],e[0][1],e[1]?.[0]||0,e[1]?.[1]||0],targetSize:[this.binsFBO.width,this.binsFBO.height]};this.model.shaderInputs.setProps({binSorter:n})}setModelProps(i){let e=this.model;i.attributes&&e.setAttributes(i.attributes),i.constantAttributes&&e.setConstantAttributes(i.constantAttributes),i.vertexCount!==void 0&&e.setVertexCount(i.vertexCount),i.shaderModuleProps&&e.shaderInputs.setProps(i.shaderModuleProps)}update(i){if(!this.binsFBO)return;let e=mo(i);this._updateBins("SUM",e.SUM+e.MEAN),this._updateBins("MIN",e.MIN),this._updateBins("MAX",e.MAX)}_updateBins(i,e){if(e===0)return;e|=Ge[3];let t=this.model,o=this.binsFBO,n=i==="MAX"?-He:i==="MIN"?He:0,r=this.device.beginRenderPass({id:`gpu-aggregation-${i}`,framebuffer:o,parameters:{viewport:[0,0,o.width,o.height],colorMask:e},clearColor:[n,n,n,0],clearDepth:!1,clearStencil:!1});t.setParameters({blend:!0,blendColorSrcFactor:"one",blendColorDstFactor:"one",blendAlphaSrcFactor:"one",blendAlphaDstFactor:"one",blendColorOperation:i==="MAX"?"max":i==="MIN"?"min":"add",blendAlphaOperation:"add"}),t.draw(r),r.end()}};function mo(s){let i=x({},po);for(let e=0;e<s.length;e++){let t=s[e];t&&(i[t]+=Ge[e])}return i}function fo(s,i){let e=i.vs;i.dimensions===2&&(e+=`
void getBin(out int binId) {
  ivec2 binId2;
  getBin(binId2);
  if (binId2.x < binSorter.binIdRange.x || binId2.x >= binSorter.binIdRange.y) {
    binId = -1;
  } else {
    binId = (binId2.y - binSorter.binIdRange.z) * (binSorter.binIdRange.y - binSorter.binIdRange.x) + binId2.x;
  }
}
`);let t=`#version 300 es
#define SHADER_NAME gpu-aggregation-sort-bins-vertex

${e}

out vec3 v_Value;

void main() {
  int binIndex;
  getBin(binIndex);
  binIndex = binIndex - binSorter.binIdRange.x;
  if (binIndex < 0) {
    gl_Position = vec4(0.);
    return;
  }
  int row = binIndex / binSorter.targetSize.x;
  int col = binIndex - row * binSorter.targetSize.x;
  vec2 position = (vec2(col, row) + 0.5) / vec2(binSorter.targetSize) * 2.0 - 1.0;
  gl_Position = vec4(position, 0.0, 1.0);
  gl_PointSize = 1.0;

#if NUM_CHANNELS == 3
  getValue(v_Value);
#elif NUM_CHANNELS == 2
  getValue(v_Value.xy);
#else
  getValue(v_Value.x);
#endif
}
`,o=`#version 300 es
#define SHADER_NAME gpu-aggregation-sort-bins-fragment

precision highp float;

in vec3 v_Value;
out vec4 fragColor;

void main() {
  fragColor.xyz = v_Value;

  #ifdef MODULE_GEOMETRY
  geometry.uv = vec2(0.);
  DECKGL_FILTER_COLOR(fragColor, geometry);
  #endif

  fragColor.w = 1.0;
}
`;return new B(s,{bufferLayout:i.bufferLayout,modules:[...i.modules||[],Ue],defines:y(x({},i.defines),{NON_INSTANCED_MODEL:1,NUM_CHANNELS:i.channelCount}),isInstanced:!1,vs:t,fs:o,topology:"point-list",disableWarnings:!0})}var ho=`uniform aggregatorTransformUniforms {
  ivec4 binIdRange;
  bvec3 isCount;
  bvec3 isMean;
  float naN;
} aggregatorTransform;
`,je={name:"aggregatorTransform",vs:ho,uniformTypes:{binIdRange:"vec4<i32>",isCount:"vec3<f32>",isMean:"vec3<f32>"}};var Ae=3e38,le=class{constructor(i,e){this.binBuffer=null,this.valueBuffer=null,this._domains=null,this.device=i,this.channelCount=e.channelCount,this.transform=vo(i,e),this.domainFBO=se(i,2,1)}destroy(){this.transform.destroy(),this.binBuffer?.destroy(),this.valueBuffer?.destroy(),this.domainFBO.colorAttachments[0].texture.destroy(),this.domainFBO.destroy()}get domains(){if(!this._domains){let i=this.device.readPixelsToArrayWebGL(this.domainFBO).buffer,e=new Float32Array(i);this._domains=[[-e[4],e[0]],[-e[5],e[1]],[-e[6],e[2]]].slice(0,this.channelCount)}return this._domains}setDimensions(i,e){let{model:t,transformFeedback:o}=this.transform;t.setVertexCount(i);let n={binIdRange:[e[0][0],e[0][1],e[1]?.[0]||0,e[1]?.[1]||0]};t.shaderInputs.setProps({aggregatorTransform:n});let r=i*e.length*4;(!this.binBuffer||this.binBuffer.byteLength<r)&&(this.binBuffer?.destroy(),this.binBuffer=this.device.createBuffer({byteLength:r}),o.setBuffer("binIds",this.binBuffer));let a=i*this.channelCount*4;(!this.valueBuffer||this.valueBuffer.byteLength<a)&&(this.valueBuffer?.destroy(),this.valueBuffer=this.device.createBuffer({byteLength:a}),o.setBuffer("values",this.valueBuffer))}update(i,e){if(!i)return;let t=this.transform,o=this.domainFBO,n=[0,1,2].map(c=>e[c]==="COUNT"?1:0),r=[0,1,2].map(c=>e[c]==="MEAN"?1:0),a={isCount:n,isMean:r,bins:i};t.model.shaderInputs.setProps({aggregatorTransform:a}),t.run({id:"gpu-aggregation-domain",framebuffer:o,parameters:{viewport:[0,0,2,1]},clearColor:[-Ae,-Ae,-Ae,0],clearDepth:!1,clearStencil:!1}),this._domains=null}};function vo(s,i){let e=`#version 300 es
#define SHADER_NAME gpu-aggregation-domain-vertex

uniform sampler2D bins;

#if NUM_DIMS == 1
out float binIds;
#else
out vec2 binIds;
#endif

#if NUM_CHANNELS == 1
flat out float values;
#elif NUM_CHANNELS == 2
flat out vec2 values;
#else
flat out vec3 values;
#endif

const float NAN = intBitsToFloat(-1);

void main() {
  int row = gl_VertexID / SAMPLER_WIDTH;
  int col = gl_VertexID - row * SAMPLER_WIDTH;
  vec4 weights = texelFetch(bins, ivec2(col, row), 0);
  vec3 value3 = mix(
    mix(weights.rgb, vec3(weights.a), aggregatorTransform.isCount),
    weights.rgb / max(weights.a, 1.0),
    aggregatorTransform.isMean
  );
  if (weights.a == 0.0) {
    value3 = vec3(NAN);
  }

#if NUM_DIMS == 1
  binIds = float(gl_VertexID + aggregatorTransform.binIdRange.x);
#else
  int y = gl_VertexID / (aggregatorTransform.binIdRange.y - aggregatorTransform.binIdRange.x);
  int x = gl_VertexID - y * (aggregatorTransform.binIdRange.y - aggregatorTransform.binIdRange.x);
  binIds.y = float(y + aggregatorTransform.binIdRange.z);
  binIds.x = float(x + aggregatorTransform.binIdRange.x);
#endif

#if NUM_CHANNELS == 3
  values = value3;
#elif NUM_CHANNELS == 2
  values = value3.xy;
#else
  values = value3.x;
#endif

  gl_Position = vec4(0., 0., 0., 1.);
  // This model renders into a 2x1 texture to obtain min and max simultaneously.
  // See comments in fragment shader
  gl_PointSize = 2.0;
}
`,t=`#version 300 es
#define SHADER_NAME gpu-aggregation-domain-fragment

precision highp float;

#if NUM_CHANNELS == 1
flat in float values;
#elif NUM_CHANNELS == 2
flat in vec2 values;
#else
flat in vec3 values;
#endif

out vec4 fragColor;

void main() {
  vec3 value3;
#if NUM_CHANNELS == 3
  value3 = values;
#elif NUM_CHANNELS == 2
  value3.xy = values;
#else
  value3.x = values;
#endif
  if (isnan(value3.x)) discard;
  // This shader renders into a 2x1 texture with blending=max
  // The left pixel yields the max value of each channel
  // The right pixel yields the min value of each channel
  if (gl_FragCoord.x < 1.0) {
    fragColor = vec4(value3, 1.0);
  } else {
    fragColor = vec4(-value3, 1.0);
  }
}
`;return new _e(s,{vs:e,fs:t,topology:"point-list",modules:[je],parameters:{blend:!0,blendColorSrcFactor:"one",blendColorDstFactor:"one",blendColorOperation:"max",blendAlphaSrcFactor:"one",blendAlphaDstFactor:"one",blendAlphaOperation:"max"},defines:{NUM_DIMS:i.dimensions,NUM_CHANNELS:i.channelCount,SAMPLER_WIDTH:ee},varyings:["binIds","values"],disableWarnings:!0})}var C=class{static isSupported(i){return i.features.has("float32-renderable-webgl")&&i.features.has("texture-blend-float-webgl")}constructor(i,e){this.binCount=0,this.binIds=null,this.results=[],this.device=i,this.dimensions=e.dimensions,this.channelCount=e.channelCount,this.props=y(x({},e),{pointCount:0,binIdRange:[[0,0]],operations:[],attributes:{},binOptions:{}}),this.needsUpdate=new Array(this.channelCount).fill(!0),this.binSorter=new ae(i,e),this.aggregationTransform=new le(i,e),this.setProps(e)}getBins(){let i=this.aggregationTransform.binBuffer;return i?(this.binIds?.buffer!==i&&(this.binIds={buffer:i,type:"float32",size:this.dimensions}),this.binIds):null}getResult(i){let e=this.aggregationTransform.valueBuffer;return!e||i>=this.channelCount?null:(this.results[i]?.buffer!==e&&(this.results[i]={buffer:e,type:"float32",size:1,stride:this.channelCount*4,offset:i*4}),this.results[i])}getResultDomain(i){return this.aggregationTransform.domains[i]}getBin(i){if(i<0||i>=this.binCount)return null;let{binIdRange:e}=this.props,t;if(this.dimensions===1)t=[i+e[0][0]];else{let[[a,c],[u]]=e,g=c-a;t=[i%g+a,Math.floor(i/g)+u]}let o=this.binSorter.getBinValues(i);if(!o)return null;let n=o[3],r=[];for(let a=0;a<this.channelCount;a++){let c=this.props.operations[a];c==="COUNT"?r[a]=n:n===0?r[a]=NaN:r[a]=c==="MEAN"?o[a]/n:o[a]}return{id:t,value:r,count:n}}destroy(){this.binSorter.destroy(),this.aggregationTransform.destroy()}setProps(i){let e=this.props;if("binIdRange"in i&&!O(i.binIdRange,e.binIdRange,2)){let t=i.binIdRange;if(M.assert(t.length===this.dimensions),this.dimensions===1){let[[o,n]]=t;this.binCount=n-o}else{let[[o,n],[r,a]]=t;this.binCount=(n-o)*(a-r)}this.binSorter.setDimensions(this.binCount,t),this.aggregationTransform.setDimensions(this.binCount,t),this.setNeedsUpdate()}if(i.operations)for(let t=0;t<this.channelCount;t++)i.operations[t]!==e.operations[t]&&this.setNeedsUpdate(t);if(i.pointCount!==void 0&&i.pointCount!==e.pointCount&&(this.binSorter.setModelProps({vertexCount:i.pointCount}),this.setNeedsUpdate()),i.binOptions&&(O(i.binOptions,e.binOptions,2)||this.setNeedsUpdate(),this.binSorter.model.shaderInputs.setProps({binOptions:i.binOptions})),i.attributes){let t={},o={};for(let n of Object.values(i.attributes))for(let[r,a]of Object.entries(n.getValue()))ArrayBuffer.isView(a)?o[r]=a:a&&(t[r]=a);this.binSorter.setModelProps({attributes:t,constantAttributes:o})}i.shaderModuleProps&&this.binSorter.setModelProps({shaderModuleProps:i.shaderModuleProps}),Object.assign(this.props,i)}setNeedsUpdate(i){i===void 0?this.needsUpdate.fill(!0):this.needsUpdate[i]=!0}update(){}preDraw(){if(!this.needsUpdate.some(Boolean))return;let{operations:i}=this.props,e=this.needsUpdate.map((t,o)=>t?i[o]:null);this.binSorter.update(e),this.aggregationTransform.update(this.binSorter.texture,i);for(let t=0;t<this.channelCount;t++)this.needsUpdate[t]&&(this.needsUpdate[t]=!1,this.props.onUpdate?.({channel:t}))}};var xo=(()=>{class s extends ne{get isDrawable(){return!0}initializeState(){this.getAttributeManager().remove(["instancePickingColors"])}updateState(e){super.updateState(e);let t=this.getAggregatorType();if(e.changeFlags.extensionsChanged||this.state.aggregatorType!==t){this.state.aggregator?.destroy();let o=this.createAggregator(t);return o.setProps({attributes:this.getAttributeManager()?.attributes}),this.setState({aggregator:o,aggregatorType:t}),!0}return!1}finalizeState(e){super.finalizeState(e),this.state.aggregator.destroy()}updateAttributes(e){let{aggregator:t}=this.state;t.setProps({attributes:e});for(let o in e)this.onAttributeChange(o);t.update()}draw({shaderModuleProps:e}){let{aggregator:t}=this.state;t.setProps({shaderModuleProps:e}),t.preDraw()}_getAttributeManager(){return new z(this.context.device,{id:this.props.id,stats:this.context.stats})}}return s.layerName="AggregationLayer",s})(),_=xo;var F=[[255,255,178],[254,217,118],[254,178,76],[253,141,60],[240,59,32],[189,0,38]];function Te(s,i=!1,e=Float32Array){let t;if(Number.isFinite(s[0]))t=new e(s);else{t=new e(s.length*4);let o=0;for(let n=0;n<s.length;n++){let r=s[n];t[o++]=r[0],t[o++]=r[1],t[o++]=r[2],t[o++]=Number.isFinite(r[3])?r[3]:255}}if(i)for(let o=0;o<t.length;o++)t[o]/=255;return t}var ce={linear:"linear",quantile:"nearest",quantize:"nearest",ordinal:"nearest"};function V(s,i){s.setSampler({minFilter:ce[i],magFilter:ce[i]})}function U(s,i,e="linear"){let t=Te(i,!1,Uint8Array);return s.createTexture({format:"rgba8unorm",sampler:{minFilter:ce[e],magFilter:ce[e],addressModeU:"clamp-to-edge",addressModeV:"clamp-to-edge"},data:t,width:t.length/4,height:1})}var ke=`#version 300 es
#define SHADER_NAME screen-grid-layer-vertex-shader
#define RANGE_COUNT 6
in vec2 positions;
in vec2 instancePositions;
in float instanceWeights;
in vec3 instancePickingColors;
uniform sampler2D colorRange;
out vec4 vColor;
vec4 interp(float value, vec2 domain, sampler2D range) {
float r = (value - domain.x) / (domain.y - domain.x);
return texture(range, vec2(r, 0.5));
}
void main(void) {
if (isnan(instanceWeights)) {
gl_Position = vec4(0.);
return;
}
vec2 pos = instancePositions * screenGrid.gridSizeClipspace + positions * screenGrid.cellSizeClipspace;
pos.x = pos.x - 1.0;
pos.y = 1.0 - pos.y;
gl_Position = vec4(pos, 0., 1.);
vColor = interp(instanceWeights, screenGrid.colorDomain, colorRange);
vColor.a *= layer.opacity;
picking_setPickingColor(instancePickingColors);
}
`;var Xe=`#version 300 es
#define SHADER_NAME screen-grid-layer-fragment-shader
precision highp float;
in vec4 vColor;
out vec4 fragColor;
void main(void) {
fragColor = vColor;
DECKGL_FILTER_COLOR(fragColor, geometry);
}
`;var bo=`uniform screenGridUniforms {
  vec2 cellSizeClipspace;
  vec2 gridSizeClipspace;
  vec2 colorDomain;
} screenGrid;
`,Ye={name:"screenGrid",vs:bo,uniformTypes:{cellSizeClipspace:"vec2<f32>",gridSizeClipspace:"vec2<f32>",colorDomain:"vec2<f32>"}};var yo=(()=>{class s extends ie{getShaders(){return super.getShaders({vs:ke,fs:Xe,modules:[we,Ye]})}initializeState(){this.getAttributeManager().addInstanced({instancePositions:{size:2,type:"float32",accessor:"getBin"},instanceWeights:{size:1,type:"float32",accessor:"getWeight"}}),this.state.model=this._getModel()}updateState(e){super.updateState(e);let{props:t,oldProps:o,changeFlags:n}=e,r=this.state.model;if(o.colorRange!==t.colorRange){this.state.colorTexture?.destroy(),this.state.colorTexture=U(this.context.device,t.colorRange,t.colorScaleType);let a={colorRange:this.state.colorTexture};r.shaderInputs.setProps({screenGrid:a})}else o.colorScaleType!==t.colorScaleType&&V(this.state.colorTexture,t.colorScaleType);if(o.cellMarginPixels!==t.cellMarginPixels||o.cellSizePixels!==t.cellSizePixels||n.viewportChanged){let{width:a,height:c}=this.context.viewport,{cellSizePixels:u,cellMarginPixels:g}=this.props,p=Math.max(u-g,0),h={gridSizeClipspace:[u/a*2,u/c*2],cellSizeClipspace:[p/a*2,p/c*2]};r.shaderInputs.setProps({screenGrid:h})}}finalizeState(e){super.finalizeState(e),this.state.colorTexture?.destroy()}draw({uniforms:e}){let t=this.props.colorDomain(),o=this.state.model,n={colorDomain:t};o.shaderInputs.setProps({screenGrid:n}),o.draw(this.context.renderPass)}_getModel(){return new B(this.context.device,y(x({},this.getShaders()),{id:this.props.id,bufferLayout:this.getAttributeManager().getBufferLayouts(),geometry:new Me({topology:"triangle-strip",attributes:{positions:{value:new Float32Array([0,0,1,0,0,1,1,1]),size:2}}}),isInstanced:!0}))}}return s.layerName="ScreenGridCellLayer",s})(),qe=yo;var Co=`uniform binOptionsUniforms {
  float cellSizePixels;
} binOptions;
`,$e={name:"binOptions",vs:Co,uniformTypes:{cellSizePixels:"f32"}};var So={cellSizePixels:{type:"number",value:100,min:1},cellMarginPixels:{type:"number",value:2,min:0},colorRange:F,colorScaleType:"linear",getPosition:{type:"accessor",value:s=>s.position},getWeight:{type:"accessor",value:1},gpuAggregation:!0,aggregation:"SUM"},Ao=(()=>{class s extends _{getAggregatorType(){return this.props.gpuAggregation&&C.isSupported(this.context.device)?"gpu":"cpu"}createAggregator(e){return e==="cpu"||!C.isSupported(this.context.device)?new L({dimensions:2,getBin:{sources:["positions"],getValue:({positions:t},o,n)=>{let r=this.context.viewport,a=r.project(t),c=n.cellSizePixels;return a[0]<0||a[0]>=r.width||a[1]<0||a[1]>=r.height?null:[Math.floor(a[0]/c),Math.floor(a[1]/c)]}},getValue:[{sources:["counts"],getValue:({counts:t})=>t}]}):new C(this.context.device,x({dimensions:2,channelCount:1,bufferLayout:this.getAttributeManager().getBufferLayouts({isInstanced:!1})},super.getShaders({modules:[E,$e],vs:`
  in vec3 positions;
  in vec3 positions64Low;
  in float counts;
  
  void getBin(out ivec2 binId) {
    vec4 pos = project_position_to_clipspace(positions, positions64Low, vec3(0.0));
    vec2 screenCoords = vec2(pos.x / pos.w + 1.0, 1.0 - pos.y / pos.w) / 2.0 * project.viewportSize / project.devicePixelRatio;
    vec2 gridCoords = floor(screenCoords / binOptions.cellSizePixels);
    binId = ivec2(gridCoords);
  }
  void getValue(out float weight) {
    weight = counts;
  }
  `})))}initializeState(){super.initializeState(),this.getAttributeManager().add({positions:{size:3,accessor:"getPosition",type:"float64",fp64:this.use64bitPositions()},counts:{size:1,accessor:"getWeight"}})}shouldUpdateState({changeFlags:e}){return e.somethingChanged}updateState(e){let t=super.updateState(e),{props:o,oldProps:n,changeFlags:r}=e,{cellSizePixels:a,aggregation:c}=o;if(t||r.dataChanged||r.updateTriggersChanged||r.viewportChanged||c!==n.aggregation||a!==n.cellSizePixels){let{width:u,height:g}=this.context.viewport,{aggregator:p}=this.state;p instanceof C&&p.setProps({binIdRange:[[0,Math.ceil(u/a)],[0,Math.ceil(g/a)]]}),p.setProps({pointCount:this.getNumInstances(),operations:[c],binOptions:{cellSizePixels:a}})}return r.viewportChanged&&this.state.aggregator.setNeedsUpdate(),t}onAttributeChange(e){let{aggregator:t}=this.state;switch(e){case"positions":t.setNeedsUpdate();break;case"counts":t.setNeedsUpdate(0);break;default:}}renderLayers(){let{aggregator:e}=this.state,t=this.getSubLayerClass("cells",qe),o=e.getBins(),n=e.getResult(0);return new t(this.props,this.getSubLayerProps({id:"cell-layer"}),{data:{length:e.binCount,attributes:{getBin:o,getWeight:n}},dataComparator:(r,a)=>r.length===a.length,updateTriggers:{getBin:[o],getWeight:[n]},parameters:x({depthWriteEnabled:!1},this.props.parameters),colorDomain:()=>this.props.colorDomain||e.getResultDomain(0),extensions:[]})}getPickingInfo(e){let t=e.info,{index:o}=t;if(o>=0){let n=this.state.aggregator.getBin(o),r;n&&(r={col:n.id[0],row:n.id[1],value:n.value[0],count:n.count},n.pointIndices&&(r.pointIndices=n.pointIndices,r.points=Array.isArray(this.props.data)?n.pointIndices.map(a=>this.props.data[a]):[])),t.object=r}return t}}return s.layerName="ScreenGridLayer",s.defaultProps=So,s})(),To=Ao;var R=class{constructor(i,e){this.props={scaleType:"linear",lowerPercentile:0,upperPercentile:100},this.domain=null,this.cutoff=null,this.input=i,this.inputLength=e,this.attribute=i}getScalePercentile(){if(!this._percentile){let i=Ke(this.input,this.inputLength);this._percentile=Po(i)}return this._percentile}getScaleOrdinal(){if(!this._ordinal){let i=Ke(this.input,this.inputLength);this._ordinal=Lo(i)}return this._ordinal}getCutoff({scaleType:i,lowerPercentile:e,upperPercentile:t}){if(i==="quantile")return[e,t-1];if(e>0||t<100){let{domain:o}=this.getScalePercentile(),n=o[Math.floor(e)-1]??-1/0,r=o[Math.floor(t)-1]??1/0;if(i==="ordinal"){let{domain:a}=this.getScaleOrdinal();n=a.findIndex(c=>c>=n),r=a.findIndex(c=>c>r)-1,r===-2&&(r=a.length-1)}return[n,r]}return null}update(i){let e=this.props;if(i.scaleType!==e.scaleType)switch(i.scaleType){case"quantile":{let{attribute:t}=this.getScalePercentile();this.attribute=t,this.domain=[0,99];break}case"ordinal":{let{attribute:t,domain:o}=this.getScaleOrdinal();this.attribute=t,this.domain=[0,o.length-1];break}default:this.attribute=this.input,this.domain=null}return(i.scaleType!==e.scaleType||i.lowerPercentile!==e.lowerPercentile||i.upperPercentile!==e.upperPercentile)&&(this.cutoff=this.getCutoff(i)),this.props=i,this}};function Lo(s){let i=new Set;for(let o of s)Number.isFinite(o)&&i.add(o);let e=Array.from(i).sort(),t=new Map;for(let o=0;o<e.length;o++)t.set(e[o],o);return{attribute:{value:s.map(o=>Number.isFinite(o)?t.get(o):NaN),type:"float32",size:1},domain:e}}function Po(s,i=100){let e=Array.from(s).filter(Number.isFinite).sort(Eo),t=0,o=Math.max(1,i),n=new Array(o-1);for(;++t<o;)n[t-1]=No(e,t/o);return{attribute:{value:s.map(r=>Number.isFinite(r)?wo(n,r):NaN),type:"float32",size:1},domain:n}}function Ke(s,i){let e=(s.stride??4)/4,t=(s.offset??0)/4,o=s.value;if(!o){let r=s.buffer?.readSyncWebGL(0,e*4*i);r&&(o=new Float32Array(r.buffer),s.value=o)}if(e===1)return o.subarray(0,i);let n=new Float32Array(i);for(let r=0;r<i;r++)n[r]=o[r*e+t];return n}function Eo(s,i){return s-i}function No(s,i){let e=s.length;if(i<=0||e<2)return s[0];if(i>=1)return s[e-1];let t=(e-1)*i,o=Math.floor(t),n=s[o],r=s[o+1];return n+(r-n)*(t-o)}function wo(s,i){let e=0,t=s.length;for(;e<t;){let o=e+t>>>1;s[o]>i?t=o:e=o+1}return e}function H({dataBounds:s,getBinId:i,padding:e=0}){let t=[s[0],s[1],[s[0][0],s[1][1]],[s[1][0],s[0][1]]].map(c=>i(c)),o=Math.min(...t.map(c=>c[0]))-e,n=Math.min(...t.map(c=>c[1]))-e,r=Math.max(...t.map(c=>c[0]))+e+1,a=Math.max(...t.map(c=>c[1]))+e+1;return[[o,r],[n,a]]}var Ze=Math.PI/3,ue=2*Math.sin(Ze),ge=1.5,Qe=Array.from({length:6},(s,i)=>{let e=i*Ze;return[Math.sin(e),-Math.cos(e)]});function de([s,i],e){let t=Math.round(i=i/e/ge),o=Math.round(s=s/e/ue-(t&1)/2),n=i-t;if(Math.abs(n)*3>1){let r=s-o,a=o+(s<o?-1:1)/2,c=t+(i<t?-1:1),u=s-a,g=i-c;r*r+n*n>u*u+g*g&&(o=a+(t&1?1:-1)/2,t=c)}return[o,t]}var Je=`
const vec2 DIST = vec2(${ue}, ${ge});

ivec2 pointToHexbin(vec2 p, float radius) {
  p /= radius * DIST;
  float pj = round(p.y);
  float pjm2 = mod(pj, 2.0);
  p.x -= pjm2 * 0.5;
  float pi = round(p.x);
  vec2 d1 = p - vec2(pi, pj);

  if (abs(d1.y) * 3. > 1.) {
    vec2 v2 = step(0.0, d1) - 0.5;
    v2.y *= 2.0;
    vec2 d2 = d1 - v2;
    if (dot(d1, d1) > dot(d2, d2)) {
      pi += v2.x + pjm2 - 0.5;
      pj += v2.y;
    }
  }
  return ivec2(pi, pj);
}
`;function Le([s,i],e){return[(s+(i&1)/2)*e*ue,i*e*ge]}var et=`
const vec2 DIST = vec2(${ue}, ${ge});

vec2 hexbinCentroid(vec2 binId, float radius) {
  binId.x += fract(binId.y * 0.5);
  return binId * DIST * radius;
}
`;var tt=`#version 300 es
#define SHADER_NAME hexagon-cell-layer-vertex-shader
in vec3 positions;
in vec3 normals;
in vec2 instancePositions;
in float instanceElevationValues;
in float instanceColorValues;
in vec3 instancePickingColors;
uniform sampler2D colorRange;
out vec4 vColor;
${et}
float interp(float value, vec2 domain, vec2 range) {
float r = min(max((value - domain.x) / (domain.y - domain.x), 0.), 1.);
return mix(range.x, range.y, r);
}
vec4 interp(float value, vec2 domain, sampler2D range) {
float r = (value - domain.x) / (domain.y - domain.x);
return texture(range, vec2(r, 0.5));
}
void main(void) {
geometry.pickingColor = instancePickingColors;
if (isnan(instanceColorValues) ||
instanceColorValues < hexagon.colorDomain.z ||
instanceColorValues > hexagon.colorDomain.w ||
instanceElevationValues < hexagon.elevationDomain.z ||
instanceElevationValues > hexagon.elevationDomain.w
) {
gl_Position = vec4(0.);
return;
}
vec2 commonPosition = hexbinCentroid(instancePositions, column.radius) + (hexagon.originCommon - project.commonOrigin.xy);
commonPosition += positions.xy * column.radius * column.coverage;
geometry.position = vec4(commonPosition, 0.0, 1.0);
geometry.normal = project_normal(normals);
float elevation = 0.0;
if (column.extruded) {
elevation = interp(instanceElevationValues, hexagon.elevationDomain.xy, hexagon.elevationRange);
elevation = project_size(elevation);
geometry.position.z = (positions.z + 1.0) / 2.0 * elevation;
}
gl_Position = project_common_position_to_clipspace(geometry.position);
DECKGL_FILTER_GL_POSITION(gl_Position, geometry);
vColor = interp(instanceColorValues, hexagon.colorDomain.xy, colorRange);
vColor.a *= layer.opacity;
if (column.extruded) {
vColor.rgb = lighting_getLightColor(vColor.rgb, project.cameraPosition, geometry.position.xyz, geometry.normal);
}
DECKGL_FILTER_COLOR(vColor, geometry);
}
`;var _o=`uniform hexagonUniforms {
  vec4 colorDomain;
  vec4 elevationDomain;
  vec2 elevationRange;
  vec2 originCommon;
} hexagon;
`,ot={name:"hexagon",vs:_o,uniformTypes:{colorDomain:"vec4<f32>",elevationDomain:"vec4<f32>",elevationRange:"vec2<f32>",originCommon:"vec2<f32>"}};var Mo=(()=>{class s extends re{getShaders(){let e=super.getShaders();return e.modules.push(ot),y(x({},e),{vs:tt})}initializeState(){super.initializeState();let e=this.getAttributeManager();e.remove(["instanceElevations","instanceFillColors","instanceLineColors","instanceStrokeWidths"]),e.addInstanced({instancePositions:{size:2,type:"float32",accessor:"getBin"},instanceColorValues:{size:1,type:"float32",accessor:"getColorValue"},instanceElevationValues:{size:1,type:"float32",accessor:"getElevationValue"}})}updateState(e){super.updateState(e);let{props:t,oldProps:o}=e,n=this.state.fillModel;if(o.colorRange!==t.colorRange){this.state.colorTexture?.destroy(),this.state.colorTexture=U(this.context.device,t.colorRange,t.colorScaleType);let r={colorRange:this.state.colorTexture};n.shaderInputs.setProps({hexagon:r})}else o.colorScaleType!==t.colorScaleType&&V(this.state.colorTexture,t.colorScaleType)}finalizeState(e){super.finalizeState(e),this.state.colorTexture?.destroy()}draw({uniforms:e}){let{radius:t,hexOriginCommon:o,elevationRange:n,elevationScale:r,extruded:a,coverage:c,colorDomain:u,elevationDomain:g}=this.props,p=this.props.colorCutoff||[-1/0,1/0],h=this.props.elevationCutoff||[-1/0,1/0],f=this.state.fillModel;f.vertexArray.indexBuffer&&f.setIndexBuffer(null),f.setVertexCount(this.state.fillVertexCount);let v={colorDomain:[Math.max(u[0],p[0]),Math.min(u[1],p[1]),Math.max(u[0]-1,p[0]),Math.min(u[1]+1,p[1])],elevationDomain:[Math.max(g[0],h[0]),Math.min(g[1],h[1]),Math.max(g[0]-1,h[0]),Math.min(g[1]+1,h[1])],elevationRange:[n[0]*r,n[1]*r],originCommon:o};f.shaderInputs.setProps({column:{extruded:a,coverage:c,radius:t},hexagon:v}),f.draw(this.context.renderPass)}}return s.layerName="HexagonCellLayer",s})(),it=Mo;var Io=`uniform binOptionsUniforms {
  vec2 hexOriginCommon;
  float radiusCommon;
} binOptions;
`,nt={name:"binOptions",vs:Io,uniformTypes:{hexOriginCommon:"vec2<f32>",radiusCommon:"f32"}};function rt(){}var Oo={gpuAggregation:!0,colorDomain:null,colorRange:F,getColorValue:{type:"accessor",value:null},getColorWeight:{type:"accessor",value:1},colorAggregation:"SUM",lowerPercentile:{type:"number",min:0,max:100,value:0},upperPercentile:{type:"number",min:0,max:100,value:100},colorScaleType:"quantize",onSetColorDomain:rt,elevationDomain:null,elevationRange:[0,1e3],getElevationValue:{type:"accessor",value:null},getElevationWeight:{type:"accessor",value:1},elevationAggregation:"SUM",elevationScale:{type:"number",min:0,value:1},elevationLowerPercentile:{type:"number",min:0,max:100,value:0},elevationUpperPercentile:{type:"number",min:0,max:100,value:100},elevationScaleType:"linear",onSetElevationDomain:rt,radius:{type:"number",min:1,value:1e3},coverage:{type:"number",min:0,max:1,value:1},getPosition:{type:"accessor",value:s=>s.position},hexagonAggregator:{type:"function",optional:!0,value:null},extruded:!1,material:!0},Fo=(()=>{class s extends _{getAggregatorType(){let{gpuAggregation:e,hexagonAggregator:t,getColorValue:o,getElevationValue:n}=this.props;return e&&(t||o||n)?(M.warn("Features not supported by GPU aggregation, falling back to CPU")(),"cpu"):e&&C.isSupported(this.context.device)?"gpu":"cpu"}createAggregator(e){if(e==="cpu"){let{hexagonAggregator:t,radius:o}=this.props;return new L({dimensions:2,getBin:{sources:["positions"],getValue:({positions:n},r,a)=>{if(t)return t(n,o);let u=this.state.aggregatorViewport.projectPosition(n),{radiusCommon:g,hexOriginCommon:p}=a;return de([u[0]-p[0],u[1]-p[1]],g)}},getValue:[{sources:["colorWeights"],getValue:({colorWeights:n})=>n},{sources:["elevationWeights"],getValue:({elevationWeights:n})=>n}]})}return new C(this.context.device,x({dimensions:2,channelCount:2,bufferLayout:this.getAttributeManager().getBufferLayouts({isInstanced:!1})},super.getShaders({modules:[E,nt],vs:`
  in vec3 positions;
  in vec3 positions64Low;
  in float colorWeights;
  in float elevationWeights;
  
  ${Je}

  void getBin(out ivec2 binId) {
    vec3 positionCommon = project_position(positions, positions64Low);
    binId = pointToHexbin(positionCommon.xy, binOptions.radiusCommon);
  }
  void getValue(out vec2 value) {
    value = vec2(colorWeights, elevationWeights);
  }
  `})))}initializeState(){super.initializeState(),this.getAttributeManager().add({positions:{size:3,accessor:"getPosition",type:"float64",fp64:this.use64bitPositions()},colorWeights:{size:1,accessor:"getColorWeight"},elevationWeights:{size:1,accessor:"getElevationWeight"}})}updateState(e){let t=super.updateState(e),{props:o,oldProps:n,changeFlags:r}=e,{aggregator:a}=this.state;if((r.dataChanged||!this.state.dataAsArray)&&(o.getColorValue||o.getElevationValue)&&(this.state.dataAsArray=Array.from(oe(o.data).iterable)),t||r.dataChanged||o.radius!==n.radius||o.getColorValue!==n.getColorValue||o.getElevationValue!==n.getElevationValue||o.colorAggregation!==n.colorAggregation||o.elevationAggregation!==n.elevationAggregation){this._updateBinOptions();let{radiusCommon:c,hexOriginCommon:u,binIdRange:g,dataAsArray:p}=this.state;if(a.setProps({binIdRange:g,pointCount:this.getNumInstances(),operations:[o.colorAggregation,o.elevationAggregation],binOptions:{radiusCommon:c,hexOriginCommon:u},onUpdate:this._onAggregationUpdate.bind(this)}),p){let{getColorValue:h,getElevationValue:f}=this.props;a.setProps({customOperations:[h&&(v=>h(v.map(b=>p[b]),{indices:v,data:o.data})),f&&(v=>f(v.map(b=>p[b]),{indices:v,data:o.data}))]})}}return r.updateTriggersChanged&&r.updateTriggersChanged.getColorValue&&a.setNeedsUpdate(0),r.updateTriggersChanged&&r.updateTriggersChanged.getElevationValue&&a.setNeedsUpdate(1),t}_updateBinOptions(){let e=this.getBounds(),t=1,o=[0,0],n=[[0,1],[0,1]],r=this.context.viewport;if(e&&Number.isFinite(e[0][0])){let a=[(e[0][0]+e[1][0])/2,(e[0][1]+e[1][1])/2],{radius:c}=this.props,{unitsPerMeter:u}=r.getDistanceScales(a);t=u[0]*c;let g=de(r.projectFlat(a),t);a=r.unprojectFlat(Le(g,t));let p=r.constructor;r=r.isGeospatial?new p({longitude:a[0],latitude:a[1],zoom:12}):new W({position:[a[0],a[1],0],zoom:12}),o=[Math.fround(r.center[0]),Math.fround(r.center[1])],n=H({dataBounds:e,getBinId:h=>{let f=r.projectFlat(h);return f[0]-=o[0],f[1]-=o[1],de(f,t)},padding:1})}this.setState({radiusCommon:t,hexOriginCommon:o,binIdRange:n,aggregatorViewport:r})}draw(e){e.shaderModuleProps.project&&(e.shaderModuleProps.project.viewport=this.state.aggregatorViewport),super.draw(e)}_onAggregationUpdate({channel:e}){let t=this.getCurrentLayer().props,{aggregator:o}=this.state;if(e===0){let n=o.getResult(0);this.setState({colors:new R(n,o.binCount)}),t.onSetColorDomain(o.getResultDomain(0))}else if(e===1){let n=o.getResult(1);this.setState({elevations:new R(n,o.binCount)}),t.onSetElevationDomain(o.getResultDomain(1))}}onAttributeChange(e){let{aggregator:t}=this.state;switch(e){case"positions":t.setNeedsUpdate(),this._updateBinOptions();let{radiusCommon:o,hexOriginCommon:n,binIdRange:r}=this.state;t.setProps({binIdRange:r,binOptions:{radiusCommon:o,hexOriginCommon:n}});break;case"colorWeights":t.setNeedsUpdate(0);break;case"elevationWeights":t.setNeedsUpdate(1);break;default:}}renderLayers(){let{aggregator:e,radiusCommon:t,hexOriginCommon:o}=this.state,{elevationScale:n,colorRange:r,elevationRange:a,extruded:c,coverage:u,material:g,transitions:p,colorScaleType:h,lowerPercentile:f,upperPercentile:v,colorDomain:b,elevationScaleType:S,elevationLowerPercentile:T,elevationUpperPercentile:w,elevationDomain:A}=this.props,J=this.getSubLayerClass("cells",it),D=e.getBins(),P=this.state.colors?.update({scaleType:h,lowerPercentile:f,upperPercentile:v}),N=this.state.elevations?.update({scaleType:S,lowerPercentile:T,upperPercentile:w});return!P||!N?null:new J(this.getSubLayerProps({id:"cells"}),{data:{length:e.binCount,attributes:{getBin:D,getColorValue:P.attribute,getElevationValue:N.attribute}},dataComparator:(be,ye)=>be.length===ye.length,updateTriggers:{getBin:[D],getColorValue:[P.attribute],getElevationValue:[N.attribute]},diskResolution:6,vertices:Qe,radius:t,hexOriginCommon:o,elevationScale:n,colorRange:r,colorScaleType:h,elevationRange:a,extruded:c,coverage:u,material:g,colorDomain:P.domain||b||e.getResultDomain(0),elevationDomain:N.domain||A||e.getResultDomain(1),colorCutoff:P.cutoff,elevationCutoff:N.cutoff,transitions:p&&{getFillColor:p.getColorValue||p.getColorWeight,getElevation:p.getElevationValue||p.getElevationWeight},extensions:[]})}getPickingInfo(e){let t=e.info,{index:o}=t;if(o>=0){let n=this.state.aggregator.getBin(o),r;if(n){let a=Le(n.id,this.state.radiusCommon),c=this.context.viewport.unprojectFlat(a);r={col:n.id[0],row:n.id[1],position:c,colorValue:n.value[0],elevationValue:n.value[1],count:n.count},n.pointIndices&&(r.pointIndices=n.pointIndices,r.points=Array.isArray(this.props.data)?n.pointIndices.map(u=>this.props.data[u]):[])}t.object=r}return t}}return s.layerName="HexagonLayer",s.defaultProps=Oo,s})(),Ro=Fo;var m=.16666666666666666,l={N:[0,.5],E:[.5,0],S:[0,-.5],W:[-.5,0],NE:[.5,.5],NW:[-.5,.5],SE:[.5,-.5],SW:[-.5,-.5]},G=[l.W,l.SW,l.S],j=[l.S,l.SE,l.E],k=[l.E,l.NE,l.N],X=[l.NW,l.W,l.N],Y=[[-.5,m],[-.5,-m],[-m,-.5],[m,-.5]],q=[[-m,-.5],[m,-.5],[.5,-m],[.5,m]],$=[[.5,-m],[.5,m],[m,.5],[-m,.5]],K=[[-.5,m],[-.5,-m],[m,.5],[-m,.5]],st=[l.W,l.SW,l.SE,l.E],at=[l.S,l.SE,l.NE,l.N],lt=[l.NW,l.W,l.E,l.NE],ct=[l.NW,l.SW,l.S,l.N],ut=[[-.5,m],[-.5,-m],[.5,-m],[.5,m]],gt=[[-m,-.5],[m,-.5],[m,.5],[-m,.5]],Do=[l.NW,l.SW,l.SE,l.NE],dt=[l.NW,l.SW,l.SE,l.E,l.N],pt=[l.W,l.SW,l.SE,l.NE,l.N],mt=[l.NW,l.W,l.S,l.SE,l.NE],ft=[l.NW,l.SW,l.S,l.E,l.NE],ht=[l.NW,l.W,[.5,-m],[.5,m],l.N],vt=[[-m,-.5],[m,-.5],l.E,l.NE,l.N],xt=[[-.5,m],[-.5,-m],l.S,l.SE,l.E],bt=[l.W,l.SW,l.S,[m,.5],[-m,.5]],yt=[l.NW,l.W,[-m,-.5],[m,-.5],l.N],Ct=[[-.5,m],[-.5,-m],l.E,l.NE,l.N],St=[l.S,l.SE,l.E,[m,.5],[-m,.5]],At=[l.W,l.SW,l.S,[.5,-m],[.5,m]],Tt=[l.W,l.SW,l.SE,l.E,[m,.5],[-m,.5]],Lt=[[-.5,m],[-.5,-m],l.S,l.SE,l.NE,l.N],Pt=[l.NW,l.W,[-m,-.5],[m,-.5],l.E,l.NE],Et=[l.NW,l.SW,l.S,[.5,-m],[.5,m],l.N],Z=[l.W,l.SW,l.S,l.E,l.NE,l.N],Q=[l.NW,l.W,l.S,l.SE,l.E,l.N],pe=[[-.5,m],[-.5,-m],[-m,-.5],[m,-.5],l.E,l.NE,l.N],me=[l.W,l.SW,l.S,[.5,-m],[.5,m],[m,.5],[-m,.5]],fe=[l.NW,l.W,[-m,-.5],[m,-.5],[.5,-m],[.5,m],l.N],he=[[-.5,m],[-.5,-m],l.S,l.SE,l.E,[m,.5],[-m,.5]],Nt=[[-.5,m],[-.5,-m],[-m,-.5],[m,-.5],[.5,-m],[.5,m],[m,.5],[-m,.5]],wt={0:[],1:[[l.W,l.S]],2:[[l.S,l.E]],3:[[l.W,l.E]],4:[[l.N,l.E]],5:{0:[[l.W,l.S],[l.N,l.E]],1:[[l.W,l.N],[l.S,l.E]]},6:[[l.N,l.S]],7:[[l.W,l.N]],8:[[l.W,l.N]],9:[[l.N,l.S]],10:{0:[[l.W,l.N],[l.S,l.E]],1:[[l.W,l.S],[l.N,l.E]]},11:[[l.N,l.E]],12:[[l.W,l.E]],13:[[l.S,l.E]],14:[[l.W,l.S]],15:[]};function d(s){return parseInt(s,4)}var _t={[d("0000")]:[],[d("2222")]:[],[d("2221")]:[G],[d("2212")]:[j],[d("2122")]:[k],[d("1222")]:[X],[d("0001")]:[G],[d("0010")]:[j],[d("0100")]:[k],[d("1000")]:[X],[d("2220")]:[Y],[d("2202")]:[q],[d("2022")]:[$],[d("0222")]:[K],[d("0002")]:[Y],[d("0020")]:[q],[d("0200")]:[$],[d("2000")]:[K],[d("0011")]:[st],[d("0110")]:[at],[d("1100")]:[lt],[d("1001")]:[ct],[d("2211")]:[st],[d("2112")]:[at],[d("1122")]:[lt],[d("1221")]:[ct],[d("2200")]:[ut],[d("2002")]:[gt],[d("0022")]:[ut],[d("0220")]:[gt],[d("1111")]:[Do],[d("1211")]:[dt],[d("2111")]:[pt],[d("1112")]:[mt],[d("1121")]:[ft],[d("1011")]:[dt],[d("0111")]:[pt],[d("1110")]:[mt],[d("1101")]:[ft],[d("1200")]:[ht],[d("0120")]:[vt],[d("0012")]:[xt],[d("2001")]:[bt],[d("1022")]:[ht],[d("2102")]:[vt],[d("2210")]:[xt],[d("0221")]:[bt],[d("1002")]:[yt],[d("2100")]:[Ct],[d("0210")]:[St],[d("0021")]:[At],[d("1220")]:[yt],[d("0122")]:[Ct],[d("2012")]:[St],[d("2201")]:[At],[d("0211")]:[Tt],[d("2110")]:[Lt],[d("1102")]:[Pt],[d("1021")]:[Et],[d("2011")]:[Tt],[d("0112")]:[Lt],[d("1120")]:[Pt],[d("1201")]:[Et],[d("2101")]:[Z],[d("0121")]:[Z],[d("1012")]:[Q],[d("1210")]:[Q],[d("0101")]:{0:[G,k],1:[Z],2:[Z]},[d("1010")]:{0:[X,j],1:[Q],2:[Q]},[d("2121")]:{0:[Z],1:[Z],2:[G,k]},[d("1212")]:{0:[Q],1:[Q],2:[X,j]},[d("2120")]:{0:[pe],1:[pe],2:[Y,k]},[d("2021")]:{0:[me],1:[me],2:[G,$]},[d("1202")]:{0:[fe],1:[fe],2:[X,q]},[d("0212")]:{0:[he],1:[he],2:[j,K]},[d("0102")]:{0:[Y,k],1:[pe],2:[pe]},[d("0201")]:{0:[G,$],1:[me],2:[me]},[d("1020")]:{0:[X,q],1:[fe],2:[fe]},[d("2010")]:{0:[j,K],1:[he],2:[he]},[d("2020")]:{0:[K,q],1:[Nt],2:[Y,$]},[d("0202")]:{0:[$,Y],1:[Nt],2:[K,q]}};function te(s,i){return Number.isNaN(s)?0:Array.isArray(i)?s<i[0]?0:s<i[1]?1:2:s>=i?1:0}function Mt(s){let{x:i,y:e,xRange:t,yRange:o,getValue:n,threshold:r}=s,a=i<t[0],c=i>=t[1]-1,u=e<o[0],g=e>=o[1]-1,p=a||c||u||g,h=0,f,v,b,S;if(a||g)b=0;else{let A=n(i,e+1);b=te(A,r),h+=A}if(c||g)S=0;else{let A=n(i+1,e+1);S=te(A,r),h+=A}if(c||u)v=0;else{let A=n(i+1,e);v=te(A,r),h+=A}if(a||u)f=0;else{let A=n(i,e);f=te(A,r),h+=A}let T=-1;Number.isFinite(r)&&(T=b<<3|S<<2|v<<1|f),Array.isArray(r)&&(T=b<<6|S<<4|v<<2|f);let w=0;return p||(w=te(h/4,r)),{code:T,meanCode:w}}function It(s){let{x:i,y:e,z:t,code:o,meanCode:n}=s,r=_t[o];Array.isArray(r)||(r=r[n]);let a=i+1,c=e+1,u=[];return r.forEach(g=>{let p=[];g.forEach(h=>{let f=a+h[0],v=c+h[1];p.push([f,v,t])}),u.push(p)}),u}function Ot(s){let{x:i,y:e,z:t,code:o,meanCode:n}=s,r=wt[o];Array.isArray(r)||(r=r[n]);let a=i+1,c=e+1,u=[];return r.forEach(g=>{g.forEach(p=>{let h=a+p[0],f=c+p[1];u.push([h,f,t])})}),u}function Ft({contours:s,getValue:i,xRange:e,yRange:t}){let o=[],n=[],r=0,a=0;for(let c=0;c<s.length;c++){let u=s[c],g=u.zIndex??c,{threshold:p}=u;for(let h=e[0]-1;h<e[1];h++)for(let f=t[0]-1;f<t[1];f++){let{code:v,meanCode:b}=Mt({getValue:i,threshold:p,x:h,y:f,xRange:e,yRange:t}),S={x:h,y:f,z:g,code:v,meanCode:b};if(Array.isArray(p)){let T=It(S);for(let w of T)n[a++]={vertices:w,contour:u}}else{let T=Ot(S);T.length>0&&(o[r++]={vertices:T,contour:u})}}}return{lines:o,polygons:n}}function Rt(s){let{aggregator:i,binIdRange:e,channel:t}=s;if(i instanceof C){let o=i.getResult(t)?.buffer;if(o){let n=new Float32Array(o.readSyncWebGL().buffer);return Wo(n,e)}}if(i instanceof L){let o=i.getResult(t)?.value,n=i.getBins()?.value;if(n&&o)return Bo(o,n,i.binCount)}return null}function Wo(s,i){let[[e,t],[o,n]]=i,r=t-e,a=n-o;return(c,u)=>(c-=e,u-=o,c<0||c>=r||u<0||u>=a?NaN:s[u*r+c])}function Bo(s,i,e){let t={};for(let o=0;o<e;o++){let n=i[o*2],r=i[o*2+1];t[n]=t[n]||{},t[n][r]=s[o]}return(o,n)=>t[o]?.[n]??NaN}var zo=`uniform binOptionsUniforms {
  vec2 cellOriginCommon;
  vec2 cellSizeCommon;
} binOptions;
`,Dt={name:"binOptions",vs:zo,uniformTypes:{cellOriginCommon:"vec2<f32>",cellSizeCommon:"vec2<f32>"}};var Wt=[255,255,255,255],Vo=1,Uo={cellSize:{type:"number",min:1,value:1e3},gridOrigin:{type:"array",compare:!0,value:[0,0]},getPosition:{type:"accessor",value:s=>s.position},getWeight:{type:"accessor",value:1},gpuAggregation:!0,aggregation:"SUM",contours:{type:"object",value:[{threshold:1}],optional:!0,compare:3},zOffset:.005},Ho=(()=>{class s extends _{getAggregatorType(){return this.props.gpuAggregation&&C.isSupported(this.context.device)?"gpu":"cpu"}createAggregator(e){return e==="cpu"?new L({dimensions:2,getBin:{sources:["positions"],getValue:({positions:t},o,n)=>{let a=this.state.aggregatorViewport.projectPosition(t),{cellSizeCommon:c,cellOriginCommon:u}=n;return[Math.floor((a[0]-u[0])/c[0]),Math.floor((a[1]-u[1])/c[1])]}},getValue:[{sources:["counts"],getValue:({counts:t})=>t}],onUpdate:this._onAggregationUpdate.bind(this)}):new C(this.context.device,y(x({dimensions:2,channelCount:1,bufferLayout:this.getAttributeManager().getBufferLayouts({isInstanced:!1})},super.getShaders({modules:[E,Dt],vs:`
  in vec3 positions;
  in vec3 positions64Low;
  in float counts;

  void getBin(out ivec2 binId) {
    vec3 positionCommon = project_position(positions, positions64Low);
    vec2 gridCoords = floor(positionCommon.xy / binOptions.cellSizeCommon);
    binId = ivec2(gridCoords);
  }
  void getValue(out float value) {
    value = counts;
  }
  `})),{onUpdate:this._onAggregationUpdate.bind(this)}))}initializeState(){super.initializeState(),this.getAttributeManager().add({positions:{size:3,accessor:"getPosition",type:"float64",fp64:this.use64bitPositions()},counts:{size:1,accessor:"getWeight"}})}updateState(e){let t=super.updateState(e),{props:o,oldProps:n,changeFlags:r}=e,{aggregator:a}=this.state;if(t||r.dataChanged||o.cellSize!==n.cellSize||!O(o.gridOrigin,n.gridOrigin,1)||o.aggregation!==n.aggregation){this._updateBinOptions();let{cellSizeCommon:c,cellOriginCommon:u,binIdRange:g}=this.state;a.setProps({binIdRange:g,pointCount:this.getNumInstances(),operations:[o.aggregation],binOptions:{cellSizeCommon:c,cellOriginCommon:u}})}return O(n.contours,o.contours,2)||this.setState({contourData:null}),t}_updateBinOptions(){let e=this.getBounds(),t=[1,1],o=[0,0],n=[[0,1],[0,1]],r=this.context.viewport;if(e&&Number.isFinite(e[0][0])){let a=[(e[0][0]+e[1][0])/2,(e[0][1]+e[1][1])/2],{cellSize:c,gridOrigin:u}=this.props,{unitsPerMeter:g}=r.getDistanceScales(a);t[0]=g[0]*c,t[1]=g[1]*c;let p=r.projectFlat(a);o=[Math.floor((p[0]-u[0])/t[0])*t[0]+u[0],Math.floor((p[1]-u[1])/t[1])*t[1]+u[1]],a=r.unprojectFlat(o);let h=r.constructor;r=r.isGeospatial?new h({longitude:a[0],latitude:a[1],zoom:12}):new W({position:[a[0],a[1],0],zoom:12}),o=[Math.fround(r.center[0]),Math.fround(r.center[1])],n=H({dataBounds:e,getBinId:f=>{let v=r.projectFlat(f);return[Math.floor((v[0]-o[0])/t[0]),Math.floor((v[1]-o[1])/t[1])]}})}this.setState({cellSizeCommon:t,cellOriginCommon:o,binIdRange:n,aggregatorViewport:r})}draw(e){e.shaderModuleProps.project&&(e.shaderModuleProps.project.viewport=this.state.aggregatorViewport),super.draw(e)}_onAggregationUpdate(){let{aggregator:e,binIdRange:t}=this.state;this.setState({aggregatedValueReader:Rt({aggregator:e,binIdRange:t,channel:0}),contourData:null})}_getContours(){let{aggregatedValueReader:e}=this.state;if(!e)return null;if(!this.state.contourData){let{binIdRange:t}=this.state,{contours:o}=this.props,n=Ft({contours:o,getValue:e,xRange:t[0],yRange:t[1]});this.state.contourData=n}return this.state.contourData}onAttributeChange(e){let{aggregator:t}=this.state;switch(e){case"positions":t.setNeedsUpdate(),this._updateBinOptions();let{cellSizeCommon:o,cellOriginCommon:n,binIdRange:r}=this.state;t.setProps({binIdRange:r,binOptions:{cellSizeCommon:o,cellOriginCommon:n}});break;case"counts":t.setNeedsUpdate(0);break;default:}}renderLayers(){let e=this._getContours();if(!e)return null;let{lines:t,polygons:o}=e,{zOffset:n}=this.props,{cellOriginCommon:r,cellSizeCommon:a}=this.state,c=this.getSubLayerClass("lines",Fe),u=this.getSubLayerClass("bands",Re),g=new Ne().translate([r[0],r[1],0]).scale([a[0],a[1],n]),p=t&&t.length>0&&new c(this.getSubLayerProps({id:"lines"}),{data:t,coordinateSystem:I.CARTESIAN,modelMatrix:g,getPath:f=>f.vertices,getColor:f=>f.contour.color??Wt,getWidth:f=>f.contour.strokeWidth??Vo,widthUnits:"pixels"}),h=o&&o.length>0&&new u(this.getSubLayerProps({id:"bands"}),{data:o,coordinateSystem:I.CARTESIAN,modelMatrix:g,getPolygon:f=>f.vertices,getFillColor:f=>f.contour.color??Wt});return[p,h]}getPickingInfo(e){let t=e.info,{object:o}=t;return o&&(t.object={contour:o.contour}),t}}return s.layerName="ContourLayer",s.defaultProps=Uo,s})(),Go=Ho;var Bt=`#version 300 es
#define SHADER_NAME grid-cell-layer-vertex-shader
in vec3 positions;
in vec3 normals;
in vec2 instancePositions;
in float instanceElevationValues;
in float instanceColorValues;
in vec3 instancePickingColors;
uniform sampler2D colorRange;
out vec4 vColor;
float interp(float value, vec2 domain, vec2 range) {
float r = min(max((value - domain.x) / (domain.y - domain.x), 0.), 1.);
return mix(range.x, range.y, r);
}
vec4 interp(float value, vec2 domain, sampler2D range) {
float r = (value - domain.x) / (domain.y - domain.x);
return texture(range, vec2(r, 0.5));
}
void main(void) {
geometry.pickingColor = instancePickingColors;
if (isnan(instanceColorValues) ||
instanceColorValues < grid.colorDomain.z ||
instanceColorValues > grid.colorDomain.w ||
instanceElevationValues < grid.elevationDomain.z ||
instanceElevationValues > grid.elevationDomain.w
) {
gl_Position = vec4(0.);
return;
}
vec2 commonPosition = (instancePositions + (positions.xy + 1.0) / 2.0 * column.coverage) * grid.sizeCommon + grid.originCommon - project.commonOrigin.xy;
geometry.position = vec4(commonPosition, 0.0, 1.0);
geometry.normal = project_normal(normals);
float elevation = 0.0;
if (column.extruded) {
elevation = interp(instanceElevationValues, grid.elevationDomain.xy, grid.elevationRange);
elevation = project_size(elevation);
geometry.position.z = (positions.z + 1.0) / 2.0 * elevation;
}
gl_Position = project_common_position_to_clipspace(geometry.position);
DECKGL_FILTER_GL_POSITION(gl_Position, geometry);
vColor = interp(instanceColorValues, grid.colorDomain.xy, colorRange);
vColor.a *= layer.opacity;
if (column.extruded) {
vColor.rgb = lighting_getLightColor(vColor.rgb, project.cameraPosition, geometry.position.xyz, geometry.normal);
}
DECKGL_FILTER_COLOR(vColor, geometry);
}
`;var jo=`uniform gridUniforms {
  vec4 colorDomain;
  vec4 elevationDomain;
  vec2 elevationRange;
  vec2 originCommon;
  vec2 sizeCommon;
} grid;
`,zt={name:"grid",vs:jo,uniformTypes:{colorDomain:"vec4<f32>",elevationDomain:"vec4<f32>",elevationRange:"vec2<f32>",originCommon:"vec2<f32>",sizeCommon:"vec2<f32>"}};var Vt=(()=>{class s extends re{getShaders(){let e=super.getShaders();return e.modules.push(zt),y(x({},e),{vs:Bt})}initializeState(){super.initializeState();let e=this.getAttributeManager();e.remove(["instanceElevations","instanceFillColors","instanceLineColors","instanceStrokeWidths"]),e.addInstanced({instancePositions:{size:2,type:"float32",accessor:"getBin"},instanceColorValues:{size:1,type:"float32",accessor:"getColorValue"},instanceElevationValues:{size:1,type:"float32",accessor:"getElevationValue"}})}updateState(e){super.updateState(e);let{props:t,oldProps:o}=e,n=this.state.fillModel;if(o.colorRange!==t.colorRange){this.state.colorTexture?.destroy(),this.state.colorTexture=U(this.context.device,t.colorRange,t.colorScaleType);let r={colorRange:this.state.colorTexture};n.shaderInputs.setProps({grid:r})}else o.colorScaleType!==t.colorScaleType&&V(this.state.colorTexture,t.colorScaleType)}finalizeState(e){super.finalizeState(e),this.state.colorTexture?.destroy()}_updateGeometry(){let e=new Ie;this.state.fillModel.setGeometry(e)}draw({uniforms:e}){let{cellOriginCommon:t,cellSizeCommon:o,elevationRange:n,elevationScale:r,extruded:a,coverage:c,colorDomain:u,elevationDomain:g}=this.props,p=this.props.colorCutoff||[-1/0,1/0],h=this.props.elevationCutoff||[-1/0,1/0],f=this.state.fillModel,v={colorDomain:[Math.max(u[0],p[0]),Math.min(u[1],p[1]),Math.max(u[0]-1,p[0]),Math.min(u[1]+1,p[1])],elevationDomain:[Math.max(g[0],h[0]),Math.min(g[1],h[1]),Math.max(g[0]-1,h[0]),Math.min(g[1]+1,h[1])],elevationRange:[n[0]*r,n[1]*r],originCommon:t,sizeCommon:o};f.shaderInputs.setProps({column:{extruded:a,coverage:c},grid:v}),f.draw(this.context.renderPass)}}return s.layerName="GridCellLayer",s})();var ko=`uniform binOptionsUniforms {
  vec2 cellOriginCommon;
  vec2 cellSizeCommon;
} binOptions;
`,Ut={name:"binOptions",vs:ko,uniformTypes:{cellOriginCommon:"vec2<f32>",cellSizeCommon:"vec2<f32>"}};function Ht(){}var Xo={gpuAggregation:!0,colorDomain:null,colorRange:F,getColorValue:{type:"accessor",value:null},getColorWeight:{type:"accessor",value:1},colorAggregation:"SUM",lowerPercentile:{type:"number",min:0,max:100,value:0},upperPercentile:{type:"number",min:0,max:100,value:100},colorScaleType:"quantize",onSetColorDomain:Ht,elevationDomain:null,elevationRange:[0,1e3],getElevationValue:{type:"accessor",value:null},getElevationWeight:{type:"accessor",value:1},elevationAggregation:"SUM",elevationScale:{type:"number",min:0,value:1},elevationLowerPercentile:{type:"number",min:0,max:100,value:0},elevationUpperPercentile:{type:"number",min:0,max:100,value:100},elevationScaleType:"linear",onSetElevationDomain:Ht,cellSize:{type:"number",min:0,value:1e3},coverage:{type:"number",min:0,max:1,value:1},getPosition:{type:"accessor",value:s=>s.position},gridAggregator:{type:"function",optional:!0,value:null},extruded:!1,material:!0},Yo=(()=>{class s extends _{getAggregatorType(){let{gpuAggregation:e,gridAggregator:t,getColorValue:o,getElevationValue:n}=this.props;return e&&(t||o||n)?(M.warn("Features not supported by GPU aggregation, falling back to CPU")(),"cpu"):e&&C.isSupported(this.context.device)?"gpu":"cpu"}createAggregator(e){if(e==="cpu"){let{gridAggregator:t,cellSize:o}=this.props;return new L({dimensions:2,getBin:{sources:["positions"],getValue:({positions:n},r,a)=>{if(t)return t(n,o);let u=this.state.aggregatorViewport.projectPosition(n),{cellSizeCommon:g,cellOriginCommon:p}=a;return[Math.floor((u[0]-p[0])/g[0]),Math.floor((u[1]-p[1])/g[1])]}},getValue:[{sources:["colorWeights"],getValue:({colorWeights:n})=>n},{sources:["elevationWeights"],getValue:({elevationWeights:n})=>n}]})}return new C(this.context.device,x({dimensions:2,channelCount:2,bufferLayout:this.getAttributeManager().getBufferLayouts({isInstanced:!1})},super.getShaders({modules:[E,Ut],vs:`
  in vec3 positions;
  in vec3 positions64Low;
  in float colorWeights;
  in float elevationWeights;

  void getBin(out ivec2 binId) {
    vec3 positionCommon = project_position(positions, positions64Low);
    vec2 gridCoords = floor(positionCommon.xy / binOptions.cellSizeCommon);
    binId = ivec2(gridCoords);
  }
  void getValue(out vec2 value) {
    value = vec2(colorWeights, elevationWeights);
  }
  `})))}initializeState(){super.initializeState(),this.getAttributeManager().add({positions:{size:3,accessor:"getPosition",type:"float64",fp64:this.use64bitPositions()},colorWeights:{size:1,accessor:"getColorWeight"},elevationWeights:{size:1,accessor:"getElevationWeight"}})}updateState(e){let t=super.updateState(e),{props:o,oldProps:n,changeFlags:r}=e,{aggregator:a}=this.state;if((r.dataChanged||!this.state.dataAsArray)&&(o.getColorValue||o.getElevationValue)&&(this.state.dataAsArray=Array.from(oe(o.data).iterable)),t||r.dataChanged||o.cellSize!==n.cellSize||o.getColorValue!==n.getColorValue||o.getElevationValue!==n.getElevationValue||o.colorAggregation!==n.colorAggregation||o.elevationAggregation!==n.elevationAggregation){this._updateBinOptions();let{cellSizeCommon:c,cellOriginCommon:u,binIdRange:g,dataAsArray:p}=this.state;if(a.setProps({binIdRange:g,pointCount:this.getNumInstances(),operations:[o.colorAggregation,o.elevationAggregation],binOptions:{cellSizeCommon:c,cellOriginCommon:u},onUpdate:this._onAggregationUpdate.bind(this)}),p){let{getColorValue:h,getElevationValue:f}=this.props;a.setProps({customOperations:[h&&(v=>h(v.map(b=>p[b]),{indices:v,data:o.data})),f&&(v=>f(v.map(b=>p[b]),{indices:v,data:o.data}))]})}}return r.updateTriggersChanged&&r.updateTriggersChanged.getColorValue&&a.setNeedsUpdate(0),r.updateTriggersChanged&&r.updateTriggersChanged.getElevationValue&&a.setNeedsUpdate(1),t}_updateBinOptions(){let e=this.getBounds(),t=[1,1],o=[0,0],n=[[0,1],[0,1]],r=this.context.viewport;if(e&&Number.isFinite(e[0][0])){let a=[(e[0][0]+e[1][0])/2,(e[0][1]+e[1][1])/2],{cellSize:c}=this.props,{unitsPerMeter:u}=r.getDistanceScales(a);t[0]=u[0]*c,t[1]=u[1]*c;let g=r.projectFlat(a);o=[Math.floor(g[0]/t[0])*t[0],Math.floor(g[1]/t[1])*t[1]],a=r.unprojectFlat(o);let p=r.constructor;r=r.isGeospatial?new p({longitude:a[0],latitude:a[1],zoom:12}):new W({position:[a[0],a[1],0],zoom:12}),o=[Math.fround(r.center[0]),Math.fround(r.center[1])],n=H({dataBounds:e,getBinId:h=>{let f=r.projectFlat(h);return[Math.floor((f[0]-o[0])/t[0]),Math.floor((f[1]-o[1])/t[1])]}})}this.setState({cellSizeCommon:t,cellOriginCommon:o,binIdRange:n,aggregatorViewport:r})}draw(e){e.shaderModuleProps.project&&(e.shaderModuleProps.project.viewport=this.state.aggregatorViewport),super.draw(e)}_onAggregationUpdate({channel:e}){let t=this.getCurrentLayer().props,{aggregator:o}=this.state;if(e===0){let n=o.getResult(0);this.setState({colors:new R(n,o.binCount)}),t.onSetColorDomain(o.getResultDomain(0))}else if(e===1){let n=o.getResult(1);this.setState({elevations:new R(n,o.binCount)}),t.onSetElevationDomain(o.getResultDomain(1))}}onAttributeChange(e){let{aggregator:t}=this.state;switch(e){case"positions":t.setNeedsUpdate(),this._updateBinOptions();let{cellSizeCommon:o,cellOriginCommon:n,binIdRange:r}=this.state;t.setProps({binIdRange:r,binOptions:{cellSizeCommon:o,cellOriginCommon:n}});break;case"colorWeights":t.setNeedsUpdate(0);break;case"elevationWeights":t.setNeedsUpdate(1);break;default:}}renderLayers(){let{aggregator:e,cellOriginCommon:t,cellSizeCommon:o}=this.state,{elevationScale:n,colorRange:r,elevationRange:a,extruded:c,coverage:u,material:g,transitions:p,colorScaleType:h,lowerPercentile:f,upperPercentile:v,colorDomain:b,elevationScaleType:S,elevationLowerPercentile:T,elevationUpperPercentile:w,elevationDomain:A}=this.props,J=this.getSubLayerClass("cells",Vt),D=e.getBins(),P=this.state.colors?.update({scaleType:h,lowerPercentile:f,upperPercentile:v}),N=this.state.elevations?.update({scaleType:S,lowerPercentile:T,upperPercentile:w});return!P||!N?null:new J(this.getSubLayerProps({id:"cells"}),{data:{length:e.binCount,attributes:{getBin:D,getColorValue:P.attribute,getElevationValue:N.attribute}},dataComparator:(be,ye)=>be.length===ye.length,updateTriggers:{getBin:[D],getColorValue:[P.attribute],getElevationValue:[N.attribute]},cellOriginCommon:t,cellSizeCommon:o,elevationScale:n,colorRange:r,colorScaleType:h,elevationRange:a,extruded:c,coverage:u,material:g,colorDomain:P.domain||b||e.getResultDomain(0),elevationDomain:N.domain||A||e.getResultDomain(1),colorCutoff:P.cutoff,elevationCutoff:N.cutoff,transitions:p&&{getFillColor:p.getColorValue||p.getColorWeight,getElevation:p.getElevationValue||p.getElevationWeight},extensions:[]})}getPickingInfo(e){let t=e.info,{index:o}=t;if(o>=0){let n=this.state.aggregator.getBin(o),r;n&&(r={col:n.id[0],row:n.id[1],colorValue:n.value[0],elevationValue:n.value[1],count:n.count},n.pointIndices&&(r.pointIndices=n.pointIndices,r.points=Array.isArray(this.props.data)?n.pointIndices.map(a=>this.props.data[a]):[])),t.object=r}return t}}return s.layerName="GridLayer",s.defaultProps=Xo,s})(),qo=Yo;function jt(s){let i=s.map(a=>a[0]),e=s.map(a=>a[1]),t=Math.min.apply(null,i),o=Math.max.apply(null,i),n=Math.min.apply(null,e),r=Math.max.apply(null,e);return[t,n,o,r]}function kt(s,i){return i[0]>=s[0]&&i[2]<=s[2]&&i[1]>=s[1]&&i[3]<=s[3]}var Gt=new Float32Array(12);function Pe(s,i=2){let e=0;for(let t of s)for(let o=0;o<i;o++)Gt[e++]=t[o]||0;return Gt}function Xt(s,i,e){let[t,o,n,r]=s,a=n-t,c=r-o,u=a,g=c;a/c<i/e?u=i/e*c:g=e/i*a,u<i&&(u=i,g=e);let p=(n+t)/2,h=(r+o)/2;return[p-u/2,h-g/2,p+u/2,h+g/2]}function Yt(s,i){let[e,t,o,n]=i;return[(s[0]-e)/(o-e),(s[1]-t)/(n-t)]}var qt=`#version 300 es
#define SHADER_NAME heatp-map-layer-vertex-shader
uniform sampler2D maxTexture;
in vec3 positions;
in vec2 texCoords;
out vec2 vTexCoords;
out float vIntensityMin;
out float vIntensityMax;
void main(void) {
gl_Position = project_position_to_clipspace(positions, vec3(0.0), vec3(0.0));
vTexCoords = texCoords;
vec4 maxTexture = texture(maxTexture, vec2(0.5));
float maxValue = triangle.aggregationMode < 0.5 ? maxTexture.r : maxTexture.g;
float minValue = maxValue * triangle.threshold;
if (triangle.colorDomain[1] > 0.) {
maxValue = triangle.colorDomain[1];
minValue = triangle.colorDomain[0];
}
vIntensityMax = triangle.intensity / maxValue;
vIntensityMin = triangle.intensity / minValue;
}
`;var $t=`#version 300 es
#define SHADER_NAME triangle-layer-fragment-shader
precision highp float;
uniform sampler2D weightsTexture;
uniform sampler2D colorTexture;
in vec2 vTexCoords;
in float vIntensityMin;
in float vIntensityMax;
out vec4 fragColor;
vec4 getLinearColor(float value) {
float factor = clamp(value * vIntensityMax, 0., 1.);
vec4 color = texture(colorTexture, vec2(factor, 0.5));
color.a *= min(value * vIntensityMin, 1.0);
return color;
}
void main(void) {
vec4 weights = texture(weightsTexture, vTexCoords);
float weight = weights.r;
if (triangle.aggregationMode > 0.5) {
weight /= max(1.0, weights.a);
}
if (weight <= 0.) {
discard;
}
vec4 linearColor = getLinearColor(weight);
linearColor.a *= layer.opacity;
fragColor = linearColor;
}
`;var Kt=`uniform triangleUniforms {
  float aggregationMode;
  vec2 colorDomain;
  float intensity;
  float threshold;
} triangle;
`,Zt={name:"triangle",vs:Kt,fs:Kt,uniformTypes:{aggregationMode:"f32",colorDomain:"vec2<f32>",intensity:"f32",threshold:"f32"}};var $o=(()=>{class s extends ie{getShaders(){return super.getShaders({vs:qt,fs:$t,modules:[E,Zt]})}initializeState({device:e}){this.setState({model:this._getModel(e)})}_getModel(e){let{vertexCount:t,data:o}=this.props;return new B(e,y(x({},this.getShaders()),{id:this.props.id,attributes:o.attributes,bufferLayout:[{name:"positions",format:"float32x3"},{name:"texCoords",format:"float32x2"}],topology:"triangle-strip",vertexCount:t}))}draw(){let{model:e}=this.state,{aggregationMode:t,colorDomain:o,intensity:n,threshold:r,colorTexture:a,maxTexture:c,weightsTexture:u}=this.props,g={aggregationMode:t,colorDomain:o,intensity:n,threshold:r,colorTexture:a,maxTexture:c,weightsTexture:u};e.shaderInputs.setProps({triangle:g}),e.draw(this.context.renderPass)}}return s.layerName="TriangleLayer",s})(),Qt=$o;function Jt(s,i){let e={};for(let t in s)i.includes(t)||(e[t]=s[t]);return e}var Ko=(()=>{class s extends ne{initializeAggregationLayer(e){super.initializeState(this.context),this.setState({ignoreProps:Jt(this.constructor._propTypes,e.data.props),dimensions:e})}updateState(e){super.updateState(e);let{changeFlags:t}=e;if(t.extensionsChanged){let o=this.getShaders({});o&&o.defines&&(o.defines.NON_INSTANCED_MODEL=1),this.updateShaders(o)}this._updateAttributes()}updateAttributes(e){this.setState({changedAttributes:e})}getAttributes(){return this.getAttributeManager().getAttributes()}getModuleSettings(){let{viewport:e,mousePosition:t,device:o}=this.context;return Object.assign(Object.create(this.props),{viewport:e,mousePosition:t,picking:{isActive:0},devicePixelRatio:o.canvasContext.cssToDeviceRatio()})}updateShaders(e){}isAggregationDirty(e,t={}){let{props:o,oldProps:n,changeFlags:r}=e,{compareAll:a=!1,dimension:c}=t,{ignoreProps:u}=this.state,{props:g,accessors:p=[]}=c,{updateTriggersChanged:h}=r;if(r.dataChanged)return!0;if(h){if(h.all)return!0;for(let f of p)if(h[f])return!0}if(a)return r.extensionsChanged?!0:Oe({oldProps:n,newProps:o,ignoreProps:u,propTypes:this.constructor._propTypes});for(let f of g)if(o[f]!==n[f])return!0;return!1}isAttributeChanged(e){let{changedAttributes:t}=this.state;return e?t&&t[e]!==void 0:!Zo(t)}_getAttributeManager(){return new z(this.context.device,{id:this.props.id,stats:this.context.stats})}}return s.layerName="AggregationLayer",s})(),eo=Ko;function Zo(s){let i=!0;for(let e in s){i=!1;break}return i}var ve=`#version 300 es
in vec3 positions;
in vec3 positions64Low;
in float weights;
out vec4 weightsTexture;
void main()
{
weightsTexture = vec4(weights * weight.weightsScale, 0., 0., 1.);
float radiusTexels = project_pixel_size(weight.radiusPixels) * weight.textureWidth / (weight.commonBounds.z - weight.commonBounds.x);
gl_PointSize = radiusTexels * 2.;
vec3 commonPosition = project_position(positions, positions64Low);
gl_Position.xy = (commonPosition.xy - weight.commonBounds.xy) / (weight.commonBounds.zw - weight.commonBounds.xy) ;
gl_Position.xy = (gl_Position.xy * 2.) - (1.);
gl_Position.w = 1.0;
}
`;var xe=`#version 300 es
in vec4 weightsTexture;
out vec4 fragColor;
float gaussianKDE(float u){
return pow(2.71828, -u*u/0.05555)/(1.77245385*0.166666);
}
void main()
{
float dist = length(gl_PointCoord - vec2(0.5, 0.5));
if (dist > 0.5) {
discard;
}
fragColor = weightsTexture * gaussianKDE(2. * dist);
DECKGL_FILTER_COLOR(fragColor, geometry);
}
`;var to=`#version 300 es
uniform sampler2D inTexture;
out vec4 outTexture;
void main()
{
int yIndex = gl_VertexID / int(maxWeight.textureSize);
int xIndex = gl_VertexID - (yIndex * int(maxWeight.textureSize));
vec2 uv = (0.5 + vec2(float(xIndex), float(yIndex))) / maxWeight.textureSize;
outTexture = texture(inTexture, uv);
gl_Position = vec4(0.0, 0.0, 0.0, 1.0);
gl_PointSize = 1.0;
}
`;var oo=`#version 300 es
in vec4 outTexture;
out vec4 fragColor;
void main() {
fragColor = outTexture;
fragColor.g = outTexture.r / max(1.0, outTexture.a);
}
`;var Qo=`uniform weightUniforms {
  vec4 commonBounds;
  float radiusPixels;
  float textureWidth;
  float weightsScale;
} weight;
`,io={name:"weight",vs:Qo,uniformTypes:{commonBounds:"vec4<f32>",radiusPixels:"f32",textureWidth:"f32",weightsScale:"f32"}},no={name:"maxWeight",vs:`uniform maxWeightUniforms {
  float textureSize;
} maxWeight;
`,uniformTypes:{textureSize:"f32"}};var Jo=2,Ee={format:"rgba8unorm",dimension:"2d",width:1,height:1,sampler:{minFilter:"linear",magFilter:"linear",addressModeU:"clamp-to-edge",addressModeV:"clamp-to-edge"}},ro=[0,0],ei={SUM:0,MEAN:1},ti={getPosition:{type:"accessor",value:s=>s.position},getWeight:{type:"accessor",value:1},intensity:{type:"number",min:0,value:1},radiusPixels:{type:"number",min:1,max:100,value:50},colorRange:F,threshold:{type:"number",min:0,max:1,value:.05},colorDomain:{type:"array",value:null,optional:!0},aggregation:"SUM",weightsTextureSize:{type:"number",min:128,max:2048,value:2048},debounceTimeout:{type:"number",min:0,max:1e3,value:500}},oi=["float32-renderable-webgl","texture-blend-float-webgl"],ii={data:{props:["radiusPixels"]}},ni=(()=>{class s extends eo{getShaders(e){let t=[E];return e.modules&&(t=[...t,...e.modules]),super.getShaders(y(x({},e),{modules:t}))}initializeState(){super.initializeAggregationLayer(ii),this.setState({colorDomain:ro}),this._setupTextureParams(),this._setupAttributes(),this._setupResources()}shouldUpdateState({changeFlags:e}){return e.somethingChanged}updateState(e){super.updateState(e),this._updateHeatmapState(e)}_updateHeatmapState(e){let{props:t,oldProps:o}=e,n=this._getChangeFlags(e);if((n.dataChanged||n.viewportChanged)&&(n.boundsChanged=this._updateBounds(n.dataChanged),this._updateTextureRenderingBounds()),n.dataChanged||n.boundsChanged){if(clearTimeout(this.state.updateTimer),this.setState({isWeightMapDirty:!0}),n.dataChanged){let r=this.getShaders({vs:ve,fs:xe});this._createWeightsTransform(r)}}else n.viewportZoomChanged&&this._debouncedUpdateWeightmap();t.colorRange!==o.colorRange&&this._updateColorTexture(e),this.state.isWeightMapDirty&&this._updateWeightmap(),this.setState({zoom:e.context.viewport.zoom})}renderLayers(){let{weightsTexture:e,triPositionBuffer:t,triTexCoordBuffer:o,maxWeightsTexture:n,colorTexture:r,colorDomain:a}=this.state,{updateTriggers:c,intensity:u,threshold:g,aggregation:p}=this.props,h=this.getSubLayerClass("triangle",Qt);return new h(this.getSubLayerProps({id:"triangle-layer",updateTriggers:c}),{coordinateSystem:I.DEFAULT,data:{attributes:{positions:t,texCoords:o}},vertexCount:4,maxTexture:n,colorTexture:r,aggregationMode:ei[p]||0,weightsTexture:e,intensity:u,threshold:g,colorDomain:a})}finalizeState(e){super.finalizeState(e);let{weightsTransform:t,weightsTexture:o,maxWeightTransform:n,maxWeightsTexture:r,triPositionBuffer:a,triTexCoordBuffer:c,colorTexture:u,updateTimer:g}=this.state;t?.destroy(),o?.destroy(),n?.destroy(),r?.destroy(),a?.destroy(),c?.destroy(),u?.destroy(),g&&clearTimeout(g)}_getAttributeManager(){return new z(this.context.device,{id:this.props.id,stats:this.context.stats})}_getChangeFlags(e){let t={},{dimensions:o}=this.state;t.dataChanged=this.isAttributeChanged()&&"attribute changed"||this.isAggregationDirty(e,{compareAll:!0,dimension:o.data})&&"aggregation is dirty",t.viewportChanged=e.changeFlags.viewportChanged;let{zoom:n}=this.state;return(!e.context.viewport||e.context.viewport.zoom!==n)&&(t.viewportZoomChanged=!0),t}_createTextures(){let{textureSize:e,format:t}=this.state;this.setState({weightsTexture:this.context.device.createTexture(y(x({},Ee),{width:e,height:e,format:t})),maxWeightsTexture:this.context.device.createTexture(y(x({},Ee),{width:1,height:1,format:t}))})}_setupAttributes(){this.getAttributeManager().add({positions:{size:3,type:"float64",accessor:"getPosition"},weights:{size:1,accessor:"getWeight"}}),this.setState({positionAttributeName:"positions"})}_setupTextureParams(){let{device:e}=this.context,{weightsTextureSize:t}=this.props,o=Math.min(t,e.limits.maxTextureDimension2D),n=oi.every(c=>e.features.has(c)),r=n?"rgba32float":"rgba8unorm",a=n?1:1/255;this.setState({textureSize:o,format:r,weightsScale:a}),n||M.warn(`HeatmapLayer: ${this.id} rendering to float texture not supported, falling back to low precision format`)()}_createWeightsTransform(e){let{weightsTransform:t}=this.state,{weightsTexture:o}=this.state,n=this.getAttributeManager();t?.destroy(),t=new Ce(this.context.device,y(x({id:`${this.id}-weights-transform`,bufferLayout:n.getBufferLayouts(),vertexCount:1,targetTexture:o,parameters:{depthWriteEnabled:!1,blendColorOperation:"add",blendColorSrcFactor:"one",blendColorDstFactor:"one",blendAlphaSrcFactor:"one",blendAlphaDstFactor:"one"},topology:"point-list"},e),{modules:[...e.modules,io]})),this.setState({weightsTransform:t})}_setupResources(){this._createTextures();let{device:e}=this.context,{textureSize:t,weightsTexture:o,maxWeightsTexture:n}=this.state,r=this.getShaders({vs:ve,fs:xe});this._createWeightsTransform(r);let a=this.getShaders({vs:to,fs:oo,modules:[no]}),c=new Ce(e,y(x({id:`${this.id}-max-weights-transform`,targetTexture:n},a),{vertexCount:t*t,topology:"point-list",parameters:{depthWriteEnabled:!1,blendColorOperation:"max",blendAlphaOperation:"max",blendColorSrcFactor:"one",blendColorDstFactor:"one",blendAlphaSrcFactor:"one",blendAlphaDstFactor:"one"}})),u={inTexture:o,textureSize:t};c.model.shaderInputs.setProps({maxWeight:u}),this.setState({weightsTexture:o,maxWeightsTexture:n,maxWeightTransform:c,zoom:null,triPositionBuffer:e.createBuffer({byteLength:48}),triTexCoordBuffer:e.createBuffer({byteLength:48})})}updateShaders(e){this._createWeightsTransform(x({vs:ve,fs:xe},e))}_updateMaxWeightValue(){let{maxWeightTransform:e}=this.state;e.run({parameters:{viewport:[0,0,1,1]},clearColor:[0,0,0,0]})}_updateBounds(e=!1){let{viewport:t}=this.context,o=[t.unproject([0,0]),t.unproject([t.width,0]),t.unproject([0,t.height]),t.unproject([t.width,t.height])].map(c=>c.map(Math.fround)),n=jt(o),r={visibleWorldBounds:n,viewportCorners:o},a=!1;if(e||!this.state.worldBounds||!kt(this.state.worldBounds,n)){let c=this._worldToCommonBounds(n),u=this._commonToWorldBounds(c);this.props.coordinateSystem===I.LNGLAT&&(u[1]=Math.max(u[1],-85.051129),u[3]=Math.min(u[3],85.051129),u[0]=Math.max(u[0],-360),u[2]=Math.min(u[2],360));let g=this._worldToCommonBounds(u);r.worldBounds=u,r.normalizedCommonBounds=g,a=!0}return this.setState(r),a}_updateTextureRenderingBounds(){let{triPositionBuffer:e,triTexCoordBuffer:t,normalizedCommonBounds:o,viewportCorners:n}=this.state,{viewport:r}=this.context;e.write(Pe(n,3));let a=n.map(c=>Yt(r.projectPosition(c),o));t.write(Pe(a,2))}_updateColorTexture(e){let{colorRange:t}=e.props,{colorTexture:o}=this.state,n=Te(t,!1,Uint8Array);o?.destroy(),o=this.context.device.createTexture(y(x({},Ee),{data:n,width:t.length,height:1})),this.setState({colorTexture:o})}_updateWeightmap(){let{radiusPixels:e,colorDomain:t,aggregation:o}=this.props,{worldBounds:n,textureSize:r,weightsScale:a,weightsTexture:c}=this.state,u=this.state.weightsTransform;this.state.isWeightMapDirty=!1;let g=this._worldToCommonBounds(n,{useLayerCoordinateSystem:!0});if(t&&o==="SUM"){let{viewport:J}=this.context,D=J.distanceScales.metersPerUnit[2]*(g[2]-g[0])/r;this.state.colorDomain=t.map(P=>P*D*a)}else this.state.colorDomain=t||ro;let h=this.getAttributeManager().getAttributes(),f=this.getModuleSettings();this._setModelAttributes(u.model,h),u.model.setVertexCount(this.getNumInstances());let v={radiusPixels:e,commonBounds:g,textureWidth:r,weightsScale:a,weightsTexture:c},{viewport:b,devicePixelRatio:S,coordinateSystem:T,coordinateOrigin:w}=f,{modelMatrix:A}=this.props;u.model.shaderInputs.setProps({project:{viewport:b,devicePixelRatio:S,modelMatrix:A,coordinateSystem:T,coordinateOrigin:w},weight:v}),u.run({parameters:{viewport:[0,0,r,r]},clearColor:[0,0,0,0]}),this._updateMaxWeightValue()}_debouncedUpdateWeightmap(e=!1){let{updateTimer:t}=this.state,{debounceTimeout:o}=this.props;e?(t=null,this._updateBounds(!0),this._updateTextureRenderingBounds(),this.setState({isWeightMapDirty:!0})):(this.setState({isWeightMapDirty:!1}),clearTimeout(t),t=setTimeout(this._debouncedUpdateWeightmap.bind(this,!0),o)),this.setState({updateTimer:t})}_worldToCommonBounds(e,t={}){let{useLayerCoordinateSystem:o=!1}=t,[n,r,a,c]=e,{viewport:u}=this.context,{textureSize:g}=this.state,{coordinateSystem:p}=this.props,h=o&&(p===I.LNGLAT_OFFSETS||p===I.METER_OFFSETS),f=h?u.projectPosition(this.props.coordinateOrigin):[0,0],v=g*Jo/u.scale,b,S;return o&&!h?(b=this.projectPosition([n,r,0]),S=this.projectPosition([a,c,0])):(b=u.projectPosition([n,r,0]),S=u.projectPosition([a,c,0])),Xt([b[0]-f[0],b[1]-f[1],S[0]-f[0],S[1]-f[1]],v,v)}_commonToWorldBounds(e){let[t,o,n,r]=e,{viewport:a}=this.context,c=a.unprojectPosition([t,o]),u=a.unprojectPosition([n,r]);return c.slice(0,2).concat(u.slice(0,2))}}return s.layerName="HeatmapLayer",s.defaultProps=ti,s})(),ri=ni;export{L as CPUAggregator,Go as ContourLayer,qo as GridLayer,ri as HeatmapLayer,Ro as HexagonLayer,To as ScreenGridLayer,C as WebGLAggregator,_ as _AggregationLayer};
