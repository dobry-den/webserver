define(["lib/react","components/chat","components/games_log","components/strategy_editor","../strategy-controller"],function(e,t,n,r,i){var s=e.DOM;return e.createClass({displayName:"logChatSelector",propTypes:{engine:e.PropTypes.object.isRequired},componentWillMount:function(){this.strategyController=new i(this.props.engine)},getInitialState:function(){return{widget:"gamesLog"}},selectWidget:function(e){var t=this;return function(){t.setState({widget:e})}},render:function(){var e,i="";switch(this.state.widget){case"gamesLog":e=n({engine:this.props.engine}),i="gamesLog";break;case"chat":e=t({engine:this.props.engine});break;case"strategyEditor":e=r({engine:this.props.engine,strategyController:this.strategyController})}return s.div({className:"log-chat-tabs-container"},s.ul({className:"chat-log-tabs unselect"},s.li({className:"chat-log-tab "+(this.state.widget==="gamesLog"?"tab-active":""),onClick:this.selectWidget("gamesLog")},s.a(null,"History")),s.li({className:"chat-log-tab "+(this.state.widget==="chat"?"tab-active":""),onClick:this.selectWidget("chat")},s.a(null,"Chat")),s.li({className:"chat-log-tab "+(this.state.widget==="strategyEditor"?"tab-active":""),onClick:this.selectWidget("strategyEditor")},s.a(null,"Strategy"))),s.div({className:"log-chat-container "+i},e))}})});