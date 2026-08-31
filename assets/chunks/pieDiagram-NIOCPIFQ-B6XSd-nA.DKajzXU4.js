import{t as X}from"./chunk-353BL4L5-C1ZAb07r.CMbB8TSu.js";import{a7 as Y,a6 as _,a8 as j,a9 as q,ap as H,ao as J,g as c,N as z,a as K,aB as Q,aT as U,aV as Z,ab as tt,au as et,aC as at,aW as w,aX as nt,aY as R}from"./theme.BdA3qwjY.js";import{S as rt}from"./treemap-75Q7IDZK-CjtfQE8u.4-5i0kXz.js";import{h as E}from"./arc-CegaQWj_.umE_Qz5x.js";import{h as it}from"./ordinal-DfAQgscy.DBZ2HlY2.js";import"./framework.Bzm6MoPr.js";import"./baseUniq-BxlSXXQG.CsjjZDs2.js";import"./basePickBy-CC-D1y2F.kmzqB2bN.js";import"./clone-78XdctpQ.1Nsw2mFF.js";import"./init-DjUOC4st.DHuO7-vr.js";function ot(t,a){return a<t?-1:a>t?1:a>=t?0:NaN}function lt(t){return t}function st(){var t=lt,a=ot,o=null,m=w(0),g=w(R),S=w(0);function i(e){var n,s=(e=nt(e)).length,u,$,h=0,p=new Array(s),r=new Array(s),x=+m.apply(this,arguments),b=Math.min(R,Math.max(-R,g.apply(this,arguments)-x)),f,D=Math.min(Math.abs(b)/s,S.apply(this,arguments)),v=D*(b<0?-1:1),d;for(n=0;n<s;++n)(d=r[p[n]=n]=+t(e[n],n,e))>0&&(h+=d);for(a!=null?p.sort(function(y,A){return a(r[y],r[A])}):o!=null&&p.sort(function(y,A){return o(e[y],e[A])}),n=0,$=h?(b-s*v)/h:0;n<s;++n,x=f)u=p[n],d=r[u],f=x+(d>0?d*$:0)+v,r[u]={data:e[u],index:n,value:d,startAngle:x,endAngle:f,padAngle:D};return r}return i.value=function(e){return arguments.length?(t=typeof e=="function"?e:w(+e),i):t},i.sortValues=function(e){return arguments.length?(a=e,o=null,i):a},i.sort=function(e){return arguments.length?(o=e,a=null,i):o},i.startAngle=function(e){return arguments.length?(m=typeof e=="function"?e:w(+e),i):m},i.endAngle=function(e){return arguments.length?(g=typeof e=="function"?e:w(+e),i):g},i.padAngle=function(e){return arguments.length?(S=typeof e=="function"?e:w(+e),i):S},i}var pt=at.pie,F={sections:new Map,showData:!1},M=F.sections,N=F.showData,ct=structuredClone(pt),ut=c(()=>structuredClone(ct),"getConfig"),dt=c(()=>{M=new Map,N=F.showData,et()},"clear"),gt=c(({label:t,value:a})=>{M.has(t)||(M.set(t,a),z.debug(`added new section: ${t}, with value: ${a}`))},"addSection"),ft=c(()=>M,"getSections"),mt=c(t=>{N=t},"setShowData"),ht=c(()=>N,"getShowData"),L={getConfig:ut,clear:dt,setDiagramTitle:J,getDiagramTitle:H,setAccTitle:q,getAccTitle:j,setAccDescription:_,getAccDescription:Y,addSection:gt,getSections:ft,setShowData:mt,getShowData:ht},xt=c((t,a)=>{X(t,a),a.setShowData(t.showData),t.sections.map(a.addSection)},"populateDb"),yt={parse:c(async t=>{const a=await rt("pie",t);z.debug(a),xt(a,L)},"parse")},wt=c(t=>`
  .pieCircle{
    stroke: ${t.pieStrokeColor};
    stroke-width : ${t.pieStrokeWidth};
    opacity : ${t.pieOpacity};
  }
  .pieOuterCircle{
    stroke: ${t.pieOuterStrokeColor};
    stroke-width: ${t.pieOuterStrokeWidth};
    fill: none;
  }
  .pieTitleText {
    text-anchor: middle;
    font-size: ${t.pieTitleTextSize};
    fill: ${t.pieTitleTextColor};
    font-family: ${t.fontFamily};
  }
  .slice {
    font-family: ${t.fontFamily};
    fill: ${t.pieSectionTextColor};
    font-size:${t.pieSectionTextSize};
    // fill: white;
  }
  .legend text {
    fill: ${t.pieLegendTextColor};
    font-family: ${t.fontFamily};
    font-size: ${t.pieLegendTextSize};
  }
`,"getStyles"),St=wt,$t=c(t=>{const a=[...t.entries()].map(o=>({label:o[0],value:o[1]})).sort((o,m)=>m.value-o.value);return st().value(o=>o.value)(a)},"createPieArcs"),bt=c((t,a,o,m)=>{z.debug(`rendering pie chart
`+t);const g=m.db,S=K(),i=Q(g.getConfig(),S.pie),e=40,n=18,s=4,u=450,$=u,h=U(a),p=h.append("g");p.attr("transform","translate("+$/2+","+u/2+")");const{themeVariables:r}=S;let[x]=Z(r.pieOuterStrokeWidth);x??=2;const b=i.textPosition,f=Math.min($,u)/2-e,D=E().innerRadius(0).outerRadius(f),v=E().innerRadius(f*b).outerRadius(f*b);p.append("circle").attr("cx",0).attr("cy",0).attr("r",f+x/2).attr("class","pieOuterCircle");const d=g.getSections(),y=$t(d),A=[r.pie1,r.pie2,r.pie3,r.pie4,r.pie5,r.pie6,r.pie7,r.pie8,r.pie9,r.pie10,r.pie11,r.pie12],T=it(A);p.selectAll("mySlices").data(y).enter().append("path").attr("d",D).attr("fill",l=>T(l.data.label)).attr("class","pieCircle");let W=0;d.forEach(l=>{W+=l}),p.selectAll("mySlices").data(y).enter().append("text").text(l=>(l.data.value/W*100).toFixed(0)+"%").attr("transform",l=>"translate("+v.centroid(l)+")").style("text-anchor","middle").attr("class","slice"),p.append("text").text(g.getDiagramTitle()).attr("x",0).attr("y",-400/2).attr("class","pieTitleText");const O=p.selectAll(".legend").data(T.domain()).enter().append("g").attr("class","legend").attr("transform",(l,C)=>{const k=n+s,V=k*T.domain().length/2,G=12*n,I=C*k-V;return"translate("+G+","+I+")"});O.append("rect").attr("width",n).attr("height",n).style("fill",T).style("stroke",T),O.data(y).append("text").attr("x",n+s).attr("y",n-s).text(l=>{const{label:C,value:k}=l.data;return g.getShowData()?`${C} [${k}]`:C});const P=Math.max(...O.selectAll("text").nodes().map(l=>l?.getBoundingClientRect().width??0)),B=$+e+n+s+P;h.attr("viewBox",`0 0 ${B} ${u}`),tt(h,u,B,i.useMaxWidth)},"draw"),At={draw:bt},Nt={parser:yt,db:L,renderer:At,styles:St};export{Nt as diagram};
