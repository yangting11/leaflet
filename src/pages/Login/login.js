import React,{Component} from 'react'
import {Button} from 'antd'
import {accountLogin} from '../../service/api'
import md5 from 'blueimp-md5'
import './login.scss'
class Login extends Component{
    state={
        username:'',
        password:'',
    }
    changeitem(e){
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    clickitem(e){
        if(this.state.username != "" && this.state.password != ""){
            var values = new Object();
            values.username = this.state.username;
            values.password = md5(this.state.password);
            accountLogin(values).then(res=>{
                if(res.code==200){
                    localStorage.setItem('user',this.state.username)
                    window.location.href="/pageone"
                }
            }).catch(error=>{
                console.log(error)
            })
        }
    }
    render(){
        return(
            <div className="login">
                <div className="loginbar">
                    地图测试网站
                </div>
                <div className="loginform">
                    <h4>用户登录</h4>
                    <p className="loginitem">
                        <label htmlFor="username">用户名</label>
                        <input type="text" name="username" value={this.state.username} placeholder="请输入用户名" onChange={e=>this.changeitem(e)}/>
                    </p>
                    <p className="loginitem">
                        <label htmlFor="password">密&nbsp;&nbsp;&nbsp;&nbsp;码</label>
                        <input type="password" name="password" value={this.state.password} placeholder="请输入密码" onChange={e=>this.changeitem(e)}/>
                    </p>
                    <p>
                        <button className="loginbtn" type="submit" onClick={e=>this.clickitem(e)}> 登 录 </button>
                    </p>
                </div>
            </div>
        )
    }
}
export default Login 