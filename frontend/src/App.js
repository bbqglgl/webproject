import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './components/Header';
import MyList from './components/My/MyList';
import My from './pages/My';
import Board from './pages/Board';
import CreateTip from './pages/CreateTip';
import View from './pages/View';
import Home from './pages/Home';
import Login from './pages/Login';
import Join from './pages/Join';
import 'bootstrap/dist/css/bootstrap.min.css';
import ChangePassword from './components/My/ChangePassword';
import { connect } from 'react-redux';


export class App extends React.Component {
    logined()
    {
      return(
      <>
      <Header />
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/Board" component={Board} />
            <Route exact path="/Board/Create" component={CreateTip} />
            <Route exact path="/View/:id" component={View} />
            <Route exact path="/My" component={My} />
            <Route exact path="/My/List" component={MyList} />
            <Route exact path="/My/ChangePassword" component={ChangePassword} />
            <Route exact path="/Auth/Login" component={Login} />
            <Route exact path="/Auth/Join" component={Join} />
        </Switch>
        </>);
    }
    needLogin()
    {
      return(
      <>
        <Switch>
            <Route exact path="/Auth/Join" component={Join} />
            <Route path="/" component={Login} />
        </Switch>
        </>);
    }
    render() {
      return (
        <>
          <Router>
            {this.props.auth[0].isLogin ? this.logined() : this.needLogin()}
          </Router>
        </>
        );
    }
}

const mapStateToProps = state => { return state; };

export default connect(mapStateToProps)(App);
