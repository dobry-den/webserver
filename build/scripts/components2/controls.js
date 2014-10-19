define(["lib/react","lib/clib","lib/lodash","components2/payout","components2/countdown"],function(e,t,n,r,i){function o(e){return e<=100?"bit":"bits"}var s=e.DOM;return e.createClass({displayName:"Controls",propTypes:{engine:e.PropTypes.object.isRequired},componentWillMount:function(){var e=this;e.props.engine.on("cancel_bet",function(){e.setState({auto_play:!1})})},getInitialState:function(){return{bet_size:"1",cash_out:"2.00",auto_play:!1}},invalidBet:function(){var e=this;if(e.props.engine.balanceSatoshis<100)return"Not enough bits to play";if(!/^\d+k*$/.test(e.state.bet_size))return"Bet may only contain digits, and k (to mean 1000)";var t=parseInt(e.state.bet_size.replace(/k/g,"000"));if(t<1)return"The bet should be at least 1 bit";if(t>1e6)return"The bet must be less no more than 1,000,000 bits";var r=e.state.cash_out;return/^\d+(\.\d{1,2})?$/.test(r)?(r=parseFloat(r),console.assert(!n.isNaN(r)),n.isNaN(t)||r<1||Math.floor(t)!==t?"The bet should be an integer greater than or equal to one":e.props.engine.balanceSatoshis<t*100?"Not enough bits":null):"Invalid auto cash out amount"},placeBet:function(){var e=parseInt(this.state.bet_size.replace(/k/g,"000"))*100;console.assert(n.isFinite(e));var t=parseFloat(this.state.cash_out);console.assert(n.isFinite(t)),t=Math.round(t*100),console.assert(n.isFinite(t)),this.props.engine.bet(e,t,this.state.auto_play,function(e){e&&console.error("Got betting error: ",e)})},cashOut:function(){this.props.engine.cashOut(function(e){e&&console.warn("Got cash out error: ",e)})},getStatusMessage:function(){if(this.props.engine.gameState==="STARTING")return i({engine:this.props.engine});if(this.props.engine.gameState==="IN_PROGRESS")return this.props.engine.userState==="PLAYING"?s.span(null,"Currently playing..."):this.props.engine.lastGameWonAmount?s.span(null,"Cashed Out @  ",s.b({className:"green"},this.props.engine.lastGameWonAmount/this.props.engine.lastBet,"x")," / Won: ",s.b({className:"green"},t.formatSatoshis(this.props.engine.lastGameWonAmount))," ",o(this.props.engine.lastGameWonAmount)):s.span(null,"Game in progress..");if(this.props.engine.gameState==="ENDED"){console.log("sm: ended");if(this.props.engine.lastBet&&this.props.engine.lastGameWonAmount){console.log("sm: bet and won");var e;return this.props.engine.lastBonus&&(e=s.span(null,s.br()," (+",t.formatSatoshis(this.props.engine.lastBonus)," ",o(this.props.engine.lastBonus)," bonus)")),s.span(null,"Cashed Out @ ",s.b({className:"green"},this.props.engine.lastGameWonAmount/this.props.engine.lastBet,"x")," / Won: ",s.b({className:"green"},t.formatSatoshis(this.props.engine.lastGameWonAmount))," ",o(this.props.engine.lastGameWonAmount),e)}if(this.props.engine.lastBet){console.log("sm: bet and lost");var e;return this.props.engine.lastBonus&&(e=s.span(null,s.br(),"..but got a ",t.formatSatoshis(this.props.engine.lastBonus)," ",o(this.props.engine.lastBonus)," bonus")),s.span(null,"Game crashed @ ",s.b({className:"red"},this.props.engine.lastGameCrashedAt/100,"x")," / You lost ",s.b({className:"red"},this.props.engine.lastBet/100)," ",o(this.props.engine.lastBet),e)}return s.span(null,"Game crashed @ ",s.b({className:"red"},this.props.engine.lastGameCrashedAt/100,"x"))}},getSendingBet:function(){var e;return this.props.engine.gameState!=="STARTING"&&(e=s.a({onClick:this.props.engine.cancelBet.bind(this.props.engine)},"cancel")),s.span(null,"Sending bet...",e)},toggleAutoPlay:function(){var e=this.state.auto_play;e&&this.props.engine.cancelAutoPlay(),this.setState({auto_play:!e})},copyHash:function(){prompt("Game "+this.props.engine.gameId+" hash:",this.props.engine.hash)},getBetButton:function(){var e=this;if(this.props.engine.gameState==="IN_PROGRESS"&&this.props.engine.userState==="PLAYING")return s.div({className:"cash-out",onClick:this.cashOut},s.a({className:"big-button unclick"},"Cash out at ",r({engine:this.props.engine})," bits"));if(this.props.engine.nextBetAmount||this.props.engine.gameState==="STARTING"&&this.props.engine.userState==="PLAYING"){var n=this.props.engine.nextAutoCashout,i;this.props.engine.lastBet==null?i=this.props.engine.nextBetAmount:i=this.props.engine.lastBet;var u=null;return this.props.engine.nextAutoCashout&&(u=" with auto cash-out at "+n/100+"x"),s.div({className:"cash-out"},s.a({className:"big-button-disable unclick"},"Betting "+t.formatSatoshis(i)+" "+o(i),u),s.div({className:"cancel"},this.getSendingBet()))}var a=this.invalidBet(),f;return a?f=s.a({className:"big-button-disable unclick unselect"},"Place Bet!"):f=s.a({className:"big-button unselect"},"Place Bet!"),s.div({onClick:e.placeBet},f,a?s.div({className:"invalid cancel"},a):null)},getControlInputs:function(){var e=this,t=s.div(null,s.span({className:"bet-span strong"},"Bet"),s.input({type:"text",name:"bet-size",value:e.state.bet_size,onChange:function(t){e.setState({bet_size:t.target.value})}}),s.span({className:"sticky"},"Bits")),n=s.div(null,s.div({className:"auto-cash-out-span"},"Auto Cash Out @ "),s.input({min:1.1,value:e.state.cash_out,type:"number",name:"cash_out",onChange:function(t){e.setState({cash_out:t.target.value})}}),s.span({className:"sticky"},"x"));return s.div({className:"inputs-cont grid grid-pad"},s.div({className:"col-1-1"},t),s.div({className:"col-1-1"},n))},render:function(){var e=this,t,n;return this.props.engine.gameState==="IN_PROGRESS"&&this.props.engine.userState==="PLAYING"||!!(this.props.engine.nextBetAmount||this.props.engine.gameState==="STARTING"&&this.props.engine.userState==="PLAYING")?(t=s.div({className:"col-1-1 mobile-col-1-1"},this.getBetButton()),n=null):(t=s.div({className:"col-1-2 mobile-col-1-1"},this.getBetButton()),n=s.div({className:"col-1-2 mobile-col-1-1"},this.getControlInputs())),this.props.engine.username?s.div(null,s.div({className:"controls-container"},s.h5({className:"information"},this.getStatusMessage()),s.div({className:"controls-grid grid grid-pad"},n,t),s.div({className:"auto-bet-cont"},s.label(null,s.input({type:"checkbox",name:"autoplay",onChange:this.toggleAutoPlay,checked:this.state.auto_play,disabled:this.invalidBet()}),"auto bet"))),s.div({className:"hash-cont"},s.span({className:"hash-text"},"Hash"),s.input({className:"hash-input",type:"text",value:this.props.engine.hash,readOnly:!0}),s.div({className:"hash-copy-cont",onClick:e.copyHash},s.span({className:"hash-copy"},s.i({className:"fa fa-clipboard"}))))):s.div({className:"grid grid-pad"},s.div({className:"controls"},s.div({className:"login"},s.a({className:"big-button unselect",href:"/login"},"Login to play"),s.a({href:"/register",className:"register"},"or register "))))}})});