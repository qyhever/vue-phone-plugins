(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["mescroll-page"],{"8d73":function(t,s,i){},"94dd":function(t,s,i){"use strict";var e=i("8d73"),a=i.n(e);a.a},d1b5:function(t,s,i){"use strict";i.r(s);var e=function(){var t=this,s=t.$createElement,i=t._self._c||s;return i("ComPage",[t._l(t.list,(function(s,e){return i("div",{key:e,staticClass:"item",on:{click:t.onItemClick}},[i("b",[t._v(t._s(e+1))]),i("img",{staticClass:"avatar",attrs:{"data-src":s.imgurl,src:"http://www.mescroll.com/demo/res/img/loading2.gif",alt:"avatar"}}),i("p",[t._v(t._s(s.dissname))])])})),i("ComBacktop"),i("transition",{attrs:{name:"van-slide-right"}},[i("div",{directives:[{name:"show",rawName:"v-show",value:t.visible,expression:"visible"}],staticClass:"detail",on:{click:function(s){t.visible=!1}}})])],2)},a=[],n=i("f868"),o=i.n(n),c=i("b775"),l={data:function(){return{lastScrollTop:0,visible:!1,list:[],params:{searchKey:""}}},watch:{visible:function(t){t?document.body.classList.add("van-overflow-hidden"):document.body.classList.remove("van-overflow-hidden")}},mounted:function(){this.initMescroll()},beforeDestroy:function(){this.mescroll&&this.mescroll.destroy()},methods:{initMescroll:function(){this.mescroll||(this.mescroll=new o.a("body",{up:{callback:this.upCallback,htmlNodata:'<p class="upwarp-nodata">-- 已经到底了 --</p>',lazyLoad:{use:!0,attr:"data-src"}},down:{mustToTop:!0}}))},upCallback:function(t,s){var i=this;this.fetchData(t).then((function(e){var a=e.list||[],n=e.total||0;1===t.num?i.list=a:i.list=i.list.concat(a),i.$nextTick((function(){s.endBySize(a.length,n)}))})).catch((function(t){console.log(t),s.endErr()}))},fetchData:function(t){var s=t.num,i=t.size;return Object(c["a"])({url:"https://qyhever.com/common/disc",params:{page:s,size:i}})},onItemClick:function(){this.visible=!0},handleSearch:function(){this.params.searchKey="liuli",this.mescroll.research()}}},r=l,d=(i("94dd"),i("2877")),u=Object(d["a"])(r,e,a,!1,null,"332e74f3",null);s["default"]=u.exports}}]);
//# sourceMappingURL=mescroll-page.d668b600.js.map